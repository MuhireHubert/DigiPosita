import ServiceCatalogue from "@/components/ServiceCatalogue";
import ServiceHero from "@/components/ServiceHero";
import Link from "next/link";
export default function Services() {
  return (
    <main className="mx-auto max-w-6xl px-5 py-8 sm:px-6">
      <ServiceHero />
      <section className="py-12" aria-labelledby="catalogue-heading">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="eyebrow">THE DIGITAL SERVICE DESK</p>
            <h2
              id="catalogue-heading"
              className="mt-3 font-display text-3xl sm:text-4xl"
            >
              What would you like to do?
            </h2>
            <p className="mt-3 text-sm text-inkSoft">
              One account for your requests, documents and next opportunities.
            </p>
          </div>
          <Link href="/account" className="text-sm font-semibold text-green">
            View my requests ↗
          </Link>
        </div>
        <ServiceCatalogue />
      </section>
      <aside className="mb-8 flex flex-wrap items-center justify-between gap-5 rounded-2xl bg-ink px-7 py-8 text-white">
        <div>
          <p className="text-xs uppercase tracking-widest text-gold">
            YOUR PERSONAL SERVICE DESK
          </p>
          <h2 className="mt-2 text-xl font-semibold">
            Less paperwork. More peace of mind.
          </h2>
          <p className="mt-2 text-sm text-white/70">
            Keep applications and conversations with the team together.
          </p>
        </div>
        <Link
          href="/account"
          className="rounded-xl bg-white px-5 py-3 text-sm font-semibold text-ink"
        >
          Open my account →
        </Link>
      </aside>
    </main>
  );
}
