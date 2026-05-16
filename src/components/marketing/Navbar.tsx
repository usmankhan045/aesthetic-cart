import Link from "next/link";
import { BowAccent } from "@/components/ui/BowAccent";

export function Navbar() {
  return (
    <header className="sticky top-0 z-40 backdrop-blur-md bg-cream/80 border-b border-rose-gold/10">
      <nav className="max-w-7xl mx-auto px-6 lg:px-10 h-20 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <BowAccent className="w-8 h-4 transition-transform group-hover:scale-110" />
          <span className="font-serif text-2xl tracking-wide text-charcoal">
            aestheticcart
          </span>
        </Link>
        <ul className="hidden md:flex items-center gap-10 text-xs uppercase tracking-[0.25em] font-sans text-charcoal/80">
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
              Catalogue
            </Link>
          </li>
          <li>
            <Link
              href="/catalogue?category=vanity-essentials"
              className="hover:text-rose-gold transition-colors"
            >
              Vanity
            </Link>
          </li>
          <li>
            <Link
              href="/catalogue?category=desk-aesthetic"
              className="hover:text-rose-gold transition-colors"
            >
              Desk
            </Link>
          </li>
        </ul>
        <Link
          href="/catalogue"
          className="text-xs uppercase tracking-[0.2em] text-rose-gold hover:text-rose-gold-dark transition-colors"
        >
          Shop the edit →
        </Link>
      </nav>
    </header>
  );
}
