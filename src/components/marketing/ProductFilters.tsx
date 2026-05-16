"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useTransition } from "react";
import { cn } from "@/lib/cn";
import type { CategoryDTO } from "@/types";

interface ProductFiltersProps {
  categories: CategoryDTO[];
  activeSlug: string | null;
}

export function ProductFilters({ categories, activeSlug }: ProductFiltersProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  function setCategory(slug: string | null) {
    const params = new URLSearchParams(searchParams.toString());
    if (slug) params.set("category", slug);
    else params.delete("category");
    const qs = params.toString();
    startTransition(() => {
      router.push(qs ? `/catalogue?${qs}` : "/catalogue");
    });
  }

  return (
    <div
      className={cn(
        "flex items-center gap-2 overflow-x-auto pb-2 -mx-2 px-2",
        isPending && "opacity-60"
      )}
    >
      <FilterPill
        active={!activeSlug}
        onClick={() => setCategory(null)}
        label="All"
      />
      {categories.map((c) => (
        <FilterPill
          key={c.id}
          active={activeSlug === c.slug}
          onClick={() => setCategory(c.slug)}
          label={c.emoji ? `${c.emoji} ${c.name}` : c.name}
        />
      ))}
    </div>
  );
}

function FilterPill({
  active,
  onClick,
  label,
}: {
  active: boolean;
  onClick: () => void;
  label: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "shrink-0 px-5 py-2.5 rounded-full text-xs uppercase tracking-[0.2em] font-sans transition-all duration-300 border",
        active
          ? "bg-rose-gold text-white border-rose-gold shadow-[var(--shadow-soft)]"
          : "bg-white text-charcoal border-rose-gold/20 hover:border-rose-gold/50 hover:bg-blush"
      )}
    >
      {label}
    </button>
  );
}
