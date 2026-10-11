'use client';

import { useEffect, useRef, type ReactNode } from 'react';

/**
 * Pauses every CSS animation inside it while it is off screen (Patches-7).
 * Infinite marquees kept compositing on every page even when nobody could
 * see them; this flips `data-live` and `.live-gate[data-live='0']` pauses them.
 */
export function LiveWhenVisible({ children, className = '', margin = '120px' }: { children: ReactNode; className?: string; margin?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => el.setAttribute('data-live', e.isIntersecting ? '1' : '0'), { rootMargin: margin });
    io.observe(el);
    return () => io.disconnect();
  }, [margin]);
  return (
    <div ref={ref} data-live="0" className={`live-gate ${className}`}>
      {children}
    </div>
  );
}
