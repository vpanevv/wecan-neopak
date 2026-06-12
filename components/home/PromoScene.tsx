'use client';

import { useRef } from 'react';
import { gsap, useGSAP, MM_DESKTOP } from '@/lib/gsap';
import { useI18n } from '@/lib/i18n/context';
import AutoVideo from '@/components/cinema/AutoVideo';

// Pinned cinema scene: the portrait brand film starts small over an oversized
// headline, then scales up to own the frame as you scroll. On mobile and with
// reduced motion it's a simple stacked editorial section.
export default function PromoScene() {
  const { t } = useI18n();
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia(root);

      mm.add(MM_DESKTOP, () => {
        const q = gsap.utils.selector(root);
        const tl = gsap.timeline({
          defaults: { ease: 'none' },
          scrollTrigger: {
            trigger: root.current,
            start: 'top top',
            end: 'bottom bottom',
            scrub: 0.6,
            pin: q('.promo-pin')[0],
            pinSpacing: false,
          },
        });

        tl.fromTo(
          q('.promo-video'),
          { scale: 0.52, yPercent: 6 },
          { scale: 1, yPercent: 0 },
          0,
        )
          .fromTo(
            q('.promo-headline'),
            { scale: 1, autoAlpha: 1 },
            { scale: 1.08, autoAlpha: 0.16 },
            0,
          )
          .fromTo(q('.promo-label'), { y: 0 }, { y: -46 }, 0)
          .fromTo(q('.promo-body'), { y: 0 }, { y: 46 }, 0);
      });
    },
    { scope: root },
  );

  return (
    <section ref={root} className="relative bg-cream md:h-[230vh]">
      <div className="promo-pin relative flex flex-col items-center justify-center gap-10 overflow-hidden px-6 py-24 md:h-screen md:py-0">
        <p className="promo-label label md:absolute md:left-8 md:top-20 lg:left-16">
          {t.home.promo.label}
        </p>

        {/* Oversized headline behind the film */}
        <h2 className="promo-headline headline pointer-events-none text-center text-4xl text-ink sm:text-5xl md:absolute md:inset-x-0 md:top-1/2 md:-translate-y-1/2 md:text-[7vw] md:leading-none">
          {t.home.promo.headline}
        </h2>

        {/* Portrait brand film */}
        <div className="promo-video relative z-10 w-full max-w-[280px] overflow-hidden rounded-2xl shadow-2xl md:max-w-none md:w-[min(44vh,360px)] md:will-change-transform">
          <AutoVideo
            src="/videos/promo-can.mp4"
            poster="/videos/poster-promo.jpg"
            label={t.media.promoVideoLabel}
            className="aspect-[9/16] w-full object-cover"
          />
        </div>

        <p className="promo-body max-w-sm text-center text-[0.95rem] leading-relaxed text-muted md:absolute md:bottom-20 md:right-8 md:max-w-xs md:text-left lg:right-16">
          {t.home.promo.body}
        </p>
      </div>
    </section>
  );
}
