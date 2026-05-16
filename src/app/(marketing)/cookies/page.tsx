import type { Metadata } from "next";
import { LegalLayout } from "@/components/marketing/LegalLayout";

export const metadata: Metadata = {
  title: "Cookie Policy",
  description:
    "The cookies aestheticcart uses, what they do, and how you can control them.",
};

export default function CookiesPage() {
  return (
    <LegalLayout
      title="Cookie Policy"
      subtitle="What cookies we use and why."
      lastUpdated="May 2026"
    >
      <p>
        This Cookie Policy explains how aestheticcart (&ldquo;we&rdquo;,
        &ldquo;us&rdquo;) uses cookies and similar technologies. It should be
        read alongside our <a href="/privacy">Privacy Policy</a>.
      </p>

      <h2>What are cookies?</h2>
      <p>
        Cookies are small text files placed on your device by a website. They
        are widely used to make websites work, or work more efficiently, and
        to provide information to the operators of the site. Cookies can be
        &ldquo;first-party&rdquo; (set by us) or &ldquo;third-party&rdquo;
        (set by a service we use).
      </p>

      <h2>Cookies we use</h2>
      <h3>Strictly necessary cookies</h3>
      <p>
        These cookies are required for the site to function. Without them,
        core features will not work.
      </p>
      <ul>
        <li>
          <strong>ac_admin_token</strong>: an authentication cookie used only
          by our internal admin panel. Set when an administrator signs in.
          Not used by, or visible to, regular visitors. Expires after 7 days.
          HttpOnly and Secure flags enabled.
        </li>
      </ul>

      <h3>Performance &amp; analytics cookies</h3>
      <p>
        Our hosting provider (Vercel) may set anonymous cookies to measure
        page load times, errors, and broad usage patterns. This data is
        aggregated and does not personally identify you.
      </p>

      <h3>Third-party cookies</h3>
      <p>
        When you click a &ldquo;Buy Now&rdquo; link, you are redirected to
        Amazon. Amazon will set its own cookies on its own domain. We have no
        control over and no access to those cookies. Please refer to{" "}
        <a
          href="https://www.amazon.com/gp/help/customer/display.html?nodeId=GX7NJQ4ZB8MHFRNJ"
          target="_blank"
          rel="noopener noreferrer"
        >
          Amazon&rsquo;s Cookie Notice
        </a>{" "}
        for details.
      </p>

      <h2>Managing cookies</h2>
      <p>
        Most browsers let you refuse cookies or delete existing ones. The
        exact steps depend on your browser:
      </p>
      <ul>
        <li>
          <strong>Chrome</strong>: Settings → Privacy and security → Cookies
          and other site data.
        </li>
        <li>
          <strong>Safari</strong>: Settings → Privacy → Manage Website Data.
        </li>
        <li>
          <strong>Firefox</strong>: Settings → Privacy &amp; Security →
          Cookies and Site Data.
        </li>
        <li>
          <strong>Edge</strong>: Settings → Cookies and site permissions →
          Manage and delete cookies and site data.
        </li>
      </ul>
      <p>
        Blocking the strictly necessary cookie listed above will prevent
        admin sign-in, but will not affect your ability to browse the public
        catalog.
      </p>

      <h2>Changes to this policy</h2>
      <p>
        We may update this Cookie Policy as we add or change features.
        Material changes will be reflected in the &ldquo;Last updated&rdquo;
        date at the top of this page.
      </p>

      <h2>Contact</h2>
      <p>
        Questions? Reach us at{" "}
        <a href="mailto:hello@aestheticcart.com">hello@aestheticcart.com</a>.
      </p>
    </LegalLayout>
  );
}
