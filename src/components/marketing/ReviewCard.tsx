import { StarRating } from "@/components/ui/StarRating";
import type { AmazonReview } from "@/types";

interface ReviewCardProps {
  review: AmazonReview;
}

export function ReviewCard({ review }: ReviewCardProps) {
  const initial = (review.author?.[0] ?? "V").toUpperCase();
  return (
    <article className="relative bg-blush/40 backdrop-blur-sm border border-rose-gold/20 rounded-2xl p-7">
      <span
        className="absolute top-4 left-6 font-serif text-7xl text-rose-gold/30 leading-none select-none"
        aria-hidden
      >
        &ldquo;
      </span>
      <div className="relative pt-8">
        <StarRating rating={review.rating} size="sm" showCount={false} />
        <h4 className="font-serif text-xl text-charcoal mt-3 mb-3 leading-snug">
          {review.title}
        </h4>
        <p className="font-serif italic text-warm-gray leading-relaxed line-clamp-5">
          {review.body}
        </p>
        <div className="mt-6 flex items-center gap-3 pt-5 border-t border-rose-gold/10">
          <div className="w-9 h-9 rounded-full bg-rose-gold/15 text-rose-gold-dark font-serif text-lg flex items-center justify-center">
            {initial}
          </div>
          <div>
            <p className="font-sans text-sm text-charcoal">{review.author}</p>
            {review.date && (
              <p className="text-xs text-warm-gray/70 font-sans">{review.date}</p>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}
