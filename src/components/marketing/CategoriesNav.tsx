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
  const ticking = useRef(false);

  useEffect(() => {
    if (categories.length === 0) return;

    function update() {
      const y = window.scrollY;
      const delta = y - lastY.current;

      if (y < 100) {
        setHidden(false);
      } else if (delta > 10) {
        setHidden(true);
      } else if (delta < -10) {
        setHidden(false);
      }

      lastY.current = y;
      ticking.current = false;
    }

    function onScroll() {
      if (!ticking.current) {
        ticking.current = true;
        window.requestAnimationFrame(update);
      }
    }

    lastY.current = window.scrollY;
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [categories.length]);

  if (categories.length === 0) return null;

  return (
    <div
      className={cn(
        "sticky top-16 sm:top-20 z-30 bg-cream/85 backdrop-blur-md border-b border-rose-gold/10 transition-transform duration-300 ease-out will-change-transform",
        hidden ? "-translate-y-full" : "translate-y-0"
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
