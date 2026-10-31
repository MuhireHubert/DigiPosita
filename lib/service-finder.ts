export interface ServiceRoute {
  key: string;
  title: string;
  description: string;
  path: string;
  checklist: string[];
  external?: boolean;
}
export const serviceJourneys: {
  key: string;
  title: string;
  icon: string;
  routes: ServiceRoute[];
}[] = [
  {
    key: "send",
    title: "Send something",
    icon: "deliveries",
    routes: [
      {
        key: "local",
        title: "Within Rwanda",
        description:
          "Arrange collection and local delivery with a location pin and written directions.",
        path: "/deliveries",
        checklist: [
          "Collection and destination addresses",
          "Contact phone and nearby landmarks",
          "Parcel contents and weight",
        ],
      },
      {
        key: "international",
        title: "Across borders",
        description:
          "Ask the export desk for international shipping options and a quote.",
        path: "/exports",
        checklist: [
          "Destination country",
          "Goods description and weight",
          "Your preferred shipping channel",
        ],
      },
    ],
  },
  {
    key: "documents",
    title: "Submit a document",
    icon: "submissions",
    routes: [
      {
        key: "submit",
        title: "Applications, tenders & receipts",
        description:
          "Submit a document for acknowledgement and staff review. File uploads require the document service to be enabled.",
        path: "/submissions",
        checklist: [
          "A PDF, JPEG or PNG up to 10 MB",
          "Reference or subject",
          "Your contact details",
        ],
      },
    ],
  },
  {
    key: "address",
    title: "Get a postal address",
    icon: "poboxes",
    routes: [
      {
        key: "digital",
        title: "Digital ePobox address",
        description:
          "Continue to the existing ePobox platform for its digital-address services.",
        path: "https://epobox.app/",
        external: true,
        checklist: [
          "Register or sign in on ePobox",
          "Choose your address and post office",
          "Check ePobox’s current fees and terms",
        ],
      },
      {
        key: "physical",
        title: "Physical P.O. box",
        description:
          "Request a box at your preferred office. Staff confirm availability and assignment.",
        path: "/poboxes",
        checklist: [
          "Personal, business or institution plan",
          "Preferred post office",
          "Contact details",
        ],
      },
    ],
  },
  {
    key: "business",
    title: "Find an opportunity",
    icon: "trade",
    routes: [
      {
        key: "trade",
        title: "Trade & exports",
        description:
          "Connect with the trade desk for cross-border facilitation.",
        path: "/trade",
        checklist: [
          "Business name",
          "Import or export direction",
          "Target country and product details",
        ],
      },
      {
        key: "shop",
        title: "Bring my shop online",
        description:
          "Register your business for review and publication in the local shop directory.",
        path: "/shops/register",
        checklist: [
          "Shop name and category",
          "Business location and phone",
          "A description customers can see",
        ],
      },
      {
        key: "auction",
        title: "Bid on IPOSITA items",
        description:
          "Browse staff-published IPOSITA assets and follow bidding in Rwandan francs.",
        path: "/auctions",
        checklist: [
          "Review the item’s condition",
          "Check collection arrangements",
          "Sign in to place a bid",
        ],
      },
    ],
  },
  {
    key: "money",
    title: "Financial assistance",
    icon: "kashi",
    routes: [
      {
        key: "kashi",
        title: "Iposita Kashi",
        description:
          "Apply or enquire about accounts, bills, airtime and loan products. This portal handles applications and staff review.",
        path: "/kashi",
        checklist: [
          "Personal or business account type",
          "Preferred verification office",
          "The service you need help with",
        ],
      },
    ],
  },
];
