import Link from "next/link";
const services = [
  {
    n: "01",
    href: "/pickups",
    title: "We’ll collect it.",
    desc: "Request a courier pickup from your home or business. Follow your booking from your account.",
    action: "Book a pickup",
  },
  {
    n: "02",
    href: "/tracking",
    title: "Know where it is.",
    desc: "Enter your tracking code to see your parcel’s latest status and journey.",
    action: "Track a parcel",
  },
  {
    n: "03",
    href: "/deliveries",
    title: "Keep business moving.",
    desc: "Arrange a local delivery between your collection point and destination.",
    action: "Request delivery",
  },
];
export default function Home() {
  return (
    <main>
      <section className="mx-auto grid max-w-6xl gap-12 px-6 py-16 lg:grid-cols-[1.3fr_1fr] lg:py-24">
        <div>
          <p className="eyebrow">YOUR NEXT DELIVERY STARTS HERE</p>
          <h1 className="mt-5 font-display text-5xl leading-tight sm:text-6xl">
            Less time in line.
            <br />
            <span className="text-green">More on the move.</span>
          </h1>
          <p className="mt-6 max-w-lg text-lg leading-relaxed text-inkSoft">
            A simpler way to request pickups, arrange local deliveries, and
            follow your parcels across Rwanda.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link className="button" href="/pickups">
              Send a parcel ↗
            </Link>
            <Link className="button secondary" href="/tracking">
              Track a shipment
            </Link>
          </div>
          <p className="mt-5 text-xs text-inkSoft">
            Pilot service · Requests require staff confirmation
          </p>
        </div>
        <div className="rounded-2xl bg-ink p-8 text-paper">
          <p className="text-xs tracking-widest text-gold">
            FROM YOUR DOOR TO THEIRS
          </p>
          <div className="my-10 space-y-8">
            {[
              "Request your pickup",
              "Our team confirms the details",
              "Follow your parcel’s journey",
            ].map((s, i) => (
              <div key={s} className="flex items-center gap-4">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-gold/50 text-gold">
                  {i + 1}
                </span>
                <p className="font-display text-xl">{s}</p>
              </div>
            ))}
          </div>
          <Link className="text-sm text-gold" href="/account">
            Your requests, together in one place →
          </Link>
        </div>
      </section>
      <section className="border-y border-ink/10 bg-paper2">
        <div className="mx-auto max-w-6xl px-6 py-14">
          <p className="eyebrow">THREE WAYS TO GET MOVING</p>
          <h2 className="mt-3 font-display text-3xl">
            Everyday deliveries, made simpler.
          </h2>
          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {services.map((s) => (
              <Link
                key={s.href}
                href={s.href}
                className="rounded-xl border border-ink/10 bg-paper p-7 transition hover:-translate-y-1 hover:shadow-md"
              >
                <p className="font-mono text-sm text-goldDeep">{s.n} /</p>
                <h3 className="mt-8 font-display text-2xl">{s.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-inkSoft">
                  {s.desc}
                </p>
                <p className="mt-6 text-sm font-semibold text-green">
                  {s.action} ↗
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>
      <section className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-6 px-6 py-12">
        <div>
          <h2 className="font-display text-2xl">Already sent something?</h2>
          <p className="mt-2 text-inkSoft">
            Your tracking code connects you to its journey.
          </p>
        </div>
        <Link className="button secondary" href="/tracking">
          Find my parcel →
        </Link>
      </section>
    </main>
  );
}
