// R-7b: meteor streaks for quote blocks ONLY (never heroes or CTAs).
// Server-renderable — fixed configs, no randomness (hydration-safe), CSS
// animation (.meteor, index.css) with warm bone/ember trails per tokens.
const METEORS = [
  { left: '14%', delay: 0, duration: 6.5 },
  { left: '38%', delay: 2.6, duration: 7.5 },
  { left: '63%', delay: 1.2, duration: 6 },
  { left: '86%', delay: 3.8, duration: 8 },
];

export function Meteors() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      {METEORS.map((meteor) => (
        <span
          key={meteor.left}
          className="meteor"
          style={{
            left: meteor.left,
            animationDelay: `${meteor.delay}s`,
            animationDuration: `${meteor.duration}s`,
          }}
        />
      ))}
    </div>
  );
}
