'use client';

import { memo, useState, useEffect, ReactNode } from 'react';
import { cn, getIsMobile } from '@/lib/utils';

interface MarqueeRowProps {
  children: ReactNode[];
  direction?: 'left' | 'right';
  speed?: 'slow' | 'medium' | 'fast';
  /** Seconds for one full loop; overrides `speed`. */
  duration?: number;
  className?: string;
  pauseOnHover?: boolean;
  gap?: number;
}

const speedDurations = { slow: 80, medium: 55, fast: 35 };

/**
 * Seamless CSS marquee: two identical sets, each carrying a trailing gap, so
 * translating -50% lands exactly on the start of set two. Pauses on hover and
 * keyboard focus without snapping back. Touch devices and reduced-motion users
 * get a native horizontal scroller instead.
 */
export const MarqueeRow = memo(({
  children,
  direction = 'left',
  speed = 'medium',
  duration,
  className,
  pauseOnHover = true,
  gap = 24,
}: MarqueeRowProps) => {
  const [isStatic, setIsStatic] = useState(true);

  useEffect(() => {
    setIsStatic(getIsMobile() || window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  }, []);

  if (isStatic) {
    return (
      <div className={cn('overflow-x-auto snap-x snap-mandatory px-4 sm:px-6 [scrollbar-width:none]', className)} style={{ WebkitOverflowScrolling: 'touch' }}>
        <div className="flex w-max" style={{ gap }}>{children}</div>
      </div>
    );
  }

  const set = (hidden: boolean) => (
    <div className="flex shrink-0" style={{ gap, paddingRight: gap }} aria-hidden={hidden || undefined}>
      {children}
    </div>
  );

  return (
    <div
      className={cn('mq-row overflow-hidden', pauseOnHover && 'mq-pausable', className)}
      style={{ maskImage: 'linear-gradient(90deg, transparent, #000 6%, #000 94%, transparent)', WebkitMaskImage: 'linear-gradient(90deg, transparent, #000 6%, #000 94%, transparent)' }}
    >
      <div
        className="mq-track flex w-max"
        style={{ animation: `mqScroll ${duration ?? speedDurations[speed]}s linear infinite`, animationDirection: direction === 'left' ? 'normal' : 'reverse' }}
      >
        {set(false)}
        {set(true)}
      </div>
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes mqScroll { from { transform: translate3d(0,0,0); } to { transform: translate3d(-50%,0,0); } }
        .mq-track { will-change: transform; padding-block: 12px; }
        .mq-pausable:hover .mq-track, .mq-pausable:focus-within .mq-track { animation-play-state: paused; }
      ` }} />
    </div>
  );
});

MarqueeRow.displayName = 'MarqueeRow';
