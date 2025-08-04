export interface IpData {
  ip: string;
  version?: string | null;
  city?: string | null;
  region?: string | null;
  region_code?: string | null;
  country_code?: string | null;
  country_code_iso3?: string | null;
  country_name?: string | null;
  country_capital?: string | null;
  country_tld?: string | null;
  continent_code?: string | null;
  in_eu?: boolean | null;
  postal?: string | null;
  latitude?: number | null;
  longitude?: number | null;
  timezone?: string | null;
  utc_offset?: string | null;
  country_calling_code?: string | null;
  currency?: string | null;
  currency_name?: string | null;
  languages?: string | null;
  country_area?: number | null;
  country_population?: number | null;
  asn?: string | null;
  org?: string | null;
  hostname?: string | null;
}
