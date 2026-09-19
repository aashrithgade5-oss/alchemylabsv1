'use client';

import { useEffect, useRef } from 'react';
import {
  m,
  useInView,
  useMotionTemplate,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from 'framer-motion';
import { ScrubWord } from '../fx/ScrollScrub';

const FRAME_COUNT = 104;
const frameSrc = (i: number) => `/sequence-turn/turn-${String(i + 1).padStart(3, '0')}.webp`;

// Micro-copy bands, timed to the footage: the winged figure holds, turns,
// and finally faces the reader. C-P12 copy; `accent` names the ONE word per
// line that carries the aurora + Playfair italic treatment (the page's one
// persistent aurora instance — the hero cycler's is transition-only now).
const LINES = [
  { text: 'The machine drafts by the thousand.', range: [0.05, 0.3], accent: 'thousand.' },
  { text: 'Judgment keeps one.', range: [0.38, 0.62], accent: 'Judgment' },
  { text: 'That one is yours.', range: [0.7, 0.94], accent: 'yours.' },
] as const;

function KineticLine({
  text,
  range,
  progress,
  accent,
}: {
  text: string;
  range: readonly [number, number];
  progress: MotionValue<number>;
  accent?: string;
}) {
  const [start, end] = range;
  const words = text.split(' ');
  // words stagger in across the first 45% of the band; the whole line
  // dissolves together at the end of it
  const inWindow = (end - start) * 0.45;
  const opacity = useTransform(progress, [start - 0.04, start, end - 0.05, end], [0, 1, 1, 0]);
  const blurPx = useTransform(progress, [end - 0.05, end], [0, 10]);
  const filter = useMotionTemplate`blur(${blurPx}px)`;
  const y = useTransform(progress, [start, end], [30, -30]);

  return (
    <m.h2
      style={{ opacity, y, filter }}
      className="type-scroll absolute flex max-w-5xl flex-wrap justify-center gap-x-[0.28em] px-6 text-center text-[clamp(2.5rem,6.4vw,6rem)] text-bone"
    >
      {words.map((word, i) => {
        const wStart = start + (i / words.length) * inWindow;
        return (
          <ScrubWord
            key={`${word}-${i}`}
            word={word}
            range={[wStart, wStart + inWindow * 0.4]}
            progress={progress}
            className={accent === word ? 'glass-type italic' : 'glass-type'}
          />
        );
      })}
    </m.h2>
  );
}

/**
 * The page's one bold moment: 104 frames of the winged samurai turning to
 * camera, scrubbed in linear sync with scroll. Frames only download once
 * the section is a viewport away; the first frame renders as a plain image
 * so the stage is never blank.
 */
export function TurnSequence() {
  const reduced = useReducedMotion();

  if (reduced) {
    return (
      <section className="relative bg-void">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={frameSrc(FRAME_COUNT - 1)} alt="" className="h-[70svh] w-full object-cover" />
        <div className="mx-auto flex max-w-6xl flex-col gap-4 px-6 py-16 md:px-12">
          {LINES.map((line) => (
            <p key={line.text} className="font-mono text-xs tracking-[0.5em] text-bone">
              {line.text}
            </p>
          ))}
        </div>
      </section>
    );
  }

  return <ScrubSequence />;
}

// Hook-holding inner component: its scroll target ref is always mounted,
// which framer's useScroll requires.
function ScrubSequence() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const currentFrame = useRef(0);
  const nearView = useInView(containerRef, { margin: '100% 0px', once: true });

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  const drawFrame = (index: number) => {
    const canvas = canvasRef.current;
    const img = imagesRef.current[index];
    if (!canvas || !img || !img.complete || !img.naturalWidth) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const w = canvas.clientWidth;
    const h = canvas.clientHeight;
    if (canvas.width !== Math.round(w * dpr) || canvas.height !== Math.round(h * dpr)) {
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
    }
    // cover-fit: fill the stage, center-crop the overflow
    const scale = Math.max(canvas.width / img.naturalWidth, canvas.height / img.naturalHeight);
    const dw = img.naturalWidth * scale;
    const dh = img.naturalHeight * scale;
    ctx.drawImage(img, (canvas.width - dw) / 2, (canvas.height - dh) / 2, dw, dh);
  };

  useEffect(() => {
    if (!nearView || imagesRef.current.length) return;
    imagesRef.current = Array.from({ length: FRAME_COUNT }, (_, i) => {
      const img = new window.Image();
      img.src = frameSrc(i);
      if (i === 0) img.onload = () => drawFrame(currentFrame.current);
      return img;
    });
  }, [nearView]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ro = new ResizeObserver(() => drawFrame(currentFrame.current));
    ro.observe(canvas);
    return () => ro.disconnect();
  }, []);

  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    const idx = Math.min(FRAME_COUNT - 1, Math.max(0, Math.round(v * (FRAME_COUNT - 1))));
    if (idx !== currentFrame.current) {
      currentFrame.current = idx;
      drawFrame(idx);
    }
  });

  // Phase 4 (Landing_Page_Patches.pdf "black blur flash" fix): the halo and
  // vignette used to render at full strength the instant this section
  // mounted — well before the first frame image has necessarily painted, so
  // a backdrop-blur over bare bg-void read as a flat black smear. Fading
  // both in over the same window the first line starts arriving ties their
  // appearance to real content instead of component mount.
  const overlayOpacity = useTransform(scrollYProgress, [0, LINES[0].range[0]], [0, 1]);

  // The stage slides up over the hero's pinned tail (-mt-[50svh]); feather its
  // top edge while entering so the two never meet on a hard line.
  const { scrollYProgress: entry } = useScroll({
    target: containerRef,
    offset: ['start end', 'start start'],
  });
  const featherEnd = useTransform(entry, [0, 1], [60, 0]);
  const stageMask = useMotionTemplate`linear-gradient(to bottom, transparent 0%, black ${featherEnd}%)`;

  return (
    // -mt-[50svh]: Hero's sticky stage releases (its own scrub animation
    // complete) a full 100svh before THIS section's sticky stage can lock
    // in — that gap is dead scroll (nothing scroll-reactive happens while
    // Hero's frozen tail slides away), which reads as the delay between
    // section 1 and 2. Pulling this section's start up halves the gap
    // without touching either section's internal scrub math (their 0-1
    // progress spans are relative offsets, unaffected by this shift).
    <section
      ref={containerRef}
      aria-hidden
      className="relative -mt-[50svh] h-[400vh]"
    >
      <m.div
        className="sticky top-0 h-[100svh] overflow-hidden"
        style={{ maskImage: stageMask, WebkitMaskImage: stageMask }}
      >
        {/* first frame as ground so the stage is never blank */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={frameSrc(0)} alt="" className="absolute inset-0 h-full w-full object-cover" />
        <canvas ref={canvasRef} className="absolute inset-0 h-full w-full will-change-transform" />
        {/* light scrim; the glass halo below carries legibility */}
        <div aria-hidden className="absolute inset-0 bg-void/25" />
        {/* text-scoped vignette: ember-toned so it deepens the red-wings
            scene toward the text instead of reading as a mismatched black
            patch dropped over warm footage */}
        <m.div
          aria-hidden
          style={{ opacity: overlayOpacity }}
          className="text-vignette-ember absolute left-1/2 top-1/2 h-[24rem] w-[min(80rem,100vw)] -translate-x-1/2 -translate-y-1/2"
        />
        {/* boxless refractive halo: the footage bends behind the type,
            feathered to nothing so no panel edge ever reads */}
        <m.div
          aria-hidden
          style={{ opacity: overlayOpacity }}
          className="glass-halo absolute left-1/2 top-1/2 h-[16rem] w-[min(72rem,92vw)] -translate-x-1/2 -translate-y-1/2"
        />
        <div className="absolute inset-0 flex items-center justify-center px-6">
          {LINES.map((line) => (
            <KineticLine
              key={line.text}
              text={line.text}
              range={line.range}
              progress={scrollYProgress}
              accent={line.accent || undefined}
            />
          ))}
        </div>
      </m.div>
    </section>
  );
}
