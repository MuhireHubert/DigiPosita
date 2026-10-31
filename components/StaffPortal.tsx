"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import ActivityOverview from "./ActivityOverview";
import ServiceRequests from "./ServiceRequests";
import Auctions from "./Auctions";
import RequestList from "./RequestList";
import ServiceIcon from "./ServiceIcon";
import { operationsDesks, validOperationDesk } from "@/lib/operations-desks";
import { getService } from "@/lib/services";
export default function StaffPortal() {
  const [desk, setDesk] = useState("overview");
  useEffect(
    () =>
      setDesk(
        validOperationDesk(
          new URLSearchParams(window.location.search).get("desk"),
        ),
      ),
    [],
  );
  function open(key: string) {
    const next = validOperationDesk(key);
    setDesk(next);
    window.history.replaceState(
      window.history.state,
      "",
      `/staff${next === "overview" ? "" : `?desk=${encodeURIComponent(next)}`}`,
    );
  }
  const selected = operationsDesks.find((d) => d.key === desk)!;
  const service = getService(desk);
  return (
    <main className="mx-auto max-w-6xl px-5 py-10 sm:px-6">
      <p className="eyebrow">IPOSITA ADMINISTRATION</p>
      <h1 className="mt-3 text-4xl font-semibold tracking-tight">
        One workspace. Every service.
      </h1>
      <p className="mt-4 text-sm leading-relaxed text-inkSoft">
        Manage postal operations, documents, addresses, commerce and
        financial-service applications with controlled staff access.
      </p>
      <div className="mt-8 grid items-start gap-7 lg:grid-cols-[230px_1fr]">
        <nav
          aria-label="Operation desks"
          className="flex flex-wrap gap-1 rounded-2xl border border-ink/10 bg-white p-3 lg:sticky lg:top-5 lg:max-h-[calc(100vh-3rem)] lg:flex-col lg:flex-nowrap lg:overflow-y-auto"
        >
          {operationsDesks.map((d) => (
            <button
              key={d.key}
              aria-pressed={desk === d.key}
              onClick={() => open(d.key)}
              className={`flex items-center gap-3 rounded-xl px-3 py-3 text-left text-sm ${desk === d.key ? "bg-brandBlue text-white" : "text-inkSoft hover:bg-brandBlue/5"}`}
            >
              <span className="shrink-0">
                <ServiceIcon name={d.icon} />
              </span>
              {d.label}
            </button>
          ))}
        </nav>
        <div className="min-w-0">
          {desk === "overview" ? (
            <section>
              <ActivityOverview operations onOpen={open} />
              <h2 className="mt-10 text-xl font-semibold">
                Choose an operation desk
              </h2>
              <p className="mt-2 text-sm text-inkSoft">
                Each service has its own queue and permitted actions. Staff can
                also use All applications to review work across services.
              </p>
              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                {operationsDesks
                  .filter((d) => !["overview", "applications"].includes(d.key))
                  .map((d) => (
                    <button
                      key={d.key}
                      onClick={() => open(d.key)}
                      className="rounded-2xl border border-ink/10 bg-white p-5 text-left transition hover:border-brandBlue"
                    >
                      <span className="text-brandBlue">
                        <ServiceIcon name={d.icon} />
                      </span>
                      <h3 className="mt-3 text-sm font-semibold">
                        {d.label} ↗
                      </h3>
                      <p className="mt-2 text-xs leading-relaxed text-inkSoft">
                        {d.description}
                      </p>
                    </button>
                  ))}
              </div>
            </section>
          ) : (
            <>
              <div className="rounded-2xl bg-brandBlue px-6 py-6 text-white">
                <p className="text-xs font-medium tracking-widest text-brandYellow">
                  IPOSITA SERVICE DESK
                </p>
                <h2 className="mt-3 text-2xl font-semibold">
                  {selected.label}
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-white/80">
                  {selected.description}
                </p>
              </div>
              {desk === "poboxes" && (
                <aside className="mt-4 rounded-xl border border-ink/10 bg-white p-5 text-sm">
                  <p>
                    Assign physical box numbers here. Digital ePobox accounts
                    are managed on the separate ePobox platform.
                  </p>
                  <a
                    className="mt-3 inline-block font-semibold text-brandBlue"
                    href="https://epobox.app/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Open ePobox ↗
                  </a>
                </aside>
              )}
              {desk === "kashi" && (
                <p className="mt-4 rounded-xl bg-brandYellow/15 p-5 text-sm">
                  Review and respond to account applications and
                  financial-service enquiries. Approval in this workspace does
                  not activate a bank account, approve a loan or move money.
                </p>
              )}
              {desk === "pickups" ? (
                <RequestList key="pickups" service="pickups" operations />
              ) : desk === "deliveries" ? (
                <RequestList key="deliveries" service="deliveries" operations />
              ) : desk === "auctions" ? (
                <Auctions operations />
              ) : desk === "tracking" ? (
                <section className="mt-6 rounded-2xl border border-ink/10 bg-white p-6">
                  <h3 className="text-xl font-semibold">Shipment visibility</h3>
                  <p className="mt-3 text-sm leading-relaxed text-inkSoft">
                    Public tracking updates are created when staff advance a
                    pickup or delivery. Customer contact details and location
                    pins remain in the private booking.
                  </p>
                  <div className="mt-5 flex flex-wrap gap-3">
                    <Link href="/tracking" className="button">
                      Open tracking lookup ↗
                    </Link>
                    <button
                      className="button secondary"
                      onClick={() => open("pickups")}
                    >
                      Manage pickups
                    </button>
                    <button
                      className="button secondary"
                      onClick={() => open("deliveries")}
                    >
                      Manage deliveries
                    </button>
                  </div>
                </section>
              ) : (
                <ServiceRequests
                  key={desk}
                  operations
                  serviceKind={service?.key}
                />
              )}
            </>
          )}
        </div>
      </div>
    </main>
  );
}
