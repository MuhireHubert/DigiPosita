"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { doc, onSnapshot } from "firebase/firestore";
import { db, configured } from "@/lib/firebase";
import type { Shipment } from "@/lib/types";
import { statusLabel } from "@/lib/requests";
import { normalizeTrackingCode, shipmentSteps } from "@/lib/tracking";
import ServiceIcon from "@/components/ServiceIcon";
export default function Tracking() {
  const [code, setCode] = useState("");
  const [selected, setSelected] = useState<string | null>(null);
  const [result, setResult] = useState<Shipment | null>(null);
  const [message, setMessage] = useState("");
  const [busy, setBusy] = useState(false);
  const [attempt, setAttempt] = useState(0);
  const [synced, setSynced] = useState(false);
  const [shareMessage, setShareMessage] = useState("");
  useEffect(() => {
    const initial =
      new URLSearchParams(window.location.search).get("code") || "";
    setCode(initial);
    if (initial) {
      const normalized = normalizeTrackingCode(initial);
      if (normalized) setSelected(normalized);
      else
        setMessage(
          "Enter the full tracking code from your account, beginning DP-P- or DP-D-.",
        );
    }
  }, []);
  useEffect(() => {
    setResult(null);
    setShareMessage("");
    if (!selected) return;
    if (!configured) {
      setMessage("Tracking services are being set up. Please check back soon.");
      return;
    }
    setBusy(true);
    setMessage("");
    setSynced(false);
    return onSnapshot(
      doc(db, "public_shipments", selected),
      { includeMetadataChanges: true },
      (snap) => {
        setBusy(false);
        setSynced(!snap.metadata.fromCache);
        if (snap.exists()) {
          setResult(snap.data() as Shipment);
          setMessage("");
        } else {
          setResult(null);
          setMessage(
            "No shipment found yet. Check the code or wait for staff to confirm the booking.",
          );
        }
      },
      () => {
        setBusy(false);
        setSynced(false);
        setMessage("Tracking is temporarily unavailable. Please try again.");
      },
    );
  }, [selected, attempt]);
  function search(e: React.FormEvent) {
    e.preventDefault();
    const value = normalizeTrackingCode(code);
    setShareMessage("");
    if (!value) {
      setMessage(
        "Enter the full tracking code from your account, beginning DP-P- or DP-D-.",
      );
      return;
    }
    setCode(value);
    setSelected(value);
    setAttempt((previous) => previous + 1);
  }
  async function copyLink() {
    if (!selected) return;
    try {
      await navigator.clipboard.writeText(
        `${window.location.origin}/tracking?code=${encodeURIComponent(selected)}`,
      );
      setShareMessage(
        "Tracking link copied. Anyone with the link can view this shipment’s public status.",
      );
    } catch {
      setShareMessage(
        "Could not copy the link. You can copy this page’s URL after opening tracking from My workspace.",
      );
    }
  }
  const step = shipmentSteps.find((s) => s.key === result?.status);
  return (
    <main className="mx-auto max-w-6xl px-5 py-10 sm:px-6">
      <div className="grid items-start gap-8 lg:grid-cols-[.8fr_1.2fr]">
        <div>
          <span className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-brandYellow text-brandBlue">
            <ServiceIcon name="tracking" />
          </span>
          <p className="eyebrow mt-6">EVERY JOURNEY HAS A STORY</p>
          <h1 className="mt-4 text-4xl font-semibold leading-tight tracking-tight sm:text-5xl">
            A little less wondering.
            <br />
            <span className="text-brandBlue">A lot more clarity.</span>
          </h1>
          <p className="mt-5 max-w-md text-sm leading-relaxed text-inkSoft">
            Follow the status updates published by the IPOSITA team. Your
            tracking code appears in My workspace after your booking is
            confirmed.
          </p>
          <form
            onSubmit={search}
            className="mt-7 rounded-2xl border border-ink/10 bg-white p-5"
          >
            <label htmlFor="tracking-code" className="text-sm font-semibold">
              Tracking code
            </label>
            <input
              id="tracking-code"
              className="input mt-3 font-mono"
              required
              maxLength={25}
              placeholder="DP-P-… or DP-D-…"
              value={code}
              onChange={(e) => setCode(e.target.value)}
            />
            <button className="button mt-3 w-full" disabled={busy}>
              {busy ? "Finding your shipment…" : "Follow shipment →"}
            </button>
            <p role="status" className="mt-3 text-sm text-inkSoft">
              {message}
            </p>
          </form>
          <Link
            href="/account"
            className="mt-5 inline-block text-sm font-semibold text-brandBlue"
          >
            Find my tracking code in My workspace ↗
          </Link>
        </div>
        <div>
          {result ? (
            <section className="overflow-hidden rounded-3xl border border-brandBlue/15 bg-white">
              <div className="bg-brandBlue p-7 text-white">
                <p className="flex items-center gap-2 text-xs text-white/75">
                  <span
                    className="h-2 w-2 rounded-full bg-brandYellow"
                    aria-hidden="true"
                  />
                  {synced ? "Updates connected" : "Last available update"}
                </p>
                <h2 className="mt-4 text-3xl font-semibold capitalize">
                  {step?.title || statusLabel(result.status)}
                </h2>
                <p className="mt-3 text-sm text-white/80">
                  {step?.description}
                </p>
                <p className="mt-5 break-all font-mono text-xs text-white/75">
                  {result.trackingCode}
                </p>
              </div>
              <div className="p-7">
                <h3 className="text-sm font-semibold">
                  Your shipment timeline
                </h3>
                <ol className="mt-6">
                  {result.history.map((event, index) => (
                    <li
                      key={`${event.timestamp}-${index}`}
                      className={`relative ml-2 border-l-2 pb-7 pl-7 ${index === result.history.length - 1 ? "border-transparent" : "border-brandBlue/15"}`}
                    >
                      <span
                        className={`absolute -left-[7px] top-1 h-3 w-3 rounded-full ring-4 ring-white ${index === result.history.length - 1 ? "bg-brandYellow" : "bg-brandBlue"}`}
                        aria-hidden="true"
                      />
                      <p className="text-sm font-semibold capitalize">
                        {statusLabel(event.status)}
                      </p>
                      <p className="mt-1 text-xs text-inkSoft">
                        {new Date(event.timestamp).toLocaleString("en-GB", {
                          timeZone: "Africa/Kigali",
                        })}{" "}
                        CAT
                      </p>
                    </li>
                  ))}
                </ol>
                <button className="button secondary" onClick={copyLink}>
                  Copy tracking link ↗
                </button>
                <p role="status" className="mt-3 text-xs text-inkSoft">
                  {shareMessage}
                </p>
                <p className="mt-5 border-t border-ink/10 pt-4 text-xs leading-relaxed text-inkSoft">
                  Public tracking shows shipment status only. Customer contact
                  details, exact addresses and GPS pins stay in the private
                  booking.
                </p>
              </div>
            </section>
          ) : (
            <section className="brand-grid rounded-3xl bg-brandBlue p-7 text-white sm:p-10">
              <p className="text-xs font-semibold tracking-widest text-brandYellow">
                FROM BOOKING TO ARRIVAL
              </p>
              <h2 className="mt-4 text-2xl font-semibold">
                The next update is within reach.
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-white/75">
                Enter your code to open your shipment’s actual timeline. This
                page updates as staff publish progress.
              </p>
              <div className="mt-8 space-y-6">
                {shipmentSteps.map((s, index) => (
                  <div key={s.key} className="flex gap-4">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/25 text-sm text-brandYellow">
                      0{index + 1}
                    </span>
                    <div>
                      <h3 className="text-sm font-semibold">{s.title}</h3>
                      <p className="mt-1 text-xs leading-relaxed text-white/70">
                        {s.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              <p className="mt-7 text-xs text-white/60">
                Illustrative journey stages. Your actual updates appear after
                lookup.
              </p>
            </section>
          )}
        </div>
      </div>
    </main>
  );
}
