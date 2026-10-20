import ServiceRequests from "@/components/ServiceRequests";
import Auctions from "@/components/Auctions";
import RequestList from "@/components/RequestList";
export default function Staff() {
  return (
    <main className="mx-auto max-w-4xl px-6 py-14">
      <p className="eyebrow">OPERATIONS</p>
      <h1 className="mt-3 font-display text-4xl">One desk. Every service.</h1>
      <p className="mt-4 text-inkSoft">
        Process bookings, review applications and documents, respond to
        customers, and manage auctions from the same workspace.
      </p>
      <RequestList service="pickups" operations />
      <RequestList service="deliveries" operations />
      <ServiceRequests operations />
      <Auctions operations />
    </main>
  );
}
