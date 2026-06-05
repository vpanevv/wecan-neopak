'use client';

import Link from 'next/link';
import { useI18n } from '@/lib/i18n/context';
import Logo from './Logo';

export default function Footer() {
  const { t, locale } = useI18n();
  const logoAlt =
    locale === 'bg' ? 'We Can — Решения за консервиране' : 'We Can — Canning Solutions';

  return (
    <footer className="bg-ink text-canvas">
      <div className="container-site py-16 md:py-20">
        <div className="grid gap-12 md:grid-cols-3 md:gap-8">
          {/* Logo (light, for the dark footer) + tagline */}
          <div className="max-w-xs">
            <Logo variant="light" heightClass="h-16" href={null} alt={logoAlt} />
            <p className="mt-5 text-sm leading-relaxed text-aluminum">
              {t.footer.wordmarkTagline}
            </p>
          </div>

          {/* Quick links */}
          <div className="grid grid-cols-2 gap-8">
            <div>
              <h3 className="label text-aluminum">{t.footer.linksHeading}</h3>
              <ul className="mt-5 space-y-3 text-sm">
                <li>
                  <Link href="/" className="text-canvas/80 transition-colors hover:text-canvas">
                    {t.nav.home}
                  </Link>
                </li>
                <li>
                  <Link
                    href="/private-label"
                    className="text-canvas/80 transition-colors hover:text-canvas"
                  >
                    {t.nav.privateLabel}
                  </Link>
                </li>
                <li>
                  <Link
                    href="/contact"
                    className="text-canvas/80 transition-colors hover:text-canvas"
                  >
                    {t.nav.contact}
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="label text-aluminum">{t.footer.exploreHeading}</h3>
              <ul className="mt-5 space-y-3 text-sm">
                <li>
                  <Link
                    href="/#capabilities"
                    className="text-canvas/80 transition-colors hover:text-canvas"
                  >
                    {t.footer.capabilities}
                  </Link>
                </li>
                <li>
                  <Link
                    href="/#process"
                    className="text-canvas/80 transition-colors hover:text-canvas"
                  >
                    {t.footer.process}
                  </Link>
                </li>
                <li>
                  <Link
                    href="/#sustainability"
                    className="text-canvas/80 transition-colors hover:text-canvas"
                  >
                    {t.footer.sustainability}
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Contact info */}
          <div>
            <h3 className="label text-aluminum">{t.footer.contactHeading}</h3>
            {/* TODO: Replace placeholders with client-provided contact details */}
            <ul className="mt-5 space-y-3 text-sm text-canvas/80">
              <li>{t.contact.addressValue}</li>
              <li>
                <a
                  href={`mailto:${t.contact.emailValue}`}
                  className="transition-colors hover:text-canvas"
                >
                  {t.contact.emailValue}
                </a>
              </li>
              <li>{t.contact.phoneValue}</li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-16 flex flex-col gap-3 border-t border-white/10 pt-8 text-xs text-aluminum sm:flex-row sm:items-center sm:justify-between">
          <p>{t.footer.rights}</p>
          <a
            href="https://vladimirpanev.com"
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:text-canvas"
          >
            {t.footer.designedBy}
          </a>
        </div>
      </div>
    </footer>
  );
}
