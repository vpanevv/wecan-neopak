import Image from 'next/image';

// Neutral warm-grey blur used as the placeholder for all remote photography.
export const BLUR_DATA_URL =
  'data:image/svg+xml;base64,' +
  Buffer.from(
    '<svg xmlns="http://www.w3.org/2000/svg" width="8" height="8"><rect width="8" height="8" fill="#dedcd7"/></svg>',
  ).toString('base64');

interface EditorialImageProps {
  src: string;
  alt: string;
  className?: string;
  sizes?: string;
  priority?: boolean;
}

// Optimized, lazy-by-default photo with a blur-up placeholder.
// TODO: Replace Unsplash placeholders with client-provided photography.
export default function EditorialImage({
  src,
  alt,
  className = '',
  sizes = '(max-width: 768px) 100vw, 50vw',
  priority = false,
}: EditorialImageProps) {
  return (
    <Image
      src={src}
      alt={alt}
      fill
      sizes={sizes}
      priority={priority}
      placeholder="blur"
      blurDataURL={BLUR_DATA_URL}
      className={className}
    />
  );
}
