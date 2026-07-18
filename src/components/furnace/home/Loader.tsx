'use client';

import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import {
  m,
  AnimatePresence,
  useReducedMotion,
  useMotionValue,
  useTransform,
  useMotionTemplate,
  useAnimationFrame,
} from 'framer-motion';
import { DecodeText } from '../DecodeText';

const SEEN_KEY = 'furnace-loader-seen';
// R-P8: 2.2 → 2.8s — slower, more cinematic fill (still hard-capped).
const FILL_SECONDS = 2.8;

// Lazy WebGL chunk (same pattern as GlassFluted) so the shader lib never
// lands in homepage First Load JS; the static logo below is the fallback.
const LiquidMetal = dynamic(
  () => import('@paper-design/shaders-react').then((mod) => mod.LiquidMetal),
  { ssr: false },
);

/**
 * Opening sequence: the atom mark as a dim outline, filled bottom-to-top by
 * its liquid-metal self while the counter runs to 100, then the curtain lifts
 * into the hero. Skipped under reduced motion and on repeat visits within the
 * session; the fill timer hard-caps it so it never blocks.
 */
export function Loader() {
  const reduced = useReducedMotion();
  // null until hydration decides; skipped visits never mount the overlay.
  // Mount-then-instant-exit wedges AnimatePresence during hydration and the
  // stuck (invisible) overlay swallows every click on the page.
  const [show, setShow] = useState<boolean | null>(null);
  const progress = useMotionValue(0);
  const counter = useTransform(progress, (v) => Math.round(v));
  // Fill rises: clip the metal layer from the top by the unfilled remainder.
  const clip = useMotionTemplate`inset(${useTransform(progress, (v) => 100 - v)}% 0% 0% 0%)`;

  useEffect(() => {
    if (reduced || sessionStorage.getItem(SEEN_KEY)) return;
    sessionStorage.setItem(SEEN_KEY, '1');
    setShow(true);
  }, [reduced]);

  // Fill driven by rAF, not framer's standalone animate(): that import pulls
  // the full animation engine past LazyMotion and costs ~11kB of First Load.
  // Wall-clock elapsed, not accumulated frame deltas: throttled/occluded tabs
  // get rare frames and framer clamps delta to ~40ms, which would stretch the
  // fill ~25x. Smoothstep easing over FILL_SECONDS, then the curtain exit.
  const startedAt = useRef<number | null>(null);
  useAnimationFrame(() => {
    if (!show) return;
    startedAt.current ??= performance.now();
    const t = Math.min(1, (performance.now() - startedAt.current) / 1000 / FILL_SECONDS);
    progress.set(t * t * (3 - 2 * t) * 100);
    if (t >= 1) setShow(false);
  });

  // Portaled to <body>: LayoutTransition's .gpu-accelerated wrapper carries a
  // permanent transform, which turns any fixed descendant page-absolute — the
  // overlay stretched over the full page and its centered content painted
  // thousands of px below the fold. show is null on the server and on skipped
  // visits (no portal, no document access); once it has been true the portal
  // stays mounted so AnimatePresence can play the curtain exit.
  if (show === null) return null;
  return createPortal(
    <AnimatePresence>
      {show && (
        <m.div
          aria-hidden
          exit={{ y: '-100%' }}
          transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[90] flex flex-col items-center justify-center bg-void"
        >
          {/* C-P22: near-full-viewport dominance (was ~50vh) — the opening
              statement at its final scale */}
          <div className="relative h-[min(85vw,44rem)] w-[min(85vw,44rem)]">
            {/* unfilled state: the mark as a faint outline */}
            {/* scale matches the shader's scale={0.6} so outline and metal register */}
            <Image
              src="/assets/alchemy-minimal-logo.png"
              alt=""
              fill
              priority
              className="scale-[0.6] object-contain opacity-[0.14]"
            />
            {/* filled state: the same mark in liquid metal, revealed bottom-up */}
            <m.div style={{ clipPath: clip }} className="absolute inset-0">
              <LiquidMetal
                image="/assets/alchemy-minimal-logo.png"
                colorBack="#00000000"
                // R-P8 recolor: cream tint + warm-shifted fringe (red up,
                // blue down) puts the metal in the bone/ember family instead
                // of cold white; speed eased for a slower, cinematic read.
                // C-P22: livelier metal — more repetition bands, deeper
                // distortion, speed back up; still cream/warm on pitch void.
                colorTint="#EDE6DD"
                repetition={3}
                softness={0.1}
                shiftRed={0.5}
                shiftBlue={0.15}
                distortion={0.12}
                contour={0.5}
                angle={70}
                speed={0.9}
                scale={0.6}
                fit="contain"
                style={{ width: '100%', height: '100%' }}
              />
            </m.div>
          </div>
          <p className="mt-8 font-mono text-[10px] tracking-[0.4em] text-bone/70">
            <DecodeText text="ALCHEMY LABS" delay={300} />
          </p>
          <p className="mt-3 font-mono text-[10px] tracking-[0.25em] text-ember tabular-nums">
            <m.span>{counter}</m.span>%
          </p>
        </m.div>
      )}
    </AnimatePresence>,
    document.body,
  );
}
