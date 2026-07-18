import type { Options } from 'canvas-confetti';

// R-7c: canvas-confetti is dynamic-imported at click time so it never enters
// any route's First Load JS. Brand palette per tokens (ember/bone/white).
// Tier 1 defaults: ~36 particles, ~1.1s, non-blocking intent signal.
export async function confettiBurst(options: Options = {}) {
  const { default: confetti } = await import('canvas-confetti');
  confetti({
    particleCount: 36,
    spread: 70,
    startVelocity: 32,
    ticks: 130,
    colors: ['#FF4D1C', '#EDE6DD', '#FFFFFF'],
    disableForReducedMotion: true,
    zIndex: 120,
    ...options,
  });
}

// Tier 2: confirmed-booking celebration — full-screen burst.
export function confettiCelebrate() {
  return confettiBurst({
    particleCount: 180,
    spread: 120,
    startVelocity: 45,
    ticks: 220,
    origin: { y: 0.6 },
  });
}
