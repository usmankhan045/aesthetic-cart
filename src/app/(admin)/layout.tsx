import Link from "next/link";
import { BowAccent } from "@/components/ui/BowAccent";

export const metadata = {
  title: "Admin",
  robots: { index: false, follow: false },
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col bg-cream">
      <header className="border-b border-rose-gold/10 bg-white/70 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 h-16 flex items-center justify-between">
          <Link href="/admin" className="flex items-center gap-2">
            <BowAccent className="w-6 h-3" />
            <span className="font-serif text-xl text-charcoal">
              aestheticcart
            </span>
            <span className="ml-2 text-[10px] uppercase tracking-[0.3em] text-rose-gold border border-rose-gold/30 rounded-full px-2 py-0.5 font-sans">
              admin
            </span>
          </Link>
          <Link
            href="/"
            target="_blank"
            className="text-xs uppercase tracking-[0.2em] text-warm-gray hover:text-rose-gold font-sans"
          >
            View site →
          </Link>
        </div>
      </header>
      <main className="flex-1">{children}</main>
    </div>
  );
}
