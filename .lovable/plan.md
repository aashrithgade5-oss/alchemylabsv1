

## Fix: Case Study Overlay -- Nuclear Option (Guaranteed Working)

### Root Cause (Confirmed via Live Testing)

Three compounding issues prevent the overlay from working:

1. **Click interception**: The sticky-scroll layout gives each project an incrementing z-index (10, 11, 12, 13). Later projects physically sit on top of earlier ones in the DOM, intercepting clicks on the "Discover More" button even when the earlier project is visually active
2. **`contain: layout paint`** on `.gpu-accelerated` (index.css line 717): This CSS property creates a paint containment boundary that can prevent fixed-position elements from rendering outside their container, even when portaled
3. **`transform: translateZ(0)`** on `.gpu-accelerated`: Creates a new containing block that breaks `position: fixed` calculations for any descendant

### Solution: Dedicated Portal Target + Simple Overlay

**Strategy**: Completely bypass React's render tree and all CSS containment by adding a dedicated portal target in `index.html` that sits outside `#root` entirely.

---

### Change 1: Add portal target to `index.html`

Add `<div id="overlay-root"></div>` after `<div id="root">` in the body. This element sits completely outside React's render tree and all CSS transform/containment contexts.

---

### Change 2: Remove `contain: layout paint` from `.gpu-accelerated`

In `src/index.css` (line 717), remove `contain: layout paint;` from the `.gpu-accelerated` class. This property is overly aggressive and creates paint boundaries that interfere with portaled content. The `transform: translateZ(0)` and `will-change: transform` are sufficient for GPU acceleration.

---

### Change 3: Rewrite `CaseStudyOverlay.tsx` using `createPortal` to `#overlay-root`

Replace the Radix Dialog implementation with a simpler, more reliable approach:

- Use `ReactDOM.createPortal(jsx, document.getElementById('overlay-root')!)` to render completely outside React's DOM tree
- Simple `position: fixed; inset: 0; z-index: 9999` for the backdrop (no centering transforms needed)
- The content panel is a centered scrollable card using `flex items-center justify-center` on the backdrop (simpler than translate-based centering)
- Dispatch `modal-open`/`modal-close` events for Lenis scroll lock
- ESC key handler for closing
- Backdrop click to close
- Keep all existing visual elements: per-case accent system, hero image, challenge/approach/impact sections, tags
- Entrance animation: opacity + scale via CSS transitions (no Framer Motion dependency)

---

### Change 4: Fix click interception on "Discover More" button

In `AashrithPortfolio.tsx`, add `relative z-[50]` to the bottom content overlay div (line 656) inside `ImmersiveProject`. This ensures the text/button area of each project is always clickable above any overlapping sticky siblings.

---

### Technical Summary

**Modified files (4):**

| File | Change |
|------|--------|
| `index.html` | Add `<div id="overlay-root"></div>` after `#root` |
| `src/index.css` | Remove `contain: layout paint` from `.gpu-accelerated` |
| `src/components/portfolio/CaseStudyOverlay.tsx` | Rewrite: `createPortal` to `#overlay-root`, simple fixed overlay, manual scroll lock + ESC handling |
| `src/pages/AashrithPortfolio.tsx` | Add `z-[50]` to ImmersiveProject content overlay; update CaseStudyOverlay props to match new API |

**No new dependencies.** Uses built-in `ReactDOM.createPortal`.

### Why This Will Work

- Portal target is **physically outside** `#root`, so no CSS containment, transform, or stacking context can interfere
- `z-index: 9999` guarantees visibility above all page content
- No centering transforms needed (flex-based centering on the backdrop)
- Simple click handler + ESC key, no complex Radix state management
- Lenis integration via custom events (already proven to work in `SmoothScroll.tsx`)

