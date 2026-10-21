import Auctions from "@/components/Auctions";
export default function Page() {
  return (
    <main className="mx-auto max-w-4xl px-6 py-14">
      <p className="eyebrow">ONLINE AUCTIONS</p>
      <h1 className="mt-3 font-display text-4xl">
        Bid on IPOSITA-owned items.
      </h1>
      <p className="mt-4 text-inkSoft">
        Browse existing IPOSITA assets listed by authorized staff. Review item
        conditions, place bids in Rwandan francs and follow closing times. The
        team coordinates payment and collection with the winning bidder.
      </p>
      <Auctions />
    </main>
  );
}
