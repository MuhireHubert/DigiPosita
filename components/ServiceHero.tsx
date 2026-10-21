import Image from "next/image";
import Link from "next/link";
export default function ServiceHero({ home = false }: { home?: boolean }) {
  return (
    <section className="overflow-hidden rounded-3xl bg-[#f3eedf] lg:grid lg:grid-cols-2">
      <div className="relative z-10 p-7 sm:p-10 lg:py-14">
        <p className="eyebrow">MURAKAZA NEZA · DIGIPOSITA RWANDA</p>
        <h1 className="mt-5 max-w-xl font-display text-4xl leading-[1.1] sm:text-5xl lg:text-6xl">
          {home ? (
            <>
              Rwanda, connected.
              <br />
              <span className="text-green">Every day.</span>
            </>
          ) : (
            <>
              Your postal services.
              <br />
              <span className="text-green">Rooted in Rwanda.</span>
            </>
          )}
        </h1>
        <p className="mt-5 max-w-md text-base leading-relaxed text-inkSoft">
          Postal services for everyday life in Rwanda. Request a pickup, apply
          for a P.O. box, submit documents or connect your business to regional
          trade.
        </p>
        <div className="mt-7 flex flex-wrap gap-3">
          <Link href={home ? "/services" : "/pickups"} className="button">
            {home ? "Explore services" : "Schedule a pickup"}{" "}
            <span className="ml-3">↗</span>
          </Link>
          <Link href="/tracking" className="button secondary">
            Track a parcel
          </Link>
        </div>
        <p className="mt-6 text-xs text-inkSoft">
          Digital service pilot · Reviewed by the service team
        </p>
      </div>
      <div className="relative min-h-[280px] sm:min-h-[360px] lg:min-h-full">
        <Image
          src="/images/kigali-photo.jpg"
          alt="A real photograph of Kigali, Rwanda, showing tree-lined roads, neighbourhoods and the city’s green hills"
          fill
          priority
          sizes="(min-width: 1024px) 50vw, 100vw"
          className="object-cover object-[55%_65%]"
        />
        <a
          href="https://www.pexels.com/photo/aerial-view-of-kigali-city-in-daylight-31466706/"
          target="_blank"
          rel="noopener noreferrer"
          className="absolute bottom-5 right-5 rounded-full bg-white/95 px-4 py-2 text-xs font-medium text-green shadow-sm"
        >
          Kigali · Photo: Faustin Nkurunziza ↗
        </a>
      </div>
    </section>
  );
}
