import Link from "next/link";
import Image from "next/image";
import type { CategoryDTO } from "@/types";
import { BowAccent } from "@/components/ui/BowAccent";
import { CategoryCardArt } from "@/components/ui/CategoryCardArt";

interface CategoryGridProps {
  categories: CategoryDTO[];
}

export function CategoryGrid({ categories }: CategoryGridProps) {
  if (categories.length === 0) {
    return (
      <section className="max-w-7xl mx-auto px-6 lg:px-10 py-24 text-center">
        <p className="font-serif italic text-warm-gray text-lg">
          Categories are being curated. Check back soon.
        </p>
      </section>
    );
  }

  return (
    <section className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-10 py-16 sm:py-24">
      <div className="text-center mb-10 sm:mb-16">
        <BowAccent className="w-12 sm:w-16 h-6 sm:h-8 mx-auto mb-4 sm:mb-6 opacity-60" />
        <p className="font-sans text-[10px] sm:text-xs uppercase tracking-[0.4em] text-rose-gold mb-3 sm:mb-4">
          Shop by mood
        </p>
        <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-charcoal">
          The Edit, by category
        </h2>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6 lg:gap-8">
        {categories.map((cat, i) => (
          <Link
            key={cat.id}
            href={`/catalogue?category=${cat.slug}`}
            className="group relative overflow-hidden rounded-2xl bg-mist aspect-square sm:aspect-[4/5] shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-hover)] transition-all duration-500"
          >
            {cat.imageUrl ? (
              <>
                <Image
                  src={cat.imageUrl}
                  alt={cat.name}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  priority={i < 2}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal/50 via-charcoal/15 to-transparent" />
              </>
            ) : (
              <CategoryCardArt emoji={cat.emoji} variant={i} />
            )}

            <div className="absolute inset-x-0 bottom-0 p-4 sm:p-6 lg:p-8">
              <div className="flex items-center gap-2 mb-1 sm:mb-2">
                {cat.emoji && (
                  <span
                    className={
                      cat.imageUrl
                        ? "text-xl sm:text-2xl"
                        : "text-xl sm:text-2xl drop-shadow-sm"
                    }
                    aria-hidden
                  >
                    {cat.emoji}
                  </span>
                )}
                <p
                  className={`hidden sm:block font-sans text-[10px] uppercase tracking-[0.3em] ${
                    cat.imageUrl ? "text-white/85" : "text-rose-gold-dark/80"
                  }`}
                >
                  Category
                </p>
              </div>
              <h3
                className={`font-serif text-xl sm:text-3xl lg:text-4xl mb-1 sm:mb-2 group-hover:translate-x-1 transition-transform duration-500 leading-tight ${
                  cat.imageUrl ? "text-white" : "text-charcoal"
                }`}
              >
                {cat.name}
              </h3>
              <p
                className={`text-[10px] sm:text-xs uppercase tracking-[0.2em] font-sans ${
                  cat.imageUrl ? "text-white/85" : "text-rose-gold-dark"
                }`}
              >
                Explore →
              </p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
