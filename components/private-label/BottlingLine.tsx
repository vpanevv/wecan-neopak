'use client';

import { motion } from 'framer-motion';
import {
  Droplets,
  Filter,
  Waves,
  FlaskConical,
  Wind,
  Factory,
  Thermometer,
  Layers,
  ShieldCheck,
  type LucideIcon,
} from 'lucide-react';
import { useI18n } from '@/lib/i18n/context';
import { staggerContainer, staggerItem, viewportOnce } from '@/lib/animations';
import StepHeader from './StepHeader';

const ICONS: LucideIcon[] = [
  Droplets,
  Filter,
  Waves,
  FlaskConical,
  Wind,
  Factory,
  Thermometer,
  Layers,
  ShieldCheck,
];

export default function BottlingLine() {
  const { t } = useI18n();
  const line = t.privateLabel.line;

  return (
    <section className="bg-ink text-canvas">
      <div className="container-site section-y">
        <StepHeader label={line.label} headline={line.headline} invert />
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="mt-16 grid gap-x-12 gap-y-10 md:grid-cols-2"
        >
          {line.items.map((item, i) => {
            const Icon = ICONS[i];
            return (
              <motion.div
                key={item.title}
                variants={staggerItem}
                className="flex gap-5 border-t border-white/10 pt-6"
              >
                <Icon
                  size={22}
                  strokeWidth={1.5}
                  className="mt-0.5 shrink-0 text-aluminum"
                  aria-hidden
                />
                <div>
                  <h3 className="font-display text-lg font-medium tracking-tight text-canvas">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-[0.95rem] leading-relaxed text-aluminum">
                    {item.body}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
