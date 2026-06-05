// Shared Framer Motion variants. All animations use transform/opacity only
// (GPU-accelerated) with slow, intentional easeOutCubic — never bouncy.
import type { Variants } from 'framer-motion';

// cubic-bezier easeOutCubic
export const EASE = [0.215, 0.61, 0.355, 1] as const;

// Word-by-word headline reveal: container staggers each child.
export const headlineContainer: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.06, delayChildren: 0.1 },
  },
};

export const headlineWord: Variants = {
  hidden: { opacity: 0, y: '0.4em' },
  visible: {
    opacity: 1,
    y: '0em',
    transition: { duration: 0.8, ease: EASE },
  },
};

// Generic fade-up used for subheads, paragraphs, single elements.
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: EASE },
  },
};

// Soft fade with no movement — for quote strips and large statements.
export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 1, ease: EASE } },
};

// Stagger container for grids / lists of cards.
export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08, delayChildren: 0.05 },
  },
};

// Per-item entrance inside a stagger container.
export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: EASE },
  },
};

// Shared viewport config — animate once, trigger slightly before fully in view.
export const viewportOnce = { once: true, margin: '-80px' } as const;
