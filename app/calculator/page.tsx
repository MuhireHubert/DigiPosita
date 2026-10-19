import Link from "next/link";
export default function Calculator() {
  return (
    <main className="mx-auto max-w-lg px-6 py-16">
      <p className="eyebrow">DELIVERY PRICING</p>
      <h1 className="mt-3 font-display text-3xl">A quote for your journey.</h1>
      <p className="my-6 text-inkSoft">
        Our team will confirm the delivery price and collection window before
        processing your request. Online payments are not available in this
        pilot.
      </p>
      <Link className="button" href="/pickups">
        Request a pickup
      </Link>
    </main>
  );
}
