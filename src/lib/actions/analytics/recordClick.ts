"use server";

import Click from "@/lib/models/Click";
import { headers } from "next/headers";

export async function recordClick(link: any, ipData: any) {
  // Get headers for analytics
  const headersList = await headers();
  const userAgent = headersList.get("user-agent") || "";
  const referer = headersList.get("referer") || "";

  // Detect device type from user-agent
  let deviceType = "desktop";
  if (/mobile/i.test(userAgent)) {
    deviceType = "mobile";
  } else if (/tablet|ipad/i.test(userAgent)) {
    deviceType = "tablet";
  }

  try {
    await Click.create({
      linkId: link._id,
      country: ipData.country_name || "Unknown",
      city: ipData.city || "Unknown",
      region: ipData.region || "Unknown",
      latitude: ipData.latitude || null,
      longitude: ipData.longitude || null,
      timezone: ipData.timezone || "Unknown",
      isp: ipData.isp || "Unknown",
      org: ipData.org || "Unknown",
      as: ipData.as || "Unknown",
      asname: ipData.asname || "Unknown",
      deviceType,
      ipAddress: ipData.ip || "Unknown",
      referer,
      userAgent,
      timestamp: new Date(),
    });
  } catch (error) {
    console.error("Failed to save click data:", error);
  }
}
