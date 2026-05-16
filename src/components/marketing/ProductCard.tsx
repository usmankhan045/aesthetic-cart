import Link from "next/link";
import Image from "next/image";
import { StarRating } from "@/components/ui/StarRating";
import type { ProductDTO } from "@/types";

interface ProductCardProps {
  product: Pick<
    ProductDTO,
    "slug" | "title" | "imageUrls" | "rating" | "reviewCount"
  > & { categoryName?: string };
  priority?: boolean;
}

export function ProductCard({ product, priority = false }: ProductCardProps) {
  const image = product.imageUrls?.[0];

  return (
    <Link
      href={`/products/${product.slug}`}
      className="group flex flex-col bg-white rounded-2xl overflow-hidden border border-rose-gold/10 hover:border-rose-gold/40 shadow-[var(--shadow-soft)] hover:shadow-[var(--shadow-hover)] transition-all duration-500"
    >
      <div className="relative aspect-square bg-gradient-to-br from-mist via-cream to-blush/50 overflow-hidden">
        {image ? (
          <Image
            src={image}
            alt={product.title}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-contain p-6 transition-transform duration-700 group-hover:scale-105"
            priority={priority}
          />
        ) : (
          <div className="absolute inset-0 bg-blush" />
        )}
        {product.categoryName && (
          <span className="absolute top-4 left-4 px-3 py-1 rounded-full bg-cream/95 backdrop-blur-sm text-[10px] uppercase tracking-[0.2em] text-rose-gold-dark font-sans border border-rose-gold/20 shadow-sm">
            {product.categoryName}
          </span>
        )}
      </div>

      <div className="p-6 flex flex-col flex-1">
        <h3 className="font-serif text-xl text-charcoal line-clamp-2 mb-3 leading-snug group-hover:text-rose-gold transition-colors">
          {product.title}
        </h3>
        <div className="mt-auto flex items-end justify-between">
          <StarRating
            rating={product.rating}
            reviewCount={product.reviewCount}
            size="sm"
          />
          <span className="text-xs uppercase tracking-[0.2em] text-rose-gold font-sans border-b border-rose-gold/40 pb-0.5 group-hover:text-rose-gold-dark group-hover:border-rose-gold transition-colors">
            View →
          </span>
        </div>
      </div>
    </Link>
  );
}
