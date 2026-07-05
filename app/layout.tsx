import type { Metadata } from 'next';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { Providers } from '@/components/Providers';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { CustomCursor } from '@/components/CustomCursor';
import { Preloader } from '@/components/Preloader';
import { ScrollProgress } from '@/components/ScrollProgress';
import { FloatingCTA } from '@/components/FloatingCTA';
import { BackToTop } from '@/components/BackToTop';
import { CookieConsent } from '@/components/CookieConsent';
import '@/index.css';

export const metadata: Metadata = {
  title: {
    default: 'Alchemy Labs — AI-Augmented Brand Architecture',
    template: '%s | Alchemy Labs',
  },
  description: 'Strategic brand systems engineered for the AI era. We architect identity, culture, and execution that scales through precision.',
  metadataBase: new URL('https://alchemylabsv1.lovable.app'),
  openGraph: {
    title: 'Alchemy Labs — AI-Augmented Brand Architecture',
    description: 'Strategic brand systems engineered for the AI era. We architect identity, culture, and execution that scales through precision.',
    url: 'https://alchemylabsv1.lovable.app',
    siteName: 'Alchemy Labs',
    images: [{ url: '/og-image.png', width: 1200, height: 630 }],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Alchemy Labs — AI-Augmented Brand Architecture',
    description: 'Strategic brand systems engineered for the AI era. We architect identity, culture, and execution that scales through precision.',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <Preloader />
          <CustomCursor />
          <ScrollProgress />
          <Navigation />
          <FloatingCTA />
          {children}
          <Footer />
          <BackToTop />
          <CookieConsent />
        </Providers>
        <SpeedInsights />
      </body>
    </html>
  );
}
