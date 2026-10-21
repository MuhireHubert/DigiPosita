import Link from "next/link";
import DigitalServiceForm from "@/components/DigitalServiceForm";
import ServiceIcon from "@/components/ServiceIcon";
export default function Page() {
  return (
    <main className="mx-auto max-w-4xl px-6 py-12">
      <Link href="/services" className="text-sm text-green">
        ← All services
      </Link>
      <div className="mt-7 rounded-3xl bg-green p-7 text-white sm:p-10">
        <p className="text-xs font-semibold tracking-widest text-white/70">
          IPOSITA RWANDA · FINANCIAL INCLUSION
        </p>
        <h1 className="mt-4 font-display text-4xl sm:text-5xl">
          Iposita Kashi
        </h1>
        <p className="mt-5 max-w-2xl leading-relaxed text-white/85">
          Digital financial services designed to bring everyday banking closer
          to communities across Rwanda, including people using mobile phones and
          USSD.
        </p>
      </div>
      <div className="my-8 grid gap-4 sm:grid-cols-2">
        {[
          [
            "kashi",
            "Account services",
            "Get assistance with opening and managing a personal or business account.",
          ],
          [
            "other",
            "Bills & airtime",
            "Enquire about utility payments, airtime and everyday transactions.",
          ],
          [
            "trade",
            "Loan enquiries",
            "Ask the team about available loan products, eligibility and application steps.",
          ],
          [
            "tracking",
            "Mobile & USSD access",
            "Request help using Iposita Kashi’s supported mobile and USSD channels.",
          ],
        ].map(([icon, title, description]) => (
          <div
            key={title}
            className="rounded-2xl border border-ink/10 bg-white p-6"
          >
            <span className="text-green">
              <ServiceIcon name={icon} />
            </span>
            <h2 className="mt-3 font-semibold">{title}</h2>
            <p className="mt-2 text-sm text-inkSoft">{description}</p>
          </div>
        ))}
      </div>
      <section className="rounded-2xl border border-ink/10 bg-white p-6 sm:p-8">
        <h2 className="font-display text-2xl">Apply or ask for assistance</h2>
        <p className="mb-6 mt-3 text-sm leading-relaxed text-inkSoft">
          This DigiPosita service desk accepts applications and staff-reviewed
          enquiries. Payments, wallet balances, loan disbursements and
          withdrawals are handled through Iposita Kashi’s supported channels.
          The team will confirm current fees, eligibility and available
          services.
        </p>
        <DigitalServiceForm kind="kashi" />
      </section>
    </main>
  );
}
