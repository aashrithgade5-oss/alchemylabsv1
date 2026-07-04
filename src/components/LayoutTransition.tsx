'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { useEffect, memo } from 'react';

const pageVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
};

const ScrollRestoration = memo(() => {
  const pathname = usePathname();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
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
        <motion.div
          key={pathname}
          variants={pageVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          transition={{ duration: 0.2, ease: 'easeOut' }}
          className="min-h-screen gpu-accelerated"
        >
          {children}
        </motion.div>
      </AnimatePresence>
    </>
  );
}
