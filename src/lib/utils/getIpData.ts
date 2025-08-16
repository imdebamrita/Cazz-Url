import { headers } from "next/headers";
import { IpData } from "@/lib/types/ipData";
import getCountryName from "@/lib/utils/getCountryName";
import getRegionName from "@/lib/utils/getRegionName";

async function getIpData(): Promise<IpData> {
  const h = await headers();

  const get = (k: string) => h.get(k) || "";

  const ip = (
    get("x-forwarded-for").split(",")[0] ||
    get("x-real-ip") ||
    get("x-vercel-forwarded-for") ||
    get("x-vercel-proxied-for") ||
    get("cf-connecting-ip")
  ).trim();

  const city = get("x-vercel-ip-city") || null;
  const countryCodeRaw = get("x-vercel-ip-country"); // Code (e.g., IN)
  const countryCode = countryCodeRaw ? countryCodeRaw.toUpperCase() : null;
  const regionCode = get("x-vercel-ip-country-region") || null; // State/region code
  const lat = parseFloat(get("x-vercel-ip-latitude"));
  const lon = parseFloat(get("x-vercel-ip-longitude"));
  const timezone = get("x-vercel-ip-timezone") || null;
  const asn = get("x-vercel-ip-as-number") || null;

  const countryName = getCountryName(countryCode);
  const regionName = getRegionName(countryCode, regionCode);

  const data: IpData = {
    ip: ip || "Unknown",
    country_name: countryName || "Unknown",
    city: city || "Unknown",
    region: regionName || regionCode || "Unknown",
    latitude: Number.isFinite(lat) ? lat : null,
    longitude: Number.isFinite(lon) ? lon : null,
    timezone: timezone || "Unknown",
    org: "Unknown",
    asn: asn || "Unknown",
  };

  return data;
}

export default getIpData;
