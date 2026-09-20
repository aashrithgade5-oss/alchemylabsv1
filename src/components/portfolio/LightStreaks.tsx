'use client';

/**
 * Temporal motion-blur light streaks. Transform/opacity only; static under
 * prefers-reduced-motion. Colour comes from `color` (defaults to --streak-accent, then ember).
 */
const STREAKS = [
  { top: '18%', w: '38%', dur: 9, delay: 0, h: 1 },
  { top: '46%', w: '22%', dur: 12, delay: 3.5, h: 2 },
  { top: '71%', w: '30%', dur: 10.5, delay: 6, h: 1 },
];

export const LightStreaks = ({ color = 'var(--streak-accent, #FF4D1C)', className = '', count = 3 }: { color?: string; className?: string; count?: number }) => (
  <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`} aria-hidden>
    {STREAKS.slice(0, count).map((s, i) => (
      <span
        key={i}
        className="lstreak absolute left-0 block rounded-full"
        style={{
          top: s.top,
          width: s.w,
          height: s.h,
          background: `linear-gradient(90deg, transparent, ${color} 70%, #fff 96%, transparent)`,
          filter: 'blur(1.5px)',
          boxShadow: `0 0 18px 2px ${color}`,
          animationDuration: `${s.dur}s`,
          animationDelay: `${s.delay}s`,
        }}
      />
    ))}
    <style>{`
      .lstreak { opacity: 0; transform: translate3d(-110%,0,0) scaleX(.6); animation-name: lstreakRun; animation-iteration-count: infinite; animation-timing-function: cubic-bezier(.65,0,.35,1); will-change: transform, opacity; }
      @keyframes lstreakRun {
        0% { opacity: 0; transform: translate3d(-110%,0,0) scaleX(.6); }
        12% { opacity: .9; }
        45% { opacity: 0; transform: translate3d(320%,0,0) scaleX(1.4); }
        100% { opacity: 0; transform: translate3d(320%,0,0) scaleX(1.4); }
      }
      @media (prefers-reduced-motion: reduce) { .lstreak { animation: none; opacity: .25; transform: translate3d(60%,0,0); } }
    `}</style>
  </div>
);

/** Thin section-transition seam with a passing streak. */
export const StreakSeam = ({ isDark = true }: { isDark?: boolean }) => (
  <div className="relative h-px w-full" aria-hidden style={{ background: isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)' }}>
    <div className="absolute inset-x-0 -top-3 h-6">
      <LightStreaks count={1} />
    </div>
  </div>
);
