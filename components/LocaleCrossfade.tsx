'use client';

import { useEffect, useRef } from 'react';
import { motion, useAnimationControls, MotionConfig } from 'framer-motion';
import { useI18n } from '@/lib/i18n/context';
import { EASE } from '@/lib/animations';

// Subtle opacity crossfade when the language switches — without remounting
// children, so scroll position and form state are preserved.
export default function LocaleCrossfade({
  children,
}: {
  children: React.ReactNode;
}) {
  const { locale } = useI18n();
  const controls = useAnimationControls();
  const first = useRef(true);

  useEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }
    controls.start({
      opacity: [0.45, 1],
      transition: { duration: 0.45, ease: EASE },
    });
  }, [locale, controls]);

  return (
    // reducedMotion="user" makes Framer honor prefers-reduced-motion globally:
    // transform animations are skipped and elements jump to their final state.
    <MotionConfig reducedMotion="user">
      <motion.div animate={controls}>{children}</motion.div>
    </MotionConfig>
  );
}
