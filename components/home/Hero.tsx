'use client';

import { useRef } from 'react';
import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useI18n } from '@/lib/i18n/context';
import { fadeUp, EASE } from '@/lib/animations';
import RevealHeadline from '@/components/RevealHeadline';
import CanComposition from '@/components/CanComposition';

export default function Hero() {
  const { t } = useI18n();
  const ref = useRef<HTMLElement>(null);

  // Scroll progress scoped to the hero only (perf: no global listener).
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });
  // Subtle ~8% parallax on the can composition.
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '8%']);

  return (
    <section
      ref={ref}
      className="relative flex min-h-[100svh] items-center overflow-hidden bg-canvas pt-16 md:pt-20"
    >
      <div className="container-site grid w-full items-center gap-12 py-16 md:grid-cols-12 md:py-0">
        {/* Left — copy (60%) */}
        <div className="md:col-span-7">
          <motion.p
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="label"
          >
            {t.home.hero.label}
          </motion.p>

          <RevealHeadline
            as="h1"
            immediate
            text={t.home.hero.headline}
            className="headline mt-6 text-5xl text-ink sm:text-6xl md:text-7xl lg:text-8xl"
          />

          <motion.p
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            transition={{ delay: 0.7, duration: 0.8, ease: EASE }}
            className="mt-8 max-w-xl text-lg leading-relaxed text-muted md:text-xl"
          >
            {t.home.hero.subhead}
          </motion.p>

          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            transition={{ delay: 0.9, duration: 0.8, ease: EASE }}
            className="mt-10 flex flex-col items-start gap-5 sm:flex-row sm:items-center"
          >
            <Link href="/contact" className="btn-primary">
              {t.home.hero.ctaPrimary}
            </Link>
            <Link href="/private-label" className="btn-link group">
              {t.home.hero.ctaSecondary}
              <ArrowRight
                size={16}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </Link>
          </motion.div>
        </div>

        {/* Right — can composition (40%) */}
        <motion.div
          style={{ y }}
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, duration: 1.2, ease: EASE }}
          className="relative md:col-span-5"
        >
          <div className="absolute inset-0 -z-10 mx-auto h-3/4 w-3/4 self-center rounded-full bg-cream blur-2xl" />
          <CanComposition className="mx-auto h-auto w-full max-w-sm md:max-w-none" />
        </motion.div>
      </div>

      {/* Hairline at the very bottom of the hero for structure */}
      <div className="absolute inset-x-0 bottom-0 h-px bg-ink/5" />
    </section>
  );
}
