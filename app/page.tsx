import Link from "next/link";
import ServiceHero from "@/components/ServiceHero";
import ServiceCatalogue from "@/components/ServiceCatalogue";
export default function Home() {
  return (
    <main>
      <div className="mx-auto max-w-6xl px-5 py-8 sm:px-6">
        <ServiceHero home />
      </div>
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
