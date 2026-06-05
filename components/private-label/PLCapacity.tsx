'use client';

import { useI18n } from '@/lib/i18n/context';
import SectionLabel from '@/components/SectionLabel';
import RevealHeadline from '@/components/RevealHeadline';
import StatStrip from '@/components/StatStrip';
import Reveal from '@/components/Reveal';

export default function PLCapacity() {
  const { t } = useI18n();
  const cap = t.privateLabel.capacity;

  return (
    <section className="bg-canvas">
      <div className="container-site section-y">
        <div className="max-w-3xl">
          <SectionLabel>{cap.label}</SectionLabel>
          <RevealHeadline
            text={cap.headline}
            className="headline mt-6 text-3xl text-ink sm:text-4xl md:text-5xl"
          />
        </div>
        <div className="mt-16">
          <StatStrip stats={cap.stats} />
        </div>
        <Reveal delay={0.1}>
          <p className="mt-12 border-t border-ink/15 pt-8 font-display text-xl text-ink md:text-2xl">
            {cap.footer}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
