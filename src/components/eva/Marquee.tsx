import type { ReactNode } from 'react';

// CSS-only marquee: content duplicated once, track slides -50%.
// Pauses on hover/focus; static + horizontally scrollable under reduced motion.
export function Marquee({
  children,
  seconds = 60,
  reverse = false,
  label,
}: {
  children: ReactNode;
  seconds?: number;
  reverse?: boolean;
  label: string;
}) {
  return (
    <div
      className="eva-marquee group relative overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_8%,#000_92%,transparent)]"
      role="region"
      aria-label={label}
      tabIndex={0}
    >
      <div
        className="eva-marquee-track flex w-max"
        style={{ animationDuration: `${seconds}s`, animationDirection: reverse ? 'reverse' : 'normal' }}
      >
        <div className="flex shrink-0">{children}</div>
        <div className="flex shrink-0" aria-hidden="true">{children}</div>
      </div>
      <style>{`
        @keyframes eva-marquee { from { transform: translateX(0) } to { transform: translateX(-50%) } }
        .eva-marquee-track { animation: eva-marquee linear infinite; will-change: transform; }
        .eva-marquee:hover .eva-marquee-track, .eva-marquee:focus-within .eva-marquee-track { animation-play-state: paused; }
        @media (prefers-reduced-motion: reduce) {
          .eva-marquee { overflow-x: auto; -webkit-mask-image: none; mask-image: none; }
          .eva-marquee-track { animation: none; }
          .eva-marquee-track > [aria-hidden] { display: none; }
        }
      `}</style>
    </div>
  );
}
