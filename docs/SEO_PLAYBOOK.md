# SEO Playbook: alchemylabs.in

Written 2026-09-27. The owner reported that Google isn't showing the site. The code
side is now in order. What still keeps the site out of results is off-site: Google
has never been told the site exists (no Search Console property, no sitemap
submitted) and almost nothing links to it. Sections 2 and 3 cover that.

---

## 1. What the SEO pass changed (code)

| Area | State |
|---|---|
| `app/sitemap.ts` | Lists every public route: `/`, `/services`, `/work`, `/about`, `/contact`, `/aashrith`, `/eva`, `/privacy`, `/terms`, the 12 `/services/studio/<offer>` pages and the 5 `/services/<product>` pages. Leaves out `/admin`, `/journal` and the legacy portfolio slugs. Includes `changeFrequency` and priorities. |
| `app/robots.ts` | Allows `/`, disallows `/admin` and `/journal`, points to `https://alchemylabs.in/sitemap.xml`. |
| noindex | Only `/admin/*` (new `app/admin/layout.tsx`) and `/journal/*` (new `app/journal/layout.tsx`, so posts are covered too). No public page is noindex. |
| Canonicals + titles + descriptions | Every editable public route goes through `pageMetadata()` in `lib/seo.ts`: a canonical, a unique title in the form "Page · Alchemy Labs" (under 60 chars), a 140-160 char description with no prices and no reply-time promises, plus Open Graph and Twitter cards that include the 1200x630 image. Before this, any page with its own `openGraph` block silently dropped the share image. The root `canonical: '/'` was removed because pages without their own canonical inherited it and pointed at the homepage. |
| Legacy slugs | `/AashrithGadePortfolio` → `/aashrith` and `/EvaDoshiPortfolio` → `/eva` are now permanent (308) redirects in `next.config.js`. |
| HTTPS | `Strict-Transport-Security: max-age=63072000; includeSubDomains; preload` is set on every route. The www → apex 308 was already in place. |
| Structured data | The root layout carries Organization and WebSite (`@graph` with `@id` references). `/services` has BreadcrumbList, ProfessionalService with an OfferCatalog of the three pillars and their offers, and FAQPage. Studio offer pages have BreadcrumbList, Service and FAQPage. Product pages have BreadcrumbList and Service. About, Work, Contact, Privacy, Terms and Eva have BreadcrumbList, and `/eva` also has Person. **No prices appear in any schema.** `stripPrices()` removes them, e.g. "from $199" in the services FAQ. |
| Headings | About had no `<h1>`. The hero line is now the `<h1>` and the founder names are `<h2>`. Work tiles went from `<h3>` to `<h2>` (the page jumped h1 → h3). Only tags changed; classes and visuals are the same. |
| Alt text | The founder portraits on /about now have real alt text. All other images already had alt text, or `alt=""` where the image is decorative. |
| Internal links | Services pillars have a "See the work" CTA. Work links to Services ("HOW WE WORK →"). |
| Images | 21 PNG files of 450KB-1.9MB were converted to WebP (60-98% smaller) and every reference was repointed. Files that frozen or other-owned code still references were re-encoded in place under the same name. |
| Search Console tag | `verification.google` is emitted only when `NEXT_PUBLIC_GSC_VERIFICATION` is set. |
| OG image | `public/og-image.png` (1200x630) is the default card on every page. |

---

## 2. Google Search Console, step by step

1. Go to https://search.google.com/search-console and sign in with the Google
   account that will own the site long-term.
2. **Add property → Domain** → enter `alchemylabs.in` (no https, no www). A Domain
   property covers apex, www, http and https in one.
3. Google shows a **TXT record** (`google-site-verification=...`). In the DNS panel of
   the domain registrar (wherever alchemylabs.in's nameservers live), add:
   - Type `TXT`, Host/Name `@`, Value = the string Google gave, TTL default.
4. Wait 5-60 minutes, then click **Verify**. If it fails, check with
   `dig TXT alchemylabs.in +short` and try again later. DNS can take a few hours.
   - Alternative (only if DNS access is impossible): add a **URL-prefix** property for
     `https://alchemylabs.in`, choose "HTML tag", copy the `content="..."` value into
     the Vercel env var `NEXT_PUBLIC_GSC_VERIFICATION`, and redeploy. The site already
     emits the tag when the var is set.
5. **Sitemaps** (left menu) → enter `sitemap.xml` → Submit. The full URL is
   `https://alchemylabs.in/sitemap.xml`. The status should read "Success" with
   about 26 discovered URLs.
6. **URL Inspection** (search bar at the top). For each of these URLs, paste it, wait
   for the result, then click **Request indexing**:
   - `https://alchemylabs.in/`
   - `https://alchemylabs.in/services`
   - `https://alchemylabs.in/work`
   - `https://alchemylabs.in/about`
   - `https://alchemylabs.in/contact`
   Google limits this to roughly 10 requests a day. Do the five above first, then
   `/aashrith`, `/eva` and a few `/services/studio/...` pages over the next days.
7. In **URL Inspection → View tested page → Screenshot**, confirm Google renders
   real content and not just the loader.
8. Check back after 3-7 days:
   - **Pages** report: "Indexed" should rise. Read the "Why pages aren't indexed" reasons.
     "Excluded by noindex" should list only /journal and /admin.
   - **Enhancements**: Breadcrumbs and FAQ should show valid items.
   - Search `site:alchemylabs.in` on Google to see what is indexed.
9. Also add the site to **Bing Webmaster Tools** (https://www.bing.com/webmasters).
   It can import the property from Search Console in one click, and Bing feeds
   DuckDuckGo, Yahoo and ChatGPT search.

Brand-name searches ("alchemy labs") are crowded with other companies, so expect
"Alchemy Labs Mumbai" or "alchemylabs.in" to rank first. Links from the sources
below are what move the plain brand query.

---

## 3. Backlink plan (12 weeks, about 2-3 hours a week)

Rules: use real profiles only, list only work that actually exists, make no ranking
or "top agency" claims, and never buy links. Use one consistent NAP (name, city,
URL) everywhere: **Alchemy Labs · Mumbai, India · https://alchemylabs.in**.

1. **Week 1: owned profiles.** Complete the LinkedIn company page
   (linkedin.com/company/brandalchemylabs) with the website field set to
   https://alchemylabs.in, the about text, and Mumbai as the location. Set the
   Instagram bio link (@brandalchemy._) and the YouTube channel "Links" to the site.
   Both founders add the site to their personal LinkedIn "Contact info" and
   "Featured" sections.
2. **Week 2: founder portfolios.** Make /aashrith and /eva link back to `/` and
   `/work` in visible copy. Add alchemylabs.in to every founder bio: X, Read.cv,
   Contra, Linktree if used, and email signatures.
3. **Week 3: design communities.** Create Behance and Dribbble studio profiles.
   Upload 3-5 real projects from /work, each with its honest "concept" or
   "self-initiated" label, and link every project description to alchemylabs.in/work.
4. **Week 4: B2B directories (part 1).** Create free profiles on **Clutch**
   (clutch.co) and **GoodFirms** (goodfirms.co): services, Mumbai, website, and
   portfolio items. Reviews come later and only from real clients.
5. **Week 5: B2B directories (part 2).** Create **DesignRush**
   (designrush.com/agency), **Sortlist**, and **The Manifest** (created through the
   Clutch profile). Add Google Business Profile only if there is a real service
   address. Otherwise choose "service-area business" with Mumbai as the area.
6. **Week 6: award and gallery submissions.** Submit the site to **CSS Design
   Awards** (cssdesignawards.com, free "Website of the Day" review), **Awwwards**
   (paid submission, budget permitting), plus free galleries such as Godly,
   Minimal Gallery, Land-book and SiteInspire. Each listing links back even
   without a win.
7. **Week 7: Product Hunt.** Launch one concrete, free artifact, for example the
   prompt library from the Content Engine offer or a brand-audit checklist, as a
   Product Hunt "product" hosted on alchemylabs.in. Line up the maker comment and
   the first 10 supporters in advance. Launch Tuesday-Thursday at 12:01am PT.
8. **Week 8: guest essays (part 1).** Pitch two essays from real opinions, such as
   "Taste is the moat: why AI raises the bar for brand judgment" or "Generate wide,
   cut hard: an AI production workflow". Targets: afaqs!, Exchange4media, Social
   Samosa, The Brand Called You, Medium publications (UX Collective, Bootcamp),
   and LinkedIn newsletters. Each essay carries a byline bio with the site link.
9. **Week 9: podcasts.** Pitch 10 Indian founder, marketing and design podcasts
   (e.g. The Marketing Room, Design Dialogues, D2C-focused shows, college E-Cell
   podcasts) with one sharp angle, "How a two-person studio ships campaign imagery
   with AI", plus a one-line bio. Show notes usually include a link.
10. **Week 10: client credit links.** For every delivered client project, ask in
    the handover email for a "Brand/Campaign by Alchemy Labs" credit in the site
    footer, press page or launch post, linking to alchemylabs.in. Add this as a
    line in the proposal template so it is agreed up front.
11. **Week 11: guest essays (part 2) and community answers.** Publish the second
    essay. Answer 5 genuine questions on Reddit (r/branding, r/IndianStartups) and
    Quora about AI brand production. Link only where it truly helps, usually to a
    specific /services/studio page.
12. **Week 12: review and repeat.** In Search Console → Links, check which
    referring domains registered. Chase any directory profile still "pending",
    ask the first two clients for a Clutch or GoodFirms review, then repeat weeks
    8-11 as a monthly cycle (one essay, two podcast pitches, one credit link).

Track each link in a simple sheet: date, source, URL, dofollow or nofollow, status.
Around 20-30 real referring domains in 3 months is a strong result for a new studio
site.

---

## 4. Maintenance checklist (each release)

- New public route: add it to `app/sitemap.ts` and give it `pageMetadata()` plus a
  breadcrumb.
- Descriptions: 140-160 chars, specific, no prices, no "reply in X hours", no
  unverifiable claims.
- One `<h1>` per page, and headings never skip a level.
- Journal launch: remove `app/journal/layout.tsx`, the robots flag in
  `app/journal/page.tsx`, the `/journal` disallow in `app/robots.ts`, and add the
  posts to the sitemap.
