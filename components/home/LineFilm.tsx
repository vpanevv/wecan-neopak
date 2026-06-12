'use client';

import { useRef } from 'react';
import { gsap, useGSAP, MM_DESKTOP, MM_ANY_MOTION } from '@/lib/gsap';
import { useI18n } from '@/lib/i18n/context';
import SectionLabel from '@/components/SectionLabel';
import RevealHeadline from '@/components/RevealHeadline';
import AutoVideo from '@/components/cinema/AutoVideo';

// Dedicated film section: the conveyor footage at full brightness, expanding
// from an inset frame to near full-bleed as it scrolls through the viewport.
// No dark wash — the line is the hero here.
export default function LineFilm() {
  const { t } = useI18n();
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia(root);

      // Scroll expansion + a slow counter-drift of the headline.
      mm.add(MM_DESKTOP, () => {
        gsap.fromTo(
          '.film-frame',
          { scale: 0.8, yPercent: 5 },
          {
            scale: 1,
            yPercent: 0,
            ease: 'none',
            scrollTrigger: {
              trigger: root.current,
              start: 'top 85%',
              end: 'center center',
              scrub: 0.5,
            },
          },
        );
        gsap.fromTo(
          '.film-headline',
          { xPercent: 4 },
          {
            xPercent: -4,
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

      // Caption chip eases in once the frame is mostly visible.
      mm.add(MM_ANY_MOTION, () => {
        gsap.from('.film-caption', {
          y: 20,
          autoAlpha: 0,
          duration: 0.7,
          ease: 'power3.out',
          scrollTrigger: { trigger: root.current, start: 'top 45%', once: true },
        });
      });
    },
    { scope: root },
  );

  return (
    <section ref={root} className="overflow-hidden bg-canvas pb-24 pt-20 md:pb-32 md:pt-28">
      <div className="container-site">
        <SectionLabel>{t.home.lineFilm.label}</SectionLabel>
        <div className="film-headline">
          <RevealHeadline
            text={t.home.lineFilm.headline}
            className="headline mt-6 max-w-4xl text-3xl text-ink sm:text-4xl md:text-5xl"
          />
        </div>
      </div>

      {/* Expanding frame — full brightness, no overlay wash */}
      <div className="mt-12 px-3 md:mt-16 md:px-6">
        <div className="film-frame relative mx-auto max-h-[85vh] w-full overflow-hidden rounded-2xl will-change-transform">
          <AutoVideo
            src="/videos/line-conveyor.mp4"
            poster="/videos/poster-line.jpg"
            label={t.media.lineVideoLabel}
            className="aspect-video max-h-[85vh] w-full object-cover"
          />
          {/* Legibility gradient only at the very bottom, for the caption */}
          <div
            className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-ink/70 to-transparent"
            aria-hidden
          />
          <p className="film-caption absolute bottom-5 left-5 flex items-center gap-3 text-xs uppercase tracking-label text-canvas md:bottom-8 md:left-8">
            <span
              className="inline-block h-2 w-2 animate-pulse rounded-full bg-ember"
              aria-hidden
            />
            {t.home.capacity.caption}
          </p>
        </div>
      </div>
    </section>
  );
}
