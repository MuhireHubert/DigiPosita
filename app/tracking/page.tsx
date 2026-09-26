"use client";

import { useState } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "@/lib/firebase";
import type { Shipment } from "@/lib/types";

export default function TrackingPage() {
  const [code, setCode] = useState("");
  const [result, setResult] = useState<Shipment | "not_found" | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setResult(null);
    try {
      const q = query(collection(db, "shipments"), where("trackingCode", "==", code.trim()));
      const snap = await getDocs(q);
      if (snap.empty) {
        setResult("not_found");
      } else {
        const doc = snap.docs[0];
        setResult({ id: doc.id, ...(doc.data() as Omit<Shipment, "id">) });
      }
    } catch (err) {
      console.error(err);
      setResult("not_found");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="mx-auto max-w-lg px-6 py-16">
      <h1 className="font-display text-2xl font-semibold">Track a shipment</h1>
      <form onSubmit={handleSearch} className="mt-8 flex gap-3">
        <input
          className="input"
          placeholder="e.g. IP-2026-00931"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          required
        />
        <button type="submit" disabled={loading}
          className="shrink-0 rounded bg-ink px-5 py-2.5 text-white hover:bg-green disabled:opacity-60">
          {loading ? "Searching…" : "Track"}
        </button>
      </form>

      {result === "not_found" && (
        <p className="mt-6 text-sm text-stamp">No shipment found for that code.</p>
      )}

      {result && result !== "not_found" && (
        <div className="mt-6 border-l-2 border-goldDeep bg-paper2 p-4 text-sm">
          <div className="font-mono font-semibold">{result.trackingCode}</div>
          <div className="mt-1 text-inkSoft">
            {result.originOffice} &rarr; {result.destination}
          </div>
          <div className="mt-2 font-medium capitalize">{result.status.replace("_", " ")}</div>
        </div>
      )}

      <p className="mt-8 text-xs text-inkSoft">
        No shipments in the database yet? Run <code className="font-mono">npm run seed</code> to add a sample record (see README).
      </p>
    </main>
  );
}
