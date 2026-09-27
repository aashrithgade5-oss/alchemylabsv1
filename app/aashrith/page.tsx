import type { Metadata } from 'next';
import AashrithPortfolio from '@/views/AashrithPortfolio';

export const metadata: Metadata = {
  title: { absolute: 'Aashrith Gade — Founder, Brand Architect | Alchemy Labs' },
  description:
    'Aashrith Gade — founder of Alchemy Labs and Social & Growth Lead at Studio186 (The Times of India Group), Mumbai. Brand architecture, AI-native production, and an open case study across HumanEdge, Evolve, Deorhi and Taqsha.',
  // /AashrithGadePortfolio serves the same page — this route is canonical.
  alternates: { canonical: '/aashrith' },
};

export default AashrithPortfolio;
