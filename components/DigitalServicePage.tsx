import Link from "next/link";
import ServiceIcon from "./ServiceIcon";
import DigitalServiceForm from "./DigitalServiceForm";
import { getService } from "@/lib/services";
export default function DigitalServicePage({ kind }: { kind: string }) {
  const service = getService(kind);
  return (
    <main className="mx-auto max-w-2xl px-6 py-14">
      <Link href="/services" className="mb-7 inline-block text-sm text-green">
        ← All services
      </Link>
      <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-green/10 text-green">
        <ServiceIcon name={kind} />
      </div>
      <p className="eyebrow">DIGIPOSITA SERVICES</p>
      <h1 className="mt-3 font-display text-4xl">{service.title}</h1>
      <p className="mb-9 mt-4 text-inkSoft">{service.description}</p>
      <DigitalServiceForm kind={kind} />
    </main>
  );
}
