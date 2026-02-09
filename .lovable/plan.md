

## Final Consolidated Overhaul: Sequentian Backgrounds + About Hero + Site-Wide Polish

A strategic, restraint-driven upgrade integrating 3 Sequentian gradient backgrounds (not 5 -- luxury restraint), enhancing the About hero while keeping the yin-yang circles, and polishing every dull space across all pages.

---

### BATCH 1: Foundation -- Sequentian Background Component + Assets

**New assets (3 images only -- restraint over saturation):**
- `src/assets/sequentian-3.png` (Silk Fold -- image-19, red dune curves)
- `src/assets/sequentian-4.png` (Crimson Cloud -- image-20, warm diffused)
- `src/assets/sequentian-2.png` (Soft Nebula -- image-18, bokeh orbs)

Images 1 (Vertical Streaks) and 5 (Satin Wave) are intentionally excluded -- they are too intense and would conflict with the existing red accent system.

**New file: `src/components/SequentianBackground.tsx`**
- Reusable component with `variant` prop (2, 3, or 4)
- Full-bleed `object-cover` with parallax scroll via `useScroll` + `useTransform` (scale 1.0 to 1.1)
- Layered vignette overlays: top gradient fade, bottom gradient fade, radial center vignette
- Configurable `opacity` prop (default 0.35)
- Mobile detection: disables parallax, reduces opacity by 30%, uses static position
- `loading="lazy"` and `decoding="async"` for performance

**New CSS utilities in `src/index.css`:**
- `.glass-portal` -- `backdrop-blur(24px)`, `bg-white/6`, `border: 1px solid white/10`, hover warms border to `red/30` with `box-shadow: 0 0 40px rgba(220,38,38,0.12)`
- `.glass-immersive` -- `backdrop-blur(32px)`, `bg-white/4`, for elevated panels

---

### BATCH 2: About Hero Enhancement (Keep Circles, Add Depth)

The yin-yang founder circles are a unique brand signature -- they stay. Enhancement only.

**File: `src/components/about/YinYangHero.tsx`**
- Add `SequentianBackground variant={3}` (Silk Fold) as the first layer behind everything, at 0.35 opacity with parallax
- Keep existing `ParticleBackground`, `BlueprintGrid`, `NoiseTexture` layers on top
- Keep existing animated gradient mesh
- Keep all existing content and layout unchanged

**File: `src/components/about/FounderCircles.tsx`**
- Change founder name typography from `font-display italic` (Playfair) to `font-body font-bold uppercase tracking-[0.08em]` (Inter Bold Caps) as requested
- Enhance the glass background: add a second inner glow layer with `::before` pseudo-element for multi-layer depth
- Add animated red glow pulse behind each circle on hover: `box-shadow: 0 0 60px rgba(220,38,38,0.15)` transitioning in on hover

---

### BATCH 3: About Page Remaining Sections Polish

**File: `src/components/about/PhilosophySection.tsx`**
- No background change (cream editorial section works well as contrast)
- Section is well-designed, no changes needed

**File: `src/components/about/PrinciplesSection.tsx`**
- Add `SequentianBackground variant={2}` (Soft Nebula) at 0.15 opacity behind principles
- Add a subtle `2px` left border accent in `alchemy-red/20` on each principle card, warming to `alchemy-red/50` on hover
- This creates a visual rail connecting all principle items

**File: `src/components/about/WhoWeServe.tsx`**
- This section is currently very sparse (just a gradient text paragraph)
- Add `SequentianBackground variant={4}` (Crimson Cloud) at 0.2 opacity
- Add decorative horizontal lines above and below the quote: centered, 80px wide, gradient red
- Add attribution: "-- Alchemy Labs Philosophy" in mono small text below
- Add subtle `whileInView` scale animation (0.96 to 1.0) on the quote for kinetic feel

**File: `src/components/about/FoundersCTA.tsx`**
- Add `SequentianBackground variant={2}` (Soft Nebula) at 0.25 opacity
- Keep existing glow orbs, they layer nicely with the background

---

### BATCH 4: Work Page -- Add Sections + Background

**File: `src/pages/Work.tsx`**

**Hero enhancement:**
- Add `SequentianBackground variant={4}` (Crimson Cloud) at 0.2 opacity behind the hero section
- Replace existing inline-style radial gradient orbs with the Sequentian background

**Grid section:**
- Add `SequentianBackground variant={2}` (Soft Nebula) at 0.1 opacity behind the project grid for subtle depth

**New Section 1: Editorial Quote (before Footer)**
- Full-width section with no background image (keep clean)
- Large editorial blockquote: "Every project begins with a question: What does this brand need to become?" in Playfair Display italic
- Below: 3 inline glass-pill stats (Projects Delivered: 50+, Brands Transformed: 30+, Repeat Clients: 85%)
- Subtle `whileInView` fade-up animation
- Section divider line above (gradient red, centered)

**New Section 2: CTA Section (before Footer)**
- `SequentianBackground variant={3}` (Silk Fold) at 0.2 opacity
- Centered heading: "Ready to create something" + "extraordinary?" (Playfair italic red)
- Trust signals row: NDA available, 24h reply, Free first call
- Primary `MagneticButton` CTA linking to `/book-sprint`
- Secondary text link to `/contact`

---

### BATCH 5: Solutions Hub Polish

**File: `src/pages/SolutionsHub.tsx`**

**Hero section:**
- Add `SequentianBackground variant={3}` (Silk Fold) at 0.3 opacity behind the hero
- Replace the existing blurred red circle orb with the full Sequentian image
- Keep corner brackets and technical labels intact

**Pillar cards enhancement:**
- Add `rotateX: 2deg to 0deg` 3D reveal on `whileInView` for each pillar card
- This gives a subtle perspective tilt that resolves to flat as cards enter view

**Services grid section:**
- Add `SequentianBackground variant={2}` (Soft Nebula) at 0.12 opacity

**Sprint CTA section:**
- Add `SequentianBackground variant={4}` (Crimson Cloud) at 0.2 opacity
- Replace existing blurred orb with the Sequentian background for richer visual

---

### BATCH 6: Contact Page Amplification

**File: `src/pages/ContactPage.tsx`**

- Replace the existing `contact-bg.png` `<motion.img>` with `SequentianBackground variant={3}` (Silk Fold) at 0.5 opacity -- significantly higher than other pages for dramatic hero feel
- Increase Ken Burns scale range: 1.0 to 1.2 for more dramatic parallax
- Add a slow continuous subtle rotation animation (0 to 2deg over 40s) on the background for a living satin feel
- Reduce overlay darkness to let the gradient breathe more clearly
- Keep existing hero video section as-is (it works well)
- Keep existing form in glass cards for legibility

---

### BATCH 7: Homepage Below-Fold Backgrounds

**File: `src/pages/Index.tsx`**

- Wrap the Manifesto `RevealSection` in a relative container and add `SequentianBackground variant={4}` (Crimson Cloud) at 0.15 opacity
- Wrap the FAQ `RevealSection` similarly with `SequentianBackground variant={2}` (Soft Nebula) at 0.12 opacity
- These are subtle -- they replace the solid black void without overwhelming the content

---

### BATCH 8: Journal + BookSprint Pages

**File: `src/pages/JournalPage.tsx`**
- Hero: Replace `DynamicGlowBg` with `SequentianBackground variant={2}` (Soft Nebula) at 0.3 opacity
- Posts grid: Add `SequentianBackground variant={4}` (Crimson Cloud) at 0.12 opacity
- Subscribe section: keep clean (glass card provides enough visual interest)

**File: `src/pages/BookSprint.tsx`**
- Hero: Add `SequentianBackground variant={3}` (Silk Fold) at 0.25 opacity behind the existing hero
- Form section: Add `SequentianBackground variant={4}` (Crimson Cloud) at 0.1 opacity for subtle depth

---

### Background Placement Summary

```text
Sequentian 2 (Soft Nebula):
  - About: PrinciplesSection (0.15), FoundersCTA (0.25)
  - Work: Grid section (0.1)
  - Solutions: Services grid (0.12)
  - Homepage: FAQ section (0.12)
  - Journal: Hero (0.3)

Sequentian 3 (Silk Fold):
  - About: YinYangHero (0.35)
  - Work: New CTA section (0.2)
  - Solutions: Hero (0.3)
  - Contact: Form section (0.5)
  - BookSprint: Hero (0.25)

Sequentian 4 (Crimson Cloud):
  - About: WhoWeServe (0.2)
  - Work: Hero (0.2)
  - Solutions: Sprint CTA (0.2)
  - Homepage: Manifesto (0.15)
  - Journal: Posts grid (0.12)
  - BookSprint: Form section (0.1)
```

---

### Technical Details

**New files (4):**
- `src/assets/sequentian-2.png`
- `src/assets/sequentian-3.png`
- `src/assets/sequentian-4.png`
- `src/components/SequentianBackground.tsx`

**Modified files (12):**
- `src/index.css` -- glass-portal, glass-immersive utilities
- `src/components/about/YinYangHero.tsx` -- add Sequentian 3 background
- `src/components/about/FounderCircles.tsx` -- Inter Bold uppercase names, enhanced glass
- `src/components/about/PrinciplesSection.tsx` -- add Sequentian 2 + left border rail
- `src/components/about/WhoWeServe.tsx` -- add Sequentian 4, decorative lines, attribution
- `src/components/about/FoundersCTA.tsx` -- add Sequentian 2
- `src/pages/Work.tsx` -- add Sequentian backgrounds + 2 new sections
- `src/pages/SolutionsHub.tsx` -- add Sequentian 3/2/4 + 3D card reveals
- `src/pages/ContactPage.tsx` -- replace contact-bg with Sequentian 3
- `src/pages/Index.tsx` -- add Sequentian 4/2 to Manifesto/FAQ
- `src/pages/JournalPage.tsx` -- replace DynamicGlowBg with Sequentian 2/4
- `src/pages/BookSprint.tsx` -- add Sequentian 3/4

**Performance safeguards:**
- All background images use `loading="lazy"` and `decoding="async"`
- Mobile: no parallax, opacity reduced by 30%, static positioning
- `content-visibility: auto` on all background containers
- Blur values capped at 60px on mobile (existing guard)

