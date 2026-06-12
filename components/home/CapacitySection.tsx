'use client';

import { useI18n } from '@/lib/i18n/context';
import SectionLabel from '@/components/SectionLabel';
import RevealHeadline from '@/components/RevealHeadline';
import StatStrip from '@/components/StatStrip';

// Dark stats band — clean and solid. The production-line film lives in its
// own dedicated LineFilm section right after, at full brightness.
export default function CapacitySection() {
  const { t } = useI18n();

  return (
    <section className="bg-ink text-canvas">
      <div className="container-site section-y">
        <div className="max-w-3xl">
          <SectionLabel variant="invert">{t.home.capacity.label}</SectionLabel>
          <RevealHeadline
            text={t.home.capacity.headline}
            className="headline mt-6 text-4xl text-canvas sm:text-5xl md:text-6xl"
          />
        </div>

        <div className="mt-16 md:mt-20">
          <StatStrip stats={t.home.capacity.stats} dark />
        </div>
      </div>
    </section>
  );
}
