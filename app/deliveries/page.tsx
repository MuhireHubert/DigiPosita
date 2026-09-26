"use client";

import { useEffect, useState } from "react";
import { addDoc, collection, onSnapshot, orderBy, query, serverTimestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";
import type { DeliveryRequest } from "@/lib/types";

export default function DeliveriesPage() {
  const [requests, setRequests] = useState<DeliveryRequest[]>([]);
  const [form, setForm] = useState({ requesterName: "", fromLocation: "", toLocation: "", goodsType: "", weightKg: "" });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const q = query(collection(db, "deliveries"), orderBy("createdAt", "desc"));
    const unsub = onSnapshot(q, (snap) => {
      setRequests(snap.docs.slice(0, 10).map((d) => ({ id: d.id, ...(d.data() as Omit<DeliveryRequest, "id">) })));
    });
    return () => unsub();
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    try {
      await addDoc(collection(db, "deliveries"), {
        requesterName: form.requesterName,
        fromLocation: form.fromLocation,
        toLocation: form.toLocation,
        goodsType: form.goodsType,
        weightKg: parseFloat(form.weightKg) || 0,
        status: "requested",
        createdAt: serverTimestamp(),
      });
      setForm({ requesterName: "", fromLocation: "", toLocation: "", goodsType: "", weightKg: "" });
    } finally {
      setSaving(false);
    }
  }

  return (
    <main className="mx-auto max-w-lg px-6 py-16">
      <h1 className="font-display text-2xl font-semibold">Local deliveries</h1>
      <p className="mt-2 text-sm text-inkSoft">Farm-to-supermarket and other last-mile runs on the same network.</p>

      <form onSubmit={handleSubmit} className="mt-8 space-y-4">
        <input required placeholder="Your name" className="input" value={form.requesterName}
          onChange={(e) => setForm({ ...form, requesterName: e.target.value })} />
        <input required placeholder="From (e.g. Musanze farm)" className="input" value={form.fromLocation}
          onChange={(e) => setForm({ ...form, fromLocation: e.target.value })} />
        <input required placeholder="To (e.g. Kimironko supermarket)" className="input" value={form.toLocation}
          onChange={(e) => setForm({ ...form, toLocation: e.target.value })} />
        <input required placeholder="Goods (e.g. Irish potatoes)" className="input" value={form.goodsType}
          onChange={(e) => setForm({ ...form, goodsType: e.target.value })} />
        <input required type="number" step="0.1" placeholder="Weight (kg)" className="input" value={form.weightKg}
          onChange={(e) => setForm({ ...form, weightKg: e.target.value })} />
        <button type="submit" disabled={saving}
          className="rounded bg-ink px-5 py-2.5 text-white hover:bg-green disabled:opacity-60">
          {saving ? "Sending…" : "Request delivery"}
        </button>
      </form>

      <h2 className="mt-12 font-display text-lg font-semibold">Recent requests</h2>
      <ul className="mt-4 space-y-3">
        {requests.length === 0 && <li className="text-sm text-inkSoft">No requests yet.</li>}
        {requests.map((r) => (
          <li key={r.id} className="border-l-2 border-goldDeep bg-paper2 p-3 text-sm">
            <span className="font-medium">{r.fromLocation} &rarr; {r.toLocation}</span>
            <span className="ml-2 text-inkSoft">({r.goodsType}, {r.weightKg}kg)</span>
          </li>
        ))}
      </ul>
    </main>
  );
}
