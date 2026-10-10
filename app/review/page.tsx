import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';

export const metadata: Metadata = { title: 'Review', robots: { index: false, follow: false } };

type Item = { what: string; look: string; href: string };
const SECTIONS: { title: string; items: Item[] }[] = [
  {
    title: 'Higgsfield films (desktop, wider than 768px)',
    items: [
      { what: 'Work hero', look: 'The molten sculpture breathes; its reflection shimmers.', href: '/work' },
      { what: 'Contact hero', look: 'Haze drifts through the doorway light.', href: '/contact' },
      { what: 'Footer, every page', look: 'The molten horizon pulses; mist drifts. Scroll to the very bottom.', href: '/services#site-footer' },
    ],
  },
  {
    title: 'Liquid metal (Paper LiquidMetal)',
    items: [
      { what: 'The atom moment', look: 'Scroll a little: the line atom draws itself, then becomes liquid metal.', href: '/#brand-seal' },
      { what: 'Closing section', look: 'The atom beside the wordmark is molten chrome.', href: '/about#site-footer' },
      { what: '404', look: 'A large liquid atom over a dusk gradient.', href: '/this-page-does-not-exist' },
    ],
  },
  {
    title: 'Ember fields (the ShaderGradient look, no Three.js)',
    items: [
      { what: 'Homepage quote lines', look: '"Every frame here was chosen by eye." sits on a slow ember pool.', href: '/' },
      { what: 'Pay', look: 'A warm dusk wash behind the invoice card.', href: '/pay' },
      { what: 'Services steps', look: '"How engagements work" on a soft ash field.', href: '/services' },
      { what: 'Offer pages', look: 'A low dusk glow behind the glass panels.', href: '/services/studio/campaign-sprint' },
    ],
  },
  {
    title: 'Glass and motion',
    items: [
      { what: 'Nav lens (Chrome or Edge)', look: 'Scroll: the nav rim bends what passes behind it, with a calm dark tint.', href: '/' },
      { what: 'Page veil', look: 'Click any nav link: a dark veil with the atom lifts off the new page.', href: '/services' },
      { what: 'Hero word glitch', look: 'The colour split on each word swap is now a light flicker.', href: '/' },
    ],
  },
];

/**
 * Review hub (Patches-5): one place to check every upgrade. Exists on
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
