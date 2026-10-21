import type { SavedLocation } from "@/components/LocationCapture";
import { doc, runTransaction, serverTimestamp } from "firebase/firestore";
import { db } from "./firebase";
export type Service = "pickups" | "deliveries";
export interface ServiceRequest {
  id: string;
  ownerId: string;
  status: string;
  trackingCode?: string;
  contactName?: string;
  requesterName?: string;
  phone?: string;
  address?: string;
  fromLocation?: string;
  toLocation?: string;
  goodsType?: string;
  weightKg: number;
  notes?: string;
  location?: SavedLocation;
  directions?: string;
  fromCoordinates?: SavedLocation;
  toCoordinates?: SavedLocation;
  fromDirections?: string;
  toDirections?: string;
  createdAt?: { toMillis(): number };
}
export const transitions: Record<Service, Record<string, string>> = {
  pickups: {
    requested: "scheduled",
    scheduled: "collected",
    collected: "delivered",
  },
  deliveries: { requested: "en_route", en_route: "delivered" },
};
export function statusLabel(value: string) {
  return value.replaceAll("_", " ");
}
export async function advanceRequest(
  service: Service,
  id: string,
  expectedStatus: string,
) {
  const ref = doc(db, service, id);
  await runTransaction(db, async (tx) => {
    const snap = await tx.get(ref);
    if (!snap.exists()) throw new Error("Request no longer exists.");
    const data = snap.data();
    if (data.status !== expectedStatus)
      throw new Error(
        "This request changed. Review its current status and try again.",
      );
    const next = transitions[service][data.status];
    if (!next) throw new Error("This request cannot be advanced.");
    const code =
      data.trackingCode ||
      `DP-${service === "pickups" ? "P" : "D"}-${id.toUpperCase()}`;
    const shipmentRef = doc(db, "public_shipments", code);
    const shipment = await tx.get(shipmentRef);
    const shipmentStatus =
      next === "scheduled"
        ? "accepted"
        : next === "collected"
          ? "in_transit"
          : next === "en_route"
            ? "out_for_delivery"
            : "delivered";
    const history = shipment.exists() ? shipment.data().history : [];
    tx.update(ref, {
      status: next,
      trackingCode: code,
      updatedAt: serverTimestamp(),
    });
    // Tracking records deliberately exclude names, phones and street addresses.
    tx.set(shipmentRef, {
      trackingCode: code,
      status: shipmentStatus,
      originOffice: "DigiPosita collection network",
      destination: "Delivery destination",
      history: [...history, { status: shipmentStatus, timestamp: Date.now() }],
    });
  });
}
