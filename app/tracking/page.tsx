"use client";
import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db, configured } from "@/lib/firebase";
import type { Shipment } from "@/lib/types";
import { statusLabel } from "@/lib/requests";
export default function Tracking() {
  const [code, setCode] = useState("");
  const [result, setResult] = useState<Shipment | null>(null);
  const [message, setMessage] = useState("");
  const [busy, setBusy] = useState(false);
  useEffect(() => {
    setCode(new URLSearchParams(window.location.search).get("code") || "");
  }, []);
  async function search(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setMessage("");
    setResult(null);
    try {
      if (!configured) {
        setMessage(
          "Tracking services are being set up. Please check back soon.",
        );
        return;
      }
      const value = code.trim().toUpperCase();
      if (!/^DP-[PD]-[A-Z0-9]{20}$/.test(value)) {
        setMessage(
          "Enter the full tracking code shown in your account, beginning DP-P- or DP-D-.",
        );
        return;
      }
      const snap = await getDoc(doc(db, "public_shipments", value));
      if (!snap.exists())
        setMessage(
          "No shipment found. Check the code or wait for your booking to be confirmed.",
        );
      else setResult(snap.data() as Shipment);
    } catch {
      setMessage("Tracking is temporarily unavailable. Please try again.");
    } finally {
      setBusy(false);
    }
  }
  return (
    <main className="mx-auto max-w-xl px-6 py-16">
      <p className="eyebrow">FOLLOW THE JOURNEY</p>
      <h1 className="mt-3 font-display text-4xl">Where’s your parcel?</h1>
      <p className="mt-4 text-inkSoft">
        Your tracking code appears in My requests after staff confirm your
        booking.
      </p>
      <form onSubmit={search} className="mt-8">
        <label htmlFor="tracking-code" className="text-sm">
          Tracking code
        </label>
        <div className="mt-2 flex gap-3">
          <input
            id="tracking-code"
            className="input"
            required
            maxLength={25}
            placeholder="DP-P-…"
            value={code}
            onChange={(e) => setCode(e.target.value)}
          />
          <button className="button" disabled={busy}>
            {busy ? "Searching…" : "Track"}
          </button>
        </div>
      </form>
      <p role="status" className="mt-5 text-sm">
        {message}
      </p>
      {result && (
        <section className="mt-6 rounded-xl border border-ink/10 bg-paper2 p-6">
          <h2 className="break-all font-mono text-sm">{result.trackingCode}</h2>
          <p className="mt-4 font-display text-2xl capitalize">
            {statusLabel(result.status)}
          </p>
          <ol className="mt-6 space-y-5">
            {result.history.map((event, i) => (
              <li key={i} className="border-l-2 border-goldDeep pl-4">
                <p className="capitalize">{statusLabel(event.status)}</p>
                <p className="mt-1 text-xs text-inkSoft">
                  {new Date(event.timestamp).toLocaleString("en-GB", {
                    timeZone: "Africa/Kigali",
                  })}{" "}
                  CAT
                </p>
              </li>
            ))}
          </ol>
        </section>
      )}
    </main>
  );
}
