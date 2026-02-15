

## Fix: Case Study Overlay Positioning & Final Polish

### Root Cause

The `CaseStudyOverlay` is rendered inside `CreativeProjectsSection` (line 808), which lives inside a `div` with `height: 400vh` for the sticky-scroll effect. Even though the overlay uses `position: fixed`, the sticky parent and scroll container create a stacking context that breaks viewport-relative positioning. The overlay renders at the wrong scroll position instead of centered on screen.

### Fix 1: Portal-Based Overlay Rendering

**File: `src/components/portfolio/CaseStudyOverlay.tsx`**

Wrap the entire overlay output in `ReactDOM.createPortal(jsx, document.body)`. This ensures the overlay renders at the document root, completely outside the sticky-scroll container hierarchy. It will always be centered on the viewport regardless of scroll position.

Additionally, dispatch `modal-open` and `modal-close` custom events so the Lenis smooth scroll system (in `SmoothScroll.tsx`, lines 100-103) pauses/resumes correctly. This provides proper scroll lock.

### Fix 2: Move State to Page Level

**File: `src/pages/AashrithPortfolio.tsx`**

Move `activeCaseStudy` state from `CreativeProjectsSection` up to the main `AashrithPortfolio` component. Render the `CaseStudyOverlay` at the page root level (after all sections, before the closing `</div>`), completely outside any section containers. Pass `setActiveCaseStudy` down to `CreativeProjectsSection` as a prop.

This is the belt-and-suspenders approach: portal handles the DOM placement, and top-level rendering ensures no stacking context interference.

### Fix 3: Overlay Visual Upgrades

**File: `src/components/portfolio/CaseStudyOverlay.tsx`**

- Wider panel: Change `max-w-2xl` to `max-w-4xl` for a 16:9 cinematic proportion
- Larger close button: `w-11 h-11` with `X` icon at `w-5 h-5`, prominent glass styling with hover glow
- Hero image: Keep `aspect-[16/9]` with a subtle Ken Burns entrance (scale 1.08 to 1.0)
- Accent glow line: Make it `h-[2px]` instead of `h-px` for more visibility
- All content stagger delays stay

### Fix 4: Lenis Integration for Scroll Lock

**File: `src/components/portfolio/CaseStudyOverlay.tsx`**

In the `useEffect` for body overflow, also dispatch custom events:

```text
if (isOpen) {
  document.body.style.overflow = 'hidden';
  document.dispatchEvent(new Event('modal-open'));
} else {
  document.body.style.overflow = '';
  document.dispatchEvent(new Event('modal-close'));
}
```

This tells Lenis (SmoothScroll.tsx lines 100-103) to call `lenis.stop()` / `lenis.start()`, giving a proper scroll lock that works with the smooth scroll system.

---

### Technical Summary

**Modified files (2):**

1. **`src/components/portfolio/CaseStudyOverlay.tsx`**:
   - Import `createPortal` from `react-dom`
   - Wrap entire `AnimatePresence` output in `createPortal(..., document.body)`
   - Dispatch `modal-open` / `modal-close` events for Lenis scroll lock
   - Widen modal to `max-w-4xl`
   - Enlarge close button (`w-11 h-11`) with stronger glass styling
   - Thicken accent glow line to `h-[2px]`

2. **`src/pages/AashrithPortfolio.tsx`**:
   - Move `activeCaseStudy` state from `CreativeProjectsSection` to `AashrithPortfolio`
   - Pass `onDiscover` callback and `activeCaseStudy` as props to `CreativeProjectsSection`
   - Render `CaseStudyOverlay` at the page root level (after `PortfolioFooter`, before closing `</div>`)
   - `CreativeProjectsSection` no longer manages overlay state or renders the overlay

**No new dependencies.** `createPortal` is built into `react-dom`.

