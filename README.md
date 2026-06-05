# We Can Ltd. — Bilingual B2B Site

A premium, modern, bilingual (EN/BG) marketing site for **We Can Ltd.**, a Bulgarian
beverage canning facility specializing in private-label production of energy,
functional, sports, and soft drinks in aluminum cans.

Built for international beverage brand owners, startups, and entrepreneurs looking
for a flexible co-packing partner.

## Tech stack

- **Next.js 14** (App Router) + **TypeScript**
- **Tailwind CSS** — premium-minimal design system
- **Framer Motion** — slow, intentional entrance animations (transform/opacity only)
- **Lenis** (`@studio-freight/lenis`) — global smooth scroll
- **next/image** — optimized, lazy, blur-up placeholders
- Custom lightweight **i18n** (EN/BG) with `localStorage` persistence + browser detection
- **Lucide** icons
- Contact form → **Next.js API route + Nodemailer**
- Deploy-ready for **Netlify**

## Getting started

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm run start    # serve the production build
```

## Project structure

```
app/
  layout.tsx              Root layout: fonts, providers, Nav/Footer, schema.org, SEO
  page.tsx                Home
  private-label/          Private Label page (server metadata + client content)
  contact/                Contact page (server metadata + client content)
  api/contact/route.ts    Inquiry form handler (Nodemailer)
  sitemap.ts, robots.ts   SEO
components/
  Nav, Footer, Wordmark, LanguageToggle, SmoothScroll, LocaleCrossfade
  RevealHeadline, Reveal, SectionLabel, StatStrip, CountUp, CanComposition
  EditorialImage, ClosingCTA
  home/                   Home page sections
  private-label/          Private Label page sections
  contact/ContactForm.tsx The inquiry form
lib/
  i18n/dictionary.ts      All EN/BG copy (single source of truth)
  i18n/context.tsx        Locale provider + useI18n() hook
  animations.ts           Shared Framer Motion variants + easeOutCubic
  images.ts               Centralized photography sources + bilingual alt text
```

## Internationalization

All copy lives in [`lib/i18n/dictionary.ts`](lib/i18n/dictionary.ts), keyed by locale
(`en` / `bg`). Components read it via the `useI18n()` hook. The EN/BG toggle in the
nav crossfades content, persists the choice in `localStorage`, defaults to **English**
for the international audience, and auto-detects Bulgarian browsers on first visit.

To edit copy, change the strings in the dictionary — both languages are side by side.

## Contact form / email

The form posts to `/api/contact`, which sends the inquiry via Nodemailer.

1. Copy `.env.example` to `.env.local`.
2. Fill in the SMTP credentials and the destination address.
   > **TODO:** Configure with the client's actual email address + SMTP provider.

```
SMTP_HOST=…
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=…
SMTP_PASS=…
CONTACT_TO_EMAIL=hello@wecan.bg
CONTACT_FROM_EMAIL=website@wecan.bg
```

If SMTP is not configured, the API logs the inquiry server-side and still returns a
success response, so the form flow is testable before credentials are provided.

## Photography

Product visuals (hero, can sizes) are rendered as crisp, unbranded **SVG can
compositions** ([`components/CanComposition.tsx`](components/CanComposition.tsx)) — no
competitor branding, always sharp. Atmospheric photos use placeholder Unsplash images
defined in [`lib/images.ts`](lib/images.ts) with bilingual alt text.

> **TODO:** When the client provides real photography, swap the sources in
> `lib/images.ts` (and optionally replace `CanComposition` with studio photos via
> `next/image`), keeping the bilingual `alt` text and `priority`/blur settings.

## Placeholders to replace before launch

Search the codebase for `TODO`:

- Contact address / email / phone (`lib/i18n/dictionary.ts`, Footer, schema.org in `app/layout.tsx`)
- SMTP credentials (`.env`)
- Product & facility photography (`lib/images.ts`, `CanComposition`)
- The site URL `https://wecan.bg` (used in metadata, sitemap, robots) if different

## Performance & accessibility

- All animations are GPU-accelerated (transform/opacity only)
- Scroll reveals use `viewport={{ once: true }}`; `useScroll` is scoped to refs
- Global Lenis smooth scroll; `prefers-reduced-motion` respected (CSS + Framer `MotionConfig`)
- `next/image` everywhere with `sizes`, blur placeholders, and `priority` on heroes
- Keyboard-navigable form with required-field + email validation and visible focus rings
- Schema.org `Organization`/`LocalBusiness`, hreflang alternates, Open Graph, sitemap, robots

## Deploy (Netlify)

`netlify.toml` is included with the official Next.js plugin. Connect the repo, set the
env vars above in the Netlify dashboard, and deploy. Build command `npm run build`,
publish `.next`.

---

Designed by [Vladimir Panev](https://vladimirpanev.com).
