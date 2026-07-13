'use client';

import { useEffect, useRef } from 'react';
import { useAnimationFrame, useReducedMotion } from 'framer-motion';
import Lenis from 'lenis';

/**
 * Smooth-scroll FEEL only: Lenis with its own rAF disabled, stepped from
 * framer-motion's frame loop so the two never compete for frames. Skipped
 * entirely under prefers-reduced-motion (native instant scroll).
 */
export function LenisProvider() {
  const lenisRef = useRef<Lenis | null>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) return;
    const lenis = new Lenis({ autoRaf: false, lerp: 0.12 });
    lenisRef.current = lenis;
    return () => {
      lenis.destroy();
      lenisRef.current = null;
    };
  }, [reduced]);

  useAnimationFrame((time) => {
    lenisRef.current?.raf(time);
  });

  return null;
}
