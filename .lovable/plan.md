

## Cookie Consent -- Cinematic Center-Stage Dialog Overhaul

Transform the cookie consent from a bottom-bar toast into a full-screen cinematic dialog that commands attention as the site's first impression, then seamlessly calibrates performance.

---

### 1. Full-Screen Cinematic Overlay (`CookieConsent.tsx` -- Complete Rewrite)

**Layout -- Centered Dialog with Shallow Depth-of-Field:**
- Full-viewport overlay (`fixed inset-0 z-[200]`) with a red-tinted backdrop blur: `backdrop-filter: blur(20px)` + `background: rgba(10,0,0,0.6)` creating a shallow depth-of-field cinema effect
- Subtle animated red gradient orbs behind the backdrop (two radial gradients pulsing slowly) for atmospheric red tint
- Center-stage dialog card: `max-w-md`, vertically and horizontally centered

**Dialog Card Design -- Liquid Glass Premium:**
- Glass card with `bg-black/50 backdrop-blur-2xl border border-white/[0.08]` and `rounded-3xl`
- Noise texture overlay at 3% opacity
- Top edge shimmer line (`h-px bg-gradient-to-r from-transparent via-alchemy-red/40 to-transparent`) -- red-tinted, not white
- Inner subtle red radial glow at top: `radial-gradient(ellipse at 50% 0%, rgba(220,38,38,0.08) 0%, transparent 60%)`

**Content -- Personalized, Quirky, Professional:**
- Top: Animated cookie icon with a subtle pulse glow (red-tinted `drop-shadow`)
- Headline: "We bake experiences, not just cookies." -- `text-2xl font-display` (Playfair Display Italic) in white
- Subtext: "Accept to let us calibrate your experience for butter-smooth performance tailored to your device." -- `text-sm text-white/60`
- Privacy link: Small inline link with Shield icon to `/privacy`

**CTA Button -- Statement Piece:**
- Full-width red gradient button: `bg-gradient-to-r from-alchemy-red to-red-700` with `rounded-2xl py-4`
- Text: "Accept & Optimize" -- `text-base font-medium tracking-wide`
- Hover: brighter red gradient + scanline overlay + subtle scale(1.02)
- Below button: micro-text "One click. Tailored performance." in `text-xs text-white/30`

**Animations:**
- Backdrop fades in over 0.8s with cinematic easing
- Red orbs start animating (slow scale pulse, 8s loop)
- Dialog card scales in from 0.9 to 1.0 with opacity 0 to 1, delayed 0.3s after backdrop
- On accept: card scales to 1.05 and fades out, then backdrop dissolves -- total exit 0.6s
- After exit: a brief "Calibrating..." micro-toast at bottom (1s, then fade) as profiling runs

---

### 2. Homepage-Only Trigger Logic

**Current behavior:** Shows on every page on first visit.

**New behavior:**
- CookieConsent reads `useLocation()` and only renders when `pathname === '/'`
- If user lands on `/about` or `/aashrith` first, no dialog -- it waits until they visit home
- Once accepted, never shows again (same localStorage logic)

---

### 3. Enhanced Calibration Feedback

**After acceptance, add a brief calibration indicator:**
- A small `fixed bottom-6 left-1/2` pill appears: "Calibrating your experience..." with a spinning loader icon
- Stays for 1.5s while `profileDevice()` + `classifyTier()` runs
- Then morphs text to "Optimized for your device" with a checkmark, then fades out after 1s
- This gives the user feedback that something meaningful happened

**PerformanceContext update:**
- Add a `calibrationState: 'idle' | 'calibrating' | 'done'` to the context
- `acceptCookies()` sets state to `'calibrating'`, runs profiling, then sets `'done'` after a brief delay
- CookieConsent and a new `CalibrationToast` sub-component read this state

---

### Technical Details

**Files modified (2):**
- `src/components/CookieConsent.tsx` -- Complete rewrite: full-screen cinematic overlay with red-tinted depth-of-field backdrop, centered liquid-glass dialog, quirky headline, full-width CTA, homepage-only rendering via `useLocation()`, calibration toast sub-component
- `src/contexts/PerformanceContext.tsx` -- Add `calibrationState` to context, update `acceptCookies` to include calibrating/done state transitions

**No new files or dependencies.**

**Animation specs:**
| Element | Animation | Duration |
|---|---|---|
| Backdrop (red-tinted blur) | fade-in | 0.8s, ease `[0.22, 1, 0.36, 1]` |
| Red gradient orbs | scale pulse 1.0-1.3 | 8s loop, infinite |
| Dialog card | scale 0.9 to 1.0 + fade | 0.6s, 0.3s delay |
| Cookie icon pulse | drop-shadow pulse | 3s loop |
| Exit (card) | scale to 1.05 + fade out | 0.4s |
| Exit (backdrop) | fade out | 0.5s, 0.2s delay |
| Calibration toast | slide-up + fade | 0.4s in, 0.4s out |

