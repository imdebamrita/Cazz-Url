"use server";

import { connectDB } from "@/lib/db";
import Link from "@/lib/models/Link";
import Click from "@/lib/models/Click";
import { clerkClient } from "@clerk/nextjs/server";

export interface GlobalStats {
  totalUniqueUsers: number;
  totalLinks: number;
  totalClicks: number;
  totalCountries: number;
  // uptime: string;
}

export async function getGlobalStats(): Promise<GlobalStats> {
  try {
    await connectDB();

    // Get total number of active links
    const totalLinks = await Link.countDocuments({ isActive: true });

    // get total number of unique users from clerk
    const clerk = await clerkClient();
    const uniqueUsers = await clerk.users.getUserList();
    const totalUniqueUsers = uniqueUsers.totalCount;

    // Get total number of clicks
    const totalClicks = await Click.countDocuments();

    // Get unique countries from clicks
    const uniqueCountries = await Click.distinct("country");
    const totalCountries = uniqueCountries.length;

    // For uptime, we'll use a static value or you can integrate with a monitoring service
    // const uptime = "99.9%";

    // console.log("Global Stats:", {
    //   totalLinks,
    //   totalClicks,
    //   totalCountries,
    //   uniqueCountries,
    //   uptime,
    // });

    return {
      totalUniqueUsers,
      totalLinks,
      totalClicks,
      totalCountries,
    };
  } catch (error) {
    console.error("Failed to fetch global stats:", error);
    // Return fallback stats in case of error
    return {
      totalUniqueUsers: 0,
      totalLinks: 0,
      totalClicks: 0,
      totalCountries: 0,
    };
  }
}
