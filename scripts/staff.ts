import { initializeApp, applicationDefault } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
const uid = process.argv[2];
const revoke = process.argv.includes("--revoke");
if (!uid) throw new Error("Usage: npm run staff -- FIREBASE_UID [--revoke]");
initializeApp({ credential: applicationDefault() });
async function main() {
  const auth = getAuth();
  const user = await auth.getUser(uid);
  await auth.setCustomUserClaims(uid, { ...user.customClaims, staff: !revoke });
  await auth.revokeRefreshTokens(uid);
  console.log(
    `Staff access ${revoke ? "revoked" : "granted"}. The user must sign out and sign in again.`,
  );
}
main().catch((error) => {
  console.error(error.message);
  process.exitCode = 1;
});
