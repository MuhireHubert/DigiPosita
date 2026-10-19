import Link from "next/link";
export default function Page() {
  return (
    <main className="mx-auto max-w-lg px-6 py-16">
      <p className="eyebrow">COMING LATER</p>
      <h1 className="mt-3 font-display text-3xl">Kashi</h1>
      <p className="my-6 text-inkSoft">
        This service is not available yet. You can request a pickup, arrange a
        local delivery, or track a shipment today once online services are
        configured.
      </p>
      <Link className="button" href="/">
        Explore available services
      </Link>
    </main>
  );
}
