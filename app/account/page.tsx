import RequestList from "@/components/RequestList";
export default function Account() {
  return (
    <main className="mx-auto max-w-4xl px-6 py-14">
      <p className="eyebrow">YOUR ACCOUNT</p>
      <h1 className="mt-3 font-display text-4xl">Every request. One place.</h1>
      <p className="mt-4 text-inkSoft">
        See confirmations, follow progress, and track your parcels.
      </p>
      <RequestList service="pickups" />
      <RequestList service="deliveries" />
    </main>
  );
}
