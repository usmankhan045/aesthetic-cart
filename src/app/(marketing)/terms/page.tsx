import type { Metadata } from "next";
import { LegalLayout } from "@/components/marketing/LegalLayout";

export const metadata: Metadata = {
  title: "Terms of Service",
  description:
    "The terms that govern your use of the aestheticcart website and our curated affiliate catalog.",
};

export default function TermsPage() {
  return (
    <LegalLayout
      title="Terms of Service"
      subtitle="The rules of the road for using our site."
      lastUpdated="May 2026"
    >
      <p>
        Welcome to aestheticcart. By accessing or using this website
        (&ldquo;the Site&rdquo;), you agree to be bound by these Terms of
        Service. If you do not agree, please do not use the Site.
      </p>

      <h2>1. About the Site</h2>
      <p>
        aestheticcart is an editorial affiliate catalog. We curate and feature
        products available for purchase on third-party retailers such as
        Amazon. We do not sell, fulfill, or ship products directly. When you
        click a &ldquo;Buy Now&rdquo; button you will be redirected to the
        retailer&rsquo;s website, where their own terms and conditions apply.
      </p>

      <h2>2. Use of the Site</h2>
      <p>You agree to use the Site only for lawful purposes. You agree not to:</p>
      <ul>
        <li>Scrape, copy, or reproduce content without written permission.</li>
        <li>
          Interfere with, disrupt, or attempt to gain unauthorized access to
          our systems or networks.
        </li>
        <li>
          Use automated tools (bots, crawlers, scripts) to access the Site,
          except for compliant search-engine indexing.
        </li>
        <li>
          Misrepresent your relationship with aestheticcart in any communication.
        </li>
      </ul>

      <h2>3. Intellectual property</h2>
      <p>
        All editorial content on aestheticcart, including text, design,
        graphics, logos, and the overall &ldquo;look and feel&rdquo;, is owned
        by us or our licensors and protected by copyright and trademark laws.
        Product images, titles, descriptions, and reviews are property of
        their respective owners (typically Amazon and product manufacturers)
        and used here in accordance with the Amazon Associates program terms.
      </p>

      <h2>4. Affiliate links and external sites</h2>
      <p>
        The Site contains affiliate links to Amazon. When you make a purchase
        through these links, we may earn a commission at no extra cost to you.
        See our{" "}
        <a href="/affiliate-disclosure">Affiliate Disclosure</a> for details.
      </p>
      <p>
        We are not responsible for the content, products, services, or
        policies of any third-party site you reach by clicking a link from the
        Site. Your interactions with those sites are governed by their own
        terms and privacy policies.
      </p>

      <h2>5. Product information</h2>
      <p>
        We aim to keep product titles, descriptions, prices, ratings, and
        images accurate and current. However, this data is sourced from
        Amazon and may change at any time. Prices, availability, and product
        details shown on the Site are <strong>not guaranteed</strong>. Always
        verify the final price and product specifications on Amazon before
        purchasing.
      </p>

      <h2>6. Disclaimer of warranties</h2>
      <p>
        The Site is provided &ldquo;as is&rdquo; and &ldquo;as available&rdquo;
        without warranties of any kind, express or implied. We do not warrant
        that the Site will be uninterrupted, error-free, secure, or
        virus-free, nor that any defects will be corrected.
      </p>

      <h2>7. Limitation of liability</h2>
      <p>
        To the fullest extent permitted by law, aestheticcart and its
        operators shall not be liable for any indirect, incidental, special,
        consequential, or punitive damages, or any loss of profits, revenue,
        data, or use, arising out of or in connection with your use of the
        Site, even if we have been advised of the possibility of such damages.
      </p>

      <h2>8. Indemnification</h2>
      <p>
        You agree to indemnify and hold harmless aestheticcart, its operators,
        contractors, and agents from any claims, damages, or expenses arising
        from your use of the Site or your violation of these Terms.
      </p>

      <h2>9. Changes to the Site or Terms</h2>
      <p>
        We may modify, suspend, or discontinue any part of the Site at any
        time without notice. We may also update these Terms from time to time.
        The &ldquo;Last updated&rdquo; date at the top reflects the most
        recent revision. Continued use of the Site after changes constitutes
        acceptance.
      </p>

      <h2>10. Governing law</h2>
      <p>
        These Terms are governed by the laws of the jurisdiction in which the
        Site operator is established, without regard to conflict-of-law
        principles. Any disputes shall be resolved in the courts of that
        jurisdiction.
      </p>

      <h2>11. Contact</h2>
      <p>
        Questions about these Terms? Reach us at{" "}
        <a href="mailto:hello@aestheticcart.com">hello@aestheticcart.com</a>.
      </p>
    </LegalLayout>
  );
}
