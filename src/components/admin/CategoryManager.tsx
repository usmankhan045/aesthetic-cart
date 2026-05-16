"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import type { CategoryDTO } from "@/types";

interface CategoryManagerProps {
  initialCategories: CategoryDTO[];
}

export function CategoryManager({ initialCategories }: CategoryManagerProps) {
  const router = useRouter();
  const [categories, setCategories] = useState(initialCategories);
  const [name, setName] = useState("");
  const [emoji, setEmoji] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  async function handleAdd(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim()) return;
    setBusy(true);
    setError(null);
    try {
      const res = await fetch("/api/categories", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, emoji: emoji || undefined }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Failed");
      setCategories([...categories, data.category]);
      setName("");
      setEmoji("");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed");
    } finally {
      setBusy(false);
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("Delete this category?")) return;
    setBusy(true);
    setError(null);
    try {
      const res = await fetch(`/api/categories?id=${id}`, { method: "DELETE" });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Failed");
      setCategories(categories.filter((c) => c.id !== id));
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="bg-white rounded-2xl p-5 sm:p-8 border border-rose-gold/15 shadow-[var(--shadow-card)]">
      <h2 className="font-serif text-2xl sm:text-3xl text-charcoal mb-2">Categories</h2>
      <p className="font-serif italic text-warm-gray text-sm sm:text-base mb-5 sm:mb-6">
        Organize your edit into curated collections.
      </p>

      <form onSubmit={handleAdd} className="space-y-3 mb-6">
        <div className="flex gap-3">
          <input
            type="text"
            value={emoji}
            onChange={(e) => setEmoji(e.target.value)}
            placeholder="🎀"
            maxLength={2}
            className="w-14 px-2 py-2.5 text-center rounded-full border border-rose-gold/20 bg-cream/50 focus:outline-none focus:border-rose-gold font-sans flex-shrink-0"
          />
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Category name"
            required
            className="flex-1 min-w-0 px-5 py-2.5 rounded-full border border-rose-gold/20 bg-cream/50 focus:outline-none focus:border-rose-gold font-sans text-sm"
          />
        </div>
        <Button type="submit" disabled={busy} size="sm" className="w-full">
          Add category
        </Button>
      </form>

      {error && (
        <p className="text-sm text-rose-gold-dark font-sans mb-4">⚠ {error}</p>
      )}

      {categories.length === 0 ? (
        <p className="font-serif italic text-warm-gray text-center py-6">
          No categories yet. Create your first.
        </p>
      ) : (
        <ul className="divide-y divide-rose-gold/10">
          {categories.map((c) => (
            <li
              key={c.id}
              className="flex items-center justify-between py-3 group"
            >
              <div className="flex items-center gap-3">
                <span className="text-2xl">{c.emoji ?? "•"}</span>
                <div>
                  <p className="font-serif text-lg text-charcoal">{c.name}</p>
                  <p className="text-xs text-warm-gray font-sans">/{c.slug}</p>
                </div>
              </div>
              <button
                onClick={() => handleDelete(c.id)}
                disabled={busy}
                className="text-[10px] sm:text-xs uppercase tracking-[0.2em] text-warm-gray hover:text-rose-gold-dark transition-colors font-sans sm:opacity-0 sm:group-hover:opacity-100"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
