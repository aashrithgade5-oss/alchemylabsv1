import type { Metadata } from 'next';
import TermsPage from '@/views/TermsPage';
import { JsonLd } from '@/components/JsonLd';
import { breadcrumbJsonLd, pageMetadata } from '@lib/seo';

export const metadata: Metadata = pageMetadata({
  title: 'Terms of Service',
  description:
    'The terms for using the Alchemy Labs site and for every studio engagement: scope, payment, start dates, ownership, revisions, liability and governing law.',
  path: '/terms',
});

export default function Page() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([{ name: 'Terms of Service', path: '/terms' }])} />
      <TermsPage />
    </>
  );
}
