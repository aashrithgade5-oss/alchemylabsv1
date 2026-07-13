# Alchemy Labs — Style Guide (single source of truth)

Locked 2026-07-13. Every route inherits this file. No page defines its own system.
Scope: all furnace routes (/, /services, /contact, /work, /about, /journal, chrome).
Exempt: frozen Aashrith portfolio (untouchable), Eva portfolio (her own black/pink identity).

## Type stack

| Role | Face | Rules |
|---|---|---|
| Display, headlines, pull-quotes | **Fraunces variable** (`--font-fraunces`, Tailwind `font-fraunces`) | High optical size, tracking -0.01em to -0.03em, line-height 1.05. Italic for editorial pull-quotes. NOTE: the Tailwind key is `fraunces`, NOT `display` — `font-display` is a legacy Geist alias used by the frozen portfolio and must never be repointed. |
| Body, subheads | **Geist Sans** (`--font-geist-sans`, `font-sans`) | line-height 1.5. |
| Eyebrows, labels, technical | **Geist Mono** (`--font-geist-mono`, `font-mono`) | 10-11px, tracking 0.2-0.35em, uppercase. |

Playfair Display is retired. Never reintroduce it.

### Modular scale (tighter than the old system)

- Hero display: `clamp(3rem, 7vw, 7rem)` (never 12rem again)
- Section heads: `clamp(2rem, 4vw, 3.5rem)`
- Card titles: `text-xl` / `text-2xl`
- Body: `text-base` (`text-lg` max for lead paragraphs)
- Display line-height 1.05 · body 1.5

### Clause-per-line rule (permanent)

Multi-clause headings and quotes hard-break each clause with `<span className="block">`.
No headline wraps mid-phrase at desktop width.

## Palette (from src/index.css tokens — the only colors)

| Token | Hex | Use |
|---|---|---|
| `void` | `#0A0908` | Page ground |
| `carbon` | `#161412` | Raised surfaces |
| `carbon-2` | `#201C19` | Second surface step |
| `ember` | `#FF4D1C` | THE accent. CTAs, focus, one glow max |
| `ember-deep` | `#C93A14` | Ember pressed/deep states |
| `amber` | `#FFA028` | Ember hover only |
| `bone` | `#EDE6DD` | Primary text |
| `ash` | `#8A8178` | Secondary text |
| `line` | `rgba(237,230,221,0.08)` | Hairlines |

One accent (ember). No purple, no new colors, no glow shadows beyond the single ember accent.

## Radius scale (one scale, symmetric, everywhere)

- Cards, inputs, QR surface: `rounded-2xl` (16px)
- Large panels, sheets, bento anchor: `rounded-[1.25rem]` (20px)
- Pills/CTAs only: `rounded-full`
- Nothing else. No mixed radii inside one component.

## Spacing

8px grid. Section padding `py-24` to `py-32` (`md:py-32` standard). Card padding `p-7`/`p-8`.

## Liquid glass (the one spec)

```css
background: rgba(255, 255, 255, 0.06);
backdrop-filter: blur(20px) saturate(160%);
border: 1px solid rgba(255, 255, 255, 0.10);
```

- `.liquid-glass` implements it. `GlassPanel` adds specular top line + pointer sheen; `refract` prop (SVG displacement edge) is opt-in and NEVER used inside scrolling containers.
- `.glass-solid` is the zero-backdrop-filter equivalent for cards inside scroll containers (snap galleries). Visually equal over dark fields; keeps 60fps.
- `.glass-type` puts the glass IN the glyphs (per-word transparent gradient fill). **Alpha floor ≥ 0.85, always.** Gradient runs bone → warm white.
- `.text-vignette`: text-scoped elliptical contrast layer between media and text:
  `radial-gradient(ellipse at center, rgba(8,8,8,0.72) 0%, rgba(8,8,8,0.55) 45%, transparent 80%)`
  Required under every headline sitting over footage. Feathered so imagery bleeds at frame edges.

## Motion

- Framer Motion + Lenis (smooth-scroll feel only, wired to Framer's rAF). No GSAP, no Three, no Locomotive, no custom cursor.
- Scroll-tied or spring physics. Nothing linear. Transform/opacity only.
- Everything honors `prefers-reduced-motion`: Lenis off, masks off, reveals instant, text fully filled.
- Never animate `filter` on an ancestor of a `mix-blend-*` element.
- No backdrop-filter inside scrolling containers.

## Copy standard

Short declarative sentences. Parallel construction ("Not X. Not Y. Z.").
Precise nouns: architecture, moat, compound, judgment, permanence.
Service copy leads with the outcome the founder buys, never the deliverable alone.
Banned: leverage (verb), unlock, game-changer, journey, empower, disrupt, seamless,
elevate, exclamation marks, hedge words. Zero em-dashes anywhere; interpunct (·) for
metadata separators, max one per line.
