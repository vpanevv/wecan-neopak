'use client';

import { useRef } from 'react';
import { gsap, ScrollTrigger, useGSAP, MM_ANY_MOTION } from '@/lib/gsap';
import { useI18n } from '@/lib/i18n/context';

// Oversized outlined-text marquee. Loops infinitely; scroll velocity nudges
// its speed and direction for a tactile, reactive feel. Static when
// prefers-reduced-motion.
export default function Marquee() {
  const { t } = useI18n();
  const root = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MM_ANY_MOTION, () => {
        const loop = gsap.to(track.current, {
          xPercent: -50,
          ease: 'none',
          duration: 28,
          repeat: -1,
          paused: true,
        });

        // Only run the infinite loop while the strip is on screen.
        const visibility = ScrollTrigger.create({
          trigger: root.current,
          start: 'top bottom',
          end: 'bottom top',
          onToggle: (self) => (self.isActive ? loop.play() : loop.pause()),
        });

        // Scroll velocity bends the marquee speed, then it settles back to 1.
        // quickTo + a single debounced settle call — no per-event tween churn.
        const speedTo = gsap.quickTo(loop, 'timeScale', {
          duration: 0.35,
          ease: 'power2.out',
        });
        const settle = gsap.delayedCall(0.25, () => speedTo(1)).pause();
        const st = ScrollTrigger.create({
          onUpdate: (self) => {
            const boost = gsap.utils.clamp(-4, 4, self.getVelocity() / 350);
            speedTo(1 + boost);
            settle.restart(true);
          },
        });

        return () => {
          st.kill();
          visibility.kill();
          settle.kill();
          loop.kill();
        };
      });
    },
    { scope: root },
  );

  // Two identical groups so -50% xPercent wraps seamlessly.
  const group = (ariaHidden: boolean) => (
    <div
      aria-hidden={ariaHidden}
      className="flex shrink-0 items-center gap-[3vw] pr-[3vw]"
    >
      {t.home.marquee.map((word) => (
        <span key={word} className="flex items-center gap-[3vw]">
          <span
            className="whitespace-nowrap font-display text-[11vw] font-semibold uppercase leading-none tracking-tight text-transparent md:text-[7vw]"
            style={{ WebkitTextStroke: '1.5px rgba(15,16,17,0.3)' }}
          >
            {word}
          </span>
          <span className="h-[1.2vw] w-[1.2vw] shrink-0 rounded-full bg-ember md:h-[0.8vw] md:w-[0.8vw]" />
        </span>
      ))}
    </div>
  );

  return (
    <div
      ref={root}
      className="overflow-hidden border-y border-ink/10 bg-canvas py-6 md:py-8"
    >
      <div ref={track} className="flex w-max">
        {group(false)}
        {group(true)}
      </div>
    </div>
  );
}
