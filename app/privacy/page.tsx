import type { Metadata } from 'next';
import PrivacyPage from '@/views/PrivacyPage';
import { JsonLd } from '@/components/JsonLd';
import { breadcrumbJsonLd, pageMetadata } from '@lib/seo';

export const metadata: Metadata = pageMetadata({
  title: 'Privacy Policy',
  description:
    'How Alchemy Labs collects, uses, stores and protects the information you share through this site and the contact form, and the rights you have over it.',
  path: '/privacy',
});

export default function Page() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([{ name: 'Privacy Policy', path: '/privacy' }])} />
      <PrivacyPage />
    </>
  );
}
