function normalizeOrigin(value?: string): string | null {
  if (!value) return null;
  const trimmed = value.trim().replace(/\/+$/, '');
  return /^https?:\/\//.test(trimmed) ? trimmed : null;
}

// Absolute origin the site is served from, used for canonical tags, the
// sitemap, robots.txt and og:image.
//
// Netlify sets `URL` at build time to the site's *primary* address, and that
// becomes the custom domain automatically once one is attached — so this
// follows the real deployment instead of a hardcoded guess. (Deliberately not
// DEPLOY_PRIME_URL: that points at branch/preview deploys, which must never
// appear in a canonical.) NEXT_PUBLIC_SITE_URL overrides for other hosts.
export const SITE_URL =
  normalizeOrigin(process.env.NEXT_PUBLIC_SITE_URL) ??
  normalizeOrigin(process.env.URL) ??
  'https://wecan-bg.netlify.app';

// Shared social preview image (Facebook, LinkedIn, X, iMessage, Slack).
//
// Declared on every route rather than inherited: Next.js merges `metadata`
// shallowly, so a segment that defines its own `openGraph` block drops the
// parent's `images` instead of inheriting it. Resolved to an absolute URL via
// `metadataBase` in the root layout, which crawlers require.
export const OG_IMAGE = {
  url: '/og-image.png',
  width: 1200,
  height: 630,
  alt: 'We Can Ltd. — Canning Solutions',
} as const;
