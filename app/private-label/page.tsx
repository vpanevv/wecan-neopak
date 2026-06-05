import type { Metadata } from 'next';
import PrivateLabelContent from './PrivateLabelContent';

export const metadata: Metadata = {
  title: 'Private Label Beverage Production',
  description:
    'Build your beverage brand your way — choose drink type, can size, and decoration. Litho or shrink sleeve from 15,000 cans. EU-compliant, sustainable canning.',
  alternates: {
    canonical: '/private-label',
    languages: {
      en: '/private-label',
      bg: '/private-label',
      'x-default': '/private-label',
    },
  },
  openGraph: {
    title: 'Private Label Beverage Production | We Can Ltd.',
    description:
      'Customize every aspect — beverage type, can size, decoration. Designed for brands that need flexibility without compromise.',
    url: '/private-label',
  },
};

export default function PrivateLabelPage() {
  return <PrivateLabelContent />;
}
