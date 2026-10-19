import RequestList from "@/components/RequestList";
export default function Staff() {
  return (
    <main className="mx-auto max-w-4xl px-6 py-14">
      <p className="eyebrow">OPERATIONS</p>
      <h1 className="mt-3 font-display text-4xl">
        Keep every delivery moving.
      </h1>
      <p className="mt-4 text-inkSoft">
        Confirm bookings and record each step. Tracking is published with every
        update.
      </p>
      <RequestList service="pickups" operations />
      <RequestList service="deliveries" operations />
    </main>
  );
}
