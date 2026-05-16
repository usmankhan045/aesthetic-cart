import Link from "next/link";
import { BowAccent } from "@/components/ui/BowAccent";
import { getCategories } from "@/lib/data";
import { CategoriesNav } from "@/components/marketing/CategoriesNav";

export async function Navbar() {
  const categories = await getCategories();

  return (
    <>
      <header className="sticky top-0 z-40 backdrop-blur-md bg-cream/85 border-b border-rose-gold/10">
        <nav className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-10 h-16 sm:h-20 flex items-center justify-between gap-3">
          <Link href="/" className="flex items-center gap-2 group min-w-0">
            <BowAccent className="w-6 sm:w-8 h-3 sm:h-4 transition-transform group-hover:scale-110 shrink-0" />
            <span className="font-serif text-xl sm:text-2xl tracking-wide text-charcoal truncate">
              aestheticcart
            </span>
          </Link>
          <ul className="flex items-center gap-6 sm:gap-10 text-[10px] sm:text-xs uppercase tracking-[0.2em] sm:tracking-[0.25em] font-sans text-charcoal/80">
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
          </ul>
        </nav>
      </header>

      <CategoriesNav categories={categories} />
    </>
  );
}
