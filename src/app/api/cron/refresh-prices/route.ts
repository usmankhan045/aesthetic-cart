import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { scrapeAmazonProduct } from "@/lib/amazon-scraper";

export const runtime = "nodejs";
export const maxDuration = 300;
export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  const auth = req.headers.get("authorization");
  const expected = `Bearer ${process.env.CRON_SECRET}`;
  if (!process.env.CRON_SECRET || auth !== expected) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const products = await prisma.product.findMany({
    where: { published: true },
    select: { id: true, slug: true, asin: true },
  });

  let updated = 0;
  let failed = 0;
  const errors: { asin: string; error: string }[] = [];

  for (const p of products) {
    try {
      const scraped = await scrapeAmazonProduct(p.asin);
      await prisma.product.update({
        where: { id: p.id },
        data: {
          price: scraped.price,
          rating: scraped.rating,
          reviewCount: scraped.reviewCount,
        },
      });
      revalidatePath(`/products/${p.slug}`);
      updated++;
    } catch (err) {
      failed++;
      errors.push({
        asin: p.asin,
        error: err instanceof Error ? err.message : "unknown",
      });
    }
    await new Promise((r) => setTimeout(r, 1200));
  }

  revalidatePath("/catalogue");

  return NextResponse.json({
    total: products.length,
    updated,
    failed,
    errors: errors.slice(0, 5),
  });
}
