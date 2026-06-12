'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { gsap, useGSAP, MM_DESKTOP, MM_ANY_MOTION } from '@/lib/gsap';

interface TiltCanProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
  imgClassName?: string;
  priority?: boolean;
  /** Seconds of float-loop offset so multiple cans don't bob in sync. */
  floatDelay?: number;
  /** Max tilt in degrees. */
  maxTilt?: number;
  sizes?: string;
}

// Product can with a 3D mouse-tilt (desktop, fine pointer only) and a gentle
// idle float loop. Pure transform animations — GPU-composited.
export default function TiltCan({
  src,
  alt,
  width,
  height,
  className = '',
  imgClassName = '',
  priority = false,
  floatDelay = 0,
  maxTilt = 10,
  sizes = '(max-width: 768px) 40vw, 320px',
}: TiltCanProps) {
  const root = useRef<HTMLDivElement>(null);
  const inner = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      // Idle float — any device that allows motion.
      mm.add(MM_ANY_MOTION, () => {
        const float = gsap.to(inner.current, {
          y: -14,
          duration: 2.6,
          ease: 'sine.inOut',
          yoyo: true,
          repeat: -1,
          delay: floatDelay,
        });
        return () => float.kill();
      });

      // Mouse tilt — desktop with a fine pointer.
      mm.add(`${MM_DESKTOP} and (pointer: fine)`, () => {
        const el = root.current!;
        const rx = gsap.quickTo(el, 'rotationX', { duration: 0.7, ease: 'power3.out' });
        const ry = gsap.quickTo(el, 'rotationY', { duration: 0.7, ease: 'power3.out' });

        const onMove = (e: MouseEvent) => {
          const rect = el.getBoundingClientRect();
          const cx = rect.left + rect.width / 2;
          const cy = rect.top + rect.height / 2;
          // Normalized -1..1 relative to viewport so the can reacts to the
          // cursor anywhere on screen, not just on hover.
          const nx = gsap.utils.clamp(-1, 1, (e.clientX - cx) / (window.innerWidth / 2));
          const ny = gsap.utils.clamp(-1, 1, (e.clientY - cy) / (window.innerHeight / 2));
          ry(nx * maxTilt);
          rx(-ny * maxTilt * 0.6);
        };
        window.addEventListener('mousemove', onMove, { passive: true });
        return () => window.removeEventListener('mousemove', onMove);
      });
    },
    { scope: root },
  );

  return (
    <div
      ref={root}
      className={className}
      style={{ transformStyle: 'preserve-3d', perspective: '900px' }}
    >
      <div ref={inner} className="will-change-transform">
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          priority={priority}
          sizes={sizes}
          className={`h-auto w-full select-none drop-shadow-2xl ${imgClassName}`}
        />
      </div>
    </div>
  );
}
