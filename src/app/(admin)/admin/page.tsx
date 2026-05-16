import { prisma } from "@/lib/prisma";
import { ImportForm } from "@/components/admin/ImportForm";
import { CategoryManager } from "@/components/admin/CategoryManager";
import { ProductTable } from "@/components/admin/ProductTable";
import type { CategoryDTO } from "@/types";

export const dynamic = "force-dynamic";

export default async function AdminDashboardPage() {
  let categories: CategoryDTO[] = [];
  let products: {
    id: string;
    slug: string;
    title: string;
    imageUrls: string[];
    published: boolean;
    categoryName: string;
    createdAt: Date;
  }[] = [];
  let dbError: string | null = null;

  try {
    const [categoriesRaw, productsRaw] = await Promise.all([
      prisma.category.findMany({ orderBy: { sortOrder: "asc" } }),
      prisma.product.findMany({
        include: { category: { select: { name: true } } },
        orderBy: { createdAt: "desc" },
        take: 50,
      }),
    ]);

    categories = categoriesRaw.map((c) => ({
      id: c.id,
      name: c.name,
      slug: c.slug,
      emoji: c.emoji,
      imageUrl: c.imageUrl,
      sortOrder: c.sortOrder,
    }));

    products = productsRaw.map((p) => ({
      id: p.id,
      slug: p.slug,
      title: p.title,
      imageUrls: p.imageUrls,
      published: p.published,
      categoryName: p.category.name,
      createdAt: p.createdAt,
    }));
  } catch (err) {
    dbError = err instanceof Error ? err.message : "Unknown database error";
    console.error("[admin] DB error:", err);
  }

  return (
    <div className="max-w-7xl mx-auto px-6 lg:px-10 py-12">
      <header className="mb-12">
        <h1 className="font-serif text-5xl text-charcoal mb-2">
          The studio
        </h1>
        <p className="font-serif italic text-warm-gray text-lg">
          Curate, publish, and refine your edit.
        </p>
      </header>

      {dbError && (
        <div className="mb-8 p-6 rounded-2xl bg-rose/20 border border-rose-gold/30">
          <p className="font-serif text-lg text-charcoal mb-2">
            Database not reachable
          </p>
          <p className="font-sans text-sm text-warm-gray mb-3">
            {dbError}
          </p>
          <p className="font-sans text-xs text-warm-gray">
            Check that <code className="bg-cream px-1.5 py-0.5 rounded">DATABASE_URL</code> in <code className="bg-cream px-1.5 py-0.5 rounded">.env.local</code> points to your Neon database, then run <code className="bg-cream px-1.5 py-0.5 rounded">npx prisma db push</code> and restart the dev server.
          </p>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <ImportForm categories={categories} />
          <ProductTable products={products} />
        </div>
        <div>
          <CategoryManager initialCategories={categories} />
        </div>
      </div>
    </div>
  );
}
