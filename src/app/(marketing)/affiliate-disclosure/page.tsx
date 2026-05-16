import type { Metadata } from "next";
import { LegalLayout } from "@/components/marketing/LegalLayout";

export const metadata: Metadata = {
  title: "Affiliate Disclosure",
  description:
    "How aestheticcart earns commissions through the Amazon Associates program, and our commitment to honest curation.",
};

export default function AffiliateDisclosurePage() {
  return (
    <LegalLayout
      title="Affiliate Disclosure"
      subtitle="Transparency about how we earn from the products we feature."
      lastUpdated="May 2026"
    >
      <p>
        We want to be upfront with you about how aestheticcart works
        financially. This page explains our relationship with the Amazon
        Associates program and what it means when you click a link on our
        site.
      </p>

      <h2>FTC-required statement</h2>
      <p>
        <strong>
          aestheticcart is a participant in the Amazon Services LLC Associates
          Program, an affiliate advertising program designed to provide a
          means for sites to earn advertising fees by advertising and linking
          to Amazon.com and affiliated marketplaces (amazon.co.uk, amazon.ca,
          amazon.com.au, and others).
        </strong>
      </p>
      <p>
        As an Amazon Associate, we earn from qualifying purchases.
      </p>

      <h2>What this means in plain English</h2>
      <p>
        Every &ldquo;Buy Now&rdquo; button on this site contains a tracking
        code that identifies us as the referrer to Amazon. If you click
        through one of those links and complete a qualifying purchase within
        a short window (usually 24 hours), Amazon pays us a small commission.
      </p>
      <p>
        <strong>You pay the exact same price.</strong> The commission comes
        out of Amazon&rsquo;s margin, not your wallet. The cost to you is
        identical whether you reach Amazon through us, through a search
        engine, or by typing the URL directly.
      </p>

      <h2>How we curate</h2>
      <p>
        Our editorial selections are based on our own judgment about
        aesthetics, quality, reviews, and value. We do not accept payment or
        sponsored placements in exchange for featuring a product. The fact
        that a product appears on aestheticcart should not be interpreted as
        an endorsement of any specific seller or claim of guaranteed quality.
      </p>
      <p>
        We also do not edit, hide, or modify reviews to make a product look
        better than it is. The star ratings and review snippets shown on
        product pages come directly from Amazon.
      </p>

      <h2>Geographic affiliate routing</h2>
      <p>
        We detect your country and direct you to the closest Amazon
        marketplace (for example, visitors from the UK are sent to
        amazon.co.uk). This is for your convenience: pricing, shipping, and
        product availability differ between marketplaces.
      </p>

      <h2>Price and availability accuracy</h2>
      <p>
        Amazon prices can change minute by minute. We refresh prices
        periodically but the price shown on aestheticcart may differ from the
        live price on Amazon at the moment you click through. <strong>The
        price you see on Amazon&rsquo;s checkout is the authoritative price.</strong>
      </p>

      <h2>Why we tell you this</h2>
      <p>
        Federal Trade Commission rules require that affiliate relationships
        be disclosed clearly. Beyond the legal requirement, we believe
        transparency builds trust. You deserve to know how the lights stay on.
      </p>

      <h2>Contact</h2>
      <p>
        If you have questions about our affiliate practices, email us at{" "}
        <a href="mailto:hello@aestheticcart.com">hello@aestheticcart.com</a>.
      </p>
    </LegalLayout>
  );
}
