import Image from 'next/image';
import Link from 'next/link';

// Intrinsic dimensions of the processed, trimmed logo assets in /public.
// TODO: Replace with a transparent PNG/SVG master from the client for best results.
const LOGO_W = 721;
const LOGO_H = 479;

interface LogoProps {
  /** 'dark' = navy mark for light backgrounds; 'light' = off-white mark for dark backgrounds. */
  variant?: 'dark' | 'light';
  /** Tailwind height class controls rendered size; width auto-scales (aspect preserved). */
  heightClass?: string;
  /** Wrap in a link to the homepage. */
  href?: string | null;
  priority?: boolean;
  /** Localized, descriptive alt text. */
  alt: string;
  className?: string;
  /** Subtle premium hover (opacity) — used in the navbar. */
  interactive?: boolean;
}

export default function Logo({
  variant = 'dark',
  heightClass = 'h-10',
  href = '/',
  priority = false,
  alt,
  className = '',
  interactive = false,
}: LogoProps) {
  const src = variant === 'light' ? '/logo-wecan-light.png' : '/logo-wecan.png';

  const img = (
    <Image
      src={src}
      alt={alt}
      width={LOGO_W}
      height={LOGO_H}
      priority={priority}
      loading={priority ? undefined : 'lazy'}
      sizes="(max-width: 768px) 180px, 240px"
      className={`${heightClass} w-auto select-none ${className}`}
    />
  );

  if (!href) return img;

  return (
    <Link
      href={href}
      aria-label="We Can — home"
      className={`inline-flex items-center transition-opacity duration-300 ease-intent ${
        interactive ? 'hover:opacity-80' : ''
      }`}
    >
      {img}
    </Link>
  );
}
