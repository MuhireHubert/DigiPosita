"use client";
import Link from "next/link";
import { useState } from "react";
import { services } from "@/lib/services";
const allServices = [
  {
    key: "pickups",
    path: "/pickups",
    title: "Pickup scheduling",
    description: "Book a collection from your home or business.",
  },
  {
    key: "tracking",
    path: "/tracking",
    title: "Shipment tracking",
    description: "Follow your parcel’s journey with its tracking code.",
  },
  {
    key: "deliveries",
    path: "/deliveries",
    title: "Local deliveries",
    description: "Arrange a delivery between two locations.",
  },
  {
    key: "auctions",
    path: "/auctions",
    title: "Online auctions",
    description: "Browse items, place bids and follow auction closing times.",
  },
  ...services,
];
export default function ServiceCatalogue() {
  const [search, setSearch] = useState("");
  const items = allServices.filter((s) =>
    `${s.title} ${s.description}`.toLowerCase().includes(search.toLowerCase()),
  );
  return (
    <section>
      <label className="block max-w-xl text-sm">
        Find a service
        <input
          className="input mt-2"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Try documents, exports, auctions or P.O. boxes"
        />
      </label>
      <div className="mt-7 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((s, i) => (
          <Link
            key={s.key}
            href={s.path}
            className="rounded-xl border border-ink/10 bg-paper p-6 transition hover:-translate-y-1 hover:shadow-md"
          >
            <p className="font-mono text-xs text-goldDeep">
              {String(i + 1).padStart(2, "0")} / DIGITAL SERVICES
            </p>
            <h2 className="mt-6 font-display text-2xl">{s.title}</h2>
            <p className="mt-3 text-sm leading-relaxed text-inkSoft">
              {s.description}
            </p>
            <p className="mt-6 text-sm font-semibold text-green">
              Explore service ↗
            </p>
          </Link>
        ))}
      </div>
      {!items.length && (
        <p className="mt-6" role="status">
          No matching services. Try another search.
        </p>
      )}
    </section>
  );
}
