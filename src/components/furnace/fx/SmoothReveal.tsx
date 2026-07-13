'use client';

import { useRef } from 'react';
import { m } from 'framer-motion';

/**
 * Default entrance for any block: rises, sharpens, settles on a spring.
 * Clears the leftover filter after the animation so a mix-blend child never
 * loses its blend to an isolated stacking context.
 */
export function SmoothReveal({
  children,
  className,
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  return (
    <m.div
      ref={ref}
      initial={{ opacity: 0, y: 24, filter: 'blur(8px)' }}
      whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ type: 'spring', stiffness: 120, damping: 22, delay }}
      onAnimationComplete={() => {
        if (ref.current) ref.current.style.filter = '';
      }}
      className={className}
    >
      {children}
    </m.div>
  );
}
