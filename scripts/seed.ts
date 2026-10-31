import { initializeApp, applicationDefault } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import { randomBytes } from "node:crypto";
initializeApp({ credential: applicationDefault() });
async function main() {
  const code = `DP-P-${randomBytes(10).toString("hex").toUpperCase()}`;
  await getFirestore()
    .collection("public_shipments")
    .doc(code)
    .set({
      trackingCode: code,
      originOffice: "Demo collection network",
      destination: "Demo destination",
      status: "in_transit",
      history: [
        { status: "accepted", timestamp: Date.now() - 86400000 },
        { status: "in_transit", timestamp: Date.now() },
      ],
    });
  console.log(`Sample tracking code: ${code}`);
}
main().catch((error) => {
  console.error(error.message);
  process.exitCode = 1;
});
