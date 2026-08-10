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
