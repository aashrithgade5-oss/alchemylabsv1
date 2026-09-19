# Alchemy Labs — Consolidated Overhaul Plan (2026-09-19)

Sources: Gemini "$10M master" + ChatGPT "2026 master upgrade" audits, CLAUDE.md build law,
Pinterest reference pass, live frame-by-frame audit at 375 / 1440.

## Where the two audits conflict — resolution
| Gemini says | ChatGPT says | Decision | Why |
|---|---|---|---|
| Install GSAP, Three.js, R3F | No GSAP/Three; Framer + native | **No GSAP/Three** | CLAUDE.md ban; 150kB JS budget; restraint |
| WebGL film grain | Avoid continuous canvases | **Static SVG-noise grain via CSS** | Same look, zero runtime |
| Magnetic "View Project" cursor | No custom cursor | **No custom cursor** | CLAUDE.md ban; a11y |
| Generate 3 Veo videos + 4 stills up front | Reuse first; one concept per real need | **Reuse first** | Library already matches the references |
| Tech marquee (Claude, Midjourney…) | Marquee only for real rhythm | **Capabilities marquee, pausable** | Truthful, no logos |
| "Lighthouse 100" | Measured targets, evidence | **LCP<2.5s, CLS<0.1, INP<200ms, measured** | Honest |
Agreed by both: Zod + server-side form path, rate limiting, security headers, env isolation, SEO metadata.

## Art direction (from Pinterest pass)
- Black silhouette on ONE crimson field, long-exposure / temporal blur, zero surface detail.
- Liquid glass = material (obsidian folds, one thin specular edge), never glass UI cards everywhere.
- Huge negative space, tiny mono labels, Playfair regular for motion text, Inter for fixed headlines.
- Rejected: literal/fantasy AI subjects (feathers, glowing armor), rainbow/aurora sweeps, RGB split, blobs.

## Execution order (one commit each, localhost only — no deploy)
1. **Hero** — owned samurai-silhouette-2 footage full-bleed; scroll depth (plate slow, type fast),
   progressive edge blur, grain; Playfair cycler; no ring/blob. Clean at 375 + 1440.
2. **Scroll typography** — Playfair regular ghost-outline reveal everywhere (done: TurnSequence,
   ScrubBeat); seam between hero and TurnSequence removed.
3. **Home sections** — Pillars grid rebuild, Selected work enlarge + truth labels, Five edge fades,
   footer wordmark, strip aurora/spectrum/meteor noise.
4. **Higgsfield** — only for gaps: obsidian liquid-glass section material; logged in docs/ASSET_LEDGER.md.
5. **Every other route** — /work /services /services/[slug] /about /journal /contact /privacy /terms:
   same frame audit + fixes; honest concept labels (Oakley/Dior = concept).
6. **Forms & security** — contact via server route: Zod, honeypot, Turnstile server verify,
   rate limit; remove anon direct inserts; security headers in next.config.
7. **Cookie consent** — accept / reject, no optional scripts before consent.
8. **SEO/perf/a11y** — robots, sitemap, metadata audit, media re-encode, reduced-motion pass, 404.
9. **QA** — build, lint, tests, route + viewport matrix; docs/QA_REPORT.md.

## Human-only items (cannot be done by Claude)
Real UPI VPA, card checkout URLs, domain + DNS, founder portraits, client permissions for
brand names, Resend sender domain, Turnstile/Supabase production secrets, legal review,
deploy authorization (exact phrase in CLAUDE.md).
