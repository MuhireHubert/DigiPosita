"use client";
import { useEffect, useState } from "react";
import { collection, limit, onSnapshot, query } from "firebase/firestore";
import { db, configured } from "@/lib/firebase";
interface Shop {
  id: string;
  shopName: string;
  category: string;
  location: string;
  description: string;
  phone: string;
}
export default function ShopDirectory() {
  const [shops, setShops] = useState<Shop[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(configured);
  const [error, setError] = useState("");
  useEffect(() => {
    if (!configured) return;
    return onSnapshot(
      query(collection(db, "public_shops"), limit(100)),
      (s) => {
        setShops(s.docs.map((d) => ({ id: d.id, ...d.data() }) as Shop));
        setLoading(false);
      },
      () => {
        setLoading(false);
        setError("Could not load the directory.");
      },
    );
  }, []);
  const matches = shops.filter((s) =>
    `${s.shopName} ${s.category} ${s.location}`
      .toLowerCase()
      .includes(search.toLowerCase()),
  );
  return (
    <section>
      <label className="block text-sm">
        Find a shop
        <input
          className="input mt-2"
          placeholder="Name, category or location"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </label>
      {loading && (
        <p role="status" className="mt-5">
          Loading shops…
        </p>
      )}
      {error && (
        <p role="alert" className="mt-5">
          {error}
        </p>
      )}
      <div className="mt-6 grid gap-5 sm:grid-cols-2">
        {matches.map((s) => (
          <article
            key={s.id}
            className="rounded-xl border border-ink/10 bg-paper2 p-6"
          >
            <p className="eyebrow">{s.category}</p>
            <h2 className="mt-3 font-display text-xl">{s.shopName}</h2>
            <p className="mt-2 text-sm">{s.location}</p>
            <p className="mt-3 text-sm text-inkSoft">{s.description}</p>
            <p className="mt-4 text-sm font-semibold">{s.phone}</p>
          </article>
        ))}
      </div>
      {!loading && !error && !matches.length && (
        <p className="mt-6 text-sm text-inkSoft">
          {configured
            ? "No matching shops yet. Approved businesses will appear here."
            : "The directory will be available once online services are configured."}
        </p>
      )}
    </section>
  );
}
