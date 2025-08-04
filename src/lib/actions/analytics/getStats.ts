"use server";

import { currentUser } from "@clerk/nextjs/server";
import { connectDB } from "@/lib/db";
import Link from "@/lib/models/Link";
import { ClickType } from "@/lib/models/Click";

interface LinkInfo {
  id: string;
  title: string;
  originalUrl: string;
  shortCode: string;
  clicks: ClickType[];
  createdAt: string;
  updatedAt: string;
  userId: string;
  analytics: {
    totalClicks: number;
    uniqueClicks: number;
    clicksToday: number;
    clicksThisWeek: number;
    clicksThisMonth: number;
  };
}

// interface GetLinkInfoResult {
//   success: boolean;
//   data?: LinkInfo;
//   error?: string;
// }

// Alternative function to get link info with analytics data
export async function getLinkInfoWithAnalytics(shortCode: string) {
  try {
    const user = await currentUser();

    if (!user) {
      return {
        success: false,
        error: "Authentication required",
      };
    }

    await connectDB();

    // Find the link and its clicks
    const link = await Link.aggregate([
      {
        $match: {
          shortCode: shortCode.trim(),
          userId: user.id,
        },
      },
      {
        $lookup: {
          from: "clicks",
          localField: "_id",
          foreignField: "linkId",
          as: "clicksData",
        },
      },
      {
        $addFields: {
          clicks: {
            $map: {
              input: "$clicksData",
              as: "click",
              in: {
                timestamp: "$$click.timestamp",
                deviceType: "$$click.deviceType",
                userAgent: "$$click.userAgent",
                country: "$$click.country",
                city: "$$click.city",
                isp: "$$click.isp",
                timezone: "$$click.timezone",
                latitude: "$$click.latitude",
                longitude: "$$click.longitude",
                region: "$$click.region",
                referer: "$$click.referer",
              },
            },
          },
        },
      },
      {
        $project: {
          _id: 1,
          title: 1,
          originalUrl: 1,
          shortCode: 1,
          clicks: 1,
          createdAt: 1,
          updatedAt: 1,
          userId: 1,
        },
      },
    ]);

    if (!link[0]) {
      return {
        success: false,
        error: "Link not found or you do not have permission to access it",
      };
    }

    const linkInfo: LinkInfo = {
      id: link[0]._id.toString(),
      title: link[0].title,
      originalUrl: link[0].originalUrl,
      shortCode: link[0].shortCode,
      createdAt: link[0].createdAt?.toISOString() || null,
      updatedAt: link[0].updatedAt?.toISOString() || null,
      userId: link[0].userId,
      analytics: {
        totalClicks: link[0].clicks || 0,
        uniqueClicks: Math.floor((link[0].clicks || 0) * 0.8), // Still mock
        clicksToday: 0,
        clicksThisWeek: 0,
        clicksThisMonth: link[0].clicks || 0,
      },
      clicks: (link[0].clicks || []).map((click: ClickType) => ({
        timestamp:
          click.timestamp instanceof Date
            ? click.timestamp.toISOString()
            : click.timestamp,
        deviceType: click.deviceType,
        userAgent: click.userAgent,
        country: click.country,
        city: click.city,
        isp: click.isp,
        timezone: click.timezone,
        latitude: click.latitude,
        longitude: click.longitude,
        region: click.region,
        referer: click.referer,
      })),
    };

    return {
      success: true,
      data: linkInfo,
    };
  } catch (error) {
    console.error("Error fetching link info with analytics:", error);
    return {
      success: false,
      error: "Failed to fetch link analytics",
    };
  }
}
