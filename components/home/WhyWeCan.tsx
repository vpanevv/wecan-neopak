'use client';

import { motion } from 'framer-motion';
import { useI18n } from '@/lib/i18n/context';
import { staggerContainer, staggerItem, viewportOnce } from '@/lib/animations';
import SectionLabel from '@/components/SectionLabel';
import RevealHeadline from '@/components/RevealHeadline';

export default function WhyWeCan() {
  const { t } = useI18n();

  return (
    <section id="capabilities" className="bg-canvas">
      <div className="container-site section-y">
        <div className="max-w-3xl">
          <SectionLabel>{t.home.why.label}</SectionLabel>
          <RevealHeadline
            text={t.home.why.headline}
            className="headline mt-6 text-3xl text-ink sm:text-4xl md:text-5xl"
          />
        </div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="mt-16 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-4"
        >
          {t.home.why.items.map((item) => (
            <motion.div
              key={item.num}
              variants={staggerItem}
              // 03 is Sustainable Production — target for the footer anchor link.
              id={item.num === '03' ? 'sustainability' : undefined}
              className="scroll-mt-24 border-t border-ink/15 pt-6"
            >
              <span className="font-mono text-sm text-muted">{item.num}</span>
              <h3 className="mt-4 font-display text-xl font-medium tracking-tight text-ink">
                {item.title}
              </h3>
              <p className="mt-3 text-[0.95rem] leading-relaxed text-muted">
                {item.body}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
