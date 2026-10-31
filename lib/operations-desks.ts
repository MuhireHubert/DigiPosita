import { services } from "./services";
export const operationsDesks = [
  {
    key: "overview",
    label: "Overview",
    icon: "other",
    description: "Live queues and the next requests to review.",
  },
  {
    key: "pickups",
    label: "Pickups",
    icon: "pickups",
    description:
      "Schedule collections, read private pins and directions, and publish tracking updates.",
  },
  {
    key: "deliveries",
    label: "Deliveries",
    icon: "deliveries",
    description: "Manage collection-to-destination deliveries and completion.",
  },
  {
    key: "applications",
    label: "All applications",
    icon: "submissions",
    description: "Review applications across every service.",
  },
  ...services.map((service) => ({
    key: service.key,
    label: service.title,
    icon: service.key,
    description: service.description,
  })),
  {
    key: "auctions",
    label: "IPOSITA auctions",
    icon: "auctions",
    description:
      "Publish IPOSITA-owned items, monitor bids and review auction winners.",
  },
  {
    key: "tracking",
    label: "Tracking desk",
    icon: "tracking",
    description:
      "Look up shipment progress and manage updates from booking desks.",
  },
];
export function validOperationDesk(value: string | null) {
  return operationsDesks.some((d) => d.key === value) ? value! : "overview";
}
