// The one motion grammar (Patches-5). Every arrival, scrub and exit on the
// site draws from these: one curve family, four durations, one stagger.
export const EASE = {
  /** arrivals and reveals: fast out, long settle */
  out: [0.16, 1, 0.3, 1] as [number, number, number, number],
  /** scrubs, veils, anything symmetric */
  inOut: [0.65, 0, 0.35, 1] as [number, number, number, number],
} as const;

export const DUR = { fast: 0.32, base: 0.6, slow: 1.1, cinematic: 1.6 } as const;

export const STAGGER = 0.06;

/** CSS mirror of the tokens (index.css :root --ease-out / --ease-in-out). */
export const CSS_EASE = {
  out: 'cubic-bezier(0.16, 1, 0.3, 1)',
  inOut: 'cubic-bezier(0.65, 0, 0.35, 1)',
} as const;
