'use client';

import { m, useMotionTemplate, useTransform, type MotionValue } from 'framer-motion';
import { LiquidMark } from '@/components/fx/LiquidMark';

const ORBITS = [0, 60, 120];

/**
 * The Alchemy atom, scroll-linked (Patches-6). Nothing renders until the
 * seal's range begins (the old round caps showed as three dots under the
 * Turn copy). Then: a liquid-glass lens condenses out of the void, the three
 * orbits trace inside it with a soft comet head, the nucleus lights, and the
 * line atom melts into the liquid-metal mark while the wordmark settles.
 * Stroke drawing is transform-free SVG pathLength, so it scrubs both ways.
 */
export function BrandSeal({ progress, range }: { progress: MotionValue<number>; range: [number, number] }) {
  const [a, b] = range;
  const span = b - a;
  const at = (t: number) => a + span * t;

  // whole seal is invisible before its range (no stray caps, no glow)
  const on = useTransform(progress, [a, at(0.06)], [0, 1]);

  const d0 = useTransform(progress, [at(0.06), at(0.5)], [0, 1]);
  const d1 = useTransform(progress, [at(0.12), at(0.56)], [0, 1]);
  const d2 = useTransform(progress, [at(0.18), at(0.62)], [0, 1]);
  const draw = [d0, d1, d2];
  // each orbit only exists once it has length, so a zero-length path never paints
  const o0 = useTransform(d0, [0, 0.02], [0, 1]);
  const o1 = useTransform(d1, [0, 0.02], [0, 1]);
  const o2 = useTransform(d2, [0, 0.02], [0, 1]);
  const orbitOpacity = [o0, o1, o2];

  const nucleus = useTransform(progress, [at(0.55), at(0.7)], [0, 1]);
  const scale = useTransform(progress, [a, b], [0.82, 1]);
  const rotate = useTransform(progress, [a, b], [-40, 0]);

  // the lens: condenses from a blur, holds while the atom draws, thins as metal arrives
  const lens = useTransform(progress, [a, at(0.2), at(0.8), b], [0, 1, 1, 0.55]);
  const lensScale = useTransform(progress, [a, at(0.3)], [0.6, 1]);
  const lensBlurPx = useTransform(progress, [a, at(0.25)], [18, 0]);
  const lensFilter = useMotionTemplate`blur(${lensBlurPx}px)`;
  const sweep = useTransform(progress, [a, b], [0, 300]);

  const metal = useTransform(progress, [at(0.64), at(0.86)], [0, 1]);
  const metalScale = useTransform(progress, [at(0.64), at(0.9)], [0.92, 1]);
  const lines = useTransform(progress, [at(0.68), at(0.9)], [1, 0]);
  const word = useTransform(progress, [at(0.62), at(0.86)], [0, 1]);
  const wordY = useTransform(progress, [at(0.62), at(0.86)], [14, 0]);
  const glow = useTransform(progress, [at(0.45), at(0.85)], [0, 1]);

  return (
    <m.div aria-hidden className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center" style={{ opacity: on }}>
      <m.div className="relative" style={{ scale }}>
        {/* ember bloom behind everything */}
        <m.div
          className="absolute left-1/2 top-1/2 h-[170%] w-[170%] -translate-x-1/2 -translate-y-1/2 rounded-full"
          style={{
            opacity: glow,
            background: 'radial-gradient(circle, rgba(255,77,28,0.22) 0%, rgba(255,77,28,0.06) 42%, transparent 70%)',
          }}
        />
        {/* liquid-glass lens: filter on this wrapper only (no bg-clip text inside) */}
        <m.div
          className="absolute -inset-[25%]"
          style={{ opacity: lens, scale: lensScale, filter: lensFilter }}
        >
          <div className="seal-lens absolute inset-0 rounded-full" />
          <m.div className="seal-lens-sweep absolute inset-0 rounded-full" style={{ rotate: sweep }} />
        </m.div>
        {/* sized so the metal atom lands on the drawn orbits */}
        <m.div className="absolute -inset-[4%]" style={{ opacity: metal, scale: metalScale }}>
          <LiquidMark size={0} />
        </m.div>
        <m.svg
          viewBox="-60 -60 120 120"
          className="relative h-[clamp(7.5rem,18vw,12rem)] w-[clamp(7.5rem,18vw,12rem)] overflow-visible"
          style={{ rotate, opacity: lines }}
        >
          <defs>
            <linearGradient id="seal-stroke" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#EDE6DD" />
              <stop offset="55%" stopColor="#F4C9A8" />
              <stop offset="100%" stopColor="#FF4D1C" />
            </linearGradient>
            <filter id="seal-soft" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="1.6" result="b" />
              <feMerge>
                <feMergeNode in="b" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>
          <g filter="url(#seal-soft)">
            {ORBITS.map((deg, i) => (
              <g key={deg} transform={`rotate(${deg})`}>
                <m.ellipse
                  cx="0"
                  cy="0"
                  rx="22"
                  ry="52"
                  fill="none"
                  stroke="url(#seal-stroke)"
                  strokeWidth="2"
                  strokeLinecap="butt"
                  style={{ pathLength: draw[i], opacity: orbitOpacity[i] }}
                />
              </g>
            ))}
            <m.circle cx="0" cy="0" r="5.5" fill="none" stroke="#FF4D1C" strokeWidth="2" style={{ pathLength: nucleus, opacity: nucleus }} />
          </g>
        </m.svg>
      </m.div>
      <m.p className="mt-12 flex items-baseline gap-2 text-bone" style={{ opacity: word, y: wordY }}>
        <span className="font-playfair text-2xl italic md:text-3xl">Alchemy</span>
        <span className="font-mono text-[11px] tracking-[0.35em] text-bone/70">LABS</span>
      </m.p>
    </m.div>
  );
}
