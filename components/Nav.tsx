"use client";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useAuth } from "./AuthProvider";
export default function Nav() {
  const path = usePathname();
  const { user, staff } = useAuth();
  const [error, setError] = useState("");
  const links = [
    ["/services", "All services"],
    ["/tracking", "Track"],
    ["/auctions", "Auctions"],
    ["/shops", "Shops"],
    ["/account", "My requests"],
    ...(staff ? [["/staff", "Operations"]] : []),
  ];
  return (
    <header className="border-b border-ink/10 bg-white">
      <div className="mx-auto max-w-6xl px-6 py-5">
        <div className="flex items-center justify-between gap-4">
          <Link
            href="/"
            className="flex items-center font-display text-2xl font-bold"
          >
            <span
              className="mr-2 flex h-9 w-9 items-center justify-center rounded-xl bg-green font-sans text-lg text-white"
              aria-hidden="true"
            >
              ↗
            </span>
            Digi<span className="text-goldDeep">Posita</span>
            <span className="ml-2 text-xs font-normal text-inkSoft">
              {process.env.NEXT_PUBLIC_USE_FIREBASE_EMULATORS === "true"
                ? "LOCAL DEMO"
                : "PILOT"}
            </span>
          </Link>
          {user ? (
            <button
              className="text-sm"
              onClick={() =>
                signOut(auth).catch(() =>
                  setError("Could not sign out. Please try again."),
                )
              }
            >
              Sign out
            </button>
          ) : (
            <Link href="/login" className="text-sm font-semibold">
              Sign in ↗
            </Link>
          )}
        </div>
        <nav
          aria-label="Main navigation"
          className="mt-5 flex flex-wrap gap-x-6 gap-y-3 text-sm"
        >
          {links.map(([href, label]) => (
            <Link
              key={href}
              href={href}
              aria-current={path === href ? "page" : undefined}
              className={
                path === href ? "font-semibold text-green" : "text-inkSoft"
              }
            >
              {label}
            </Link>
          ))}
        </nav>
        {error && <p role="alert">{error}</p>}
      </div>
    </header>
  );
}
