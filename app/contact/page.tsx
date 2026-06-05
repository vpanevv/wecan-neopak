import type { Metadata } from 'next';
import ContactContent from './ContactContent';

export const metadata: Metadata = {
  title: 'Request Your Private Label Offer',
  description:
    'Tell us about your beverage concept, volume, and timeline. Our team responds with a personalized private label canning offer within 2 business days.',
  alternates: {
    canonical: '/contact',
    languages: {
      en: '/contact',
      bg: '/contact',
      'x-default': '/contact',
    },
  },
  openGraph: {
    title: 'Request Your Private Label Offer | We Can Ltd.',
    description:
      'Request a personalized private label canning offer. We respond within 2 business days.',
    url: '/contact',
  },
};

export default function ContactPage() {
  return <ContactContent />;
}
