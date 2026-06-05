'use client';

import { motion } from 'framer-motion';
import { fadeUp, viewportOnce } from '@/lib/animations';

interface SectionLabelProps {
  children: React.ReactNode;
  /** Soft aluminum tone for dark sections. */
  variant?: 'default' | 'invert';
  className?: string;
}

// Small caps tracked label that sits above each major heading.
export default function SectionLabel({
  children,
  variant = 'default',
  className = '',
}: SectionLabelProps) {
  return (
    <motion.p
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      className={`label ${variant === 'invert' ? 'text-aluminum' : 'text-muted'} ${className}`}
    >
      {children}
    </motion.p>
  );
}
