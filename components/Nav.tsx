"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const LINKS = [
  { href: "/pickups", label: "Pickups" },
  { href: "/tracking", label: "Tracking" },
  { href: "/calculator", label: "Fees" },
  { href: "/deliveries", label: "Deliveries" },
  { href: "/poboxes", label: "e-P.O. Box" },
  { href: "/submissions", label: "Submissions" },
  { href: "/exports", label: "Exports" },
  { href: "/auctions", label: "Auctions" },
  { href: "/trade", label: "AfCFTA" },
  { href: "/shops", label: "Shops" },
  { href: "/kashi", label: "Kashi" },
];

export default function Nav() {
  const pathname = usePathname();
  return (
    <header className="sticky top-0 z-10 border-b border-ink/10 bg-paper/95 backdrop-blur">
      <div className="mx-auto flex max-w-4xl items-center justify-between gap-4 px-6 py-4">
        <Link href="/" className="shrink-0 font-display text-lg font-bold">
          Iposita <span className="text-goldDeep">Digital</span>
        </Link>
        <nav className="flex gap-4 overflow-x-auto text-sm text-inkSoft [scrollbar-width:none]">
          {LINKS.map((l) => (
            <Link key={l.href} href={l.href}
              className={`shrink-0 hover:text-ink ${pathname === l.href ? "font-medium text-ink" : ""}`}>
              {l.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
