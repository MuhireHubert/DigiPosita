# DigiPosita — integrated digital services

One customer account and one staff service desk for postal, delivery, business and trade services. Built with Next.js 15, TypeScript, Firebase Authentication, Firestore and Firebase Storage.

## Service workflows

| Service                  | Customer experience                                                                                              | Staff processing                                                                                           |
| ------------------------ | ---------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------- |
| Pickups                  | Book collection, cancel before processing, track parcel                                                          | Schedule → collect → deliver, with transactional tracking updates                                          |
| Deliveries               | Request a local delivery and follow its status                                                                   | Dispatch → deliver                                                                                         |
| Tracking                 | Look up a parcel by its unguessable code without signing in                                                      | Publish a history with each delivery update                                                                |
| Documents                | Submit a PDF/JPEG/PNG up to 10 MB; receive a reference and download privately                                    | Download the document and review, request information, approve or reject                                   |
| P.O. boxes               | Apply for a personal, business or institutional box; see the assigned number                                     | Review and reserve a box number at the requested office; duplicate assignments at that office are rejected |
| Shops                    | Browse/search the public directory; register a shop with publication consent                                     | Review and publish approved shop details atomically                                                        |
| Trade & AfCFTA           | Submit an import/export assistance enquiry and reply to the desk                                                 | Review, request clarification and record the response                                                      |
| Exports / China shipping | Submit goods, destination and weight for a shipping quote                                                        | Review and respond with quote details and next steps                                                       |
| Auctions                 | Browse live listings, place whole-RWF bids, and view personal bid history and live leading/outbid/winning status | Publish listings, close expired auctions, and see the winning bidder's private contact email               |
| IpositaKashi             | Apply for a personal or business account and follow verification                                                 | Review and respond; approval here does not activate a financial account                                    |
| Other services           | Postal enquiries, delivery issues, feedback and support                                                          | Shared review and response workflow                                                                        |

`/services` provides a searchable service catalogue. `/account` includes bookings, service requests, responses, box assignments and bid history. `/staff` combines courier operations, a filterable service desk and auction management.

The generic review lifecycle is submitted → reviewing → action required / approved / rejected; approved requests can be completed. Customers can cancel submitted requests or reply when more information is requested. Request details remain immutable after submission. Staff provide the customer-facing outcome in their response; P.O. box numbers have a separate structured assignment.

## Start locally

Use Node.js 22+ and Java 21+ (for Firebase emulators).

```sh
npm ci
cp .env.local.example .env.local
npm run dev
```

Without Firebase configuration, public pages and the catalogue render, while online services display a setup message.

### Fully local demo

Put these values in `.env.local`:

```dotenv
NEXT_PUBLIC_FIREBASE_API_KEY=demo-api-key
NEXT_PUBLIC_FIREBASE_PROJECT_ID=demo-digiposita
NEXT_PUBLIC_FIREBASE_APP_ID=demo-app
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=localhost
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=demo-digiposita.appspot.com
NEXT_PUBLIC_USE_FIREBASE_EMULATORS=true
```

Run these in separate terminals:

```sh
npm run emulators
npm run seed:demo
npm run dev -- --port 3123
```

Visit `/login` and select **Customer demo** or **Staff demo**. The sample auction is not a real sale. The seed script is hardcoded to local emulators and a `demo-` project, never a live project. Emulator data is ephemeral unless you export it. Fixed demo credentials are only offered in the UI when emulator mode is explicitly enabled. Never enable that mode for a live deployment.

Emulator ports: Authentication 9198, Firestore 8188, Storage 9298.

## Live Firebase setup

1. Register a web app in the intended Firebase project and copy its configuration into `NEXT_PUBLIC_FIREBASE_*` variables. Include the Storage bucket.
2. Enable Authentication → Email/Password; configure authorized domains, password policy and password reset email settings.
3. Create the Firestore database and initialize Firebase Storage. Confirm the project's current billing requirements in Firebase Console before provisioning resources.
4. Deploy database rules/indexes and Storage rules to the same project:

```sh
npx firebase login
npx firebase deploy --project YOUR_PROJECT_ID --only firestore:rules,firestore:indexes,storage
```

Wait for indexes to finish building. This command deploys rules and indexes; it does not provision an operating team or business integrations. `.firebaserc` came from the original repository, so always pass the intended project explicitly.

Document downloads use authenticated `getBlob`, never public download URLs. Configure the Storage bucket's CORS policy for your exact application origins using the template in `storage.cors.example.json` (replace the example domain):

```sh
gcloud storage buckets update gs://YOUR_BUCKET --cors-file=storage.cors.example.json
```

Storage rules consult Firestore to make submitted attachments immutable. During rules deployment, enable the cross-service permissions requested by Firebase for that rules access. Files are restricted by declared content type and size; this version does not perform malware scanning or inspect their contents.

## Staff accounts

Create a regular account and obtain its Firebase Authentication UID. Use Application Default Credentials with administration rights:

```sh
export GOOGLE_APPLICATION_CREDENTIALS=/absolute/path/to/service-account.json
npm run staff -- FIREBASE_UID
# Revoke:
npm run staff -- FIREBASE_UID --revoke
```

The script preserves other custom claims and revokes refresh tokens. Sign out and sign in after changes. Existing ID tokens can remain valid until expiry; use the Firebase administration process for urgent removal. Never put administrative credentials in public environment variables or commit them.

## Data and authorization

- `pickups`, `deliveries`: owner/staff only; rules enforce valid initial data and ordered status changes.
- `service_requests`: private, typed intake for documents, boxes, shops, trade, exports, Kashi and support. New schemas reject unknown fields and forged outcomes.
- `serviceDocuments/{uid}/{requestId}/document`: owner/staff reads, limited upload types/size, no overwrite or deletion after the request is submitted.
- `pobox_assignments`: private reservation records, created with the approval transaction; existing assignments cannot be overwritten.
- `public_shipments`: restricted tracking data without names, contact details or street addresses. Exact public lookup is allowed; enumeration is not.
- `public_shops`: approved, explicitly consented directory fields only. Private registration details remain in the service request.
- `auction_listings`: public item details, deadlines and prices; staff publication and deadline-bound closing.
- `auction_listings/{id}/bids`: immutable private bids, visible to the bidder and staff. Auction summaries and customer bid history must update atomically. Rules enforce increasing whole-RWF bids and server-time deadlines.
- `customer_bids/{uid}/entries`: the customer's private bid history, linked to the actual bid.

Legacy intake and shipment collections remain closed. Existing bookings without `ownerId` do not appear in customer accounts. Migrate legacy records administratively after verifying ownership; never guess it or make them public.

## Verification

```sh
npm run typecheck
npm run build
npm run format:check
npm run test:rules
```

Seventeen tests cover customer isolation, payload validation, review/reply transitions, box assignment, shop publication, bid atomicity and contention, deadlines, and document privacy/immutability. Tests use emulators and a `demo-` project; they do not connect to production.

The browser test sources use a demo-configured app at port 3123 and local emulators:

```sh
npx playwright install chromium
npm run test:browser
```

You can select an existing Chromium executable with `PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH`. Desktop flows can also be verified through the browser. The local machine's process sandbox may prevent automated Chromium startup.

## Deployment and remaining integrations

Deploy to a Node hosting service that supports Next.js 15. Set public Firebase configuration at build time, set emulator mode to **false**, build with `npm run build`, and run `npm start`. Deploy rules/indexes to the matching Firebase project and complete a separate customer/staff smoke test before inviting users.

Confirm the operator's service areas, tariffs, office/box inventory, document acceptance policy, auction terms, customer support details, privacy/retention policy and staffing before a public launch. Uploaded documents need an operational retention and malware-scanning process. This platform records service requests and staff actions; actual customs processing, postal delivery, physical P.O. boxes and financial account verification remain with the operating service teams.

IpositaKashi currently supports applications and review only. Deposits, withdrawals, balances, money transfers and payments require the chosen financial provider and its integration; none are simulated here. Auction payments and collection are arranged by staff after closing; automated checkout/settlement is not included. Email/SMS notifications, dispatch assignment, proof of delivery, pagination beyond the latest 50/100 records, and provider integrations are future work. The full development-tool dependency audit can still contain findings even when the production dependency audit is clean.

### Staff operations and booking locations

The protected `/staff` portal separates pickup, delivery, service-application and IPOSITA-owned auction desks. Staff can search and filter booking queues and open customer-provided coordinate pins in Google Maps. Auction publication remains restricted to staff; the seller is IPOSITA Rwanda.

A customer can optionally capture a one-time GPS pin on each pickup, collection or delivery-destination form, with the browser's explicit permission. Coordinates, reported accuracy, capture time and typed landmark directions are stored only with the private booking. They are never copied into public tracking. Manual addresses remain required and work when location permission is denied. Deployment response headers permit geolocation only for the same origin.

Staff access can also be provisioned in `staff_access/{Firebase UID}` with `{role: "admin"}` through the trusted Firebase console/Admin SDK. Clients can read their own access record but cannot create, modify, list or delete role records. No email/password pair grants an automatic role. Existing `staff: true` custom claims remain supported. Sign out and back in after provisioning access.

`/poboxes` links to the separate ePobox platform for digital-address services and offers a distinct physical P.O. box application. No shared login or API synchronization is claimed. `/kashi` explains financial service categories and accepts applications/enquiries only; no funds are moved or loans approved by this portal.
