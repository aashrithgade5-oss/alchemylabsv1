'use client';

import { useEffect, useRef, useState } from 'react';
import {
  m,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from 'framer-motion';
import { MagneticCTA } from '../MagneticCTA';
import { CapacityTag } from '../CapacityTag';

const ease: [number, number, number, number] = [0.16, 1, 0.3, 1];
const BUILDS = ['strategy', 'brand systems', 'identity', 'campaigns', 'film'];

// Cycling word in the transition face (Playfair italic, regular). Outgoing
// lifts out of a masked line, incoming rises in; one grid cell, no reflow.
function Cycler() {
  const reduced = useReducedMotion();
  const [i, setI] = useState(0);

  useEffect(() => {
    if (reduced) return;
    const t = setInterval(() => setI((v) => (v + 1) % BUILDS.length), 2800);
    return () => clearInterval(t);
  }, [reduced]);

  return (
    <span aria-hidden className="grid justify-items-center overflow-hidden px-[0.12em] pb-[0.16em]">
      {BUILDS.map((word, idx) => {
        const prev = (i - 1 + BUILDS.length) % BUILDS.length;
        const state = idx === i ? 'on' : idx === prev ? 'out' : 'wait';
        return (
          <m.span
            key={word}
            className="type-scroll glass-type col-start-1 row-start-1 whitespace-nowrap italic"
            initial={false}
            animate={
              reduced
                ? { opacity: state === 'on' ? 1 : 0 }
                : {
                    opacity: state === 'on' ? 1 : 0,
                    y: state === 'on' ? '0%' : state === 'out' ? '-80%' : '80%',
                  }
            }
            transition={{ duration: state === 'wait' ? 0 : 0.9, ease }}
          >
            {word}
          </m.span>
        );
      })}
    </span>
  );
}

// Fine-pointer drift so the frame breathes with the hand; off on touch.
function usePointerDrift() {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 50, damping: 20 });
  const sy = useSpring(y, { stiffness: 50, damping: 20 });
  useEffect(() => {
    if (!window.matchMedia('(pointer: fine)').matches) return;
    const onMove = (e: PointerEvent) => {
      x.set(e.clientX / window.innerWidth - 0.5);
      y.set(e.clientY / window.innerHeight - 0.5);
    };
    window.addEventListener('pointermove', onMove, { passive: true });
    return () => window.removeEventListener('pointermove', onMove);
  }, [x, y]);
  return { sx, sy };
}

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const { sx, sy } = usePointerDrift();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  });

  // Depth: footage drifts slow and softens (temporal blur), type outruns it.
  const mediaY = useTransform(scrollYProgress, [0, 1], ['0%', '10%']);
  const mediaScale = useTransform(scrollYProgress, [0, 1], [1.06, 1.2]);
  const mediaBlur = useTransform(scrollYProgress, [0.2, 0.8], [0, 14]);
  const mediaFilter = useMotionTemplate`blur(${mediaBlur}px)`;
  const typeY = useTransform(scrollYProgress, [0, 1], [0, -180]);
  const typeOpacity = useTransform(scrollYProgress, [0.25, 0.55], [1, 0]);
  const exitScrim = useTransform(scrollYProgress, [0.55, 0.95], [0, 1]);
  const driftX = useTransform(sx, (v) => v * -18);
  const driftY = useTransform(sy, (v) => v * -12);
  const typeDriftX = useTransform(sx, (v) => v * 10);

  return (
    <section
      ref={sectionRef}
      className={`relative bg-void ${reduced ? 'min-h-[100svh]' : 'h-[180svh]'}`}
    >
      <div
        className={`flex flex-col overflow-hidden ${
          reduced ? 'relative min-h-[100svh]' : 'sticky top-0 h-[100svh]'
        }`}
      >
        <m.div
          aria-hidden
          className="absolute inset-[-3%]"
          style={reduced ? undefined : { y: mediaY, scale: mediaScale, filter: mediaFilter }}
        >
          <m.div className="absolute inset-0" style={reduced ? undefined : { x: driftX, y: driftY }}>
            <video
              autoPlay={!reduced}
              loop
              muted
              playsInline
              preload="auto"
              poster="/media/samurai-silhouette-2-poster.jpg"
              className="absolute inset-0 h-full w-full object-cover object-[52%_50%]"
            >
              <source src="/media/samurai-silhouette-2.mp4" type="video/mp4" />
            </video>
          </m.div>
        </m.div>

        {/* Grade: crimson held in the centre, edges fall to void */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background: `
              radial-gradient(ellipse 42% 30% at 50% 40%, rgba(10,9,8,0.5) 0%, rgba(10,9,8,0) 100%),
              radial-gradient(ellipse 70% 60% at 50% 46%, rgba(10,9,8,0.3) 0%, rgba(10,9,8,0.64) 70%, rgba(10,9,8,0.92) 100%),
              linear-gradient(to top, #0A0908 0%, rgba(10,9,8,0) 30%),
              linear-gradient(to bottom, rgba(10,9,8,0.7) 0%, rgba(10,9,8,0) 22%)
            `,
          }}
        />

        {/* Depth of field: progressive blur toward the frame edges */}
        <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-[22%]">
          <div className="absolute inset-0 backdrop-blur-[3px] [mask-image:linear-gradient(to_bottom,black,transparent)]" />
          <div className="absolute inset-0 backdrop-blur-[10px] [mask-image:linear-gradient(to_bottom,black,transparent_55%)]" />
        </div>
        <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 h-[28%]">
          <div className="absolute inset-0 backdrop-blur-[3px] [mask-image:linear-gradient(to_top,black,transparent)]" />
          <div className="absolute inset-0 backdrop-blur-[12px] [mask-image:linear-gradient(to_top,black,transparent_55%)]" />
        </div>

        <m.div aria-hidden className="absolute inset-0 bg-void" style={{ opacity: reduced ? 0 : exitScrim }} />

        <m.div
          className="relative z-10 mx-auto flex w-full max-w-5xl flex-1 flex-col items-center justify-center px-6 pb-16 text-center md:px-12"
          style={reduced ? undefined : { y: typeY, x: typeDriftX, opacity: typeOpacity }}
        >
          <m.p
            initial={{ opacity: 0, letterSpacing: '0.6em' }}
            animate={{ opacity: 1, letterSpacing: '0.34em' }}
            transition={{ duration: 1.4, delay: 0.2, ease }}
            className="font-mono text-[10px] text-bone/60 md:text-[11px]"
          >
            AI-NATIVE BRAND STUDIO · MUMBAI
          </m.p>

          <m.h1
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.35, ease }}
            aria-label={`We build ${BUILDS.join(', ')}`}
            className="mt-7 flex flex-col items-center leading-[0.96]"
          >
            <span
              aria-hidden
              className="glass-type font-headline text-[clamp(2.75rem,7.5vw,7.25rem)] font-black tracking-[-0.045em]"
            >
              WE BUILD
            </span>
            <span className="-mt-[0.04em] text-[clamp(2.9rem,7.6vw,7.5rem)]">
              <Cycler />
            </span>
          </m.h1>

          <m.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.9, ease }}
            className="mt-6 max-w-[34ch] text-[15px] font-light leading-relaxed text-bone/70 [text-wrap:balance] md:mt-8 md:text-[17px]"
          >
            Taste is the moat. AI drafts at scale; judgment decides what airs — for founders who
            already know the <span className="font-playfair italic text-bone">difference</span>.
          </m.p>

          <m.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 1.1, ease }}
            className="mt-9 flex items-center justify-center gap-3 sm:gap-4"
          >
            <MagneticCTA href="/contact" variant="ember">
              Begin the sprint
            </MagneticCTA>
            <MagneticCTA href="/work" variant="glass" className="px-6 py-3 text-xs">
              See the work
            </MagneticCTA>
          </m.div>
        </m.div>

        <m.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.5 }}
          style={reduced ? undefined : { opacity: typeOpacity }}
          className="absolute inset-x-0 bottom-6 z-10 mx-auto flex max-w-6xl items-center justify-between px-6 md:bottom-8 md:px-12"
        >
          <CapacityTag />
          <span className="flex items-center gap-3 font-mono text-[10px] tracking-[0.3em] text-bone/45">
            SCROLL
            <span className="relative block h-8 w-px overflow-hidden bg-bone/15">
              <m.span
                className="absolute inset-x-0 top-0 h-1/2 bg-ember"
                animate={reduced ? undefined : { y: ['-100%', '200%'] }}
                transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
              />
            </span>
          </span>
        </m.div>
      </div>
    </section>
  );
}
