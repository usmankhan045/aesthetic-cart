import { BowAccent } from "@/components/ui/BowAccent";
import { ButtonLink } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-6 text-center">
      <div>
        <BowAccent className="w-16 h-8 mx-auto mb-6 opacity-60" />
        <p className="font-sans text-xs uppercase tracking-[0.4em] text-rose-gold mb-4">
          A small detour
        </p>
        <h1 className="font-serif text-6xl text-charcoal mb-4">
          Page not found
        </h1>
        <p className="font-serif italic text-warm-gray text-lg mb-10 max-w-md mx-auto">
          The page you&rsquo;re looking for has slipped out of the edit.
        </p>
        <ButtonLink href="/" size="lg">
          Return home
        </ButtonLink>
      </div>
    </div>
  );
}
