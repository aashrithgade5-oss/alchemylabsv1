

## Contact Page Overhaul — Bulletproof Calendly, Working Emails, Premium 2026 Aesthetic

### Problem Summary

1. **Calendly still broken**: `window.open('', '_blank')` opens a blank tab synchronously, then tries to set `location.href` after async calls — but many browsers (especially Safari, mobile Chrome) still block or ignore this pattern. The blank tab often stays blank or gets closed by the browser.
2. **Email buttons not working**: `mailto:` links with `target="_blank"` don't work reliably — `mailto:` should NOT use `target="_blank"` as it confuses browsers. The emails need to either open natively or show copyable text.
3. **Design needs elevation**: The heading, form inputs, and CTA button need a more premium 2026 aesthetic with micro-animations.

---

### Solution Architecture

#### 1. Calendly — Bulletproof Approach (Critical Fix)

Abandon the `window.open` pattern entirely. Instead:

- The "Schedule a Meeting" button submits the form data via async calls in the background
- On success, the success screen shows immediately with a prominent, direct `<a href="https://calendly.com/alchemylabs-work/30min" target="_blank">` link — a standard anchor tag that the user clicks themselves
- This is the same pattern used by Typeform, HubSpot, and Calendly's own embed — no popup blocker issues because the user initiates the navigation directly
- The success screen copy reads: **"Done! We'll get back to you."** with a prominent **"Book Your Call"** button linking to Calendly

```text
Flow:
  1. User fills form, clicks "Schedule a Meeting"
  2. Async: DB insert + edge function (show loading state)
  3. On success: Show success screen with direct Calendly link
  4. User clicks "Book Your Call" → opens Calendly (user-initiated, never blocked)
```

#### 2. Email Buttons — Revert to Reliable Pattern

- Remove `target="_blank"` from all `mailto:` links (this is the bug — mailto should just be `<a href="mailto:...">`)
- Show the actual email address as small text below each button label so users can copy it if their mail client doesn't open
- WhatsApp button: keep as-is (works fine with `target="_blank"`)

#### 3. Heading — Premium Typography

Replace the current heading with:
```text
15 MIN STRATEGY CALL
First one for free.
```
- Line 1: All caps, `font-mono`, `tracking-[0.25em]`, `text-porcelain/60` — editorial label style
- Line 2: `font-display`, `italic`, `text-alchemy-red` — the accent line

#### 4. CTA Button — Animated Gradient Border Glow

The "Schedule a Meeting" button gets a looping animated gradient border:
- Use a CSS `@keyframes` animation that rotates a `conic-gradient` around the button border
- Implementation: outer wrapper with rotating gradient background, inner element with solid background, creating a glowing border effect
- Colors cycle through `alchemy-red` to warm amber and back
- Subtle 3s infinite loop, `ease-in-out`

#### 5. Form Inputs — Elevated Glass Aesthetic

- Increase padding, add subtle inner shadow for depth
- Focus state: animated border glow (red pulse) instead of static color change
- Rounded corners from `rounded-lg` to `rounded-xl` for softer modern feel

#### 6. Button Micro-Animations

- All contact method buttons (WhatsApp, Email, Aashrith, Eva): subtle `scale(1.02)` on hover with `transition-transform`
- Social icons: gentle `rotate(5deg)` micro-tilt on hover
- Form fields: smooth label float animation on focus

#### 7. Success Screen — Better Copy

```text
Done! We'll get back to you.
Your brief is in our hands. Book your free strategy call below.
```
With a prominent "Book Your Call" Calendly button and secondary "Back to Home" link.

---

### Technical Details

**Files modified: 2**

**`src/components/Contact.tsx`** (full overhaul):
- Remove `window.open` logic from `handleSubmit` — just do the async DB + email calls, then set `isSubmitted = true`
- Fix all `mailto:` links: remove `target="_blank"`, add visible email text below button labels
- Update heading to split caps/italic layout
- Wrap submit button in animated gradient border container
- Update success screen copy and make Calendly link a standard `<a>` tag
- Add `motion.div` hover animations to contact method buttons

**`src/index.css`** (add keyframes):
- Add `@keyframes gradient-border-spin` for the rotating conic gradient on the CTA button
- Add `.glass-input` focus animation enhancement

### What stays the same
- All form validation logic
- Turnstile security verification
- Supabase DB insert + edge function email
- Left panel layout structure
- Social links data from Footer exports
- Service options (already clean, no emojis)

