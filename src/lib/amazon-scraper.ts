import * as cheerio from "cheerio";
import type { ScrapedProduct, AmazonReview } from "@/types";

const USER_AGENTS = [
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36",
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36",
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:128.0) Gecko/20100101 Firefox/128.0",
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 14_2) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.2 Safari/605.1.15",
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36 Edg/131.0.0.0",
];

const ASIN_REGEX = /\/(?:dp|gp\/product|gp\/aw\/d)\/([A-Z0-9]{10})/i;

export function extractAsin(url: string): string | null {
  const match = url.match(ASIN_REGEX);
  if (match) return match[1].toUpperCase();
  const bare = url.match(/^[A-Z0-9]{10}$/i);
  if (bare) return bare[0].toUpperCase();
  return null;
}

function pickUserAgent(): string {
  return USER_AGENTS[Math.floor(Math.random() * USER_AGENTS.length)];
}

async function fetchDirect(asin: string): Promise<string> {
  const url = `https://www.amazon.com/dp/${asin}`;
  const res = await fetch(url, {
    headers: {
      "User-Agent": pickUserAgent(),
      Accept:
        "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
      "Accept-Language": "en-US,en;q=0.9",
      "Accept-Encoding": "gzip, deflate, br",
      Referer: "https://www.google.com/",
      "Sec-Fetch-Dest": "document",
      "Sec-Fetch-Mode": "navigate",
      "Sec-Fetch-Site": "cross-site",
      "Upgrade-Insecure-Requests": "1",
    },
    cache: "no-store",
    redirect: "follow",
  });
  if (!res.ok) {
    throw new Error(
      `Amazon returned HTTP ${res.status} — likely bot detection. Set SCRAPING_API_KEY in .env.local for proxy fallback.`
    );
  }
  return await res.text();
}

async function fetchViaScrapingApi(asin: string): Promise<string> {
  const key = process.env.SCRAPING_API_KEY;
  if (!key) throw new Error("No SCRAPING_API_KEY configured");
  const target = encodeURIComponent(`https://www.amazon.com/dp/${asin}`);
  const url = `https://api.scraperapi.com?api_key=${key}&url=${target}&country_code=us`;
  const res = await fetch(url, { cache: "no-store" });
  if (!res.ok) throw new Error(`ScraperAPI fetch failed: ${res.status}`);
  return await res.text();
}

function isBlockedHtml(html: string): boolean {
  return (
    html.includes("To discuss automated access to Amazon data") ||
    html.includes("Enter the characters you see below") ||
    html.includes("api-services-support@amazon.com") ||
    html.length < 5000
  );
}

function parseRating(text: string | undefined): number | null {
  if (!text) return null;
  const match = text.match(/(\d+(?:\.\d+)?)/);
  if (!match) return null;
  const n = parseFloat(match[1]);
  return n >= 0 && n <= 5 ? n : null;
}

function parseReviewCount(text: string | undefined): number | null {
  if (!text) return null;
  const match = text.match(/([\d,]+)/);
  if (!match) return null;
  return parseInt(match[1].replace(/,/g, ""), 10) || null;
}

function extractImagesFromScripts($: cheerio.CheerioAPI): string[] {
  const images = new Set<string>();
  $("script").each((_, el) => {
    const content = $(el).html();
    if (!content) return;
    if (content.includes("colorImages") || content.includes("'hiRes'")) {
      const hiResMatches = content.match(/"hiRes":"([^"]+)"/g);
      if (hiResMatches) {
        hiResMatches.forEach((m) => {
          const url = m.replace(/"hiRes":"/, "").replace(/"$/, "");
          if (url && url !== "null" && url.startsWith("http")) {
            images.add(url);
          }
        });
      }
      const largeMatches = content.match(/"large":"([^"]+)"/g);
      if (largeMatches && images.size === 0) {
        largeMatches.forEach((m) => {
          const url = m.replace(/"large":"/, "").replace(/"$/, "");
          if (url && url !== "null" && url.startsWith("http")) {
            images.add(url);
          }
        });
      }
    }
  });
  return Array.from(images).slice(0, 8);
}

function extractImagesFromDom($: cheerio.CheerioAPI): string[] {
  const images = new Set<string>();
  $("#altImages img, #imgTagWrapperId img, #landingImage").each((_, el) => {
    const src =
      $(el).attr("data-old-hires") ||
      $(el).attr("data-a-hires") ||
      $(el).attr("src");
    if (src && src.startsWith("http") && !src.includes("transparent-pixel")) {
      const cleaned = src
        .replace(/\._[A-Z0-9_,]+_\./i, ".")
        .replace(/\._SX\d+_/i, "")
        .replace(/\._SY\d+_/i, "");
      images.add(cleaned);
    }
  });
  return Array.from(images).slice(0, 8);
}

function parseReviews($: cheerio.CheerioAPI): AmazonReview[] {
  const reviews: AmazonReview[] = [];
  $('[data-hook="review"]').each((_, el) => {
    if (reviews.length >= 6) return;
    const $el = $(el);
    const author = $el.find(".a-profile-name").first().text().trim();
    const ratingText = $el
      .find('[data-hook="review-star-rating"] .a-icon-alt, i.review-rating .a-icon-alt')
      .first()
      .text()
      .trim();
    const rating = parseRating(ratingText) ?? 5;
    const title = $el
      .find('[data-hook="review-title"] span:not(.a-letter-space)')
      .last()
      .text()
      .trim();
    const body = $el
      .find('[data-hook="review-body"] span')
      .first()
      .text()
      .trim();
    const date = $el.find('[data-hook="review-date"]').text().trim();
    if (body && body.length > 10) {
      reviews.push({
        author: author || "Verified Buyer",
        rating,
        title: title || "Customer Review",
        body: body.slice(0, 600),
        date,
      });
    }
  });
  return reviews;
}

function parsePrice($: cheerio.CheerioAPI): string | null {
  const currencyRegex = /[\$£€¥₹₩₪₱฿₺R]/;
  const selectors = [
    "#corePriceDisplay_desktop_feature_div .a-price .a-offscreen",
    "#corePrice_feature_div .a-price .a-offscreen",
    "#corePrice_desktop .a-price .a-offscreen",
    ".apexPriceToPay .a-offscreen",
    ".priceToPay .a-offscreen",
    'span[data-a-color="price"] .a-offscreen',
    ".a-price .a-offscreen",
    "#priceblock_ourprice",
    "#priceblock_dealprice",
    "#priceblock_saleprice",
    "#newBuyBoxPrice",
    "#price_inside_buybox",
  ];
  for (const sel of selectors) {
    const text = $(sel).first().text().trim();
    if (text && currencyRegex.test(text)) return text;
  }

  const symbol = $(".a-price-symbol").first().text().trim() || "$";
  const whole = $(".a-price-whole").first().text().trim().replace(/[.,]\s*$/, "");
  const fraction = $(".a-price-fraction").first().text().trim();
  if (whole) {
    return fraction ? `${symbol}${whole}.${fraction}` : `${symbol}${whole}`;
  }

  return null;
}

function parseHtml(html: string, asin: string): ScrapedProduct {
  const $ = cheerio.load(html);

  const title = $("#productTitle").text().trim();
  if (!title) {
    throw new Error("Could not parse product title — Amazon may have blocked the request");
  }

  const bullets: string[] = [];
  $("#feature-bullets ul li").each((_, el) => {
    const text = $(el).text().trim().replace(/\s+/g, " ");
    if (text && !text.toLowerCase().includes("make sure this fits")) {
      bullets.push(text);
    }
  });

  const description =
    $("#productDescription p").text().trim() ||
    $("#feature-bullets").text().trim().slice(0, 500) ||
    bullets.slice(0, 3).join(" ");

  let imageUrls = extractImagesFromScripts($);
  if (imageUrls.length === 0) {
    imageUrls = extractImagesFromDom($);
  }

  const ratingText =
    $('[data-hook="rating-out-of-text"]').text() ||
    $("#acrPopover").attr("title") ||
    $("span.a-icon-alt").first().text();
  const rating = parseRating(ratingText);

  const reviewCountText = $("#acrCustomerReviewText").text();
  const reviewCount = parseReviewCount(reviewCountText);

  const reviews = parseReviews($);
  const price = parsePrice($);

  return {
    asin,
    title,
    description: description.slice(0, 2000),
    bullets: bullets.slice(0, 8),
    imageUrls,
    rating,
    reviewCount,
    reviews,
    price,
  };
}

export async function scrapeAmazonProduct(input: string): Promise<ScrapedProduct> {
  const asin = extractAsin(input);
  if (!asin) {
    throw new Error("Invalid Amazon URL — could not extract ASIN");
  }

  let html: string | null = null;
  let lastError: unknown = null;

  try {
    html = await fetchDirect(asin);
    if (isBlockedHtml(html)) {
      html = null;
      throw new Error("Direct fetch returned blocked/CAPTCHA page");
    }
  } catch (err) {
    lastError = err;
    html = null;
  }

  if (!html && process.env.SCRAPING_API_KEY) {
    try {
      html = await fetchViaScrapingApi(asin);
      if (isBlockedHtml(html)) {
        html = null;
        throw new Error("Scraping API also returned blocked page");
      }
    } catch (err) {
      lastError = err;
    }
  }

  if (!html) {
    const reason = lastError instanceof Error ? lastError.message : "unknown error";
    throw new Error(`Failed to fetch Amazon page: ${reason}`);
  }

  return parseHtml(html, asin);
}
