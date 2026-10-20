import Auctions from "@/components/Auctions";
export default function Page() {
  return (
    <main className="mx-auto max-w-4xl px-6 py-14">
      <p className="eyebrow">ONLINE AUCTIONS</p>
      <h1 className="mt-3 font-display text-4xl">
        Discover. Bid. Follow along.
      </h1>
      <p className="mt-4 text-inkSoft">
        Browse items published by the service team. Bids are recorded in Rwandan
        francs; payment and collection are arranged after the auction.
      </p>
      <Auctions />
    </main>
  );
}
