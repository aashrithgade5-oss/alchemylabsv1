import type { Metadata } from 'next';
import ServicesPage from '@/views/ServicesPage';
import { faqs } from '@/components/furnace/services/faqs';
import { pillars } from '@/components/furnace/services/pillars';
import { JsonLd } from '@/components/JsonLd';
import { ORG_ID, SITE, breadcrumbJsonLd, faqJsonLd, pageMetadata } from '@lib/seo';

// No prices in metadata or schema (SEO pass 2026-09-27): prices live on the page only.
const description =
  'Alchemy Labs services: an AI creative studio, brand systems and advisory. Scoped per project, plus five fixed-scope offers you can start without a call.';

export const metadata: Metadata = pageMetadata({ title: 'Services', description, path: '/services' });

const professionalService = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  '@id': `${SITE}/services#service`,
  name: 'Alchemy Labs',
  url: `${SITE}/services`,
  image: `${SITE}/og-image.png`,
  description,
  parentOrganization: { '@id': ORG_ID },
  address: { '@type': 'PostalAddress', addressLocality: 'Mumbai', addressCountry: 'IN' },
  areaServed: 'Worldwide',
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Services',
    itemListElement: pillars.map((pillar) => ({
      '@type': 'OfferCatalog',
      name: pillar.title,
      itemListElement: pillar.offers.map((offer) => ({
        '@type': 'Service',
        name: offer.name,
        description: offer.line,
        provider: { '@id': ORG_ID },
      })),
    })),
  },
};

export default function Page() {
  return (
    <>
      <JsonLd
        data={[
          breadcrumbJsonLd([{ name: 'Services', path: '/services' }]),
          professionalService,
          faqJsonLd(faqs),
        ]}
      />
      <ServicesPage />
    </>
  );
}
