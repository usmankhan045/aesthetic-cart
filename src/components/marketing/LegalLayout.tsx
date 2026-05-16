import { BowAccent } from "@/components/ui/BowAccent";

interface LegalLayoutProps {
  title: string;
  subtitle?: string;
  lastUpdated?: string;
  children: React.ReactNode;
}

export function LegalLayout({
  title,
  subtitle,
  lastUpdated,
  children,
}: LegalLayoutProps) {
  return (
    <div className="bg-cream min-h-screen">
      <header className="bg-gradient-to-b from-blush/30 to-cream pt-16 sm:pt-24 pb-10 sm:pb-12">
        <div className="max-w-3xl mx-auto px-5 sm:px-6 lg:px-10 text-center">
          <BowAccent className="w-10 sm:w-12 h-5 sm:h-6 mx-auto mb-4 sm:mb-6 opacity-60" />
          <p className="font-sans text-[10px] sm:text-xs uppercase tracking-[0.4em] text-rose-gold mb-3 sm:mb-4">
            Legal
          </p>
          <h1 className="font-serif text-3xl sm:text-5xl text-charcoal mb-3 sm:mb-4 leading-tight">
            {title}
          </h1>
          {subtitle && (
            <p className="font-serif italic text-warm-gray text-base sm:text-lg max-w-xl mx-auto">
              {subtitle}
            </p>
          )}
          {lastUpdated && (
            <p className="mt-4 sm:mt-6 text-[10px] sm:text-xs uppercase tracking-[0.25em] text-warm-gray font-sans">
              Last updated: {lastUpdated}
            </p>
          )}
        </div>
      </header>

      <article className="max-w-3xl mx-auto px-5 sm:px-6 lg:px-10 py-10 sm:py-16">
        <div className="prose-legal font-sans text-charcoal/90 leading-relaxed text-[15px] sm:text-base space-y-6">
          {children}
        </div>
      </article>
    </div>
  );
}
