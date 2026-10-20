import Link from "next/link";
import ShopDirectory from "@/components/ShopDirectory";
export default function Shops() {
  return (
    <main className="mx-auto max-w-4xl px-6 py-14">
      <p className="eyebrow">LOCAL BUSINESSES</p>
      <h1 className="mt-3 font-display text-4xl">Discover a shop near you.</h1>
      <p className="mt-4 text-inkSoft">
        Browse businesses reviewed by the service team.
      </p>
      <Link className="button my-7" href="/shops/register">
        Register your shop
      </Link>
      <ShopDirectory />
    </main>
  );
}
