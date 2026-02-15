
## Cookie Consent Banner -- Liquid Glass Aesthetic + Device-Adaptive Performance

A sleek cookie consent system that matches the site's luxury aesthetic and, upon acceptance, applies device-aware performance optimizations to ensure butter-smooth rendering across all hardware tiers.

---

### 1. Cookie Consent Banner Component

**New file: `src/components/CookieConsent.tsx`**

A floating liquid-glass banner that appears at the bottom of the viewport on first visit:

- **Design**: Liquid-glass pill at `bottom-6 left-1/2 -translate-x-1/2`, max-width 600px, with `backdrop-blur-xl`, white/6 border, noise texture overlay.
- **Content**: A single line -- "We use cookies to optimize your experience." with an "Accept All" button styled as a MagneticCTA-like red pill, and a subtle "Privacy Policy" link.
- **Animation**: Slides up from below with a 1.5s delay after page load (so it doesn't compete with the Preloader). Framer Motion `animate` from `y: 100, opacity: 0` to `y: 0, opacity: 1`.
- **Dismissal**: On "Accept All" click, the banner slides back down and fades out. Consent is stored in `localStorage` as `alchemy-cookie-consent: accepted` with a timestamp. Banner never shows again for that browser.
- **Mobile**: Full-width with horizontal padding, stacked layout (text above button) on screens below 480px.

---

### 2. Device-Adaptive Performance System

**New file: `src/hooks/useDevicePerformance.ts`**

A hook that runs after cookie acceptance to profile the device and apply performance tiers:

**Device Profiling (runs once, cached in localStorage):**
- `navigator.hardwareConcurrency` (CPU cores)
- `navigator.deviceMemory` (RAM in GB, where supported)
- Screen resolution and pixel ratio
- GPU detection via a tiny offscreen WebGL canvas (`renderer.getParameter(UNMASKED_RENDERER)`)
- Connection speed via `navigator.connection.effectiveType`

**Three Performance Tiers:**
| Tier | Criteria | Optimizations |
|---|---|---|
| High | 8+ cores, 8GB+ RAM, dedicated GPU, 4G+ | Full animations, all particles, max blur, Sequentian parallax |
| Medium | 4-7 cores, 4GB RAM, integrated GPU | Particle counts halved, blur capped at 40px, parallax disabled |
| Low | 1-3 cores, under 4GB, weak GPU, slow connection | Particles disabled, blur capped at 20px, Sequentian static (no parallax/scale), reduced motion |

**How it applies:**
- Exposes a `performanceTier` value (`'high' | 'medium' | 'low'`) via React Context
- Components like `ParticleField`, `SequentianBackground`, `NeuralBackground`, `SmoothScroll` read the tier and self-adjust
- CSS custom property `--perf-tier` set on `<html>` for CSS-level adjustments (e.g., `blur()` caps)

---

### 3. Performance Context Provider

**New file: `src/contexts/PerformanceContext.tsx`**

- Wraps the app and provides `performanceTier`, `hasConsented`, and helper like `shouldUseParticles`, `maxBlur`, `shouldParallax`
- Only runs profiling after consent is given (respects user choice)
- Falls back to "medium" tier if profiling APIs are unavailable

---

### 4. Integration Points

**`src/App.tsx`:**
- Add `<PerformanceProvider>` wrapping `<AppContent>`
- Add `<CookieConsent />` inside `<AppContent>`, after `<BackToTop />`

**Existing components that read the tier (minimal changes):**
- `ParticleField`: multiply `count` by tier factor (high: 1x, medium: 0.5x, low: 0)
- `SequentianBackground`: disable `parallax` and `scaleEnd` on low tier
- `SmoothScroll` (Lenis): adjust `lerp` value per tier for smoother scroll on weaker devices

---

### Technical Details

**New files (3):**
- `src/components/CookieConsent.tsx` -- Liquid glass banner with accept button, localStorage persistence, slide animation
- `src/hooks/useDevicePerformance.ts` -- Device profiling hook (cores, RAM, GPU, connection)
- `src/contexts/PerformanceContext.tsx` -- React context exposing performance tier and helper flags

**Modified files (1):**
- `src/App.tsx` -- Add PerformanceProvider and CookieConsent component

**No external dependencies needed** -- uses native browser APIs and existing framer-motion.

**Privacy compliance:**
- Banner links to `/privacy` page
- No third-party tracking cookies -- this is purely functional (performance profiling stored locally)
- Consent timestamp stored for audit trail
