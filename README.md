# DigiPosita

A focused delivery service pilot built with Next.js, TypeScript, Firebase Authentication and Firestore.

## Available in this version

- Email/password registration, sign-in, password reset and sign-out.
- Authenticated pickup and local delivery requests, with contact information and package details.
- A private customer workspace with live status updates, reference numbers, tracking links and cancellation before processing.
- A staff workspace protected by a Firebase custom claim. Staff can confirm and advance requests; updates publish a tracking history in the same Firestore transaction.
- Public tracking by an unguessable reference. Tracking documents exclude customer names, phone numbers and street addresses. Public collection listing is forbidden by Firestore rules.
- Validation and ownership enforced in Firestore rules, independently of the UI.
- Responsive navigation, loading, empty, failure and setup states.

P.O. boxes, document submission, exports, auctions, trade, shops and Kashi display an unavailable-service page. Their Firestore collections are closed. No payments are collected. Pricing is confirmed by staff; the previous unverified tariff calculator has been removed.

## Run locally

Use Node.js 22 or newer.

```sh
npm ci
cp .env.local.example .env.local
npm run dev
```

Without Firebase configuration, public pages render and account services show a setup message. To enable bookings:

1. Create or select your Firebase project and register a web app.
2. Copy its web configuration to the `NEXT_PUBLIC_FIREBASE_*` variables in `.env.local`.
3. Enable **Authentication → Email/Password** and add your application domain to Authorized domains. Configure the reset-password email template and password policy.
4. Create the Firestore database, then deploy **both** rules and indexes:

```sh
npx firebase login
npx firebase deploy --project YOUR_PROJECT_ID --only firestore:rules,firestore:indexes
```

Always specify the intended project explicitly; `.firebaserc` is inherited from the source repository. Wait for indexes to finish building before testing account lists.

## Staff setup

Create a normal account through the application. Find its UID in Firebase Authentication. Use Application Default Credentials with administrative rights to that Firebase project:

```sh
export GOOGLE_APPLICATION_CREDENTIALS=/absolute/path/to/service-account.json
npm run staff -- FIREBASE_UID
# Remove access:
npm run staff -- FIREBASE_UID --revoke
```

The script preserves other custom claims and revokes refresh tokens. Sign out and sign in to obtain updated permissions. Existing ID tokens may remain valid until expiry (typically up to one hour); for urgent removal use the Firebase administrative incident procedure. Never place service-account keys in `NEXT_PUBLIC_*` variables or commit them.

Staff access is enforced by Firestore rules; hiding a navigation link is not the authorization boundary.

## Request lifecycle

- Pickup: requested → scheduled → collected → delivered.
- Local delivery: requested → en route → delivered.
- Customers can change requested → cancelled, without changing other fields.
- Staff advancement reads the current request inside a transaction and rejects stale updates. Tracking and request updates commit together.
- The customer workspace shows the latest 50 bookings per service; operations shows the latest 100. Pagination, assignment and advanced search are future work.

## Tests and local emulators

```sh
npm run typecheck
npm run build
npm run test:rules
```

Rules tests use a `demo-` project and do not connect to production. Java 21+ is required by the Firestore emulator. They cover authentication, customer isolation, invalid payloads, cancellation, staff transitions, tracking privacy and closed future-service collections.

For local end-to-end development, set the following in `.env.local`:

```dotenv
NEXT_PUBLIC_FIREBASE_API_KEY=demo-api-key
NEXT_PUBLIC_FIREBASE_PROJECT_ID=demo-digiposita
NEXT_PUBLIC_FIREBASE_APP_ID=demo-app
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=localhost
NEXT_PUBLIC_USE_FIREBASE_EMULATORS=true
```

Then run `npm run emulators` and `npm run dev` in separate terminals. For the browser suite, run the dev server with `npm run dev -- --port 3123`, install Chromium with `npx playwright install chromium`, and run `npm run test:browser`. `PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH` can select an existing Chromium executable if needed. Set emulator mode to **false** and replace the configuration before building a live deployment. Emulator data is ephemeral unless explicitly exported.

## Deployment and pilot launch

Deploy to a Node hosting service supporting Next.js 15. Set the Firebase public configuration at **build time**, build with `npm run build`, and run `npm start`. Deploy Firestore rules/indexes to the same Firebase project first. Configure an authorized domain, create a staff account and complete a pickup and a delivery with a separate customer account before inviting users.

This repository does not provision or change cloud resources automatically. Existing source-repository records have no `ownerId` and will not appear in customer accounts. Review and migrate legacy records administratively; never guess ownership or expose them publicly. Legacy shipment records remain closed. New tracking uses a separate `public_shipments` collection with a restricted field list, so old private shipment fields are not exposed by the new rules.

Before accepting real customers, confirm the operating partner, service areas, actual pricing, staff coverage, customer support contact and official branding permission. Add the operator's privacy notice and retention policy, email verification/abuse controls (including Firebase App Check where appropriate), monitoring, backups and recovery procedures. These operational details are not supplied by the repository. The interface identifies itself as a pilot and does not claim a verified institutional affiliation.

The pilot does not include payment processing, dispatch assignment, delivery windows, proof of delivery, notifications or a billing ledger.
