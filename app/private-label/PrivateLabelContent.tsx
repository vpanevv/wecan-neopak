'use client';

import { useI18n } from '@/lib/i18n/context';
import PLHero from '@/components/private-label/PLHero';
import Step1Beverage from '@/components/private-label/Step1Beverage';
import Step2CanSize from '@/components/private-label/Step2CanSize';
import Step3Decoration from '@/components/private-label/Step3Decoration';
import Step4Detail from '@/components/private-label/Step4Detail';
import PLCapacity from '@/components/private-label/PLCapacity';
import BottlingLine from '@/components/private-label/BottlingLine';
import ClosingCTA from '@/components/ClosingCTA';

export default function PrivateLabelContent() {
  const { t } = useI18n();

  return (
    <>
      <PLHero />
      <Step1Beverage />
      <Step2CanSize />
      <Step3Decoration />
      <Step4Detail />
      <PLCapacity />
      <BottlingLine />
      <ClosingCTA
        label={t.privateLabel.closing.label}
        headline={t.privateLabel.closing.headline}
        body={t.privateLabel.closing.body}
        cta={t.privateLabel.closing.cta}
      />
    </>
  );
}
