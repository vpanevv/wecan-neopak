'use client';

import { motion } from 'framer-motion';
import { headlineContainer, headlineWord, viewportOnce } from '@/lib/animations';

interface RevealHeadlineProps {
  /** A string (split into words) or array of lines (each line wraps). */
  text: string | string[];
  className?: string;
  /** Render eagerly on mount instead of on scroll (used in heroes). */
  immediate?: boolean;
  as?: 'h1' | 'h2';
}

// Word-by-word fade-up headline. Words animate with a ~60ms stagger.
export default function RevealHeadline({
  text,
  className = '',
  immediate = false,
  as = 'h2',
}: RevealHeadlineProps) {
  const lines = Array.isArray(text) ? text : [text];
  const Tag = motion[as];

  const animateProps = immediate
    ? { initial: 'hidden' as const, animate: 'visible' as const }
    : {
        initial: 'hidden' as const,
        whileInView: 'visible' as const,
        viewport: viewportOnce,
      };

  return (
    <Tag variants={headlineContainer} {...animateProps} className={className}>
      {lines.map((line, lineIndex) => (
        <span key={lineIndex} className="block">
          {line.split(' ').map((word, wordIndex) => (
            <span
              key={`${lineIndex}-${wordIndex}`}
              className="mr-[0.24em] inline-block overflow-hidden align-bottom last:mr-0"
            >
              <motion.span variants={headlineWord} className="inline-block">
                {word}
              </motion.span>
            </span>
          ))}
        </span>
      ))}
    </Tag>
  );
}
