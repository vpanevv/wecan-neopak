import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './lib/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        // Warm off-white, never pure white
        canvas: '#FAFAFA',
        // Subtle cream for alternating sections
        cream: '#F0EFEC',
        // Near-black accent / dark sections
        ink: '#0F1011',
        // Muted text
        muted: '#6B6E72',
        // Warm aluminum silver — references the product material
        aluminum: '#B0B5B8',
        // Vibrant industrial orange — used VERY sparingly
        ember: '#E85D2F',
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
