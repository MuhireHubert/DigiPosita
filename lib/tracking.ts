export function normalizeTrackingCode(value: string): string | null {
  const code = value.trim().toUpperCase();
  return /^DP-[PD]-[A-Z0-9]{20}$/.test(code) ? code : null;
}
export const shipmentSteps = [
  {
    key: "accepted",
    title: "Accepted",
    description: "The team has confirmed the booking.",
  },
  {
    key: "in_transit",
    title: "In transit",
    description: "Your parcel is moving through the network.",
  },
  {
    key: "out_for_delivery",
    title: "Out for delivery",
    description: "The delivery leg is in progress.",
  },
  {
    key: "delivered",
    title: "Delivered",
    description: "The team has recorded delivery.",
  },
];
