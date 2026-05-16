"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

interface AdminProduct {
  id: string;
  slug: string;
  title: string;
  imageUrls: string[];
  published: boolean;
  categoryName: string;
  createdAt: Date | string;
}

interface ProductTableProps {
  products: AdminProduct[];
}

export function ProductTable({ products: initial }: ProductTableProps) {
  const router = useRouter();
  const [products, setProducts] = useState(initial);
  const [busyId, setBusyId] = useState<string | null>(null);

  async function togglePublished(p: AdminProduct) {
    setBusyId(p.id);
    try {
      const res = await fetch(`/api/products/${p.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ published: !p.published }),
      });
      if (res.ok) {
        setProducts(
          products.map((x) =>
            x.id === p.id ? { ...x, published: !p.published } : x
          )
        );
        router.refresh();
      }
    } finally {
      setBusyId(null);
    }
  }

  async function refresh(p: AdminProduct) {
    setBusyId(p.id);
    try {
      const res = await fetch(`/api/products/${p.id}/refresh`, {
        method: "POST",
      });
      const data = await res.json();
      if (!res.ok) {
        alert(`Refresh failed: ${data.error}`);
      } else {
        router.refresh();
      }
    } finally {
      setBusyId(null);
    }
  }

  async function remove(p: AdminProduct) {
    if (!confirm(`Delete "${p.title}"?`)) return;
    setBusyId(p.id);
    try {
      const res = await fetch(`/api/products/${p.id}`, { method: "DELETE" });
      if (res.ok) {
        setProducts(products.filter((x) => x.id !== p.id));
        router.refresh();
      }
    } finally {
      setBusyId(null);
    }
  }

  return (
    <div className="bg-white rounded-2xl p-5 sm:p-8 border border-rose-gold/15 shadow-[var(--shadow-card)]">
      <h2 className="font-serif text-2xl sm:text-3xl text-charcoal mb-2">Recent products</h2>
      <p className="font-serif italic text-warm-gray text-sm sm:text-base mb-5 sm:mb-6">
        Manage what&rsquo;s live on the catalogue.
      </p>

      {products.length === 0 ? (
        <p className="font-serif italic text-warm-gray text-center py-12">
          Nothing imported yet. Paste your first Amazon URL above.
        </p>
      ) : (
        <ul className="divide-y divide-rose-gold/10">
          {products.map((p) => (
            <li
              key={p.id}
              className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 py-4 group"
            >
              <div className="flex items-center gap-3 sm:gap-4 flex-1 min-w-0">
                <div className="relative w-14 sm:w-16 h-14 sm:h-16 rounded-xl bg-mist overflow-hidden flex-shrink-0">
                  {p.imageUrls[0] && (
                    <Image
                      src={p.imageUrls[0]}
                      alt={p.title}
                      fill
                      sizes="64px"
                      className="object-contain p-2"
                    />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <Link
                    href={`/products/${p.slug}`}
                    className="font-serif text-base sm:text-lg text-charcoal hover:text-rose-gold transition-colors line-clamp-1"
                  >
                    {p.title}
                  </Link>
                  <p className="text-[10px] sm:text-xs text-warm-gray font-sans tracking-wide line-clamp-1">
                    {p.categoryName} · /{p.slug}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2 sm:gap-3 flex-wrap sm:flex-nowrap pl-[68px] sm:pl-0">
                <button
                  onClick={() => refresh(p)}
                  disabled={busyId === p.id}
                  title="Re-scrape from Amazon"
                  className="text-[10px] sm:text-xs uppercase tracking-[0.2em] text-warm-gray hover:text-rose-gold-dark transition-colors font-sans sm:opacity-0 sm:group-hover:opacity-100"
                >
                  {busyId === p.id ? "…" : "Sync"}
                </button>
                <button
                  onClick={() => togglePublished(p)}
                  disabled={busyId === p.id}
                  className={`text-[10px] sm:text-xs uppercase tracking-[0.2em] font-sans px-3 py-1 rounded-full border transition-all ${
                    p.published
                      ? "bg-blush text-rose-gold-dark border-rose-gold/30"
                      : "bg-cream text-warm-gray border-warm-gray/30"
                  }`}
                >
                  {p.published ? "Live" : "Draft"}
                </button>
                <button
                  onClick={() => remove(p)}
                  disabled={busyId === p.id}
                  className="text-[10px] sm:text-xs uppercase tracking-[0.2em] text-warm-gray hover:text-rose-gold-dark transition-colors font-sans sm:opacity-0 sm:group-hover:opacity-100"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
