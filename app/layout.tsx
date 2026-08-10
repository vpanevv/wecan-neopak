import type { Metadata } from 'next';
import { Inter, JetBrains_Mono } from 'next/font/google';
import './globals.css';
import { I18nProvider } from '@/lib/i18n/context';
import { OG_IMAGE } from '@/lib/seo';
import SmoothScroll from '@/components/SmoothScroll';
import LocaleCrossfade from '@/components/LocaleCrossfade';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';

const inter = Inter({
  subsets: ['latin', 'cyrillic'],
  display: 'swap',
  variable: '--font-inter',
  weight: ['400', '500', '600'],
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-mono',
  weight: ['400', '500'],
});

const SITE_URL = 'https://wecan.bg';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'We Can Ltd. — Bulgarian Beverage Canning & Private Label Production',
    template: '%s | We Can Ltd.',
  },
  description:
    'Flexible aluminum can production for energy, functional, sports, and soft drinks. Private label co-packing from 15,000-can short runs to full-scale series. EU-compliant, sustainable, competitively priced.',
  keywords: [
    'beverage canning',
    'private label drinks',
    'aluminum cans',
    'energy drink co-packing',
    'Bulgaria beverage manufacturer',
    'contract canning',
  ],
  alternates: {
    canonical: '/',
    languages: {
      en: '/',
      bg: '/',
      'x-default': '/',
    },
  },
  openGraph: {
    type: 'website',
    url: SITE_URL,
    siteName: 'We Can Ltd.',
    title: 'We Can Ltd. — Bulgarian Beverage Canning & Private Label Production',
    description:
      'Flexible aluminum can production for energy, functional, sports, and soft drinks. From 15,000-can short runs to full-scale series.',
    locale: 'en_US',
    alternateLocale: ['bg_BG'],
    images: [OG_IMAGE],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'We Can Ltd. — Bulgarian Beverage Canning & Private Label',
    description:
      'Flexible aluminum can production for energy, functional, sports, and soft drinks.',
    images: [OG_IMAGE.url],
  },
  robots: { index: true, follow: true },
};

// Schema.org Organization + LocalBusiness markup for SEO.
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': ['Organization', 'LocalBusiness'],
  name: 'We Can Ltd.',
  description:
    'Bulgarian beverage canning facility specializing in private label production of energy drinks, functional beverages, sports drinks, and soft drinks in aluminum cans.',
  url: SITE_URL,
  email: 'info@wecan-bg.com',
  address: {
    '@type': 'PostalAddress',
    addressCountry: 'BG',
  },
  areaServed: 'Worldwide',
  knowsAbout: [
    'Beverage canning',
    'Private label production',
    'Energy drinks',
    'Functional beverages',
    'Sports drinks',
    'Soft drinks',
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <body className="font-sans antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <I18nProvider>
          <SmoothScroll />
          <Nav />
          <main>
            <LocaleCrossfade>{children}</LocaleCrossfade>
          </main>
          <Footer />
        </I18nProvider>
      </body>
    </html>
  );
}
