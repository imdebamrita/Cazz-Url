"use server";

import { currentUser } from "@clerk/nextjs/server";
import { connectDB } from "@/lib/db";
import Link from "@/lib/models/Link";
import GetUniqueShortUrl from "@/lib/utils/GetUniqueShortUrl";

export async function createLink(data: {
  originalUrl: string;
  title?: string;
  shortUrl?: string;
}) {
  await connectDB();
  const user = await currentUser();
  if (!user) throw new Error("Unauthorized");

  let shortCode = data.shortUrl;

  if (!shortCode) {
    shortCode = await GetUniqueShortUrl(10);
  }

  const newLink = await Link.create({
    originalUrl: data.originalUrl,
    title: data.title,
    shortCode,
    userId: user.id,
  });

  return {
    message: "Link created successfully",
    link: {
      _id: newLink._id.toString(),
      shortCode: newLink.shortCode,
      originalUrl: newLink.originalUrl,
      title: newLink.title,
    },
  };
}
