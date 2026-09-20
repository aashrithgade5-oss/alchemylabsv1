// Organization JSON-LD, server-rendered in the root layout <head> so it's
// present in the raw HTML for every page. Only real, currently-linked
// profiles go in sameAs — see FurnaceFooter.tsx for the live social list.
const SITE = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://alchemylabs.in';

const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Alchemy Labs',
  url: SITE,
  logo: `${SITE}/media/alchemy-minimal-logo.png`,
  description:
    'An AI-native brand studio in Mumbai. Brand systems and campaign imagery, built at machine speed under human judgment.',
  founder: { '@type': 'Person', name: 'Aashrith Gade' },
  sameAs: [
    'https://www.instagram.com/brandalchemy._',
    'https://www.linkedin.com/company/brandalchemylabs/',
    'https://www.youtube.com/@brandalchemy-in',
  ],
};

export function OrganizationSchema() {
  return (
    <script
      type="application/ld+json"
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
    />
  );
}
