

## Contact Page Visual Overhaul

### Problem
The background image is uniformly blurred everywhere, losing its character. The form area (`glass-deep`) is too opaque (90-95% dark), blocking the background entirely. The left-column text elements lack any glass treatment, and the overall composition feels flat.

### Changes

**1. ContactPage.tsx -- Background image: clear center, vignette blur at edges**

Replace the single `blur-[12px] opacity-70` image with a two-layer approach:
- **Layer 1 (sharp):** The image at full clarity, `opacity-80`, NO blur -- this is the "character" layer
- **Layer 2 (vignette mask):** A CSS `mask-image` radial gradient that fades the edges to transparent, creating a natural vignette without blurring the center
- Edge gradients stay for hero/footer merge but are reduced in height to `h-32`
- The dark vignette overlay shifts to `hsl(var(--background) / 0.3)` at `85%` so the image breathes more

**2. Contact.tsx -- Left column: liquid-glass card treatment**

Wrap the entire left column content (the "Let's build something inevitable" heading, contact methods, social links, founder block) in a liquid-glass container:
- `backdrop-filter: blur(20px) saturate(120%)`
- `background: rgba(10, 10, 11, 0.5)` -- semi-transparent, lets background glow through
- `border: 1px solid rgba(255, 255, 255, 0.08)`
- `border-radius: 1.5rem`, padding `p-8`
- Subtle `inset 0 1px 0 rgba(255,255,255,0.06)` highlight

**3. Contact.tsx -- Form card: reduce opacity for background bleed-through**

Update the form's `glass-deep` wrapper to use a lighter variant so the red-room background shows through:
- Change class from `glass-deep` to a custom inline style:
  - `background: rgba(10, 10, 11, 0.55)` (down from 0.9)
  - `backdrop-filter: blur(24px) saturate(120%)`
  - `border: 1px solid rgba(255, 255, 255, 0.1)`
  - `box-shadow: 0 8px 32px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.06)`
- This keeps text perfectly readable while the warm red glow bleeds through the card

**4. ContactPage.tsx -- Add a subtle warm color wash**

Add a translucent red radial glow layer between the image and the content:
- `radial-gradient(ellipse at 50% 40%, rgba(220, 38, 38, 0.08) 0%, transparent 60%)` -- adds warmth without overpowering

### Technical Details

Files modified:
- `src/pages/ContactPage.tsx` -- background image styling (remove blur, add mask-image vignette, adjust gradients, add warm wash layer)
- `src/components/Contact.tsx` -- left column glass wrapper, form card opacity reduction

The `mask-image` approach uses:
```css
mask-image: radial-gradient(ellipse 70% 70% at 50% 50%, black 30%, transparent 80%);
-webkit-mask-image: radial-gradient(ellipse 70% 70% at 50% 50%, black 30%, transparent 80%);
```
This keeps the center of the image sharp and crisp while naturally fading the edges -- a cinematic vignette effect without global blur.

