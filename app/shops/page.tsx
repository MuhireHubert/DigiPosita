"use client";

import { useEffect, useState } from "react";
import { addDoc, collection, onSnapshot, orderBy, query, serverTimestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";
import type { Shop } from "@/lib/types";

export default function ShopsPage() {
  const [shops, setShops] = useState<Shop[]>([]);
  const [form, setForm] = useState({ shopName: "", sector: "", ownerName: "", phone: "", location: "", description: "" });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const q = query(collection(db, "shops"), orderBy("createdAt", "desc"));
    const unsub = onSnapshot(q, (snap) => {
      setShops(snap.docs.map((d) => ({ id: d.id, ...(d.data() as Omit<Shop, "id">) })));
    });
    return () => unsub();
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    try {
      await addDoc(collection(db, "shops"), { ...form, createdAt: serverTimestamp() });
      setForm({ shopName: "", sector: "", ownerName: "", phone: "", location: "", description: "" });
    } finally {
      setSaving(false);
    }
  }

  return (
    <main className="mx-auto max-w-lg px-6 py-16">
      <h1 className="font-display text-2xl font-semibold">Local shop directory</h1>
      <p className="mt-2 text-sm text-inkSoft">Sector-specific gift shops with no online presence, listed and reachable.</p>

      <form onSubmit={handleSubmit} className="mt-8 space-y-4">
        <input required placeholder="Shop name" className="input" value={form.shopName}
          onChange={(e) => setForm({ ...form, shopName: e.target.value })} />
        <input required placeholder="Sector (e.g. wedding gifts, home decor)" className="input" value={form.sector}
          onChange={(e) => setForm({ ...form, sector: e.target.value })} />
        <input required placeholder="Owner name" className="input" value={form.ownerName}
          onChange={(e) => setForm({ ...form, ownerName: e.target.value })} />
        <input required placeholder="Phone" className="input" value={form.phone}
          onChange={(e) => setForm({ ...form, phone: e.target.value })} />
        <input required placeholder="Location" className="input" value={form.location}
          onChange={(e) => setForm({ ...form, location: e.target.value })} />
        <textarea placeholder="Short description" className="input" rows={2} value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })} />
        <button type="submit" disabled={saving}
          className="rounded bg-ink px-5 py-2.5 text-white hover:bg-green disabled:opacity-60">
          {saving ? "Adding…" : "List shop"}
        </button>
      </form>

      <h2 className="mt-12 font-display text-lg font-semibold">Directory</h2>
      <ul className="mt-4 space-y-3">
        {shops.length === 0 && <li className="text-sm text-inkSoft">No shops listed yet.</li>}
        {shops.map((s) => (
          <li key={s.id} className="border-l-2 border-goldDeep bg-paper2 p-3 text-sm">
            <div className="font-medium">{s.shopName} &middot; {s.sector}</div>
            <div className="text-inkSoft">{s.location} &middot; {s.phone}</div>
          </li>
        ))}
      </ul>
    </main>
  );
}
