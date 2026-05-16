import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import { ProductCard } from "@/components/marketing/ProductCard";
import { ProductFilters } from "@/components/marketing/ProductFilters";
import { BowAccent } from "@/components/ui/BowAccent";
import type { CategoryDTO } from "@/types";

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
  const cat = await prisma.category.findUnique({ where: { slug } });
  if (!cat) return { title: "Catalogue" };
  return {
    title: cat.name,
    description: `Curated ${cat.name.toLowerCase()} — the prettiest, most useful pieces in our edit.`,
  };
}

export default async function CataloguePage({ searchParams }: PageProps) {
  const { category: slug } = await searchParams;

  let activeCategory: { id: string; name: string; slug: string } | null = null;
  let products: Awaited<ReturnType<typeof loadProducts>> = [];
  let categories: CategoryDTO[] = [];
  let dbError = false;

  try {
    const categoriesRaw = await prisma.category.findMany({
      orderBy: { sortOrder: "asc" },
    });
    categories = categoriesRaw.map((c) => ({
      id: c.id,
      name: c.name,
      slug: c.slug,
      emoji: c.emoji,
      imageUrl: c.imageUrl,
      sortOrder: c.sortOrder,
    }));

    if (slug) {
      const cat = await prisma.category.findUnique({ where: { slug } });
      if (cat) activeCategory = { id: cat.id, name: cat.name, slug: cat.slug };
    }

    products = await loadProducts(activeCategory?.id);
  } catch (err) {
    dbError = true;
    console.error("[catalogue] DB error:", err);
  }

  return (
    <div className="bg-cream min-h-screen">
      <header className="bg-gradient-to-b from-blush/40 to-cream pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 text-center">
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
            <p className="text-xs uppercase tracking-[0.2em] text-warm-gray/70 font-sans">
              (Database not configured — set DATABASE_URL in .env.local and run <code>npx prisma db push</code>)
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

async function loadProducts(categoryId?: string) {
  return await prisma.product.findMany({
    where: {
      published: true,
      ...(categoryId ? { categoryId } : {}),
    },
    include: { category: { select: { id: true, name: true, slug: true } } },
    orderBy: { createdAt: "desc" },
  });
}
