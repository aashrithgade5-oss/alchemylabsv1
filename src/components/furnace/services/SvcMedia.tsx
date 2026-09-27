'use client';

import { useEffect, useRef, useState } from 'react';
import Image, { type ImageProps } from 'next/image';
import { useInView, useReducedMotion } from 'framer-motion';

const FALLBACK = '/media/red-glass-panels-poster.jpg';

/** next/image that swaps to the house poster if the generated asset 404s. */
export function SvcImage({ src, alt, ...rest }: ImageProps) {
  const [failed, setFailed] = useState(false);
  return (
    <Image {...rest} src={failed ? FALLBACK : src} alt={alt} onError={() => setFailed(true)} />
  );
}

/**
 * Viewport-gated muted loop: preload="none" (zero bytes until needed), the
 * source is only attached once the element is near the viewport, plays
 * only while visible and pauses off-screen. Reduced motion never mounts a
 * source, so the poster/still underneath is all that renders. On any load
 * error the video unmounts and whatever sits beneath remains.
 */
export function InViewVideo({
  src,
  poster,
  className = '',
  minWidth = 0,
  onPlaying,
  style,
}: {
  src: string;
  poster?: string;
  className?: string;
  /** Only attach the source at or above this viewport width (px). */
  minWidth?: number;
  onPlaying?: () => void;
  style?: React.CSSProperties;
}) {
  const ref = useRef<HTMLVideoElement>(null);
  const reduced = useReducedMotion();
  const near = useInView(ref, { margin: '25% 0px', once: true });
  const visible = useInView(ref, { amount: 0.15 });
  const [failed, setFailed] = useState(false);
  const [wideEnough, setWideEnough] = useState(minWidth === 0);

  useEffect(() => {
    if (!minWidth) return;
    const mq = window.matchMedia(`(min-width: ${minWidth}px)`);
    const sync = () => setWideEnough(mq.matches);
    sync();
    mq.addEventListener('change', sync);
    return () => mq.removeEventListener('change', sync);
  }, [minWidth]);

  const armed = near && wideEnough && !reduced;

  // a <source> added after mount needs an explicit load()
  useEffect(() => {
    if (armed) ref.current?.load();
  }, [armed]);

  useEffect(() => {
    const v = ref.current;
    if (!v || !armed) return;
    if (visible) v.play().catch(() => {});
    else v.pause();
  }, [visible, armed]);

  if (failed || reduced) return null;
  return (
    <video
      ref={ref}
      aria-hidden
      muted
      loop
      playsInline
      preload="none"
      poster={poster}
      onError={() => setFailed(true)}
      onPlaying={onPlaying}
      className={className}
      style={style}
    >
      {armed && <source src={src} type="video/mp4" onError={() => setFailed(true)} />}
    </video>
  );
}
