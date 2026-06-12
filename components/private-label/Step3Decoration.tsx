'use client';

import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import { useI18n } from '@/lib/i18n/context';
import { staggerContainer, staggerItem, viewportOnce } from '@/lib/animations';
import StepHeader from './StepHeader';
import AutoVideo from '@/components/cinema/AutoVideo';

function List({ heading, items }: { heading: string; items: string[] }) {
  return (
    <div className="mt-8">
      <h4 className="label text-muted">{heading}</h4>
      <ul className="mt-4 space-y-3">
        {items.map((item) => (
          <li key={item} className="flex items-start gap-3 text-[0.95rem] text-ink">
            <Check size={16} className="mt-0.5 shrink-0 text-muted" aria-hidden />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Step3Decoration() {
  const { t } = useI18n();
  const step = t.privateLabel.step3;

  return (
    <section className="bg-canvas">
      <div className="container-site section-y">
        <StepHeader label={step.label} headline={step.headline} />
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="mt-14 grid gap-8 lg:grid-cols-2"
        >
          {/* Option A — Litho */}
          <motion.div
            variants={staggerItem}
            className="flex flex-col rounded-2xl border border-ink/10 bg-cream p-8 md:p-10"
          >
            <span className="label text-muted">Option A</span>
            <h3 className="mt-3 font-display text-2xl font-medium tracking-tight text-ink">
              {step.litho.title}
            </h3>
            <p className="mt-4 leading-relaxed text-muted">{step.litho.body}</p>
            <List heading={step.litho.techHeading} items={step.litho.tech} />
            <List heading={step.litho.minHeading} items={step.litho.min} />
          </motion.div>

          {/* Option B — Shrink Sleeve */}
          <motion.div
            variants={staggerItem}
            className="flex flex-col rounded-2xl border border-ink/10 bg-ink p-8 text-canvas md:p-10"
          >
            <span className="label text-aluminum">Option B</span>
            <h3 className="mt-3 font-display text-2xl font-medium tracking-tight text-canvas">
              {step.sleeve.title}
            </h3>
            <p className="mt-4 leading-relaxed text-aluminum">{step.sleeve.body}</p>
            <div className="mt-8">
              <h4 className="label text-aluminum">{step.sleeve.minHeading}</h4>
              <ul className="mt-4 grid grid-cols-2 gap-3">
                {step.sleeve.min.map((item) => (
                  <li
                    key={item}
                    className="rounded-lg border border-white/15 px-4 py-3 text-center font-mono text-sm text-canvas"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Real decorated product, in motion */}
            <div className="mt-10 flex items-center gap-5 border-t border-white/10 pt-8">
              <div className="w-20 shrink-0 overflow-hidden rounded-lg">
                <AutoVideo
                  src="/videos/promo-can.mp4"
                  poster="/videos/poster-promo.jpg"
                  label={t.media.promoVideoLabel}
                  className="aspect-[9/16] w-full object-cover"
                />
              </div>
              <p className="text-sm leading-relaxed text-aluminum">
                {t.privateLabel.step3.videoCaption}
              </p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
