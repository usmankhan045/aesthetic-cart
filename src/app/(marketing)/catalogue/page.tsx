import type { Metadata } from "next";
import { ProductCard } from "@/components/marketing/ProductCard";
import { ProductFilters } from "@/components/marketing/ProductFilters";
import { BowAccent } from "@/components/ui/BowAccent";
import {
  getCategories,
  getCategoryBySlug,
  getPublishedProducts,
} from "@/lib/data";

export const revalidate = 3600;

interface PageProps {
  searchParams: Promise<{ category?: string }>;
}

export async function generateMetadata({
  searchParams,
}: PageProps): Promise<Metadata> {
  const { category: slug } = await searchParams;
  if (!slug) {
    return {
      title: "The Catalogue",
      description:
        "Browse every piece in our curated edit, sorted by mood and filtered by vibe.",
    };
  }
  const cat = await getCategoryBySlug(slug);
  if (!cat) return { title: "Catalogue" };
  return {
    title: cat.name,
    description: `Curated ${cat.name.toLowerCase()}. The prettiest, most useful pieces in our edit.`,
  };
}

export default async function CataloguePage({ searchParams }: PageProps) {
  const { category: slug } = await searchParams;

  const [categories, activeCategoryRaw] = await Promise.all([
    getCategories(),
    slug ? getCategoryBySlug(slug) : Promise.resolve(null),
  ]);

  const activeCategory = activeCategoryRaw
    ? {
        id: activeCategoryRaw.id,
        name: activeCategoryRaw.name,
        slug: activeCategoryRaw.slug,
      }
    : null;

  const products = await getPublishedProducts(activeCategory?.id);
  const dbError = categories.length === 0 && products.length === 0 && !slug;
  const bannerEmoji = activeCategoryRaw?.emoji ?? "🎀";

  return (
    <div className="bg-cream min-h-screen">
      <header className="relative overflow-hidden bg-gradient-to-br from-cream via-blush/60 to-rose/30 pt-14 pb-10 sm:pt-24 sm:pb-16">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-24 -left-24 w-64 sm:w-80 h-64 sm:h-80 rounded-full bg-rose/40 blur-3xl opacity-70" />
          <div className="absolute -bottom-20 -right-20 w-64 sm:w-80 h-64 sm:h-80 rounded-full bg-petal/50 blur-3xl opacity-60" />
          <div className="absolute top-1/3 left-1/4 w-48 sm:w-64 h-48 sm:h-64 rounded-full bg-sand/50 blur-3xl opacity-50" />
        </div>

        <svg
          className="absolute inset-0 w-full h-full pointer-events-none text-rose-gold-dark"
          viewBox="0 0 1200 400"
          preserveAspectRatio="xMidYMid slice"
          aria-hidden
        >
          <defs>
            <pattern
              id="banner-floret"
              x="0"
              y="0"
              width="70"
              height="70"
              patternUnits="userSpaceOnUse"
              patternTransform="rotate(10)"
            >
              <g opacity="0.12" fill="currentColor">
                <circle cx="35" cy="35" r="1.3" />
                <path d="M35 28 Q36.5 31.5 35 35 Q33.5 31.5 35 28 Z" />
                <path d="M35 42 Q36.5 38.5 35 35 Q33.5 38.5 35 42 Z" />
                <path d="M28 35 Q31.5 33.5 35 35 Q31.5 36.5 28 35 Z" />
                <path d="M42 35 Q38.5 33.5 35 35 Q38.5 36.5 42 35 Z" />
              </g>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#banner-floret)" />
          <path
            d="M -50 80 Q 300 30 600 70 T 1250 60"
            stroke="currentColor"
            strokeWidth="1.5"
            fill="none"
            opacity="0.14"
            strokeLinecap="round"
          />
          <path
            d="M -50 340 Q 300 380 600 340 T 1250 360"
            stroke="currentColor"
            strokeWidth="1.5"
            fill="none"
            opacity="0.12"
            strokeLinecap="round"
          />
          <g opacity="0.2" fill="currentColor">
            <path d="M120 60 L122 66 L128 68 L122 70 L120 76 L118 70 L112 68 L118 66 Z" />
            <path d="M1050 320 L1052 326 L1058 328 L1052 330 L1050 336 L1048 330 L1042 328 L1048 326 Z" />
            <path d="M200 320 L201.5 324.5 L206 326 L201.5 327.5 L200 332 L198.5 327.5 L194 326 L198.5 324.5 Z" />
            <path d="M980 80 L981.5 84.5 L986 86 L981.5 87.5 L980 92 L978.5 87.5 L974 86 L978.5 84.5 Z" />
          </g>
        </svg>

        {activeCategory && (
          <span
            className="absolute top-1/2 right-4 sm:right-12 -translate-y-1/2 text-[8rem] sm:text-[14rem] lg:text-[18rem] opacity-[0.10] select-none pointer-events-none leading-none"
            aria-hidden
          >
            {bannerEmoji}
          </span>
        )}

        <BowAccent className="hidden sm:block absolute top-8 left-10 w-14 h-7 opacity-40 -rotate-12" />
        <BowAccent className="hidden sm:block absolute bottom-8 right-12 w-12 h-6 opacity-35 rotate-12" />

        <div className="relative max-w-7xl mx-auto px-5 sm:px-6 lg:px-10 text-center">
          <BowAccent className="w-12 sm:w-14 h-6 sm:h-7 mx-auto mb-4 sm:mb-6 opacity-70" />
          <p className="font-sans text-[10px] sm:text-xs uppercase tracking-[0.4em] text-rose-gold mb-3 sm:mb-4">
            {activeCategory ? "Category" : "The full edit"}
          </p>
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-7xl text-charcoal mb-3 sm:mb-4 leading-tight">
            {activeCategory && activeCategoryRaw?.emoji && (
              <span className="mr-2 sm:mr-3" aria-hidden>
                {activeCategoryRaw.emoji}
              </span>
            )}
            {activeCategory ? activeCategory.name : "Catalogue"}
          </h1>
          <p className="font-serif italic text-warm-gray text-base sm:text-lg max-w-xl mx-auto px-2">
            {activeCategory
              ? `Every piece in our ${activeCategory.name.toLowerCase()} edit.`
              : "Every piece, every mood. Curated weekly."}
          </p>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-10 py-6 sm:py-8">
        <ProductFilters
          categories={categories}
          activeSlug={activeCategory?.slug ?? null}
        />
      </div>

      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-10 pb-16 sm:pb-24">
        {dbError ? (
          <div className="text-center py-24 max-w-xl mx-auto">
            <p className="font-serif italic text-warm-gray text-xl mb-4">
              The edit is currently being prepared.
            </p>
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-24">
            <p className="font-serif italic text-warm-gray text-xl">
              No pieces in this edit yet. Come back soon, we&rsquo;re curating.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6 lg:gap-8">
            {products.map((p, i) => (
              <ProductCard
                key={p.id}
                product={{
                  slug: p.slug,
                  title: p.title,
                  imageUrls: p.imageUrls,
                  rating: p.rating,
                  reviewCount: p.reviewCount,
                  categoryName: p.category.name,
                }}
                priority={i < 3}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
