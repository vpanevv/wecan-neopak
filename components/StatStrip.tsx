'use client';

import { motion } from 'framer-motion';
import CountUp from './CountUp';
import { staggerContainer, staggerItem, viewportOnce } from '@/lib/animations';

export interface Stat {
  target: number;
  suffix: string;
  label: string;
}

interface StatStripProps {
  stats: Stat[];
  dark?: boolean;
}

// Horizontal strip of large count-up stats with subtle separators.
export default function StatStrip({ stats, dark = false }: StatStripProps) {
  const labelTone = dark ? 'text-aluminum' : 'text-muted';
  const dividerTone = dark ? 'border-white/15' : 'border-ink/10';

  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      className="grid grid-cols-2 gap-y-12 sm:gap-y-14 md:grid-cols-4 md:gap-y-0"
    >
      {stats.map((stat, i) => (
        <motion.div
          key={stat.label}
          variants={staggerItem}
          className={`flex flex-col gap-3 md:px-8 ${
            i > 0 ? `md:border-l ${dividerTone}` : ''
          }`}
        >
          <span className="font-mono text-5xl font-medium tracking-tight md:text-6xl lg:text-7xl">
            <CountUp target={stat.target} suffix={stat.suffix} />
          </span>
          <span className={`font-sans text-sm ${labelTone}`}>{stat.label}</span>
        </motion.div>
      ))}
    </motion.div>
  );
}
