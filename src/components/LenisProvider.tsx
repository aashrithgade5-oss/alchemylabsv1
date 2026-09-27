'use client';

import { useEffect, useRef } from 'react';
import { useAnimationFrame, useReducedMotion } from 'framer-motion';
import Lenis from 'lenis';

/**
 * Smooth-scroll FEEL only: Lenis with its own rAF disabled, stepped from
 * framer-motion's frame loop so the two never compete for frames. Skipped
 * entirely under prefers-reduced-motion (native instant scroll).
 */
// Module-scoped handle so the router's scroll reset can talk to the SAME
// instance. Lenis keeps its own animatedScroll/targetScroll state; a bare
// window.scrollTo(0) leaves that state stale, so the next wheel tick animates
// from the PREVIOUS page's offset and the new page visibly jumps back down.
// Anything that resets scroll must go through here — see resetScroll().
let activeLenis: Lenis | null = null;

/** Jump to the top in a way Lenis agrees with. Safe before/without Lenis. */
export function resetScroll() {
  if (activeLenis) {
    activeLenis.scrollTo(0, { immediate: true, force: true });
    return;
  }
  window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
}

/** Freeze/unfreeze smooth scroll (the preloader holds the page still). */
export function setScrollLocked(locked: boolean) {
  if (!activeLenis) return;
  if (locked) activeLenis.stop();
  else activeLenis.start();
}

export function LenisProvider() {
  const lenisRef = useRef<Lenis | null>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) return;
    // lerp 0.16: smooth but tight — 0.12 made scroll-scrubbed reveals trail
    // the wheel noticeably (the "lethargic" feel).
    const lenis = new Lenis({ autoRaf: false, lerp: 0.16 });
    lenisRef.current = lenis;
    activeLenis = lenis;
    return () => {
      lenis.destroy();
      lenisRef.current = null;
      activeLenis = null;
    };
  }, [reduced]);

  useAnimationFrame((time) => {
    lenisRef.current?.raf(time);
  });

  return null;
}
