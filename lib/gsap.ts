'use client';

// Single GSAP registration point. Import gsap/ScrollTrigger/SplitText from
// here so plugins are registered exactly once.
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger, SplitText, useGSAP);

// House easing — matches the site's easeOutCubic motion language.
export const GSAP_EASE = 'cubic-bezier(0.215, 0.61, 0.355, 1)';

// Shared matchMedia conditions: rich motion only on fine-pointer desktop
// with no reduced-motion preference.
export const MM_DESKTOP =
  '(min-width: 768px) and (prefers-reduced-motion: no-preference)';
export const MM_ANY_MOTION = '(prefers-reduced-motion: no-preference)';

export { gsap, ScrollTrigger, SplitText, useGSAP };
