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
import { KineticHeadline, useScrollVelocitySkew } from '../KineticHeadline';
import { MagneticCTA } from '../MagneticCTA';
import { CapacityTag } from '../CapacityTag';
import { HeroMeshField } from './HeroMeshField';

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
const BUILDS: { word: string; gradient: string }[] = [
  { word: 'STRATEGY', gradient: 'linear-gradient(180deg, #b8b8bd 0%, #f4f2ee 55%, #cfcdc9 100%)' },
  { word: 'BRAND SYSTEMS', gradient: 'linear-gradient(180deg, #c9bfae 0%, #f6efe2 55%, #d8cdbb 100%)' },
  { word: 'IDENTITY', gradient: 'linear-gradient(180deg, #b3b9c4 0%, #eef2f7 55%, #c5ccd8 100%)' },
  { word: 'CAMPAIGNS', gradient: 'linear-gradient(180deg, #d0a89a 0%, #ffe9de 55%, #d9b3a4 100%)' },
  { word: 'FILM', gradient: 'linear-gradient(180deg, #c8c4bc 0%, #faf7f2 55%, #d4d0c8 100%)' },
];

// C-P11 swap flourish: a one-shot aurora band swept through the incoming
// word + a single-frame RGB channel split (textShadow copies behind the
// transparent glyphs), ~260ms. Remounted per activation via key={active}.
const AURORA_SWEEP =
  'linear-gradient(115deg, transparent 30%, rgba(255,77,28,0.9) 44%, rgba(255,180,40,0.95) 50%, rgba(237,230,221,0.9) 56%, transparent 70%)';

// A diagonal ember highlight band, twice the element's width, swept left to
// right on a loop. Layered as its own bg-clip:text span directly over the
// metallic fill so the base gradient (and the grid cell it lives in) never
// changes — only an ember shimmer passes through it.
const WORD_SHIMMER =
  'linear-gradient(115deg, transparent 35%, rgba(255,77,28,0.85) 48%, rgba(255,160,40,0.9) 52%, transparent 65%)';

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
    const t = setInterval(() => setI((v) => (v + 1) % BUILDS.length), 2400);
    return () => clearInterval(t);
  }, [reduced]);

  const clipStyle = (gradient: string) => ({
    backgroundImage: gradient,
    WebkitBackgroundClip: 'text' as const,
    backgroundClip: 'text' as const,
    color: 'transparent',
  });

  const active = reduced ? 1 : i;

  return (
    <div
      aria-label={`We build ${BUILDS.map((b) => b.word.toLowerCase()).join(', ')}`}
      className="font-headline text-[clamp(2.05rem,8vw,8rem)] font-black leading-[1.04] tracking-[-0.03em]"
    >
      <span aria-hidden className="glass-type block">WE BUILD</span>
      <span aria-hidden className="grid justify-items-center pb-[0.12em]">
        {BUILDS.map((b, idx) => (
          <m.span
            key={b.word}
            className="clip-pad col-start-1 row-start-1 whitespace-nowrap will-change-transform"
            style={clipStyle(b.gradient)}
            initial={false}
            animate={
              reduced
                ? { opacity: idx === active ? 1 : 0 }
                : {
                    opacity: idx === active ? 1 : 0,
                    y: idx === active ? '0%' : '18%',
                    filter: idx === active ? 'blur(0px)' : 'blur(10px)',
                  }
            }
            transition={{ duration: 0.5, ease }}
          >
            {b.word}
          </m.span>
        ))}
        {!reduced && BUILDS.map((b, idx) => (
          <WordShimmer key={`${b.word}-shimmer`} word={b.word} active={idx === active} />
        ))}
        {/* C-P11: transition flourish — remounts on every word change so the
            keyframes replay; same grid cell, so zero layout shift */}
        {!reduced && (
          <m.span
            key={`sweep-${active}`}
            aria-hidden
            className="clip-pad pointer-events-none col-start-1 row-start-1 whitespace-nowrap"
            style={{
              backgroundImage: AURORA_SWEEP,
              backgroundSize: '260% 100%',
              WebkitBackgroundClip: 'text',
              backgroundClip: 'text',
              color: 'transparent',
            }}
            initial={{
              opacity: 0.95,
              backgroundPositionX: '0%',
              x: 3,
              textShadow: '-3px 0 rgba(255,60,40,0.5), 3px 0 rgba(90,170,255,0.5)',
            }}
            animate={{
              opacity: 0,
              backgroundPositionX: '260%',
              x: 0,
              textShadow: '0 0 rgba(0,0,0,0)',
            }}
            transition={{
              duration: 0.26,
              ease: 'easeOut',
              textShadow: { duration: 0.1 },
              x: { duration: 0.1 },
            }}
          >
            {BUILDS[active].word}
          </m.span>
        )}
      </span>
    </div>
  );
}

// Loops the shimmer's background-position while a word is the active one.
// Stacked in the SAME grid cell as the base word (not absolutely
// positioned), same text/typography, so its glyphs land exactly over the
// base fill's glyphs — only the ember band travels through them.
function WordShimmer({ word, active }: { word: string; active: boolean }) {
  return (
    <m.span
      aria-hidden
      className="clip-pad pointer-events-none col-start-1 row-start-1 whitespace-nowrap"
      style={{
        backgroundImage: WORD_SHIMMER,
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
          ? { backgroundPositionX: { duration: 2.6, ease: 'linear', repeat: Infinity } }
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
        className={`flex flex-col overflow-hidden ${
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
          className="relative z-10 mx-auto flex w-full max-w-5xl flex-1 flex-col items-center justify-center px-6 pb-12 pt-24 text-center md:px-12 md:pb-20 md:pt-28"
          style={reduced ? undefined : { y: headlineY, skewY: skew, opacity: chromeOpacity }}
        >
          <m.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-mono text-[10px] tracking-[0.3em] text-bone/80 md:text-[11px]"
          >
            <DecodeText text="ALCHEMY LABS · AI-NATIVE BRAND STUDIO · MUMBAI" delay={300} />
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
            {/* kicker — R-P10 contrast raise: thin→light weight plus a soft
                drop-shadow scrim tucked behind the glyphs (static filter, no
                mix-blend descendants; not a solid backing block) */}
            <KineticHeadline
              text="Taste is the moat."
              className="relative z-10 mt-8 justify-center font-sans text-[clamp(1.125rem,1.8vw,1.5rem)] font-light leading-[1.05] tracking-[-0.01em] text-bone [filter:drop-shadow(0_2px_12px_rgba(10,9,8,0.95))_drop-shadow(0_0_3px_rgba(10,9,8,0.7))] md:mt-10"
              wordClassName="glass-type"
              delay={0.9}
              as="p"
            />

            <m.p
              initial={{ opacity: 0, y: 18, filter: 'blur(8px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={{ duration: 0.8, delay: 1.15, ease }}
              className="relative z-10 mt-5 max-w-xl text-lg font-light leading-relaxed text-bone/80 [text-wrap:balance] md:mt-6 md:text-xl"
            >
              AI drafts at scale. Judgment decides what airs. Brand systems and campaign film for
              founders who already know the{' '}
              <span className="font-playfair italic">difference</span>.
            </m.p>

            <m.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 1.35, ease }}
              className="relative z-10 mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center sm:gap-5"
            >
              <MagneticCTA href="/contact" variant="ember">
                Begin the sprint
              </MagneticCTA>
              <MagneticCTA href="/work" variant="glass" className="px-6 py-3 text-xs">
                See the work
              </MagneticCTA>
            </m.div>

            <m.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, delay: 1.6 }}
              className="relative z-10 mt-8"
            >
              <CapacityTag />
            </m.div>
          </div>
        </m.div>
      </div>
    </m.section>
  );
}
