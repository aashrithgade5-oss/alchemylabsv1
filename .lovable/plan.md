

## Founder Portfolios Magnum Opus - Execution Plan

A complete restructuring of both founder portfolios into scroll-stopping, award-worthy experiences. This plan maximizes reuse of existing components while adding 4 new ones to deliver the full vision.

---

### What Already Exists (Reuse, Don't Rebuild)

These components are production-ready and will be reused directly:
- **MarqueeRow** -- infinite scroll with pause-on-hover, mobile horizontal scroll fallback
- **MagneticCTA** -- magnetic mouse tracking, arrow glide, primary/secondary/ghost variants
- **GlassCard** -- default/elevated/subtle/red glass variants with hover glow
- **SectionShell** -- consistent section layout with configurable padding/maxWidth
- **EyebrowLabel** -- mono uppercase tracking labels (red/white/muted)
- **LightboxModal** -- full-screen overlay with keyboard nav
- **TimelineRail** -- scroll-reactive timeline with dot pulse animation
- **BackgroundScene** -- mode-aware gradient orbs with vignette
- **AnimatedCapabilities** -- rotating glitch-text capabilities
- **BlueprintGrid / NoiseTexture** -- subtle background overlays

---

### Phase 1: New Reusable Components (4 files)

**1. `src/components/portfolio/HyperLiquidGlass.tsx`**
- Glass container with animated edge glow pulse (2s loop via box-shadow animation)
- Props: `variant` (default | hover-glow | static), `children`, `className`
- Uses backdrop-blur(24px), multi-layer gradient background, border transitions
- Hover: border warms from white/12 to red/40, box-shadow glow intensifies
- Edge glow: subtle animated red pulse on border using Framer Motion

**2. `src/components/portfolio/ParticleField.tsx`**
- Floating particles background using Framer Motion (not Canvas/WebGL)
- Props: `count` (default 30, auto-reduces to 15 on mobile), `color`, `opacity`, `speed`
- Each particle: random position, floating Y animation (random range), blur(20px)
- Performance: `will-change: transform`, reduces count on mobile, respects `prefers-reduced-motion`
- Particles are simple divs with rounded-full, gradient color, and staggered float animations

**3. `src/components/portfolio/VideoPlaceholder.tsx`**
- Aspect-ratio locked container for future video upload
- Props: `aspectRatio` (default "1/1"), `gradient`, `className`
- Renders: shimmer sweep animation (linear-gradient moving left-to-right in 2s loop)
- Background: radial gradient (configurable, default red-to-transparent)
- Center icon: subtle play button outline at low opacity

**4. `src/components/portfolio/ThoughtLeadershipCard.tsx`**
- LinkedIn post / case study showcase card
- Props: `type` (linkedin | case-study), `title`, `excerpt`, `image`, `engagement` (views/comments/shares), `onClick`
- Layout: Glass card, image top (aspect 16:9) with gradient overlay, content bottom
- Hover: scale 1.02, border glow red/40, image inside scales 1.05
- Engagement stats: mono font, small, alchemy-red/60 color

---

### Phase 2: Aashrith Portfolio Rebuild

**Current sections (7):** Hero, Thinking, Ventures, WorkGallery, Experience, Offerings, Contact

**New sections (5):** Hero, Venture Ecosystem, Thought Leadership, Career Timeline, Philosophy+CTA

The page is a complete rewrite of `src/pages/AashrithPortfolio.tsx` with this structure:

**Section 1: Hero (Hypnotic Entry)**
- ParticleField background (30 particles, red/30 opacity)
- Right side: VideoPlaceholder wrapped in HyperLiquidGlass (aspect 1:1, 40% width on desktop)
- Left side: Massive uppercase name "AASHRITH GADE" (font-black, responsive sizing from 4rem to 10rem)
- Below name: AnimatedCapabilities rotator (keep existing component)
- Subtitle: "Founder of Brand Alchemy, Ashzz.ai & Alchemy Labs"
- Technical metadata row: "Mumbai, IN . EST. 2024 . 50+ Projects"
- Scroll indicator with 3s delayed fade-in
- Layout: flex row on desktop (text left, video right), stacked on mobile

**Section 2: Venture Ecosystem (Marquee Archive)**
- Eyebrow: "VENTURES & INTELLECTUAL PROPERTY"
- Heading: "Three systems. One vision."
- 3 MarqueeRow components with placeholder image tiles (10-12 per row):
  - Row 1: Brand Alchemy tiles, speed="slow", direction="left"
  - Row 2: Ashzz.ai tiles, speed="medium", direction="right"  
  - Row 3: Alchemy Labs tiles, speed="slow", direction="left"
- Each row prefixed with a venture label card (number + name + type)
- Tiles: aspect 4:3, rounded-xl, border white/10, hover dims non-hovered siblings
- 80px vertical gap between rows

**Section 3: Thought Leadership (Proof Layer)**
- Eyebrow: "THOUGHT LEADERSHIP"
- Heading: "Systems thinking, documented."
- Subheading: "Frameworks, case studies, and strategic narratives..."
- Grid: 3 columns desktop, 1 mobile, 6 ThoughtLeadershipCard placeholders
- Mix of LinkedIn posts and case studies with placeholder images
- Stagger fade-up animation (0.08s delay each)

**Section 4: Career Timeline (Journey Validation)**
- Eyebrow: "CAREER JOURNEY"
- Heading: "From execution to architecture."
- Enhanced TimelineRail with metrics pills for each entry
- Entries include metrics (e.g., "Brands: 5+", "Reels: 20+", "Engagement: 15K+")
- The TimelineRail component will be enhanced to support a `metrics` array
- Timeline data includes videographer work, Sparsh Concept, Alchemy Labs, Cipla, S8UL, Velocity Gaming

**Section 5: Philosophy + CTA (Soft Conversion)**
- Large centered quote in Playfair Display italic: "Brands don't fail because of lack of creativity..."
- Attribution: "-- Aashrith Gade, Founder"
- Primary CTA: MagneticCTA linking to /contact ("Start a Conversation")
- Secondary link: "Download Portfolio PDF" (ghost variant, placeholder)
- Trust signals row: "NDA Available . 24h Reply . Free First Call"
- Subtle ParticleField (15 particles, low opacity) background

**Removed sections:**
- ThinkingSection (philosophy merged into final CTA)
- OfferingsSection (services already on /solutions page, removes redundancy)
- ContactSection form (CTA links to /contact page instead -- no duplicate forms)

**Kept/Enhanced:**
- PortfolioNav (keep as-is, already excellent)
- Theme toggle (keep, already working)
- BackgroundScene (keep for dark mode)
- ScrollProgress indicator in footer

---

### Phase 3: Eva Portfolio Rebuild

**Current sections (6):** Hero, Intro, Experience, Philosophy, Skills, Contact

**New sections (6):** Hero, Creative Philosophy, Venture Contributions, Client Showcase, Career Journey, Final Statement+CTA

Complete rewrite of `src/pages/EvaPortfolio.tsx`:

**Section 1: Hero (Elegant Authority)**
- Soft gradient background (red/5 to pink/5) -- no particles (cleaner than Aashrith)
- Center-aligned name: "EVA DOSHI" in font-black uppercase (same scale as current)
- Subtitles: "Co-Founder . Brand Strategist" and "Fashion x Luxury x Creative Direction"
- Tagline with pink gradient text
- Decorative SVG flourish (small circular motif below tagline)
- Scroll indicator (ChevronDown, pink-tinted)

**Section 2: Creative Philosophy**
- Large centered quote: "Strategy meets storytelling. Execution meets elegance."
- Supporting paragraph from evaData.bio.intro
- Extended intro paragraph
- Expertise tags as glass pills
- Process visualization: CONNECT -> STRATEGIZE -> DELIVER

**Section 3: Venture Contributions**
- Eyebrow: "VENTURE CONTRIBUTIONS"
- Focus heading: "Co-Founder, Brand Alchemy"
- Description of her role in Brand Alchemy infrastructure
- Single MarqueeRow (speed="slow") with placeholder images showing co-founder work
- Simpler than Aashrith's 3-row setup

**Section 4: Client Relations Showcase**
- Eyebrow: "CLIENT PORTFOLIO"
- Heading: "Fashion x Luxury Brand Collaborations"
- Grid of 4-6 brand cards (2 columns desktop, 1 mobile)
- Each card: glass container with brand name, role description, key metric
- Brands: Inorbit Mall, Bonkers Corner, Azorte, Pepe Jeans, AND
- Uses GlassCard component with subtle hover

**Section 5: Career Journey**
- Enhanced TimelineRail (same component as Aashrith)
- Entries: Alchemy Labs (Co-Founder), Dentsu (Business Development)
- Metrics focused on client relations outcomes
- Center-aligned timeline connector (pink gradient line)

**Section 6: Final Statement + CTA**
- Quote: "Excellence isn't a moment -- it's a system."
- Attribution: "-- Eva Doshi, Co-Founder"
- Primary CTA: MagneticCTA linking to /contact ("Let's Collaborate")
- Social links: Email + LinkedIn
- Trust signals: same as Aashrith
- Back to About link

**Kept/Enhanced:**
- PortfolioNav with ED logo (keep as-is)
- Theme toggle with pink accent (keep)
- ScrollProgress bar with pink gradient (keep)

---

### Phase 4: Data & Content Updates

**File: `src/data/foundersData.ts`**
- Add `metrics` field to experience entries for both founders
- Add videographer experience entry for Aashrith (Feb 2025, @hitakkshi, Sparsh Concept)
- Add brand collaboration data for Eva (Inorbit Mall, Bonkers Corner, etc.)

**File: `src/data/portfolioProjects.ts`**
- Add thought leadership entries with type field (linkedin | case-study)
- Update placeholder images to maintain proper aspect ratios

**File: `src/components/portfolio/TimelineRail.tsx`**
- Add optional `metrics` array to `TimelineEntry` interface: `{ label: string; value: string }[]`
- Render metrics as horizontal glass pills below highlights
- Add hover lift animation (-4px translateY)

**File: `src/components/portfolio/index.ts`**
- Export new components: HyperLiquidGlass, ParticleField, VideoPlaceholder, ThoughtLeadershipCard

---

### Phase 5: Polish and Performance

- All animations use `viewport={{ once: true, margin: '-100px' }}` (no re-trigger)
- All easing: `[0.22, 1, 0.36, 1]` (ease-out-expo)
- Stagger delays: cards 0.08s, list items 0.05s, timeline 0.12s
- ParticleField: auto-reduce to 15 particles on mobile
- MarqueeRow: already has mobile horizontal scroll fallback
- Images: all use `loading="lazy"`
- `prefers-reduced-motion`: skip all animations when enabled
- Hover states: cards lift -4px, border warms to red/40, images scale 1.05

---

### Technical Summary

**New files (4):**
- `src/components/portfolio/HyperLiquidGlass.tsx`
- `src/components/portfolio/ParticleField.tsx`
- `src/components/portfolio/VideoPlaceholder.tsx`
- `src/components/portfolio/ThoughtLeadershipCard.tsx`

**Modified files (5):**
- `src/pages/AashrithPortfolio.tsx` -- full rebuild (5 sections)
- `src/pages/EvaPortfolio.tsx` -- full rebuild (6 sections)
- `src/data/foundersData.ts` -- add metrics, new experience entries
- `src/components/portfolio/TimelineRail.tsx` -- add metrics support
- `src/components/portfolio/index.ts` -- export new components

**Unchanged files (reused as-is):**
- MarqueeRow, MagneticCTA, GlassCard, SectionShell, EyebrowLabel
- LightboxModal, BackgroundScene, AnimatedCapabilities
- BlueprintGrid, NoiseTexture
- App.tsx routes (paths unchanged)

