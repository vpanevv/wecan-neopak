import type { MetadataRoute } from 'next';

const SITE_URL = 'https://wecan.bg';

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ['', '/private-label', '/contact'];
  const now = new Date();
  return routes.map((route) => ({
    url: `${SITE_URL}${route}`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: route === '' ? 1 : 0.8,
    alternates: {
      languages: {
        en: `${SITE_URL}${route}`,
        bg: `${SITE_URL}${route}`,
      },
    },
  }));
}
