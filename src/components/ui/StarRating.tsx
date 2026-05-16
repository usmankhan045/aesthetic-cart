import { cn } from "@/lib/cn";

interface StarRatingProps {
  rating: number | null;
  reviewCount?: number | null;
  size?: "sm" | "md" | "lg";
  showCount?: boolean;
  className?: string;
}

const SIZES = {
  sm: { star: "w-3 h-3", text: "text-xs" },
  md: { star: "w-4 h-4", text: "text-sm" },
  lg: { star: "w-5 h-5", text: "text-base" },
};

export function StarRating({
  rating,
  reviewCount,
  size = "md",
  showCount = true,
  className,
}: StarRatingProps) {
  if (rating === null || rating === undefined) return null;
  const dims = SIZES[size];
  const filled = Math.round(rating * 2) / 2;

  return (
    <div className={cn("inline-flex items-center gap-2", className)}>
      <div className="inline-flex">
        {[1, 2, 3, 4, 5].map((i) => {
          const isFull = i <= filled;
          const isHalf = !isFull && i - 0.5 === filled;
          return (
            <Star
              key={i}
              className={dims.star}
              fill={isFull ? "full" : isHalf ? "half" : "empty"}
            />
          );
        })}
      </div>
      <span className={cn("font-sans text-warm-gray", dims.text)}>
        {rating.toFixed(1)}
        {showCount && reviewCount ? (
          <span className="ml-1 text-warm-gray/70">
            ({reviewCount.toLocaleString()})
          </span>
        ) : null}
      </span>
    </div>
  );
}

function Star({
  className,
  fill,
}: {
  className?: string;
  fill: "full" | "half" | "empty";
}) {
  const color = fill === "empty" ? "#E5D5D2" : "#B76E79";
  if (fill === "half") {
    return (
      <svg
        className={className}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden
      >
        <defs>
          <linearGradient id="half-star" x1="0" x2="1" y1="0" y2="0">
            <stop offset="50%" stopColor="#B76E79" />
            <stop offset="50%" stopColor="#E5D5D2" />
          </linearGradient>
        </defs>
        <path
          d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
          fill="url(#half-star)"
        />
      </svg>
    );
  }
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill={color}
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
    </svg>
  );
}
