"use client";

import Image from "next/image";
import { useState } from "react";
import { cn } from "@/lib/cn";

interface ProductGalleryProps {
  images: string[];
  title: string;
}

export function ProductGallery({ images, title }: ProductGalleryProps) {
  const [active, setActive] = useState(0);
  const safeImages = images.length > 0 ? images : [];

  if (safeImages.length === 0) {
    return (
      <div className="aspect-square bg-blush rounded-2xl flex items-center justify-center">
        <p className="font-serif italic text-warm-gray">No image available</p>
      </div>
    );
  }

  return (
    <div className="lg:sticky lg:top-28">
      <div className="relative aspect-square bg-white rounded-2xl overflow-hidden border border-rose-gold/10 shadow-[var(--shadow-card)]">
        <Image
          src={safeImages[active]}
          alt={`${title}, image ${active + 1}`}
          fill
          sizes="(max-width: 1024px) 100vw, 50vw"
          className="object-contain p-8"
          priority
        />
      </div>

      {safeImages.length > 1 && (
        <div className="grid grid-cols-5 gap-3 mt-4">
          {safeImages.slice(0, 5).map((img, i) => (
            <button
              key={img}
              type="button"
              onClick={() => setActive(i)}
              className={cn(
                "relative aspect-square rounded-xl overflow-hidden border-2 transition-all duration-300 bg-white",
                active === i
                  ? "border-rose-gold shadow-[var(--shadow-soft)]"
                  : "border-rose-gold/10 hover:border-rose-gold/40 opacity-70 hover:opacity-100"
              )}
              aria-label={`View image ${i + 1}`}
            >
              <Image
                src={img}
                alt=""
                fill
                sizes="100px"
                className="object-contain p-2"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
