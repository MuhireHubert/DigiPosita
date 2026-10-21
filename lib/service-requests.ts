import {
  doc,
  runTransaction,
  serverTimestamp,
  type Timestamp,
} from "firebase/firestore";
import { db } from "./firebase";
import { stages } from "./services";
export interface DigitalRequest {
  id: string;
  ownerId: string;
  kind: string;
  contactName: string;
  email: string;
  phone: string;
  fields: Record<string, string>;
  status: string;
  result: string;
  customerReply: string;
  boxNumber?: string;
  createdAt: Timestamp | null;
  attachment?: { path: string; name: string; size: number; type: string };
}
export async function reviewRequest(
  item: DigitalRequest,
  status: string,
  result: string,
  boxNumber = "",
) {
  const ref = doc(db, "service_requests", item.id);
  await runTransaction(db, async (tx) => {
    const snap = await tx.get(ref);
    if (!snap.exists() || snap.data().status !== item.status)
      throw new Error(
        "Request changed. Review its latest status and try again.",
      );
    if (!stages[item.status]?.includes(status))
      throw new Error("Invalid status change.");
    if (!result.trim())
      throw new Error(
        "Add a customer-facing response before updating this request.",
      );
    if (item.kind === "poboxes" && status === "approved") {
      const number = boxNumber.trim().toUpperCase();
      if (!number || number.length > 40)
        throw new Error("Enter a box number of up to 40 characters.");
      const assignmentRef = doc(
        db,
        "pobox_assignments",
        encodeURIComponent(
          item.fields.office.trim().toLowerCase() + "|" + number,
        ),
      );
      const existing = await tx.get(assignmentRef);
      if (existing.exists())
        throw new Error("That box is already assigned at this office.");
      tx.set(assignmentRef, {
        ownerId: item.ownerId,
        requestId: item.id,
        office: item.fields.office,
        boxNumber: number,
        createdAt: serverTimestamp(),
      });
      tx.update(ref, {
        status,
        result: result.trim(),
        boxNumber: number,
        updatedAt: serverTimestamp(),
      });
    } else
      tx.update(ref, {
        status,
        result: result.trim(),
        updatedAt: serverTimestamp(),
      });
    if (item.kind === "shops" && status === "approved")
      tx.set(doc(db, "public_shops", item.id), {
        shopName: item.fields.shopName,
        category: item.fields.category,
        location: item.fields.location,
        description: item.fields.description,
        phone: item.phone,
        updatedAt: serverTimestamp(),
      });
  });
}
