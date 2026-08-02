'use client';

import { useRef } from 'react';
import { gsap, useGSAP, MM_ANY_MOTION } from '@/lib/gsap';
import { useI18n } from '@/lib/i18n/context';
import SectionLabel from '@/components/SectionLabel';
import RevealHeadline from '@/components/RevealHeadline';
import AutoVideo from '@/components/cinema/AutoVideo';

// Authenticity beat: real phone footage from the production floor, framed in
// its native vertical crop — deliberately raw against the site's polish.
export default function FactorySection() {
  const { t } = useI18n();
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia(root);
      mm.add(MM_ANY_MOTION, () => {
        gsap.from('.factory-item', {
          y: 60,
          autoAlpha: 0,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: root.current,
            start: 'top 70%',
            once: true,
          },
        });
      });
    },
    { scope: root },
  );

  return (
    <section ref={root} className="overflow-hidden bg-canvas">
      <div className="container-site section-y">
        <div className="grid items-center gap-14 md:grid-cols-12">
          {/* Copy */}
          <div className="md:col-span-6">
            <SectionLabel>{t.home.factory.label}</SectionLabel>
            <RevealHeadline
              text={t.home.factory.headline}
              className="headline mt-6 text-3xl text-ink sm:text-4xl md:text-5xl"
            />
            <p className="mt-6 max-w-md leading-relaxed text-muted">
              {t.home.factory.body}
            </p>
          </div>

          {/* Phone footage, native 540×960 vertical crop */}
          <figure className="factory-item mx-auto w-full max-w-[280px] md:col-span-6 md:max-w-[340px]">
            <div className="overflow-hidden rounded-2xl shadow-xl ring-4 ring-canvas">
              <AutoVideo
                src="/videos/factory-real.mp4"
                poster="/videos/poster-factory.jpg"
                label={t.media.factoryVideoLabel}
                className="aspect-[9/16] w-full object-cover contrast-110 saturate-[0.85]"
              />
            </div>
            <figcaption className="mt-3 text-center text-[0.65rem] uppercase tracking-label text-muted">
              {t.home.factory.caption}
            </figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
}
