'use client';

import { useI18n } from '@/lib/i18n/context';
import type { Locale } from '@/lib/i18n/dictionary';

const OPTIONS: Locale[] = ['en', 'bg'];

// Compact EN / BG segmented toggle for the navigation.
export default function LanguageToggle({ invert = false }: { invert?: boolean }) {
  const { locale, setLocale } = useI18n();

  const base = invert ? 'text-aluminum' : 'text-muted';
  const active = invert ? 'text-canvas' : 'text-ink';

  return (
    <div
      role="group"
      aria-label="Language"
      className="flex items-center gap-1 font-sans text-xs font-medium uppercase tracking-label"
    >
      {OPTIONS.map((opt, i) => (
        <span key={opt} className="flex items-center gap-1">
          <button
            type="button"
            onClick={() => setLocale(opt)}
            aria-pressed={locale === opt}
            className={`transition-colors duration-300 ease-intent hover:opacity-70 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 ${
              locale === opt ? active : base
            }`}
          >
            {opt.toUpperCase()}
          </button>
          {i === 0 && <span className={base} aria-hidden>/</span>}
        </span>
      ))}
    </div>
  );
}
