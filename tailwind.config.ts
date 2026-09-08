import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './lib/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      // Deep-blue gradient identity. Light surfaces run cool grey to blue,
      // dark surfaces deep navy to a brighter blue; the gradients themselves
      // live in globals.css, these are the flat stops behind them.
      // The surface stops sit at the limit of what the text colours allow:
      // every pair clears WCAG AA against the *far end* of its gradient, not
      // just the flat stop, with a worst case of 4.52:1 (muted on canvas-deep).
      colors: {
        // Light gradient start — cool grey, as in the banner artwork
        canvas: '#E8EBF0',
        // Light gradient end — as deep as `muted` text can sit on (4.52:1)
        'canvas-deep': '#B8C8E6',
        // Panels and alternating sections
        cream: '#D2DBEB',
        // Near-black navy — body text
        ink: '#0A1124',
        // Dark gradient stops — deep blue rather than near-black
        navy: '#0B2148',
        royal: '#1B4A8F',
        // Secondary text — AA on the light gradient through to its far end
        muted: '#4A5466',
        // Secondary text on dark surfaces
        aluminum: '#BCC7DC',
        // Single accent, used sparingly (was the old ember orange)
        accent: '#2F4CA8',
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        display: ['var(--font-display)', 'var(--font-inter)', 'sans-serif'],
        mono: ['var(--font-mono)', 'ui-monospace', 'monospace'],
      },
      fontSize: {
        '8xl': ['6rem', { lineHeight: '1.02', letterSpacing: '-0.03em' }],
        '9xl': ['8rem', { lineHeight: '1.0', letterSpacing: '-0.035em' }],
      },
      letterSpacing: {
        label: '0.18em',
      },
      maxWidth: {
        '6xl': '72rem',
      },
      transitionTimingFunction: {
        // easeOutCubic — slow, intentional, never bouncy
        intent: 'cubic-bezier(0.215, 0.61, 0.355, 1)',
      },
    },
  },
  plugins: [],
};

export default config;
