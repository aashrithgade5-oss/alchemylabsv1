'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { m, AnimatePresence, useReducedMotion } from 'framer-motion';
import { DecodeText } from '../DecodeText';

const SEEN_KEY = 'furnace-loader-seen';

/**
 * Opening sequence: void field, the atom mark ringed by a single ember
 * hairline drawing itself closed, the studio name decoding underneath.
 * Lifts like a curtain into the hero. Skipped under reduced motion and
 * on repeat visits within the session; hard-capped so it never blocks.
 */
export function Loader() {
  const reduced = useReducedMotion();
  // null until hydration decides; skipped visits never mount the overlay.
  // Mount-then-instant-exit wedges AnimatePresence during hydration and the
  // stuck (invisible) overlay swallows every click on the page.
  const [show, setShow] = useState<boolean | null>(null);

  useEffect(() => {
    if (reduced || sessionStorage.getItem(SEEN_KEY)) return;
    sessionStorage.setItem(SEEN_KEY, '1');
    setShow(true);
    const t = setTimeout(() => setShow(false), 2300);
    return () => clearTimeout(t);
  }, [reduced]);

  return (
    <AnimatePresence>
      {show && (
        <m.div
          aria-hidden
          exit={{ y: '-100%' }}
          transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[90] flex flex-col items-center justify-center bg-void"
        >
          <div className="relative flex h-28 w-28 items-center justify-center">
            <svg viewBox="0 0 112 112" className="absolute inset-0 h-full w-full -rotate-90">
              <m.circle
                cx="56"
                cy="56"
                r="54"
                fill="none"
                stroke="#FF4D1C"
                strokeWidth="1"
                initial={{ pathLength: 0, opacity: 0.4 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 1.7, ease: [0.65, 0, 0.35, 1], delay: 0.15 }}
              />
            </svg>
            <m.div
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
            >
              <Image src="/assets/alchemy-minimal-logo.png" alt="" width={56} height={56} priority />
            </m.div>
          </div>
          <m.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-8 font-mono text-[10px] tracking-[0.4em] text-bone/70"
          >
            <DecodeText text="ALCHEMY LABS" delay={550} />
          </m.p>
        </m.div>
      )}
    </AnimatePresence>
  );
}
