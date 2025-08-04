"use server";

import { currentUser } from "@clerk/nextjs/server";
import { connectDB } from "@/lib/db";
import Link from "@/lib/models/Link";

export async function getUserLinks() {
  await connectDB();

  const user = await currentUser();
  if (!user) throw new Error("Unauthorized");

  const links = await Link.aggregate([
    {
      $match: {
        userId: user.id, // Clerk user ID (stored as string)
      },
    },
    {
      $lookup: {
        from: "clicks", // MongoDB will use collection name (lowercase plural)
        localField: "_id",
        foreignField: "linkId",
        as: "clicksData",
      },
    },
    {
      $addFields: {
        clicks: { $size: "$clicksData" },
      },
    },
    {
      $sort: { createdAt: -1 },
    },
    {
      $project: {
        _id: 1,
        originalUrl: 1,
        title: 1,
        shortCode: 1,
        clicks: 1,
        createdAt: 1,
      },
    },
  ]);

  const linksJson = links.map((link) => ({
    ...link,
    _id: link._id.toString(),
    createdAt: link.createdAt?.toISOString?.() || null,
  }));

  return linksJson;
}
