'use client';

import { useEffect, useRef } from 'react';

interface AutoVideoProps {
  src: string;
  poster: string;
  /** Localized accessible name for the video region. */
  label: string;
  className?: string;
}

// Muted, looping, viewport-aware video: plays only while visible, never
// downloads until near the viewport (preload=none + poster). Respects
// prefers-reduced-motion by staying on the poster frame.
export default function AutoVideo({ src, poster, label, className = '' }: AutoVideoProps) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) return;

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            video.play().catch(() => {
              /* autoplay can be blocked; poster remains */
            });
          } else {
            video.pause();
          }
        }
      },
      { rootMargin: '200px' },
    );
    io.observe(video);
    return () => io.disconnect();
  }, []);

  return (
    <video
      ref={ref}
      src={src}
      poster={poster}
      muted
      loop
      playsInline
      preload="none"
      aria-label={label}
      className={className}
    />
  );
}
