'use client';

import { motion, type Variants } from 'framer-motion';
import { fadeUp, viewportOnce } from '@/lib/animations';

interface RevealProps {
  children: React.ReactNode;
  className?: string;
  variants?: Variants;
  /** Extra delay in seconds (for sequencing). */
  delay?: number;
}

// Generic single-element scroll reveal (fade-up, once).
export default function Reveal({
  children,
  className = '',
  variants = fadeUp,
  delay = 0,
}: RevealProps) {
  return (
    <motion.div
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      transition={delay ? { delay } : undefined}
      className={className}
    >
      {children}
    </motion.div>
  );
}
