"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";
import type { CategoryDTO } from "@/types";

interface CategoriesNavProps {
  categories: CategoryDTO[];
}

export function CategoriesNav({ categories }: CategoriesNavProps) {
  const [hidden, setHidden] = useState(false);
  const lastY = useRef(0);

  useEffect(() => {
    if (categories.length === 0) return;

    function onScroll() {
      const y = window.scrollY;
      if (y < 80) {
        setHidden(false);
      } else if (y > lastY.current + 4) {
        setHidden(true);
      } else if (y < lastY.current - 4) {
        setHidden(false);
      }
      lastY.current = y;
    }

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [categories.length]);

  if (categories.length === 0) return null;

  return (
    <div
      className={cn(
        "border-t border-rose-gold/10 bg-cream/60 overflow-hidden transition-all duration-300 ease-out",
        hidden
          ? "max-h-0 opacity-0 -translate-y-2 pointer-events-none"
          : "max-h-20 opacity-100 translate-y-0"
      )}
    >
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-10">
        <ul className="flex items-center gap-1 overflow-x-auto py-2 sm:py-3 scrollbar-thin">
          <li>
            <Link
              href="/catalogue"
              className="shrink-0 inline-flex items-center px-3 sm:px-4 py-1 sm:py-1.5 rounded-full text-[10px] sm:text-[11px] uppercase tracking-[0.2em] sm:tracking-[0.22em] font-sans text-charcoal/80 hover:text-rose-gold-dark hover:bg-blush/60 transition-all"
            >
              All
            </Link>
          </li>
          {categories.map((c) => (
            <li key={c.id}>
              <Link
                href={`/catalogue?category=${c.slug}`}
                className="shrink-0 inline-flex items-center gap-1 sm:gap-1.5 px-3 sm:px-4 py-1 sm:py-1.5 rounded-full text-[10px] sm:text-[11px] uppercase tracking-[0.2em] sm:tracking-[0.22em] font-sans text-charcoal/80 hover:text-rose-gold-dark hover:bg-blush/60 transition-all"
              >
                {c.emoji && <span className="text-xs sm:text-sm">{c.emoji}</span>}
                {c.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
