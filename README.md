# aestheticcart

A conversion-rate-optimized affiliate marketing platform with a Clean Girl × Coquette aesthetic.
Built on Next.js 16 (App Router), Prisma 7 + Neon Postgres, and Tailwind CSS v4.

## Quick start

```bash
# 1. Fill in your .env.local
#    DATABASE_URL  / DIRECT_URL  →  from neon.tech
#    ADMIN_PASSWORD               →  your strong password
#    ADMIN_SECRET_KEY             →  32+ chars for JWT signing
#    AMAZON_TAG_US / _UK / _CA / _AU / _DE → your affiliate tags

# 2. Push schema to your Neon DB
npx prisma db push

# 3. Generate the client
npx prisma generate

# 4. Run the dev server
npm run dev

# 5. Visit
#    http://localhost:3000          — public site
#    http://localhost:3000/admin    — admin panel (redirects to /admin/login)
```

## How it works

| Concern | Implementation |
|---|---|
| **Pages** | `src/app/(marketing)/` — Home, Catalogue, Product Detail |
| **Admin** | `src/app/(admin)/admin/` — Login + Dashboard, JWT cookie auth |
| **Scraper** | `src/lib/amazon-scraper.ts` — Cheerio tier 1 + ScraperAPI fallback |
| **ISR** | `revalidatePath` on import/publish/delete → static pages refresh instantly |
| **Geo affiliate tags** | `middleware.ts` reads `x-vercel-ip-country`, `lib/geo.ts` swaps Amazon domain + tag |
| **SEO** | `app/sitemap.ts`, `app/robots.ts`, `generateMetadata` per product |
| **AEO / JSON-LD** | `lib/jsonld.ts` — Product, AggregateRating, Review, BreadcrumbList schemas |
| **Design system** | Tailwind v4 `@theme` in `globals.css` — cream, blush, rose-gold, charcoal |

## Project map

```
src/
├── app/
│   ├── (marketing)/         public site (layout + Navbar/Footer)
│   │   ├── page.tsx                  Home — hero + categories + editorial
│   │   ├── catalogue/page.tsx        Catalogue with filter pills
│   │   ├── products/[slug]/page.tsx  Product detail (ISR + JSON-LD)
│   │   └── not-found.tsx
│   ├── (admin)/             admin panel
│   │   └── admin/
│   │       ├── login/page.tsx        Password form
│   │       └── page.tsx              Dashboard
│   ├── api/
│   │   ├── admin/login/route.ts      Issues JWT cookie
│   │   ├── admin/logout/route.ts
│   │   ├── import/route.ts           Scrape Amazon → DB → revalidate
│   │   ├── categories/route.ts       GET/POST/DELETE
│   │   └── products/[id]/route.ts    PATCH publish / DELETE
│   ├── sitemap.ts           Dynamic from DB
│   ├── robots.ts            Disallows /admin and /api
│   ├── globals.css          Tailwind v4 + design tokens
│   └── layout.tsx           Root: fonts + WebSite JSON-LD
├── components/
│   ├── ui/                  Button, Badge, StarRating, BowAccent
│   ├── marketing/           Navbar, Footer, HeroSection, CategoryGrid,
│   │                        EditorialSection, ProductCard, ProductFilters,
│   │                        ProductGallery, ReviewCard, CrossSellSection
│   └── admin/               ImportForm, CategoryManager, ProductTable, LoginForm
├── lib/
│   ├── prisma.ts            Singleton (Neon adapter)
│   ├── amazon-scraper.ts    ASIN → product data
│   ├── geo.ts               Country → tag/domain + getUserCountry()
│   ├── jsonld.ts            Schema.org generators
│   ├── auth.ts              JWT sign/verify + rate-limit
│   ├── slugify.ts           URL slug helpers
│   └── cn.ts                clsx + tailwind-merge
├── middleware.ts            Admin guard + geo header injection
└── types/index.ts           Shared TypeScript types
```

## Adding a product (happy path)

1. Sign in at `/admin/login`.
2. (First time only) Add a few categories under "Categories" — e.g. 🎀 Vanity Essentials, 🪞 Desk Aesthetic.
3. Paste an Amazon URL into the import form, pick a category, hit **Publish to site**.
4. The scraper extracts title, description, bullets, images, rating, review count, and top reviews.
5. `revalidatePath` is called — the new page is live at `/products/[slug]` within seconds.

## Geo-targeting in action

`middleware.ts` reads `x-vercel-ip-country` (set automatically on Vercel) or `cf-ipcountry` (Cloudflare). It writes `x-user-country` on the response so server components can read it via `headers()`.

On the product page, `getUserCountry()` resolves the country, and `buildAffiliateUrl(asin, country)`:
- Picks the matching domain (`amazon.com`, `amazon.co.uk`, `amazon.ca`, `amazon.com.au`, `amazon.de`)
- Appends the matching `AMAZON_TAG_*` env var
- Falls back to US if the country isn't supported

## Scraper notes

- **Tier 1**: Direct fetch with rotating modern UAs and realistic headers.
- **Tier 2**: ScraperAPI fallback if `SCRAPING_API_KEY` is set.
- **CAPTCHA detection**: Any response that contains Amazon's challenge text or is suspiciously short triggers the fallback.

If Amazon blocks both, the import API returns 502 with the underlying error.

## License

MIT. As an Amazon Associate, this site earns from qualifying purchases.
