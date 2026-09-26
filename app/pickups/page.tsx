"use client";

import { useState } from "react";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";

export default function PickupsPage() {
  const [form, setForm] = useState({
    contactName: "",
    phone: "",
    address: "",
    weightKg: "",
    size: "medium",
    notes: "",
  });
  const [status, setStatus] = useState<"idle" | "saving" | "done" | "error">("idle");
  const [pickupId, setPickupId] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("saving");
    try {
      const docRef = await addDoc(collection(db, "pickups"), {
        contactName: form.contactName,
        phone: form.phone,
        address: form.address,
        weightKg: parseFloat(form.weightKg) || 0,
        size: form.size,
        notes: form.notes,
        status: "requested",
        createdAt: serverTimestamp(),
      });
      setPickupId(docRef.id);
      setStatus("done");
    } catch (err) {
      console.error(err);
      setStatus("error");
    }
  }

  if (status === "done") {
    return (
      <main className="mx-auto max-w-lg px-6 py-16">
        <h1 className="font-display text-2xl font-semibold">Pickup requested</h1>
        <p className="mt-3 text-inkSoft">
          Reference: <span className="font-mono text-ink">{pickupId}</span>
        </p>
        <p className="mt-2 text-sm text-inkSoft">
          A courier will confirm a collection window by phone.
        </p>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-lg px-6 py-16">
      <h1 className="font-display text-2xl font-semibold">Schedule a pickup</h1>
      <form onSubmit={handleSubmit} className="mt-8 space-y-4">
        <Field label="Contact name">
          <input required className="input" value={form.contactName}
            onChange={(e) => setForm({ ...form, contactName: e.target.value })} />
        </Field>
        <Field label="Phone">
          <input required className="input" value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })} />
        </Field>
        <Field label="Pickup address">
          <input required className="input" value={form.address}
            onChange={(e) => setForm({ ...form, address: e.target.value })} />
        </Field>
        <Field label="Weight (kg)">
          <input required type="number" step="0.1" min="0.1" className="input" value={form.weightKg}
            onChange={(e) => setForm({ ...form, weightKg: e.target.value })} />
        </Field>
        <Field label="Size">
          <select className="input" value={form.size}
            onChange={(e) => setForm({ ...form, size: e.target.value })}>
            <option value="small">Small (envelope / documents)</option>
            <option value="medium">Medium (parcel)</option>
            <option value="large">Large (box)</option>
          </select>
        </Field>
        <Field label="Notes (optional)">
          <input className="input" value={form.notes}
            onChange={(e) => setForm({ ...form, notes: e.target.value })} />
        </Field>
        <button type="submit" disabled={status === "saving"}
          className="mt-2 rounded bg-ink px-5 py-2.5 text-white hover:bg-green disabled:opacity-60">
          {status === "saving" ? "Saving…" : "Request pickup"}
        </button>
        {status === "error" && (
          <p className="text-sm text-stamp">
            Couldn&rsquo;t save the request &mdash; check your Firebase config and try again.
          </p>
        )}
      </form>
    </main>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block text-sm text-inkSoft">
      {label}
      <div className="mt-1">{children}</div>
    </label>
  );
}
