"use client";
import Link from "next/link";
import { useState } from "react";
import ServiceIcon from "./ServiceIcon";
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
  const [category, setCategory] = useState("All services");
  const groups: Record<string, string[]> = {
    "Send & receive": ["pickups", "tracking", "deliveries", "poboxes"],
    "Business & trade": ["exports", "trade", "shops", "auctions"],
    Applications: ["submissions", "kashi", "other"],
  };
  const items = allServices.filter(
    (s) =>
      `${s.title} ${s.description}`
        .toLowerCase()
        .includes(search.toLowerCase()) &&
      (category === "All services" || groups[category].includes(s.key)),
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
      <div
        className="mt-6 flex flex-wrap gap-2"
        role="group"
        aria-label="Service categories"
      >
        {["All services", ...Object.keys(groups)].map((group) => (
          <button
            key={group}
            onClick={() => setCategory(group)}
            aria-pressed={category === group}
            className={`rounded-full px-4 py-2.5 text-sm transition ${category === group ? "bg-green text-white" : "border border-ink/10 bg-white text-inkSoft hover:border-green"}`}
          >
            {group}
          </button>
        ))}
      </div>
      <p className="mt-7 text-xs text-inkSoft" role="status">
        {items.length} services available
      </p>
      <div className="mt-4 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((s) => (
          <Link
            key={s.key}
            href={s.path}
            className="group rounded-2xl border border-ink/10 bg-white p-6 transition hover:-translate-y-1 hover:border-green/40 hover:shadow-lg"
          >
            <div className="flex items-center justify-between">
              <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-green/10 text-green">
                <ServiceIcon name={s.key} />
              </span>
              <span
                aria-hidden="true"
                className="text-ink/30 transition group-hover:translate-x-1 group-hover:text-green"
              >
                ↗
              </span>
            </div>
            <h2 className="mt-5 text-lg font-semibold">{s.title}</h2>
            <p className="mt-3 text-sm leading-relaxed text-inkSoft">
              {s.description}
            </p>
            <p className="mt-6 text-sm font-semibold text-green">
              Get started →
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
