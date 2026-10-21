import { readFileSync } from "node:fs";
import { after, before, beforeEach, test } from "node:test";
import assert from "node:assert/strict";
import {
  initializeTestEnvironment,
  assertSucceeds,
  assertFails,
} from "@firebase/rules-unit-testing";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
  setDoc,
  updateDoc,
  serverTimestamp,
} from "firebase/firestore";
let env;
before(async () => {
  env = await initializeTestEnvironment({
    projectId: "demo-digiposita",
    firestore: { rules: readFileSync("firestore.rules", "utf8") },
  });
});
after(async () => env?.cleanup());
beforeEach(async () => env.clearFirestore());
const pickup = (extra = {}) => ({
  ownerId: "alice",
  contactName: "Alice",
  phone: "+250788000000",
  address: "Kigali",
  weightKg: 2,
  size: "medium",
  notes: "",
  status: "requested",
  createdAt: serverTimestamp(),
  ...extra,
});
const db = (uid, claims = {}) =>
  uid
    ? env.authenticatedContext(uid, claims).firestore()
    : env.unauthenticatedContext().firestore();
test("bookings require authentication and immutable ownership", async () => {
  await assertFails(setDoc(doc(db(), "pickups", "one"), pickup()));
  await assertFails(setDoc(doc(db("bob"), "pickups", "one"), pickup()));
  await assertSucceeds(setDoc(doc(db("alice"), "pickups", "one"), pickup()));
  await assertFails(
    updateDoc(doc(db("alice"), "pickups", "one"), { ownerId: "bob" }),
  );
});
test("only the owner and staff can read requests; public listing is forbidden", async () => {
  await setDoc(doc(db("alice"), "pickups", "one"), pickup());
  await assertSucceeds(getDoc(doc(db("alice"), "pickups", "one")));
  await assertFails(getDoc(doc(db("bob"), "pickups", "one")));
  await assertFails(getDocs(collection(db(), "pickups")));
  await assertFails(getDocs(collection(db("alice"), "pickups")));
  await assertSucceeds(
    getDocs(
      query(
        collection(db("alice"), "pickups"),
        where("ownerId", "==", "alice"),
      ),
    ),
  );
  await assertSucceeds(
    getDocs(collection(db("operator", { staff: true }), "pickups")),
  );
});
test("invalid weights, oversized fields, spoofed timestamps and extra fields fail", async () => {
  for (const extra of [
    { weightKg: 0 },
    { weightKg: -1 },
    { weightKg: 1001 },
    { contactName: "" },
    { address: "x".repeat(501) },
    { status: "delivered" },
    { createdAt: 0 },
    { admin: true },
  ]) {
    await assertFails(
      setDoc(doc(db("alice"), "pickups", "one"), pickup(extra)),
    );
  }
});
test("customers may cancel only before processing, and cannot alter booking details", async () => {
  const ref = doc(db("alice"), "pickups", "one");
  await setDoc(ref, pickup());
  await assertFails(
    updateDoc(ref, { status: "collected", updatedAt: serverTimestamp() }),
  );
  await assertFails(
    updateDoc(ref, {
      status: "cancelled",
      address: "Changed",
      updatedAt: serverTimestamp(),
    }),
  );
  await assertSucceeds(
    updateDoc(ref, { status: "cancelled", updatedAt: serverTimestamp() }),
  );
  await assertFails(
    updateDoc(ref, { status: "requested", updatedAt: serverTimestamp() }),
  );
});
test("staff transitions are ordered, cannot change customer data, and block stale cancellations", async () => {
  const alice = db("alice");
  const ref = doc(alice, "pickups", "one");
  await setDoc(ref, pickup());
  const staffRef = doc(db("operator", { staff: true }), "pickups", "one");
  const update = {
    status: "scheduled",
    trackingCode: "DP-P-12345678901234567890",
    updatedAt: serverTimestamp(),
  };
  await assertFails(updateDoc(staffRef, { ...update, status: "delivered" }));
  await assertFails(updateDoc(staffRef, { ...update, phone: "changed" }));
  await assertSucceeds(updateDoc(staffRef, update));
  await assertFails(
    updateDoc(ref, { status: "cancelled", updatedAt: serverTimestamp() }),
  );
  await assertSucceeds(updateDoc(staffRef, { ...update, status: "collected" }));
  await assertSucceeds(updateDoc(staffRef, { ...update, status: "delivered" }));
});
test("public tracking supports exact lookup but prevents enumeration and private fields", async () => {
  const code = "DP-P-12345678901234567890";
  const ref = doc(db("operator", { staff: true }), "public_shipments", code);
  const data = {
    trackingCode: code,
    status: "accepted",
    originOffice: "Collection network",
    destination: "Delivery destination",
    history: [],
  };
  await assertSucceeds(setDoc(ref, data));
  await assertSucceeds(getDoc(doc(db(), "public_shipments", code)));
  await assertFails(getDocs(collection(db(), "public_shipments")));
  await assertFails(setDoc(doc(db("alice"), "public_shipments", code), data));
  await assertFails(setDoc(ref, { ...data, phone: "private" }));
});
test("legacy intake collections remain closed", async () => {
  for (const service of [
    "kashi_applications",
    "poboxes",
    "shops",
    "auctions",
    "submissions",
    "exports",
    "trade_inquiries",
  ]) {
    await assertFails(
      setDoc(doc(db("alice"), service, "one"), { ownerId: "alice" }),
    );
    await assertFails(getDocs(collection(db(), service)));
  }
});
test("deliveries enforce ownership, content and status validation", async () => {
  const data = {
    ownerId: "alice",
    requesterName: "Alice",
    phone: "+250788000000",
    fromLocation: "Kigali",
    toLocation: "Musanze",
    goodsType: "Books",
    weightKg: 2,
    status: "requested",
    createdAt: serverTimestamp(),
  };
  await assertSucceeds(setDoc(doc(db("alice"), "deliveries", "one"), data));
  await assertFails(getDoc(doc(db("bob"), "deliveries", "one")));
  await assertFails(
    setDoc(doc(db("alice"), "deliveries", "two"), { ...data, weightKg: -1 }),
  );
  await assertFails(
    setDoc(doc(db("alice"), "deliveries", "two"), {
      ...data,
      fromLocation: "",
    }),
  );
});

test("precise booking pins are optional, validated, private and immutable", async () => {
  const location = {
    latitude: -1.9441,
    longitude: 30.0619,
    accuracy: 12,
    capturedAt: Date.now() - 1000,
  };
  await assertSucceeds(
    setDoc(
      doc(db("alice"), "pickups", "pin"),
      pickup({ location, directions: "Gasabo, Kacyiru; gate beside the shop" }),
    ),
  );
  await assertSucceeds(
    getDoc(doc(db("staff", { staff: true }), "pickups", "pin")),
  );
  await assertFails(getDoc(doc(db("bob"), "pickups", "pin")));
  await assertFails(getDoc(doc(db(), "pickups", "pin")));
  await assertFails(
    updateDoc(doc(db("alice"), "pickups", "pin"), {
      location: { ...location, latitude: 0 },
    }),
  );
  await assertFails(
    setDoc(
      doc(db("alice"), "pickups", "invalid-lat"),
      pickup({ location: { ...location, latitude: 91 } }),
    ),
  );
  await assertFails(
    setDoc(
      doc(db("alice"), "pickups", "invalid-lng"),
      pickup({ location: { ...location, longitude: 181 } }),
    ),
  );
  await assertFails(
    setDoc(
      doc(db("alice"), "pickups", "invalid-accuracy"),
      pickup({ location: { ...location, accuracy: -1 } }),
    ),
  );
  await assertFails(
    setDoc(
      doc(db("alice"), "pickups", "invalid-fields"),
      pickup({ location: { ...location, extra: "unexpected" } }),
    ),
  );
  await assertFails(
    setDoc(
      doc(db("alice"), "pickups", "long-directions"),
      pickup({ directions: "x".repeat(2001) }),
    ),
  );
  const delivery = {
    ownerId: "alice",
    requesterName: "Alice",
    phone: "+250788000000",
    fromLocation: "Kacyiru",
    toLocation: "Kimironko",
    goodsType: "Parcel",
    weightKg: 1,
    status: "requested",
    createdAt: serverTimestamp(),
    fromCoordinates: location,
    toCoordinates: { ...location, latitude: -1.95 },
    fromDirections: "Gate A",
    toDirections: "Gate B",
  };
  await assertSucceeds(setDoc(doc(db("alice"), "deliveries", "pin"), delivery));
  await assertFails(getDoc(doc(db("bob"), "deliveries", "pin")));
  await assertFails(
    setDoc(doc(db("alice"), "deliveries", "invalid-pin"), {
      ...delivery,
      toCoordinates: { ...location, longitude: 190 },
    }),
  );
});

test("staff access must be provisioned by an administrator; clients cannot self-promote", async () => {
  await assertFails(
    setDoc(doc(db("alice"), "staff_access", "alice"), { role: "admin" }),
  );
  await env.withSecurityRulesDisabled(async (ctx) =>
    setDoc(doc(ctx.firestore(), "staff_access", "operator"), { role: "admin" }),
  );
  await assertSucceeds(getDoc(doc(db("operator"), "staff_access", "operator")));
  await assertFails(getDoc(doc(db("bob"), "staff_access", "operator")));
  await assertSucceeds(setDoc(doc(db("alice"), "pickups", "one"), pickup()));
  await assertSucceeds(getDoc(doc(db("operator"), "pickups", "one")));
  await assertFails(
    setDoc(doc(db("operator"), "staff_access", "bob"), { role: "admin" }),
  );
});
