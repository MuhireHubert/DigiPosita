"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "./AuthProvider";
import { configured } from "@/lib/firebase";
export default function ServiceGate({
  children,
}: {
  children: React.ReactNode;
}) {
  const path = usePathname();
  const { user, loading, staff } = useAuth();
  const protectedPage = [
    "/pickups",
    "/deliveries",
    "/account",
    "/staff",
    "/submissions",
    "/exports",
    "/trade",
    "/other",
    "/shops/register",
  ].includes(path);
  if (!protectedPage) return <>{children}</>;
  let message = "";
  if (!configured)
    message = "Online services are being set up. Please check back soon.";
  else if (loading) message = "Loading your account…";
  else if (!user)
    message = "Sign in to request a service and keep track of your bookings.";
  else if (path === "/staff" && !staff)
    message = "This workspace is available to authorized staff only.";
  if (message)
    return (
      <main className="mx-auto max-w-lg px-6 py-16">
        <h1 className="font-display text-2xl">Your DigiPosita account</h1>
        <p className="my-6" role="status">
          {message}
        </p>
        {configured && !loading && !user && (
          <Link
            className="button"
            href={`/login?next=${encodeURIComponent(path)}`}
          >
            Sign in or create an account
          </Link>
        )}
      </main>
    );
  return <>{children}</>;
}
