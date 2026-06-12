'use client';

import { motion } from 'framer-motion';
import { useI18n } from '@/lib/i18n/context';
import { staggerContainer, staggerItem, viewportOnce } from '@/lib/animations';
import SectionLabel from '@/components/SectionLabel';
import RevealHeadline from '@/components/RevealHeadline';

export default function Process() {
  const { t } = useI18n();

  return (
    <section id="process" className="bg-canvas">
      <div className="container-site section-y">
        <div className="max-w-3xl">
          <SectionLabel>{t.home.process.label}</SectionLabel>
          <RevealHeadline
            text={t.home.process.headline}
            className="headline mt-6 text-3xl text-ink sm:text-4xl md:text-5xl"
          />
        </div>

        {/* Steps with connecting line */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="mt-16 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-4"
        >
          {t.home.process.steps.map((step) => (
            <motion.div key={step.num} variants={staggerItem} className="relative">
              <div className="flex items-center gap-3">
                <span className="font-mono text-sm text-muted">{step.num}</span>
                <span className="h-px flex-1 bg-ink/15" aria-hidden />
              </div>
              <h3 className="mt-5 font-display text-lg font-medium tracking-tight text-ink">
                {step.title}
              </h3>
              <p className="mt-3 text-[0.95rem] leading-relaxed text-muted">
                {step.body}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
