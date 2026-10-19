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
    ["/pickups", "Send a parcel"],
    ["/tracking", "Track"],
    ["/deliveries", "Local delivery"],
    ["/account", "My requests"],
    ...(staff ? [["/staff", "Operations"]] : []),
  ];
  return (
    <header className="border-b border-ink/10 bg-paper">
      <div className="mx-auto max-w-6xl px-6 py-5">
        <div className="flex items-center justify-between gap-4">
          <Link href="/" className="font-display text-2xl font-bold">
            Digi<span className="text-goldDeep">Posita</span>
            <span className="ml-2 text-xs font-normal text-inkSoft">PILOT</span>
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
