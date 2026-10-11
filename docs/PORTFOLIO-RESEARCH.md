# Portfolio research (Patches-7, 2026-10-11)

What the current crop of strong personal / strategist portfolios do, and how each finding
landed on the two founder pages. Sources at the end.

## Findings
1. **One-line positioning at the top.** The best strategist sites say who and what in a
   single line before anything else. (Both heroes already do; kept.)
2. **Three or four flagship case studies, role named in each,** told as
   Context → Strategy → Execution → Impact. (Aashrith: Creative Projects + the open
   Studio186 case study; Eva: Brand Alchemy work.)
3. **The next step visible on every scroll position.** → Aashrith gets a fixed
   "Let's talk" pill beside the theme toggle; Eva keeps "Start a conversation".
4. **Whitespace and restraint; the content is the hero.** → Role plates are small,
   monochrome and secondary to the copy, so the page reads well with placeholders and
   gets better, not busier, when real photos land.
5. **Editorial-first, quiet luxury** for fashion/luxury positioning (Margiela, Valentino,
   Jacquemus direction). → Eva: flat petal-white ink, Playfair signature, monochrome
   fluted-glass footer. No metallic gradients, no liquid metal.
6. **Micro-animation and brutalist authenticity** are the 2025-26 award-site through-line.
   → Aashrith: graphite liquid-glass ground, hairline index grid, scroll-lit timeline.

## Three brands, three materials
| | Alchemy Labs | Aashrith Gade | Eva Doshi |
|---|---|---|---|
| Material | liquid metal + ember light | graphite + liquid glass | fluted glass imagery, rose ink |
| Type | Inter Bold `.glass-type` + one Playfair word | Inter + Geist Mono index | Inter + Playfair signature, flat `.eva-ink` |
| Footer lock-in | ALCHEMY in liquid metal | name as a pane of glass (`.glass-letter`) | "Eva" signature + DOSHI |

## Swapping in real photos later
- Aashrith role plates: `lib/portfolio.ts` → `AG_MEDIA.arcAlchemy / arcCipla / arcVelocity /
  arcS8ul` (and `deorhiCourtyard` for Studio186). Any 4:5 image works; plates stay grey
  until hover.
- Eva: `src/data/evaData.ts` → `evaMedia`.

## Sources
- B12, best portfolio examples 2026: https://www.b12.io/resource-center/website-design/12-of-the-best-portfolio-website-examples-to-inspire-you-in-2026.html
- Colorlib, portfolio design trends: https://colorlib.com/wp/portfolio-design-trends/
- Awwwards, portfolio inspiration: https://www.awwwards.com/inspiration/about-portfolio-website
- Framer, marketing portfolio examples: https://www.framer.com/ja/blog/marketing-portfolio-examples/
- Really Good Designs, marketing portfolios: https://reallygooddesigns.com/marketing-portfolio-examples/
- Lovable, content strategist template (case-study structure): https://lovable.dev/templates/websites/portfolio/compound-content-strategist-portfolio-website-template
- Redefine Web, luxury fashion web trends 2026: https://redefineweb.com/blog/luxury-fashion-ecommerce-web-design-trends-2026/
