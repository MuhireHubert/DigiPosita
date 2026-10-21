import Image from "next/image";
import Link from "next/link";
export default function ServiceHero({ home = false }: { home?: boolean }) {
  return (
    <section className="overflow-hidden rounded-3xl bg-[#f3eedf] lg:grid lg:grid-cols-2">
      <div className="relative z-10 p-7 sm:p-10 lg:py-14">
        <p className="eyebrow">CONNECTED TO YOUR EVERYDAY</p>
        <h1 className="mt-5 max-w-xl font-display text-4xl leading-[1.1] sm:text-5xl lg:text-6xl">
          {home ? (
            <>
              Your next move.
              <br />
              <span className="text-green">Delivered.</span>
            </>
          ) : (
            <>
              Your post office.
              <br />
              <span className="text-green">Wherever you are.</span>
            </>
          )}
        </h1>
        <p className="mt-5 max-w-md text-base leading-relaxed text-inkSoft">
          From your doorstep to new opportunities. Send, receive, apply and grow
          with all your postal services in one place.
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
          src="/images/courier-photo.jpg"
          alt="A courier wearing a helmet and delivery bag checks his phone while seated on a scooter"
          fill
          priority
          sizes="(min-width: 1024px) 50vw, 100vw"
          className="object-cover object-[50%_65%]"
        />
        <a
          href="https://www.pexels.com/photo/a-deliveryman-on-a-scooter-7363198/"
          target="_blank"
          rel="noopener noreferrer"
          className="absolute bottom-5 right-5 rounded-full bg-white/95 px-4 py-2 text-xs font-medium text-green shadow-sm"
        >
          Photo: RDNE Stock project / Pexels ↗
        </a>
      </div>
    </section>
  );
}
