import type { Metadata } from 'next';
import AashrithPortfolio from '@/views/AashrithPortfolio';
import { ogImageFor } from '@lib/seo';
import { ogCard } from '@lib/og';

export const metadata: Metadata = {
  title: { absolute: 'Aashrith Gade — Founder, Brand Architect | Alchemy Labs' },
  description:
    'Aashrith Gade — founder of Alchemy Labs and Social & Growth Lead at Studio186 (The Times of India Group), Mumbai. Brand architecture, AI-native production, and an open case study across HumanEdge, Evolve, Deorhi and Taqsha.',
  // /AashrithGadePortfolio serves the same page — this route is canonical.
  alternates: { canonical: '/aashrith' },
  openGraph: {
    title: 'Aashrith Gade · Founder, Alchemy Labs',
    url: '/aashrith',
    type: 'profile',
    images: [ogImageFor('aashrith', 'Aashrith Gade')],
  },
  twitter: { card: 'summary_large_image', images: [ogCard('aashrith')] },
};

export default AashrithPortfolio;
