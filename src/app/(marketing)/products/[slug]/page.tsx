import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { ProductGallery } from "@/components/marketing/ProductGallery";
import { ReviewCard } from "@/components/marketing/ReviewCard";
import { CrossSellSection } from "@/components/marketing/CrossSellSection";
import { StarRating } from "@/components/ui/StarRating";
import { ButtonLink } from "@/components/ui/Button";
import { BowAccent } from "@/components/ui/BowAccent";
import { buildAffiliateUrl, getUserCountry, countryLabel } from "@/lib/geo";
import { getProductBySlug, getRelatedProducts } from "@/lib/data";
import {
  generateProductSchema,
  generateBreadcrumbSchema,
  generateReviewsSchema,
  jsonLdScript,
} from "@/lib/jsonld";
import type { AmazonReview } from "@/types";

export const revalidate = false;

interface PageProps {
  params: Promise<{ slug: string }>;
}

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

function timeAgo(date: Date): string {
  const diff = Date.now() - new Date(date).getTime();
  const hours = Math.floor(diff / 3_600_000);
  if (hours < 1) return "just now";
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  if (days < 7) return `${days}d ago`;
  const weeks = Math.floor(days / 7);
  if (weeks < 4) return `${weeks}w ago`;
  return `${Math.floor(days / 30)}mo ago`;
}

export async function generateStaticParams() {
  try {
    const products = await prisma.product.findMany({
      where: { published: true },
      select: { slug: true },
    });
    return products.map((p) => ({ slug: p.slug }));
  } catch {
    return [];
  }
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) return { title: "Product not found" };

  const description =
    product.description.slice(0, 160) ||
    `${product.title} — curated by aestheticcart.`;

  return {
    title: product.title,
    description,
    openGraph: {
      title: product.title,
      description,
      images: product.imageUrls.slice(0, 1),
      type: "website",
    },
    alternates: { canonical: `/products/${slug}` },
  };
}

export default async function ProductDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product || !product.published) notFound();

  const [country, related] = await Promise.all([
    getUserCountry(),
    getRelatedProducts(product.categoryId, product.id),
  ]);

  const affiliateUrl = buildAffiliateUrl(product.asin, country);
  const productUrl = `${SITE_URL}/products/${product.slug}`;

  const reviews: AmazonReview[] = Array.isArray(product.reviews)
    ? (product.reviews as unknown as AmazonReview[])
    : [];

  const productSchema = generateProductSchema({
    title: product.title,
    description: product.description,
    imageUrls: product.imageUrls,
    rating: product.rating,
    reviewCount: product.reviewCount,
    price: product.price,
    url: productUrl,
    affiliateUrl,
  });

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: SITE_URL },
    { name: "Catalogue", url: `${SITE_URL}/catalogue` },
    {
      name: product.category.name,
      url: `${SITE_URL}/catalogue?category=${product.category.slug}`,
    },
    { name: product.title, url: productUrl },
  ]);

  const reviewSchemas = generateReviewsSchema(reviews);

  return (
    <article className="bg-cream">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdScript(productSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdScript(breadcrumbSchema) }}
      />
      {reviewSchemas.length > 0 && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: jsonLdScript(reviewSchemas) }}
        />
      )}

      <div className="max-w-7xl mx-auto px-6 lg:px-10 pt-10">
        <nav
          className="flex items-center gap-2 text-xs font-sans uppercase tracking-[0.2em] text-warm-gray mb-10"
          aria-label="Breadcrumb"
        >
          <Link href="/" className="hover:text-rose-gold">Home</Link>
          <span>/</span>
          <Link href="/catalogue" className="hover:text-rose-gold">Catalogue</Link>
          <span>/</span>
          <Link
            href={`/catalogue?category=${product.category.slug}`}
            className="hover:text-rose-gold"
          >
            {product.category.name}
          </Link>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          <ProductGallery images={product.imageUrls} title={product.title} />

          <div className="lg:py-4">
            <p className="font-sans text-xs uppercase tracking-[0.4em] text-rose-gold mb-4">
              {product.category.emoji} {product.category.name}
            </p>

            <h1 className="font-serif text-4xl lg:text-5xl text-charcoal leading-tight mb-6">
              {product.title}
            </h1>

            {product.rating && (
              <div className="mb-6">
                <StarRating
                  rating={product.rating}
                  reviewCount={product.reviewCount}
                  size="md"
                />
              </div>
            )}

            {product.price && (
              <div className="mb-8 pb-8 border-b border-rose-gold/15">
                <p className="text-[10px] uppercase tracking-[0.3em] text-warm-gray font-sans mb-2">
                  Current price
                </p>
                <div className="flex items-baseline gap-3">
                  <span className="font-serif text-4xl text-charcoal">
                    {product.price}
                  </span>
                  <span className="text-xs text-warm-gray font-sans italic">
                    on Amazon · synced{" "}
                    {timeAgo(product.updatedAt)}
                  </span>
                </div>
              </div>
            )}

            <p className="font-serif italic text-lg text-warm-gray leading-relaxed mb-8 line-clamp-4">
              {product.description}
            </p>

            {product.bullets.length > 0 && (
              <ul className="space-y-3 mb-10 pb-10 border-b border-rose-gold/10">
                {product.bullets.slice(0, 6).map((bullet, i) => (
                  <li
                    key={i}
                    className="flex gap-3 text-charcoal/90 font-sans text-sm leading-relaxed"
                  >
                    <span className="text-rose-gold mt-1.5 flex-shrink-0">
                      <svg viewBox="0 0 8 8" className="w-1.5 h-1.5 fill-current">
                        <circle cx="4" cy="4" r="4" />
                      </svg>
                    </span>
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>
            )}

            <div className="space-y-4">
              <ButtonLink
                href={affiliateUrl}
                target="_blank"
                rel="sponsored noopener noreferrer"
                size="lg"
                className="w-full"
              >
                Buy Now
              </ButtonLink>
              <p className="text-center text-[10px] uppercase tracking-[0.3em] text-warm-gray/70 font-sans">
                Secure checkout via amazon · {countryLabel(country)}
              </p>
            </div>
          </div>
        </div>

        {reviews.length > 0 && (
          <section className="mt-24">
            <div className="text-center mb-12">
              <BowAccent className="w-12 h-6 mx-auto mb-5 opacity-60" />
              <p className="font-sans text-xs uppercase tracking-[0.4em] text-rose-gold mb-3">
                What everyone&rsquo;s saying
              </p>
              <h2 className="font-serif text-4xl text-charcoal">
                The reviews
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {reviews.slice(0, 4).map((r, i) => (
                <ReviewCard key={i} review={r} />
              ))}
            </div>
          </section>
        )}
      </div>

      <CrossSellSection
        products={related.map((p) => ({
          id: p.id,
          slug: p.slug,
          title: p.title,
          imageUrls: p.imageUrls,
          rating: p.rating,
          reviewCount: p.reviewCount,
        }))}
      />
    </article>
  );
}
