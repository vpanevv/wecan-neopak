'use client';

import { motion } from 'framer-motion';
import { Zap, Leaf, Activity, CupSoda, type LucideIcon } from 'lucide-react';
import { useI18n } from '@/lib/i18n/context';
import { staggerContainer, staggerItem, viewportOnce } from '@/lib/animations';
import SectionLabel from '@/components/SectionLabel';
import RevealHeadline from '@/components/RevealHeadline';

const ICONS: LucideIcon[] = [Zap, Leaf, Activity, CupSoda];

export default function Categories() {
  const { t } = useI18n();

  return (
    <section className="bg-cream">
      <div className="container-site section-y">
        <div className="max-w-3xl">
          <SectionLabel>{t.home.categories.label}</SectionLabel>
          <RevealHeadline
            text={t.home.categories.headline}
            className="headline mt-6 text-3xl text-ink sm:text-4xl md:text-5xl"
          />
        </div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="mt-16 grid gap-px overflow-hidden rounded-2xl border border-ink/10 bg-ink/10 sm:grid-cols-2"
        >
          {t.home.categories.items.map((item, i) => {
            const Icon = ICONS[i];
            // Energy (index 0) gets the sparing ember accent.
            const accent = i === 0;
            return (
              <motion.div
                key={item.title}
                variants={staggerItem}
                className="group bg-cream p-8 transition-colors duration-300 hover:bg-canvas md:p-10"
              >
                <Icon
                  size={26}
                  strokeWidth={1.6}
                  className={accent ? 'text-ember' : 'text-ink'}
                  aria-hidden
                />
                <h3 className="mt-6 font-display text-xl font-medium tracking-tight text-ink md:text-2xl">
                  {item.title}
                </h3>
                <p className="mt-3 max-w-md text-[0.95rem] leading-relaxed text-muted">
                  {item.body}
                </p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
