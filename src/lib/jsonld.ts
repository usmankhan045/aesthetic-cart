import type { AmazonReview } from "@/types";

interface ProductSchemaInput {
  title: string;
  description: string;
  imageUrls: string[];
  rating: number | null;
  reviewCount: number | null;
  price: string | null;
  url: string;
  affiliateUrl: string;
  brand?: string;
}

export function generateProductSchema(p: ProductSchemaInput) {
  const schema: Record<string, unknown> = {
    "@context": "https://schema.org/",
    "@type": "Product",
    name: p.title,
    description: p.description,
    image: p.imageUrls,
    url: p.url,
  };
  if (p.brand) {
    schema.brand = { "@type": "Brand", name: p.brand };
  }
  schema.offers = {
    "@type": "Offer",
    url: p.affiliateUrl,
    priceCurrency: "USD",
    price: p.price ?? "0",
    availability: "https://schema.org/InStock",
  };
  if (p.rating && p.reviewCount) {
    schema.aggregateRating = {
      "@type": "AggregateRating",
      ratingValue: p.rating.toFixed(1),
      reviewCount: p.reviewCount,
      bestRating: "5",
      worstRating: "1",
    };
  }
  return schema;
}

export function generateReviewsSchema(reviews: AmazonReview[]) {
  return reviews.map((r) => ({
    "@type": "Review",
    author: { "@type": "Person", name: r.author || "Verified Buyer" },
    reviewRating: {
      "@type": "Rating",
      ratingValue: r.rating,
      bestRating: "5",
    },
    name: r.title,
    reviewBody: r.body,
  }));
}

interface BreadcrumbItem {
  name: string;
  url: string;
}

export function generateBreadcrumbSchema(items: BreadcrumbItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, idx) => ({
      "@type": "ListItem",
      position: idx + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

export function generateWebSiteSchema(siteUrl: string, name: string) {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name,
    url: siteUrl,
    potentialAction: {
      "@type": "SearchAction",
      target: `${siteUrl}/catalogue?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };
}

export function jsonLdScript(data: unknown): string {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}
