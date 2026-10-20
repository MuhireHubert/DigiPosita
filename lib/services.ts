export interface ServiceField {
  key: string;
  label: string;
  type?: "text" | "email" | "textarea" | "number";
  options?: string[];
}
export interface DigitalService {
  key: string;
  path: string;
  title: string;
  description: string;
  action: string;
  fields: ServiceField[];
  attachment?: boolean;
}
export const services: DigitalService[] = [
  {
    key: "submissions",
    path: "/submissions",
    title: "Document submissions",
    description:
      "Send tenders, applications and receipts securely, with an acknowledgement and review status.",
    action: "Submit document",
    attachment: true,
    fields: [
      {
        key: "category",
        label: "Document type",
        options: ["Tender", "Job application", "Receipt", "Other"],
      },
      { key: "reference", label: "Reference or subject" },
      { key: "description", label: "Description", type: "textarea" },
    ],
  },
  {
    key: "poboxes",
    path: "/poboxes",
    title: "P.O. boxes",
    description:
      "Apply for a personal or business P.O. box and receive your assignment in your account.",
    action: "Apply for a box",
    fields: [
      { key: "organization", label: "Individual or organization name" },
      { key: "office", label: "Preferred post office" },
      {
        key: "plan",
        label: "Box type",
        options: ["Personal", "Business", "Institution"],
      },
    ],
  },
  {
    key: "exports",
    path: "/exports",
    title: "Exports & international shipping",
    description:
      "Request a shipping quote for exports or China shipping and follow the team's response.",
    action: "Request shipping quote",
    fields: [
      {
        key: "channel",
        label: "Shipping service",
        options: [
          "Export from Rwanda",
          "China shipping",
          "Other international shipping",
        ],
      },
      { key: "destination", label: "Destination country" },
      { key: "goods", label: "Goods description", type: "textarea" },
      { key: "weight", label: "Weight in kg", type: "number" },
    ],
  },
  {
    key: "trade",
    path: "/trade",
    title: "Trade & AfCFTA",
    description:
      "Connect with the trade desk for import, export and cross-border facilitation enquiries.",
    action: "Send trade enquiry",
    fields: [
      { key: "company", label: "Company name" },
      {
        key: "direction",
        label: "Trade direction",
        options: ["Export", "Import"],
      },
      { key: "country", label: "Trading country" },
      {
        key: "product",
        label: "Product and assistance needed",
        type: "textarea",
      },
    ],
  },
  {
    key: "shops",
    path: "/shops",
    title: "Local shops",
    description:
      "Discover businesses or register your shop for review and publication in the directory.",
    action: "Register a shop",
    fields: [
      { key: "shopName", label: "Shop name" },
      { key: "category", label: "Business category" },
      { key: "location", label: "Shop location" },
      { key: "description", label: "Shop description", type: "textarea" },
    ],
  },
  {
    key: "kashi",
    path: "/kashi",
    title: "IpositaKashi",
    description:
      "Apply for a personal or business account and follow verification with the service team.",
    action: "Send account application",
    fields: [
      {
        key: "accountType",
        label: "Account type",
        options: ["Personal", "Business"],
      },
      { key: "office", label: "Preferred verification office" },
      {
        key: "purpose",
        label: "Services you are interested in",
        type: "textarea",
      },
    ],
  },
  {
    key: "other",
    path: "/other",
    title: "Other services & support",
    description:
      "Ask for assistance, report an issue or request another postal service.",
    action: "Send request",
    fields: [
      {
        key: "category",
        label: "Request type",
        options: [
          "General enquiry",
          "Postal service",
          "Delivery issue",
          "Feedback",
        ],
      },
      { key: "subject", label: "Subject" },
      { key: "description", label: "How can we help?", type: "textarea" },
    ],
  },
];
export const stages: Record<string, string[]> = {
  submitted: ["reviewing", "rejected"],
  reviewing: ["action_required", "approved", "rejected"],
  action_required: ["reviewing", "rejected"],
  approved: ["completed"],
  completed: [],
  rejected: [],
  cancelled: [],
};
export function getService(key: string) {
  return services.find((s) => s.key === key)!;
}
export function label(value: string) {
  return value.replaceAll("_", " ");
}
