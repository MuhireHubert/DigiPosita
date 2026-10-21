import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore, connectFirestoreEmulator } from "firebase/firestore";
import { getStorage, connectStorageEmulator } from "firebase/storage";
import { getAuth, connectAuthEmulator } from "firebase/auth";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

export const configured = Boolean(
  firebaseConfig.apiKey && firebaseConfig.projectId && firebaseConfig.appId,
);

const app =
  getApps().length > 0
    ? getApp()
    : initializeApp(
        configured
          ? firebaseConfig
          : {
              apiKey: "setup-required",
              projectId: "setup-required",
              appId: "setup-required",
            },
      );

export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);
if (process.env.NEXT_PUBLIC_USE_FIREBASE_EMULATORS === "true") {
  const marker = globalThis as typeof globalThis & {
    __digiEmulatorsConnected?: boolean;
  };
  if (!marker.__digiEmulatorsConnected) {
    connectFirestoreEmulator(db, "127.0.0.1", 8188);
    connectStorageEmulator(storage, "127.0.0.1", 9298);
    connectAuthEmulator(auth, "http://127.0.0.1:9198", {
      disableWarnings: true,
    });
    marker.__digiEmulatorsConnected = true;
  }
}
