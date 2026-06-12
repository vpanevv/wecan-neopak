'use client';

import { useRef } from 'react';
import { gsap, useGSAP, MM_DESKTOP } from '@/lib/gsap';
import { useI18n } from '@/lib/i18n/context';
import SectionLabel from '@/components/SectionLabel';
import RevealHeadline from '@/components/RevealHeadline';
import StatStrip from '@/components/StatStrip';
import AutoVideo from '@/components/cinema/AutoVideo';

// Dark cinematic band: real footage of cans on our filling line runs behind
// the count-up stats, with a slow parallax drift on desktop.
export default function CapacitySection() {
  const { t } = useI18n();
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia(root);
      mm.add(MM_DESKTOP, () => {
        gsap.fromTo(
          '.capacity-video',
          { yPercent: -8 },
          {
            yPercent: 8,
            ease: 'none',
            scrollTrigger: {
              trigger: root.current,
              start: 'top bottom',
              end: 'bottom top',
              scrub: true,
            },
          },
        );
      });
    },
    { scope: root },
  );

  return (
    <section ref={root} className="relative overflow-hidden bg-ink text-canvas">
      {/* Production line footage, dimmed under the content */}
      <div className="absolute inset-0" aria-hidden>
        <AutoVideo
          src="/videos/line-conveyor.mp4"
          poster="/videos/poster-line.jpg"
          label={t.media.lineVideoLabel}
          className="capacity-video h-[120%] w-full scale-105 object-cover opacity-35"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-ink via-ink/60 to-ink" />
      </div>

      <div className="container-site section-y relative">
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

        <p className="mt-14 flex items-center gap-3 text-xs uppercase tracking-label text-aluminum">
          <span className="inline-block h-2 w-2 animate-pulse rounded-full bg-ember" aria-hidden />
          {t.home.capacity.caption}
        </p>
      </div>
    </section>
  );
}
