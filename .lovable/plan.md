
## Complete Portfolio System Overhaul -- Theme, Eva Upgrade, Founder Panels & Backgrounds

A comprehensive update across both founder portfolios and the About page panels, addressing light mode visibility, Eva's complete creative overhaul, founder panel text/styling, and Sequentian background strategy.

---

### 1. About Page -- Founder Panel Updates (`FounderCircles.tsx`)

**Text Changes:**
- Aashrith's specialty: "Brand Architecture · Luxury Brand Strategy · AI-Native Luxury Brand Strategy · Creative Direction"
- Eva's specialty: "Growth & Partnerships · Luxury Branding · AI-Native Marketing"

**Eva Panel -- Pink Aesthetic Differentiation:**
- Change Eva's gradient from subtle rose to a visibly pink treatment: `linear-gradient(135deg, rgba(236,72,153,0.08) 0%, rgba(251,113,133,0.05) 50%, rgba(255,255,255,0.02) 100%)`
- Background image stays Sequentian 4 but opacity bumped to 0.20 for more presence
- Hover glow: `radial-gradient(ellipse at 50% 40%, rgba(236,72,153,0.18) 0%, transparent 70%)` -- visibly pink, not red
- Hover border: `rgba(236,72,153,0.5)` (pink-500)
- Monogram color: `rgba(236,72,153,0.08)` -- pink tinted
- CTA button: pink gradient instead of red (`rgba(236,72,153,0.15)` bg, `rgba(236,72,153,0.4)` border)

**Aashrith Panel stays red/black** -- no changes needed, already correct.

---

### 2. Aashrith Portfolio -- Light Mode & Video Fixes (`AashrithPortfolio.tsx`)

**Light Mode Video Visibility:**
- Increase light mode video opacity from `0.15` to `0.35` so the video is clearly visible against the light background
- Add a subtle dark overlay in light mode: `rgba(0,0,0,0.05)` on top of video for contrast
- Light mode vignette: use darker edges `rgba(250,250,249,0.85)` instead of `0.6`

**Section Divider Fix for Light Mode:**
- Replace the `via-alchemy-black/50` / `via-neutral-200/50` gradient with a cleaner approach: in light mode use `via-neutral-100` (soft grey) instead of semi-transparent values that create burn effects
- Reduce divider height from `h-24` to `h-16` for less visual weight

**Sequentian Background Light Mode:**
- All SequentianBackground components: in light mode, reduce opacity by 40% and add a `mix-blend-multiply` treatment so they don't wash out against white
- Hero Seq 1: dark 0.12, light 0.07
- Career Seq 5: dark 0.10, light 0.06
- Beyond Seq 2: dark 0.12, light 0.07
- Philosophy Seq 4: dark 0.18, light 0.10

---

### 3. Eva Portfolio -- Complete Creative Overhaul (`EvaPortfolio.tsx`)

Transform Eva's portfolio into a distinctly different experience from Aashrith's, using a pink/rose color palette and unique visual treatments.

**Navigation -- Match Aashrith's Pattern:**
- Extract Back button and Theme toggle to fixed corners (same as Aashrith's `FixedControls`)
- Convert nav to liquid-glass pill style (same pattern)
- Add social links to mobile menu: LinkedIn (from data), email
- Remove toggleTheme and back from the navbar itself

**Hero -- Pink-Toned Cinematic:**
- Add Sequentian 4 (Crimson Cloud) at 0.15 opacity as background -- distinct from Aashrith's Seq 1
- Add subtle pink gradient orbs (keep existing ones but make them more prominent in dark mode)
- Add ParticleField (20 particles, `rgba(236,72,153,0.25)`) for atmospheric depth -- pink particles, not red
- Add BlueprintGrid (0.015 opacity) and NoiseTexture (0.02 opacity)
- Add top/bottom fade gradients

**Section Backgrounds -- All Different from Aashrith:**

| Section | Background | Color Accent |
|---|---|---|
| Hero | Seq 4 (Crimson Cloud, 0.15) + pink particles | Pink/Rose |
| Philosophy | Seq 5 (Satin Wave, 0.10) | Elegant pink |
| Ventures | Seq 2 (Soft Nebula, 0.12) + pink radial glow | Soft nebula |
| Clients | No Sequentian, subtle pink radial | Clean |
| Career | Seq 3 (Silk Fold, 0.10) | Silk texture |
| CTA | Seq 1 (Glass Lines, 0.15) | Technical close |

None of these match Aashrith's section-to-background mapping (Aashrith uses Seq 1, 5, 2, 4).

**Add Section Dividers** between all sections (same component as Aashrith but with adjusted colors).

**Scroll Progress Bar** -- Move from bottom to top (h-1, z-[80]) with pink-to-red gradient and glow, matching Aashrith's pattern.

**Portfolio Footer** -- Replace the inline "Back to About" link with the `PortfolioFooter` component:
- Monogram: "ED"
- Name: "Eva Doshi"
- Links: Portfolio sections, Alchemy Labs venture, Connect (LinkedIn, Email)

**Career Timeline -- Elevated Glass Cards:**
- Replace `TimelineRail` with the same liquid-glass card pattern used in Aashrith's CareerTimeline
- Pink accent dots instead of red
- Same scroll-triggered stagger animations

**Light Mode Theme Fixes:**
- Apply the same systematic `t(isDark, dark, light)` pattern to every text, border, and background element
- Ensure all glass panels, expertise pills, and sections properly switch contrast

---

### 4. AnimatedCapabilities -- Already Has isDark Prop

No changes needed -- already accepts `isDark` prop.

---

### Technical Details

**Files modified (3):**
- `src/components/about/FounderCircles.tsx` -- Update specialty text for both founders, make Eva's panel visibly pink (gradient, glow, border, monogram, CTA all pink-toned)
- `src/pages/AashrithPortfolio.tsx` -- Fix light mode video opacity (0.35), fix section dividers (no burn effect), adjust Sequentian opacities for light mode
- `src/pages/EvaPortfolio.tsx` -- Complete rewrite: add FixedControls, liquid-glass nav, Sequentian backgrounds per section (all different from Aashrith), section dividers, elevated career timeline with glass cards, PortfolioFooter, top scroll progress bar, pink color palette throughout, full light/dark theme support

**No new files** -- reuses existing `PortfolioFooter`, `SequentianBackground`, `BlueprintGrid`, `NoiseTexture`, `ParticleField`, `EyebrowLabel`, `SectionShell`, `MagneticCTA`.

**Key Differentiation -- Aashrith vs Eva:**
| Aspect | Aashrith | Eva |
|---|---|---|
| Color | Red/Black | Pink/Black |
| Hero BG | Video + Seq 1 | Gradient orbs + Seq 4 |
| Particles | Red | Pink |
| Ventures BG | Radial glow only | Seq 2 (Soft Nebula) |
| Timeline BG | Seq 5 (Satin Wave) | Seq 3 (Silk Fold) |
| CTA BG | Seq 4 (Crimson Cloud) | Seq 1 (Glass Lines) |
| Scroll bar | Red gradient | Pink-to-red gradient |
