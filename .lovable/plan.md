
## About Page -- Cinematic Overhaul

A complete reimagining of the About page into a seamless, immersive cinematic experience with a full-viewport video hero featuring liquid glass effects, redesigned founder sections, and elevated below-fold sections with strategic Sequentian backgrounds.

---

### Hero Overhaul: `YinYangHero.tsx`

**Video Background with Cinematic Treatment**

Replace the current Sequentian + ParticleBackground hero with the uploaded red-cloak video as a full-bleed background. The video gets a multi-layer cinematic treatment inspired by the Homepage hero pattern:

- Layer 1: Deep atmospheric base gradient (black)
- Layer 2: Video element (`object-cover`, muted, looped, playsInline, `preload="metadata"`) at ~15% opacity
- Layer 3: Premium vignette (radial gradient, dark edges fading to center transparency)
- Layer 4: Top/bottom fade gradients for seamless section transitions
- Layer 5: Red energy glow (radial gradient, `rgba(220,38,38,0.08)`)
- Layer 6: Secondary accent glows on desktop (two offset red radials)
- Layer 7: Subtle technical grid (desktop only, 0.012 opacity)
- Layer 8: Lazy-loaded NeuralBackground (R3F particles, desktop only, delayed 300ms) at 35% opacity -- this provides the "different particles" from the homepage since it uses the same system but at different opacity and without the homepage video underneath
- Layer 9: BlueprintGrid (0.02 opacity) + NoiseTexture (0.03 opacity) for grain

Video fades in smoothly over 1.2s with `[0.22, 1, 0.36, 1]` easing. On mobile, video opacity is slightly higher (18%) and NeuralBackground is skipped.

**Title Typography -- Repositioned**

Move the editorial title to center-bottom of viewport for a more cinematic, film-poster feel:
- Eyebrow stays ("Meet Our Founders" with hand-drawn SVG underline)
- Main title stays ("Architects of meaning, systems, and inevitability")
- Subtitle stays
- All positioned in a `flex-col justify-end pb-32` layout so content anchors to the lower third

The FounderCircles component is **removed from the hero** and becomes its own dedicated section below.

---

### Founder Section: New Standalone `FounderCircles` Section

Instead of circles crammed inside the hero, the founders get their own full-width cinematic section immediately below the hero.

**Layout**: Two side-by-side editorial panels on desktop (50/50 split with 1px red divider), stacked on mobile.

**Each panel**:
- Tall aspect ratio (~3:4 on desktop, auto on mobile)
- Glass background: `backdrop-blur(24px)`, multi-layer gradient (Aashrith: dark/neutral tones, Eva: warm red/pink tint)
- Border: `1px solid rgba(255,255,255,0.08)` warming to `rgba(220,38,38,0.4)` on hover
- Content: Large uppercase name (font-black, tracking-wide), title in mono, specialty in body, "Discover Portfolio" glass-pill CTA at bottom
- Hover: lift -6px translateY, inner red glow appears, border warms, 3D perspective tilt on desktop (existing spring physics reused)
- Background per panel: subtle Sequentian image (variant 1 for Aashrith at 15% opacity, variant 4 for Eva at 12% opacity) for visual differentiation

**Animated reveal on scroll**:
- Left panel slides in from left, right panel from right
- 0.2s stagger delay
- Center divider: animated red line drawing from 0 to 100% height over 1s with 0.6s delay
- `viewport={{ once: true, margin: '-100px' }}`

**Remove**: FloatingDots component, rotating conic-gradient border rings (too busy with the new video hero above)

---

### Section-Level Background Strategy

Each section gets a distinct atmospheric treatment for seamless visual flow:

1. **Hero** (video + NeuralBackground + grid + grain)
2. **Founders** (dark background, per-panel Sequentian subtlety, divider accent)
3. **Philosophy** -- stays cream/editorial (already excellent), add Sequentian 2 at very low opacity (0.15) behind the right column for warmth
4. **Process** -- add Sequentian 1 (Glass Lines) at 0.3 opacity for the "blueprint/technical" feel that matches the process metaphor
5. **Principles** -- keep Sequentian 5 (Satin Wave) as-is (already well-placed)
6. **WhoWeServe** -- keep Sequentian 4 (Crimson Cloud) as-is
7. **FoundersCTA** -- keep Sequentian 2 as-is, add subtle ParticleField (15 particles, low opacity) for a callback to the hero

---

### Files Changed

**Modified files (4):**

- `src/components/about/YinYangHero.tsx` -- Complete rewrite: video background with NeuralBackground particles, cinematic overlay layers, bottom-anchored typography, FounderCircles removed from this component
- `src/components/about/FounderCircles.tsx` -- Complete rewrite: standalone section with two side-by-side editorial glass panels, animated slide-in reveal, center divider, remove FloatingDots and circle layout
- `src/components/about/ProcessSection.tsx` -- Add SequentianBackground variant 1 at 0.3 opacity
- `src/pages/About.tsx` -- Move FounderCircles to its own section between hero and philosophy (wrap in its own section element)

**New files (0)** -- no new files needed, reuses existing NeuralBackground, SequentianBackground, BlueprintGrid, NoiseTexture, ScrollReveal

**Copied files (1):**
- Upload the user video as `src/assets/about-hero-video.mp4`

---

### Animation Spec

| Element | Animation | Duration | Delay | Easing |
|---|---|---|---|---|
| Video opacity | 0 to 0.15 | 1.2s | 0s | [0.22,1,0.36,1] |
| NeuralBackground | Lazy load + fade | 0.5s | 0.3s | ease |
| Eyebrow | fade-up | 0.5s | 0.3s | [0.22,1,0.36,1] |
| Title lines | fade-up | 0.8s | 0.4s | [0.22,1,0.36,1] |
| Subtitle | fade-in | 0.6s | 0.6s | [0.22,1,0.36,1] |
| Scroll indicator | fade-in + bounce | 2s loop | 1.5s | easeInOut |
| Founder panel L | slide from left | 0.8s | 0s | [0.22,1,0.36,1] |
| Founder panel R | slide from right | 0.8s | 0.2s | [0.22,1,0.36,1] |
| Divider line | height 0 to 100% | 1s | 0.6s | [0.22,1,0.36,1] |
| Panel hover | lift + glow | 0.3s | -- | ease |

All animations respect `prefers-reduced-motion`.

---

### Performance Considerations

- Video: `preload="metadata"`, `playsInline`, `muted`, `loop`, mobile opacity bumped slightly
- NeuralBackground: lazy-loaded via `React.lazy`, desktop only, delayed 300ms, visibility-gated via IntersectionObserver (already built in)
- Self-healing FPS monitor in NeuralBackground auto-degrades if frame times exceed 20ms
- Sequentian images: `loading="lazy"`, `decoding="async"`
- Mobile: no NeuralBackground, no grid overlay, no secondary accent glows, founder panels stack vertically, no 3D tilt
- All viewport triggers use `once: true` to prevent re-animation
