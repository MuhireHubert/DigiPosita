"use client";

import { useState } from "react";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";

// Iposita Kashi — KYC intake only. No money movement happens here.
// This queues an application for manual review until a BNR (or equivalent)
// e-money / payment services license is in place. See README before launch.

export default function KashiPage() {
  const [form, setForm] = useState({
    fullName: "", phone: "", email: "", accountType: "personal",
    idType: "national_id", idReference: "",
  });
  const [status, setStatus] = useState<"idle" | "saving" | "done" | "error">("idle");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("saving");
    try {
      await addDoc(collection(db, "kashi_applications"), {
        ...form,
        status: "pending_review",
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
        <h1 className="font-display text-2xl font-semibold">Application received</h1>
        <p className="mt-2 text-sm text-inkSoft">
          A Kashi account isn&rsquo;t active yet &mdash; this reserves your place for manual review once the service launches.
        </p>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-lg px-6 py-16">
      <h1 className="font-display text-2xl font-semibold">Iposita Kashi &mdash; account application</h1>
      <div className="mt-3 border-l-2 border-stamp bg-paper2 p-4 text-sm text-inkSoft">
        This intake form does not move money. Deposits, withdrawals and savings
        stay disabled until a licensed payment provider is integrated. See the
        README for what&rsquo;s required before this can go live.
      </div>
      <form onSubmit={handleSubmit} className="mt-8 space-y-4">
        <input required placeholder="Full name" className="input" value={form.fullName}
          onChange={(e) => setForm({ ...form, fullName: e.target.value })} />
        <input required placeholder="Phone" className="input" value={form.phone}
          onChange={(e) => setForm({ ...form, phone: e.target.value })} />
        <input required type="email" placeholder="Email" className="input" value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })} />
        <select className="input" value={form.accountType} onChange={(e) => setForm({ ...form, accountType: e.target.value })}>
          <option value="personal">Personal account</option>
          <option value="business">Business account</option>
        </select>
        <select className="input" value={form.idType} onChange={(e) => setForm({ ...form, idType: e.target.value })}>
          <option value="national_id">National ID</option>
          <option value="passport">Passport</option>
        </select>
        <input required placeholder="Last 4 digits of ID/passport (verification is done in person)" className="input"
          maxLength={4} value={form.idReference}
          onChange={(e) => setForm({ ...form, idReference: e.target.value })} />
        <button type="submit" disabled={status === "saving"}
          className="rounded bg-ink px-5 py-2.5 text-white hover:bg-green disabled:opacity-60">
          {status === "saving" ? "Sending…" : "Apply"}
        </button>
        {status === "error" && <p className="text-sm text-stamp">Couldn&rsquo;t save &mdash; check your Firebase config.</p>}
      </form>
    </main>
  );
}
