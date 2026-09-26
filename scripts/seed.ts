// Seeds one sample shipment so /tracking has something real to find.
// Run with: npm run seed  (requires FIREBASE_SERVICE_ACCOUNT_JSON in .env.local)
import * as admin from "firebase-admin";

const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_JSON || "{}");

admin.initializeApp({ credential: admin.credential.cert(serviceAccount) });
const db = admin.firestore();

async function seed() {
  await db.collection("shipments").add({
    trackingCode: "IP-2026-00931",
    originOffice: "Kigali Central Post Office",
    destination: "Musanze District Office",
    status: "in_transit",
    history: [
      { status: "accepted", timestamp: Date.now() - 86400000 },
      { status: "in_transit", timestamp: Date.now() },
    ],
  });
  console.log("Seeded one sample shipment: IP-2026-00931");
}

seed().then(() => process.exit(0));
