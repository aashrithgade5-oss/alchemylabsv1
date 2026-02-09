

## Final Performance & Design Overhaul

A comprehensive upgrade covering media corrections, typography consolidation, performance hardening, and design refinements inspired by award-winning studio sites (e.g., Rauno Freiberg, Linear, Locomotive).

---

### 1. Media Swap: Ikea Video to AI Media Gen

**File: `src/data/projects.ts`**

- **AI Media Gen** (id: `ai-media-gen`): Change `video` from `aiMediaGen1` to `aiMediaGen2` (the Ikea/IKEA video) so it becomes the primary preview thumbnail
- **Aether Rituals** (id: `aether-rituals`): Remove the `video2: aiMediaGen2` property so the Ikea video no longer appears in its carousel -- it belongs exclusively to AI Media Gen now

---

### 2. Typography Consolidation: Inter + Playfair Display + Cinzel

Currently `font-alchemy` (Cinzel) exists in CSS but is never used in components. Apply it consistently as the brand identity font:

**File: `tailwind.config.ts`**
- Add `alchemy: ['Cinzel', 'Playfair Display', 'Georgia', 'serif']` to `fontFamily` extend

**File: `src/components/Navigation.tsx`** (line 329)
- Change `font-display` to `font-alchemy` on the "Alchemy" text in nav logo

**File: `src/components/Hero.tsx`** (line 192)
- Change `font-body font-bold` on "ALCHEMY" to `font-alchemy font-semibold` for the premium serif look

**File: `src/components/Preloader.tsx`** (line 110)
- Change `font-display` to `font-alchemy` on the "Alchemy Labs" tagline

**File: `src/components/Footer.tsx`** (line 86)
- Change `font-display` to `font-alchemy` on the "Alchemy" text in footer logo

---

### 3. Performance Hardening (Everlasting)

**3a. Lazy-load homepage below-fold sections (`src/pages/Index.tsx`)**
- Wrap Solutions, CaseStudies, Manifesto, EditorialSection, ProcessSection, FAQSection, and Contact with `React.lazy()` and `Suspense` fallback (null or minimal spinner)
- Add `content-lazy` class to each lazy section wrapper for CSS `content-visibility: auto` paint skipping

**3b. Self-healing FPS monitor (`src/components/NeuralBackground.tsx`)**
- Inside the `Particles` component, add a `performance.now()` frame timer
- If average frame time exceeds 20ms for 30+ consecutive frames, halve particle count and disable connections at runtime
- This makes the WebGL system self-repairing on slow devices forever, regardless of future content additions

**3c. Image/Video optimization (`src/components/ShimmerImage.tsx`)**
- Add `loading="lazy"` and `decoding="async"` to the `<img>` element
- Add `preload="none"` to the `<video>` element for non-hero videos

**3d. Hero video optimization (`src/components/Hero.tsx`)**
- Add `fetchpriority="low"` attribute pattern awareness -- the video already has `preload="metadata"`, keep as-is
- Verify `will-change: auto` is cleaned up on unmount (already handled by R3F IntersectionObserver)

**3e. Animated gradient orbs on ContactPage (`src/pages/ContactPage.tsx`)**
- Add responsive blur: `blur-[80px] md:blur-[120px]` to reduce GPU load on mobile
- Add `will-change: transform` to the video motion div (already present)

---

### 4. Design Polish & Scroll Enhancements

**4a. Staggered section entrance animations (`src/pages/Index.tsx`)**
- Wrap each lazy-loaded section in a `motion.div` with `whileInView` opacity+translateY animation
- Use `viewport={{ once: true, margin: '-80px' }}` for early trigger, creating a smooth cascade as the user scrolls

**4b. Section divider lines (global polish)**
- Add a subtle horizontal divider between major homepage sections (Solutions/CaseStudies/Manifesto) using a `<div className="w-full max-w-6xl mx-auto h-px bg-gradient-to-r from-transparent via-porcelain/8 to-transparent" />`
- This creates visual breathing room without padding changes

**4c. Editorial section (`src/components/EditorialSection.tsx`)**
- Add a horizontal scroll-triggered line animation on the quote section -- a fine red line that grows from 0% to 100% width as the quote scrolls into view using `useTransform` on `scrollYProgress`

**4d. FAQ accordion micro-polish (`src/components/FAQSection.tsx`)**
- Add a `0.5px` left border accent on non-active items (currently only active items have the red left border)
- This creates a subtle visual rail connecting all items

**4e. Footer brand text (`src/components/Footer.tsx`)**
- Apply `font-alchemy` to the "Alchemy" text for brand consistency
- Add a subtle `text-glow` on the copyright year for a premium micro-detail

**4f. Navigation scroll glass enhancement (`src/components/Navigation.tsx`)**
- When scrolled, add a subtle `box-shadow: 0 1px 0 rgba(220, 38, 38, 0.08)` red underline glow to the glass pill (already exists but verify it's visible)

---

### 5. Mobile Performance Guards

**File: `src/index.css`**
- Add a mobile media query to cap all `blur()` filter values at 60px
- Add `@media (max-width: 768px)` rule to reduce `will-change` usage (set to `auto` for non-essential animated elements)

**File: `src/pages/ContactPage.tsx`**
- Change gradient orb blur from `blur-[120px]` and `blur-[100px]` to responsive `blur-[60px] md:blur-[120px]` and `blur-[60px] md:blur-[100px]`

---

### Technical Summary

Files modified:
- **`src/data/projects.ts`** -- Ikea video swap
- **`tailwind.config.ts`** -- add `alchemy` font family
- **`src/components/Navigation.tsx`** -- Cinzel brand font
- **`src/components/Hero.tsx`** -- Cinzel on "ALCHEMY", mobile blur optimization
- **`src/components/Preloader.tsx`** -- Cinzel brand font
- **`src/components/Footer.tsx`** -- Cinzel brand font
- **`src/pages/Index.tsx`** -- lazy sections, staggered entrances, section dividers
- **`src/components/NeuralBackground.tsx`** -- self-healing FPS monitor
- **`src/components/ShimmerImage.tsx`** -- lazy/async loading attributes
- **`src/components/EditorialSection.tsx`** -- scroll-triggered line animation
- **`src/components/FAQSection.tsx`** -- left border rail polish
- **`src/pages/ContactPage.tsx`** -- responsive blur values
- **`src/index.css`** -- mobile blur cap media query

