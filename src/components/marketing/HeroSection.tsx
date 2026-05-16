import Link from "next/link";
import { ButtonLink } from "@/components/ui/Button";
import { BowAccent } from "@/components/ui/BowAccent";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-cream via-blush/40 to-rose/20 pt-24 pb-32 lg:pt-32 lg:pb-40">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-20 -left-20 w-96 h-96 rounded-full bg-rose/30 blur-3xl opacity-60" />
        <div className="absolute -bottom-32 -right-20 w-[28rem] h-[28rem] rounded-full bg-petal/40 blur-3xl opacity-50" />
      </div>

      <div className="relative max-w-5xl mx-auto px-6 lg:px-10 text-center">
        <BowAccent className="w-20 h-10 mx-auto mb-8 opacity-70" />

        <p className="font-sans text-xs uppercase tracking-[0.4em] text-rose-gold mb-6">
          A curated edit · est. 2026
        </p>

        <h1 className="font-serif text-5xl sm:text-7xl lg:text-8xl leading-[1.05] text-charcoal mb-8">
          Curated for the girl
          <br />
          <em className="text-rose-gold not-italic font-serif">
            who has taste.
          </em>
        </h1>

        <p className="max-w-2xl mx-auto font-serif italic text-xl lg:text-2xl text-warm-gray leading-relaxed mb-12">
          Soft, intentional, and deeply considered — every piece in our edit is chosen for the way it makes a quiet morning feel.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <ButtonLink href="/catalogue" size="lg">
            Explore the edit
          </ButtonLink>
          <Link
            href="/catalogue?category=vanity-essentials"
            className="text-sm font-sans tracking-[0.2em] uppercase text-charcoal/70 hover:text-rose-gold transition-colors border-b border-rose-gold/30 pb-1"
          >
            Vanity essentials →
          </Link>
        </div>
      </div>
    </section>
  );
}
