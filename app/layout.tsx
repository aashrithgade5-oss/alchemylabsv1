import type { Metadata } from 'next';
import { Inter, Pinyon_Script, Playfair_Display } from 'next/font/google';
import PageViewBeacon from '@/components/admin/PageViewBeacon';
import { GeistSans } from 'geist/font/sans';
import { GeistMono } from 'geist/font/mono';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { Providers } from '@/components/Providers';
import { LayoutTransition } from '@/components/LayoutTransition';
import { SiteChrome } from '@/components/furnace/SiteChrome';
import { GrainOverlay } from '@/components/furnace/GrainOverlay';
import { CookieConsent } from '@/components/CookieConsent';
import { OrganizationSchema } from '@/components/OrganizationSchema';
import { Preloader } from '@/components/furnace/Preloader';
import '@/index.css';

// Phase 0 type law (supersedes the Geist/Fraunces lock, see CLAUDE.md):
// Inter (variable weight, Thin..Black) carries all display + body text on
// Furnace routes; Playfair Display Italic (regular weight, variable axis —
// NOT bold, relocked 2026-07-18) is the ONLY italic anywhere on the site
// (pull-quotes, founder note, nav wordmark, work-carousel proof line);
// Geist Mono is untouched (eyebrows/technical labels).
// GeistSans is kept ONLY to feed the frozen `--font-display` alias the
// Aashrith portfolio depends on — never repoint that alias.
const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

// weight pinned to 400: the relock is "REGULAR, NOT bold" and this enforces it
// structurally — with only the 400 italic instance in the file, an inherited
// font-bold can never quietly render Playfair at 700 again. Also drops the
// unused 500..900 axis from the download.
const playfair = Playfair_Display({
  subsets: ['latin'],
  style: ['normal', 'italic'],
  weight: '400',
  variable: '--font-playfair',
});

// Patches-1 (owner request 2026-09-27): a script face for the single word
// "Build" in the hero lockup. Scoped to that one word; Playfair italic stays
// the only italic everywhere else.
const script = Pinyon_Script({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-script',
  display: 'swap',
});

// 140-160 chars (SEO pass 2026-09-27); matches the homepage description.
const description =
  'Alchemy Labs is an AI-native brand studio in Mumbai. We build brand systems, campaign imagery and AI films, generated wide and cut down by human judgment.';

export const metadata: Metadata = {
  title: {
    default: 'Alchemy Labs · AI-Native Brand Studio',
    template: '%s · Alchemy Labs',
  },
  description,
  // DEPLOY BLOCKER: every canonical + OG/Twitter image URL resolves against
  // this. Shipping to Vercel without swapping it points the live site's social
  // cards and canonicals at the old Lovable preview host. Set
  // NEXT_PUBLIC_SITE_URL in the Vercel project to the production domain.
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? 'https://alchemylabs.in',
  ),
  // No root canonical: an inherited `canonical: '/'` pointed every page that
  // lacked its own (404, legacy routes) at the homepage. Each public route sets
  // its own via pageMetadata() in lib/seo.ts; app/page.tsx sets '/'.
  openGraph: {
    title: 'Alchemy Labs · AI-Native Brand Studio',
    description,
    url: '/',
    siteName: 'Alchemy Labs',
    locale: 'en_IN',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Alchemy Labs' }],
    type: 'website',
  },
  // Google Search Console HTML-tag verification. Only emitted when the env
  // var is set (Next drops undefined values), so nothing ships until the
  // owner adds NEXT_PUBLIC_GSC_VERIFICATION. DNS TXT verification needs none.
  ...(process.env.NEXT_PUBLIC_GSC_VERIFICATION
    ? { verification: { google: process.env.NEXT_PUBLIC_GSC_VERIFICATION } }
    : {}),
  twitter: {
    card: 'summary_large_image',
    title: 'Alchemy Labs · AI-Native Brand Studio',
    description,
    images: ['/og-image.png'],
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon.png', type: 'image/png', sizes: '192x192' },
    ],
    apple: '/favicon.png',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    // next-view-transitions' <ViewTransitions> wrapper silently blocked every
    // AnimatePresence exit unmount (stuck invisible overlays); removed, the
    // framer fade in LayoutTransition is the page transition.
    // suppressHydrationWarning: the preloader gate sets data-pl on <html>
    // during parse, before React hydrates
    <html
      lang="en"
      suppressHydrationWarning
      className={`${inter.variable} ${playfair.variable} ${script.variable} ${GeistSans.variable} ${GeistMono.variable}`}
    >
        <body>
          <Preloader />
          <OrganizationSchema />
          <Providers>
            {/* LayoutTransition's transform wrapper breaks position:fixed for
                descendants, so the chrome sits outside it */}
            <SiteChrome>
              <LayoutTransition>{children}</LayoutTransition>
            </SiteChrome>
            <CookieConsent />
          </Providers>
          <GrainOverlay />
          {/* Phase 1 — shared liquid-glass filter primitive: SINGLE SOURCE for
              every backdrop-mode glass surface (nav edge, hero circle,
              forge-never-cools text-mask). feGaussianBlur softens the
              displacement source; feDisplacementMap bends the backdrop;
              feColorMatrix isolates R/G/B and feOffset splits them apart,
              feBlend(screen) recombines for the edge chromatic-aberration
              ("spectrum liquid glass") read. Chrome-only (backdrop-filter:
              url() has no Safari/Firefox support) — @supports gates every
              consumer back to a static blur, see .glass-refract-edge/.glass-halo. */}
          <svg aria-hidden className="absolute h-0 w-0">
            <filter id="glass-refract" x="-20%" y="-20%" width="140%" height="140%">
              <feTurbulence type="fractalNoise" baseFrequency="0.008 0.008" numOctaves="2" result="noise" />
              <feGaussianBlur in="SourceGraphic" stdDeviation="0.6" result="softSource" />
              <feDisplacementMap in="softSource" in2="noise" scale="10" xChannelSelector="R" yChannelSelector="G" result="displaced" />

              <feColorMatrix in="displaced" type="matrix"
                values="1 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 1 0" result="redChan" />
              <feOffset in="redChan" dx="1.1" dy="0.4" result="redOffset" />

              <feColorMatrix in="displaced" type="matrix"
                values="0 0 0 0 0  0 1 0 0 0  0 0 0 0 0  0 0 0 1 0" result="greenChan" />

              <feColorMatrix in="displaced" type="matrix"
                values="0 0 0 0 0  0 0 0 0 0  0 0 1 0 0  0 0 0 1 0" result="blueChan" />
              <feOffset in="blueChan" dx="-1.1" dy="-0.4" result="blueOffset" />

              <feBlend in="redOffset" in2="greenChan" mode="screen" result="rg" />
              <feBlend in="rg" in2="blueOffset" mode="screen" />
            </filter>
          </svg>
          <SpeedInsights />
          <PageViewBeacon />
        </body>
      </html>
  );
}
