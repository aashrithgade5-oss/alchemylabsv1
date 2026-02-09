

## Fix: Red-Room Background Visible Behind Contact Form

### Problem
The `Contact` component applies the CSS class `section-gradient`, which creates a `::before` pseudo-element with a fully opaque dark gradient (`linear-gradient(180deg, alchemy-black -> charcoal-ui -> alchemy-black)`). This sits on top of the `contact-bg.png` image and completely obscures it, resulting in a black background instead of the red-room aesthetic.

### Solution

**1. Update `src/components/Contact.tsx` (line 128)**
- Remove the `section-gradient` class from the Contact section wrapper
- Also remove the inner `bg-gradient-radial` div (line 129) since it adds another dark overlay
- Replace with a transparent background so the parent `ContactPage` background image shows through

Change:
```tsx
<section id="contact" className="relative py-20 md:py-32 overflow-hidden section-gradient">
  <div className="absolute inset-0 bg-gradient-radial from-deep-crimson/8 via-transparent to-transparent" />
```
To:
```tsx
<section id="contact" className="relative py-20 md:py-32 overflow-hidden">
```

**2. Update `src/pages/ContactPage.tsx` (lines 105-120)**
- Replace the current `contact-bg.png` asset with the newly uploaded red-room image
- Increase visibility: reduce blur to `blur-[12px]`, bump opacity to `opacity-70`
- Adjust gradients for smoother hero-to-form and form-to-footer transitions
- Add a subtle warm overlay instead of heavy vignette

The background layer becomes:
```tsx
<div className="absolute inset-0 pointer-events-none">
  <img
    src={contactBg}
    alt=""
    aria-hidden
    className="w-full h-full object-cover blur-[12px] opacity-70 scale-110"
  />
  {/* Top merge into hero */}
  <div className="absolute top-0 inset-x-0 h-40 bg-gradient-to-b from-background to-transparent" />
  {/* Bottom merge into footer */}
  <div className="absolute bottom-0 inset-x-0 h-40 bg-gradient-to-t from-background to-transparent" />
  {/* Gentle depth vignette */}
  <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at 50% 50%, transparent 40%, hsl(var(--background) / 0.4) 90%)' }} />
</div>
```

**3. Copy the new image asset**
- Copy `user-uploads://image-16.png` to `src/assets/contact-bg.png` (replacing existing)

### Why This Fixes It
The `section-gradient::before` pseudo-element was painting a fully opaque dark background at `z-index: 0`, sitting directly above the background image layer from `ContactPage`. Removing this class makes the Contact component transparent, allowing the red-room image to show through with tasteful blur and gradient blending.

