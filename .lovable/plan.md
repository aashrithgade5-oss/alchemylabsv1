

## Fix Sequentian Backgrounds: Better Visibility, All 5 Images, Restore Contact Page

The current backgrounds are barely visible due to low opacity values combined with heavy vignette overlays that further dim them. Only 3 of 5 images were used. Sequentian 3 (Silk Fold) appears low quality. Here's the fix.

---

### Problem Diagnosis

1. **Opacity too low**: Values like 0.1, 0.12, 0.15 make images invisible against dark backgrounds
2. **Triple vignette stacking**: The component applies top fade + bottom fade + radial vignette -- three overlays darkening the image simultaneously
3. **Only 3 of 5 images used**: Images 1 (Glass Lines/Vertical Streaks) and 5 (Satin Wave) were excluded
4. **Contact page**: Sequentian 3 replaced the original `contact-bg.png` and looks bad -- needs reverting
5. **Mobile opacity reduction**: An additional 30% opacity cut on mobile makes them even more invisible

---

### Changes

**1. Copy missing assets and update component to support all 5 variants**

File: `src/components/SequentianBackground.tsx`
- Copy `image-17.png` to `src/assets/sequentian-1.png` (Glass Lines)
- Copy `image-21.png` to `src/assets/sequentian-5.png` (Satin Wave)
- Update variant type from `2 | 3 | 4` to `1 | 2 | 3 | 4 | 5`
- Import all 5 assets into the variant map
- **Reduce vignette overlays**: Remove the radial center vignette (the most aggressive dimmer), keep only top/bottom gradient fades but reduce their height from `h-40` to `h-24`
- **Increase mobile floor**: Change mobile multiplier from `0.7` to `0.85`
- Add optional `blur` prop (default 0) to allow CSS blur for a soft gradient aesthetic when the raw image is too sharp/grainy

**2. Restore Contact page original background**

File: `src/pages/ContactPage.tsx`
- Remove `SequentianBackground variant={3}` from the form section
- Restore the original `contact-bg.png` with its `mask-image` and Ken Burns effect
- The hero video section stays as-is (it's working fine)

**3. Increase all opacity values across the site**

Minimum opacity raised to 0.3 to ensure clear visibility:

| Page | Section | Current | New Variant | New Opacity |
|------|---------|---------|-------------|-------------|
| **Index** | Manifesto | Seq 4 @ 0.15 | Seq 4 | **0.35** |
| **Index** | FAQ | Seq 2 @ 0.12 | Seq 2 | **0.3** |
| **About** | YinYangHero | Seq 3 @ 0.35 | Seq 1 (Glass Lines) | **0.4** |
| **About** | PrinciplesSection | Seq 2 @ 0.15 | Seq 5 (Satin Wave) | **0.3** |
| **About** | WhoWeServe | Seq 4 @ 0.2 | Seq 4 | **0.35** |
| **About** | FoundersCTA | Seq 2 @ 0.25 | Seq 2 | **0.4** |
| **Work** | Hero | Seq 4 @ 0.2 | Seq 4 | **0.35** |
| **Work** | Grid | Seq 2 @ 0.1 | Seq 1 (Glass Lines) | **0.3** |
| **Work** | CTA | Seq 3 @ 0.2 | Seq 5 (Satin Wave) | **0.35** |
| **Solutions** | Hero | Seq 3 @ 0.3 | Seq 1 (Glass Lines) | **0.4** |
| **Solutions** | Services grid | Seq 2 @ 0.12 | Seq 2 | **0.3** |
| **Solutions** | Sprint CTA | Seq 4 @ 0.2 | Seq 4 | **0.35** |
| **Journal** | Hero | Seq 2 @ 0.3 | Seq 5 (Satin Wave) | **0.4** |
| **Journal** | Posts grid | Seq 4 @ 0.12 | Seq 4 | **0.3** |
| **BookSprint** | Hero | Seq 3 @ 0.25 | Seq 1 (Glass Lines) | **0.4** |
| **BookSprint** | Form | Seq 4 @ 0.1 | Seq 2 | **0.3** |
| **Contact** | Form section | Seq 3 @ 0.5 | **Revert to contact-bg.png** | -- |

**Key redistribution**: Sequentian 3 (Silk Fold -- the low quality one) is removed from all placements. The new distribution uses all 5 images:
- **Seq 1 (Glass Lines)**: About hero, Work grid, Solutions hero, BookSprint hero -- the most technical/premium looking
- **Seq 2 (Soft Nebula)**: Index FAQ, FoundersCTA, Solutions services, BookSprint form
- **Seq 4 (Crimson Cloud)**: Index Manifesto, WhoWeServe, Work hero, Solutions CTA, Journal grid
- **Seq 5 (Satin Wave)**: About Principles, Work CTA, Journal hero

---

### Files Modified (11 total)

**Updated component:**
- `src/components/SequentianBackground.tsx` -- support variants 1-5, reduce vignettes, add blur prop

**New assets:**
- `src/assets/sequentian-1.png` (copy from uploaded image-17)
- `src/assets/sequentian-5.png` (copy from uploaded image-21)

**Updated pages (swap variants + increase opacity):**
- `src/pages/Index.tsx`
- `src/pages/ContactPage.tsx` (revert to contact-bg.png)
- `src/pages/SolutionsHub.tsx`
- `src/pages/Work.tsx`
- `src/pages/JournalPage.tsx`
- `src/pages/BookSprint.tsx`
- `src/components/about/YinYangHero.tsx`
- `src/components/about/PrinciplesSection.tsx`
- `src/components/about/WhoWeServe.tsx`
- `src/components/about/FoundersCTA.tsx`

