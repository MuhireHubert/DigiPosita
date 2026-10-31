import {
  collection,
  doc,
  getDocFromServer,
  runTransaction,
  serverTimestamp,
  type Firestore,
} from "firebase/firestore";
export async function placeAuctionBid(
  db: Firestore,
  auctionId: string,
  ownerId: string,
  contactEmail: string,
  amount: number,
) {
  if (!Number.isSafeInteger(amount) || amount < 1 || amount > 1e12)
    throw new Error("Enter a positive whole-number bid in RWF.");
  const auctionRef = doc(db, "auction_listings", auctionId);
  const bidRef = doc(collection(db, "auction_listings", auctionId, "bids"));
  for (let attempt = 0; attempt < 3; attempt++) {
    let observedCount = -1;
    try {
      await runTransaction(db, async (tx) => {
        const snap = await tx.get(auctionRef);
        if (!snap.exists()) throw new Error("Auction not found.");
        const current = snap.data();
        observedCount = current.bidCount;
        if (
          current.status !== "open" ||
          current.closesAt.toMillis() <= Date.now()
        )
          throw new Error("This auction has ended.");
        if (amount < current.startingPrice || amount <= current.highestBid)
          throw new Error(
            "A higher bid arrived. Review the current price and try again.",
          );
        tx.set(bidRef, {
          ownerId,
          contactEmail,
          amount,
          createdAt: serverTimestamp(),
        });
        tx.update(auctionRef, {
          highestBid: amount,
          bidCount: current.bidCount + 1,
          lastBidId: bidRef.id,
        });
        tx.set(doc(db, "customer_bids", ownerId, "entries", bidRef.id), {
          auctionId,
          auctionTitle: current.title,
          amount,
          createdAt: serverTimestamp(),
        });
      });
      return bidRef.id;
    } catch (error) {
      // Rules may reject a stale bid before Firestore reports its transaction conflict.
      // Retry only when another accepted bid actually changed the auction we read.
      if (
        attempt < 2 &&
        observedCount >= 0 &&
        typeof error === "object" &&
        error !== null &&
        "code" in error &&
        error.code === "permission-denied"
      ) {
        const latest = await getDocFromServer(auctionRef);
        if (latest.exists() && latest.data().bidCount !== observedCount) {
          if (amount <= latest.data().highestBid)
            throw new Error(
              "A higher bid arrived. Review the current price and try again.",
            );
          continue;
        }
      }
      throw error;
    }
  }
  throw new Error("Bidding is busy. Please try again.");
}
