'use client';

import { useState } from 'react';
import { InViewVideo } from '@/components/furnace/services/SvcMedia';

/**
 * A Higgsfield brand loop laid over its own still (Patches-5): desktop only,
 * fetched when near view, played only while visible, never under reduced
 * motion. It fades in once frames are actually playing, so the still is
 * always what you see first and the cut is invisible.
 */
export function LoopLayer({ src, className = '', style }: { src: string; className?: string; style?: React.CSSProperties }) {
  const [playing, setPlaying] = useState(false);
  return (
    <InViewVideo
      src={src}
      minWidth={768}
      onPlaying={() => setPlaying(true)}
      className={`absolute inset-0 hidden h-full w-full object-cover transition-opacity duration-[1400ms] md:block ${playing ? 'opacity-100' : 'opacity-0'} ${className}`}
      style={style}
    />
  );
}
