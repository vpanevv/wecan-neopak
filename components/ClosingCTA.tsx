'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import SectionLabel from './SectionLabel';
import RevealHeadline from './RevealHeadline';
import Reveal from './Reveal';

interface ClosingCTAProps {
  label: string;
  headline: string;
  body: string;
  cta: string;
}

// Shared closing call-to-action on a cream background. Links to /contact.
export default function ClosingCTA({ label, headline, body, cta }: ClosingCTAProps) {
  return (
    <section className="bg-cream">
      <div className="container-site section-y">
        <div className="mx-auto flex max-w-[700px] flex-col items-center text-center">
          <SectionLabel>{label}</SectionLabel>
          <RevealHeadline
            text={headline}
            className="headline mt-6 text-4xl text-ink sm:text-5xl md:text-6xl"
          />
          <Reveal delay={0.1}>
            <p className="mt-6 text-lg leading-relaxed text-muted">{body}</p>
          </Reveal>
          <Reveal delay={0.2}>
            <Link href="/contact" className="btn-primary mt-10">
              {cta}
              <ArrowRight size={16} />
            </Link>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
