'use client';

import { motion } from 'framer-motion';
import { useI18n } from '@/lib/i18n/context';
import { staggerContainer, staggerItem, viewportOnce } from '@/lib/animations';
import StepHeader from './StepHeader';

export default function Step1Beverage() {
  const { t } = useI18n();
  const step = t.privateLabel.step1;

  return (
    <section className="bg-canvas">
      <div className="container-site section-y">
        <StepHeader label={step.label} headline={step.headline} />
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="mt-14 grid gap-8 md:grid-cols-2"
        >
          {step.items.map((item, i) => (
            // Index key: titles are translated — see BottlingLine note.
            <motion.div
              key={i}
              variants={staggerItem}
              className="rounded-2xl border border-ink/10 bg-cream p-8 md:p-10"
            >
              <h3 className="font-display text-xl font-medium tracking-tight text-ink md:text-2xl">
                {item.title}
              </h3>
              <p className="mt-4 leading-relaxed text-muted">{item.body}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
