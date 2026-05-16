import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { scrapeAmazonProduct, extractAsin } from "@/lib/amazon-scraper";
import { slugify, uniqueSlug } from "@/lib/slugify";

export const runtime = "nodejs";
export const maxDuration = 60;

export async function POST(req: NextRequest) {
  let body: { amazonUrl?: string; categoryId?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid body" }, { status: 400 });
  }

  const { amazonUrl, categoryId } = body;
  if (!amazonUrl || !categoryId) {
    return NextResponse.json(
      { error: "amazonUrl and categoryId are required" },
      { status: 400 }
    );
  }

  const asin = extractAsin(amazonUrl);
  if (!asin) {
    return NextResponse.json(
      { error: "Could not extract ASIN from URL" },
      { status: 400 }
    );
  }

  const existing = await prisma.product.findUnique({ where: { asin } });
  if (existing) {
    return NextResponse.json(
      { error: `Product with ASIN ${asin} already exists`, slug: existing.slug },
      { status: 409 }
    );
  }

  const category = await prisma.category.findUnique({ where: { id: categoryId } });
  if (!category) {
    return NextResponse.json({ error: "Category not found" }, { status: 404 });
  }

  let scraped;
  try {
    scraped = await scrapeAmazonProduct(amazonUrl);
  } catch (err) {
    const msg = err instanceof Error ? err.message : "Unknown scraping error";
    return NextResponse.json({ error: msg }, { status: 502 });
  }

  const slugBase = slugify(scraped.title);
  const allSlugs = await prisma.product.findMany({ select: { slug: true } });
  const slug = uniqueSlug(slugBase, new Set(allSlugs.map((p) => p.slug)));

  const product = await prisma.product.create({
    data: {
      slug,
      asin: scraped.asin,
      title: scraped.title,
      description: scraped.description,
      bullets: scraped.bullets,
      imageUrls: scraped.imageUrls,
      rating: scraped.rating,
      reviewCount: scraped.reviewCount,
      reviews: scraped.reviews as unknown as object,
      price: scraped.price,
      published: true,
      categoryId,
    },
  });

  revalidatePath("/");
  revalidatePath("/catalogue");
  revalidatePath(`/catalogue?category=${category.slug}`);
  revalidatePath(`/products/${slug}`);

  return NextResponse.json({ success: true, product });
}
