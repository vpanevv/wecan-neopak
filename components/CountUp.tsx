'use client';

import { useEffect, useRef } from 'react';
import { useInView } from 'framer-motion';

interface CountUpProps {
  target: number;
  suffix?: string;
  durationMs?: number;
}

// Counts up from 0 to target the first time it scrolls into view.
// Writes straight to the DOM node (no per-frame React re-renders) so the
// count stays smooth even with video playing behind it.
// Honors prefers-reduced-motion by snapping straight to the final value.
export default function CountUp({
  target,
  suffix = '',
  durationMs = 1500,
}: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  useEffect(() => {
    const el = ref.current;
    if (!inView || !el) return;

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) {
      el.textContent = `${target}${suffix}`;
      return;
    }

    let frame = 0;
    const start = performance.now();
    // easeOutCubic — mirrors the shared EASE curve used across the site.
    const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

    const tick = (now: number) => {
      const progress = Math.min((now - start) / durationMs, 1);
      el.textContent = `${Math.round(easeOutCubic(progress) * target)}${suffix}`;
      if (progress < 1) {
        frame = requestAnimationFrame(tick);
      }
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [inView, target, suffix, durationMs]);

  return (
    <span ref={ref} className="tabular-nums">
      0{suffix}
    </span>
  );
}
