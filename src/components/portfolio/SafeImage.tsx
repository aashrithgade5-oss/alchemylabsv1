'use client';
import { useState } from 'react';
import Image, { type ImageProps } from 'next/image';

/** next/image that swaps to `fallback` if `src` is missing (assets still being generated). */
export const SafeImage = ({ src, fallback = '/media/aether-bento.png', ...rest }: ImageProps & { fallback?: string }) => {
  const [failed, setFailed] = useState(false);
  return <Image {...rest} src={failed ? fallback : src} onError={() => setFailed(true)} />;
};
