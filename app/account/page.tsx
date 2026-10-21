import Link from "next/link";
import ServiceIcon from "@/components/ServiceIcon";
import ServiceRequests from "@/components/ServiceRequests";
import { MyBids } from "@/components/Auctions";
import RequestList from "@/components/RequestList";
export default function Account() {
  return (
    <main className="mx-auto max-w-4xl px-6 py-14">
      <p className="eyebrow">YOUR ACCOUNT</p>
      <h1 className="mt-3 font-display text-4xl">Every request. One place.</h1>
      <p className="mt-4 text-inkSoft">
        Follow bookings, service applications, staff responses and auction bids.
      </p>
      <div className="my-8 grid gap-3 sm:grid-cols-3">
        {[
          ["pickups", "Send a parcel", "/pickups"],
          ["tracking", "Track a shipment", "/tracking"],
          ["submissions", "Browse services", "/services"],
        ].map(([icon, title, href]) => (
          <Link
            key={href}
            href={href}
            className="flex items-center gap-3 rounded-2xl border border-ink/10 bg-white p-5 text-sm font-semibold transition hover:border-green"
          >
            <span className="text-green">
              <ServiceIcon name={icon} />
            </span>
            {title}
            <span className="ml-auto text-green">↗</span>
          </Link>
        ))}
      </div>
      <RequestList service="pickups" />
      <RequestList service="deliveries" />
      <ServiceRequests />
      <MyBids />
    </main>
  );
}
