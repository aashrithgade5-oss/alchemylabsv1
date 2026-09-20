import type { Metadata } from 'next';
import EvaPortfolio from '@/views/EvaPortfolio';

export const metadata: Metadata = {
  title: { absolute: 'Eva Doshi · Brand & Marketing Strategist' },
  description:
    'Eva Doshi — Mumbai-based marketing and luxury brand strategist. Co-founder of Brand Alchemy, formerly content at Dentsu Creative across 12+ brands.',
  // /EvaDoshiPortfolio serves the same page — this route is canonical.
  alternates: { canonical: '/eva' },
};

export default EvaPortfolio;
