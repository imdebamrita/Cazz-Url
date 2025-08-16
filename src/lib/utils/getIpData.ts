import { headers } from "next/headers";
import { IpData } from "../types/ipData";

async function getIpData(): Promise<IpData> {
  const h = await headers();
  console.log("Headers:", Object.fromEntries(h.entries())); // Debugging line to check headers
  const xff = h.get("x-forwarded-for") || "";
  const realIp = h.get("x-real-ip") || "";
  const cfIp = h.get("cf-connecting-ip") || "";
  const ip = (xff.split(",")[0] || realIp || cfIp || "").trim();

  // Default object if fetch fails
  let data: IpData = {
    ip: ip || "Unknown",
    country_name: "Unknown",
    city: "Unknown",
    region: "Unknown",
    latitude: null,
    longitude: null,
    timezone: "Unknown",
    org: "Unknown",
    asn: "Unknown",
  };

  try {
    const endpoint = ip
      ? `https://ipapi.co/${encodeURIComponent(ip)}/json/`
      : "https://ipapi.co/json/";
    const res = await fetch(endpoint, { cache: "no-store" });
    if (res.ok) {
      const json = (await res.json()) as IpData;
      // Prefer detected IP if provided by service
      data = { ...data, ...json, ip: json.ip || data.ip };
    }
  } catch {
    // Ignore errors and use defaults
  }

  return data;
}

export default getIpData;
