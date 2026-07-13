# HANDOFF — Final Overhaul session (started 2026-07-12)

The single source of truth for resuming this session. Append a block entry after every commit.

---

# ✅ PERFECTION PASS — EXECUTED 2026-07-13 (commits e142057..HEAD)

Every item in the spec below is DONE and verified in-browser (screenshots of /, /services, /contact?pillar=ai at every section). See "Block log → Perfection pass" at the bottom for what shipped. Additional user asks executed same session: glass-type on ALL display text site-wide, atom logo replaces the nav wordmark, favicon.ico/png regenerated from the alchemy logo (black-bg variant, ffmpeg crop+scale), metadata.icons wired in app/layout.tsx.

Bundle after the pass: / 133kB · /services 132kB · /contact 220kB (pre-existing overage, slimming still pending). The spec is kept below for reference only — do not re-execute.

---

# ⚡ ORIGINAL SPEC (written 2026-07-13, now fully executed)

## 0. Session bootstrap (do these before touching code)
1. Load skills, in this order: `design-taste-frontend`, `high-end-visual-design`, `frontend-design:frontend-design`. The user explicitly wants these applied to all website work.
2. **Conflict rule**: where a skill contradicts the user's locked direction, THE USER WINS. Locked user direction that overrides skill defaults: centered hero ("Taste is the moat." stays centered), Playfair Display Italic for editorial pull-quotes (serif discipline does not apply to these four spots), liquid glass everywhere it's already used, ember/void/carbon/bone palette, Geist Sans/Mono. Skill rules that DO apply and align: zero em-dashes, no `window scroll` listeners, transform/opacity-only animation, blur never inside scrolling containers (this one is load-bearing for the fixes below), reduced-motion everywhere, one accent color.
3. Dev server: `npm run dev` in background; check port 3000 first (`Get-NetTCPConnection -LocalPort 3000`), kill stale PID if needed. Build gate = stop dev, `npm run build`, restart dev (they share `.next`).
4. Read the "Session rules", "FROZEN", and "Environment facts" sections further down in this file. They all still bind. LOCALHOST ONLY. Commits allowed after each work unit; deploys NEVER.

## 1. USER FEEDBACK BEING FIXED (verbatim intent)
- "Multiple glitches on the landing page when scrolling."
- "The refraction box is being added as a box instead of the TEXT itself being a liquid glass refractive element" (TurnSequence micro-copy band).
- "Taste is the moat. should literally be liquid glass refractive text, like StringTune." Hero font "can be bettered", subline "could be made better".
- "Way more elements and media on services and contact." Contact needs "a running video like the previous version, or like the people-walking silhouette" (that's `/media/red-slats-tall.mp4`).
- "Keep perfecting all pages. Seamless and stunning. Do not rebuild."

## 2. ROOT-CAUSE DIAGNOSIS (verified this session — trust it)
1. **The box**: `TurnSequence.tsx` currently wraps its kinetic lines in `<GlassPanel className="w-full max-w-5xl rounded-3xl …">` (added Block 1). A bordered, shadowed panel over the scrub footage reads as a UI card, not StringTune glass type. It must be REMOVED and replaced with glass-on-the-glyphs (spec §3).
2. **Scroll glitches**: `GlassPanel` renders a `.glass-refract-edge` (backdrop-filter: url(#glass-refract)) on EVERY instance — 9+ SVG-displacement backdrops, several inside scrolling contexts (the TheFive horizontal snap track, page-scroll bento cards). SVG-filter backdrops repaint on every scroll frame in Chromium → the visible glitching. Fix: refraction becomes opt-in (`refract` prop, default OFF), and cards inside the snap gallery lose backdrop-filter entirely (solid glass look, spec §4).
3. **KineticHeadline constraint discovered by reading the source** (`src/components/furnace/KineticHeadline.tsx`): the root tag has NO inline filter (safe), but each word `m.span` animates `y` transform + `filter` inline. Two consequences: (a) `background-clip: text` must be applied PER-WORD (on the inner `m.span`s), not on the parent — child transforms/stacking contexts break parent-level bg-clip in Chromium; (b) never rely on a `filter: drop-shadow` class on those spans — framer's inline `filter` overwrites class filters permanently. Same constraint applies to `ScrollScrub.tsx`'s `Word` spans. Depth comes from the halo layer instead (spec §3B).

## 3. THE GLASS-TYPE SYSTEM (the centerpiece — build exactly this)

### 3A. CSS — add to `src/index.css` next to `.liquid-glass`
```css
/* Liquid glass TYPE: translucent glyph fill. Apply to the WORD spans
   (see §2.3), never to a parent whose children carry transforms. */
.glass-type {
  color: transparent;
  background-image: linear-gradient(
    180deg,
    rgba(250, 247, 242, 0.96) 0%,
    rgba(250, 247, 242, 0.62) 52%,
    rgba(250, 247, 242, 0.85) 100%
  );
  -webkit-background-clip: text;
  background-clip: text;
}

/* Boxless refractive halo: the backdrop visibly bends and blurs BEHIND the
   type with zero edges (feathered mask = no panel read). Position absolutely
   behind a headline, oversized (-inset-x-12 -inset-y-8 or a fixed stage box). */
.glass-halo {
  pointer-events: none;
  -webkit-backdrop-filter: blur(14px) saturate(165%) brightness(1.07);
  backdrop-filter: blur(14px) saturate(165%) brightness(1.07);
  -webkit-mask-image: radial-gradient(60% 68% at 50% 50%, black 28%, transparent 76%);
  mask-image: radial-gradient(60% 68% at 50% 50%, black 28%, transparent 76%);
}
@supports (backdrop-filter: url('#glass-refract')) {
  .glass-halo {
    -webkit-backdrop-filter: url('#glass-refract') blur(12px) saturate(165%) brightness(1.07);
    backdrop-filter: url('#glass-refract') blur(12px) saturate(165%) brightness(1.07);
  }
}

/* Solid glass for surfaces INSIDE scrolling containers (snap gallery cards):
   the liquid-glass look with ZERO backdrop-filter, so horizontal scroll stays
   60fps. Visually near-identical over dark fields. */
.glass-solid {
  background: linear-gradient(160deg, rgba(42, 38, 35, 0.92) 0%, rgba(26, 24, 22, 0.96) 100%);
  border: 1px solid rgba(255, 255, 255, 0.12);
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.12), 0 8px 32px rgba(0, 0, 0, 0.35);
}
```
(`#glass-refract` SVG filter already exists in `app/layout.tsx` — reuse, do not duplicate.)

### 3B. Where to apply
- **Hero (`src/components/furnace/home/Hero.tsx`)**: inside the content block, wrap the `KineticHeadline` in `relative`; insert `<div aria-hidden className="glass-halo absolute -inset-x-10 -inset-y-6 z-0" />` BEFORE it; pass a new `wordClassName="glass-type"` prop into KineticHeadline (add that prop: it appends to the inner `m.span` className — 3-line change in `KineticHeadline.tsx`), and REMOVE `text-bone` from the headline class (transparent fill replaces it). Keep `clamp(4rem,11vw,12rem) font-black tracking-[-0.04em]`.
- **TurnSequence (`src/components/furnace/home/TurnSequence.tsx`)**: DELETE the `GlassPanel` import + wrapper (restore the plain `absolute inset-0 flex items-center justify-center px-6` line container). Add one halo behind the swap-point: `<div aria-hidden className="glass-halo absolute left-1/2 top-1/2 h-[16rem] w-[min(72rem,92vw)] -translate-x-1/2 -translate-y-1/2" />`. In `KineticLine`, add `glass-type` to each `Word` span's className (in the local `Word` component, same file) and drop `text-bone` from the line h2. Keep the `bg-void/25` scrim.
- **ScrubBeats (`src/views/HomePage.tsx` local `ScrubBeat`)**: same treatment — halo div behind, `glass-type` added inside `ScrollScrub`: add a `wordClassName` prop to `src/components/furnace/fx/ScrollScrub.tsx` (append to `Word`'s `m.span`), pass `wordClassName="glass-type"` from ScrubBeat. Remove `text-bone` there.
- **Reduced-motion branches**: give the static fallbacks plain `text-bone` (glass fill without the halo is fine too; do not ship transparent text with no fill anywhere).

### 3C. Hero subline (user: "could be made better")
Replace the current subline string + classes in `Hero.tsx` with:
```
AI throughput under human judgment. Brand systems and campaign film for founders who can tell the difference.
```
classes: `mt-8 max-w-xl text-lg md:text-xl font-light leading-relaxed text-bone/70 [text-wrap:balance]`. No em-dashes, short declaratives, "film" not "imagery" (tighter noun).

## 4. GLASSPANEL PERF FIX (kills the scroll glitches)
`src/components/furnace/GlassPanel.tsx`:
1. Add prop `refract?: boolean` (default `false`). Render the `.glass-refract-edge` div ONLY when `refract`.
2. Turn refraction ON solely at: the bento anchor card (Pillars, `i === 0`), the contact form panel (`src/views/ContactPage.tsx`). Everything else keeps base `.liquid-glass` (still has blur, that's fine at page-scroll scale).
3. `src/components/furnace/home/TheFive.tsx` `ProductCard`: replace `<GlassPanel className="flex w-[20rem] …">` with a plain `<div className="glass-solid group relative flex w-[20rem] shrink-0 snap-center flex-col overflow-hidden rounded-2xl">` — NO backdrop-filter inside the snap track (this is the biggest glitch fix). Keep the gradient strip + filled CTA exactly as they are.

## 5. MEDIA + ELEMENT EXPANSION (user wants "way more")

### 5A. Services (`src/components/furnace/services/*`)
1. **Pillar media figures** — each `PillarSection` gets a cinematic still on the side opposite its numeral. Add to `pillars.ts`: `still: string` → `01: '/media/cinematic-still-1.png'`, `02: '/media/lone-figure-1.webp'`, `03: '/media/split-frames-3.png'`. In `PillarSection.tsx`, convert the inner wrapper to `md:grid md:grid-cols-[1fr_auto] gap-12` (mirror when `numeralRight`): text column as-is; figure column = `relative aspect-[3/4] w-[20rem] lg:w-[24rem] overflow-hidden rounded-2xl` with `next/image fill object-cover`, a `bg-void/30` scrim, hairline `border border-line`, SmoothReveal entrance (`src/components/furnace/fx/SmoothReveal.tsx` exists, unused so far — use it here). Hide below `md` or render above the offer stack at `w-full aspect-video`.
2. **Services closing band** — new `ServicesClosing.tsx` in `services/`: `AmbientVideo` with `/media/samurai-silhouette-2.mp4` (the turning samurai; generate poster first: `& "$env:USERPROFILE\compress-video\ffmpeg.exe" -y -i public/media/samurai-silhouette-2.mp4 -vf "select=eq(n\,0)" -frames:v 1 -q:v 4 public/media/samurai-silhouette-2-poster.jpg`), dimmed ~30% + `bg-void/50` scrim + top/bottom feathers (copy the StudioMotion pattern), one line (Playfair italic, e.g. "Scope it in one conversation.") + `MagneticCTA href="/contact" variant="ember"` "Begin". Mount after `<FAQ />` in `src/views/ServicesPage.tsx` (lazy, like FiveGrid).

### 5B. Contact (`src/views/ContactPage.tsx`)
1. **The walking-silhouettes running video** (explicit user ask): behind the header section, add an absolutely-positioned `AmbientVideo src="/media/red-slats-tall.mp4" poster="/media/red-slats-tall-poster.jpg"` at `opacity-25 object-cover`, inside a container masked `linear-gradient(to bottom, black 30%, transparent 100%)` (copy the TheFive backdrop pattern) so it dissolves before the form. Import `AmbientVideo` from `@/components/furnace/home/AmbientVideo`.
2. Keep everything else from Block 3 (glass form, preselect). Add `refract` to the form GlassPanel per §4.2.

### 5C. Landing extras (small, after the glass work)
- Bento anchor card (Pillars `i===0`): turn `refract` on.
- Verify FeaturedWork/StillBreak/ClosingBand still blend correctly after any wrapper changes (remember the filter-over-mix-blend trap — Environment facts below).

## 6. EXECUTION ORDER + PROTOCOL (per unit: tsc → build gate → commit → append here)
1. §3A CSS + §4 GlassPanel prop + §3B TurnSequence + Hero + ScrubBeat + §3C subline + KineticHeadline/ScrollScrub `wordClassName` props → commit `overhaul: glass type system, boxless refraction, scroll perf`.
2. §4.3 TheFive glass-solid card → same commit as 1 if small, else its own.
3. §5A services media (+poster gen) → commit `overhaul: services media pass`.
4. §5B contact video → commit `overhaul: contact motion pass`.
5. Full visual pass in browser (extension may reconnect — if `mcp__claude-in-chrome` fails, verify via SSR curl probes + report honestly, as before). Budgets: / and /services MUST stay <150kB; /contact 220kB pre-existing overage (separate slimming item, not this pass).
6. Update the block log below + the memory file (`overhaul-handoff` memory points here).

## 7. TASTE BAR FOR EVERY DECISION (from the loaded skills, filtered through the user's locked direction)
- Type does the talking: oversized Geist black display, tight tracking, Playfair italic ONLY as punctuation. No new fonts.
- One accent (ember). No new colors, no purple, no glow shadows.
- Every surface is either media, glass over media, or void with atmosphere — never flat dead black (the user called that out once already: "kill the dead void").
- Motion is scroll-tied or spring physics; nothing linear; everything honors `useReducedMotion`; nothing animates `filter` on an ancestor of a `mix-blend` element.
- Zero em-dashes anywhere. Interpuncts (·) for metadata separators only, max one per line.
- If a section looks like a template, it is wrong. If it looks like a UI card floating on footage, it is wrong (that was this session's core lesson: glass belongs IN the type, not around it).

---

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
- [x] Block 1 — landing page — commit `6f2434f`
- [x] Block 2 — services — commit `89232d0`
- [x] Block 3 — contact — commit `0e4a482` (route over budget BEFORE session; see block log)
- [x] Block 4 — Eva portfolio — commit `e3c714d`
- [x] Block 5 — global — this commit (verification only; nothing needed changing)

## Bundle (final `npm run build`, 2026-07-12, end of session)
| Route | First Load JS | Status |
|---|---|---|
| / | 133 kB | ✅ under 150 |
| /services | 131 kB | ✅ under 150 |
| /contact | 220 kB | ⚠ over — was 218 kB BEFORE session (legacy Supabase/icon weight in the form; restyle-only constraint forbade slimming). Pending: dynamic-import the supabase submit path, prune lucide imports. |
| /eva | 178 kB | legacy weight, pre-existing (was 177) |
| /aashrith | 189 kB | FROZEN, unchanged |
| /about, /work, /journal | 154/164/153 kB | legacy, out of scope this session |
| shared | 87.9 kB | |

## SESSION COMPLETE — state for the next model
All five blocks + effect system committed on `main` (`78d99eb` → `e3c714d`). Frozen Aashrith paths verified untouched across every commit (`git diff --stat 7c31d8b..HEAD -- <frozen paths>` is empty). Dev server runs on http://localhost:3000. NOTHING DEPLOYED — localhost only, per the absolute rule.

**Single next action for a fresh model**: full in-browser visual pass of `/`, `/services`, `/contact?pillar=ai`, `/eva` with the Chrome window focused (this session's browser extension disconnected partway — everything after Block 1 was verified via SSR HTML probes + build gates, not screenshots). Then, if the user wants: the /contact slimming pass (see budget table).

**Known open items** (beyond OVERHAUL_TODO.md's human decisions):
- /contact bundle slimming (above).
- Refraction ring is Chromium-only (`backdrop-filter: url(#glass-refract)` behind `@supports`); Safari/Firefox get base blur — acceptable, by design.
- GrainOverlay went 3%→4% globally (effect-system block); it also overlays the frozen portfolio routes as it always did — Aashrith's FILES are untouched, but flag if he notices the texture.
- `public/sequence/forge-*.webp` (71 frames, old ForgeSequence) are committed but unused — delete when convenient.

## Block log
### Perfection pass (2026-07-13, commits e142057, b51118b, 02e01c8, 3b08d31 + this one)
Shipped, in order:
1. **Glass type system** (`e142057`): `.glass-type` (per-word transparent gradient fill via bg-clip:text), `.glass-halo` (boxless feathered backdrop-refraction behind headlines), `.glass-solid` (zero-backdrop-filter card for scroll containers) in `src/index.css`; `GlassPanel` refraction now opt-in via `refract` prop (ON only: Pillars anchor card, contact form); `wordClassName` prop added to KineticHeadline + ScrollScrub; TurnSequence GlassPanel BOX DELETED, halo + glass-type words instead; Hero halo + glass-type + new subline ("AI throughput under human judgment…"); ScrubBeats halo'd; glass-type applied to every display headline (ServicesHero, PillarSection titles, FiveGrid clauses, FAQ, ClosingBand, Contact h1) — parents keep `text-bone` so reduced-motion fallbacks stay filled; TheFive ProductCard → `.glass-solid` div (the big scroll-glitch fix).
2. **Services media** (`b51118b`): `still` field on pillars (cinematic-still-1 / lone-figure-1 / split-frames-3), PillarSection figure column opposite the numeral (SmoothReveal, aspect-3/4, hidden below md), new `ServicesClosing.tsx` (samurai-silhouette-2 loop + poster + "Scope it in one conversation." + Begin CTA) mounted lazily after FAQ.
3. **Contact motion** (`02e01c8`): red-slats-tall walking-silhouettes loop behind the header at opacity-25, masked to dissolve before the form; header content lifted into a relative wrapper.
4. **Brand mark** (`3b08d31`): nav text lockup replaced by the atom logo (38px, hover rotate); favicon.ico + favicon.png regenerated from `logo-black-bg.png` (ffmpeg crop 560² → 64/192); `metadata.icons` added.
Verified in Chrome (extension worked this session): full scroll of / (hero glass type over video, TurnSequence boxless lines over the turn scrub, bento, both ScrubBeats, glass-solid Five cards, StudioMotion, ClosingBand), /services (stills, closing band), /contact?pillar=ai (video header, preselect = "Fast · 24h AI Build").
Builds: / 133kB, /services 132kB, /contact 220kB (pre-existing).
Resume: nothing pending from the perfection-pass spec. Open items remain: /contact bundle slimming, unused forge-*.webp deletion.

### Block 5 — global (final commit)
Shipped: verification pass. Legacy font vars already point at Geist (`src/index.css:78-80`, done pre-session). Section-level `border-t` sweep across `src/` found only the site footer hairline (`src/components/furnace/Footer.tsx:21`) — deliberate chrome, kept. Grain is root-level and covers all routes. All routes return 200. Frozen-path diff against baseline is empty.
Resume: nothing pending in this block.

### Block 4 — eva (commit `e3c714d`)
Shipped: `evaGlass()` pink liquid-glass (local helper in `src/views/EvaPortfolio.tsx`) on client-showcase and career-journey cards; first collaboration card spans the grid (asymmetry); philosophy quote up one size; venture marquee tiles are now deliberate pink gradient tiles captioned `BRAND ALCHEMY · NN` instead of `IMG n`. Content/links/credits preserved verbatim; her authored quote (with its em dash) intentionally untouched. No shared portfolio component modified.
Build: /eva 178kB (pre-existing legacy weight, +1kB).
Resume: Block 5.

### Block 3 — contact (commit `0e4a482`)
Shipped: `src/views/ContactPage.tsx` rebuilt (centered, `clamp(3.5rem,9vw,9rem)` Geist black h1 "Start the work.", Playfair line "The first conversation is the audit.", liquid-glass trust pills, form in GlassPanel over HomeAtmosphere); `.glass-input` CSS → liquid-glass spec + ember focus ring (`src/index.css:289`); Contact.tsx: option labels em-dash→interpunct, section padding trimmed for the panel, and the previously MISSING `?pillar=` preselect added (`pillarToService` map ai→fast-24h, brand→foundation-brand, advisory→clarity-advisory + mount effect). Turnstile/Supabase/Calendly logic untouched.
**BUDGET FLAG**: /contact is 220kB First Load (was 218kB before this session — legacy Supabase client + icons in the form bundle). The overage predates this block; fixing it requires code-splitting the form's deps, which the restyle-only constraint forbids. Pending item: dedicated slimming pass (dynamic-import supabase call path, prune lucide imports).
Verification: SSR probes for header/pills/panel; preselect is client-side — verify in browser with `/contact?pillar=ai` when the extension reconnects.
Build: / 133kB, /services 131kB, /contact 220kB (flagged).
Resume: Block 4 (Eva) — `src/views/EvaPortfolio.tsx` ONLY.

### Block 2 — services (commit `89232d0`)
Shipped: pillar titles / FiveGrid clause lines / FAQ header on ScrollScrub (ScrollScrub base alignment made caller-controlled — `justify-center` moved to home's ScrubBeat); pillar offers in GlassPanel; kanji 壱/弐/参 at `text-ember/[0.07]` behind each pillar numeral (one motif per section); ServicesHero headline `clamp(3.5rem,9vw,9rem)` font-black; HomeAtmosphere mounted on ServicesPage, `bg-void` dropped from PillarSection/FiveGrid/FAQ. Pricing catalogue untouched and verified in SSR (pillars price-free, Five printed prices).
**IMPORTANT for Block 3**: `?pillar=` slugs sent by PillarSection are `ai|brand|advisory` (`src/components/furnace/services/pillars.ts:13`) but Contact subject values are `fast-24h|foundation-brand|clarity-advisory` (`src/components/Contact.tsx:13-15`) — preselect cannot match today. Fix by mapping slugs in Contact's param-read effect (ai→fast-24h, brand→foundation-brand, advisory→clarity-advisory).
Verification: SSR probes (kanji ×3, clause heading, FAQ) — browser extension still disconnected.
Build: / 133kB, /services 131kB.
Resume: Block 3 (contact) — read `src/views/ContactPage.tsx` + `src/components/Contact.tsx`, restyle wrappers only, fix the slug mapping above.

### Block 1 — landing (commit `6f2434f`)
Shipped: hero headline `clamp(4rem,11vw,12rem)` font-black tracking -0.04em (breathe animation dropped — it fought the weight); subline up a step; TurnSequence copy inside a refracting GlassPanel band (scrim eased to void/25); Intertext 70svh + right-edge ember vignette, Playfair quotes text-4xl/6xl; new `ScrubBeat` (in `src/views/HomePage.tsx`) using ScrollScrub — THE PROOF "Every frame here survived the eye." after StillBreak, THE STANDARD "One studio. One bar. No exceptions." after TheFive; bento cards now GlassPanel with media fills (`red-glass-panels.mp4`, `red-slats-wide.mp4`, gradient field on 03; posters generated); TheFive marquee → `.furnace-snap` scroll-snap gallery, glass cards, per-card gradient strip, filled CTA "Buy now · $price" opening PaymentSheet; marquee CSS removed.
Verification: SSR HTML probes confirm all new markup (browser extension disconnected mid-session — Chrome closed; no screenshots this block). Full visual pass pending user preview.
Build: / 133kB, /services 130kB.
Resume: Block 2 (services) — start at `src/components/furnace/services/PillarSection.tsx` (ScrollScrub headers, GlassPanel deliverables, kanji watermark 壱/弐/参), then FiveGrid/FAQ transparency + HomeAtmosphere on `src/views/ServicesPage.tsx`.

### Effect system (commit `598f0d3`)
Shipped: `.liquid-glass` updated to final spec (bg .05, blur20 sat180 bright1.05, inset+drop shadow); `#glass-refract` SVG filter in `app/layout.tsx`; `.glass-refract-edge` masked ring (`src/index.css`) used by `GlassPanel` (`src/components/furnace/GlassPanel.tsx`) with specular top line + pointer sheen; `src/components/furnace/fx/ScrollScrub.tsx` (per-word scroll-driven blur, offset ['start 0.85','start 0.35'], word i range [i/n, i/n+0.4]); `fx/SmoothReveal.tsx` (spring entrance, clears filter on complete — mix-blend safe); `HomeAtmosphere` v2 (two crossfading warmth layers, scroll drift); grain 3%→4%.
Pending: none in this block. Note: refraction ring uses `backdrop-filter: url(#glass-refract)` behind `@supports` — Chromium-only; other engines get the base blur.
Build: / 132kB, /services 130kB — under budget.
Resume: Block 1 (landing), start at hero type scale in `src/components/furnace/home/Hero.tsx`.

### Block 0 (commit `7c31d8b`)
Shipped: baseline commit of two prior sessions' verified work (furnace rebuild of / and /services, Geist type system, liquid glass, bento pillars, background cohesion, media pipeline). HANDOFF.md created.
Pending: everything below.
Resume: build the effect system (`src/components/furnace/fx/`), per plan at `C:\Users\aashr\.claude\plans\wiggly-baking-boot.md`.
