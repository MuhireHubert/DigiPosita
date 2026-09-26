# Iposita Digital

A Next.js + TypeScript + Firebase build of every module from the original
brief: pickups, tracking, fees, local deliveries, e-P.O. boxes, tenders/
submissions, exports & China shipping, auctions, AfCFTA trade inquiries, a
local shop directory, and an Iposita Kashi application intake. Every page
other than the calculator reads or writes real data in Firestore — this is
not a mockup.

## Tech stack

- **Next.js 14** (App Router) + **TypeScript**
- **Tailwind CSS** for styling
- **Firebase**: Firestore (data), ready for Auth when accounts are needed
- **firebase-admin** (dev-only) for the seed script

## 1. Create the Firebase project

1. Go to [console.firebase.google.com](https://console.firebase.google.com) → **Add project**.
2. Once created, click the **web** icon (`</>`) to register a web app. Copy the
   config values it shows you.
3. In the left sidebar, open **Firestore Database** → **Create database** →
   start in **production mode** (the rules file below handles access).

## 2. Configure environment variables

```bash
cp .env.local.example .env.local
```

Paste the values from step 1 into `NEXT_PUBLIC_FIREBASE_*`. Leave
`FIREBASE_SERVICE_ACCOUNT_JSON` empty unless you plan to run the seed script
(see step 5).

## 3. Install and run

```bash
npm install
npm run dev
```

Visit `http://localhost:3000`.

## 4. Deploy the Firestore security rules

Install the Firebase CLI once (`npm install -g firebase-tools`), then:

```bash
firebase login
firebase init firestore   # point it at firestore.rules, keep default indexes
firebase deploy --only firestore:rules
```

The rules in `firestore.rules` let anyone submit a pickup or delivery
request (public-facing forms) and read shipment tracking data, but block all
other writes — those go through the Admin SDK (staff tooling) or the Firebase
Console for now. Tighten `allow create` to `request.auth != null` once
customer accounts exist.

## 5. (Optional) Seed a sample shipment for tracking

The `/tracking` page queries real Firestore data, so it starts empty. To add
one sample record to search for:

1. In Firebase Console → Project settings → **Service accounts** → **Generate
   new private key**. Paste the downloaded JSON as a single line into
   `FIREBASE_SERVICE_ACCOUNT_JSON` in `.env.local`.
2. `npm run seed`

## 6. Deploy

Any Node hosting works. Two good fits given the Firebase backend:

- **Vercel** (simplest for Next.js): `vercel` from the project root, add the
  same env vars in the Vercel dashboard.
- **Firebase App Hosting**: `firebase init apphosting` — keeps everything in
  one Firebase project alongside the database.

GitHub Pages (your usual target) doesn't work here — it only serves static
files, and this app needs a Node server to run. Vercel's free tier is the
closest equivalent for a Next.js app.

## What's real vs. what still needs approval before launch

Every module below is functionally complete — forms validate, write to
Firestore, and (where relevant) list live data back. What's *not* included is
the institutional and regulatory sign-off each one needs before it can go
live publicly:

| Module | Built as | Needs before launch |
|---|---|---|
| Pickup scheduling | Writes to `pickups` | — |
| Tracking | Reads from `shipments` | Staff process to write tracking updates (Admin SDK / internal tool) |
| Fee calculator | Client-side only | Confirm pricing formula against Iposita's actual tariff |
| Local deliveries | Live read + write to `deliveries` | — |
| e-P.O. box registration | Writes to `poboxes`, status `pending` | Iposita sign-off to assign real box numbers |
| Tenders / job applications / receipts | Writes to `submissions` | File upload needs Firebase Storage wired in (not yet included); currently captures the record by description only |
| Small exports & China shipping | Writes to `exports` | Freight-forwarding partner / customs process on the backend |
| Online auctions | Live read + write to `auctions` | No bidding yet — add a `bids` subcollection when ready; payment on sale needs a processor |
| AfCFTA trade lane | Writes to `trade_inquiries` | Human trade-facilitation desk to act on inquiries |
| Local shop directory | Live read + write to `shops` | Light moderation before shops go public |
| Iposita Kashi | Writes to `kashi_applications` — **KYC intake only, no money movement** | A licensed payment/e-money provider integration, and confirmation this collection meets Rwanda's data protection requirements (encryption at rest, access-controlled, ID data minimized to what's shown here) before accepting real applications |

## A note on Kashi and ID data

The Kashi form only stores the last 4 digits of an ID/passport — full
verification is assumed to happen in person, deliberately, so this prototype
never holds a complete government ID number. Before this goes live even in
intake-only form, confirm with legal/compliance what KYC data Iposita is
actually permitted to collect and store this way, and whether Firestore's
default encryption-at-rest is sufficient or a stricter setup is required.

## Project structure

```
app/
  page.tsx            → dashboard / home
  pickups/page.tsx     → pickup request form
  tracking/page.tsx    → tracking lookup
  calculator/page.tsx  → fee calculator
  deliveries/page.tsx  → local delivery requests + live list
components/            → Nav, Footer, Card
lib/
  firebase.ts          → Firebase client init
  types.ts             → shared TypeScript types
scripts/seed.ts         → adds one sample shipment via Admin SDK
firestore.rules         → security rules for the collections above
```
