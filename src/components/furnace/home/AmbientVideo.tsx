'use client';

import { useEffect, useRef } from 'react';
import { useInView, useReducedMotion } from 'framer-motion';

/**
 * Below-fold backdrop loop: preload=none so mounting costs nothing, the
 * poster holds the frame, and playback only starts once the section is
 * half a viewport away. Pauses again off-screen.
 */
export function AmbientVideo({
  src,
  poster,
  className,
}: {
  src: string;
  poster: string;
  className?: string;
}) {
  const ref = useRef<HTMLVideoElement>(null);
  const reduced = useReducedMotion();
  const inView = useInView(ref, { margin: '50% 0px' });

  useEffect(() => {
    const video = ref.current;
    if (!video || reduced) return;
    if (inView) video.play().catch(() => {});
    else video.pause();
  }, [inView, reduced]);

  return (
    <video ref={ref} loop muted playsInline preload="none" poster={poster} className={className}>
      <source src={src} type="video/mp4" />
    </video>
  );
}
