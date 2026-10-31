"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
export default function ServiceHero({ home = false }: { home?: boolean }) {
  const [code, setCode] = useState("");
  const router = useRouter();
  return (
    <section className="overflow-hidden rounded-[28px] bg-brandBlue text-white lg:grid lg:grid-cols-[1.05fr_1fr]">
      <div className="brand-grid relative p-7 sm:p-10 lg:p-12">
        <p className="text-xs font-semibold tracking-[.18em] text-brandYellow">
          MURAKAZA NEZA · IPOSITA RWANDA
        </p>
        <h1 className="mt-6 max-w-xl font-display text-4xl font-semibold leading-[1.08] tracking-tight sm:text-5xl lg:text-6xl">
          {home ? (
            <>
              A world of services.
              <br />
              <span className="text-brandYellow">Closer to you.</span>
            </>
          ) : (
            <>
              Your next move.
              <br />
              <span className="text-brandYellow">Starts here.</span>
            </>
          )}
        </h1>
        <p className="mt-5 max-w-md text-base leading-relaxed text-white/80">
          From a parcel at your doorstep to a business beyond borders. Your
          postal services, connected in one digital workspace.
        </p>
        <div className="mt-7 flex flex-wrap gap-3">
          <Link
            href="/pickups"
            className="inline-flex items-center rounded-xl bg-brandYellow px-5 py-3 text-sm font-semibold text-ink transition hover:bg-white"
          >
            Schedule a pickup ↗
          </Link>
          <Link
            href="/account"
            className="rounded-xl border border-white/30 px-5 py-3 text-sm font-semibold transition hover:bg-white/10"
          >
            My workspace →
          </Link>
        </div>
        <form
          className="mt-8 max-w-md rounded-2xl border border-white/15 bg-white/10 p-4"
          onSubmit={(e) => {
            e.preventDefault();
            router.push(`/tracking?code=${encodeURIComponent(code.trim())}`);
          }}
        >
          <label
            htmlFor={home ? "home-track" : "services-track"}
            className="text-xs font-medium text-white/80"
          >
            Already have a shipment? Track its journey.
          </label>
          <div className="mt-2 flex gap-2">
            <input
              id={home ? "home-track" : "services-track"}
              required
              maxLength={25}
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder="Enter your tracking code"
              className="min-w-0 flex-1 rounded-lg bg-white px-3 py-3 text-sm text-ink placeholder:text-inkSoft"
            />
            <button className="rounded-lg bg-brandYellow px-4 text-sm font-semibold text-ink">
              Track →
            </button>
          </div>
        </form>
        <p className="mt-5 text-xs text-white/65">
          Digital service pilot · Requests reviewed by the IPOSITA team
        </p>
      </div>
      <div className="relative min-h-[300px] lg:min-h-full">
        <Image
          src="/images/kigali-photo.jpg"
          alt="Kigali’s tree-lined streets and neighbourhoods, photographed by Faustin Nkurunziza"
          fill
          priority
          sizes="(min-width: 1024px) 50vw, 100vw"
          className="object-cover object-[55%_65%]"
        />
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/90 via-ink/50 to-transparent px-6 pb-6 pt-24">
          <span className="rounded-full bg-brandYellow px-3 py-1.5 text-xs font-semibold text-ink">
            ROOTED IN RWANDA
          </span>
          <p className="mt-4 text-2xl font-semibold">
            Local roots. New possibilities.
          </p>
          <a
            href="https://www.pexels.com/photo/aerial-view-of-kigali-city-in-daylight-31466706/"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 inline-block text-xs text-white/80 underline underline-offset-4"
          >
            Kigali · Photo: Faustin Nkurunziza ↗
          </a>
        </div>
      </div>
    </section>
  );
}
