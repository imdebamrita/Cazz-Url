"use server";

import { connectDB } from "@/lib/db";
import Link from "@/lib/models/Link";

export async function checkExistingLink(shortCode: string) {
  await connectDB();

  const existingLink = await Link.findOne({ shortCode });

  return !!existingLink;
}
