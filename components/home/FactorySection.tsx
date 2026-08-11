'use client';

import { useI18n } from '@/lib/i18n/context';
import SectionLabel from '@/components/SectionLabel';
import RevealHeadline from '@/components/RevealHeadline';

// Authenticity beat: the claim that the line is real and ours. The phone
// footage that used to sit alongside was removed at the client's request, so
// the statement now carries the section on its own.
export default function FactorySection() {
  const { t } = useI18n();

  return (
    <section className="overflow-hidden bg-canvas">
      <div className="container-site section-y">
        <SectionLabel>{t.home.factory.label}</SectionLabel>
        <RevealHeadline
          text={t.home.factory.headline}
          className="headline mt-6 max-w-4xl text-3xl text-ink sm:text-4xl md:text-5xl"
        />
        <p className="mt-6 max-w-xl leading-relaxed text-muted">
          {t.home.factory.body}
        </p>
      </div>
    </section>
  );
}
