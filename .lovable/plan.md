

## Aashrith Portfolio -- Final Fixes & Polish

### Issues Identified

1. **Case Study Overlay is a right-side panel** -- User wants it centered with shallow depth-of-field background blur, scrollable, thematically styled per case
2. **Ghost numbers (01-04) invisible** -- Currently `text-white/[0.03]` opacity, needs red gradient tint
3. **"Discover More" button positioned wrong** -- Currently bottom-right in a flex row, should be pinned bottom-left
4. **Case study theming** -- Each case should have its own color accent (gold for Aether, monochrome for Genesis, purple/gold for Dior, orange for Oakley)
5. **Ventures section Sequentian** needs more atmospheric depth before the cases begin
6. **Remaining section gaps** between Ventures and Creative Projects intro

---

### Fix 1: Redesign CaseStudyOverlay as Centered Modal

Complete rewrite of `src/components/portfolio/CaseStudyOverlay.tsx`:

- **Layout**: Centered modal (`max-w-2xl`, `max-h-[85vh]`, scrollable) instead of right-side panel
- **Backdrop**: `backdrop-filter: blur(16px)` with dark overlay for shallow depth-of-field effect
- **Animation**: Scale from 0.95 + fade in (not slide from right)
- **Per-case theming**: Accept an optional `accentColor` prop that tints the divider, process step badges, and section headers
- **Close button**: Top-right corner of the modal card, glass pill style
- **Content improvements**: Larger hero image, better typography hierarchy, more breathing room

Theme colors per case:
| Case | Accent | Glow |
|---|---|---|
| Aether Rituals | `rgba(212,175,55,0.8)` (gold) | `rgba(212,175,55,0.15)` |
| Genesis | `rgba(180,180,180,0.8)` (silver/mono) | `rgba(180,180,180,0.1)` |
| Dior | `rgba(168,85,247,0.8)` (purple) | `rgba(168,85,247,0.12)` |
| Oakley | `rgba(249,115,22,0.8)` (orange) | `rgba(249,115,22,0.12)` |

---

### Fix 2: Ghost Numbers with Red Gradient

In `ImmersiveProject` (line 649), change the ghost number from:
```
text-white/[0.03]
```
to a red gradient with higher visibility:
```
bg-gradient-to-b from-alchemy-red/[0.08] to-alchemy-red/[0.02] bg-clip-text text-transparent
```

---

### Fix 3: "Discover More" Button Pinned Bottom-Left

Move the "Discover More" button from the `flex justify-between` row (line 720) to sit directly below the tags, left-aligned. Remove the year from that row and place it subtly near the category eyebrow instead.

---

### Fix 4: Case Study Data -- Add Accent Colors

Update `caseStudyData` in `AashrithPortfolio.tsx` to include accent color per case. Add `accent` field to `CaseStudyData` interface.

---

### Fix 5: Ventures Section -- More Atmosphere

- Increase Sequentian variant 2 opacity from 0.10 to 0.16 (dark) / 0.09 (light)
- Add a secondary warm radial glow similar to the timeline section

---

### Fix 6: Gap Between Ventures and Creative Projects Intro

The Creative Projects section has a `bg-alchemy-black` intro block (line 770) that can create a visible seam. Add a top gradient blend layer to this intro block matching the Ventures section edge.

---

### Technical Summary

**Modified files (2):**

1. **`src/components/portfolio/CaseStudyOverlay.tsx`** -- Complete rewrite:
   - Centered modal layout instead of right-side panel
   - `CaseStudyData` interface gets `accent?: string` field
   - Backdrop with `blur(16px)` for depth-of-field
   - Scale + fade animation instead of slide
   - Per-case accent color applied to dividers, step badges, section headers, and a subtle top-border glow
   - Scrollable content area with `max-h-[85vh]`
   - Rounded-2xl glass card with noise texture feel

2. **`src/pages/AashrithPortfolio.tsx`**:
   - Ghost numbers: change from white/0.03 to red gradient (line 649)
   - "Discover More" button: move to bottom-left, standalone below tags (lines 720-755)
   - Year label: move next to category eyebrow (line 664)
   - `caseStudyData`: add `accent` field to each case
   - Ventures Sequentian: increase opacity (line 547)
   - Creative Projects intro: add top gradient blend (line 770)

**No new dependencies.**

