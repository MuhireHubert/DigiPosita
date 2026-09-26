"use client";

import { useEffect, useState } from "react";
import { addDoc, collection, onSnapshot, orderBy, query, serverTimestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";
import type { AuctionListing } from "@/lib/types";

export default function AuctionsPage() {
  const [listings, setListings] = useState<AuctionListing[]>([]);
  const [form, setForm] = useState({ title: "", description: "", startingPriceRwf: "", sellerName: "", closesAt: "" });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const q = query(collection(db, "auctions"), orderBy("createdAt", "desc"));
    const unsub = onSnapshot(q, (snap) => {
      setListings(snap.docs.map((d) => ({ id: d.id, ...(d.data() as Omit<AuctionListing, "id">) })));
    });
    return () => unsub();
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    try {
      await addDoc(collection(db, "auctions"), {
        ...form,
        startingPriceRwf: parseFloat(form.startingPriceRwf) || 0,
        status: "open",
        createdAt: serverTimestamp(),
      });
      setForm({ title: "", description: "", startingPriceRwf: "", sellerName: "", closesAt: "" });
    } finally {
      setSaving(false);
    }
  }

  return (
    <main className="mx-auto max-w-lg px-6 py-16">
      <h1 className="font-display text-2xl font-semibold">Online auctions</h1>

      <form onSubmit={handleSubmit} className="mt-8 space-y-4">
        <input required placeholder="Item title" className="input" value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })} />
        <textarea required placeholder="Description" className="input" rows={3} value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })} />
        <input required type="number" placeholder="Starting price (RWF)" className="input" value={form.startingPriceRwf}
          onChange={(e) => setForm({ ...form, startingPriceRwf: e.target.value })} />
        <input required placeholder="Seller name" className="input" value={form.sellerName}
          onChange={(e) => setForm({ ...form, sellerName: e.target.value })} />
        <label className="block text-sm text-inkSoft">
          Closes at
          <input required type="datetime-local" className="input mt-1" value={form.closesAt}
            onChange={(e) => setForm({ ...form, closesAt: e.target.value })} />
        </label>
        <button type="submit" disabled={saving}
          className="rounded bg-ink px-5 py-2.5 text-white hover:bg-green disabled:opacity-60">
          {saving ? "Listing…" : "List item"}
        </button>
      </form>

      <h2 className="mt-12 font-display text-lg font-semibold">Open listings</h2>
      <ul className="mt-4 space-y-3">
        {listings.length === 0 && <li className="text-sm text-inkSoft">No listings yet.</li>}
        {listings.map((l) => (
          <li key={l.id} className="border-l-2 border-goldDeep bg-paper2 p-3 text-sm">
            <div className="font-medium">{l.title}</div>
            <div className="text-inkSoft">{l.description}</div>
            <div className="mt-1">From RWF {l.startingPriceRwf.toLocaleString("en-US")} &middot; closes {new Date(l.closesAt).toLocaleString()}</div>
          </li>
        ))}
      </ul>
      <p className="mt-6 text-xs text-inkSoft">
        Bidding isn&rsquo;t wired in yet &mdash; this lists items live; add a <code className="font-mono">bids</code> subcollection when you&rsquo;re ready for it.
      </p>
    </main>
  );
}
