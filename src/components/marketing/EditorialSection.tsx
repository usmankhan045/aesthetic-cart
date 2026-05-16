import { BowAccent } from "@/components/ui/BowAccent";

export function EditorialSection() {
  return (
    <section className="bg-ivory py-24">
      <div className="max-w-3xl mx-auto px-6 lg:px-10">
        <article className="text-center">
          <BowAccent className="w-12 h-6 mx-auto mb-6 opacity-50" />
          <p className="font-sans text-xs uppercase tracking-[0.4em] text-rose-gold mb-6">
            Our edit philosophy
          </p>
          <h2 className="font-serif text-4xl lg:text-5xl text-charcoal mb-10 leading-tight">
            We curate the prettiest, most useful things — so you don&rsquo;t have to scroll forever.
          </h2>
          <div className="font-serif text-lg lg:text-xl text-warm-gray leading-loose space-y-6 italic">
            <p>
              Every product on aestheticcart is hand-picked for one reason: the way it elevates the everyday. We focus on the best affordable skincare tools, aesthetic desk accessories for women, and minimalist vanity essentials that look as good as they perform.
            </p>
            <p>
              No noise. No filler. Just a quiet, intentional collection — refreshed weekly — of the items that make a morning feel a little more like a ritual.
            </p>
            <p>
              When you tap &ldquo;Buy on Amazon,&rdquo; you&rsquo;re taken directly to the product page. We earn a small commission at no cost to you, which lets us keep curating without ads or sponsored placements.
            </p>
          </div>
        </article>
      </div>
    </section>
  );
}
