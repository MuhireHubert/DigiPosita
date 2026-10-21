"use client";

import LocationCapture, {
  type SavedLocation,
} from "@/components/LocationCapture";
import { useEffect, useState } from "react";
import {
  addDoc,
  collection,
  onSnapshot,
  where,
  query,
  limit,
  serverTimestamp,
} from "firebase/firestore";
import { useAuth } from "@/components/AuthProvider";
import { db } from "@/lib/firebase";
import type { DeliveryRequest } from "@/lib/types";

export default function DeliveriesPage() {
  const [requests, setRequests] = useState<DeliveryRequest[]>([]);
  const { user } = useAuth();
  const [form, setForm] = useState({
    requesterName: "",
    phone: "",
    fromLocation: "",
    toLocation: "",
    goodsType: "",
    weightKg: "",
  });
  const [fromCoordinates, setFromCoordinates] = useState<SavedLocation | null>(
    null,
  );
  const [toCoordinates, setToCoordinates] = useState<SavedLocation | null>(
    null,
  );
  const [fromDirections, setFromDirections] = useState("");
  const [toDirections, setToDirections] = useState("");
  const [saving, setSaving] = useState(false);

  const [error, setError] = useState("");
  const [sent, setSent] = useState(false);
  useEffect(() => {
    if (!user) return;
    const q = query(
      collection(db, "deliveries"),
      where("ownerId", "==", user.uid),
      limit(50),
    );
    const unsub = onSnapshot(
      q,
      (snap) => {
        setRequests(
          snap.docs.slice(0, 10).map((d) => ({
            id: d.id,
            ...(d.data() as Omit<DeliveryRequest, "id">),
          })),
        );
      },
      () => setError("Could not load your requests. Please try again."),
    );
    return () => unsub();
  }, [user]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!user) return;
    setSaving(true);
    setError("");
    setSent(false);
    try {
      await addDoc(collection(db, "deliveries"), {
        ownerId: user.uid,
        requesterName: form.requesterName,
        phone: form.phone,
        fromLocation: form.fromLocation,
        toLocation: form.toLocation,
        goodsType: form.goodsType,
        fromDirections,
        toDirections,
        ...(fromCoordinates ? { fromCoordinates } : {}),
        ...(toCoordinates ? { toCoordinates } : {}),
        weightKg: parseFloat(form.weightKg) || 0,
        status: "requested",
        createdAt: serverTimestamp(),
      });
      setForm({
        requesterName: "",
        phone: "",
        fromLocation: "",
        toLocation: "",
        goodsType: "",
        weightKg: "",
      });
      setFromCoordinates(null);
      setToCoordinates(null);
      setFromDirections("");
      setToDirections("");
      setSent(true);
    } catch {
      setError("Could not save your delivery. Please try again.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <main className="mx-auto max-w-lg px-6 py-16">
      <h1 className="font-display text-2xl font-semibold">Local deliveries</h1>
      <p className="mt-2 text-sm text-inkSoft">
        Farm-to-supermarket and other last-mile runs on the same network.
      </p>

      <form onSubmit={handleSubmit} className="mt-8 space-y-4">
        <input
          required
          placeholder="Your name"
          aria-label="Your name"
          className="input"
          value={form.requesterName}
          onChange={(e) => setForm({ ...form, requesterName: e.target.value })}
        />
        <input
          required
          type="tel"
          maxLength={30}
          placeholder="Contact phone"
          aria-label="Contact phone"
          className="input"
          value={form.phone}
          onChange={(e) => setForm({ ...form, phone: e.target.value })}
        />
        <input
          required
          placeholder="From (e.g. Musanze farm)"
          aria-label="From (e.g. Musanze farm)"
          className="input"
          value={form.fromLocation}
          onChange={(e) => setForm({ ...form, fromLocation: e.target.value })}
        />
        <LocationCapture
          label="Collection"
          value={fromCoordinates}
          onChange={setFromCoordinates}
        />
        <label className="block text-sm">
          Collection directions / landmark
          <textarea
            maxLength={2000}
            className="input mt-1"
            value={fromDirections}
            onChange={(e) => setFromDirections(e.target.value)}
          />
        </label>
        <input
          required
          placeholder="To (e.g. Kimironko supermarket)"
          aria-label="To (e.g. Kimironko supermarket)"
          className="input"
          value={form.toLocation}
          onChange={(e) => setForm({ ...form, toLocation: e.target.value })}
        />
        <LocationCapture
          label="Destination"
          value={toCoordinates}
          onChange={setToCoordinates}
        />
        <label className="block text-sm">
          Destination directions / landmark
          <textarea
            maxLength={2000}
            className="input mt-1"
            value={toDirections}
            onChange={(e) => setToDirections(e.target.value)}
          />
        </label>
        <input
          required
          placeholder="Goods (e.g. Irish potatoes)"
          aria-label="Goods (e.g. Irish potatoes)"
          className="input"
          value={form.goodsType}
          onChange={(e) => setForm({ ...form, goodsType: e.target.value })}
        />
        <input
          required
          type="number"
          step="0.1"
          min="0.1"
          max="1000"
          placeholder="Weight (kg)"
          aria-label="Weight (kg)"
          className="input"
          value={form.weightKg}
          onChange={(e) => setForm({ ...form, weightKg: e.target.value })}
        />
        <button
          type="submit"
          disabled={saving}
          className="rounded bg-ink px-5 py-2.5 text-white hover:bg-green disabled:opacity-60"
        >
          {saving ? "Sending…" : "Request delivery"}
        </button>
      </form>

      <p className="mt-4" role="status">
        {error ||
          (sent ? "Delivery requested. Follow its status in My requests." : "")}
      </p>
      <h2 className="mt-12 font-display text-lg font-semibold">
        Your requests
      </h2>
      <ul className="mt-4 space-y-3">
        {requests.length === 0 && (
          <li className="text-sm text-inkSoft">No requests yet.</li>
        )}
        {requests.map((r) => (
          <li
            key={r.id}
            className="border-l-2 border-goldDeep bg-paper2 p-3 text-sm"
          >
            <span className="font-medium">
              {r.fromLocation} &rarr; {r.toLocation}
            </span>
            <span className="ml-2 text-inkSoft">
              ({r.goodsType}, {r.weightKg}kg) · {r.status.replaceAll("_", " ")}
            </span>
          </li>
        ))}
      </ul>
    </main>
  );
}
