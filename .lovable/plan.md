
## Aashrith Portfolio -- Complete Cinematic Overhaul

A multi-faceted upgrade covering the hero, navigation, timeline, thought leadership, founder panels, footer, and strategic Sequentian backgrounds throughout.

---

### 1. Founder Panel Visual Differentiation (`FounderCircles.tsx`)

Enhance the two About page founder panels with distinct visual treatments:

- **Aashrith panel**: Cool-toned treatment -- `rgba(255,255,255,0.04)` base gradient, Sequentian 1 (Glass Lines) at 0.18 opacity, border warms to white/red on hover. Subtle blue-steel undertone in the glass: `rgba(180,200,220,0.02)`.
- **Eva panel**: Warm-toned treatment -- `rgba(251,113,133,0.06)` base gradient, Sequentian 4 (Crimson Cloud) at 0.15 opacity, border warms to pink/red on hover. Subtle rose undertone: `rgba(251,113,133,0.03)`.
- Each panel gets a unique radial glow color on hover (Aashrith: white-red, Eva: pink-rose).
- Add a subtle monogram watermark behind each name (large, 20% opacity, offset) for editorial depth.

---

### 2. Hero Section -- Remove Video Placeholder, Center Layout (`AashrithPortfolio.tsx`)

- **Remove** the `HyperLiquidGlass` + `VideoPlaceholder` block entirely from the hero.
- Switch to a **full-width centered layout** (remove the `flex-row` split).
- Name "AASHRITH GADE" centered, full-width, maximum impact.
- `AnimatedCapabilities` centered below with `lg:justify-center`.
- Subtitle and meta info centered.
- Add cinematic layer stack: `SequentianBackground variant={1}` at 0.2 opacity behind the hero for atmospheric depth.
- Add a secondary red radial glow at center-bottom.

---

### 3. Thought Leadership -- Minimized, End-of-Page, Real Links (`AashrithPortfolio.tsx` + `portfolioProjects.ts`)

Replace the current ThoughtLeadership section with a **minimal liquid-glass panel row** positioned just before the footer:

**New data** (replaces `thoughtLeadershipEntries`):
| Title | Platform | URL |
|---|---|---|
| CS30: Marketing Strategy | LinkedIn | https://www.linkedin.com/posts/aashrithgade_cs30-... |
| Alchemy Casefiles Vol. 1 | LinkedIn | https://www.linkedin.com/posts/aashrithgade_alchemy-casefiles... |
| CS35: AI Strategic Analysis | LinkedIn | https://www.linkedin.com/posts/aashrithgade_cs35-ai... |
| Jonathan Anderson x Dior | LinkedIn | https://www.linkedin.com/posts/aashrithgade_jonathan-anderson-dior... |
| AshArchives Post | Instagram | https://www.instagram.com/p/DPWNjBBDF02/... |

**Design**: 
- Section title: "INSIGHTS" eyebrow, "Recent thinking." as headline -- compact, one line.
- Cards: Horizontal scrollable row on mobile, 5-column grid on desktop.
- Each card: Small liquid-glass panel (~160px tall), platform icon (LinkedIn/Instagram), truncated title, no excerpt. Entire card is an `<a>` linking to the post (`target="_blank"`).
- Hover: lift -3px, border warms to red/30, subtle glow.
- No engagement metrics -- purely minimal.

---

### 4. Career Timeline -- Rename, Move Jobs, Elevate Design

**Rename**: "CAREER JOURNEY / From execution to architecture" becomes **"CAREER TIMELINE / Building with Intent"**.

**Move 2 jobs to Eva's portfolio**:
- Remove "Videographer -- Fashion Influencer Projects (@hitakkshi)" and "Marketing, PR & Sales (Sparsh Concept)" from `aashrithData.experience` in `foundersData.ts`.
- Add these two entries to `evaData.experience` in `foundersData.ts` (before Dentsu entry).

**Elevate timeline design** (`AashrithPortfolio.tsx` CareerTimeline section):
- Replace the basic `TimelineRail` rendering with **liquid-glass gradient panels** per job.
- Each timeline entry becomes a glass card with:
  - Left accent bar (2px, gradient red-to-transparent).
  - Company name in `font-body font-bold`, role below in `font-mono text-xs`.
  - Achievements as subtle bullet list.
  - Metrics pills at bottom (existing style).
  - Scroll-triggered reveal: `opacity 0 -> 1`, `y: 30 -> 0`, staggered by 0.1s per card.
- Background: `SequentianBackground variant={2}` at 0.15 opacity behind the section.

---

### 5. Philosophy/Quote Section -- More Subtle

- Reduce quote font size from `text-2xl/3xl/4xl` to `text-xl/2xl/3xl`.
- Reduce quote opacity slightly (porcelain/80 instead of full porcelain).
- Remove `ParticleField` from this section (too heavy for a closing quote).
- Add `SequentianBackground variant={4}` at 0.2 opacity for dramatic warmth.
- Increase spacing between quote and CTA buttons (`mt-16` instead of `mt-12`).

---

### 6. Dynamic Footer -- Reuse Main Footer

- Import and render the main site `Footer` component at the bottom of the Aashrith portfolio page.
- This gives the portfolio the same premium footer with background image, newsletter, links, and social icons -- matching the main site.

---

### 7. Sequentian Background Strategy Across Portfolio

Strategic placement of Sequentian backgrounds for visual rhythm:

| Section | Variant | Opacity | Effect |
|---|---|---|---|
| Hero | Seq 1 (Glass Lines) | 0.20 | Technical depth behind name |
| Ventures | Seq 3 (Silk Fold) | 0.15 | Soft texture behind marquees |
| Career Timeline | Seq 2 (Soft Nebula) | 0.15 | Atmospheric behind glass cards |
| Insights (new) | Seq 5 (Satin Wave) | 0.12 | Elegant behind minimal cards |
| Philosophy/CTA | Seq 4 (Crimson Cloud) | 0.20 | Dramatic warmth for closing |

Add gradient fade dividers (h-24, transparent-to-dark-to-transparent) between each major section for seamless flow.

---

### Technical Details

**Files modified (4):**

- `src/pages/AashrithPortfolio.tsx` -- Hero rewrite (remove video, center layout, add Sequentian), new minimal Insights section, elevated CareerTimeline with glass cards, subtler PhilosophyCTA, add Footer import, add Sequentian backgrounds per section, add section dividers
- `src/data/foundersData.ts` -- Move 2 experience entries from aashrithData to evaData, reorder
- `src/data/portfolioProjects.ts` -- Replace `thoughtLeadershipEntries` with 5 real-link entries (add `url` and `platform` fields to the type)
- `src/components/about/FounderCircles.tsx` -- Add distinct color tints, unique radial glows, monogram watermarks per panel
- `src/components/portfolio/ThoughtLeadershipCard.tsx` -- Add `url` prop support, make card an `<a>` tag when url provided

**Animation specs:**
| Element | Animation | Duration | Delay |
|---|---|---|---|
| Timeline glass cards | fade-up stagger | 0.6s | i * 0.1s |
| Insight cards | fade-up stagger | 0.5s | i * 0.06s |
| Section dividers | opacity fade | 0.3s | -- |
| Sequentian Ken Burns | scale 1.0 to 1.12 | scroll-linked | -- |

**Performance:**
- All Sequentian images: `loading="lazy"`, `decoding="async"`
- All viewport triggers: `once: true`
- Footer: reuses existing component (no duplication)
- Mobile: Sequentian opacities reduced by 15%, no 3D tilt on timeline cards
