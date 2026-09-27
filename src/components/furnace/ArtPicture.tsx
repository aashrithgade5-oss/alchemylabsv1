import { getImageProps } from 'next/image';

/**
 * Art-directed full-bleed image: phones get the tall frame, md+ the wide
 * one, via <picture>, so each device downloads exactly one optimized file.
 */
export function ArtPicture({
  wide,
  tall,
  className = '',
  priority = true,
  quality = 80,
}: {
  wide: { src: string; w: number; h: number };
  tall: { src: string; w: number; h: number };
  className?: string;
  priority?: boolean;
  quality?: number;
}) {
  const common = { alt: '', sizes: '100vw', quality, priority } as const;
  const {
    props: { srcSet: wideSet },
  } = getImageProps({ ...common, src: wide.src, width: wide.w, height: wide.h });
  const {
    props: { srcSet: tallSet, ...rest },
  } = getImageProps({ ...common, src: tall.src, width: tall.w, height: tall.h });
  return (
    <picture>
      <source media="(min-width: 768px)" srcSet={wideSet} sizes="100vw" />
      <source media="(max-width: 767px)" srcSet={tallSet} sizes="100vw" />
      {/* eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text */}
      <img {...rest} className={`absolute inset-0 h-full w-full object-cover ${className}`} />
    </picture>
  );
}
