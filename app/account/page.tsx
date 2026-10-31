"use client";
import { useState } from "react";
import Link from "next/link";
import ServiceRequests from "@/components/ServiceRequests";
import { MyBids } from "@/components/Auctions";
import RequestList from "@/components/RequestList";
import ActivityOverview from "@/components/ActivityOverview";
import { useAuth } from "@/components/AuthProvider";
export default function Account() {
  const [desk, setDesk] = useState("pickups");
  const { user } = useAuth();
  return (
    <main className="mx-auto max-w-6xl px-5 py-10 sm:px-6">
      <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="eyebrow">MY DIGIPOSITA</p>
          <h1 className="mt-3 text-4xl font-semibold tracking-tight">
            Your everyday, connected.
          </h1>
          <p className="mt-3 text-sm text-inkSoft">
            {user?.displayName ? `Murakaza neza, ${user.displayName}. ` : ""}
            Your requests, next actions and journeys in one place.
          </p>
        </div>
        <Link href="/services#service-compass" className="button">
          Start something new ↗
        </Link>
      </div>
      <ActivityOverview onOpen={setDesk} />
      <div
        className="mt-10 flex flex-wrap gap-2 border-b border-ink/10 pb-4"
        role="group"
        aria-label="Your request categories"
      >
        {[
          ["pickups", "Pickups"],
          ["deliveries", "Deliveries"],
          ["applications", "Applications"],
          ["bids", "My auction bids"],
        ].map(([key, label]) => (
          <button
            key={key}
            onClick={() => setDesk(key)}
            aria-pressed={desk === key}
            className={`rounded-full px-5 py-2.5 text-sm font-medium ${desk === key ? "bg-brandBlue text-white" : "border border-ink/10 bg-white text-inkSoft"}`}
          >
            {label}
          </button>
        ))}
      </div>
      {desk === "pickups" ? (
        <RequestList key="pickups" service="pickups" />
      ) : desk === "deliveries" ? (
        <RequestList key="deliveries" service="deliveries" />
      ) : desk === "applications" ? (
        <ServiceRequests />
      ) : (
        <MyBids />
      )}
    </main>
  );
}
