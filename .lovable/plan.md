

## Fix: Case Study Overlay Using Radix Dialog

### Root Cause

The current custom portal + `position: fixed` + `inset-0` + `flex items-center justify-center` approach is broken by the `.gpu-accelerated` class in `index.css` (line 714), which applies `transform: translateZ(0)` to the page wrapper in `App.tsx`. CSS transforms create new containing blocks that break `position: fixed` positioning. Additionally, the manual scroll lock via `body.style.overflow = 'hidden'` does not stop Lenis's RAF-based scroll loop, allowing users to scroll while the modal is "open."

### Solution: Rebuild Using Radix Dialog

Replace the custom portal implementation with Radix Dialog primitives (`@radix-ui/react-dialog`), which are already installed and proven to work in this project. Radix Dialog handles:

- **Portaling**: Renders content outside all stacking contexts via its own portal
- **Scroll lock**: Natively prevents background scroll (works with any scroll system)
- **Centering**: Uses `fixed left-[50%] top-[50%] translate-x/y-[-50%]` which is immune to parent transforms
- **Focus trap + ESC key**: Built-in accessibility
- **Animation**: Compatible with Tailwind `animate-in`/`animate-out` classes

### Changes

**File 1: `src/components/portfolio/CaseStudyOverlay.tsx`** -- Complete rewrite

- Remove `createPortal`, manual scroll lock effects, and manual ESC key handler
- Use `Dialog` (controlled via `open`/`onOpenChange`), `DialogPortal`, and `DialogOverlay` from Radix
- Custom `DialogOverlay` with `backdrop-filter: blur(16px)` + dark overlay for depth-of-field
- Custom `DialogContent` (not the default UI one) positioned at viewport center using `fixed left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%]`
- Content panel: `max-w-4xl w-[95vw] max-h-[85vh] overflow-y-auto rounded-2xl`
- Keep all existing visual elements: per-case accent system, hero image with Ken Burns, challenge/approach/impact sections, tags
- Prominent close button: `w-11 h-11` glass pill at top-right with `z-[100]`
- Add `DialogTitle` (visually hidden for accessibility) to satisfy Radix requirements
- Lenis integration: dispatch `modal-open`/`modal-close` events in `useEffect` for Lenis stop/start as a secondary safety measure

**File 2: `src/pages/AashrithPortfolio.tsx`** -- Minor update

- Update the `CaseStudyOverlay` usage: change `isOpen` prop to `open`, and `onClose` to `onOpenChange`
- The state management stays at the page root level (already correct)

### Visual Appearance (Unchanged)

The overlay will look and feel identical to the current design:
- Dark glass background: `rgba(12,12,12,0.97)` with `backdrop-filter: blur(40px)`
- Per-case thematic accents (gold/silver/purple/orange)
- Accent glow line at top
- Ken Burns hero image entrance
- Staggered content reveal (using CSS animation delays)
- `z-50` (Radix default) -- high enough to sit above everything

### What This Fixes

1. Modal will always appear centered on the viewport regardless of scroll position
2. Background scroll will be locked (Radix handles this natively + Lenis stop as backup)
3. ESC key and backdrop click close will work reliably
4. No stacking context interference from `.gpu-accelerated` transforms
5. Proper accessibility (focus trap, aria attributes)

