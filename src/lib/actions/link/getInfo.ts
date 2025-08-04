"use server";

import { connectDB } from "@/lib/db";
import Link from "@/lib/models/Link";

export async function getInfo(shortCode: string) {
  await connectDB();
  const linkDoc = await Link.findOne({ shortCode });

  if (!linkDoc) return null;

  // ✅ Convert to a plain serializable object
  const plainLink = {
    _id: linkDoc._id.toString(),
    userId: linkDoc.userId?.toString(),
    originalUrl: linkDoc.originalUrl,
    shortCode: linkDoc.shortCode,
    title: linkDoc.title,
    isActive: linkDoc.isActive,
    createdAt: linkDoc.createdAt?.toISOString(),
  };

  return plainLink;
}
