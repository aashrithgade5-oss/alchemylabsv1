# Patches-5 master plan — "The Furnace Language"

One brand language, four materials, used with restraint: **ember light** (gradient),
**molten metal** (the atom mark), **liquid glass** (every surface you touch), and
**one motion grammar** (how everything arrives, moves and leaves).

## The four repos, mapped to this site

| Repo | What it gives | How we use it here | Why this way |
|---|---|---|---|
| ShaderGradient (`@shadergradient/react`) | slow 3D gradient wash | **Ember Field**: Paper `GrainGradient`/`MeshGradient` with brand presets | ShaderGradient needs `three` + `@react-three/fiber` (~150kB+, Three.js is banned in CLAUDE.md). Paper shaders are already installed, ~10kB, same look. |
| Liquid Logo (`paper-design/liquid-logo`) | logo as liquid metal | **Liquid Mark**: Paper `LiquidMetal` on the atom PNG | Same library the liquid-logo app is built on; already proven in the preloader. |
| Liquid Glass JS | iOS-26 refracting glass | **Liquid Glass v2**: lens-map SVG `feDisplacementMap` per element (Chromium), blur+specular fallback (Safari/Firefox) | liquid-glass-js snapshots the page with html2canvas + WebGL: heavy and wrong for a scrolling site. The lens map gives the same edge-bend natively. |
| React Three Fiber | real 3D | **Not added** (Three.js ban + 150kB budget). The 3D read comes from the liquid-metal atom and CSS 3D tilt. | Owner can lift the ban; a single lazy R3F moment would cost ~180kB on that route. |

## Rules of use (the restraint law)
1. One WebGL moment per viewport. Shaders mount only when on screen, pause when off
   screen or the tab is hidden, and never run under reduced motion or Save-Data /
   low-memory devices (static CSS poster instead).
2. One easing family: `EASE.out = [0.16, 1, 0.3, 1]` for arrivals, `EASE.inOut =
   [0.65, 0, 0.35, 1]` for scrubs and transitions. Durations: 0.32 / 0.6 / 1.1 / 1.6s.
3. Glass refracts only on small fixed surfaces (nav, pills, tabs). Large or
   scrolling surfaces use `.glass-solid`.
4. Ember is light, never fill: gradients sit at 15–40% under void, text always wins.

## Execution
- **P5-0 Foundations**: `lib/motion.ts` (tokens) + `useFx()` capability gate
  (reduced motion, Save-Data, deviceMemory, WebGL, visibility).
- **P5-1 Ember Field**: `EmberField` with presets `ember` / `dusk` / `ash`; placed on
  /pay, /journal, 404, vault login, and under ClosingBand.
- **P5-2 Liquid Mark**: `LiquidMark`; in the Brand Seal end-state, ClosingBand,
  footer, 404 and vault login.
- **P5-3 Liquid Glass v2**: `LiquidGlass` lens filter; nav, glass CTAs, UPI tabs,
  cookie banner, vault card.
- **P5-4 Route transition**: a 450ms ember veil with the atom between pages
  (replaces the plain fade), skipped under reduced motion.
- **P5-5 Motion audit**: normalize every easing/duration to the tokens, `motion` →
  `m`, reduced-motion gaps, per the audit agent's report.
- **P5-6 QA**: build budgets, live Playwright pass (errors, long tasks, FPS proxy)
  on desktop + iPhone, visual review.
- **P5-7 Review gate**: owner reviews on the branch preview (the "localhost:3000"
  step); only after approval: PR → main → production.

## 100 steps ahead (roadmap, not this pass)
- **Brand**: a sound-off-by-default sonic logo (ember crackle on CTA hover); a seasonal
  palette shift (monsoon ash / Diwali gold) via one token swap.
- **Proof**: live case-study ticker fed from the vault (results on record only);
  client logo wall unlocked per signed client.
- **Conversion**: a 3-question brief "triage" that pre-scopes and routes to Calendly
  with the answers attached; WhatsApp deep-link with the brief prefilled.
- **Ops**: Supabase ledger + CSV/Sheets sync; weekly vault digest email; uptime ping
  of /api/brief with alert to WhatsApp.
- **SEO**: per-case-study pages with Article schema; journal relaunch with 1 post/2wks;
  hreflang en-IN / en-GB for the Paris arc.
- **Performance**: AVIF for every Higgsfield still via next/image; video posters as
  blur-up LQIP; route-level code splitting of the portfolio (198kB → <150kB).
- **Craft**: View Transitions API for shared-element morphs (work tile → case study);
  variable-font weight animation on scroll for the interludes.
- **Accessibility**: full keyboard pass, focus-ring audit, captions on every film.
