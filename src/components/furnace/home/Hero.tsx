'use client';

import { useEffect, useRef, useState } from 'react';
import {
  m,
  useMotionTemplate,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from 'framer-motion';
import { DecodeText } from '../DecodeText';
import { useScrollVelocitySkew } from '../KineticHeadline';
import { MagneticCTA } from '../MagneticCTA';
import { HeroMeshField } from './HeroMeshField';
import { usePreloaderHandoff } from '../preloader-gate';

const ease: [number, number, number, number] = [0.16, 1, 0.3, 1];

// The cycling centerpiece: each phrase carries its own metallic gradient
// variation — all in the brushed-metal family, floor luminance high enough
// to read over the darkest and brightest points of the samurai footage.
// A traveling ember band (see WORD_SHIMMER below) sweeps through all five —
// the plan's "moving gradient" ask, layered onto these fills without
// touching the FO3 stacked-lockup grid that keeps word swaps reflow-free.
// C-P11: the static aurora word is retired (aurora is now the per-swap
// TRANSITION treatment below; the page's one persistent aurora instance
// moved to "Judgment" in TurnSequence). All five words carry their metallic
// gradients again.
// Patches-3: every service word glitches in its OWN colour pair and sweep,
// so the swap reads as a gradient shuffle, not the same flash five times.
// Pairs stay warm/cool opposites for a clean chromatic split.
const BUILDS: { word: string; gradient: string; glitch: [string, string]; sweep: string; band: string }[] = [
  {
    word: 'CAMPAIGNS',
    gradient: 'linear-gradient(180deg, #d0a89a 0%, #ffe9de 55%, #d9b3a4 100%)',
    glitch: ['rgba(255,60,150,0.6)', 'rgba(255,200,60,0.55)'],
    sweep: 'rgba(255,60,150,0.9), rgba(255,170,60,0.95), rgba(255,233,222,0.9)',
    band: 'rgba(255,70,150,0.85), rgba(255,190,70,0.9)',
  },
  {
    word: 'STRATEGY',
    gradient: 'linear-gradient(180deg, #b8b8bd 0%, #f4f2ee 55%, #cfcdc9 100%)',
    glitch: ['rgba(255,176,40,0.6)', 'rgba(150,190,255,0.5)'],
    sweep: 'rgba(255,176,40,0.95), rgba(255,236,190,0.95), rgba(237,230,221,0.9)',
    band: 'rgba(255,176,40,0.85), rgba(255,226,150,0.9)',
  },
  {
    word: 'BRAND SYSTEMS',
    gradient: 'linear-gradient(180deg, #c9bfae 0%, #f6efe2 55%, #d8cdbb 100%)',
    glitch: ['rgba(255,77,28,0.6)', 'rgba(160,100,255,0.55)'],
    sweep: 'rgba(255,77,28,0.9), rgba(196,110,255,0.9), rgba(237,230,221,0.9)',
    band: 'rgba(255,77,28,0.85), rgba(190,120,255,0.85)',
  },
  {
    word: 'IDENTITY',
    gradient: 'linear-gradient(180deg, #b3b9c4 0%, #eef2f7 55%, #c5ccd8 100%)',
    glitch: ['rgba(70,210,255,0.6)', 'rgba(255,90,60,0.5)'],
    sweep: 'rgba(70,210,255,0.9), rgba(236,246,255,0.95), rgba(255,120,80,0.85)',
    band: 'rgba(80,200,255,0.8), rgba(220,240,255,0.9)',
  },
  {
    word: 'FILM',
    gradient: 'linear-gradient(180deg, #c8c4bc 0%, #faf7f2 55%, #d4d0c8 100%)',
    glitch: ['rgba(255,40,40,0.6)', 'rgba(40,220,200,0.55)'],
    sweep: 'rgba(255,50,40,0.9), rgba(250,247,242,0.95), rgba(40,220,200,0.85)',
    band: 'rgba(255,60,40,0.85), rgba(60,220,200,0.85)',
  },
];

// C-P11 swap flourish: a one-shot aurora band swept through the incoming
// word + a single-frame RGB channel split (textShadow copies behind the
// transparent glyphs), ~260ms. Remounted per activation via key={active}.
const sweepFor = (stops: string) => {
  const [a, b, c] = stops.split(/,(?![^(]*\))/).map((x) => x.trim());
  return `linear-gradient(115deg, transparent 30%, ${a} 44%, ${b} 50%, ${c} 56%, transparent 70%)`;
};

// A diagonal ember highlight band, twice the element's width, swept left to
// right on a loop. Layered as its own bg-clip:text span directly over the
// metallic fill so the base gradient (and the grid cell it lives in) never
// changes — only an ember shimmer passes through it.
const shimmerFor = (band: string) => {
  const [a, b] = band.split(/,(?![^(]*\))/).map((x) => x.trim());
  return `linear-gradient(115deg, transparent 35%, ${a} 48%, ${b} 52%, transparent 65%)`;
};

// The dominant hero element (phase 4): "WE BUILD" over a cycling word, as a
// stacked lockup. Every word renders into the SAME grid cell so the block
// width never changes mid-swap — the old AnimatePresence swap left an
// invisible-word hole that read as the whole line jumping off-center.
// Text sits directly over the scene — no solid backing; the hero's
// text-vignette carries the contrast floor.
function WeBuild() {
  const reduced = useReducedMotion();
  const [i, setI] = useState(0);

  useEffect(() => {
    if (reduced) return;
    const t = setInterval(() => setI((v) => (v + 1) % BUILDS.length), 2800);
    return () => clearInterval(t);
  }, [reduced]);

  const clipStyle = (gradient: string) => ({
    backgroundImage: gradient,
    WebkitBackgroundClip: 'text' as const,
    backgroundClip: 'text' as const,
    color: 'transparent',
  });

  const active = reduced ? 0 : i;

  return (
    <h1
      aria-label={`Alchemy Labs, AI-native brand studio. We build ${BUILDS.map((b) => b.word.toLowerCase()).join(', ')}`}
      className="font-headline text-[clamp(2.6rem,11.5vw,8rem)] font-black leading-[1.04] tracking-[-0.03em]"
    >
      {/* Patches-1: "Build" in script (owner request), ember-metal fill;
          optically enlarged because script x-height runs small. This lockup
          is the largest type on every breakpoint by design. */}
      <span aria-hidden className="flex items-baseline justify-center gap-[0.14em]">
        <span className="glass-type">WE</span>
        <span
          className="glass-type-ember font-script text-[1.36em] font-normal normal-case leading-[0.8] tracking-normal"
          style={{ padding: '0.1em 0.22em 0.28em', margin: '-0.1em -0.22em -0.28em' }}
        >
          Build
        </span>
      </span>
      {/* all words share ONE grid cell (no reflow on swap). Below sm a long
          phrase may wrap to two lines: the cell sizes to the tallest word and
          centers the rest, so the size stays big instead of shrinking. */}
      <span aria-hidden className="grid items-center justify-items-center pb-[0.12em] text-center [text-wrap:balance]">
        {BUILDS.map((b, idx) => (
          // motion + blur on the grid-cell wrapper, bg-clip:text on the inner
          // span (WebKit drops clipped glyphs under an animated filter)
          <m.span
            key={b.word}
            className="col-start-1 row-start-1 will-change-transform sm:whitespace-nowrap"
            initial={false}
            animate={
              reduced
                ? { opacity: idx === active ? 1 : 0 }
                : {
                    opacity: idx === active ? 1 : 0,
                    y: idx === active ? '0%' : idx === (active + BUILDS.length - 1) % BUILDS.length ? '-14%' : '14%',
                    scale: idx === active ? 1 : 0.985,
                  }
            }
            // transform + opacity only: a blur filter on 8rem glyphs dropped
            // frames on every swap (Safari worst), which read as a stutter
            transition={{ duration: 0.62, ease }}
          >
            <span className="clip-pad" style={clipStyle(b.gradient)}>
              {b.word}
            </span>
          </m.span>
        ))}
        {!reduced && BUILDS.map((b, idx) => (
          <WordShimmer key={`${b.word}-shimmer`} word={b.word} band={b.band} active={idx === active} />
        ))}
        {/* Patches-4 glitch: two solid colour ghosts of the incoming word
            split apart and settle in ~420ms. Transform + opacity only (the old
            animated text-shadow repainted 8rem glyphs every frame, which is
            what made it judder), remounted per swap via key. */}
        {!reduced && (
          <span key={`glitch-${active}`} aria-hidden className="pointer-events-none col-start-1 row-start-1 grid sm:whitespace-nowrap">
            {BUILDS[active].glitch.map((c, k) => (
              <m.span
                key={k}
                className="col-start-1 row-start-1 will-change-transform"
                style={{ color: c }}
                initial={{ x: k ? 7 : -7, opacity: 0.85 }}
                animate={{ x: [k ? 7 : -7, k ? -3 : 3, 0], opacity: [0.85, 0.5, 0] }}
                transition={{ duration: 0.42, times: [0, 0.4, 1], ease: 'easeOut' }}
              >
                {BUILDS[active].word}
              </m.span>
            ))}
            <m.span
              className="clip-pad col-start-1 row-start-1"
              style={{
                backgroundImage: sweepFor(BUILDS[active].sweep),
                backgroundSize: '260% 100%',
                WebkitBackgroundClip: 'text',
                backgroundClip: 'text',
                color: 'transparent',
              }}
              initial={{ opacity: 0.9, backgroundPositionX: '0%' }}
              animate={{ opacity: 0, backgroundPositionX: '200%' }}
              transition={{ duration: 0.7, ease: 'easeOut' }}
            >
              {BUILDS[active].word}
            </m.span>
          </span>
        )}
      </span>
    </h1>
  );
}

// Loops the shimmer's background-position while a word is the active one.
// Stacked in the SAME grid cell as the base word (not absolutely
// positioned), same text/typography, so its glyphs land exactly over the
// base fill's glyphs — only the ember band travels through them.
function WordShimmer({ word, band, active }: { word: string; band: string; active: boolean }) {
  return (
    <m.span
      aria-hidden
      className="clip-pad pointer-events-none col-start-1 row-start-1 sm:whitespace-nowrap"
      style={{
        backgroundImage: shimmerFor(band),
        backgroundSize: '260% 100%',
        WebkitBackgroundClip: 'text',
        backgroundClip: 'text',
        color: 'transparent',
      }}
      initial={false}
      animate={
        active
          ? { opacity: 1, backgroundPositionX: ['0%', '260%'] }
          : { opacity: 0, backgroundPositionX: '0%' }
      }
      transition={
        active
          ? { backgroundPositionX: { duration: 3.4, ease: 'linear', repeat: Infinity } }
          : { duration: 0.3 }
      }
    >
      {word}
    </m.span>
  );
}

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const skew = useScrollVelocitySkew(0.6);
  // entrance replays as the opening aperture hands over to the hero
  const handoffGen = usePreloaderHandoff();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  });

  // Cinematic mask reveal: the footage opens from a narrow ellipse slit to
  // full bleed across the first ~55% of the section's scroll travel.
  // Smoothed progress: wheel ticks arrive in steps; the spring turns them into
  // one continuous glide so the ring/slit never stutters.
  const smooth = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.4 });
  const maskRx = useTransform(smooth, [0, 0.55], [18, 125]);
  const maskRy = useTransform(smooth, [0, 0.55], [26, 125]);
  const clipPath = useMotionTemplate`ellipse(${maskRx}% ${maskRy}% at 50% 55%)`;
  // ring dissolves as the slit opens past the frame — it should never be
  // left hanging as a huge line across the footage
  const ringOpacity = useTransform(smooth, [0, 0.35, 0.5], [1, 0.7, 0]);

  const videoScale = useTransform(smooth, [0, 1], [1.06, 1.12]);
  // contrast vignette only needed while text sits over the closed slit
  const vignetteOpacity = useTransform(smooth, [0, 0.3], [1, 0]);
  const handoff = useTransform(scrollYProgress, [0.62, 0.96], [0, 1]);
  // at release the pinned frame (== turn frame 001) steps aside; the locked
  // Turn stage beneath shows the identical image, so nothing visibly changes
  const releaseFade = useTransform(scrollYProgress, [0.985, 1], [1, 0]);
  const headlineY = useTransform(scrollYProgress, [0, 1], [0, -70]);
  const chromeOpacity = useTransform(scrollYProgress, [0.55, 0.8], [1, 0]);

  return (
    <m.section
      ref={sectionRef}
      style={reduced ? undefined : { opacity: releaseFade }}
      className={`relative z-10 bg-void ${reduced ? 'min-h-[100svh]' : 'h-[180svh]'}`}
    >
      <div
        className={`hero-depth flex flex-col overflow-hidden ${
          reduced ? 'relative min-h-[100svh]' : 'sticky top-0 h-[100svh]'
        }`}
      >
        {/* Video behind the slit: emerges on scroll, never sits flat from load */}
        <m.div
          className="absolute inset-0"
          style={reduced ? undefined : { clipPath, scale: videoScale }}
        >
          <video
            autoPlay={!reduced}
            loop
            muted
            playsInline
            preload="metadata"
            poster="/media/samurai-silhouette-1-poster.jpg"
            className="absolute inset-0 h-full w-full object-cover"
          >
            <source src="/media/samurai-silhouette-1.mp4" type="video/mp4" />
          </video>
          {!reduced && <HeroMeshField />}
          {/* Phase 2: the ellipse mask boundary gets a spectrum liquid-glass
              ring — same maskRx/maskRy motion values as the clip-path above,
              so the ring can never drift out of sync with the "zoom out"
              reveal. filter=url(#glass-refract) (Phase 1 primitive) puts the
              chromatic-edge/rainbow-reflection read directly on the stroke.
              Chrome-only in practice (other engines skip SVG filter refs to
              acrylic-style effects gracefully — the stroke still renders,
              just without the distortion/fringe). */}

          {/* Quiet vignette: the red field recedes, the centered text wins */}
          <div
            aria-hidden
            className="absolute inset-0"
            style={{
              background: `
                radial-gradient(ellipse 120% 90% at 50% 50%, rgba(10,9,8,0.34) 0%, rgba(10,9,8,0.6) 78%, rgba(10,9,8,0.78) 100%),
                linear-gradient(to top, rgba(10,9,8,0.5) 0%, transparent 30%)
              `,
            }}
          />
        </m.div>

        {/* ring lives OUTSIDE the clip so its stroke + halo are never cut in half */}
        {!reduced && (
          <m.div aria-hidden className="pointer-events-none absolute inset-0" style={{ scale: videoScale, opacity: ringOpacity }}>
              <svg
                aria-hidden
                className="pointer-events-none absolute inset-0 h-full w-full"
                viewBox="0 0 100 100"
                preserveAspectRatio="none"
              >
                <defs>
                  <linearGradient id="hero-ring-spectrum" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="rgba(237,230,221,0.9)" />
                    <stop offset="22%" stopColor="rgba(255,180,150,0.55)" />
                    <stop offset="50%" stopColor="rgba(237,230,221,0.85)" />
                    <stop offset="78%" stopColor="rgba(180,205,255,0.55)" />
                    <stop offset="100%" stopColor="rgba(237,230,221,0.9)" />
                  </linearGradient>
                </defs>
                {/* soft ember halo under a crisp hairline: non-scaling strokes
                    keep a true pixel width despite preserveAspectRatio="none" */}
                <m.ellipse
                  cx="50"
                  cy="55"
                  rx={maskRx}
                  ry={maskRy}
                  fill="none"
                  stroke="rgba(255,77,28,0.35)"
                  strokeWidth="10"
                  vectorEffect="non-scaling-stroke"
                  style={{ filter: 'blur(8px)' }}
                />
                <m.ellipse
                  cx="50"
                  cy="55"
                  rx={maskRx}
                  ry={maskRy}
                  fill="none"
                  stroke="url(#hero-ring-spectrum)"
                  strokeWidth="1.25"
                  vectorEffect="non-scaling-stroke"
                />
              </svg>
          </m.div>
        )}

        {/* Handoff: the pinned frame dissolves into Turn frame 001, which sits
            beneath this section and locks as it releases — seamless cut. */}
        {!reduced && (
          // eslint-disable-next-line @next/next/no-img-element
          <m.img aria-hidden src="/sequence-turn/turn-001.webp" alt="" className="absolute inset-0 h-full w-full object-cover" style={{ opacity: handoff }} />
        )}

        {/* Content, full center. chromeOpacity fades the WHOLE column (not
            just eyebrow/CTAs) — it used to leave the headline permanently
            opaque, which was fine while a full 100svh of trailing scroll
            separated Hero from TurnSequence, but became a visible overlap
            with TurnSequence's frame once that gap was compressed below. */}
        <m.div
          key={handoffGen}
          className="relative z-10 mx-auto flex w-full max-w-5xl flex-1 flex-col items-center justify-center px-6 pb-12 pt-24 text-center md:px-12 md:pb-20 md:pt-28"
          style={reduced ? undefined : { y: headlineY, skewY: skew, opacity: chromeOpacity }}
        >
          <m.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-mono text-[10px] tracking-[0.3em] text-bone/80 md:text-[11px]"
          >
            {/* short form on phones: the full line wrapped and orphaned "MUMBAI" */}
            <span className="sm:hidden"><DecodeText text="AI-NATIVE BRAND STUDIO · MUMBAI" delay={300} /></span>
            <span className="hidden sm:inline"><DecodeText text="ALCHEMY LABS · AI-NATIVE BRAND STUDIO · MUMBAI" delay={300} /></span>
          </m.p>

          {/* R-P10: the vignette/halo pair now wraps the FULL text block
              (lockup → kicker → paragraph → CTAs → capacity tag) so nothing
              bleeds past the oval's visible edge; margins tightened so the
              column stays compact inside the ellipse at 1440 and 375. */}
          <div className="relative mt-8 flex flex-col items-center">
            {/* text-scoped vignette: contrast floor between footage and glyphs */}
            <m.div aria-hidden className="absolute inset-0 z-0" style={reduced ? undefined : { opacity: vignetteOpacity }}>
              <div className="text-vignette absolute -inset-x-24 -inset-y-20" />
              <div className="glass-halo absolute -inset-x-20 -inset-y-16" />
            </m.div>
            <m.div
              initial={{ opacity: 0, y: 20, filter: 'blur(10px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={{ duration: 0.8, delay: 0.35, ease }}
              className="relative z-10"
            >
              <WeBuild />
            </m.div>
            {/* Patches-4: one line finishes the lockup, one line says who
                it's for. The old kicker + paragraph stacked three voices
                under the headline and pushed the CTAs off the oval. */}
            <m.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.85, ease }}
              className="relative z-10 mt-4 font-headline text-[clamp(1.35rem,3.2vw,2.4rem)] font-light leading-[1.15] tracking-[-0.02em] text-bone [filter:drop-shadow(0_2px_12px_rgba(10,9,8,0.9))] md:mt-5"
            >
              <span className="glass-type">at scale, without losing the </span>
              <span className="font-playfair italic">taste</span>
              <span className="glass-type">.</span>
            </m.p>

            <m.p
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.05, ease }}
              className="relative z-10 mt-4 max-w-md text-[15px] leading-relaxed text-bone/70 [text-wrap:balance] md:text-base"
            >
              Strategy, identity and film for founders building something worth looking at.
            </m.p>

            <m.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 1.2, ease }}
              className="relative z-10 mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center sm:gap-5"
            >
              <MagneticCTA href="/contact" variant="ember">
                Book a call
              </MagneticCTA>
              <MagneticCTA href="/work" variant="glass" className="px-6 py-3 text-xs">
                See the work
              </MagneticCTA>
            </m.div>

          </div>
        </m.div>
      </div>
    </m.section>
  );
}
