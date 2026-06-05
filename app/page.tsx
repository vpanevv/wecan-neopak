'use client';

import { useI18n } from '@/lib/i18n/context';
import Hero from '@/components/home/Hero';
import QuoteStrip from '@/components/home/QuoteStrip';
import WhyWeCan from '@/components/home/WhyWeCan';
import CapacitySection from '@/components/home/CapacitySection';
import Categories from '@/components/home/Categories';
import Process from '@/components/home/Process';
import ClosingCTA from '@/components/ClosingCTA';

export default function HomePage() {
  const { t } = useI18n();

  return (
    <>
      <Hero />
      <QuoteStrip />
      <WhyWeCan />
      <CapacitySection />
      <Categories />
      <Process />
      <ClosingCTA
        label={t.home.closing.label}
        headline={t.home.closing.headline}
        body={t.home.closing.body}
        cta={t.home.closing.cta}
      />
    </>
  );
}
