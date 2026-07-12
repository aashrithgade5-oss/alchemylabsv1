# HANDOFF — Final Overhaul session (started 2026-07-12)

The single source of truth for resuming this session. Append a block entry after every commit.

## Session rules (absolute)
1. **LOCALHOST ONLY.** Dev server on http://localhost:3000. No deploy, no Vercel, no production. Deploy trigger is only the exact user phrase "yes, upload it to Vercel and make this live."
2. Commit after each numbered block; append to this file after every block.
3. Framer Motion only (no GSAP/Three/Lenis/Locomotive). No custom cursor. First Load JS < 150kB/route, gated by `npm run build` per block (stop dev server first — build and dev share `.next`).
4. Fonts installed: Geist Sans (`--font-geist-sans`, tailwind `font-sans`), Geist Mono (`font-mono`), Playfair Display Italic (`font-playfair`, editorial pull-quotes ONLY).
5. Skills: frontend-design loaded. No "design-director" or "copy-voice" skills exist in this environment.

## FROZEN — Aashrith Gade portfolio (READ-ONLY, never touch)
Route + view:
- `app/aashrith/page.tsx`
- `app/AashrithGadePortfolio/page.tsx`
- `src/views/AashrithPortfolio.tsx`

Shared dependencies Aashrith imports (do not modify; Eva uplift happens ONLY inside `src/views/EvaPortfolio.tsx`):
- `src/components/portfolio/*` (PortfolioFooter, CaseStudyOverlay, GlassCard, MarqueeRow, …)
- `src/components/effects*` (BlueprintGrid, NoiseTexture, AnimatedCapabilities)
- `src/components/SequentianBackground.tsx`
- `src/components/SEOHead.tsx`
- `src/data/foundersData.ts`, `src/data/portfolioProjects.ts`
- `src/hooks/use-mobile`

Global passes (Block 5) must exclude every file above.

## Environment facts
- ffmpeg: `C:\Users\aashr\compress-video\ffmpeg.exe` (not on PATH).
- `position: fixed` breaks inside `LayoutTransition`'s transform wrapper — page backgrounds paint page-absolute (see `HomeAtmosphere`).
- Never animate `filter` on an ancestor of a `mix-blend-*` element (leftover `blur(0px)` isolates the stacking context and kills the blend — hit this in FeaturedWork).
- Next dev overlay "1 error" badge = a Chrome extension's script (React #299), not app code.
- `geist` npm package cannot be `require`d in plain node (bundler-only) — expected, works in Next.

## Block checklist
- [x] Block 0 — baseline commit `7c31d8b` + this scaffold
- [x] Effect system — commit `598f0d3`
- [ ] Block 1 — landing page
- [ ] Block 2 — services
- [ ] Block 3 — contact
- [ ] Block 4 — Eva portfolio
- [ ] Block 5 — global (only if time)

## Bundle (last `npm run build`, 2026-07-12, at baseline)
| Route | First Load JS |
|---|---|
| / | 132 kB |
| /services | 130 kB |
| /contact | 218 kB (pre-existing, Block 3 target) |
| /about | 154 kB (legacy, out of scope) |
| /work | 164 kB (legacy, out of scope) |
| /eva | 177 kB (Block 4 target) |
| /aashrith | 189 kB (FROZEN) |
| shared | 87.9 kB |

## Block log
### Effect system (commit `598f0d3`)
Shipped: `.liquid-glass` updated to final spec (bg .05, blur20 sat180 bright1.05, inset+drop shadow); `#glass-refract` SVG filter in `app/layout.tsx`; `.glass-refract-edge` masked ring (`src/index.css`) used by `GlassPanel` (`src/components/furnace/GlassPanel.tsx`) with specular top line + pointer sheen; `src/components/furnace/fx/ScrollScrub.tsx` (per-word scroll-driven blur, offset ['start 0.85','start 0.35'], word i range [i/n, i/n+0.4]); `fx/SmoothReveal.tsx` (spring entrance, clears filter on complete — mix-blend safe); `HomeAtmosphere` v2 (two crossfading warmth layers, scroll drift); grain 3%→4%.
Pending: none in this block. Note: refraction ring uses `backdrop-filter: url(#glass-refract)` behind `@supports` — Chromium-only; other engines get the base blur.
Build: / 132kB, /services 130kB — under budget.
Resume: Block 1 (landing), start at hero type scale in `src/components/furnace/home/Hero.tsx`.

### Block 0 (commit `7c31d8b`)
Shipped: baseline commit of two prior sessions' verified work (furnace rebuild of / and /services, Geist type system, liquid glass, bento pillars, background cohesion, media pipeline). HANDOFF.md created.
Pending: everything below.
Resume: build the effect system (`src/components/furnace/fx/`), per plan at `C:\Users\aashr\.claude\plans\wiggly-baking-boot.md`.
