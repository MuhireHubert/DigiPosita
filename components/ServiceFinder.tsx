"use client";
import { useState } from "react";
import Link from "next/link";
import { serviceJourneys } from "@/lib/service-finder";
import ServiceIcon from "./ServiceIcon";
export default function ServiceFinder() {
  const [goal, setGoal] = useState("send");
  const [choice, setChoice] = useState("local");
  const journey = serviceJourneys.find((j) => j.key === goal)!;
  const route =
    journey.routes.find((r) => r.key === choice) || journey.routes[0];
  return (
    <section
      aria-labelledby="finder-heading"
      className="my-10 overflow-hidden rounded-3xl border border-brandBlue/10 bg-white"
    >
      <div className="border-b border-ink/10 px-6 py-6 sm:px-8">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <p className="eyebrow">YOUR SERVICE COMPASS</p>
          <span className="rounded-full bg-brandYellow/25 px-3 py-1 text-xs font-medium text-ink">
            Find your next step
          </span>
        </div>
        <h2
          id="finder-heading"
          className="mt-3 text-2xl font-semibold tracking-tight sm:text-3xl"
        >
          Tell us what you want to do.
        </h2>
        <p className="mt-2 text-sm text-inkSoft">
          We’ll point you to the right service and what to prepare.
        </p>
      </div>
      <div className="grid lg:grid-cols-[1.15fr_1fr]">
        <div className="p-6 sm:p-8">
          <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-inkSoft">
            01 / Choose your goal
          </p>
          <div
            className="grid gap-2 sm:grid-cols-2"
            role="group"
            aria-label="Your service goal"
          >
            {serviceJourneys.map((j) => (
              <button
                key={j.key}
                aria-pressed={goal === j.key}
                onClick={() => {
                  setGoal(j.key);
                  setChoice(j.routes[0].key);
                }}
                className={`flex items-center gap-3 rounded-xl border p-4 text-left text-sm font-medium transition ${goal === j.key ? "border-brandBlue bg-brandBlue/5 text-brandBlue" : "border-ink/10 hover:border-brandBlue/40"}`}
              >
                <ServiceIcon name={j.icon} />
                {j.title}
                {goal === j.key && (
                  <span className="ml-auto" aria-hidden="true">
                    ✓
                  </span>
                )}
              </button>
            ))}
          </div>
          {journey.routes.length > 1 && (
            <fieldset className="mt-7">
              <legend className="mb-3 text-xs font-semibold uppercase tracking-widest text-inkSoft">
                02 / A little more detail
              </legend>
              <div className="flex flex-wrap gap-2">
                {journey.routes.map((r) => (
                  <button
                    type="button"
                    key={r.key}
                    aria-pressed={route.key === r.key}
                    onClick={() => setChoice(r.key)}
                    className={`rounded-full border px-4 py-2 text-sm ${route.key === r.key ? "border-brandBlue bg-brandBlue text-white" : "border-ink/15 text-inkSoft"}`}
                  >
                    {r.title}
                  </button>
                ))}
              </div>
            </fieldset>
          )}
        </div>
        <div
          className="bg-paper2/70 p-6 sm:p-8"
          aria-live="polite"
          aria-atomic="true"
        >
          <p className="text-xs font-semibold uppercase tracking-widest text-brandBlue">
            Your recommended next step
          </p>
          <h3 className="mt-4 text-2xl font-semibold">{route.title}</h3>
          <p className="mt-3 text-sm leading-relaxed text-inkSoft">
            {route.description}
          </p>
          <p className="mt-6 text-xs font-semibold uppercase tracking-wider">
            Have these ready
          </p>
          <ul className="mt-3 space-y-3 text-sm text-inkSoft">
            {route.checklist.map((item) => (
              <li key={item} className="flex items-start gap-3">
                <span className="text-brandBlue" aria-hidden="true">
                  ✓
                </span>
                {item}
              </li>
            ))}
          </ul>
          {route.external ? (
            <a
              href={route.path}
              target="_blank"
              rel="noopener noreferrer"
              className="button mt-7"
            >
              Continue to ePobox ↗
            </a>
          ) : (
            <Link href={route.path} className="button mt-7">
              Continue to service →
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}
