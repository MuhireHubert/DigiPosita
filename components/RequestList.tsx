"use client";
import { LocationDetails } from "./LocationCapture";
import Link from "next/link";
import { useEffect, useState } from "react";
import {
  collection,
  doc,
  limit,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useAuth } from "./AuthProvider";
import {
  advanceRequest,
  statusLabel,
  transitions,
  type Service,
  type ServiceRequest,
} from "@/lib/requests";
export default function RequestList({
  service,
  operations = false,
}: {
  service: Service;
  operations?: boolean;
}) {
  const { user, staff } = useAuth();
  const [items, setItems] = useState<ServiceRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [busy, setBusy] = useState<string | null>(null);
  useEffect(() => {
    if (!user || (operations && !staff)) return;
    setLoading(true);
    setError("");
    setItems([]);
    const q = operations
      ? query(collection(db, service), orderBy("createdAt", "desc"), limit(100))
      : query(
          collection(db, service),
          where("ownerId", "==", user.uid),
          orderBy("createdAt", "desc"),
          limit(50),
        );
    return onSnapshot(
      q,
      (snap) => {
        setItems(
          snap.docs.map((d) => ({ id: d.id, ...d.data() }) as ServiceRequest),
        );
        setLoading(false);
      },
      () => {
        setLoading(false);
        setError("Could not load requests. Please reload and try again.");
      },
    );
  }, [user, staff, operations, service]);
  async function change(item: ServiceRequest, cancel = false) {
    if (busy) return;
    setBusy(item.id);
    setError("");
    try {
      if (cancel)
        await updateDoc(doc(db, service, item.id), {
          status: "cancelled",
          updatedAt: serverTimestamp(),
        });
      else await advanceRequest(service, item.id, item.status);
    } catch (e) {
      setError(
        e instanceof Error ? e.message : "Unable to update this request.",
      );
    } finally {
      setBusy(null);
    }
  }
  return (
    <section className="mt-10">
      <h2 className="font-display text-2xl">
        {service === "pickups" ? "Pickups" : "Local deliveries"}
      </h2>
      <p className="mt-2 text-xs text-inkSoft">
        {operations
          ? "Latest 100 bookings. Advance a booking to publish its tracking updates."
          : "Your latest 50 bookings. Updates appear here automatically."}
      </p>
      {loading && (
        <p className="mt-4" role="status">
          Loading requests…
        </p>
      )}
      {error && (
        <p className="mt-4 text-stamp" role="alert">
          {error}
        </p>
      )}
      {!loading && !error && items.length === 0 && (
        <div className="mt-5 rounded-lg border border-ink/10 p-6">
          <p>No {service} yet.</p>
          {!operations && (
            <Link className="mt-3 inline-block text-green" href={`/${service}`}>
              Make your first request →
            </Link>
          )}
        </div>
      )}
      {operations && (
        <div className="mt-5 grid gap-3 sm:grid-cols-2">
          <label className="text-sm">
            Search bookings
            <input
              className="input mt-1"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Name, phone, address or reference"
            />
          </label>
          <label className="text-sm">
            Booking status
            <select
              className="input mt-1"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            >
              {[
                "all",
                "requested",
                ...Object.values(transitions[service]),
                "cancelled",
              ].map((s) => (
                <option key={s} value={s}>
                  {statusLabel(s)}
                </option>
              ))}
            </select>
          </label>
        </div>
      )}
      <ul className="mt-5 space-y-4">
        {items
          .filter(
            (item) =>
              (!operations || filter === "all" || item.status === filter) &&
              (!operations ||
                [
                  item.id,
                  item.contactName,
                  item.requesterName,
                  item.phone,
                  item.address,
                  item.fromLocation,
                  item.toLocation,
                ]
                  .join(" ")
                  .toLowerCase()
                  .includes(search.toLowerCase())),
          )
          .map((item) => (
            <li
              key={item.id}
              className="rounded-lg border border-ink/10 bg-paper2 p-5"
            >
              <div className="flex flex-wrap items-center justify-between gap-3">
                <h3 className="font-semibold">
                  {service === "pickups"
                    ? item.address
                    : `${item.fromLocation} → ${item.toLocation}`}
                </h3>
                <span className="rounded-full bg-white px-3 py-1 text-xs font-medium capitalize">
                  {statusLabel(item.status)}
                </span>
              </div>
              <p className="mt-2 text-sm text-inkSoft">
                {item.contactName || item.requesterName} · {item.weightKg} kg{" "}
                {operations && item.phone ? `· ${item.phone}` : ""}
              </p>
              {operations && item.notes && (
                <p className="mt-2 text-sm">{item.notes}</p>
              )}
              {service === "pickups" ? (
                <LocationDetails
                  label="Pickup"
                  location={item.location}
                  directions={item.directions}
                />
              ) : (
                <>
                  <LocationDetails
                    label="Collection"
                    location={item.fromCoordinates}
                    directions={item.fromDirections}
                  />
                  <LocationDetails
                    label="Destination"
                    location={item.toCoordinates}
                    directions={item.toDirections}
                  />
                </>
              )}
              <p className="mt-2 break-all font-mono text-xs text-inkSoft">
                Reference: {item.id}
              </p>
              {item.trackingCode && (
                <Link
                  className="mt-3 block break-all text-sm font-semibold text-green"
                  href={`/tracking?code=${encodeURIComponent(item.trackingCode)}`}
                >
                  Track {item.trackingCode} →
                </Link>
              )}
              {operations && transitions[service][item.status] && (
                <button
                  className="button mt-4"
                  disabled={busy !== null}
                  onClick={() => change(item)}
                >
                  {busy === item.id
                    ? "Updating…"
                    : `Mark ${statusLabel(transitions[service][item.status])}`}
                </button>
              )}
              {!operations && item.status === "requested" && (
                <button
                  className="mt-4 text-sm text-stamp"
                  disabled={busy !== null}
                  onClick={() => change(item, true)}
                >
                  {busy === item.id ? "Cancelling…" : "Cancel request"}
                </button>
              )}
            </li>
          ))}
      </ul>
    </section>
  );
}
