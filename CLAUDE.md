# Alchemy Labs — build law (never violate)

This file exists because font/token decisions kept reverting across sessions.
Everything here is NON-NEGOTIABLE and must be re-verified at the END of every session.

## FONTS (final — Playfair is BANNED as a display face)
- Display / headlines (H1/H2): **Geist black** (`font-sans font-black`) with `.glass-type`
  per word — locked 2026-07-14 (StringTune pass). Never a high-contrast serif like Playfair.
- Editorial pull-quotes + founder note ONLY: **Fraunces italic** (`font-fraunces` + `italic`).
  A non-italic `font-fraunces` on any H1/H2 is a BUG — that was the font drift; fix it.
- Body / subheads: **Geist Sans** (`font-sans`).
- Eyebrows / labels / technical: **Geist Mono** (`font-mono`).
- Before ending any session: `grep -ri "playfair" src app` and grep `font-serif` —
  zero display usages allowed. Playfair may exist ONLY at explicitly zero uses.
- FROZEN-ROUTE EXCEPTION: `--font-display` / `elegant` legacy vars serve the frozen
  Aashrith portfolio — never repoint them (see FROZEN below).

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
