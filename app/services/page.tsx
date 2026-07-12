import type { Metadata } from 'next';
import ServicesPage from '@/views/ServicesPage';
import { faqs } from '@/components/furnace/services/faqs';

const description =
  'Three pillars: AI creative studio, brand systems, and advisory. Scoped per project, with five fixed offers from $199 that start without a call.';

export const metadata: Metadata = {
  title: 'Services',
  description,
  openGraph: { title: 'Services · Alchemy Labs', description },
};

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map((item) => ({
    '@type': 'Question',
    name: item.q,
    acceptedAnswer: { '@type': 'Answer', text: item.a },
  })),
};

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <ServicesPage />
    </>
  );
}
