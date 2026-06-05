'use client';

import { motion } from 'framer-motion';
import { useI18n } from '@/lib/i18n/context';
import { staggerContainer, staggerItem, viewportOnce } from '@/lib/animations';
import StepHeader from './StepHeader';

// Minimal single aluminum can outline; `slim` controls width, `tall` height.
function SingleCan({ slim, tall }: { slim: number; tall: number }) {
  const w = 46 * slim;
  const h = 120 * tall;
  const x = (90 - w) / 2;
  const yTop = 130 - h;
  const ry = w * 0.14;
  return (
    <svg viewBox="0 0 90 140" className="h-28 w-auto" aria-hidden>
      <defs>
        <linearGradient id={`pl-can-${slim}-${tall}`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#aab0b4" />
          <stop offset="0.25" stopColor="#eef0f1" />
          <stop offset="0.55" stopColor="#c5cacd" />
          <stop offset="0.8" stopColor="#eef0f1" />
          <stop offset="1" stopColor="#9aa0a4" />
        </linearGradient>
      </defs>
      <ellipse cx={45} cy={132} rx={w / 2} ry={ry * 0.7} fill="rgba(15,16,17,0.1)" />
      <path
        d={`M ${x} ${yTop} L ${x} ${130} A ${w / 2} ${ry} 0 0 0 ${x + w} ${130} L ${x + w} ${yTop} A ${w / 2} ${ry} 0 0 1 ${x} ${yTop} Z`}
        fill={`url(#pl-can-${slim}-${tall})`}
      />
      <ellipse cx={45} cy={yTop} rx={w / 2} ry={ry} fill="#dfe2e3" />
      <ellipse
        cx={45}
        cy={yTop}
        rx={w * 0.3}
        ry={ry * 0.4}
        fill="rgba(15,16,17,0.1)"
      />
    </svg>
  );
}

// Maps each format to relative width / height for its illustration.
const PROPORTIONS = [
  { slim: 0.78, tall: 0.82 }, // 250 Slim — narrow, mid
  { slim: 0.84, tall: 1.0 }, // 330 Sleek — narrow, tall
  { slim: 1.0, tall: 0.86 }, // 330 Standard — wide, shorter
  { slim: 1.0, tall: 1.0 }, // 500 Standard — wide, tall
];

export default function Step2CanSize() {
  const { t } = useI18n();
  const step = t.privateLabel.step2;

  return (
    <section className="bg-cream">
      <div className="container-site section-y">
        <StepHeader label={step.label} headline={step.headline} />
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="mt-14 grid grid-cols-2 gap-x-8 gap-y-12 lg:grid-cols-4"
        >
          {step.sizes.map((size, i) => (
            <motion.div
              key={`${size.size}-${size.variant}`}
              variants={staggerItem}
              className="flex flex-col items-start"
            >
              <div className="flex h-32 items-end">
                <SingleCan {...PROPORTIONS[i]} />
              </div>
              <span className="mt-6 font-mono text-2xl font-medium text-ink">
                {size.size}
              </span>
              <span className="mt-1 text-sm font-medium text-ink">{size.variant}</span>
              <p className="mt-3 text-[0.9rem] leading-relaxed text-muted">{size.use}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
