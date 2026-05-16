import { ProductCard } from "./ProductCard";
import type { ProductDTO } from "@/types";
import { BowAccent } from "@/components/ui/BowAccent";

interface CrossSellSectionProps {
  products: Pick<
    ProductDTO,
    "id" | "slug" | "title" | "imageUrls" | "rating" | "reviewCount"
  >[];
}

export function CrossSellSection({ products }: CrossSellSectionProps) {
  if (products.length === 0) return null;

  return (
    <section className="mt-16 sm:mt-24 max-w-7xl mx-auto px-5 sm:px-6 lg:px-10 pb-16 sm:pb-24">
      <div className="text-center mb-8 sm:mb-12">
        <BowAccent className="w-10 sm:w-12 h-5 sm:h-6 mx-auto mb-4 sm:mb-5 opacity-60" />
        <p className="font-sans text-[10px] sm:text-xs uppercase tracking-[0.4em] text-rose-gold mb-3">
          To complete the look
        </p>
        <h2 className="font-serif text-3xl sm:text-4xl text-charcoal">
          You might also love
        </h2>
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
        {products.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </section>
  );
}
