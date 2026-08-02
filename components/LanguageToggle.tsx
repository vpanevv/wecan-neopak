'use client';

import { useI18n } from '@/lib/i18n/context';

// EN / BG language picker. The control itself is a checkbox styled as a
// sliding switch (unchecked = English, checked = Bulgarian); the words sit
// either side so it still reads as a language picker rather than a generic
// on/off. The words are aria-hidden because the input already carries the
// accessible name and its own checked state.
export default function LanguageToggle({ invert = false }: { invert?: boolean }) {
  const { locale, setLocale } = useI18n();
  const isBg = locale === 'bg';

  const dim = invert ? 'text-aluminum' : 'text-muted';
  const active = invert ? 'text-canvas' : 'text-ink';

  return (
    <div
      role="group"
      aria-label="Language"
      className="flex items-center gap-2 font-sans text-xs font-medium uppercase tracking-label"
    >
      <span aria-hidden className={`transition-colors duration-300 ${isBg ? dim : active}`}>
        EN
      </span>

      <label className="lang-switch">
        <input
          type="checkbox"
          checked={isBg}
          onChange={(e) => setLocale(e.target.checked ? 'bg' : 'en')}
          aria-label={
            isBg ? 'Switch language to English' : 'Switch language to Bulgarian'
          }
        />
        <span className="lang-slider" />
      </label>

      <span aria-hidden className={`transition-colors duration-300 ${isBg ? active : dim}`}>
        BG
      </span>
    </div>
  );
}
