import { BowAccent } from "@/components/ui/BowAccent";

interface CategoryCardArtProps {
  emoji?: string | null;
  variant?: number;
}

const VARIANTS = [
  { gradient: "bg-gradient-to-br from-blush via-rose/70 to-petal/60", accent: "from-rose-gold/30" },
  { gradient: "bg-gradient-to-tr from-mist via-blush to-rose/60", accent: "from-rose-gold/30" },
  { gradient: "bg-gradient-to-br from-sand via-blush/90 to-rose/50", accent: "from-rose-gold/35" },
  { gradient: "bg-gradient-to-tl from-petal/50 via-blush to-cream", accent: "from-rose-gold/25" },
  { gradient: "bg-gradient-to-b from-rose/70 via-blush to-ivory", accent: "from-rose-gold/30" },
  { gradient: "bg-gradient-to-tr from-cream via-blush/90 to-petal/60", accent: "from-rose-gold/35" },
];

export function CategoryCardArt({ emoji, variant = 0 }: CategoryCardArtProps) {
  const v = VARIANTS[variant % VARIANTS.length];

  return (
    <>
      <div className={`absolute inset-0 ${v.gradient}`} />

      <div
        className={`absolute -top-20 -right-16 w-72 h-72 rounded-full blur-3xl opacity-70 bg-gradient-to-br ${v.accent} to-transparent`}
      />
      <div
        className={`absolute -bottom-24 -left-20 w-80 h-80 rounded-full blur-3xl opacity-60 bg-gradient-to-tr ${v.accent} to-transparent`}
      />

      <svg
        className="absolute inset-0 w-full h-full pointer-events-none text-rose-gold-dark"
        viewBox="0 0 400 500"
        preserveAspectRatio="xMidYMid slice"
        aria-hidden
      >
        <defs>
          <pattern
            id={`floret-${variant}`}
            x="0"
            y="0"
            width="60"
            height="60"
            patternUnits="userSpaceOnUse"
            patternTransform="rotate(15)"
          >
            <g opacity="0.15" fill="currentColor">
              <circle cx="30" cy="30" r="1.2" />
              <path d="M30 24 Q31.5 27 30 30 Q28.5 27 30 24 Z" />
              <path d="M30 36 Q31.5 33 30 30 Q28.5 33 30 36 Z" />
              <path d="M24 30 Q27 28.5 30 30 Q27 31.5 24 30 Z" />
              <path d="M36 30 Q33 28.5 30 30 Q33 31.5 36 30 Z" />
            </g>
          </pattern>

          <pattern
            id={`sparkle-${variant}`}
            x="0"
            y="0"
            width="120"
            height="120"
            patternUnits="userSpaceOnUse"
          >
            <g opacity="0.18" fill="currentColor">
              <path d="M20 14 L21 18 L25 19 L21 20 L20 24 L19 20 L15 19 L19 18 Z" />
              <path d="M90 80 L91 84 L95 85 L91 86 L90 90 L89 86 L85 85 L89 84 Z" />
              <path d="M55 105 L55.7 107.5 L58.5 108 L55.7 108.5 L55 111 L54.3 108.5 L51.5 108 L54.3 107.5 Z" />
            </g>
          </pattern>
        </defs>

        <rect width="100%" height="100%" fill={`url(#floret-${variant})`} />
        <rect width="100%" height="100%" fill={`url(#sparkle-${variant})`} />

        <path
          d="M -20 80 Q 80 40 200 80 T 420 70"
          stroke="currentColor"
          strokeWidth="1.2"
          fill="none"
          opacity="0.15"
          strokeLinecap="round"
        />
        <path
          d="M -20 430 Q 100 470 220 430 T 420 440"
          stroke="currentColor"
          strokeWidth="1.2"
          fill="none"
          opacity="0.12"
          strokeLinecap="round"
        />
      </svg>

      {emoji && (
        <span
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[55%] text-[8rem] sm:text-[11rem] lg:text-[13rem] opacity-[0.22] select-none pointer-events-none leading-none"
          aria-hidden
        >
          {emoji}
        </span>
      )}

      <BowAccent className="absolute top-5 right-5 w-14 h-7 opacity-35" />
      <BowAccent className="absolute bottom-10 left-5 w-9 h-5 opacity-25 -rotate-12" />

      <svg
        viewBox="0 0 40 40"
        className="absolute top-6 left-6 w-8 h-8 text-rose-gold opacity-30"
        fill="none"
        stroke="currentColor"
        strokeWidth="1"
        aria-hidden
      >
        <circle cx="20" cy="20" r="4" />
        <path d="M20 4 C22 12, 22 16, 20 20 C18 16, 18 12, 20 4 Z" />
        <path d="M20 36 C22 28, 22 24, 20 20 C18 24, 18 28, 20 36 Z" />
        <path d="M4 20 C12 22, 16 22, 20 20 C16 18, 12 18, 4 20 Z" />
        <path d="M36 20 C28 22, 24 22, 20 20 C24 18, 28 18, 36 20 Z" />
      </svg>

      <svg
        viewBox="0 0 24 24"
        className="absolute bottom-6 right-8 w-6 h-6 text-rose-gold opacity-35"
        fill="currentColor"
        aria-hidden
      >
        <path d="M12 2 L13.5 8.5 L20 10 L13.5 11.5 L12 18 L10.5 11.5 L4 10 L10.5 8.5 Z" />
      </svg>
    </>
  );
}
