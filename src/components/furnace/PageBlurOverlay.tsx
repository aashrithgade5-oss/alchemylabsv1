'use client';

import { m, useMotionTemplate, useReducedMotion, useScroll, useTransform } from 'framer-motion';

/**
 * R-7a: atmosphere veil — 6px backdrop blur + capped void tint at page top,
 * dissolving to nothing by full scroll ("unfolds as you scroll, gone once you
 * finish"). One layout-level instance in SiteChrome: outside LayoutTransition
 * (its transform wrapper breaks position:fixed for descendants), below the
 * nav's z-[80] so chrome stays sharp.
 *
 * backdrop-filter over the window scroller is normally banned here (scroll
 * jank source) — tolerated only because the blur is capped at 6px, the tint
 * at 0.15 alpha, and `display:none` kicks in once the blur reaches ~0 so a
 * finished scroll pays nothing. If the browser pass shows jank, delete this
 * component — it is atmosphere, not structure.
 */
export function PageBlurOverlay() {
  const reduced = useReducedMotion();
  const { scrollY } = useScroll();
  // Pixel mapping, not scrollYProgress: progress-based blur left 3-5px of fog
  // over 90% of a long page (browser-verified) and kept backdrop-filter alive
  // for the whole scroll. 6px at top → gone across the first ~900px, so the
  // veil lifts as the hero unfolds and later sections render sharp and free.
  const blur = useTransform(scrollY, [0, 900], [6, 0]);
  const backdropFilter = useMotionTemplate`blur(${blur}px)`;
  const tint = useTransform(scrollY, [0, 900], [0.15, 0]);
  const background = useMotionTemplate`rgba(10, 9, 8, ${tint})`;
  const display = useTransform(blur, (v) => (v < 0.3 ? 'none' : 'block'));

  if (reduced) return null;
  return (
    <m.div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[60]"
      style={{ backdropFilter, WebkitBackdropFilter: backdropFilter, background, display }}
    />
  );
}
