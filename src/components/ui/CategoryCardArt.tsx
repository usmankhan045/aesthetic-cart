import { BowAccent } from "@/components/ui/BowAccent";

interface CategoryCardArtProps {
  emoji?: string | null;
  variant?: number;
}

const VARIANTS = [
  {
    gradient:
      "bg-gradient-to-br from-blush via-rose/70 to-petal/60",
    accent: "from-rose-gold/30",
  },
  {
    gradient:
      "bg-gradient-to-tr from-mist via-blush to-rose/50",
    accent: "from-rose-gold/25",
  },
  {
    gradient:
      "bg-gradient-to-br from-sand via-blush/80 to-rose/40",
    accent: "from-rose-gold/30",
  },
  {
    gradient:
      "bg-gradient-to-tl from-petal/40 via-blush to-cream",
    accent: "from-rose-gold/20",
  },
  {
    gradient:
      "bg-gradient-to-b from-rose/60 via-blush to-ivory",
    accent: "from-rose-gold/25",
  },
  {
    gradient:
      "bg-gradient-to-tr from-cream via-blush/90 to-petal/50",
    accent: "from-rose-gold/30",
  },
];

export function CategoryCardArt({
  emoji,
  variant = 0,
}: CategoryCardArtProps) {
  const v = VARIANTS[variant % VARIANTS.length];

  return (
    <>
      <div className={`absolute inset-0 ${v.gradient}`} />

      <div
        className={`absolute -top-16 -right-12 w-56 h-56 rounded-full blur-3xl opacity-70 bg-gradient-to-br ${v.accent} to-transparent`}
      />
      <div
        className={`absolute -bottom-20 -left-16 w-64 h-64 rounded-full blur-3xl opacity-60 bg-gradient-to-tr ${v.accent} to-transparent`}
      />

      <svg
        className="absolute inset-0 w-full h-full opacity-[0.08] mix-blend-multiply pointer-events-none"
        viewBox="0 0 400 500"
        preserveAspectRatio="xMidYMid slice"
        aria-hidden
      >
        <defs>
          <pattern id="dots" x="0" y="0" width="32" height="32" patternUnits="userSpaceOnUse">
            <circle cx="16" cy="16" r="1.2" fill="currentColor" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#dots)" className="text-rose-gold-dark" />
      </svg>

      {emoji && (
        <span
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[58%] text-[10rem] sm:text-[12rem] lg:text-[14rem] opacity-[0.18] select-none pointer-events-none leading-none"
          aria-hidden
        >
          {emoji}
        </span>
      )}

      <BowAccent
        className="absolute top-6 right-6 w-12 h-6 opacity-30"
      />
      <BowAccent
        className="absolute bottom-12 left-6 w-8 h-4 opacity-20 -rotate-12"
      />
    </>
  );
}
