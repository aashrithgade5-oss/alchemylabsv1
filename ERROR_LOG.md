# Ship Audit — Error Log

Full-site audit, 2026-09-12. Baseline commit `b07fa1d`.
Method: import-graph reachability (`scripts/reach.js`), `tsc --noEmit`, `next build`,
and computed-style inspection in a real Chrome against the **production** build
(`npm start`), every public route.

Severity: **S1** breaks behaviour · **S2** visible/law violation · **S3** weight & hygiene

---

## S1 — Functional

### E-01 · Lenis desynced from the router's scroll reset
`src/components/LayoutTransition.tsx` · `src/components/LenisProvider.tsx`

`ScrollRestoration` called `window.scrollTo({top:0})` on every pathname change.
Lenis owns the scroll position and keeps its own `animatedScroll` / `targetScroll`;
a native scroll call never updates that internal state. The next wheel tick
therefore animated from the **previous** page's offset and yanked the new page
back down.

*Proof of mechanism:* with Lenis running, `window.scrollTo(0, 2000)` was reverted
to `0` within ~1s — native scroll calls do not stick. The same override applied to
the router's `scrollTo(0)` against a stale offset of 2000.

**Fix** — `LenisProvider` now exports `resetScroll()`, which drives the live
instance via `lenis.scrollTo(0, { immediate: true, force: true })` and falls back
to `window.scrollTo` when Lenis is absent (reduced-motion, pre-mount).

**Verified** — scroll to 2000 → client-nav to `/work` → `scrollY 0` → wheel tick →
still `0`. PASS.

---

## S2 — Visible / type-law violations

### E-02 · Retired Geist Sans was the site-wide default for body text *and every heading*
`src/index.css` (base layer) — **root cause of the reported font inconsistency**

```css
--font-body: var(--font-geist-sans), …;      /* body { font-family: var(--font-body) } */
h1,h2,h3,h4,h5,h6 { font-family: var(--font-display); }   /* → Geist Sans */
```

Any element that set no explicit font class rendered in the **retired** face.
9 such elements on the homepage alone, including the footer tagline and the whole
footer nav — sitting inches from correctly-set Inter and Playfair.

Compounding it: Tailwind's `font-body` key resolved to **Inter** while the CSS var
`--font-body` resolved to **Geist** — two different fonts behind one name. The
utility layer always won, so the var's only surviving effect was this leak.

**Fix** — `--font-body` → Inter; base `h1–h6` → Inter. `--font-display` left
pointing at Geist: it is the frozen alias the Aashrith portfolio depends on.

**Safety, measured before changing shared CSS** — the frozen portfolio reaches
Geist through **28 explicit `.font-display` elements**; only **2** ("·" separators)
ever used the base rule. Post-fix audit confirms it still renders exactly 28.

**Side benefit** — Geist Sans is now reported `unloaded` on Furnace routes: the
retired face is no longer downloaded at all.

### E-03 · Synthesized (fake) italics across every legacy route
25 usages of `font-display italic` / bare `italic`. **Geist Sans ships no true
italic**, so the browser synthesized an oblique by shearing the upright — the
cheap slant that read as "inconsistent" beside real Playfair italic.

**Fix**, following CLAUDE.md's non-negotiable *"never on any H1/H2"*:

| Role | Face |
|---|---|
| H1–H3 headings | Inter — italic dropped, emphasis carried by colour |
| Taglines, pull-quotes, inline prose emphasis | **real Playfair Display Italic** |

This is exactly the split the compliant Furnace routes already used; the legacy
routes now match them.

**Verified** — **0** synthesized italics across all 9 public routes.

### E-04 · Playfair could silently render bold
`app/layout.tsx` loaded Playfair across the full 400–900 variable axis. The
2026-07-18 relock is *REGULAR, **not** bold* — any inherited `font-bold` would
have quietly rendered 700 and reverted the lock again.

**Fix** — pinned `weight: '400'`, making the revert structurally impossible and
dropping the unused axis from the download.
**Verified** — loaded face is `__Playfair_Display | italic | 400 | loaded`.

### E-05 · Dynamic routes had no metadata
`/services/[slug]` and `/journal/[slug]` exported no `generateMetadata`, so all
5 services and all 6 journal posts shared one generic title and one OG card —
every shared link previewed identically.

**Root cause of the related prerender failure:** `export default ClientComponent`
— a bare re-export of a `'use client'` binding makes Next treat the whole route
as client-rendered and **skip `generateStaticParams` entirely**. Wrapping it in a
real server component fixed both.

**Fix** — `generateMetadata` + `generateStaticParams` on both routes; `postsData`
extracted to `src/data/journalPosts.ts` so the server route can read titles.
**Verified** — real per-page titles/descriptions in the server HTML; static pages
**17 → 28**, both routes now `●` (SSG) with every slug prerendered.

### E-11 · Five static routes had no page title
`/about`, `/contact`, `/journal`, `/privacy`, `/terms` exported no `metadata`, so
each rendered the generic site title in the browser tab, in search results, and
on every shared link. Only `/work` and `/services` had it.

**Fix** — `metadata` added to all five, following the existing `app/work/page.tsx`
pattern, plus `alternates.canonical` on every route including the two that
already had titles.
**Verified** — all 10 checked routes now return a unique `<title>` and a
canonical URL.

---

## S3 — Weight & hygiene

### E-06 · `/contact` pulled the entire legacy Footer to read one object
`Contact.tsx` imported `socialLinks` from `components/Footer.tsx`, dragging a full
React component — with a non-lazy `motion` import — into the route.
**Fix** — extracted to `src/data/socialLinks.ts`. `Footer.tsx` then had zero
consumers and was deleted.

### E-07 · `PageAtmosphereContext` defeated LazyMotion sitewide
It mounts on **every** route via `Providers`, yet imported the full `motion` for a
single opacity fade — directly contradicting the comment in `Providers.tsx` about
keeping the full renderer out of First Load JS.
**Fix** — `motion` → `m`.
**Honest result** — the shared chunk stayed **88 kB**: other live files still
import full `motion`, so this is a correctness fix, **not** a measured saving.

### E-08 · Dead `@fontsource/jetbrains-mono`
`@import` at the top of `index.css` declared a face with **zero** references
anywhere (the mono face is Geist Mono per the type law). Import removed,
dependency uninstalled.

### E-09 · 27 dead components, unreachable from any route
Several carried the E-03 violations, so they were live landmines for a future
revert. Each verified to have zero external references before deletion.

### E-10 · Dead `.section-number` CSS rule
Unused, and specified faux-italic Geist. Removed.

---

## Verification status

| Check | Result |
|---|---|
| `tsc --noEmit` | clean |
| `next build` | clean, 28/28 static pages |
| Frozen-portfolio diff vs `7c31d8b` | **empty** |
| Frozen portfolio Geist element count | **28** — unchanged |
| Geist-as-display outside frozen routes | 0 |
| Synthesized italics, 9 public routes | 0 |
| `fraunces` / `font-serif` | 0 |
| GSAP / Three.js / Locomotive | 0 |
| Site-origin console errors | **0** (all observed errors came from a Chrome extension) |

---

## Known and accepted — NOT fixed

These are deliberate calls, not oversights.

1. **First Load JS over the 150 kB law**
   `/about` 153 kB · `/journal` 154 kB (3–4 kB over) · `/contact` 171 kB
   (pre-existing and documented in CLAUDE.md, down from 220 kB).
   `/admin` 212 kB and `/admin/auth` 204 kB are auth-gated internal tooling.
   `/aashrith` 190 kB and `/eva` 178 kB are frozen and exempt.
   Cutting the remaining 3–4 kB means converting the live `motion` imports to `m`
   across `About.tsx`, `ScrollReveal`, `MagneticButton` and `LazySection` — real
   work with real regression risk, not worth doing blind on a ship day.

2. **`EvaPortfolio.tsx` and the admin views keep the legacy palette.**
   Eva's portfolio deliberately mirrors the **frozen** Aashrith one. Restyling
   only Eva's would *create* a new inconsistency between the paired founder
   pages, so both stay as they are. Admin is internal tooling behind auth.
   (Both did have Geist retired from their headings — only the palette remains.)

3. **`/journal`, `/privacy`, `/terms` still use the legacy palette**
   (`porcelain` / `alchemy-red`) rather than the Furnace tokens
   (`bone` / `void` / `ember`). Typography is now fully compliant; the colour
   migration is a separate, visual-review-worthy pass.

4. **45 unused `src/components/ui/*` (shadcn) files kept.** Never imported, so
   never bundled — deleting them is churn with no user-visible benefit.

5. `src/test/*` and `src/vite-env.d.ts` are Vite-era leftovers; `vitest` is not
   installed, so `npm run test` currently cannot run.

---

## Required action before going live on Vercel

### 1. Set `NEXT_PUBLIC_SITE_URL` — one setting, do not skip

Every canonical URL and both OG/Twitter image URLs resolve against
`metadataBase`. It used to be a hardcoded Lovable preview domain; it is now:

```ts
metadataBase: new URL(
  process.env.NEXT_PUBLIC_SITE_URL ?? 'https://alchemylabsv1.lovable.app',
)
```

Add `NEXT_PUBLIC_SITE_URL=https://<production-domain>` to the Vercel project's
environment variables **before** the first deploy. Without it the live site's
canonicals and social cards still point at the old preview host — a build cannot
catch this.

### 2. Lower stakes, still placeholders
- `upiVpa` in `lib/payments.ts` is still `alchemylabs@upi`.
- `checkoutUrl` is `null` for all five products, so checkout is not live.

### 3. Deploy is not authorised
Per CLAUDE.md this repo is localhost-only. Deployment happens solely on the exact
phrase *"yes, upload it to Vercel and make this live."* Nothing in this audit
touched Vercel.
