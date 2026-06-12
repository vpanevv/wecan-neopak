'use client';

import { useI18n } from '@/lib/i18n/context';
import Hero from '@/components/home/Hero';
import Marquee from '@/components/cinema/Marquee';
import QuoteStrip from '@/components/home/QuoteStrip';
import WhyWeCan from '@/components/home/WhyWeCan';
import CapacitySection from '@/components/home/CapacitySection';
import LineFilm from '@/components/home/LineFilm';
import Categories from '@/components/home/Categories';
import PromoScene from '@/components/home/PromoScene';
import Process from '@/components/home/Process';
import FactorySection from '@/components/home/FactorySection';
import ClosingCTA from '@/components/ClosingCTA';

export default function HomePage() {
  const { t } = useI18n();

  return (
    <>
      <Hero />
      <Marquee />
      <QuoteStrip />
      <WhyWeCan />
      <CapacitySection />
      <LineFilm />
      <Categories />
      <PromoScene />
      <Process />
      <FactorySection />
      <ClosingCTA
        label={t.home.closing.label}
        headline={t.home.closing.headline}
        body={t.home.closing.body}
        cta={t.home.closing.cta}
      />
    </>
  );
}
