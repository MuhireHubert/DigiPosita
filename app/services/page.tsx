import ServiceCatalogue from "@/components/ServiceCatalogue";
export default function Services() {
  return (
    <main className="mx-auto max-w-6xl px-6 py-14">
      <p className="eyebrow">ALL YOUR SERVICES, CONNECTED</p>
      <h1 className="mt-3 font-display text-4xl">What would you like to do?</h1>
      <p className="mb-8 mt-4 max-w-2xl text-inkSoft">
        Send a parcel, submit a document, grow your business or apply for a
        service. One account keeps your requests and responses together.
      </p>
      <ServiceCatalogue />
    </main>
  );
}
