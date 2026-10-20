"use client";
import Link from "next/link";
import { placeAuctionBid } from "@/lib/auction-bids";
import { useEffect, useState } from "react";
import {
  addDoc,
  collection,
  doc,
  limit,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  Timestamp,
  updateDoc,
  where,
} from "firebase/firestore";
import { db, configured } from "@/lib/firebase";
import { useAuth } from "./AuthProvider";
interface Auction {
  id: string;
  title: string;
  description: string;
  startingPrice: number;
  highestBid: number;
  bidCount: number;
  lastBidId: string;
  status: "open" | "closed";
  closesAt: Timestamp;
}
export default function Auctions({
  operations = false,
}: {
  operations?: boolean;
}) {
  const { staff } = useAuth();
  const [items, setItems] = useState<Auction[]>([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(configured);
  useEffect(() => {
    if (!configured) return;
    return onSnapshot(
      query(
        collection(db, "auction_listings"),
        orderBy("createdAt", "desc"),
        limit(100),
      ),
      (s) => {
        setItems(s.docs.map((d) => ({ id: d.id, ...d.data() }) as Auction));
        setLoading(false);
      },
      () => {
        setLoading(false);
        setError("Could not load auctions. Please try again.");
      },
    );
  }, []);
  return (
    <section className={operations ? "mt-12" : ""}>
      {operations && <h2 className="font-display text-2xl">Auction desk</h2>}
      {operations && staff && <AuctionForm />}
      {loading && (
        <p className="mt-5" role="status">
          Loading auctions…
        </p>
      )}
      {error && (
        <p className="mt-5" role="alert">
          {error}
        </p>
      )}
      <div className="mt-7 grid gap-5 md:grid-cols-2">
        {items.map((item) => (
          <AuctionCard key={item.id} item={item} operations={operations} />
        ))}
      </div>
      {!loading && !error && !items.length && (
        <p className="mt-5 text-sm text-inkSoft">
          {configured
            ? "No auctions have been published yet."
            : "Auctions will be available once online services are configured."}
        </p>
      )}
    </section>
  );
}
function AuctionForm() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [closes, setCloses] = useState("");
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState("");
  async function publish(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setMessage("");
    try {
      const amount = Number(price);
      const end = new Date(closes);
      if (
        !Number.isSafeInteger(amount) ||
        amount < 1 ||
        amount > 1e12 ||
        !Number.isFinite(end.getTime()) ||
        end.getTime() <= Date.now()
      )
        throw new Error(
          "Enter a positive whole-number starting price and a future closing time.",
        );
      await addDoc(collection(db, "auction_listings"), {
        title: title.trim(),
        description: description.trim(),
        startingPrice: amount,
        highestBid: 0,
        bidCount: 0,
        lastBidId: "",
        status: "open",
        closesAt: Timestamp.fromDate(end),
        createdAt: serverTimestamp(),
      });
      setTitle("");
      setDescription("");
      setPrice("");
      setCloses("");
      setMessage("Auction published.");
    } catch (e) {
      setMessage(e instanceof Error ? e.message : "Could not publish auction.");
    } finally {
      setBusy(false);
    }
  }
  return (
    <form
      onSubmit={publish}
      className="mt-5 space-y-4 rounded-xl border border-ink/10 p-6"
    >
      <h3 className="font-display text-xl">Publish an auction</h3>
      <label className="block text-sm">
        Item title
        <input
          required
          maxLength={200}
          className="input mt-1"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </label>
      <label className="block text-sm">
        Item description
        <textarea
          required
          maxLength={2000}
          className="input mt-1"
          rows={3}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </label>
      <label className="block text-sm">
        Starting price (RWF)
        <input
          required
          type="number"
          min={1}
          max={1e12}
          step={1}
          className="input mt-1"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
      </label>
      <label className="block text-sm">
        Closes at (your local time)
        <input
          required
          type="datetime-local"
          className="input mt-1"
          value={closes}
          onChange={(e) => setCloses(e.target.value)}
        />
      </label>
      <button className="button" disabled={busy}>
        {busy ? "Publishing…" : "Publish auction"}
      </button>
      <p role="status" className="text-sm">
        {message}
      </p>
    </form>
  );
}
function AuctionCard({
  item,
  operations,
}: {
  item: Auction;
  operations: boolean;
}) {
  const { user, staff } = useAuth();
  const [amount, setAmount] = useState("");
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState("");
  const [now, setNow] = useState<number | null>(null);
  useEffect(() => {
    setNow(Date.now());
    const timer = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(timer);
  }, []);
  const expired = now !== null && item.closesAt.toMillis() <= now;
  const minimum = Math.max(item.startingPrice, item.highestBid + 1);
  async function bid(e: React.FormEvent) {
    e.preventDefault();
    if (!user || busy) return;
    setBusy(true);
    setMessage("");
    try {
      const value = Number(amount);
      if (!Number.isSafeInteger(value) || value < minimum || value > 1e12)
        throw new Error(
          `Enter a whole-number bid of at least RWF ${minimum.toLocaleString()}.`,
        );
      await placeAuctionBid(db, item.id, user.uid, user.email || "", value);
      setAmount("");
      setMessage("Your bid has been recorded. View it in My requests.");
    } catch (e) {
      setMessage(e instanceof Error ? e.message : "Could not place your bid.");
    } finally {
      setBusy(false);
    }
  }
  async function close() {
    setBusy(true);
    setMessage("");
    try {
      await updateDoc(doc(db, "auction_listings", item.id), {
        status: "closed",
      });
      setMessage("Auction closed. Review the winning bid below.");
    } catch {
      setMessage(
        "Could not close auction. It must have reached its closing time.",
      );
    } finally {
      setBusy(false);
    }
  }
  return (
    <article className="rounded-xl border border-ink/10 bg-paper2 p-6">
      <div className="flex items-start justify-between gap-3">
        <h3 className="font-display text-2xl">{item.title}</h3>
        <span className="rounded-full bg-white px-3 py-1 text-xs">
          {item.status === "closed" ? "Closed" : expired ? "Ended" : "Open"}
        </span>
      </div>
      <p className="mt-4 whitespace-pre-wrap text-sm text-inkSoft">
        {item.description}
      </p>
      <p className="mt-5 text-2xl font-semibold">
        RWF {(item.highestBid || item.startingPrice).toLocaleString("en-US")}
      </p>
      <p className="mt-2 text-xs text-inkSoft">
        {item.bidCount} bids · Closes{" "}
        {item.closesAt
          .toDate()
          .toLocaleString("en-GB", { timeZone: "Africa/Kigali" })}{" "}
        CAT
      </p>
      {!operations &&
        item.status === "open" &&
        !expired &&
        (user ? (
          <form onSubmit={bid} className="mt-5">
            <label className="text-sm">
              Your bid (RWF)
              <input
                required
                type="number"
                min={minimum}
                max={1e12}
                step={1}
                className="input mt-2"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
            </label>
            <button className="button mt-3" disabled={busy}>
              {busy ? "Placing bid…" : "Place bid"}
            </button>
          </form>
        ) : (
          <Link className="button mt-5" href="/login?next=%2Fauctions">
            Sign in to bid
          </Link>
        ))}
      {operations && staff && expired && item.status === "open" && (
        <button className="button mt-5" disabled={busy} onClick={close}>
          Close auction
        </button>
      )}
      {operations && staff && item.status === "closed" && item.lastBidId && (
        <WinningBid auctionId={item.id} bidId={item.lastBidId} />
      )}
      <p className="mt-3 text-sm" role="status">
        {message}
      </p>
    </article>
  );
}
function WinningBid({
  auctionId,
  bidId,
}: {
  auctionId: string;
  bidId: string;
}) {
  const [winner, setWinner] = useState("");
  useEffect(
    () =>
      onSnapshot(
        doc(db, "auction_listings", auctionId, "bids", bidId),
        (s) =>
          setWinner(
            s.exists()
              ? `${s.data().contactEmail} · UID ${s.data().ownerId}`
              : "Not available",
          ),
        () => setWinner("Could not load winner"),
      ),
    [auctionId, bidId],
  );
  return (
    <p className="mt-4 break-all text-sm">
      Winning bidder: {winner || "Loading…"}. Contact the winner through your
      account administration process to arrange payment and collection.
    </p>
  );
}
export function MyBids() {
  return <BidHistory />;
}
function BidHistory() {
  const { user } = useAuth();
  const [bids, setBids] = useState<
    { id: string; auctionTitle: string; amount: number; auctionId: string }[]
  >([]);
  const [error, setError] = useState("");
  useEffect(() => {
    if (!user) return;
    return onSnapshot(
      query(
        collection(db, "customer_bids", user.uid, "entries"),
        orderBy("createdAt", "desc"),
        limit(100),
      ),
      (s) =>
        setBids(
          s.docs.map(
            (d) => ({ id: d.id, ...d.data() }) as (typeof bids)[number],
          ),
        ),
      () => setError("Could not load your bids."),
    );
  }, [user]);
  return (
    <section className="mt-12">
      <h2 className="font-display text-2xl">My auction bids</h2>
      {error && (
        <p role="alert" className="mt-4">
          {error}
        </p>
      )}
      <ul className="mt-5 space-y-3">
        {bids.map((b) => (
          <li key={b.id} className="rounded-lg border border-ink/10 p-4">
            <Link href="/auctions" className="font-semibold">
              {b.auctionTitle}
            </Link>
            <p className="mt-2 text-sm">
              Your bid: RWF {b.amount.toLocaleString("en-US")}
            </p>
          </li>
        ))}
      </ul>
      {!bids.length && !error && (
        <p className="mt-4 text-sm text-inkSoft">
          No bids yet. Browse auctions to participate.
        </p>
      )}
    </section>
  );
}
