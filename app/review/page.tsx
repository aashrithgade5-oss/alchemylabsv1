import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';

export const metadata: Metadata = { title: 'Review', robots: { index: false, follow: false } };

type Item = { what: string; look: string; href: string };
const SECTIONS: { title: string; items: Item[] }[] = [
  {
    title: 'Patches-8 · Fit on every phone, real liquid metal',
    items: [
      { what: 'iPhone fit (the zoom-out bug)', look: 'Open on your iPhone: no zoom-out, no sideways wiggle, no black strip on the right. Audited on iPhone SE, 13 and 15 Pro Max, every route.', href: '/' },
      { what: 'Footer: true liquid metal', look: 'On desktop the ALCHEMY wordmark is live liquid metal again, prepared while the page is idle so reaching it never stutters. Phones get chrome with a moving light sweep.', href: '/services#site-footer' },
      { what: 'One ALCHEMY per page', look: 'The outlined ALCHEMY above the footer is gone; the closing band keeps its word cycler.', href: '/about#site-footer' },
      { what: 'Aashrith · ventures', look: 'Key visuals removed; the post marquees are back as an editorial contact sheet (staggered rhythm, index numerals, pauses off screen).', href: '/aashrith#ventures' },
      { what: 'Aashrith · light mode', look: 'Toggle the sun/moon: hero, ventures, timeline plates and footer all convert (paper ground, ink type, no black bands).', href: '/aashrith' },
      { what: 'Aashrith · role plates', look: 'Generated photos replaced by hand-built typographic plates (monogram, grid, proof line), dark and light.', href: '/aashrith#journey' },
    ],
  },
  {
    title: 'Patches-7 · Performance + three brands',
    items: [
      { what: 'Footer, no lag', look: 'ALCHEMY is now liquid chrome built from CSS (a light sweep under the wordmark): no WebGL, nothing on the main thread. Off-screen marquees pause.', href: '/services#site-footer' },
      { what: 'Aashrith · every role has a plate', look: 'Small monochrome plates beside each job (placeholders, swap in lib/portfolio.ts). Grey liquid-glass ground kept and refined.', href: '/aashrith#journey' },
      { what: 'Aashrith · glass name + Let\u2019s talk', look: 'The footer name is a pane of glass; a "Let\u2019s talk" pill stays at the top on every scroll.', href: '/aashrith#connect' },
      { what: 'Eva · her own brand', look: 'Flat petal ink (no Alchemy metal), previous Experience restored, monochrome fluted-glass footer and an "Eva" signature.', href: '/eva#contact' },
    ],
  },
  {
    title: 'Patches-6 · Homepage',
    items: [
      { what: 'The atom, no stray dots', look: 'Scroll through "Anyone can make a thousand images now": nothing shows until the seal begins. A glass lens condenses, the orbits trace inside it, then it turns to liquid metal.', href: '/#brand-seal' },
      { what: '"For founders who can tell the difference"', look: 'Inter Bold with one Playfair italic word ("difference."), under a mono masthead.', href: '/#for-founders' },
      { what: 'Liquid-metal interludes', look: '"We make fewer things" and "Every brief is different" now sit on slow graphite liquid metal; the whole page has a soft moving drift so no stretch is flat black.', href: '/' },
      { what: 'Mumbai trimmed', look: 'Hero eyebrow, footer headline and footer line no longer name the city (it stays in SEO and legal pages).', href: '/' },
    ],
  },
  {
    title: 'Patches-6 · Footer, every page',
    items: [
      { what: 'Liquid-metal ALCHEMY', look: 'The giant wordmark is now cast in liquid chrome and rises as the page ends. The soft video loop is gone; the horizon still renders at full resolution.', href: '/services#site-footer' },
      { what: 'Editorial index + Book a call', look: 'Numbered columns on a faint grid, and a direct "Book a call" beside the headline.', href: '/about#site-footer' },
    ],
  },
  {
    title: 'Patches-6 · Work and Contact',
    items: [
      { what: 'Work hero is the work', look: 'The abstract film is gone. A contact sheet of real frames (Aether, Oakley, Dior, Genesis, Porsche) drifts behind "Proof over polish."', href: '/work' },
      { what: 'Contact hero', look: 'Brutalist calm like the 404: moving ember field, liquid atom, and three clear ways in (call, brief, WhatsApp estimate).', href: '/contact' },
      { what: 'Custom brand icons', look: 'A new icon set drawn from the atom (call, brief, message, audit, scope, build, NDA, worldwide), used across the page.', href: '/contact' },
      { what: 'What happens next', look: 'Four steps from first conversation to build, so a founder knows what writing to us starts.', href: '/contact' },
      { what: 'The conversation room', look: 'Your original two-chair image, recreated sharper in Higgsfield, behind the brief with parallax.', href: '/contact#brief' },
      { what: 'Where the doorway went', look: 'The lit doorway now sits behind "Alchemy was never about gold." on About.', href: '/about' },
    ],
  },
  {
    title: 'Patches-6 · Founder portfolios',
    items: [
      { what: 'Aashrith · The Arc of Intent', look: 'The orange background is replaced with black-and-white liquid metal, a hairline grid and drifting glass slabs.', href: '/aashrith#journey' },
      { what: 'Aashrith · footer lock-in', look: 'AASHRITH cast in liquid metal at the very bottom.', href: '/aashrith#connect' },
      { what: 'Eva · Experience + footer', look: 'The same monochrome glass ground behind Experience; EVA DOSHI in rose-tinted liquid metal in the footer.', href: '/eva#experience' },
    ],
  },
  {
    title: 'Still from Patches-5',
    items: [
      { what: '404', look: 'A large liquid atom over a dusk gradient.', href: '/this-page-does-not-exist' },
      { what: 'Nav lens (Chrome or Edge)', look: 'Scroll: the nav rim bends what passes behind it.', href: '/' },
      { what: 'Page veil', look: 'Click any nav link: a dark veil with the atom lifts off the new page.', href: '/services' },
    ],
  },
];

/**
 * Review hub (Patches-5, updated Patches-6): one place to check every upgrade. Exists on
 * `next dev` and Vercel previews only; production returns 404.
 */
export default function ReviewPage() {
  if (process.env.NEXT_PUBLIC_REVIEW !== '1') notFound();
  return (
    <main className="mx-auto max-w-4xl px-6 pb-32 pt-36 font-sans text-bone md:px-10">
      <p className="font-mono text-[10px] tracking-[0.3em] text-ember">REVIEW BUILD</p>
      <h1 className="mt-4 font-headline text-[clamp(2.25rem,5vw,3.75rem)] font-bold leading-[1.05] tracking-[-0.035em]">
        <span className="glass-type">What&rsquo;s </span>
        <span className="font-playfair font-normal italic">new</span>
      </h1>
      <p className="mt-5 font-mono text-xs tracking-wider text-bone/60">
        Commit {process.env.NEXT_PUBLIC_BUILD_SHA} on {process.env.NEXT_PUBLIC_BUILD_BRANCH}. If this commit differs from the one
        named in the chat, you are on an old copy.
      </p>
      {SECTIONS.map((s) => (
        <section key={s.title} className="mt-14">
          <h2 className="font-mono text-[11px] tracking-[0.25em] text-bone/55">{s.title.toUpperCase()}</h2>
          <ul className="mt-4 divide-y divide-bone/10 rounded-2xl border border-bone/10 bg-carbon/60">
            {s.items.map((i) => (
              <li key={i.what}>
                <Link href={i.href} className="group flex items-start justify-between gap-6 px-5 py-4 transition-colors hover:bg-bone/[0.03]">
                  <span>
                    <span className="block font-semibold">{i.what}</span>
                    <span className="mt-1 block text-sm leading-relaxed text-bone/60">{i.look}</span>
                  </span>
                  <span className="shrink-0 font-mono text-[11px] text-ember/80 group-hover:text-ember">OPEN →</span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      ))}
      <p className="mt-14 text-sm leading-relaxed text-bone/55">
        Happy with it? Reply &ldquo;yes, upload it to Vercel and make this live.&rdquo; Nothing reaches alchemylabs.in before that.
      </p>
    </main>
  );
}
