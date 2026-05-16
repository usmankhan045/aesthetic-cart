"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import type { CategoryDTO } from "@/types";

interface ImportFormProps {
  categories: CategoryDTO[];
}

interface ImportResult {
  success?: boolean;
  product?: { slug: string; title: string };
  error?: string;
}

export function ImportForm({ categories }: ImportFormProps) {
  const [url, setUrl] = useState("");
  const [categoryId, setCategoryId] = useState(categories[0]?.id ?? "");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<ImportResult | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!url || !categoryId) return;
    setLoading(true);
    setResult(null);
    try {
      const res = await fetch("/api/import", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amazonUrl: url, categoryId }),
      });
      const data = await res.json();
      setResult(data);
      if (res.ok) setUrl("");
    } catch (err) {
      setResult({ error: err instanceof Error ? err.message : "Network error" });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="bg-white rounded-2xl p-5 sm:p-8 border border-rose-gold/15 shadow-[var(--shadow-card)]">
      <h2 className="font-serif text-2xl sm:text-3xl text-charcoal mb-2">
        One-click Amazon import
      </h2>
      <p className="font-serif italic text-warm-gray text-sm sm:text-base mb-5 sm:mb-6">
        Paste an Amazon URL and we&rsquo;ll do the rest.
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-xs uppercase tracking-[0.2em] text-charcoal mb-2 font-sans">
            Amazon Product URL
          </label>
          <input
            type="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="https://www.amazon.com/dp/XXXXXXXXXX"
            required
            className="w-full px-5 py-3 rounded-full border border-rose-gold/20 bg-cream/50 focus:outline-none focus:border-rose-gold focus:ring-2 focus:ring-rose-gold/20 font-sans text-sm transition-all"
          />
        </div>

        <div>
          <label className="block text-xs uppercase tracking-[0.2em] text-charcoal mb-2 font-sans">
            Category
          </label>
          <select
            value={categoryId}
            onChange={(e) => setCategoryId(e.target.value)}
            required
            className="w-full px-5 py-3 rounded-full border border-rose-gold/20 bg-cream/50 focus:outline-none focus:border-rose-gold focus:ring-2 focus:ring-rose-gold/20 font-sans text-sm transition-all"
          >
            {categories.length === 0 ? (
              <option value="">No categories yet, create one first</option>
            ) : (
              categories.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.emoji ? `${c.emoji} ` : ""}
                  {c.name}
                </option>
              ))
            )}
          </select>
        </div>

        <Button
          type="submit"
          disabled={loading || categories.length === 0}
          className="w-full"
          size="lg"
        >
          {loading ? "Scraping Amazon…" : "Publish to site"}
        </Button>
      </form>

      {result && (
        <div
          className={`mt-6 p-4 rounded-2xl border text-sm ${
            result.error
              ? "bg-rose/20 border-rose-gold/40 text-rose-gold-dark"
              : "bg-blush border-rose-gold/30 text-charcoal"
          }`}
        >
          {result.error ? (
            <p className="font-sans">⚠ {result.error}</p>
          ) : (
            <p className="font-serif">
              ✓ Published{" "}
              <strong className="italic">{result.product?.title}</strong>.{" "}
              <a
                href={`/products/${result.product?.slug}`}
                target="_blank"
                className="underline text-rose-gold-dark"
                rel="noreferrer"
              >
                View live →
              </a>
            </p>
          )}
        </div>
      )}
    </div>
  );
}
