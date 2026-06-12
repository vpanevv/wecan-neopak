'use client';

import { useRef } from 'react';
import { gsap, useGSAP, MM_ANY_MOTION } from '@/lib/gsap';
import { useI18n } from '@/lib/i18n/context';
import { IMAGES } from '@/lib/images';
import SectionLabel from '@/components/SectionLabel';
import RevealHeadline from '@/components/RevealHeadline';
import EditorialImage from '@/components/EditorialImage';
import AutoVideo from '@/components/cinema/AutoVideo';

// Authenticity collage: real phone footage from the production floor shown
// small and stylized (treated, framed, tilted) next to facility photography —
// deliberately raw against the site's polish.
export default function FactorySection() {
  const { t, locale } = useI18n();
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia(root);
      mm.add(MM_ANY_MOTION, () => {
        gsap.from('.factory-item', {
          y: 60,
          autoAlpha: 0,
          rotate: (i: number) => (i === 1 ? 6 : 0),
          duration: 0.9,
          ease: 'power3.out',
          stagger: 0.15,
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
          <div className="md:col-span-5">
            <SectionLabel>{t.home.factory.label}</SectionLabel>
            <RevealHeadline
              text={t.home.factory.headline}
              className="headline mt-6 text-3xl text-ink sm:text-4xl md:text-5xl"
            />
            <p className="mt-6 max-w-md leading-relaxed text-muted">
              {t.home.factory.body}
            </p>
          </div>

          {/* Collage: facility photo + tilted phone footage */}
          <div className="relative md:col-span-7">
            <div className="factory-item relative ml-auto aspect-[4/3] w-full overflow-hidden rounded-2xl bg-cream md:w-[85%]">
              <EditorialImage
                src={IMAGES.facility.src}
                alt={IMAGES.facility.alt[locale]}
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
              />
            </div>

            <figure className="factory-item absolute -bottom-8 left-0 w-36 rotate-[-4deg] md:-bottom-10 md:w-44">
              <div className="overflow-hidden rounded-xl shadow-xl ring-4 ring-canvas">
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
      </div>
    </section>
  );
}
