'use client';

import { useState } from 'react';
import Image, { type ImageProps } from 'next/image';

const FALLBACK = '/media/red-glass-panels-poster.jpg';

/** next/image that swaps to the house poster if the generated asset 404s. */
export function SvcImage({ src, alt, ...rest }: ImageProps) {
  const [failed, setFailed] = useState(false);
  return (
    <Image {...rest} src={failed ? FALLBACK : src} alt={alt} onError={() => setFailed(true)} />
  );
}

/**
 * Pillar loop: muted inline video over its poster. If the mp4 fails the
 * video unmounts and whatever sits beneath (poster / still) remains.
 */
export function PillarLoop({ slug, className = '' }: { slug: string; className?: string }) {
  const [failed, setFailed] = useState(false);
  if (failed) return null;
  return (
    <video
      aria-hidden
      autoPlay
      muted
      loop
      playsInline
      preload="metadata"
      poster={`/media/svc/pillar-${slug}.webp`}
      onError={() => setFailed(true)}
      className={className}
    >
      <source src={`/media/svc/pillar-${slug}.mp4`} type="video/mp4" onError={() => setFailed(true)} />
    </video>
  );
}
