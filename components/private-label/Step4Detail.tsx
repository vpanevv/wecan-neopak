'use client';

import { motion } from 'framer-motion';
import { CircleDot, Disc3 } from 'lucide-react';
import { useI18n } from '@/lib/i18n/context';
import { staggerContainer, staggerItem, viewportOnce } from '@/lib/animations';
import StepHeader from './StepHeader';

function DetailColumn({
  icon,
  heading,
  items,
}: {
  icon: React.ReactNode;
  heading: string;
  items: string[];
}) {
  return (
    <motion.div variants={staggerItem} className="border-t border-ink/15 pt-6">
      <div className="flex items-center gap-3 text-ink">
        {icon}
        <h3 className="font-display text-lg font-medium tracking-tight">{heading}</h3>
      </div>
      <ul className="mt-6 space-y-3">
        {items.map((item) => (
          <li
            key={item}
            className="flex items-baseline gap-3 text-[0.95rem] leading-relaxed text-muted"
          >
            <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-aluminum" aria-hidden />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </motion.div>
  );
}

export default function Step4Detail() {
  const { t } = useI18n();
  const step = t.privateLabel.step4;

  return (
    <section className="bg-cream">
      <div className="container-site section-y">
        <StepHeader label={step.label} headline={step.headline} />
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="mt-14 grid gap-x-12 gap-y-12 md:grid-cols-2"
        >
          <DetailColumn
            icon={<CircleDot size={20} strokeWidth={1.6} aria-hidden />}
            heading={step.capsHeading}
            items={step.caps}
          />
          <DetailColumn
            icon={<Disc3 size={20} strokeWidth={1.6} aria-hidden />}
            heading={step.tabsHeading}
            items={step.tabs}
          />
        </motion.div>
      </div>
    </section>
  );
}
