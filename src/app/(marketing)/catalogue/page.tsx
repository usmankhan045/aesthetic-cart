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
        "Browse every piece in our curated edit — sorted by mood, filtered by vibe.",
    };
  }
  const cat = await getCategoryBySlug(slug);
  if (!cat) return { title: "Catalogue" };
  return {
    title: cat.name,
    description: `Curated ${cat.name.toLowerCase()} — the prettiest, most useful pieces in our edit.`,
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

  return (
    <div className="bg-cream min-h-screen">
      <header className="relative overflow-hidden bg-gradient-to-br from-cream via-blush/60 to-rose/30 pt-24 pb-16">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-24 -left-24 w-80 h-80 rounded-full bg-rose/30 blur-3xl opacity-60" />
          <div className="absolute -bottom-20 -right-20 w-80 h-80 rounded-full bg-petal/40 blur-3xl opacity-50" />
        </div>
        <div className="relative max-w-7xl mx-auto px-6 lg:px-10 text-center">
          <BowAccent className="w-14 h-7 mx-auto mb-6 opacity-60" />
          <p className="font-sans text-xs uppercase tracking-[0.4em] text-rose-gold mb-4">
            {activeCategory ? "Category" : "The full edit"}
          </p>
          <h1 className="font-serif text-5xl lg:text-7xl text-charcoal mb-4">
            {activeCategory ? activeCategory.name : "Catalogue"}
          </h1>
          <p className="font-serif italic text-warm-gray text-lg max-w-xl mx-auto">
            {activeCategory
              ? `Every piece in our ${activeCategory.name.toLowerCase()} edit.`
              : "Every piece, every mood. Curated weekly."}
          </p>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-8">
        <ProductFilters
          categories={categories}
          activeSlug={activeCategory?.slug ?? null}
        />
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-10 pb-24">
        {dbError ? (
          <div className="text-center py-24 max-w-xl mx-auto">
            <p className="font-serif italic text-warm-gray text-xl mb-4">
              The edit is currently being prepared.
            </p>
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-24">
            <p className="font-serif italic text-warm-gray text-xl">
              No pieces in this edit yet. Come back soon — we&rsquo;re curating.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
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
