import Link from "next/link";
import DigitalServiceForm from "@/components/DigitalServiceForm";
export default function Page() {
  return (
    <main className="mx-auto max-w-4xl px-6 py-12">
      <Link href="/services" className="text-sm text-green">
        ← All services
      </Link>
      <p className="eyebrow mt-7">YOUR ADDRESS, CONNECTED</p>
      <h1 className="mt-3 font-display text-4xl">
        ePobox & physical P.O. boxes
      </h1>
      <p className="mt-4 max-w-2xl text-inkSoft">
        Choose a digital postal address through ePobox, or request a physical
        post-office box from the IPOSITA service team.
      </p>
      <section className="my-8 rounded-2xl bg-green p-7 text-white">
        <h2 className="font-display text-3xl">
          Your digital address with ePobox
        </h2>
        <p className="mt-3 max-w-xl text-sm leading-relaxed text-white/85">
          The existing ePobox platform connects digital addresses with GPS, Plus
          Codes and post offices. Open ePobox to register or manage your digital
          address and use its delivery services.
        </p>
        <a
          href="https://epobox.app/"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-5 inline-block rounded-lg bg-white px-5 py-3 text-sm font-semibold text-green"
        >
          Continue to ePobox ↗
        </a>
        <p className="mt-3 text-xs text-white/70">
          Opens the separate ePobox platform. Its account, fees and service
          terms apply.
        </p>
      </section>
      <section className="rounded-2xl border border-ink/10 bg-white p-7">
        <h2 className="font-display text-2xl">Request a physical P.O. box</h2>
        <p className="mb-6 mt-3 text-sm text-inkSoft">
          Choose your preferred post office. Staff will confirm availability and
          send your box assignment to My requests.
        </p>
        <DigitalServiceForm kind="poboxes" />
      </section>
    </main>
  );
}
