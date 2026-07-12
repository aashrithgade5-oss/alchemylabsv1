'use client';

import { m, useReducedMotion, useScroll, useTransform } from 'framer-motion';

/**
 * One persistent background surface for the whole page. LayoutTransition's
 * transform wrapper breaks position:fixed for descendants, so this paints as
 * a page-height absolute field: void base + two ember layers that crossfade
 * and drift with scroll so the warmth shifts hue and position as the page
 * moves. Opacity/transform only; the continuous grain lives in GrainOverlay
 * at the root (outside the transform wrapper, genuinely fixed).
 */
export function HomeAtmosphere() {
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll();

  const breathe = useTransform(scrollYProgress, [0, 0.35, 0.7, 1], [0.5, 1, 0.6, 1]);
  const warmth = useTransform(scrollYProgress, [0, 0.4, 0.75, 1], [0, 0.7, 0.3, 0.6]);
  const driftA = useTransform(scrollYProgress, [0, 1], ['0%', '-3%']);
  const driftB = useTransform(scrollYProgress, [0, 1], ['2%', '-1%']);

  return (
    <div aria-hidden className="absolute inset-0 -z-10 overflow-hidden bg-void">
      {/* deep ember field */}
      <m.div
        className="absolute inset-0"
        style={{
          opacity: reduced ? 0.7 : breathe,
          y: reduced ? 0 : driftA,
          background: `
            radial-gradient(80rem 50rem at 15% 32%, rgba(178,34,20,0.07) 0%, transparent 60%),
            radial-gradient(90rem 55rem at 85% 55%, rgba(178,34,20,0.09) 0%, transparent 60%),
            radial-gradient(100rem 60rem at 50% 88%, rgba(178,34,20,0.08) 0%, transparent 65%)
          `,
        }}
      />
      {/* warmer crimson-amber layer, rises through the middle passages */}
      <m.div
        className="absolute inset-0"
        style={{
          opacity: reduced ? 0.3 : warmth,
          y: reduced ? 0 : driftB,
          background: `
            radial-gradient(70rem 45rem at 78% 22%, rgba(220,68,28,0.06) 0%, transparent 60%),
            radial-gradient(85rem 50rem at 22% 70%, rgba(255,100,40,0.04) 0%, transparent 60%)
          `,
        }}
      />
    </div>
  );
}
