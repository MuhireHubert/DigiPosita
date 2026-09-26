"use client";

import { useState } from "react";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";

export default function TradePage() {
  const [form, setForm] = useState({
    companyName: "", contactEmail: "", tradeDirection: "export",
    productCategory: "", targetCountry: "", notes: "",
  });
  const [status, setStatus] = useState<"idle" | "saving" | "done" | "error">("idle");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("saving");
    try {
      await addDoc(collection(db, "trade_inquiries"), { ...form, createdAt: serverTimestamp() });
      setStatus("done");
    } catch (err) {
      console.error(err);
      setStatus("error");
    }
  }

  if (status === "done") {
    return (
      <main className="mx-auto max-w-lg px-6 py-16">
        <h1 className="font-display text-2xl font-semibold">Inquiry received</h1>
        <p className="mt-2 text-sm text-inkSoft">The AfCFTA trade desk will follow up.</p>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-lg px-6 py-16">
      <h1 className="font-display text-2xl font-semibold">AfCFTA trade lane</h1>
      <p className="mt-2 text-sm text-inkSoft">Cross-border trade facilitation under the continental free trade area.</p>
      <form onSubmit={handleSubmit} className="mt-8 space-y-4">
        <input required placeholder="Company name" className="input" value={form.companyName}
          onChange={(e) => setForm({ ...form, companyName: e.target.value })} />
        <input required type="email" placeholder="Contact email" className="input" value={form.contactEmail}
          onChange={(e) => setForm({ ...form, contactEmail: e.target.value })} />
        <select className="input" value={form.tradeDirection} onChange={(e) => setForm({ ...form, tradeDirection: e.target.value })}>
          <option value="export">Exporting from Rwanda</option>
          <option value="import">Importing into Rwanda</option>
        </select>
        <input required placeholder="Product category" className="input" value={form.productCategory}
          onChange={(e) => setForm({ ...form, productCategory: e.target.value })} />
        <input required placeholder="Target country" className="input" value={form.targetCountry}
          onChange={(e) => setForm({ ...form, targetCountry: e.target.value })} />
        <textarea placeholder="Notes (optional)" className="input" rows={3} value={form.notes}
          onChange={(e) => setForm({ ...form, notes: e.target.value })} />
        <button type="submit" disabled={status === "saving"}
          className="rounded bg-ink px-5 py-2.5 text-white hover:bg-green disabled:opacity-60">
          {status === "saving" ? "Sending…" : "Send inquiry"}
        </button>
        {status === "error" && <p className="text-sm text-stamp">Couldn&rsquo;t save &mdash; check your Firebase config.</p>}
      </form>
    </main>
  );
}
