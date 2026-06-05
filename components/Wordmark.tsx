import Link from 'next/link';

// "WE CAN" wordmark with a tiny lighter "Ltd." superscript.
export default function Wordmark({
  invert = false,
  className = '',
}: {
  invert?: boolean;
  className?: string;
}) {
  return (
    <Link
      href="/"
      aria-label="We Can Ltd. — home"
      className={`group inline-flex items-baseline font-display text-lg font-semibold tracking-tight ${
        invert ? 'text-canvas' : 'text-ink'
      } ${className}`}
    >
      <span>WE CAN</span>
      <sup
        className={`ml-1 text-[0.6rem] font-normal ${
          invert ? 'text-aluminum' : 'text-muted'
        }`}
      >
        Ltd.
      </sup>
    </Link>
  );
}
