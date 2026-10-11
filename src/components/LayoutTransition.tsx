'use client';

import { useReducedMotion } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState, memo } from 'react';
import { resetScroll } from '@/components/LenisProvider';

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
  // CSS keyframes, not framer: the incoming page's mount can block the main
  // thread for a few hundred ms, and a JS-driven veil then skips to its end.
  // A compositor transform animation keeps gliding regardless.
  return (
    <div key={run} aria-hidden className="route-veil pointer-events-none fixed inset-0 z-[95] flex items-center justify-center bg-void">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/media/alchemy-minimal-logo.png" alt="" width={44} height={44} className="route-veil-mark" />
      <span className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-ember to-transparent shadow-[0_0_24px_rgba(255,77,28,0.6)]" />
    </div>
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
