'use client';

import { m, useReducedMotion } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState, memo } from 'react';
import { resetScroll } from '@/components/LenisProvider';
import { EASE } from '@lib/motion';

const ScrollRestoration = memo(() => {
  const pathname = usePathname();

  useEffect(() => {
    // NOT window.scrollTo — Lenis owns the scroll position and would keep its
    // stale offset, snapping the new page back down on the first wheel tick.
    resetScroll();
  }, [pathname]);

  return null;
});

ScrollRestoration.displayName = 'ScrollRestoration';

/**
 * Patches-5 route veil: on every client navigation (never the first load,
 * which the preloader owns) a void curtain with the atom and an ember rim
 * lifts off the new page in 0.7s. The page swaps underneath at once, so
 * there is no exit wait and no blank frame; reduced motion skips it.
 */
function RouteVeil() {
  const pathname = usePathname();
  const reduced = useReducedMotion();
  const first = useRef(true);
  const [run, setRun] = useState(0);

  useEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }
    // the private vault is a bare tool surface: no theatre
    if (!reduced && !pathname.startsWith('/alchemy-vault')) setRun((v) => v + 1);
  }, [pathname, reduced]);

  if (!run) return null;
  return (
    <m.div
      key={run}
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[95] flex items-center justify-center bg-void"
      initial={{ y: '0%' }}
      animate={{ y: '-101%' }}
      transition={{ duration: 0.7, delay: 0.12, ease: EASE.inOut }}
    >
      <m.img
        src="/media/alchemy-minimal-logo.png"
        alt=""
        width={44}
        height={44}
        initial={{ opacity: 1, scale: 1 }}
        animate={{ opacity: 0, scale: 0.9 }}
        transition={{ duration: 0.35, ease: EASE.out }}
      />
      <span className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-ember to-transparent shadow-[0_0_24px_rgba(255,77,28,0.6)]" />
    </m.div>
  );
}

export function LayoutTransition({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ScrollRestoration />
      <div className="min-h-screen">{children}</div>
      <RouteVeil />
    </>
  );
}
