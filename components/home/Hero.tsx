'use client';

import { useRef } from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { gsap, SplitText, useGSAP, MM_ANY_MOTION } from '@/lib/gsap';
import { useI18n } from '@/lib/i18n/context';
import TiltCan from '@/components/cinema/TiltCan';

// Cinematic hero: SplitText character choreography on the headline, the two
// real product cans floating with mouse-tilt, and a scroll-driven drift exit.
// All transform/opacity only. Content stays visible without JS or with
// reduced motion (animations only run inside gsap.matchMedia).
export default function Hero() {
  const { t, locale } = useI18n();
  const root = useRef<HTMLElement>(null);

  useGSAP(
    (_, contextSafe) => {
      const mm = gsap.matchMedia(root);

      mm.add(MM_ANY_MOTION, () => {
        const q = gsap.utils.selector(root);
        let split: SplitText | null = null;

        // Hide before first paint, reveal in the timeline.
        gsap.set(q('.hero-label, .hero-sub, .hero-ctas, .hero-cans, .hero-caption'), {
          autoAlpha: 0,
        });
        gsap.set(q('.hero-headline'), { autoAlpha: 0 });

        // Split after fonts load so line wrapping is measured correctly.
        document.fonts.ready.then(
          contextSafe!(() => {
            const headline = q('.hero-headline')[0];
            if (!headline) return;
            split = SplitText.create(headline, {
              type: 'lines,chars',
              mask: 'lines',
              linesClass: 'hero-line',
            });

            const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
            tl.to(q('.hero-label'), { autoAlpha: 1, duration: 0.01 })
              .from(q('.hero-label'), { y: 20, duration: 0.6 }, 0)
              .set(q('.hero-headline'), { autoAlpha: 1 }, 0.1)
              .from(
                split.chars,
                { yPercent: 120, stagger: 0.013, duration: 0.75 },
                0.1,
              )
              .to(q('.hero-sub'), { autoAlpha: 1, y: 0, duration: 0.01 }, 0.55)
              .from(q('.hero-sub'), { y: 24, duration: 0.6 }, 0.55)
              .to(q('.hero-ctas'), { autoAlpha: 1, duration: 0.01 }, 0.7)
              .from(q('.hero-ctas'), { y: 20, duration: 0.6 }, 0.7)
              .to(q('.hero-cans'), { autoAlpha: 1, duration: 0.01 }, 0.3)
              .from(
                q('.hero-cans'),
                { y: 70, scale: 0.94, duration: 1, ease: 'power2.out' },
                0.3,
              )
              .to(q('.hero-caption'), { autoAlpha: 1, duration: 0.5 }, 1.0);
          }),
        );

        // Scroll exit: cans drift down slightly slower than the page.
        gsap.to(q('.hero-cans'), {
          yPercent: 14,
          ease: 'none',
          scrollTrigger: {
            trigger: root.current,
            start: 'top top',
            end: 'bottom top',
            scrub: true,
          },
        });

        // Scroll cue line pulse.
        gsap.fromTo(
          q('.hero-cue'),
          { scaleY: 0, transformOrigin: 'top' },
          {
            scaleY: 1,
            duration: 1.2,
            ease: 'power2.inOut',
            repeat: -1,
            yoyo: true,
            delay: 1.6,
          },
        );

        return () => {
          split?.revert();
        };
      });
    },
    { scope: root, dependencies: [locale], revertOnUpdate: true },
  );

  return (
    <section
      ref={root}
      className="relative flex min-h-[100svh] items-center overflow-hidden bg-canvas pt-16 md:pt-20"
    >
      <div className="container-site grid w-full items-center gap-14 py-16 md:grid-cols-12 md:gap-8 md:py-0">
        {/* Left — copy (60%) */}
        <div className="md:col-span-7">
          <p className="hero-label label">{t.home.hero.label}</p>

          {/* Keyed by locale: SplitText mutates this node's DOM, so on language
              change React must replace it wholesale rather than reconcile. */}
          <h1
            key={locale}
            className="hero-headline headline mt-6 text-5xl text-ink sm:text-6xl md:text-7xl lg:text-8xl"
          >
            {t.home.hero.headline.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </h1>

          <p className="hero-sub mt-8 max-w-xl text-lg leading-relaxed text-muted md:text-xl">
            {t.home.hero.subhead}
          </p>

          <div className="hero-ctas mt-10 flex flex-col items-start gap-5 sm:flex-row sm:items-center">
            <Link href="/contact" className="btn-primary">
              {t.home.hero.ctaPrimary}
            </Link>
            <Link href="/private-label" className="btn-link group">
              {t.home.hero.ctaSecondary}
              <ArrowRight
                size={16}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </Link>
          </div>
        </div>

        {/* Right — real product cans (40%) */}
        <div className="md:col-span-5">
          <div className="hero-cans relative mx-auto h-[400px] w-full max-w-sm md:h-[520px]">
            <div className="absolute inset-x-0 top-1/2 -z-10 mx-auto h-3/4 w-full -translate-y-1/2 rounded-full bg-cream blur-3xl" />
            {/* Back — silver non-carbonated can */}
            <TiltCan
              src="/cans/can-noncarbonated.png"
              alt={t.media.canNonCarbonatedAlt}
              width={382}
              height={1000}
              floatDelay={0.9}
              maxTilt={7}
              className="absolute right-0 top-0 w-36 md:w-44"
              sizes="(max-width: 768px) 144px, 176px"
            />
            {/* Front — navy carbonated can */}
            <TiltCan
              src="/cans/can-carbonated.png"
              alt={t.media.canCarbonatedAlt}
              width={382}
              height={1000}
              priority
              maxTilt={10}
              className="absolute bottom-0 left-4 z-10 w-44 md:left-8 md:w-56"
              sizes="(max-width: 768px) 176px, 224px"
            />
          </div>
          <p className="hero-caption mt-8 flex items-center gap-3 text-xs text-muted md:justify-center">
            <span className="h-px w-8 bg-ink/20" aria-hidden />
            {t.home.hero.canCaption}
          </p>
        </div>
      </div>

      {/* Scroll cue */}
      <div
        aria-hidden
        className="absolute bottom-6 left-1/2 hidden h-12 w-px -translate-x-1/2 md:block"
      >
        <div className="hero-cue h-full w-full bg-ink/30" />
      </div>

      <div className="absolute inset-x-0 bottom-0 h-px bg-ink/5" />
    </section>
  );
}
