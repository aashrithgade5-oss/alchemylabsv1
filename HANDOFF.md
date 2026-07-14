# HANDOFF — Final Overhaul session (started 2026-07-12)

The single source of truth for resuming this session. Append a block entry after every commit.

---

# FO4 — Wave 3 (2026-07-15, same plan file)

All 6 Wave 3 items resolved (one skipped by decision, five shipped). Commits `27d5263`..`8e1e4a9` (plus the two-commit fix for a staging mistake on the Work rebuild, `27d5263`/`410c130`).

- **W3.1 (skipped)**: "non-rendering walking video + two founders photo overlay" didn't match anything in the current codebase — both videos in the homepage's "What We Do" section already render correctly, and no founders-photo overlay exists anywhere. Confirmed by thorough search, not assumed; Ash confirmed skip.
- **W3.2 — Work rebuilt as a bento grid** (`27d5263`, `410c130`): replaced the legacy Work.tsx (fabricated metrics, filter bar) with a 4-cell asymmetric bento driven by `lib/portfolio.ts` (built in an earlier phase but never wired to this route until now). Deleted 7 now-orphaned files (Breadcrumbs, Lightbox, HorizontalScroll, ClientMarquee, work/MediaCarousel, work/WorkProjectCard, data/projects.ts) after confirming zero other importers. `/work`: 164kB -> 122kB.
- **W3.3 — Pricing cards** (`c33ffd9`): full-bleed video per card (5 clips cycled from existing footage) + 3D hover via the previously-unwired `ui/3d-card.tsx` (pure CSS transforms, no Three.js). Two conflicts surfaced and resolved with Ash before building: kept `.glass-solid` over real liquid-glass (backdrop-filter glitches this exact scroll-snap track, fixed in an earlier session) and kept user-driven scroll over a literal auto-scroll marquee (fights a clickable Buy-now button).
- **W3.4 — Forge headline typography** (`77e6b1f`): "The forge never cools." converted from a static Fraunces-italic fade to the same ScrollScrub + glass-type + font-headline treatment as THE STANDARD beat. Ash declined further rollout to Contact/ClosingBand/ServicesClosing — Forge stays the one-off.
- **W3.5 — Services hero media** (`7bb656f`): swapped the under-res b2-bomber-3.webp (1600x896/21KB, flagged in an earlier HANDOFF entry) for b2-bomber-2.png (2912x1632) — same subject, native resolution, already sitting unused in public/media.
- **W3.6 — Spacing audit** (`8e1e4a9`): measured (not eyeballed) real gaps via getBoundingClientRect. Services hero->Pillar1: 240px -> 160px. Homepage Intertext->Pillars ("What We Do"): 420px -> 340px (didn't fully close — Intertext's `min-h-[70svh]` drives its scroll-linked reveal timing, so its height wasn't touched). Audit surfaced this double-padding pattern as systemic across every section boundary on both pages, not just the two named spots; scoped to those two by explicit decision, sitewide rewrite deferred.

Font-direction rollout from Wave 2 (Inter Tight as `font-headline`) is now used consistently on the Work page's fallback titles and stays untouched elsewhere. Final gates re-run: zero real Playfair usage (one retired-language comment only), zero `font-serif`, frozen-path diff empty, all budgets within documented limits (`/work` improved, nothing regressed).

Known unresolved: 380/768px screenshot verification still blocked (documented Chrome-window-maximized limitation, unrelated to this wave's work) — all verification was desktop-width.

---

# FO4 — Wave 2 (2026-07-14/15, same plan file)

Commits `5e1214e`..`108285a`, plus the font rollout `0072d0f` (which also covers part of W3's later work).

- **W2.0 (unplanned, discovered mid-wave)**: found and fixed a sitewide Tailwind bug — `void`/`carbon`/`ember`/`amber`/`bone`/`ash` were bare `var(--x)` references in `tailwind.config.ts`, so `text-bone/70`-style opacity modifiers silently compiled to no rule at all (confirmed via the actual generated stylesheet, not assumed). 36 occurrences across 20 files had been rendering at full opacity or inherited color this whole rebuild. Fixed at the root: the 6 vars now hold RGB triplets, wrapped in `rgb(var(--x) / <alpha-value>)` — no call sites changed.
- **W2.1 — Git-history investigation**: found real precedent for both the footer/CTA rebuild (commit `f00fef1`, last Vite-era Footer.tsx) and the contact bleed background (commit `8599310`). No precedent existed for the "enlarged wordmark + bottom magnetic CTA" idea — confirmed as new design work, not a restoration, before building it.
- **W2.3 — Site-wide bottom CTA + newsletter**: new `BottomCTA` component, mounted in `SiteChrome` on every route except `/` (ClosingBand already closes the homepage) and `/contact` (already the CTA destination). Newsletter restored cosmetically only, per Ash's decision — it was never wired to a real backend before either.
- **W2.4 — Contact bleed background**: restored `contact-bg.png` behind the form only, radial-masked, from the real historical commit.
- **W2.2/W2.6 — Font direction + rollout**: rendered 3 candidates live via temporary DOM injection (zero source changes) for Ash to pick from — Geist tighter, Inter Tight, Oswald. Ash chose **Inter Tight**, reversing the CLAUDE.md-locked Geist-black decision. Rolled out to all 12 true H1/H2 prose headlines (new `font-headline` Tailwind key, never `font-display` — that's the frozen Aashrith alias) across 10 files. Deliberately did NOT touch the ALCHEMY wordmark/logo treatments or the giant decorative pillar numerals (brand-mark and numeral treatments, not prose headlines) or the About page (explicit exclusion).
- **Letter-spacing/line-height audit**: confirmed (not blindly re-tuned) the existing tracking values hold up with Inter Tight's tighter natural proportions at all 5 type-scale tiers — no collisions found under zoom inspection.
- **W2.5 (blocked)**: StringTune reference images — `public/media/reference/` doesn't exist on disk and no StringTune-named file exists anywhere in the repo, despite Ash's expectation that it was already populated. Waiting on Ash to actually place the files; I cannot manifest binary images that don't exist somewhere accessible to me (browser screenshot `save_to_disk` only attaches to chat, doesn't expose a filesystem path — confirmed after one failed attempt to route around this via a native OS screenshot, which captured the real desktop instead of the browser tab and was deleted immediately).

---

# FO4 — Wave 1 (2026-07-14, plan: C:\Users\aashr\.claude\plans\you-are-executing-a-foamy-meteor.md)

All 7 Wave 1 items shipped, each its own commit, build-gated (`npm run build`) and browser-verified via real mouse-wheel scroll (not programmatic `scrollTo`, which gives misleading readings against Lenis's smoothing — learned the hard way mid-session). Commits `5aa8e7d`..`e119c71`.

1. **Loader** (`5aa8e7d`): rebuilt as the atom mark filling via lazy `@paper-design/shaders-react` LiquidMetal (bottom-up clip reveal + 0-100 counter), portaled to `document.body` — `LayoutTransition`'s `.gpu-accelerated` wrapper carries a permanent transform, which turns fixed descendants page-relative; without the portal the overlay rendered thousands of px down the page. Fill timing uses wall-clock elapsed via `useAnimationFrame`, not framer's standalone `animate()` (bigger bundle) or accumulated frame deltas (stretches on throttled tabs).
2. **Hero shader** (`69db45f`): new `HeroMeshField` (lazy MeshGradient, ember/void palette, screen-blended low in the video's ellipse mask) replaces the flat CSS-gradient read the hero oval used to have. Opaque decorative surface, no backdrop sampling — doesn't hit the wall GlassFluted hit on GlassPanel. `/` bundle unchanged (shader chunk lazy-loads).
3. **Cycler shimmer** (`616e976`): traveling ember highlight band layered onto the WE BUILD cycler's existing per-word metallic gradients (same grid cell, same text — the FO3 zero-reflow fix is untouched). Descoped from a literal TextHoverEffect port: that component's SVG viewBox scales per-word, which would size "FILM" and "BRAND SYSTEMS" differently in the fixed-width stacked-lockup cell.
4. **Dead FloatingCTA deleted** (`52fff4c`): the "clipped Book a Sprint pill" was `FloatingCTA.tsx` — zero importers anywhere, already pulled from `layout.tsx` in an earlier session but the file itself never deleted. Also carried the banned old palette and a raw `window.addEventListener('scroll')`. Root-cause fix is deleting the dead render path, not patching padding on code nothing mounts.
5. **Scroll dead-zone fix** (`caca0c6`): Hero's sticky stage (h-100svh in an h-180svh parent) unsticks at ~80svh but the section doesn't end for another full 100svh — one dead viewport-height of scroll through Hero's already-resolved, frozen tail before TurnSequence even starts. That trailing distance is mathematically fixed at `sticky_height` regardless of runway, so it can only be compressed by starting the next section earlier: TurnSequence now sits `-mt-[50svh]`. Surfaced a real second bug this uncovered — Hero's headline/cycler had no scroll-tied opacity fade (only eyebrow/CTAs did), so it stayed opaque through the compressed gap and visibly collided with TurnSequence's frame; fixed by moving `chromeOpacity` onto the single outer content wrapper so the whole column fades together.
6. **Ember text + vignette** (`89f849c`): TurnSequence's kinetic lines get `.glass-type-ember` / `.text-vignette-ember` (new CSS siblings, same opaque bg-clip:text / boxless-feathered mechanism as the base classes, just ember-toned) instead of the base steel gradient + flat neutral-black vignette, which read as a mismatched patch over the red-wings footage. Base `.glass-type`/`.text-vignette` untouched — still the sitewide default.
7. **Copy pass** (`e119c71`): "Generation is cheap. Judgment is not." (restated the immediately-preceding TurnSequence beat in blander words, also a stock AI-studio trope) → "Machines draft. / We decide what survives." "Start under $300." (restated its own subline, generic round-number threshold) → "The price is the pitch." (builds on the preceding OFFER beat instead).

**Known environment limitation, unresolved**: 380/768px screenshot passes still BLOCKED — Chrome window is maximized/snap-managed, `resize_window` reports success but `innerWidth`/`innerHeight` don't change (tried `super+Down` first, no effect). Matches the exact blocker logged in the 2026-07-14 overhaul3 entry below. All verification this session is desktop (2560x1440 device, ~1450-1568 CSS px depending on tab).

Budget: `/` 136kB, `/services` 133kB, `/contact` 171kB — all within the documented budgets (`/contact`'s 171kB is the pre-existing, documented legacy overage). Frozen-path diff (`git diff --stat 7c31d8b..HEAD -- <frozen paths>`) empty.

Resume: Wave 2 (font direction decision, footer/bottom-CTA rebuild — needs git-history check first, contact bleed background, StringTune reference file, sitewide font consistency pass). See the plan file for full Wave 2/3 specs.

---

# FINAL OVERHAUL 3 (2026-07-13, master prompt: CLAUDE.md law + StringTune treatment + steps 1-8)

CLAUDE.md now exists at repo root (commit `1d9ec3d`) — standing law: fonts (Playfair banned), animation, budget, frozen paths, tokens. Re-verify at session end.

### FO3 Step 1 — StringTune metallic glass type (this commit)
Shipped:
- `.glass-type` → metallic vertical gradient `#b8b8bd → #f4f2ee 55% → #cfcdc9` (fully opaque stops, brushed-metal read). Verified in-browser over the red-wings TurnSequence frame AND the hero samurai footage — every word crisp.
- `.text-vignette` → explicit `ellipse 50% 50%` radii (default farthest-corner sizing put the transparent stop past the element bounds — read as a faint dark RECTANGLE over the bright wings frame; now feathers invisibly).
- StringTune display moments → clean grotesk: Hero "Taste is the moat." now `font-sans font-black clamp(3rem,8vw,8rem) tracking-[-0.04em]`; TurnSequence kinetic lines `font-sans font-black`. Fraunces italic stays for editorial pull-quotes only.
- **Playfair fully retired**: @fontsource/playfair-display + cinzel uninstalled; index.css imports removed; tailwind `elegant`/`alchemy` aliases deleted (zero uses verified); dead `.font-alchemy` class deleted; legacy Navigation.tsx inline fontFamily → fraunces var (component is dead code, nothing imports it). Grep for playfair/font-serif/cinzel: comments only.
- **P0 BUG FIX — Loader.tsx StrictMode wedge**: the mount effect stamped SEEN_KEY then scheduled the hide timeout; StrictMode remount cleared the timeout and the re-run early-returned on SEEN_KEY → `show` stuck true → fixed black `z-[90]` overlay covered the whole page in dev. Hide timer moved to its own `[show]`-keyed effect. (Prod was never affected — StrictMode is dev-only — which is why build gates passed while dev looked black.)
Build: / 133kB, /services 132kB, /contact 220kB (pre-existing). Dev server port 3000 had a STALE node process (PID 9728, killed); dev now on 3001.
Resume: Step 2 (scroll reveals firing on load + easing speed).

### FO3 Step 2 — reveal-at-rest fix + faster easing (this commit)
Shipped:
- ScrollScrub + TurnSequence word opacity floor 0.15 → **0** (the "pre-faded-in" bug: faint text was visible before its reveal). Verified in-browser: words at opacity 0 below the fold, 1.0 by mid-viewport.
- ScrollScrub scrub band tightened: offset `['start 0.9','start 0.5']` (was 0.85/0.35 — reveal now completes by mid-viewport), per-word window 0.4 → 0.3.
- KineticHeadline: stagger 0.09 → 0.06, word duration 1.1s → 0.8s.
- whileInView durations trimmed: StudioMotion/StillBreak/ServicesClosing/ClosingBand 1.1 → 0.8s; FeaturedWork 1.0 → 0.8s; ClosingBand delays 0.5/0.7/0.9 → 0.3/0.45/0.6; SmoothReveal spring 80/20 → 120/22.
- Lenis lerp 0.12 → 0.16 (scroll-scrubbed reveals trailed the wheel).
Build: / 133kB, /services 132kB.
Resume: Step 3 (hero rebuild: WE BUILD cycler + mask reveal).

### FO3 Step 3 — hero rebuild (this commit)
Shipped in `src/components/furnace/home/Hero.tsx`:
- **Scroll mask reveal**: section is now `h-[180svh]` with a sticky `100svh` stage; the video wrapper carries `clip-path: ellipse(rx% ry% at 50% 55%)` via useMotionTemplate, opening 18/26% → 125% across the first 55% of section scroll. Verified in-browser: slit at rest, full bleed by ~50svh of scroll. Reduced motion: no mask, static min-h-[100svh] section.
- **WE BUILD cycler** promoted from ClosingBand's tiny WordSwitcher to a LARGE central hero element under the statement: `clamp(1.75rem,4vw,3.75rem) font-black`, cycling STRATEGY / BRAND SYSTEMS / IDENTITY / CAMPAIGNS / FILM every 2.4s, each phrase with its OWN metallic gradient variation (steel/champagne/platinum/ember-kissed/bone — all opaque, legible over darkest+brightest footage points), blur-to-sharp swap, no solid backing (hero text-vignette carries contrast). Reduced motion: static BRAND SYSTEMS. ClosingBand's small mono switcher retained as the closing echo.
- Statement "Taste is the moat." kept centered in grotesk metallic (step 1). Hero video vignette now lives INSIDE the masked wrapper so the scrim opens with the footage.
- Subline/eyebrow alpha bone/70 → bone/80 (step 5 pre-work).
Build: / 134kB (+1), /services 132kB.
Resume: Step 4 (clause-per-line audit).

### FO3 Step 4 — clause-per-line (this commit) + SESSION HANDOFF (rate limit)
Shipped:
- `ScrollScrub` now accepts `text: string | string[]` — array renders one clause per line (full-width rows, `justifyContent: inherit` inline so centered callers stay centered; string callers byte-identical). Reduced-motion branch renders `span.block` per line.
- THE STANDARD beat → `['One studio.', 'One bar.', 'No exceptions.']` — verified in-browser: three centered lines, scrub intact.
- Audit result: FiveGrid already clause-per-line; Intertext beats already `span.block`; all other furnace headings are single sentences; legal pages are numbered headings (fine). No other offenders found.
Build: / 134kB, /services 132kB. Verified in browser before commit.

## ⛔ SESSION ENDED HERE (user hit rate limit) — RESUME INSTRUCTIONS FOR NEXT MODEL
**Done this session (all committed, all build-gated, all browser-verified):**
- CLAUDE.md law (`1d9ec3d`) · Step 1 metallic glass type + Playfair retired + Loader StrictMode fix (`38df6a5`) · Step 2 reveals hidden at rest + faster easing (`3f1d8e1`) · Step 3 hero mask reveal + WE BUILD cycler (`17d9cbb`) · Step 4 clause-per-line (this commit).

**NEXT: work these in order (spec = the FINAL OVERHAUL master prompt, restated per step in the FO3 blocks above):**
1. **Step 5 — small-text legibility**: raise sublines/eyebrows/microcopy contrast site-wide (bone at higher alpha, subtle text-shadow or backing over media). Hero eyebrow/subline already bone/80.
2. **Step 6 — services image quality (URGENT per user)**: /services renders images extremely low-res. Diagnose source assets in /public/assets + /public/media vs next/image sizes/quality props in `PillarSection.tsx` (stills: cinematic-still-1.png, lone-figure-1.webp, split-frames-3.png) and StillBreak. Fix: quality={90}+, correct `sizes`, priority above fold; flag genuinely low-res sources in HANDOFF instead of upscaling.
3. **Step 7 — pending items**: service-block hover lift + specular + ember edge-glow; PaymentSheet aside → liquid-glass + QR on frosted panel (spec in "OVERHAUL 2 → Step 3"); Calendly inline embed on /contact (BROKEN: Contact.tsx ~line 471 calls window.Calendly with no script loaded — replace with lazy iframe `https://calendly.com/alchemylabs-work/30min?hide_gdpr_banner=1&background_color=0a0908&text_color=ede6dd&primary_color=ff4d1c`, verify end-to-end); Ash founder note (font-fraunces italic, signed "Ash") beside Contact form; `?pillar=` preselect re-verify; Eva uplift (src/views/EvaPortfolio.tsx ONLY, black/pink); /contact 220kB slimming attempt (dynamic-import supabase path).
4. **Step 8 — cohesion + copy** + FINAL GATES: grep playfair/font-serif = zero display uses (only comments remain, plus dead `src/components/Navigation.tsx` inline var(--font-fraunces) reference); `npm run build` all routes <150kB except /contact 220kB + /eva 178kB + /aashrith 189kB (documented legacy); frozen diff empty (`git diff --stat 7c31d8b..HEAD -- app/aashrith/page.tsx app/AashrithGadePortfolio/page.tsx src/views/AashrithPortfolio.tsx src/components/portfolio src/components/SequentianBackground.tsx src/components/SEOHead.tsx src/data/foundersData.ts src/data/portfolioProjects.ts`); final HANDOFF table.

**Environment for resume:** dev server: `npm run dev` (check port 3000 for stale PID first: `Get-NetTCPConnection -LocalPort 3000`). Loader wedge in dev = fixed. Chrome extension tab IDs go stale — call tabs_context_mcp fresh. The "1 error" Next dev overlay badge = Chrome-extension false positive. Build gate = stop dev first (shared .next). Skills to load: design-taste-frontend, high-end-visual-design, frontend-design (user directive; user's locked direction wins conflicts — Fraunces allowed for pull-quotes, centered hero stays).

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

### OVERHAUL 2 (2026-07-13, master prompt) — plan at C:\Users\aashr\.claude\plans\fluttering-forging-neumann.md
Steps 0-8: style guide → Fraunces/Lenis/glass-legibility → hero mask reveal → landing → services → contact (Calendly fix) → cohesion → Eva → polish. Session rules: commit per step, build gate per step, 95%-usage stop rule, frozen Aashrith verified at start (FROZEN-CLEAN). **READ THE PLAN FILE FIRST — it has the full per-step spec and the frozen-isolation decisions.**

**SKILLS TO LOAD AT NEXT SESSION START (user directive, applies to all work):** `design-taste-frontend`, `high-end-visual-design`, `shadcn`, `ui-ux-pro-max`, `frontend-design:frontend-design`. Conflict rule stands: user's locked direction wins over skill defaults (Fraunces is user-named, so the taste-skill's Fraunces ban is overridden; centered hero stays; ember palette stays).

- [x] **Step 0 — DONE** (commit `83025bd`): style-guide.md at repo root (Fraunces display clamp(3rem,7vw,7rem), Geist body/mono, token hexes, 16-20px radii, 8px grid, glass spec ≥0.85 alpha floor, .text-vignette spec, copy standard). NOTE: Tailwind key for Fraunces is `font-fraunces`, NOT `font-display` (that's a legacy Geist alias the FROZEN portfolio uses — never repoint it; `elegant` repointed to literal 'Playfair Display' for legacy routes).
- [x] **Step 1 — DONE** (commit `23986d9` + halo fix in this commit): lenis installed; `src/components/LenisProvider.tsx` (autoRaf:false, driven by framer useAnimationFrame, skipped under reduced-motion) mounted in Providers.tsx; Fraunces via next/font/google (axes:['opsz'], italic) replaces Playfair_Display in app/layout.tsx; `.glass-type` floor raised to 0.98/0.87/0.95; `.text-vignette` utility added + applied in Hero and TurnSequence (between media and halo); all `font-playfair` swapped to `font-fraunces` italic (Intertext, StillBreak, StudioMotion, ClosingBand, ServicesClosing, ContactPage); type scale swapped everywhere (hero + ServicesHero + Contact h1 → clamp(3rem,7vw,7rem) font-semibold leading-[1.05] tracking-[-0.02em]; section heads → clamp(2rem,4vw,3.5rem); TurnSequence lines → clamp(2.5rem,6vw,5.5rem)). Build clean: / 133kB, /services 132kB, /contact 220kB (pre-existing), shared 87.9kB.
- [x] **Halo mask fix** (uncommitted at interrupt, in THIS commit): `.glass-halo` mask radii tightened to `radial-gradient(55% 60% at 50% 50%, black 22%, transparent 68%)` — the old 60%/68% radii put the transparent stop past the element bounds, so halo edges read as a faint rectangle over bright fields (visible on the hero). **VERIFICATION STILL OWED**: browser-check hero + red-wings TurnSequence frame after this fix (step 1.6 of the plan). Hero was verified pre-fix (Fraunces renders, legibility strong); the post-fix screenshot was interrupted.

**PENDING (steps 2-8, in order — full spec in the plan file):**
- [ ] **Step 2 — hero SVG-mask reveal**: Hero.tsx → ~180svh section, sticky 100svh stage, video clip-path `ellipse(rx% ry% at 50% 55%)` via useMotionTemplate, slit→full-bleed over first ~60% of scroll; reduced-motion = no mask. Rebase exitScrim/parallax onto new container. Commit `overhaul2: step 2 — hero mask reveal`.
- [ ] **Step 3 — landing**: bento anchor scroll-tilt ≤6deg; hover lift + ember edge-glow + sheen on cards; pillar copy rewrite (outcome-led); TheFive hover lift; PaymentSheet aside → liquid-glass spec + QR box `liquid-glass rounded-2xl` (QR ink already bone-on-transparent); +2-3 intertext beats ("Machines draft. We decide." / "Permanence is the brief.").
- [ ] **Step 4 — services**: numerals → font-fraunces; offer-stack stagger; rewrite offer lines + descriptions outcome-led in pillars.ts; catalogue stays locked.
- [ ] **Step 5 — contact**: Calendly is BROKEN (Contact.tsx:471 calls window.Calendly?.initPopupWidget but NO Calendly script is loaded anywhere — silently no-ops). Fix: lazy inline iframe embed `https://calendly.com/alchemylabs-work/30min?hide_gdpr_banner=1&background_color=0a0908&text_color=ede6dd&primary_color=ff4d1c` gated by useInView/click, keep <a> fallback, VERIFY end-to-end in browser and log here. Ash personal note (font-fraunces italic, signed Ash) beside form. Keep Turnstile+Supabase logic byte-identical. Try dynamic-import of supabase submit path for the 220kB overage.
- [ ] **Step 6 — cohesion**: nav restrained-luxury refinement; clause-per-line audit site-wide; radii audit to 16-20px scale; footer typography; exclude frozen paths.
- [ ] **Step 7 — Eva**: src/views/EvaPortfolio.tsx ONLY, black/pink identity, no Fraunces/ember/Geist imports.
- [ ] **Step 8 — polish**: scroll-progress bar (ember, scaleX via useScroll), LayoutTransition refinement, hover micro-interactions, border-t sweep, final bundle table.
- [ ] **Final**: frozen diff empty check (`git diff --stat 7c31d8b..HEAD -- <frozen paths>`), reduced-motion spot check, HANDOFF final table.

**Environment notes for resume**: dev server NOT running (killed for build gate; restart with `npm run dev` in background). Chrome extension tab was 405026697 (stale next session — call tabs_context_mcp fresh). Lenis runtime behavior NOT yet verified in browser (check `<html class="lenis">` appears and scroll feels smooth). The "1 error" Next dev overlay badge is a Chrome-extension false positive (React #299), not app code.

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

## 2026-07-14 — graphify audit: dead-code sweep
Graph flagged 3 weak "reveal variant" communities + isolated Navigation node. Verified zero importers and deleted: `src/components/Navigation.tsx`, `src/components/WordReveal.tsx`, `src/components/ScrollTextReveal.tsx`, `src/components/ScrollRevealText.tsx` (AashrithPortfolio uses its own local WordRevealQuote — frozen paths untouched). Graph's `WordSwitcher()→t()` INFERRED edge verified spurious. Build clean, homepage 134kB.

## 2026-07-14 — overhaul3 phases 1-7 (StringTune consistency pass)
**Shipped this session** (commits `f9e1797`..this):
- P1 type: all H1/H2 → Geist black (H1 clamp(3rem,7vw,7rem) -0.04em; H2 clamp(2rem,4vw,3.5rem) -0.03em); Fraunces = italic pull-quotes + founder note ONLY. Law updated in CLAUDE.md + style-guide.md. Fraunces stays next/font/google (self-hosts at build — functionally identical to next/font/local; deliberate deviation, zero visual delta).
- P2 glass: FiveGrid cards + PaymentSheet onto GlassPanel/.liquid-glass; contact panel radius 24→16px; GlassPanel inner div h-full (grid-stretch fix). @paper-design/shaders-react PINNED 0.0.77; GlassFluted prototype on services PillarSection ONLY (+1kB first-load, 252kB raw lazy chunk). VERDICT: no further rollout — FlutedGlass cannot sample the real backdrop (WebGL limitation), HomeAtmosphere idea dead by the bundle criterion.
- P3 scrub: blur floor 12px unified (TurnSequence 10→12 `TurnSequence.tsx:41`, Intertext 14→12 `Intertext.tsx:28`); easing [0.16,1,0.3,1] verified everywhere; sanctioned outliers: Loader curtain eases (one-shot page load), KineticHeadline entrance (heroes have no scroll travel).
- P4/P5 hero: WE BUILD cycler = dominant stacked lockup clamp(2.5rem,8vw,8rem); all words render into one grid cell → zero reflow mid-swap (root cause of off-center jump was AnimatePresence hole). "Taste is the moat." demoted to kicker (also fixes 1440 mid-phrase wrap).
- P6 media: quality={90} on pillar stills + StillBreak + ServicesHero. **REPLACEMENTS NEEDED (do not upscale):** `public/media/b2-bomber-3.webp` (1600x896/21KB, full-bleed hero → need ≥2560x1440), `public/media/split-frames-1.webp` (1600x896/19KB, full-bleed StillBreak → need ≥2560x1440). Marginal at DPR2: cinematic-still-1.png (816px tall), lone-figure-1.webp (896px tall) → ideal 1200x1600 portrait re-crops.
- P7: Calendly FIXED end-to-end (`Contact.tsx` — window.Calendly popup was never loaded; now lazy iframe modal, booking calendar verified in browser). Supabase → dynamic import in submit handler: **/contact 220kB → 171kB**. Founder note (Fraunces italic, "— Ash, Founder") in Contact left column. ?pillar= preselect verified live (ai→Fast·24h). --ash #8A8178→#9A9186 (legibility). Hover lift+ember glow on FiveGrid + TheFive cards.
- Aceternity (user-directed): ui/3d-card.tsx (**unwired**, demo at src/components/3d-card-demo.tsx — no call site yet), TextHoverEffect "ALCHEMY" in ClosingBand (tokenized, framer-motion, no `motion` dep). Stale bun.lock deleted (was breaking shadcn CLI + last playfair residue).

**Deferred (exact locations):**
- Eva uplift: `src/views/EvaPortfolio.tsx` (whole file) — black/pink identity pass not started.
- 380/768px screenshot passes: BLOCKED — Chrome window is maximized/snap-managed and ignores resize_window; DevTools can't be opened via injected keys. Un-maximize Chrome and rerun. Desktop 1440 verified with screenshots in-session.
- /contact remaining 21kB over 150 budget (was 70 over) — next candidate: framer `motion` full import in legacy Contact.tsx → `m` + LazyMotion.
- 3d-card integration: user has not named a target section.

**Verification protocol note:** all desktop claims above have in-session screenshots (hero swap x2 frames, services pillars/FiveGrid/PaymentSheet, contact preselect+founder note+Calendly calendar).
