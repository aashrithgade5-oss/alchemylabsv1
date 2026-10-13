# Award Playbook — building an Awwwards-level Alchemy Labs with Claude Code

Research date: 2026-10-13. Scope: web research only. Every non-obvious claim is linked. Where a source
is a third-party blog rather than an official page, it is marked *(3p)*. House law in `CLAUDE.md` and
`style-guide.md` overrides anything here (GSAP / Three.js stay banned; one WebGL moment per viewport).

---

## 1. How the AI-assisted build loop works (2025–2026)

**What judges score.** Awwwards weights Design 40%, Usability 30%, Creativity 20%, Content 10%, and
performance and responsiveness are judged inside Usability
([managed-code (3p)](https://managed-code.com/blog-post/can-ai-design-award-winning-website-site-of-the-day-2026),
[hontran.dev (3p)](https://www.hontran.dev/blog/awwwards-judging-criteria),
[utsubo (3p)](https://www.utsubo.com/blog/award-winning-website-design-guide)). Fewer than 365 of ~15,000
yearly submissions win SOTD, and the gap AI leaves open is custom interaction design
([managed-code (3p)](https://managed-code.com/blog-post/can-ai-design-award-winning-website-site-of-the-day-2026)).
None of the sources found shows a site built by AI alone winning SOTD. Claude speeds up the build;
the art direction still comes from people.

**The working loop, built on Anthropic's own guidance:**

1. **Research → spec.** Explore, then plan, then code, using plan mode. For large features, have
   Claude interview you and write `SPEC.md`, then implement in a fresh session
   ([Claude Code best practices](https://code.claude.com/docs/en/best-practices)).
2. **Moodboard → tokens first.** Write the design system before prompting for UI, so the model is not
   guessing the type scale, palette or spacing on every pass
   ([MindStudio (3p)](https://www.mindstudio.ai/blog/claude-design-token-management-guide)). One
   practitioner keeps the tokens as a markdown table in the repo, with a usage note on each
   ([mejba (3p)](https://www.mejba.me/ai-design-system-workflow-claude-figma)). Anthropic's
   frontend-design skill also starts with a "compact token plan" made of 4–6 named hex colours and
   one or two distinct type families
   ([SKILL.md](https://github.com/anthropics/claude-code/blob/main/plugins/frontend-design/skills/frontend-design/SKILL.md)).
3. **Build with one bold move.** "A single orchestrated moment — one page-load sequence or one reveal —
   lands better than scattered effects"; "Spend your boldness in one place." The skill also says to
   avoid fade-and-slide-up on every section and hover effects on every card
   ([SKILL.md](https://github.com/anthropics/claude-code/blob/main/plugins/frontend-design/skills/frontend-design/SKILL.md)).
4. **Verify visually, every time.** "Give Claude a check it can run: tests, a build, a screenshot to
   compare." For UI work, paste the design, have Claude screenshot the result, list the differences and
   fix them. Gate the end of a turn with a Stop hook or `/goal`, and have the reviewer be a fresh
   subagent rather than the agent that wrote the code
   ([best practices](https://code.claude.com/docs/en/best-practices)).
5. **QA against budgets.** Core Web Vitals "good" at the 75th percentile means LCP ≤ 2.5 s,
   INP ≤ 200 ms and CLS ≤ 0.1
   ([web.dev](https://web.dev/articles/defining-core-web-vitals-thresholds)). Community Awwwards skills
   add targets of under 3 s to load, 60 fps, and animating only `transform` and `opacity`
   ([claude-skill-awwwards](https://github.com/tponscr-debug/claude-skill-awwwards)).

Keep `CLAUDE.md` short. Rules lost in a long file get ignored, so move deterministic laws into hooks
([best practices](https://code.claude.com/docs/en/best-practices)).

---

## 2. Skills, subagents, plugins and MCP servers

File locations: skills go in `.claude/skills/<name>/SKILL.md` (project) or `~/.claude/skills/`
(personal) ([docs](https://code.claude.com/docs/en/skills)). Subagents go in `.claude/agents/*.md` or
`~/.claude/agents/`, with `name` and `description` required in the frontmatter
([docs](https://code.claude.com/docs/en/sub-agents)). The official marketplace is
`claude-plugins-official`: `/plugin install <name>@claude-plugins-official`
([repo](https://github.com/anthropics/claude-plugins-official)).

| Tool | What it does | Install |
|---|---|---|
| **frontend-design** (Anthropic) | Art-direction skill against generic "AI slop": token plan, typography, a single motion moment, quality floor (focus, reduced motion, contrast) ([source](https://github.com/anthropics/claude-code/tree/main/plugins/frontend-design)) | `/plugin install frontend-design@claude-plugins-official` (listed in [plugins/](https://github.com/anthropics/claude-plugins-official/tree/main/plugins)) |
| **anthropics/skills** (webapp-testing, theme-factory, brand-guidelines, web-artifacts-builder) | webapp-testing drives a local app with Python Playwright, using `scripts/with_server.py` to start the dev server and capture screenshots and console logs ([SKILL.md](https://github.com/anthropics/skills/blob/main/skills/webapp-testing/SKILL.md)) | `/plugin marketplace add anthropics/skills` then `/plugin install example-skills@anthropic-agent-skills` ([repo](https://github.com/anthropics/skills)) |
| **Playwright MCP** (Microsoft) | Real browser for the agent: navigate, click, screenshot, set viewport | `claude mcp add playwright npx @playwright/mcp@latest` ([playwright.dev](https://playwright.dev/mcp/clients/claude-code)), or `/plugin install playwright@claude-plugins-official` ([external_plugins](https://github.com/anthropics/claude-plugins-official/tree/main/external_plugins)) |
| **Chrome DevTools MCP** (Google) | `performance_start_trace` / `performance_analyze_insight`, `lighthouse_audit` (a11y, SEO and best practices; no performance score), `emulate` (CPU and network throttling, mobile/touch viewport), console and network ([tool reference](https://github.com/ChromeDevTools/chrome-devtools-mcp/blob/main/docs/tool-reference.md)) | `claude mcp add chrome-devtools --scope user npx chrome-devtools-mcp@latest` ([client config](https://github.com/ChromeDevTools/chrome-devtools-mcp/blob/main/docs/client-configurations.md)) |
| **Figma MCP** (remote) | Reads frames, variables and components into code | `claude plugin install figma@claude-plugins-official`, or `claude mcp add --transport http figma https://mcp.figma.com/mcp`, then `/mcp` → Authenticate ([Figma dev docs](https://developers.figma.com/docs/figma-mcp-server/remote-server-installation)) |
| **Vercel agent-skills** | `web-design-guidelines` (100+ a11y/UX/perf rules, reported as file:line), `react-best-practices` (Next.js perf rules ranked by impact), `react-view-transitions` ([repo](https://github.com/vercel-labs/agent-skills)) | `npx skills add vercel-labs/agent-skills` (single skill: `--skill web-design-guidelines`) |
| **Impeccable** (Paul Bakaus) | `/impeccable critique`, `audit`, `polish`, `harden`, `typeset`, `animate`, `quieter`; `pin` creates standalone `/audit` and `/polish` shortcuts ([repo](https://github.com/pbakaus/impeccable)) | `/plugin marketplace add pbakaus/impeccable` → `/plugin`, or `npx impeccable install`, then `/impeccable init` |
| **VoltAgent subagents** (community) | `ui-designer`, `frontend-developer` (core-dev); `accessibility-tester`, `performance-engineer`, `ui-ux-tester`, `qa-expert` (qa-sec); `nextjs-developer` (lang). Not audited by the maintainers ([repo](https://github.com/VoltAgent/awesome-claude-code-subagents)) | `claude plugin marketplace add VoltAgent/awesome-claude-code-subagents` then `claude plugin install voltagent-qa-sec` (also `voltagent-core-dev`, `voltagent-lang`) |
| **claude-skill-awwwards** (community) | `/awwwards` creative-director skill with references for type, colour, motion, CSS and WebGL ([repo](https://github.com/tponscr-debug/claude-skill-awwwards)) | `git clone https://github.com/tponscr-debug/claude-skill-awwwards ~/.claude/skills/awwwards` |

**Conflict warning.** frontend-design discourages all-caps eyebrows, monospace data labels and
single-word headline accents
([SKILL.md](https://github.com/anthropics/claude-code/blob/main/plugins/frontend-design/skills/frontend-design/SKILL.md)).
Alchemy's law requires Geist Mono eyebrows and exactly one Playfair italic emphasis word per line.
Load the skill for its process and quality floor only, and tell it that `style-guide.md` wins.

---

## 3. Award patterns relevant to a dark luxury studio

- **Lando Norris — OFF+BRAND.** Awwwards Site of the Year 2025 and Users' Choice
  ([Awwwards winners](https://www.awwwards.com/annual-awards/winners),
  [OFF+BRAND case](https://www.itsoffbrand.com/our-work/lando-norris)). Cursor-reactive fluid overlays
  on the hero, a strict four-colour palette with one neon accent taken from the helmet, and a modular
  "On Track / Off Track" structure
  ([DesignRush](https://designrush.com/best-designs/websites/lando-norris-website-design)). Takeaway:
  a single accent drawn from the brand object. For Alchemy that is ember from the atom.
- **Messenger — abeto.** Developer Site of the Year 2025
  ([Awwwards listing](https://www.awwwards.com/websites/%23EF2737/?page=7)). The developer jury rewards
  engineering craft separately from visual design.
- **Fluid Glass — Exo Ape.** SOTD, 30 Mar 2026, scored 7.77 (Design 7.96)
  ([Awwwards](https://www.awwwards.com/sites/fluid-glass)). Generous space with technical typography,
  high-contrast material-led layouts, and a navigation with no click (the menu expands at the end of
  the page). Stack: Nuxt, Storyblok, Vercel; GSAP for scroll, so treat it as a visual reference only.
- **Igloo Inc.** Site of the Year 2024. Only three sections, kept alive by interactive elements and a
  camera move into particles in the footer
  ([case study](https://awwwards.com/igloo-inc-case-study.html)). Takeaway: fewer sections, each one
  deeper.
- **Luxury SOTDs, autumn 2026.** Odyssée (NIGHTJAR, 8 Oct), Tengile Malamala Collection (3 Oct) and
  Sobha Privy Collection (23 Sep) ([Awwwards luxury](https://www.awwwards.com/websites/luxury/)). Use
  these for current luxury pacing benchmarks.
- **Liquid glass, done properly.** Aave says its "Aave Glass" runs in every modern browser, desktop and
  mobile, with no flags, after working through a string of Safari problems
  ([Aave Design](https://aave.com/design/building-glass-for-the-web)). The common SVG
  `feDisplacementMap` approach only refracts in Chromium. Safari and Firefox fall back to plain frost
  ([Frontend Masters](https://frontendmasters.com/blog/liquid-glass-on-the-web/)). Contrast is the
  main criticism of the look, so check text over glass with a WCAG checker (same source).
- **Liquid metal.** Paper's LiquidMetal applies a material to an uploaded logo or a preset shape. The
  package is versioned 0.0.x and ships breaking changes, so pin the version
  ([Paper Shaders](https://shaders.paper.design/liquid-metal)).

I could not verify a 2025–2026 SOTD whose headline effect is chrome or liquid-metal type, or a recent
CSSDA or FWA Website of the Year (searches came back empty). Do not claim that precedent in a pitch.

---

## 4. Mobile quality bar (iOS Safari)

- **Viewport units.** `svh` is the viewport with the browser UI expanded, `lvh` with it retracted, and
  `dvh` changes live between them. Supported since Safari 15.4
  ([web.dev](https://web.dev/blog/viewport-units)). Dynamic values do not update at 60 fps, so use
  `svh` for heroes and avoid `dvh` on anything that animates
  ([web.dev ES](https://web.dev/blog/viewport-units?hl=es),
  [specification.website (3p)](https://specification.website/spec/performance/dynamic-viewport-units.md)).
- **Horizontal overflow.** iOS WebKit has long ignored `overflow: hidden` on `body`
  ([WebKit bug 153852](https://bugs.webkit.org/show_bug.cgi?id=153852)). Put the clip on a wrapper.
  Safari's `overflow-x: clip` has been reported to clip the Y axis as well
  ([Apple forums](https://developer.apple.com/forums/thread/726627)), so test it.
- **backdrop-filter cost.** WebKit re-renders the region behind the element offscreen on each frame,
  and "rendering passes are costly"
  ([WWDC15 501](https://nonstrict.eu/wwdcindex/wwdc2015/501/)). On iOS 26, many blurred children inside
  a scroll container overwhelmed the compositor and caused a blank screen
  ([yuvomi release (3p)](https://newreleases.io/project/github/ulsklyc/yuvomi/release/v0.52.23)). A
  sticky element with a backdrop-filter child disappearing was a WebKit bug fixed in late 2025
  ([WebKit 298709](https://bugs.webkit.org/show_bug.cgi?id=298709)).
- **Video autoplay.** A video autoplays only if it is muted or has no audio track. It plays only while
  on screen, and needs `playsinline` to stay out of fullscreen on iPhone
  ([WebKit](https://webkit.org/blog/6784/new-video-policies-for-ios/)). Low Power Mode is reported to
  block autoplay
  ([forum (3p)](https://discourse.theturninggate.net/t/youtube-autoplay/1993)), so always ship a
  poster frame.
- **Smooth scroll.** Lenis has listed touch problems with `syncTouch` on iOS < 16
  ([socket.dev mirror](https://socket.dev/npm/package/lenis)). Keep native touch scrolling.
- **Pre-launch checks.** Run a Chrome DevTools MCP trace with 4× CPU and Slow 4G mobile emulation, plus
  `lighthouse_audit` with `device: mobile`
  ([tool reference](https://github.com/ChromeDevTools/chrome-devtools-mcp/blob/main/docs/tool-reference.md)).
  Run Playwright screenshots at 375, 390 and 430 px widths. Then check on a real iPhone with Safari
  Web Inspector timelines, because none of the backdrop-filter sources give measured numbers.

---

## 5. Apply to Alchemy Labs — 15 actions, in priority order

1. **Install the QA loop first.** Add the Chrome DevTools MCP and Playwright MCP at project scope
   (`--scope project` writes `.mcp.json`), so every item ends with a trace and a 390 px screenshot.
2. **Add a `.claude/agents/award-judge.md` subagent** that scores the diff on Design 40, Usability 30,
   Creativity 20 and Content 10, on fresh context, and reports only gaps against `style-guide.md` and
   `CLAUDE.md`.
3. **Add a Stop hook** that runs `npm run build` and the Fraunces / `font-serif` greps, so the type law
   and the 150 kB budget are enforced in code rather than in prose.
4. **Install `vercel-labs/agent-skills`** (`web-design-guidelines`, `react-best-practices`) and run
   them on `/` and `/contact`, the documented 220 kB overage.
5. **Install frontend-design** for its process and quality floor. Add a line to `CLAUDE.md` saying the
   house style overrides its anti-eyebrow and anti-accent rules.
6. **Write a CWV budget into `style-guide.md`:** LCP ≤ 2.5 s, INP ≤ 200 ms, CLS ≤ 0.1, measured with
   mobile emulation at 4× CPU.
7. **Audit every `100vh` / `h-screen`.** Move heroes and the preloader to `svh` (with a `vh` fallback),
   and never animate `dvh`.
8. **Clip overflow on a wrapper, not on `body`,** and run a Playwright check that
   `document.documentElement.scrollWidth <= innerWidth` at 360, 390 and 430 px.
9. **Cap `backdrop-filter` on mobile.** At most one live LensLayer per viewport, none inside scrollers
   (already the law), with `.glass-solid` below 768 px. Verify the sticky nav on iOS 26.
10. **Treat the hero as Lando-style restraint:** one ember accent drawn from the atom, one WebGL
    moment, and the rest set in type.
11. **Cut sections, deepen each one** (Igloo Inc): make each scroll chapter earn its own interaction.
12. **Prototype a click-free menu reveal at page end** (Fluid Glass) with Framer Motion and
    `useInView`. No GSAP.
13. **Pin the `@paper-design/shaders-react` version exactly** (0.0.x ships breaking changes), and run a
    contrast check on every `.glass-type` line over shader grounds.
14. **For media:** every `<video>` gets `muted playsinline` and a poster, and every hero LCP image is a
    preloaded AVIF with explicit dimensions to protect CLS.
15. **Before submitting to Awwwards,** get Developer Award readiness checked by the VoltAgent
    `accessibility-tester` and `performance-engineer` subagents, and finish with a real-iPhone
    Web Inspector pass.
