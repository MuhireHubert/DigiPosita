export interface Pickup {
  id?: string;
  contactName: string;
  phone: string;
  address: string;
  weightKg: number;
  size: "small" | "medium" | "large";
  notes?: string;
  status: "requested" | "scheduled" | "collected";
  createdAt: number;
}

export interface Shipment {
  id?: string;
  trackingCode: string;
  originOffice: string;
  destination: string;
  status: "accepted" | "in_transit" | "out_for_delivery" | "delivered";
  history: { status: string; timestamp: number }[];
}

export interface DeliveryRequest {
  id?: string;
  requesterName: string;
  fromLocation: string;
  toLocation: string;
  goodsType: string;
  weightKg: number;
  status: "requested" | "en_route" | "delivered";
  createdAt: number;
}

export interface POBoxRequest {
  id?: string;
  orgName: string;
  orgType: "studio" | "school" | "real_estate" | "notary" | "bank" | "other";
  contactEmail: string;
  contactPhone: string;
  status: "pending" | "assigned";
  boxNumber?: string;
  createdAt: number;
}

export interface Submission {
  id?: string;
  submitterName: string;
  type: "tender" | "job_application" | "receipt";
  description: string;
  status: "received" | "reviewed";
  createdAt: number;
}

export interface ExportRequest {
  id?: string;
  requesterName: string;
  channel: "individual_export" | "china_corporate";
  companyName?: string;
  goodsDescription: string;
  destinationCountry: string;
  weightKg: number;
  status: "requested" | "quoted" | "booked";
  createdAt: number;
}

export interface AuctionListing {
  id?: string;
  title: string;
  description: string;
  startingPriceRwf: number;
  sellerName: string;
  closesAt: string;
  status: "open" | "closed";
  createdAt: number;
}

export interface TradeInquiry {
  id?: string;
  companyName: string;
  contactEmail: string;
  tradeDirection: "export" | "import";
  productCategory: string;
  targetCountry: string;
  notes?: string;
  createdAt: number;
}

export interface KashiApplication {
  id?: string;
  fullName: string;
  phone: string;
  email: string;
  accountType: "personal" | "business";
  idType: "national_id" | "passport";
  idReference: string; // last 4 digits only — see README on KYC data handling
  status: "pending_review";
  createdAt: number;
}

export interface Shop {
  id?: string;
  shopName: string;
  sector: string;
  ownerName: string;
  phone: string;
  location: string;
  description: string;
  createdAt: number;
}
