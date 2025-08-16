"use server";

import { connectDB } from "@/lib/db";
import Link from "@/lib/models/Link";
import { LinkType } from "@/lib/models/Link";

export async function getInfo(shortCode: string) {
  await connectDB();
  const linkDoc: LinkType | null = await Link.findOne({ shortCode });

  if (!linkDoc) return null;

  // ✅ Convert to a plain serializable object
  const plainLink: LinkType = {
    _id: linkDoc._id,
    userId: linkDoc.userId?.toString(),
    originalUrl: linkDoc.originalUrl,
    shortCode: linkDoc.shortCode,
    title: linkDoc.title,
    isActive: linkDoc.isActive,
    createdAt: linkDoc.createdAt,
    updatedAt: linkDoc.updatedAt,
  };

  return plainLink;
}
