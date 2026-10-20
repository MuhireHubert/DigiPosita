"use client";
import { useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
} from "firebase/auth";
import { auth, configured } from "@/lib/firebase";
import { useRouter } from "next/navigation";
export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [register, setRegister] = useState(false);
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState("");
  const router = useRouter();
  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setMessage("");
    try {
      await (
        register ? createUserWithEmailAndPassword : signInWithEmailAndPassword
      )(auth, email.trim(), password);
      const next = new URLSearchParams(window.location.search).get("next");
      router.replace(
        next &&
          [
            "/pickups",
            "/deliveries",
            "/account",
            "/staff",
            "/submissions",
            "/poboxes",
            "/exports",
            "/trade",
            "/kashi",
            "/other",
            "/shops/register",
            "/auctions",
          ].includes(next)
          ? next
          : "/account",
      );
    } catch {
      setMessage(
        "Unable to sign in. Check your details, or use password reset. New accounts need a password of at least 8 characters.",
      );
    } finally {
      setBusy(false);
    }
  }
  async function demo(staff: boolean) {
    setBusy(true);
    setMessage("");
    try {
      await signInWithEmailAndPassword(
        auth,
        staff ? "staff@digiposita.test" : "customer@digiposita.test",
        "DigiPositaDemo!2026",
      );
      router.replace(staff ? "/staff" : "/account");
    } catch {
      setMessage(
        "Local demo accounts are not ready. Run npm run seed:demo with the emulators running.",
      );
    } finally {
      setBusy(false);
    }
  }
  async function reset() {
    setBusy(true);
    try {
      await sendPasswordResetEmail(auth, email.trim());
      setMessage(
        "If an account exists, a password reset email will arrive shortly.",
      );
    } catch {
      setMessage("Enter a valid email address and try again.");
    } finally {
      setBusy(false);
    }
  }
  return (
    <main className="mx-auto max-w-lg px-6 py-16">
      <p className="eyebrow">WELCOME TO DIGIPOSITA</p>
      <h1 className="mt-3 font-display text-3xl">
        {register ? "Create your account" : "Welcome back"}
      </h1>
      <p className="mt-3 text-inkSoft">
        Submit requests. Follow every response. All in one place.
      </p>
      {process.env.NEXT_PUBLIC_USE_FIREBASE_EMULATORS === "true" && (
        <div className="my-6 rounded-xl border border-green/20 bg-paper2 p-5">
          <p className="text-sm font-semibold">Explore the local demo</p>
          <p className="mt-2 text-xs text-inkSoft">
            Sample accounts use local emulators. These are not live services.
          </p>
          <div className="mt-4 flex flex-wrap gap-3">
            <button
              className="button"
              disabled={busy}
              onClick={() => demo(false)}
            >
              Customer demo
            </button>
            <button
              className="button secondary"
              disabled={busy}
              onClick={() => demo(true)}
            >
              Staff demo
            </button>
          </div>
        </div>
      )}
      {!configured ? (
        <p className="mt-8" role="status">
          Account services are being set up. Please check back soon.
        </p>
      ) : (
        <>
          <form onSubmit={submit} className="mt-8 space-y-5">
            <label className="block">
              Email
              <input
                className="input mt-2"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </label>
            <label className="block">
              Password
              <input
                className="input mt-2"
                type="password"
                autoComplete={register ? "new-password" : "current-password"}
                minLength={register ? 8 : undefined}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </label>
            <button className="button" disabled={busy}>
              {busy ? "Please wait…" : register ? "Create account" : "Sign in"}
            </button>
          </form>
          <div className="mt-6 flex flex-wrap gap-5 text-sm">
            <button
              disabled={busy}
              onClick={() => {
                setRegister(!register);
                setMessage("");
              }}
            >
              {register
                ? "Already have an account? Sign in"
                : "New here? Create an account"}
            </button>
            <button disabled={busy || !email} onClick={reset}>
              Reset password
            </button>
          </div>
          <p className="mt-5 text-sm" role="status">
            {message}
          </p>
        </>
      )}
    </main>
  );
}
