import type { Metadata } from 'next';
import { ContactPage } from '@/views/ContactPage';
import { JsonLd } from '@/components/JsonLd';
import { breadcrumbJsonLd, pageMetadata } from '@lib/seo';

// No reply-time promise here: CLAUDE.md bans guaranteed reply times.
export const metadata: Metadata = pageMetadata({
  title: 'Contact',
  description:
    'Brief Alchemy Labs on a brand system, campaign or AI film. Tell us the problem in a few minutes; the first conversation is a candid audit of where you stand.',
  path: '/contact',
});

export default function Page() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([{ name: 'Contact', path: '/contact' }])} />
      <ContactPage />
    </>
  );
}
