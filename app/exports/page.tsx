"use client";

import { useState } from "react";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";

export default function ExportsPage() {
  const [form, setForm] = useState({
    requesterName: "", channel: "individual_export", companyName: "",
    goodsDescription: "", destinationCountry: "", weightKg: "",
  });
  const [status, setStatus] = useState<"idle" | "saving" | "done" | "error">("idle");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("saving");
    try {
      await addDoc(collection(db, "exports"), {
        ...form,
        weightKg: parseFloat(form.weightKg) || 0,
        status: "requested",
        createdAt: serverTimestamp(),
      });
      setStatus("done");
    } catch (err) {
      console.error(err);
      setStatus("error");
    }
  }

  if (status === "done") {
    return (
      <main className="mx-auto max-w-lg px-6 py-16">
        <h1 className="font-display text-2xl font-semibold">Export request sent</h1>
        <p className="mt-2 text-sm text-inkSoft">A quote will follow by email or phone.</p>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-lg px-6 py-16">
      <h1 className="font-display text-2xl font-semibold">Small exports &amp; China shipping</h1>
      <form onSubmit={handleSubmit} className="mt-8 space-y-4">
        <input required placeholder="Your name" className="input" value={form.requesterName}
          onChange={(e) => setForm({ ...form, requesterName: e.target.value })} />
        <select className="input" value={form.channel} onChange={(e) => setForm({ ...form, channel: e.target.value })}>
          <option value="individual_export">Individual / small export</option>
          <option value="china_corporate">Corporate &mdash; China shipping lane</option>
        </select>
        {form.channel === "china_corporate" && (
          <input placeholder="Company name" className="input" value={form.companyName}
            onChange={(e) => setForm({ ...form, companyName: e.target.value })} />
        )}
        <input required placeholder="Goods description" className="input" value={form.goodsDescription}
          onChange={(e) => setForm({ ...form, goodsDescription: e.target.value })} />
        <input required placeholder="Destination country" className="input" value={form.destinationCountry}
          onChange={(e) => setForm({ ...form, destinationCountry: e.target.value })} />
        <input required type="number" step="0.1" placeholder="Weight (kg)" className="input" value={form.weightKg}
          onChange={(e) => setForm({ ...form, weightKg: e.target.value })} />
        <button type="submit" disabled={status === "saving"}
          className="rounded bg-ink px-5 py-2.5 text-white hover:bg-green disabled:opacity-60">
          {status === "saving" ? "Sending…" : "Request quote"}
        </button>
        {status === "error" && <p className="text-sm text-stamp">Couldn&rsquo;t save &mdash; check your Firebase config.</p>}
      </form>
    </main>
  );
}
