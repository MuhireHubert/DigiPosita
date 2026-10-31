"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import {
  collection,
  query,
  where,
  orderBy,
  limit,
  onSnapshot,
} from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useAuth } from "./AuthProvider";
import {
  summarizeActivity,
  attentionItems,
  type ActivityItem,
} from "@/lib/activity";
import { getService } from "@/lib/services";
import { statusLabel } from "@/lib/requests";
const sources = ["pickups", "deliveries", "service_requests"] as const;
export type WorkspaceDesk = "pickups" | "deliveries" | "applications";
function title(i: ActivityItem) {
  return i.source === "pickups"
    ? "Pickup request"
    : i.source === "deliveries"
      ? "Delivery request"
      : i.kind
        ? getService(i.kind)?.title || "Service request"
        : "Service request";
}
export default function ActivityOverview({
  operations = false,
  onOpen,
}: {
  operations?: boolean;
  onOpen: (desk: WorkspaceDesk) => void;
}) {
  const { user, staff } = useAuth();
  const [streams, setStreams] = useState<
    Partial<Record<(typeof sources)[number], ActivityItem[]>>
  >({});
  const [errors, setErrors] = useState<string[]>([]);
  useEffect(() => {
    setStreams({});
    setErrors([]);
    if (!user || (operations && !staff)) return;
    const stops = sources.map((source) =>
      onSnapshot(
        query(
          collection(db, source),
          ...(!operations ? [where("ownerId", "==", user.uid)] : []),
          orderBy("createdAt", "desc"),
          limit(100),
        ),
        (snap) => {
          setStreams((previous) => ({
            ...previous,
            [source]: snap.docs.map(
              (d) => ({ id: d.id, ...d.data(), source }) as ActivityItem,
            ),
          }));
          setErrors((previous) => previous.filter((s) => s !== source));
        },
        () =>
          setErrors((previous) =>
            previous.includes(source) ? previous : [...previous, source],
          ),
      ),
    );
    return () => stops.forEach((stop) => stop());
  }, [user, staff, operations]);
  const ready = sources.every((s) => streams[s]) && errors.length === 0;
  const items = sources.flatMap((s) => streams[s] || []);
  const summary = summarizeActivity(items, operations);
  const attention = attentionItems(items, operations).slice(0, 4);
  const shipment = items
    .filter(
      (i) =>
        i.trackingCode &&
        ["scheduled", "collected", "en_route"].includes(i.status),
    )
    .sort(
      (a, b) => (b.createdAt?.toMillis() || 0) - (a.createdAt?.toMillis() || 0),
    )[0];
  const stats = [
    ["Active requests", summary.active],
    ["On the move", summary.moving],
    [operations ? "Awaiting review" : "Needs your reply", summary.attention],
    ["Completed", summary.completed],
  ] as const;
  return (
    <section
      aria-label={
        operations ? "Live operations overview" : "Live account overview"
      }
    >
      <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
        <p className="flex items-center gap-2 text-xs font-semibold text-brandBlue">
          <span
            className="h-2 w-2 rounded-full bg-brandBlue"
            aria-hidden="true"
          />
          {ready
            ? "Request activity · updates automatically"
            : "Loading request activity…"}
        </p>
        <p className="text-xs text-inkSoft">
          Based on the latest 100 requests per service
        </p>
      </div>
      {errors.length > 0 && (
        <p
          role="alert"
          className="mb-4 rounded-xl bg-stamp/5 p-4 text-sm text-stamp"
        >
          Some activity could not load. Open an operation desk or reload to try
          again.
        </p>
      )}
      <div className="grid grid-cols-2 gap-3 xl:grid-cols-4">
        {stats.map(([label, value], index) => (
          <div
            key={label}
            className={`rounded-2xl border p-5 ${index === 2 ? "border-brandYellow bg-brandYellow/15" : "border-ink/10 bg-white"}`}
          >
            <p className="text-xs font-medium text-inkSoft">{label}</p>
            <p
              className="mt-3 text-3xl font-semibold tracking-tight"
              aria-label={`${label}: ${ready ? value : "loading"}`}
            >
              {ready ? value : "—"}
            </p>
          </div>
        ))}
      </div>
      <div className="mt-5 grid gap-4 xl:grid-cols-2">
        <div className="rounded-2xl border border-ink/10 bg-white p-6">
          <p className="eyebrow">
            {operations ? "THE NEXT REQUESTS TO REVIEW" : "YOUR NEXT ACTION"}
          </p>
          <h2 className="mt-3 text-xl font-semibold">
            {operations ? "Keep things moving." : "Stay a step ahead."}
          </h2>
          {!ready ? (
            <p className="mt-4 text-sm text-inkSoft">
              {errors.length
                ? "Activity is temporarily unavailable."
                : "Checking your requests…"}
            </p>
          ) : attention.length ? (
            <ul className="mt-4 space-y-2">
              {attention.map((i) => (
                <li key={`${i.source}/${i.id}`}>
                  <button
                    onClick={() =>
                      onOpen(
                        i.source === "service_requests"
                          ? "applications"
                          : i.source,
                      )
                    }
                    className="flex w-full items-center justify-between gap-3 rounded-xl bg-paper p-3 text-left text-sm transition hover:bg-paper2"
                  >
                    <span>
                      <strong className="font-medium">{title(i)}</strong>
                      <span className="mt-1 block text-xs text-inkSoft">
                        {operations
                          ? "Awaiting team review"
                          : "The team needs your response"}{" "}
                        · {i.id.slice(0, 8)}
                      </span>
                    </span>
                    <span aria-hidden="true">→</span>
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <p className="mt-4 text-sm leading-relaxed text-inkSoft">
              {operations
                ? "No requests are waiting for first review in these queues. Open a desk to manage work already in progress."
                : "You’re all caught up. Requests that need a reply from you will appear here."}
            </p>
          )}
        </div>
        <div className="relative overflow-hidden rounded-2xl bg-brandBlue p-6 text-white">
          <p className="text-xs font-semibold uppercase tracking-widest text-brandYellow">
            {shipment && !operations
              ? "YOUR LATEST ACTIVE SHIPMENT"
              : "ONE CONNECTED WORKSPACE"}
          </p>
          <h2 className="mt-3 text-xl font-semibold">
            {shipment && !operations
              ? statusLabel(shipment.status)
              : operations
                ? "From request to resolution."
                : "Less searching. More doing."}
          </h2>
          {shipment && !operations ? (
            <>
              <p className="mt-4 break-all font-mono text-sm text-white/80">
                {shipment.trackingCode}
              </p>
              <p className="mt-3 text-sm text-white/80">
                Open the journey to see shipment status updates as the team
                publishes them.
              </p>
              <Link
                className="mt-5 inline-block rounded-xl bg-brandYellow px-4 py-3 text-sm font-semibold text-ink"
                href={`/tracking?code=${encodeURIComponent(shipment.trackingCode!)}`}
              >
                Follow shipment →
              </Link>
            </>
          ) : (
            <>
              <p className="mt-4 text-sm leading-relaxed text-white/80">
                {operations
                  ? "Each desk brings together requests, customer directions and the next permitted action. Tracking updates publish when you advance a booking."
                  : "Use the service compass to find the right service and prepare what you need before you apply."}
              </p>
              <Link
                className="mt-5 inline-block rounded-xl bg-brandYellow px-4 py-3 text-sm font-semibold text-ink"
                href="/services#service-compass"
              >
                {operations
                  ? "Explore customer services"
                  : "Find my next service"}{" "}
                →
              </Link>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
