'use client';

import { m, useTransform, type MotionValue } from 'framer-motion';

const ORBITS = [0, 60, 120];

/**
 * The Alchemy atom drawing itself, scroll-linked (Patches-4). Fills the
 * beat between the Turn film and the next interlude: the three orbits trace
 * in bone-to-ember, the nucleus lights, then the wordmark settles under it.
 * Stroke drawing is transform-free SVG pathLength, so it scrubs both ways.
 */
export function BrandSeal({ progress, range }: { progress: MotionValue<number>; range: [number, number] }) {
  const [a, b] = range;
  const span = b - a;
  const d0 = useTransform(progress, [a, a + span * 0.5], [0, 1]);
  const d1 = useTransform(progress, [a + span * 0.08, a + span * 0.58], [0, 1]);
  const d2 = useTransform(progress, [a + span * 0.16, a + span * 0.66], [0, 1]);
  const draw = [d0, d1, d2];
  const nucleus = useTransform(progress, [a + span * 0.55, a + span * 0.7], [0, 1]);
  const glow = useTransform(progress, [a + span * 0.5, a + span * 0.85], [0, 1]);
  const scale = useTransform(progress, [a, b], [0.86, 1]);
  const rotate = useTransform(progress, [a, b], [-30, 0]);
  const word = useTransform(progress, [a + span * 0.62, a + span * 0.86], [0, 1]);
  const wordY = useTransform(progress, [a + span * 0.62, a + span * 0.86], [14, 0]);

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
      <m.div className="relative" style={{ scale }}>
        <m.div
          className="absolute left-1/2 top-1/2 h-[140%] w-[140%] -translate-x-1/2 -translate-y-1/2 rounded-full"
          style={{
            opacity: glow,
            background: 'radial-gradient(circle, rgba(255,77,28,0.28) 0%, rgba(255,77,28,0.08) 40%, transparent 70%)',
          }}
        />
        <m.svg
          viewBox="-60 -60 120 120"
          className="relative h-[clamp(7.5rem,18vw,12rem)] w-[clamp(7.5rem,18vw,12rem)] overflow-visible"
          style={{ rotate }}
        >
          <defs>
            <linearGradient id="seal-stroke" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#EDE6DD" />
              <stop offset="55%" stopColor="#F4C9A8" />
              <stop offset="100%" stopColor="#FF4D1C" />
            </linearGradient>
          </defs>
          {ORBITS.map((deg, i) => (
            <g key={deg} transform={`rotate(${deg})`}>
              <m.ellipse
                cx="0"
                cy="0"
                rx="22"
                ry="52"
                fill="none"
                stroke="url(#seal-stroke)"
                strokeWidth="2.2"
                strokeLinecap="round"
                style={{ pathLength: draw[i] }}
              />
            </g>
          ))}
          <m.circle cx="0" cy="0" r="5.5" fill="none" stroke="#FF4D1C" strokeWidth="2.2" style={{ pathLength: nucleus, opacity: nucleus }} />
        </m.svg>
      </m.div>
      <m.p className="mt-10 flex items-baseline gap-2 text-bone" style={{ opacity: word, y: wordY }}>
        <span className="font-playfair text-2xl italic md:text-3xl">Alchemy</span>
        <span className="font-mono text-[11px] tracking-[0.35em] text-bone/70">LABS</span>
      </m.p>
    </div>
  );
}
