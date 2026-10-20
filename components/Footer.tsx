import Link from "next/link";
export default function Footer() {
  return (
    <footer className="border-t border-ink/10">
      <div className="mx-auto flex max-w-6xl flex-wrap justify-between gap-5 px-6 py-8 text-sm text-inkSoft">
        <p>DigiPosita · Integrated digital services</p>
        <div className="flex gap-5">
          <Link href="/account">My requests</Link>
          <Link href="/services">All services</Link>
        </div>
        <p className="w-full text-xs">
          Service availability and collection windows are confirmed by the
          operations team. Pricing is confirmed before processing.
        </p>
      </div>
    </footer>
  );
}
