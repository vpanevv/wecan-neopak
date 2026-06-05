'use client';

import SectionLabel from '@/components/SectionLabel';
import RevealHeadline from '@/components/RevealHeadline';

// Shared "STEP 0X" label + headline used across the Private Label steps.
export default function StepHeader({
  label,
  headline,
  invert = false,
}: {
  label: string;
  headline: string;
  invert?: boolean;
}) {
  return (
    <div className="max-w-3xl">
      <SectionLabel variant={invert ? 'invert' : 'default'}>{label}</SectionLabel>
      <RevealHeadline
        text={headline}
        className={`headline mt-6 text-3xl sm:text-4xl md:text-5xl ${
          invert ? 'text-canvas' : 'text-ink'
        }`}
      />
    </div>
  );
}
