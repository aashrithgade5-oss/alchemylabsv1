# Alchemy Labs — build law (never violate)

This file exists because font/token decisions kept reverting across sessions.
Everything here is NON-NEGOTIABLE and must be re-verified at the END of every session.

## FONTS (relocked 2026-07-18 — Playfair weight change; otherwise the 2026-07-15 Phase 0 type law)
- Display / body (H1/H2 and all prose): **Inter, variable weight** (`font-sans` /
  `font-headline`, both point to `--font-inter`) — Thin for delicate treatments
  (e.g. "Taste is the moat."), Black for the campaign headline. `.glass-type` per
  word on display headings.
- Italic / quote / tagline accent — the ONLY italic anywhere on the site: **Playfair
  Display Italic, REGULAR weight (variable axis, NOT bold — user relock 2026-07-18)**
  (`font-playfair` + `italic`). Pull-quotes, founder note, nav wordmark ("Alchemy" +
  LABS in Geist Mono small-caps), work-carousel proof line, "down the below" subtext.
  Never on any H1/H2.
- SCROLL-TEXT RELOCK (2026-09-19, user): all scroll-driven kinetic/transition text
  (TurnSequence lines, ScrollScrub statements, hero word cycler) uses **Playfair
  Display, REGULAR weight, upright + italic accent word** — never bold. Unrevealed
  words sit as a faint outline, sharpen into `.glass-type` on reveal. Inter stays
  on the static hero "WE BUILD" line and page H1/H2s.
- Eyebrows / labels / technical: **Geist Mono** (`font-mono`) — untouched by this pass.
- Geist Sans is retired as a body/display face. It is kept installed ONLY to feed the
  frozen `--font-display` alias below — never assign `font-sans`/`font-headline`
  content to Geist again.
- Before ending any session: `grep -ri "fraunces" src app` and grep `font-serif` —
  zero live usages allowed (comments referencing the retired fonts are fine).
- FROZEN-ROUTE EXCEPTION: `--font-display` / `elegant` legacy vars serve the frozen
  Aashrith portfolio — never repoint them (see FROZEN below). `font-headline` is a
  separate Tailwind key for exactly this reason — never reuse `font-display`.

## ANIMATION
- Framer Motion + Lenis (feel only). BANNED: GSAP, Three.js, Locomotive. No custom cursor.
- Scroll reveals start hidden at rest (opacity 0 / blur) and animate only on viewport entry.
- Never animate `filter` on an ancestor of a `mix-blend-*` element.
- No backdrop-filter inside scrolling containers (use `.glass-solid`).

## BUDGET
- < 150kB First Load JS per route (`/contact` 220kB is a documented pre-existing overage
  with a pending slimming item — do not make it worse).
- `npm run build` after every item. Dev server and build share `.next` — stop dev first.

## FROZEN — Aashrith Gade portfolio (diff must always be empty)
`app/aashrith/page.tsx`, `app/AashrithGadePortfolio/page.tsx`, `src/views/AashrithPortfolio.tsx`,
`src/components/portfolio/*`, `src/components/effects*`, `src/components/SequentianBackground.tsx`,
`src/components/SEOHead.tsx`, `src/data/foundersData.ts`, `src/data/portfolioProjects.ts`,
`src/hooks/use-mobile`. Verify with
`git diff --stat 7c31d8b..HEAD -- <those paths>` at session start and end.

## TOKENS
- `style-guide.md` at repo root is the single source of truth for type scale, palette
  (void `#0A0908` / carbon `#161412` / ember `#FF4D1C` / bone `#EDE6DD`), radii (16–20px
  symmetric), 8px spacing grid, and the liquid-glass spec.
- No page defines its own fonts, colors, or radii.
- Display text uses the metallic gradient `.glass-type` (bg-clip:text) — floor luminance
  high, NEVER a low-alpha transparent glyph. Over bright media, a text-scoped elliptical
  vignette (`.text-vignette`) sits between media and text.

## DEPLOY
- LOCALHOST ONLY. Never deploy, never touch Vercel. Deploy trigger is only the exact
  user phrase "yes, upload it to Vercel and make this live."

## PROTOCOL
- Commit after every work item; append HANDOFF.md each time.
- Every commit leaves a clean, working, resumable state.
