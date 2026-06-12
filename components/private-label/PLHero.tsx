'use client';

import { motion } from 'framer-motion';
import { useI18n } from '@/lib/i18n/context';
import { fadeUp, EASE } from '@/lib/animations';
import RevealHeadline from '@/components/RevealHeadline';
import TiltCan from '@/components/cinema/TiltCan';

export default function PLHero() {
  const { t } = useI18n();

  return (
    <section className="relative flex min-h-[60svh] items-center overflow-hidden bg-canvas pt-24 md:min-h-[55vh] md:pt-28">
      <div className="container-site grid items-center gap-10 py-16 md:grid-cols-12">
        <div className="md:col-span-8">
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

        {/* Real product can — proof, not decoration */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 1, ease: EASE }}
          className="relative hidden justify-center md:col-span-4 md:flex"
        >
          <div className="absolute inset-x-0 top-1/2 -z-10 h-2/3 w-full -translate-y-1/2 rounded-full bg-cream blur-3xl" />
          <TiltCan
            src="/cans/can-noncarbonated.png"
            alt={t.media.canNonCarbonatedAlt}
            width={382}
            height={1000}
            priority
            maxTilt={9}
            className="w-36 lg:w-44"
            sizes="176px"
          />
        </motion.div>
      </div>
      <div className="absolute inset-x-0 bottom-0 h-px bg-ink/5" />
    </section>
  );
}
