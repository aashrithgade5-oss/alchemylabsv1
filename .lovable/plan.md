

## Contact Page -- Final Polish & Immersive Overhaul

### Overview
Three targeted changes to eliminate all visual gaps, add cinematic depth, and bring the hero text to life against the video background.

---

### 1. Hero Text Readability -- Text Shadow + Localized Backdrop

**File: `src/pages/ContactPage.tsx`**

Add a text-shadow to the hero headline and subtitle for contrast against the bright video, plus a soft radial backdrop glow behind the text container:

- On the text container (line 54), add an inline style with a radial background glow:
  ```
  background: radial-gradient(ellipse at 50% 50%, rgba(10,10,11,0.5) 0%, transparent 70%)
  ```
- On the h1 (line 69), add `style={{ textShadow: '0 2px 40px rgba(0,0,0,0.6)' }}`
- On the subtitle paragraph (line 78), add `style={{ textShadow: '0 1px 20px rgba(0,0,0,0.5)' }}`

---

### 2. Ken Burns Parallax on Contact Background Image

**File: `src/pages/ContactPage.tsx`**

Convert the static `<img>` for `contactBg` into a `motion.img` with scroll-driven scale animation:

- Add a new `useRef` for the contact form section and a second `useScroll`/`useTransform` to drive a slow scale from 1.0 to 1.15 as user scrolls through
- Apply `motion.img` with `style={{ scale: bgScale }}` instead of static `scale-105` class
- This creates a subtle Ken Burns zoom as the user reads the form

---

### 3. Eliminate All Gaps Between Sections

**File: `src/pages/ContactPage.tsx`**

- Remove `pb-24` from the hero section (line 25) -- replace with `pb-0` so there's zero gap between hero and contact form
- On the contact form section (line 106), add negative top margin: `className="relative overflow-hidden -mt-16"` to overlap slightly into the hero fade
- Increase the top gradient merge height from `h-32` to `h-48` for a longer, smoother blend
- On the outer wrapper (line 21), ensure `bg-background` has no extra padding/margin creating white space

**File: `src/components/Contact.tsx`**

- Adjust top padding: change `py-20 md:py-32` to `pt-24 md:pt-40 pb-20 md:pb-32` so the form content clears the overlap zone

---

### 4. Performance & Animation Optimizations

**File: `src/pages/ContactPage.tsx`**

- Add `will-change: transform` to the video motion div for GPU acceleration
- Add `loading="eager"` to the contactBg image since it's above the fold of its section
- Reduce the gradient orb blur from `blur-[120px]` to `blur-[80px]` on mobile via a responsive class for GPU savings

---

### Technical Summary

Files modified:
- **`src/pages/ContactPage.tsx`** -- hero text shadows, radial backdrop, Ken Burns scroll effect on bg image, section gap removal, performance attributes
- **`src/components/Contact.tsx`** -- adjusted top padding for seamless section overlap

