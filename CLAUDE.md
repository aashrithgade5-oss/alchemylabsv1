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
- EMPHASIS RELOCK (2026-09-19, user): every display/scroll/interlude line is Inter
  BOLD (sentence case, not ALL CAPS) with `.glass-type`; ONE emphasis word per line in
  Playfair italic regular, lowercase (e.g. "judgment", "one"). Never whole sentences in
  Playfair. Gradients on type must flow slowly and continuously, never flash.
- NO UNVERIFIABLE CLAIMS: no "most selling", scarcity counters, or guaranteed reply times.
- SCRIPT EXCEPTION (user, 2026-09-27 Patches-1): the single word "Build" in the hero
  lockup is **Pinyon Script** (`font-script`, `--font-script`). Scoped to that one word;
  never reuse it elsewhere. Playfair italic remains the only italic.
- NO PRINTED PRICES (user, 2026-09-27 Patches-1): no exact price anywhere on the site.
  The five productized offers may show only `fromLabel()` ("From ₹X") from `lib/payments.ts`;
  every CTA is "Book a call" / "Text us for a rough estimate". UPI carries no amount
  (client enters the agreed figure). UPI ID lives in `lib/payments.ts` (`upiVpa`).
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
- Opening sequence = server-rendered `Preloader.tsx` gated by `html[data-pl]` (run/out/done/skip).
  Never reintroduce a client-only loader (it mounted after hydration and never showed on Safari).
- WebKit law: never put `filter`/animated blur on the SAME element as `background-clip:text`
  (wrap it); never use `background-attachment: fixed` with clipped text. Inline `<style>` must use
  `dangerouslySetInnerHTML` (text children with `>` break hydration).
- Framer Motion + Lenis (feel only). BANNED: GSAP, Three.js, Locomotive. No custom cursor.
- Scroll reveals start hidden at rest (opacity 0 / blur) and animate only on viewport entry.
- Never animate `filter` on an ancestor of a `mix-blend-*` element.
- No backdrop-filter inside scrolling containers (use `.glass-solid`).

## BUDGET
- < 150kB First Load JS per route (`/contact` 220kB is a documented pre-existing overage
  with a pending slimming item — do not make it worse).
- `npm run build` after every item. Dev server and build share `.next` — stop dev first.

## UNFROZEN 2026-09-19 by owner for the portfolio overhaul (AashrithPortfolio.tsx,
## src/components/portfolio/*). Preserve its identity: light/dark toggle, section order,
## voice, ventures. The --font-display alias rule still stands.
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

## BACKEND (Patches-2, 2026-09-27)
- Forms post to our own route handlers (`app/api/brief`, `app/api/newsletter`) -> `lib/server/notify.ts`
  (Resend > Gmail SMTP > FormSubmit) to aashrithgade5@ + alchemylabs.work@. Never reintroduce a
  browser-side captcha that can block real clients. A failed delivery must surface, never fake success
  (bots excepted).
- Private vault = `/alchemy-vault`, auth in `middleware.ts` + `lib/vault-session.ts` (env creds, HMAC
  cookie). Never link it, never list it in robots/sitemap. `/admin` stays 404.
- Secrets live in `.env.local` (gitignored) and Vercel env. Never commit them. See docs/OPERATIONS.md.

## DEPLOY
- LOCALHOST ONLY. Never deploy, never touch Vercel. Deploy trigger is only the exact
  user phrase "yes, upload it to Vercel and make this live."

## PROTOCOL
- Commit after every work item; append HANDOFF.md each time.
- Every commit leaves a clean, working, resumable state.
