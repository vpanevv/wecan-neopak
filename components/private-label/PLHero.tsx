'use client';

import { motion } from 'framer-motion';
import { useI18n } from '@/lib/i18n/context';
import { fadeUp, EASE } from '@/lib/animations';
import RevealHeadline from '@/components/RevealHeadline';

export default function PLHero() {
  const { t } = useI18n();

  return (
    <section className="relative flex min-h-[60svh] items-center overflow-hidden bg-canvas pt-24 md:min-h-[55vh] md:pt-28">
      <div className="container-site py-16">
        <motion.p initial="hidden" animate="visible" variants={fadeUp} className="label">
          {t.privateLabel.hero.label}
        </motion.p>
        <RevealHeadline
          as="h1"
          immediate
          text={t.privateLabel.hero.headline}
          className="headline mt-6 max-w-4xl text-4xl text-ink sm:text-5xl md:text-6xl lg:text-7xl"
        />
        <motion.p
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          transition={{ delay: 0.5, duration: 0.8, ease: EASE }}
          className="mt-8 max-w-2xl text-lg leading-relaxed text-muted md:text-xl"
        >
          {t.privateLabel.hero.subhead}
        </motion.p>
      </div>
      <div className="absolute inset-x-0 bottom-0 h-px bg-ink/5" />
    </section>
  );
}
