import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { scrapeAmazonProduct } from "@/lib/amazon-scraper";

export const runtime = "nodejs";
export const maxDuration = 60;

interface RouteContext {
  params: Promise<{ id: string }>;
}

export async function POST(_req: NextRequest, ctx: RouteContext) {
  const { id } = await ctx.params;
  const product = await prisma.product.findUnique({ where: { id } });
  if (!product) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  let scraped;
  try {
    scraped = await scrapeAmazonProduct(product.asin);
  } catch (err) {
    const msg = err instanceof Error ? err.message : "Scrape failed";
    return NextResponse.json({ error: msg }, { status: 502 });
  }

  const updated = await prisma.product.update({
    where: { id },
    data: {
      price: scraped.price,
      rating: scraped.rating,
      reviewCount: scraped.reviewCount,
      imageUrls: scraped.imageUrls.length > 0 ? scraped.imageUrls : product.imageUrls,
    },
  });

  revalidatePath(`/products/${product.slug}`);
  revalidatePath("/catalogue");

  return NextResponse.json({ success: true, product: updated });
}
