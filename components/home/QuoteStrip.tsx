'use client';

import { motion } from 'framer-motion';
import { useI18n } from '@/lib/i18n/context';
import { fadeIn, fadeUp, viewportOnce } from '@/lib/animations';

export default function QuoteStrip() {
  const { t } = useI18n();

  return (
    <section className="flex min-h-[40vh] items-center bg-cream">
      <div className="container-site flex flex-col items-center py-20 text-center md:py-28">
        <motion.blockquote
          variants={fadeIn}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="max-w-3xl font-display text-2xl font-normal italic leading-snug tracking-tight text-ink sm:text-3xl md:text-4xl"
        >
          “{t.home.quote.text}”
        </motion.blockquote>
        <motion.p
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          transition={{ delay: 0.15 }}
          className="label mt-8"
        >
          {t.home.quote.attribution}
        </motion.p>
      </div>
    </section>
  );
}
