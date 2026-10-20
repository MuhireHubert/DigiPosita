import Link from "next/link";
import ServiceCatalogue from "@/components/ServiceCatalogue";
export default function Home() {
  return (
    <main>
      <section className="mx-auto grid max-w-6xl gap-12 px-6 py-16 lg:grid-cols-[1.3fr_1fr] lg:py-24">
        <div>
          <p className="eyebrow">ONE PLATFORM. MORE POSSIBILITIES.</p>
          <h1 className="mt-5 font-display text-5xl leading-tight sm:text-6xl">
            Your post office.
            <br />
            <span className="text-green">Now within reach.</span>
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-inkSoft">
            Parcels, documents, businesses and opportunities. Access DigiPosita
            services online and follow every request from one account.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link className="button" href="/services">
              Explore all services ↗
            </Link>
            <Link className="button secondary" href="/account">
              My requests
            </Link>
          </div>
          <p className="mt-5 text-xs text-inkSoft">
            Digital service pilot · Requests are reviewed by the service team
          </p>
        </div>
        <div className="rounded-2xl bg-ink p-8 text-paper">
          <p className="text-xs tracking-widest text-gold">
            ALREADY SENT A PARCEL?
          </p>
          <h2 className="mt-6 font-display text-3xl">Follow its journey.</h2>
          <p className="mt-4 text-sm leading-relaxed text-paper/80">
            Your tracking code connects you to the latest collection, transit
            and delivery updates.
          </p>
          <Link
            className="mt-7 inline-block rounded-lg bg-gold px-5 py-3 text-sm font-semibold text-ink"
            href="/tracking"
          >
            Track a shipment →
          </Link>
          <div className="mt-9 border-t border-white/15 pt-6">
            <p className="text-sm">Something to send?</p>
            <Link
              href="/pickups"
              className="mt-3 inline-block text-sm text-gold"
            >
              Schedule a pickup ↗
            </Link>
          </div>
        </div>
      </section>
      <section className="border-y border-ink/10 bg-paper2">
        <div className="mx-auto max-w-6xl px-6 py-14">
          <p className="eyebrow">THE DIGITAL SERVICE DESK</p>
          <h2 className="mb-8 mt-3 font-display text-3xl">
            A service for every next step.
          </h2>
          <ServiceCatalogue />
        </div>
      </section>
      <section className="mx-auto grid max-w-6xl gap-7 px-6 py-14 sm:grid-cols-3">
        {[
          [
            "01",
            "Choose your service",
            "Find the right form, listing or enquiry.",
          ],
          [
            "02",
            "Submit securely",
            "Keep your details and documents in your account.",
          ],
          [
            "03",
            "Stay in the loop",
            "Receive staff responses and follow each status change.",
          ],
        ].map(([n, title, desc]) => (
          <div key={n}>
            <p className="font-mono text-sm text-goldDeep">{n}</p>
            <h2 className="mt-3 font-display text-xl">{title}</h2>
            <p className="mt-2 text-sm text-inkSoft">{desc}</p>
          </div>
        ))}
      </section>
    </main>
  );
}
