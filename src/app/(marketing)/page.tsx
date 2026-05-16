import { HeroSection } from "@/components/marketing/HeroSection";
import { CategoryGrid } from "@/components/marketing/CategoryGrid";
import { EditorialSection } from "@/components/marketing/EditorialSection";
import { getCategories } from "@/lib/data";

export const revalidate = 3600;

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
