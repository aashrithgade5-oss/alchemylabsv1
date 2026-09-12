'use client';

import { AnimatePresence, m } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { useEffect, memo } from 'react';
import { resetScroll } from '@/components/LenisProvider';

const pageVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
};

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

export function LayoutTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <>
      <ScrollRestoration />
      <AnimatePresence mode="wait" initial={false}>
        <m.div
          key={pathname}
          variants={pageVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          transition={{ duration: 0.2, ease: 'easeOut' }}
          className="min-h-screen gpu-accelerated"
        >
          {children}
        </m.div>
      </AnimatePresence>
    </>
  );
}
