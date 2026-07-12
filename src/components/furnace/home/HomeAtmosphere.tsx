'use client';

import { m, useReducedMotion, useScroll, useTransform } from 'framer-motion';

/**
 * One persistent background surface for the whole homepage. LayoutTransition's
 * transform wrapper breaks position:fixed for descendants, so this paints as a
 * page-height absolute field instead: the void base plus ember glows feathered
 * across the section boundaries, with a scroll-linked breathe on top. Sections
 * above it stay transparent so the page reads as one continuous surface.
 */
export function HomeAtmosphere() {
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const breathe = useTransform(scrollYProgress, [0, 0.35, 0.7, 1], [0.5, 1, 0.6, 1]);

  return (
    <div aria-hidden className="absolute inset-0 -z-10 overflow-hidden bg-void">
      <m.div
        className="absolute inset-0"
        style={{
          opacity: reduced ? 0.7 : breathe,
          background: `
            radial-gradient(80rem 50rem at 15% 32%, rgba(178,34,20,0.07) 0%, transparent 60%),
            radial-gradient(90rem 55rem at 85% 55%, rgba(178,34,20,0.09) 0%, transparent 60%),
            radial-gradient(100rem 60rem at 50% 88%, rgba(178,34,20,0.08) 0%, transparent 65%)
          `,
        }}
      />
    </div>
  );
}
