# Patches-8 design decisions

Owner brief: rethink each element, list the alternatives, keep the one that would leave a
visitor stunned, and make every frame work on every device. This log records the
alternatives weighed for each element touched in this pass and why the winner won.
Award criteria used as the yardstick (Awwwards weighting): Design 40%, Usability 30%,
Creativity 20%, Content 10%. See `docs/AWARD-PLAYBOOK.md` for sources.

## 0. Mobile frame (P0, a bug, not a taste call)
Symptom: on iPhone the site loaded zoomed out, wiggled sideways, and showed black space on
the right.
Root causes, found with a width audit of 12 routes on iPhone SE, 13 and 15 Pro Max:
1. The preloader logo stage was 552px wide on a 320px screen. It renders first, so iOS sized
   the layout to it.
2. The ember glow behind "Every frame here was chosen by eye." extended 30vw past both edges.
3. The hero's skew moved its sticky stage about 4px past the edge.

Fix: clip each element at its own layer, and add one `overflow-x: clip` wrapper around every
page. `hidden` was rejected for the wrapper: it creates a scroll box and breaks sticky.
`html`/`body` clipping was rejected: iOS Safari ignores it.

Result: 0 overflow on all routes and all three iPhone sizes.

## 1. Footer wordmark ("not even liquid metal, looks stale")
| # | Option | Verdict |
|---|---|---|
| 1 | CSS chrome gradient + sweep (P7) | No main-thread cost, but reads as a gradient, not metal. Rejected on desktop. |
| 2 | Live LiquidMetal mounted when the footer comes into view (P6) | Real metal, but a scroll hitch from mask preprocessing. Rejected. |
| 3 | **LiquidMetal prepared at idle after load, from a half-size mask, paused until visible** | Real metal, nothing heavy on the scroll path. **Chosen (desktop).** |
| 4 | Pre-rendered liquid-metal video loop | Soft at 4K widths; the owner rejected loops in P6. |
| 5 | Animated PNG/WebP sequence | 3–6MB, compression banding on chrome. |
| 6 | SVG turbulence + specular lighting filter | Reads as plastic; filter repaints are costly on iOS. |
| 7 | Canvas 2D environment-map fake | Weeks of work to match Paper's look. |
| 8 | Text with a moving `background-clip` gradient | Flat; this is the effect the brand moved away from. |
| 9 | Static photoreal chrome render (Higgsfield) of the word | Beautiful, but frozen. Kept in reserve. |
| 10 | Remove the wordmark | Loses the signature moment. |

Phones and touch devices keep option 1 (the moving light sweep). Battery and thermals win
there.

## 2. One ALCHEMY per page
| Option | Verdict |
|---|---|
| Two giant ALCHEMYs (outlined closing band + metal footer) | Redundant; the second cheapens the first. |
| **Closing band keeps its word switcher; the footer owns the wordmark** | **Chosen.** |
| Drop the footer mark instead | The metal mark is the stronger of the two. |

## 3. Aashrith ventures: imagery
The ventures already carry real posts; generating posts would misrepresent them. What was
missing was a world for each venture. Options weighed: logo tiles, gradient cards, product
mockups, founder photos, a **cinematic key visual per venture**, video loops, 3D objects, type
posters, data visualisations, no imagery at all.

**Chosen: a cinematic key visual per venture**, a Higgsfield 21:9 still upscaled to 2K, with
parallax:
- Brand Alchemy: an obsidian monolith with molten scripture ("strategy becomes scripture").
- Ashzz.ai: a liquid-chrome network of builders ("one frontier").
- Ash Archives: an endless archive of glass plates ("the feed is the portfolio").

## 4. Motion hygiene (applies everywhere)
- Ambient motion uses CSS keyframes inside a visibility gate.
- No framer infinite loops on large layers.
- No `blur()` on big layers.
- Shaders mount once and pause.

The venture number glow moved from a framer loop to CSS this pass.

## Not done in this pass, and why
- Pinterest boards and Claude in Chrome research: Chrome is not connected to this cloud
  session, and Pinterest needs a signed-in browser. Web research substituted, sources in
  `AWARD-PLAYBOOK.md`.
- Your real posts stay as they are. Generated stand-ins were never put in place of real work.
