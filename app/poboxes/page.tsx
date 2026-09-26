"use client";

import { useState } from "react";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";

export default function POBoxesPage() {
  const [form, setForm] = useState({ orgName: "", orgType: "school", contactEmail: "", contactPhone: "" });
  const [status, setStatus] = useState<"idle" | "saving" | "done" | "error">("idle");
  const [refId, setRefId] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("saving");
    try {
      const ref = await addDoc(collection(db, "poboxes"), {
        ...form,
        status: "pending",
        createdAt: serverTimestamp(),
      });
      setRefId(ref.id);
      setStatus("done");
    } catch (err) {
      console.error(err);
      setStatus("error");
    }
  }

  if (status === "done") {
    return (
      <main className="mx-auto max-w-lg px-6 py-16">
        <h1 className="font-display text-2xl font-semibold">e-P.O. box requested</h1>
        <p className="mt-3 text-inkSoft">Reference: <span className="font-mono text-ink">{refId}</span></p>
        <p className="mt-2 text-sm text-inkSoft">A box number will be assigned once verified at an Iposita counter.</p>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-lg px-6 py-16">
      <h1 className="font-display text-2xl font-semibold">Register an e-P.O. box</h1>
      <p className="mt-2 text-sm text-inkSoft">For studios, schools, real estate agencies, notaries and banking services.</p>
      <form onSubmit={handleSubmit} className="mt-8 space-y-4">
        <input required placeholder="Organization name" className="input" value={form.orgName}
          onChange={(e) => setForm({ ...form, orgName: e.target.value })} />
        <select className="input" value={form.orgType} onChange={(e) => setForm({ ...form, orgType: e.target.value })}>
          <option value="school">School</option>
          <option value="studio">Studio</option>
          <option value="real_estate">Real estate agency</option>
          <option value="notary">Notary</option>
          <option value="bank">Banking service</option>
          <option value="other">Other</option>
        </select>
        <input required type="email" placeholder="Contact email" className="input" value={form.contactEmail}
          onChange={(e) => setForm({ ...form, contactEmail: e.target.value })} />
        <input required placeholder="Contact phone" className="input" value={form.contactPhone}
          onChange={(e) => setForm({ ...form, contactPhone: e.target.value })} />
        <button type="submit" disabled={status === "saving"}
          className="rounded bg-ink px-5 py-2.5 text-white hover:bg-green disabled:opacity-60">
          {status === "saving" ? "Saving…" : "Request box"}
        </button>
        {status === "error" && <p className="text-sm text-stamp">Couldn&rsquo;t save &mdash; check your Firebase config.</p>}
      </form>
    </main>
  );
}
