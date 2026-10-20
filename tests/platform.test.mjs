import { placeAuctionBid } from "../lib/auction-bids.ts";
import { readFileSync } from "node:fs";
import { before, after, beforeEach, test } from "node:test";
import assert from "node:assert/strict";
import { createRequire } from "node:module";
// Use one Firebase SDK module instance with the CommonJS TypeScript test loader.
const require = createRequire(import.meta.url);
const {
  initializeTestEnvironment,
  assertSucceeds,
  assertFails,
} = require("@firebase/rules-unit-testing");
const {
  doc,
  setDoc,
  getDoc,
  getDocs,
  collection,
  query,
  where,
  updateDoc,
  serverTimestamp,
  Timestamp,
  writeBatch,
  runTransaction,
  setLogLevel,
} = require("firebase/firestore");
const {
  ref,
  uploadBytes,
  getBytes,
  deleteObject,
} = require("firebase/storage");
setLogLevel("silent");
let env;
before(async () => {
  env = await initializeTestEnvironment({
    projectId: "demo-digiposita",
    firestore: { rules: readFileSync("firestore.rules", "utf8") },
    storage: { rules: readFileSync("storage.rules", "utf8") },
  });
});
after(async () => env?.cleanup());
beforeEach(async () => {
  await env.clearFirestore();
  await env.clearStorage();
});
const db = (uid, staff = false) =>
  uid
    ? env
        .authenticatedContext(uid, { staff, email: `${uid}@example.com` })
        .firestore()
    : env.unauthenticatedContext().firestore();
const fields = {
  poboxes: { organization: "School", office: "Kigali", plan: "Institution" },
  exports: {
    channel: "Export from Rwanda",
    destination: "Kenya",
    goods: "Books",
    weight: "2",
  },
  trade: {
    company: "Example",
    direction: "Export",
    country: "Kenya",
    product: "Coffee",
  },
  shops: {
    shopName: "Sample shop",
    category: "Gifts",
    location: "Kigali",
    description: "Handmade gifts",
  },
  kashi: {
    accountType: "Personal",
    office: "Kigali",
    purpose: "Account services",
  },
  other: {
    category: "General enquiry",
    subject: "Opening times",
    description: "Please advise",
  },
  submissions: {
    category: "Tender",
    reference: "T-123",
    description: "Tender document",
  },
};
function request(kind, extra = {}) {
  return {
    ownerId: "alice",
    kind,
    contactName: "Alice",
    email: "alice@example.com",
    phone: "+250788000000",
    fields: fields[kind],
    status: "submitted",
    result: "",
    customerReply: "",
    createdAt: serverTimestamp(),
    ...(kind === "shops" ? { publishConsent: true } : {}),
    ...(kind === "submissions"
      ? {
          attachment: {
            path: "serviceDocuments/alice/one/document",
            name: "tender.pdf",
            size: 100,
            type: "application/pdf",
          },
        }
      : {}),
    ...extra,
  };
}
test("all service modules accept valid private requests and reject public access", async () => {
  for (const kind of Object.keys(fields)) {
    const ref = doc(db("alice"), "service_requests", "one");
    await assertSucceeds(setDoc(ref, request(kind)));
    await assertSucceeds(getDoc(ref));
    await assertFails(getDoc(doc(db("bob"), "service_requests", "one")));
    await assertFails(getDocs(collection(db(), "service_requests")));
    await env.clearFirestore();
  }
});
test("service schemas reject extra data, forged outcomes, missing consent and invalid attachments", async () => {
  const ref = doc(db("alice"), "service_requests", "one");
  for (const data of [
    request("poboxes", { kind: "unknown" }),
    request("poboxes", { status: "approved" }),
    request("poboxes", { fields: { ...fields.poboxes, secret: "x" } }),
    request("shops", { publishConsent: false }),
    request("submissions", {
      attachment: {
        path: "serviceDocuments/bob/one/document",
        name: "a.pdf",
        size: 100,
        type: "application/pdf",
      },
    }),
    request("exports", { fields: { ...fields.exports, weight: "1001" } }),
  ])
    await assertFails(setDoc(ref, data));
});
test("staff reviews, customer replies and immutable request details work across the workflow", async () => {
  const ref = doc(db("alice"), "service_requests", "one");
  await setDoc(ref, request("trade"));
  const staff = doc(db("operator", true), "service_requests", "one");
  await assertFails(
    updateDoc(ref, {
      status: "approved",
      result: "approved",
      updatedAt: serverTimestamp(),
    }),
  );
  await assertSucceeds(
    updateDoc(staff, {
      status: "reviewing",
      result: "Review started",
      updatedAt: serverTimestamp(),
    }),
  );
  await assertFails(
    updateDoc(staff, {
      status: "completed",
      result: "skip",
      updatedAt: serverTimestamp(),
    }),
  );
  await updateDoc(staff, {
    status: "action_required",
    result: "Which product?",
    updatedAt: serverTimestamp(),
  });
  await assertSucceeds(
    updateDoc(ref, {
      status: "reviewing",
      customerReply: "Roasted coffee",
      updatedAt: serverTimestamp(),
    }),
  );
  await assertFails(
    updateDoc(ref, { fields: { ...fields.trade, product: "Changed" } }),
  );
  await assertSucceeds(
    updateDoc(staff, {
      status: "approved",
      result: "Desk appointment confirmed",
      updatedAt: serverTimestamp(),
    }),
  );
  await assertSucceeds(
    updateDoc(staff, {
      status: "completed",
      result: "Enquiry resolved",
      updatedAt: serverTimestamp(),
    }),
  );
});
test("P.O. box assignment is linked to an approved request and cannot be overwritten", async () => {
  await setDoc(doc(db("alice"), "service_requests", "one"), request("poboxes"));
  const staff = db("operator", true);
  const ticket = doc(staff, "service_requests", "one");
  await updateDoc(ticket, {
    status: "reviewing",
    result: "Review",
    updatedAt: serverTimestamp(),
  });
  await assertFails(
    updateDoc(ticket, {
      status: "approved",
      result: "Assigned",
      updatedAt: serverTimestamp(),
    }),
  );
  const b = writeBatch(staff);
  b.update(ticket, {
    status: "approved",
    result: "Assigned box 100",
    boxNumber: "100",
    updatedAt: serverTimestamp(),
  });
  b.set(doc(staff, "pobox_assignments", "Kigali-100"), {
    ownerId: "alice",
    requestId: "one",
    office: "Kigali",
    boxNumber: "100",
    createdAt: serverTimestamp(),
  });
  await assertSucceeds(b.commit());
  await assertFails(
    updateDoc(doc(staff, "pobox_assignments", "Kigali-100"), {
      ownerId: "bob",
    }),
  );
  await assertSucceeds(
    getDoc(doc(db("alice"), "pobox_assignments", "Kigali-100")),
  );
  await assertFails(getDoc(doc(db("bob"), "pobox_assignments", "Kigali-100")));
});
test("shop publication requires approval and publishes only consented directory fields", async () => {
  await setDoc(doc(db("alice"), "service_requests", "one"), request("shops"));
  const staff = db("operator", true);
  const listing = {
    ...fields.shops,
    phone: "+250788000000",
    updatedAt: serverTimestamp(),
  };
  await assertFails(setDoc(doc(staff, "public_shops", "one"), listing));
  await updateDoc(doc(staff, "service_requests", "one"), {
    status: "reviewing",
    result: "Review",
    updatedAt: serverTimestamp(),
  });
  const b = writeBatch(staff);
  b.update(doc(staff, "service_requests", "one"), {
    status: "approved",
    result: "Published",
    updatedAt: serverTimestamp(),
  });
  b.set(doc(staff, "public_shops", "one"), listing);
  await assertSucceeds(b.commit());
  await assertSucceeds(getDocs(collection(db(), "public_shops")));
  await assertFails(
    updateDoc(doc(staff, "public_shops", "one"), {
      email: "private@example.com",
    }),
  );
});
function auction(extra = {}) {
  return {
    title: "Office equipment",
    description: "Used printer",
    startingPrice: 1000,
    highestBid: 0,
    bidCount: 0,
    lastBidId: "",
    status: "open",
    closesAt: Timestamp.fromMillis(Date.now() + 3600000),
    createdAt: serverTimestamp(),
    ...extra,
  };
}
async function bid(uid, id, amount) {
  const firestore = db(uid);
  return runTransaction(firestore, async (tx) => {
    const a = doc(firestore, "auction_listings", "one");
    const s = await tx.get(a);
    tx.set(doc(firestore, "auction_listings", "one", "bids", id), {
      ownerId: uid,
      contactEmail: `${uid}@example.com`,
      amount,
      createdAt: serverTimestamp(),
    });
    tx.update(a, {
      highestBid: amount,
      bidCount: s.data().bidCount + 1,
      lastBidId: id,
    });
    tx.set(doc(firestore, "customer_bids", uid, "entries", id), {
      auctionId: "one",
      auctionTitle: s.data().title,
      amount,
      createdAt: serverTimestamp(),
    });
  });
}

test("auctions accept atomic bids but reject lower bids, forged summaries and private bid enumeration", async () => {
  await setDoc(doc(db("operator", true), "auction_listings", "one"), auction());
  await assertFails(
    setDoc(doc(db("alice"), "auction_listings", "two"), auction()),
  );
  await assertSucceeds(bid("alice", "first", 1000));
  await assertFails(bid("bob", "lower", 999));
  await assertSucceeds(bid("bob", "second", 1001));
  await assertFails(
    updateDoc(doc(db("alice"), "auction_listings", "one"), {
      highestBid: 9999,
      bidCount: 3,
      lastBidId: "fake",
    }),
  );
  await assertFails(
    getDoc(doc(db(), "auction_listings", "one", "bids", "first")),
  );
  await assertSucceeds(
    getDoc(doc(db("alice"), "auction_listings", "one", "bids", "first")),
  );
  await assertFails(
    getDocs(collection(db("bob"), "customer_bids", "alice", "entries")),
  );
  const current = await getDoc(doc(db(), "auction_listings", "one"));
  assert.equal(current.data().highestBid, 1001);
  assert.equal(current.data().bidCount, 2);
});
test("concurrent bids preserve the highest accepted amount and cannot overwrite bid records", async () => {
  await setDoc(doc(db("operator", true), "auction_listings", "one"), auction());
  const results = await Promise.allSettled([
    placeAuctionBid(db("alice"), "one", "alice", "alice@example.com", 1200),
    placeAuctionBid(db("bob"), "one", "bob", "bob@example.com", 1500),
  ]);
  assert.ok(
    results.some((r) => r.status === "fulfilled"),
    JSON.stringify(
      results.map((r) =>
        r.status === "rejected"
          ? { code: r.reason?.code, message: r.reason?.message }
          : r,
      ),
    ),
  );
  const current = await getDoc(doc(db(), "auction_listings", "one"));
  assert.equal(current.data().highestBid, 1500);
  await assertFails(
    updateDoc(
      doc(
        db("bob"),
        "auction_listings",
        "one",
        "bids",
        current.data().lastBidId,
      ),
      {
        amount: 2000,
      },
    ),
  );
});
test("expired auctions reject bids and only staff can close them", async () => {
  await env.withSecurityRulesDisabled(async (context) =>
    setDoc(
      doc(context.firestore(), "auction_listings", "one"),
      auction({ closesAt: Timestamp.fromMillis(Date.now() - 10000) }),
    ),
  );
  await assertFails(bid("alice", "late", 1500));
  await assertFails(
    updateDoc(doc(db("alice"), "auction_listings", "one"), {
      status: "closed",
    }),
  );
  await assertSucceeds(
    updateDoc(doc(db("operator", true), "auction_listings", "one"), {
      status: "closed",
    }),
  );
});
test("document storage enforces privacy, file limits and immutability after submission", async () => {
  const alice = env.authenticatedContext("alice").storage();
  const bob = env.authenticatedContext("bob").storage();
  const path = "serviceDocuments/alice/one/document";
  await assertFails(
    uploadBytes(ref(bob, path), new Uint8Array([1]), {
      contentType: "application/pdf",
    }),
  );
  await assertFails(
    uploadBytes(ref(alice, path), new Uint8Array([1]), {
      contentType: "text/html",
    }),
  );
  await assertSucceeds(
    uploadBytes(ref(alice, path), new Uint8Array([1, 2, 3]), {
      contentType: "application/pdf",
    }),
  );
  await assertSucceeds(getBytes(ref(alice, path)));
  await assertFails(getBytes(ref(bob, path)));
  await setDoc(
    doc(db("alice"), "service_requests", "one"),
    request("submissions"),
  );
  await assertFails(deleteObject(ref(alice, path)));
  await assertFails(
    uploadBytes(ref(alice, path), new Uint8Array([4]), {
      contentType: "application/pdf",
    }),
  );
});
