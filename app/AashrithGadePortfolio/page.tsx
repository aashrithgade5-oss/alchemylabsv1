import type { Metadata } from 'next';
import AashrithPortfolio from '@/views/AashrithPortfolio';

export const metadata: Metadata = {
  title: { absolute: 'Aashrith Gade — Founder, Brand Architect | Alchemy Labs' },
  description:
    'Aashrith Gade — founder of Alchemy Labs, Mumbai. Brand architecture, AI-native production, and the systems behind inevitable brands.',
  // duplicate of /aashrith — point crawlers at the canonical route
  alternates: { canonical: '/aashrith' },
};

export default AashrithPortfolio;
