"use client";
import { useEffect, useState } from "react";
import {
  collection,
  doc,
  limit,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  updateDoc,
  where,
} from "firebase/firestore";
import { getBlob, ref } from "firebase/storage";
import { db, storage } from "@/lib/firebase";
import { useAuth } from "./AuthProvider";
import { services, getService, stages, label } from "@/lib/services";
import { reviewRequest, type DigitalRequest } from "@/lib/service-requests";
export default function ServiceRequests({
  operations = false,
}: {
  operations?: boolean;
}) {
  const { user, staff } = useAuth();
  const [items, setItems] = useState<DigitalRequest[]>([]);
  const [kind, setKind] = useState("all");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  useEffect(() => {
    if (!user || (operations && !staff)) return;
    setLoading(true);
    setError("");
    const q = operations
      ? query(
          collection(db, "service_requests"),
          orderBy("createdAt", "desc"),
          limit(100),
        )
      : query(
          collection(db, "service_requests"),
          where("ownerId", "==", user.uid),
          orderBy("createdAt", "desc"),
          limit(100),
        );
    return onSnapshot(
      q,
      (s) => {
        setItems(
          s.docs.map((d) => ({ id: d.id, ...d.data() }) as DigitalRequest),
        );
        setLoading(false);
      },
      () => {
        setLoading(false);
        setError("Could not load service requests. Please try again.");
      },
    );
  }, [user, staff, operations]);
  return (
    <section className="mt-12">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h2 className="font-display text-2xl">
            {operations ? "Service desk" : "My service requests"}
          </h2>
          <p className="mt-2 text-sm text-inkSoft">
            Latest 100 requests across all services.
          </p>
        </div>
        <label className="text-sm">
          Filter service
          <select
            className="input mt-1"
            value={kind}
            onChange={(e) => setKind(e.target.value)}
          >
            <option value="all">All services</option>
            {services.map((s) => (
              <option key={s.key} value={s.key}>
                {s.title}
              </option>
            ))}
          </select>
        </label>
      </div>
      {loading && (
        <p className="mt-5" role="status">
          Loading requests…
        </p>
      )}
      {error && (
        <p className="mt-5 text-stamp" role="alert">
          {error}
        </p>
      )}
      <div className="mt-6 space-y-5">
        {items
          .filter((i) => kind === "all" || i.kind === kind)
          .map((item) => (
            <RequestCard key={item.id} item={item} operations={operations} />
          ))}
        {!loading &&
          !error &&
          !items.some((i) => kind === "all" || i.kind === kind) && (
            <p className="rounded-lg border border-ink/10 p-6 text-sm text-inkSoft">
              No service requests here yet.
            </p>
          )}
      </div>
    </section>
  );
}
function RequestCard({
  item,
  operations,
}: {
  item: DigitalRequest;
  operations: boolean;
}) {
  const [next, setNext] = useState("");
  const [boxNumber, setBoxNumber] = useState("");
  const [response, setResponse] = useState("");
  const [reply, setReply] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const service = getService(item.kind);
  const choices = stages[item.status] || [];
  async function update(cancel = false) {
    if (busy) return;
    setBusy(true);
    setError("");
    try {
      if (operations)
        await reviewRequest(item, next || choices[0], response, boxNumber);
      else
        await updateDoc(
          doc(db, "service_requests", item.id),
          cancel
            ? { status: "cancelled", updatedAt: serverTimestamp() }
            : {
                status: "reviewing",
                customerReply: reply.trim(),
                updatedAt: serverTimestamp(),
              },
        );
      setResponse("");
      setReply("");
      setNext("");
    } catch (e) {
      setError(e instanceof Error ? e.message : "Unable to update request.");
    } finally {
      setBusy(false);
    }
  }
  async function download() {
    if (!item.attachment) return;
    setBusy(true);
    setError("");
    try {
      const blob = await getBlob(
        ref(storage, item.attachment.path),
        10 * 1024 * 1024,
      );
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = item.attachment.name;
      a.click();
      setTimeout(() => URL.revokeObjectURL(url), 1000);
    } catch {
      setError("Could not download this document. Please try again.");
    } finally {
      setBusy(false);
    }
  }
  return (
    <article className="rounded-xl border border-ink/10 bg-paper2 p-6">
      <div className="flex flex-wrap justify-between gap-3">
        <h3 className="font-display text-xl">{service?.title || item.kind}</h3>
        <span className="rounded-full bg-white px-3 py-1 text-xs capitalize">
          {label(item.status)}
        </span>
      </div>
      <p className="mt-2 break-all font-mono text-xs text-inkSoft">
        Reference: {item.id}
      </p>
      {operations && (
        <p className="mt-3 text-sm">
          {item.contactName} · {item.email} · {item.phone}
        </p>
      )}
      <dl className="mt-5 grid gap-3 sm:grid-cols-2">
        {service?.fields.map((f) => (
          <div key={f.key}>
            <dt className="text-xs text-inkSoft">{f.label}</dt>
            <dd className="mt-1 whitespace-pre-wrap break-words text-sm">
              {item.fields[f.key]}
            </dd>
          </div>
        ))}
      </dl>
      {item.attachment && (
        <button
          onClick={download}
          disabled={busy}
          className="mt-4 text-sm font-semibold text-green"
        >
          Download {item.attachment.name}
        </button>
      )}
      {item.boxNumber && (
        <p className="mt-4 text-sm font-semibold">
          Assigned P.O. box: {item.boxNumber} · {item.fields.office}
        </p>
      )}
      {item.result && (
        <div className="mt-4 rounded-lg bg-white p-4">
          <p className="text-xs font-semibold text-green">
            SERVICE TEAM RESPONSE
          </p>
          <p className="mt-2 whitespace-pre-wrap text-sm">{item.result}</p>
        </div>
      )}
      {item.customerReply && (
        <p className="mt-4 whitespace-pre-wrap text-sm">
          <strong>Customer reply: </strong>
          {item.customerReply}
        </p>
      )}
      {operations && choices.length > 0 && (
        <div className="mt-5 space-y-3">
          <label className="block text-sm">
            Next status
            <select
              className="input mt-1"
              value={next || choices[0]}
              onChange={(e) => setNext(e.target.value)}
            >
              {choices.map((s) => (
                <option key={s} value={s}>
                  {label(s)}
                </option>
              ))}
            </select>
          </label>
          {item.kind === "poboxes" && (next || choices[0]) === "approved" && (
            <label className="block text-sm">
              Assigned box number
              <input
                className="input mt-1"
                maxLength={40}
                value={boxNumber}
                onChange={(e) => setBoxNumber(e.target.value)}
              />
            </label>
          )}
          <label className="block text-sm">
            Response to customer
            <textarea
              className="input mt-1"
              maxLength={2000}
              rows={3}
              value={response}
              placeholder={
                item.kind === "poboxes"
                  ? "Include the assigned box number and office when approving."
                  : item.kind === "exports"
                    ? "Include the quote, currency and next steps when approving."
                    : "Explain the decision or next steps."
              }
              onChange={(e) => setResponse(e.target.value)}
            />
          </label>
          <button
            className="button"
            disabled={busy || !response.trim()}
            onClick={() => update()}
          >
            {busy ? "Saving…" : "Update request"}
          </button>
        </div>
      )}
      {!operations && item.status === "action_required" && (
        <div className="mt-4">
          <label className="block text-sm">
            Reply to the service team
            <textarea
              className="input mt-2"
              rows={3}
              maxLength={2000}
              value={reply}
              onChange={(e) => setReply(e.target.value)}
            />
          </label>
          <button
            className="button mt-3"
            disabled={busy || !reply.trim()}
            onClick={() => update()}
          >
            Send reply
          </button>
        </div>
      )}
      {!operations && item.status === "submitted" && (
        <button
          className="mt-4 text-sm text-stamp"
          disabled={busy}
          onClick={() => update(true)}
        >
          Cancel request
        </button>
      )}
      {error && (
        <p role="alert" className="mt-3 text-sm text-stamp">
          {error}
        </p>
      )}
    </article>
  );
}
