"use client";
import Link from "next/link";
import { useState } from "react";
import { collection, doc, serverTimestamp, setDoc } from "firebase/firestore";
import { ref, uploadBytes, deleteObject } from "firebase/storage";
import { useAuth } from "./AuthProvider";
import { db, storage } from "@/lib/firebase";
import { getService } from "@/lib/services";
export default function DigitalServiceForm({ kind }: { kind: string }) {
  const service = getService(kind);
  const { user } = useAuth();
  const [fields, setFields] = useState<Record<string, string>>({});
  const [contactName, setName] = useState("");
  const [email, setEmail] = useState(user?.email || "");
  const [phone, setPhone] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [reference, setReference] = useState("");
  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!user || busy) return;
    setBusy(true);
    setError("");
    const ticket = doc(collection(db, "service_requests"));
    let uploadedPath = "";
    try {
      const values = Object.fromEntries(
        service.fields.map((f) => [
          f.key,
          (fields[f.key] || f.options?.[0] || "").trim(),
        ]),
      );
      if (service.fields.some((f) => !values[f.key]))
        throw new Error("Complete every service detail.");
      let attachment;
      if (service.attachment) {
        if (!file) throw new Error("Choose a document to submit.");
        if (
          !["application/pdf", "image/jpeg", "image/png"].includes(file.type) ||
          file.size > 10 * 1024 * 1024 ||
          file.size === 0
        )
          throw new Error("Choose a PDF, JPEG or PNG file up to 10 MB.");
        const path = `serviceDocuments/${user.uid}/${ticket.id}/document`;
        await uploadBytes(ref(storage, path), file, { contentType: file.type });
        uploadedPath = path;
        attachment = {
          path,
          name: file.name.slice(0, 200),
          size: file.size,
          type: file.type,
        };
      }
      await setDoc(ticket, {
        ownerId: user.uid,
        kind,
        contactName: contactName.trim(),
        email: email.trim(),
        phone: phone.trim(),
        fields: values,
        status: "submitted",
        result: "",
        customerReply: "",
        createdAt: serverTimestamp(),
        ...(kind === "shops" ? { publishConsent: true } : {}),
        ...(attachment ? { attachment } : {}),
      });
      setReference(ticket.id);
    } catch (e) {
      if (uploadedPath)
        await deleteObject(ref(storage, uploadedPath)).catch(() => {});
      setError(
        e instanceof Error && !["FirebaseError"].includes(e.name)
          ? e.message
          : "Unable to submit your request. Please try again.",
      );
    } finally {
      setBusy(false);
    }
  }
  if (reference)
    return (
      <div className="rounded-xl border border-green/20 bg-paper2 p-8">
        <h2 className="font-display text-2xl">Request received</h2>
        <p className="mt-4 break-all font-mono text-sm">
          Reference: {reference}
        </p>
        <p className="mt-3 text-inkSoft">
          Your submission is awaiting review. Replies and status updates will
          appear in your account.
        </p>
        <Link className="button mt-6" href="/account">
          View all my requests
        </Link>
      </div>
    );
  return (
    <form onSubmit={submit} className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <label className="block text-sm">
          Contact name
          <input
            required
            maxLength={120}
            className="input mt-2"
            autoComplete="name"
            value={contactName}
            onChange={(e) => setName(e.target.value)}
          />
        </label>
        <label className="block text-sm">
          Phone
          <input
            required
            type="tel"
            maxLength={30}
            className="input mt-2"
            autoComplete="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </label>
      </div>
      <label className="block text-sm">
        Contact email
        <input
          required
          type="email"
          maxLength={200}
          className="input mt-2"
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </label>
      {service.fields.map((f) => (
        <label key={f.key} className="block text-sm">
          {f.label}
          {f.options ? (
            <select
              className="input mt-2"
              value={fields[f.key] || f.options[0]}
              onChange={(e) =>
                setFields({ ...fields, [f.key]: e.target.value })
              }
            >
              {f.options.map((o) => (
                <option key={o}>{o}</option>
              ))}
            </select>
          ) : f.type === "textarea" ? (
            <textarea
              required
              maxLength={2000}
              className="input mt-2"
              rows={4}
              value={fields[f.key] || ""}
              onChange={(e) =>
                setFields({ ...fields, [f.key]: e.target.value })
              }
            />
          ) : (
            <input
              required
              type={f.type || "text"}
              min={f.type === "number" ? 0.1 : undefined}
              max={f.type === "number" ? 1000 : undefined}
              step={f.type === "number" ? 0.1 : undefined}
              maxLength={500}
              className="input mt-2"
              value={fields[f.key] || ""}
              onChange={(e) =>
                setFields({ ...fields, [f.key]: e.target.value })
              }
            />
          )}
        </label>
      ))}
      {service.attachment && (
        <label className="block text-sm">
          Document (PDF, JPEG or PNG, up to 10 MB)
          <input
            required
            className="input mt-2"
            type="file"
            accept="application/pdf,image/jpeg,image/png"
            onChange={(e) => setFile(e.target.files?.[0] || null)}
          />
        </label>
      )}
      {kind === "shops" && (
        <label className="flex items-start gap-3 text-sm">
          <input required type="checkbox" className="mt-1" />I agree to publish
          my shop's name, category, location, description and contact phone in
          the directory after approval.
        </label>
      )}
      {kind === "kashi" && (
        <p className="rounded-lg bg-paper2 p-4 text-sm">
          This is an account application. Verification happens with the service
          team; approval here does not open a financial account. Deposits,
          withdrawals and payments are not available.
        </p>
      )}
      <button className="button" disabled={busy}>
        {busy ? "Submitting…" : service.action}
      </button>
      {error && (
        <p role="alert" className="text-sm text-stamp">
          {error}
        </p>
      )}
    </form>
  );
}
