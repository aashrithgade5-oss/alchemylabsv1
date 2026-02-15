

## Fix: Pin Cookie Consent to Hero Viewport + Lock Scroll

The cookie consent dialog is rendering inside the `SmoothScroll` (Lenis) container, which interferes with `fixed` positioning. Users can scroll past the hero while the dialog is loading, causing the blur and dialog to appear mid-page instead of over the hero.

---

### Changes

**1. Move CookieConsent outside SmoothScroll (`src/App.tsx`)**

Move `<CookieConsent />` from inside `<SmoothScroll>` to after it, as a sibling -- so its `fixed inset-0` positioning works against the true browser viewport, not the Lenis scroll container.

**2. Lock scroll while dialog is visible (`src/components/CookieConsent.tsx`)**

- When the dialog becomes visible, set `document.body.style.overflow = 'hidden'` and pause Lenis (if available via window) to prevent any scrolling
- On accept/dismiss, restore `overflow` and resume Lenis
- This ensures the user sees the dialog pinned over the hero section -- they physically cannot scroll away

**3. Reduce appearance delay**

- Change the `setTimeout` delay from `1200ms` to `600ms` so the dialog appears faster, before the user has time to scroll
- This makes the "first impression" feel more intentional and immediate

**4. Faster accept flow**

- Reduce the exit animation from 500ms to 300ms for a snappier dismiss
- Keep the calibration toast compact and non-blocking

---

### Technical Details

**Files modified (2):**
- `src/App.tsx` -- Move `<CookieConsent />` outside of `<SmoothScroll>` to be a direct child of `<PageAtmosphereProvider>`
- `src/components/CookieConsent.tsx` -- Add scroll-lock (`overflow: hidden` + Lenis pause) when dialog is visible, reduce delay to 600ms, reduce exit animation to 300ms, clean up scroll-lock on unmount/accept

