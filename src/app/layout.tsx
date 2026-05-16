import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import "./globals.css";
import { generateWebSiteSchema, jsonLdScript } from "@/lib/jsonld";

const cormorant = Cormorant_Garamond({
  variable: "--font-serif-google",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-sans-google",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
const SITE_NAME = "aestheticcart";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "aestheticcart — Curated aesthetic finds for her",
    template: "%s · aestheticcart",
  },
  description:
    "A quietly curated edit of the prettiest, most useful pieces for the girl who has taste. Clean Girl meets Coquette, hand-picked weekly.",
  openGraph: {
    title: "aestheticcart — Curated aesthetic finds for her",
    description:
      "A quietly curated edit of the prettiest, most useful pieces for the girl who has taste.",
    type: "website",
    url: SITE_URL,
    siteName: SITE_NAME,
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${inter.variable} h-full antialiased`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: jsonLdScript(generateWebSiteSchema(SITE_URL, SITE_NAME)),
          }}
        />
      </head>
      <body className="min-h-full flex flex-col font-sans">{children}</body>
    </html>
  );
}
