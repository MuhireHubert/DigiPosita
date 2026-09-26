"use client";

export const dynamic = 'force-dynamic';

import { useState } from "react";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";

export default function SubmissionsPage() {
  const [form, setForm] = useState({ submitterName: "", type: "tender", description: "" });
  const [status, setStatus] = useState<"idle" | "saving" | "done" | "error">("idle");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("saving");
    try {
      await addDoc(collection(db, "submissions"), { ...form, status: "received", createdAt: serverTimestamp() });
      setStatus("done");
    } catch (err) {
      console.error(err);
      setStatus("error");
    }
  }

  if (status === "done") {
    return (
      <main className="mx-auto max-w-lg px-6 py-16">
        <h1 className="font-display text-2xl font-semibold">Submission received</h1>
        <p className="mt-2 text-sm text-inkSoft">It will appear in the staff review queue.</p>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-lg px-6 py-16">
      <h1 className="font-display text-2xl font-semibold">Submit a document</h1>
      <p className="mt-2 text-sm text-inkSoft">Tenders, job applications and receipts, without a counter visit.</p>
      <form onSubmit={handleSubmit} className="mt-8 space-y-4">
        <input required placeholder="Your name" className="input" value={form.submitterName}
          onChange={(e) => setForm({ ...form, submitterName: e.target.value })} />
        <select className="input" value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })}>
          <option value="tender">Tender</option>
          <option value="job_application">Job application</option>
          <option value="receipt">Receipt</option>
        </select>
        <textarea required placeholder="Description / reference number" className="input" rows={4} value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })} />
        <p className="text-xs text-inkSoft">
          File attachments need Firebase Storage wired in (see README) &mdash; this MVP captures the record; attach the document by reference for now.
        </p>
        <button type="submit" disabled={status === "saving"}
          className="rounded bg-ink px-5 py-2.5 text-white hover:bg-green disabled:opacity-60">
          {status === "saving" ? "Sending…" : "Submit"}
        </button>
        {status === "error" && <p className="text-sm text-stamp">Couldn&rsquo;t save &mdash; check your Firebase config.</p>}
      </form>
    </main>
  );
}
