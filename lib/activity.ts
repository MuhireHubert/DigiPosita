export interface ActivityItem {
  id: string;
  source: "pickups" | "deliveries" | "service_requests";
  status: string;
  kind?: string;
  trackingCode?: string;
  createdAt?: { toMillis(): number };
}
const active = new Set([
  "requested",
  "scheduled",
  "collected",
  "en_route",
  "submitted",
  "reviewing",
  "action_required",
  "approved",
]);
export function summarizeActivity(items: ActivityItem[], operations = false) {
  return {
    active: items.filter((i) => active.has(i.status)).length,
    moving: items.filter(
      (i) => i.status === "collected" || i.status === "en_route",
    ).length,
    attention: items.filter((i) =>
      operations
        ? ["requested", "submitted"].includes(i.status)
        : i.status === "action_required",
    ).length,
    completed: items.filter(
      (i) => i.status === "completed" || i.status === "delivered",
    ).length,
  };
}
export function attentionItems(items: ActivityItem[], operations = false) {
  return items
    .filter((i) =>
      operations
        ? ["requested", "submitted"].includes(i.status)
        : i.status === "action_required",
    )
    .sort(
      (a, b) => (a.createdAt?.toMillis() || 0) - (b.createdAt?.toMillis() || 0),
    );
}
