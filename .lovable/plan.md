

## Minimal Bottom-Left Liquid Glass Cookie Consent

### What's changing

The cookie consent popup moves from **bottom-center** to **bottom-left** of the Hero section, gets a refined **liquid glass** aesthetic, and keeps all existing performance optimization logic intact.

### Current state

- The popup already works: shows only on homepage, only once, saves consent to localStorage, triggers device profiling (CPU cores, RAM, GPU, connection speed) to set a performance tier (high/medium/low) that adapts particles, blur, and parallax across the entire site
- It disappears permanently after clicking Accept
- Styling is decent but centered and not quite "liquid glass"

### Changes (1 file)

**`src/components/CookieConsent.tsx`**

1. **Position**: Move from `left-1/2 -translate-x-1/2` (centered) to `left-6` (bottom-left corner)
2. **Size**: Shrink from `max-w-lg w-[calc(100%-2rem)]` to `max-w-sm` for a compact, minimal footprint
3. **Liquid glass styling**:
   - Background: `rgba(255,255,255,0.04)` with `backdrop-blur-2xl` (48px blur) for that frosted liquid glass look
   - Border: `1px solid rgba(255,255,255,0.10)` with a subtle inner glow
   - Top edge highlight: thin `rgba(255,255,255,0.15)` line simulating light refraction
   - Subtle box-shadow with layered depth
4. **Button**: Change from "Accept" to "Allow" with a refined glass-red gradient
5. **Animation**: Keep the existing slide-up entrance but adjust from `y: 100` to `y: 40` for a subtler, more refined entrance
6. **Copy**: Keep minimal — "We use cookies to optimize your experience." with Privacy link

### What stays the same

- Only appears on homepage, only on first visit
- Disappears permanently after clicking Allow
- Triggers device profiling for performance optimization (high/medium/low tier)
- All performance tier logic in `PerformanceContext.tsx` remains untouched
- localStorage persistence via `alchemy-cookie-consent` key

