'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { useI18n } from '@/lib/i18n/context';
import { EASE } from '@/lib/animations';
import Logo from './Logo';
import LanguageToggle from './LanguageToggle';

export default function Nav() {
  const { t, locale } = useI18n();
  const pathname = usePathname();
  const logoAlt =
    locale === 'bg' ? 'We Can — Решения за консервиране' : 'We Can — Canning Solutions';
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const isHome = pathname === '/';
  // Transparent only when over the home hero and not yet scrolled.
  const transparent = isHome && !scrolled && !menuOpen;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close the mobile menu on route change.
  useEffect(() => setMenuOpen(false), [pathname]);

  const links = [
    { href: '/', label: t.nav.home },
    { href: '/private-label', label: t.nav.privateLabel },
    { href: '/contact', label: t.nav.contact },
  ];

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-500 ease-intent ${
        transparent
          ? 'border-b border-transparent bg-transparent'
          : 'border-b border-ink/10 bg-canvas/85 backdrop-blur-md'
      }`}
    >
      <nav className="container-site flex h-16 items-center justify-between md:h-20">
        <Logo
          variant="dark"
          heightClass="h-9 md:h-12"
          priority
          interactive
          alt={logoAlt}
        />

        {/* Center links — desktop */}
        <ul className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-8 md:flex">
          {links.map((link) => {
            const active = pathname === link.href;
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`font-sans text-sm transition-colors duration-300 hover:text-ink ${
                    active ? 'text-ink' : 'text-muted'
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            );
          })}
        </ul>

        {/* Right cluster — desktop */}
        <div className="hidden items-center gap-6 md:flex">
          <LanguageToggle />
          <Link href="/contact" className="btn-primary !px-5 !py-2.5 text-xs">
            {t.nav.cta}
          </Link>
        </div>

        {/* Mobile controls */}
        <div className="flex items-center gap-4 md:hidden">
          <LanguageToggle />
          <button
            type="button"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((o) => !o)}
            className="text-ink"
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3, ease: EASE }}
            className="border-t border-ink/10 bg-canvas md:hidden"
          >
            <ul className="container-site flex flex-col gap-1 py-6">
              {links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="block py-3 font-display text-2xl font-medium tracking-tight"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              <li className="pt-4">
                <Link href="/contact" className="btn-primary w-full">
                  {t.nav.cta}
                </Link>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
