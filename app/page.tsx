import Link from "next/link";
import Card from "@/components/Card";

const MODULES = [
  { href: "/pickups", title: "Pickup scheduling", desc: "Book a courier pickup instead of visiting a counter." },
  { href: "/tracking", title: "Shipment tracking", desc: "Look up a parcel's live status by tracking code." },
  { href: "/calculator", title: "Fee calculator", desc: "Instant pricing by weight, size and destination zone." },
  { href: "/deliveries", title: "Local deliveries", desc: "Farm-to-supermarket and last-mile requests, live-listed." },
  { href: "/poboxes", title: "e-P.O. box registration", desc: "Digital boxes for studios, schools, real estate, notaries, banks." },
  { href: "/submissions", title: "Tenders & submissions", desc: "Job applications, receipts and tenders submitted online." },
  { href: "/exports", title: "Exports & China shipping", desc: "Outbound shipping for individuals and corporate importers." },
  { href: "/auctions", title: "Online auctions", desc: "List and browse items, live." },
  { href: "/trade", title: "AfCFTA trade lane", desc: "Cross-border trade facilitation under the continental free trade area." },
  { href: "/shops", title: "Local shop directory", desc: "Sector-specific gift shops with no online presence, listed." },
  { href: "/kashi", title: "Iposita Kashi", desc: "Account applications — KYC intake only, no money movement yet." },
];

export default function Home() {
  return (
    <main>
      <section className="mx-auto max-w-4xl px-6 pb-12 pt-16">
        <div className="text-sm font-semibold text-stamp">A proposal for Iposita Rwanda</div>
        <h1 className="mt-3 max-w-xl font-display text-4xl font-semibold leading-tight sm:text-5xl">
          Rwanda&rsquo;s postal network, working at the speed of a phone.
        </h1>
        <p className="mt-4 max-w-xl text-inkSoft">
          Iposita already has what no courier startup can build overnight: a post
          office in nearly every district. This platform puts that reach online.
        </p>
      </section>

      <hr className="route-rule" />

      <section className="mx-auto max-w-4xl px-6 py-12">
        <h2 className="font-display text-2xl font-semibold">Every module, working</h2>
        <p className="mt-2 max-w-lg text-inkSoft">
          Each card below reads or writes real data in Firestore. Kashi is the
          one exception on purpose &mdash; it collects applications only, with no
          money movement until a payment license is in place.
        </p>
        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          {MODULES.map((m) => (
            <Link key={m.href} href={m.href}>
              <Card title={m.title}>{m.desc}</Card>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
