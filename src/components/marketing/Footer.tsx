import Link from "next/link";
import { BowAccent } from "@/components/ui/BowAccent";

export function Footer() {
  return (
    <footer className="mt-20 sm:mt-32 border-t border-rose-gold/10 bg-ivory">
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-10 py-12 sm:py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 sm:gap-12">
          <div className="col-span-2 md:col-span-2">
            <div className="flex items-center gap-2 mb-4 sm:mb-6">
              <BowAccent className="w-8 h-4" />
              <span className="font-serif text-2xl text-charcoal">
                aestheticcart
              </span>
            </div>
            <p className="font-serif text-warm-gray italic text-base sm:text-lg max-w-md leading-relaxed">
              A curated collection of pretty things for the girl who notices the details.
            </p>
          </div>
          <div>
            <h3 className="font-sans text-xs uppercase tracking-[0.2em] text-charcoal mb-5">
              Explore
            </h3>
            <ul className="space-y-3 text-sm text-warm-gray">
              <li>
                <Link href="/" className="hover:text-rose-gold transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/catalogue"
                  className="hover:text-rose-gold transition-colors"
                >
                  Full Catalogue
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-sans text-xs uppercase tracking-[0.2em] text-charcoal mb-5">
              Legal
            </h3>
            <ul className="space-y-3 text-sm text-warm-gray">
              <li>
                <Link
                  href="/privacy"
                  className="hover:text-rose-gold transition-colors"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="hover:text-rose-gold transition-colors"
                >
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link
                  href="/affiliate-disclosure"
                  className="hover:text-rose-gold transition-colors"
                >
                  Affiliate Disclosure
                </Link>
              </li>
              <li>
                <Link
                  href="/cookies"
                  className="hover:text-rose-gold transition-colors"
                >
                  Cookie Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-12 sm:mt-16 pt-6 sm:pt-8 border-t border-rose-gold/10 flex flex-col md:flex-row items-center justify-between gap-3 sm:gap-4 text-[10px] sm:text-xs text-warm-gray/80 font-sans tracking-wide text-center md:text-left">
          <p>© {new Date().getFullYear()} aestheticcart. All edits reserved.</p>
          <p className="italic font-serif">
            As an Amazon Associate, we earn from qualifying purchases.
          </p>
        </div>
      </div>
    </footer>
  );
}
