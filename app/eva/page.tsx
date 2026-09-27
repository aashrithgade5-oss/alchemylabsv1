import type { Metadata } from 'next';
import EvaPortfolio from '@/views/EvaPortfolio';
import { eva } from '@/data/evaData';
import { JsonLd } from '@/components/JsonLd';
import { SITE, ORG_ID, breadcrumbJsonLd, pageMetadata } from '@lib/seo';

// /EvaDoshiPortfolio now 308-redirects here (next.config.js); this is canonical.
export const metadata: Metadata = pageMetadata({
  title: 'Eva Doshi, Brand Strategist',
  description:
    'Eva Doshi, co-founder of Alchemy Labs: Mumbai-based marketing and luxury brand strategist, co-founder of Brand Alchemy, formerly content at Dentsu Creative.',
  path: '/eva',
  type: 'profile',
});

const person = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Eva Doshi',
  url: `${SITE}/eva`,
  jobTitle: 'Co-Founder',
  worksFor: { '@id': ORG_ID },
  address: { '@type': 'PostalAddress', addressLocality: 'Mumbai', addressCountry: 'IN' },
  sameAs: [eva.linkedin],
  alumniOf: [
    { '@type': 'CollegeOrUniversity', name: 'NMIMS School of Branding & Advertising' },
    { '@type': 'CollegeOrUniversity', name: 'HEC Paris' },
  ],
  knowsLanguage: ['English', 'Hindi', 'Gujarati', 'French'],
};

export default function Page() {
  return (
    <>
      <JsonLd data={[breadcrumbJsonLd([{ name: 'Eva Doshi', path: '/eva' }]), person]} />
      <EvaPortfolio />
    </>
  );
}
