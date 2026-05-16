import { prisma } from "@/lib/prisma";
import { HeroSection } from "@/components/marketing/HeroSection";
import { CategoryGrid } from "@/components/marketing/CategoryGrid";
import { EditorialSection } from "@/components/marketing/EditorialSection";
import type { CategoryDTO } from "@/types";

export const revalidate = 3600;

async function getCategories(): Promise<CategoryDTO[]> {
  try {
    const cats = await prisma.category.findMany({
      orderBy: { sortOrder: "asc" },
    });
    return cats.map((c) => ({
      id: c.id,
      name: c.name,
      slug: c.slug,
      emoji: c.emoji,
      imageUrl: c.imageUrl,
      sortOrder: c.sortOrder,
    }));
  } catch {
    return [];
  }
}

export default async function HomePage() {
  const categories = await getCategories();
  return (
    <>
      <HeroSection />
      <CategoryGrid categories={categories} />
      <EditorialSection />
    </>
  );
}
