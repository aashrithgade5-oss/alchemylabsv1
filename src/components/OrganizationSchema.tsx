// Organization + WebSite JSON-LD, server-rendered in the root layout <body> so
// it's present in the raw HTML for every page. Only real, currently-linked
// profiles go in sameAs — see furnace/Footer.tsx for the live social list.
// No prices or offer amounts belong in schema (see docs/SEO_PLAYBOOK.md).
import { JsonLd } from '@/components/JsonLd';
import { ORG_ID, SITE } from '@lib/seo';

const description =
  'An AI-native brand studio in Mumbai. Brand systems and campaign imagery, built at machine speed under human judgment.';

const graph = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      '@id': ORG_ID,
      name: 'Alchemy Labs',
      url: SITE,
      logo: `${SITE}/media/alchemy-minimal-logo.png`,
      image: `${SITE}/og-image.png`,
      description,
      email: 'alchemylabs.work@gmail.com',
      address: { '@type': 'PostalAddress', addressLocality: 'Mumbai', addressCountry: 'IN' },
      founder: [
        { '@type': 'Person', name: 'Aashrith Gade', url: `${SITE}/aashrith` },
        { '@type': 'Person', name: 'Eva Doshi', url: `${SITE}/eva` },
      ],
      sameAs: [
        'https://www.instagram.com/brandalchemy._',
        'https://www.linkedin.com/company/brandalchemylabs/',
        'https://www.youtube.com/@brandalchemy-in',
      ],
    },
    {
      '@type': 'WebSite',
      '@id': `${SITE}/#website`,
      name: 'Alchemy Labs',
      url: SITE,
      description,
      inLanguage: 'en',
      publisher: { '@id': ORG_ID },
    },
  ],
};

export function OrganizationSchema() {
  return <JsonLd data={graph} />;
}
