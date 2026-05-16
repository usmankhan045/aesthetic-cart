import Link from "next/link";
import { ButtonLink } from "@/components/ui/Button";
import { BowAccent } from "@/components/ui/BowAccent";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-cream via-blush/60 to-rose/30 pt-16 pb-20 sm:pt-24 sm:pb-32 lg:pt-32 lg:pb-40">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-20 -left-20 w-72 sm:w-96 h-72 sm:h-96 rounded-full bg-rose/40 blur-3xl opacity-70" />
        <div className="absolute -bottom-32 -right-20 w-80 sm:w-[28rem] h-80 sm:h-[28rem] rounded-full bg-petal/50 blur-3xl opacity-60" />
        <div className="absolute top-1/3 right-1/4 w-56 sm:w-72 h-56 sm:h-72 rounded-full bg-sand/40 blur-3xl opacity-50" />
      </div>

      <div className="relative max-w-5xl mx-auto px-5 sm:px-6 lg:px-10 text-center">
        <BowAccent className="w-16 sm:w-20 h-8 sm:h-10 mx-auto mb-6 sm:mb-8 opacity-70" />

        <p className="font-sans text-[10px] sm:text-xs uppercase tracking-[0.4em] text-rose-gold mb-4 sm:mb-6">
          A curated edit · est. 2026
        </p>

        <h1 className="font-serif text-4xl sm:text-6xl lg:text-8xl leading-[1.08] sm:leading-[1.05] text-charcoal mb-6 sm:mb-8">
          Curated for the girl
          <br />
          <em className="text-rose-gold not-italic font-serif">
            who has taste.
          </em>
        </h1>

        <p className="max-w-2xl mx-auto font-serif italic text-base sm:text-xl lg:text-2xl text-warm-gray leading-relaxed mb-8 sm:mb-12 px-2">
          Soft, intentional, and deeply considered. Every piece in our edit is chosen for the way it makes a quiet morning feel.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
          <ButtonLink href="/catalogue" size="lg" className="w-full sm:w-auto">
            Explore the edit
          </ButtonLink>
          <Link
            href="/catalogue"
            className="text-xs sm:text-sm font-sans tracking-[0.2em] uppercase text-charcoal/70 hover:text-rose-gold transition-colors border-b border-rose-gold/30 pb-1"
          >
            Browse all categories →
          </Link>
        </div>
      </div>
    </section>
  );
}
