import type { Metadata } from "next";
import { LegalLayout } from "@/components/marketing/LegalLayout";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How aestheticcart collects, uses, and protects your information when you browse our curated edit.",
};

export default function PrivacyPage() {
  return (
    <LegalLayout
      title="Privacy Policy"
      subtitle="How we collect, use, and protect your information."
      lastUpdated="May 2026"
    >
      <p>
        This Privacy Policy explains how aestheticcart (&ldquo;we&rdquo;,
        &ldquo;us&rdquo;, &ldquo;our&rdquo;) handles information when you visit
        our website. We are committed to being transparent about what we
        collect and how it&rsquo;s used.
      </p>

      <h2>Information we collect</h2>
      <p>
        aestheticcart is a curated affiliate catalog. We do not require
        accounts, logins, or purchases on this site. The information we may
        receive includes:
      </p>
      <ul>
        <li>
          <strong>Automatically collected data</strong>: your IP address,
          browser type, device type, referring page, and country (used to
          serve the correct regional Amazon affiliate link).
        </li>
        <li>
          <strong>Usage data</strong>: pages visited, time spent, and
          interactions, collected through our hosting provider (Vercel) for
          performance and abuse-prevention purposes.
        </li>
        <li>
          <strong>Cookies</strong>: technical cookies required for site
          functionality (see our Cookie Policy).
        </li>
      </ul>
      <p>
        We do <strong>not</strong> collect names, email addresses, phone
        numbers, payment information, or other personal contact details from
        regular visitors.
      </p>

      <h2>How we use information</h2>
      <ul>
        <li>To deliver pages and content efficiently to your region.</li>
        <li>
          To direct you to the correct Amazon storefront (e.g. amazon.com,
          amazon.co.uk) when you click an affiliate link.
        </li>
        <li>To monitor site performance, security, and uptime.</li>
        <li>To comply with applicable laws and prevent fraud or abuse.</li>
      </ul>

      <h2>Third-party services</h2>
      <p>
        When you click a &ldquo;Buy Now&rdquo; link, you are redirected to
        Amazon. From that point on, Amazon&rsquo;s own Privacy Policy applies.
        We have no access to your purchase, payment, or account information on
        Amazon. We may receive aggregated commission reporting from the Amazon
        Associates program but never any personally identifiable information.
      </p>
      <p>
        We use the following third-party providers to operate this site:
      </p>
      <ul>
        <li>
          <strong>Vercel</strong>: hosting, edge delivery, and basic analytics.
        </li>
        <li>
          <strong>Neon</strong>: database hosting for our product catalog
          (does not store any visitor information).
        </li>
        <li>
          <strong>Amazon Associates</strong>: affiliate link program.
        </li>
      </ul>

      <h2>Your rights</h2>
      <p>
        Depending on your location, you may have the right to access, correct,
        or delete information about you, or to object to its processing. Since
        we do not collect personal contact data from visitors, most rights
        requests do not apply. If you believe we hold information about you
        and you wish to exercise your rights, contact us at the address below.
      </p>
      <p>
        <strong>EU/UK residents (GDPR)</strong>: you may lodge a complaint
        with your local data protection authority if you believe your rights
        have been infringed.
      </p>
      <p>
        <strong>California residents (CCPA/CPRA)</strong>: we do not sell or
        share personal information for cross-context behavioral advertising.
      </p>

      <h2>Data security</h2>
      <p>
        We use industry-standard security practices including HTTPS
        encryption, secure cookies, and access-controlled infrastructure. No
        system is perfectly secure, however, and we cannot guarantee absolute
        protection of any information transmitted to or from our site.
      </p>

      <h2>Children&rsquo;s privacy</h2>
      <p>
        Our site is not directed at children under 13, and we do not knowingly
        collect information from children. If you believe a child has provided
        information to us, please contact us so we can remove it.
      </p>

      <h2>Changes to this policy</h2>
      <p>
        We may update this policy from time to time. The &ldquo;Last
        updated&rdquo; date at the top of this page reflects the most recent
        revision. Material changes will be highlighted on this page.
      </p>

      <h2>Contact</h2>
      <p>
        Questions about this policy? Reach us at{" "}
        <a href="mailto:hello@aestheticcart.com">hello@aestheticcart.com</a>.
      </p>
    </LegalLayout>
  );
}
