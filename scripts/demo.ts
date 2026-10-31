// This command intentionally cannot target a live Firebase project.
import { initializeApp } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import { getFirestore, Timestamp, FieldValue } from "firebase-admin/firestore";
process.env.FIREBASE_AUTH_EMULATOR_HOST = "127.0.0.1:9198";
process.env.FIRESTORE_EMULATOR_HOST = "127.0.0.1:8188";
process.env.GCLOUD_PROJECT = "demo-digiposita";
initializeApp({ projectId: "demo-digiposita" });
const password = "DigiPositaDemo!2026";
async function main() {
  const auth = getAuth();
  const db = getFirestore();
  let customerUid = "";
  for (const [email, staff] of [
    ["customer@digiposita.test", false],
    ["staff@digiposita.test", true],
  ] as const) {
    let user;
    try {
      user = await auth.getUserByEmail(email);
    } catch (error) {
      if ((error as { code?: string }).code !== "auth/user-not-found")
        throw error;
      user = await auth.createUser({ email, password });
    }
    await auth.setCustomUserClaims(user.uid, { staff });
    if (!staff) customerUid = user.uid;
  }
  const request = db.collection("service_requests").doc("demo-shop");
  const existing = await request.get();
  if (!existing.exists) {
    await request.set({
      ownerId: customerUid,
      kind: "shops",
      contactName: "Demo Shopkeeper",
      email: "customer@digiposita.test",
      phone: "+250 000 000 000",
      fields: {
        shopName: "Kigali Craft Studio — demo",
        category: "Handmade gifts",
        location: "Kigali · Sample location",
        description:
          "A demonstration shop listing for exploring the directory.",
      },
      status: "approved",
      result: "Shop registration approved and published.",
      customerReply: "",
      publishConsent: true,
      createdAt: FieldValue.serverTimestamp(),
    });
    await db.collection("public_shops").doc("demo-shop").set({
      shopName: "Kigali Craft Studio — demo",
      category: "Handmade gifts",
      location: "Kigali · Sample location",
      description: "A demonstration shop listing for exploring the directory.",
      phone: "+250 000 000 000",
      updatedAt: FieldValue.serverTimestamp(),
    });
  }
  const auction = db.collection("auction_listings").doc("demo-auction");
  if (!(await auction.get()).exists)
    await auction.set({
      title: "Office printer — demo auction",
      description:
        "Sample listing for testing bids. This item is not for sale.",
      startingPrice: 1000,
      highestBid: 0,
      bidCount: 0,
      lastBidId: "",
      status: "open",
      closesAt: Timestamp.fromMillis(Date.now() + 7 * 86400000),
      createdAt: FieldValue.serverTimestamp(),
    });
  console.log(
    "Local demo ready. Use the customer or staff demo buttons on the login page.",
  );
}
main().catch((error) => {
  console.error(error.message);
  process.exitCode = 1;
});
