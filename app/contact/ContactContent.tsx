'use client';

import { motion } from 'framer-motion';
import { useI18n } from '@/lib/i18n/context';
import { fadeUp, EASE } from '@/lib/animations';
import RevealHeadline from '@/components/RevealHeadline';
import ContactForm from '@/components/contact/ContactForm';
import TiltCan from '@/components/cinema/TiltCan';

export default function ContactContent() {
  const { t } = useI18n();
  const c = t.contact;

  return (
    <section className="bg-canvas pt-28 md:pt-32">
      <div className="container-site section-y !pt-8 md:!pt-12">
        <div className="grid gap-16 lg:grid-cols-12 lg:gap-12">
          {/* Left — intro + contact info (40%) */}
          <div className="lg:col-span-5">
            <motion.p initial="hidden" animate="visible" variants={fadeUp} className="label">
              {c.label}
            </motion.p>
            <RevealHeadline
              as="h1"
              immediate
              text={c.headline}
              className="headline mt-6 text-4xl text-ink sm:text-5xl"
            />
            <motion.p
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              transition={{ delay: 0.4, duration: 0.8, ease: EASE }}
              className="mt-6 max-w-md text-lg leading-relaxed text-muted"
            >
              {c.body}
            </motion.p>

            {/* Direct contact — email only; there is no public address or phone. */}
            <div className="mt-12 space-y-6 border-t border-ink/15 pt-8">
              <h2 className="label text-ink">{c.infoHeading}</h2>
              <dl>
                <dt className="label text-muted">{c.email}</dt>
                <dd className="mt-1.5">
                  <a
                    href={`mailto:${c.emailValue}`}
                    className="text-ink underline-offset-4 transition-colors hover:text-muted hover:underline"
                  >
                    {c.emailValue}
                  </a>
                </dd>
              </dl>
            </div>

            {/* Floating product accent — desktop only, kept subtle */}
            <div className="mt-14 hidden lg:block">
              <TiltCan
                src="/cans/can-carbonated-sm.png"
                alt={t.media.canCarbonatedAlt}
                width={199}
                height={520}
                maxTilt={6}
                className="w-24 opacity-90"
                sizes="96px"
              />
            </div>
          </div>

          {/* Right — form (60%) */}
          <div className="lg:col-span-7">
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  );
}
