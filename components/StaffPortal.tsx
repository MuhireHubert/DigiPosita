"use client";
import { useState } from "react";
import ServiceRequests from "./ServiceRequests";
import Auctions from "./Auctions";
import RequestList from "./RequestList";
import ServiceIcon from "./ServiceIcon";
const desks = [
  {
    key: "overview",
    label: "Overview",
    icon: "other",
    description: "Choose an operation desk.",
  },
  {
    key: "pickups",
    label: "Pickup desk",
    icon: "pickups",
    description:
      "Confirm collections, review location pins and publish shipment updates.",
  },
  {
    key: "deliveries",
    label: "Delivery desk",
    icon: "deliveries",
    description:
      "Manage local deliveries, route directions and delivery status.",
  },
  {
    key: "applications",
    label: "Service applications",
    icon: "submissions",
    description:
      "Review documents, assign P.O. boxes, respond to trade and Kashi enquiries, and approve shops.",
  },
  {
    key: "auctions",
    label: "IPOSITA auctions",
    icon: "auctions",
    description: "List IPOSITA-owned assets, monitor bids and review winners.",
  },
];
export default function StaffPortal() {
  const [desk, setDesk] = useState("overview");
  return (
    <main className="mx-auto max-w-6xl px-5 py-10 sm:px-6">
      <p className="eyebrow">IPOSITA STAFF PORTAL</p>
      <h1 className="mt-3 font-display text-4xl">Operations workspace</h1>
      <p className="mt-4 text-inkSoft">
        Manage customer requests, locations, applications, shop approvals and
        IPOSITA auctions.
      </p>
      <div className="mt-8 grid items-start gap-7 lg:grid-cols-[230px_1fr]">
        <nav
          aria-label="Operation desks"
          className="flex flex-wrap gap-2 rounded-2xl border border-ink/10 bg-white p-3 lg:sticky lg:top-5 lg:flex-col"
        >
          {desks.map((d) => (
            <button
              key={d.key}
              aria-pressed={desk === d.key}
              onClick={() => setDesk(d.key)}
              className={`flex items-center gap-3 rounded-xl px-4 py-3 text-left text-sm ${desk === d.key ? "bg-green text-white" : "text-inkSoft hover:bg-green/5"}`}
            >
              <ServiceIcon name={d.icon} />
              {d.label}
            </button>
          ))}
        </nav>
        <div className="min-w-0">
          {desk === "overview" ? (
            <section>
              <h2 className="text-xl font-semibold">
                Every operation, one workspace.
              </h2>
              <p className="mt-2 text-sm text-inkSoft">
                Open a desk to review its live queue. Customer details and
                precise locations remain restricted to authorized staff and
                their account owner.
              </p>
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                {desks.slice(1).map((d) => (
                  <button
                    key={d.key}
                    onClick={() => setDesk(d.key)}
                    className="rounded-2xl border border-ink/10 bg-white p-6 text-left transition hover:border-green"
                  >
                    <span className="text-green">
                      <ServiceIcon name={d.icon} />
                    </span>
                    <h3 className="mt-4 font-semibold">{d.label} ↗</h3>
                    <p className="mt-2 text-sm text-inkSoft">{d.description}</p>
                  </button>
                ))}
              </div>
              <a
                className="mt-6 inline-block text-sm font-semibold text-green"
                href="https://epobox.app/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Open ePobox platform ↗
              </a>
            </section>
          ) : desk === "pickups" ? (
            <RequestList key="pickups" service="pickups" operations />
          ) : desk === "deliveries" ? (
            <RequestList key="deliveries" service="deliveries" operations />
          ) : desk === "applications" ? (
            <ServiceRequests operations />
          ) : (
            <Auctions operations />
          )}
        </div>
      </div>
    </main>
  );
}
