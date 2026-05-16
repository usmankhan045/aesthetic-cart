import { headers } from "next/headers";

type CountryCode = "US" | "GB" | "CA" | "AU" | "DE";

const TAGS: Record<CountryCode, string | undefined> = {
  US: process.env.AMAZON_TAG_US,
  GB: process.env.AMAZON_TAG_UK,
  CA: process.env.AMAZON_TAG_CA,
  AU: process.env.AMAZON_TAG_AU,
  DE: process.env.AMAZON_TAG_DE,
};

const DOMAINS: Record<CountryCode, string> = {
  US: "amazon.com",
  GB: "amazon.co.uk",
  CA: "amazon.ca",
  AU: "amazon.com.au",
  DE: "amazon.de",
};

const SUPPORTED: CountryCode[] = ["US", "GB", "CA", "AU", "DE"];

function resolveCountry(raw: string | null | undefined): CountryCode {
  if (!raw) return "US";
  const upper = raw.toUpperCase();
  if ((SUPPORTED as string[]).includes(upper)) return upper as CountryCode;
  return "US";
}

export async function getUserCountry(): Promise<CountryCode> {
  const h = await headers();
  return resolveCountry(
    h.get("x-user-country") ?? h.get("x-vercel-ip-country")
  );
}

export function buildAffiliateUrl(asin: string, country: CountryCode | string): string {
  const c = resolveCountry(country);
  const tag = TAGS[c] ?? TAGS.US ?? "";
  const domain = DOMAINS[c] ?? DOMAINS.US;
  const query = tag ? `?tag=${encodeURIComponent(tag)}` : "";
  return `https://www.${domain}/dp/${asin}${query}`;
}

export function countryLabel(c: CountryCode | string): string {
  const country = resolveCountry(c);
  const labels: Record<CountryCode, string> = {
    US: "United States",
    GB: "United Kingdom",
    CA: "Canada",
    AU: "Australia",
    DE: "Germany",
  };
  return labels[country];
}
