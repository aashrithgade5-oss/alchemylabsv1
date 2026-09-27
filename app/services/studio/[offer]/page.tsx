import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { allOffers, findOffer } from '@/components/furnace/services/offerDetails';
import { OfferDetailView } from '@/components/furnace/services/OfferDetailView';
import { JsonLd } from '@/components/JsonLd';
import {
  breadcrumbJsonLd,
  faqJsonLd,
  fitDescription,
  pageMetadata,
  serviceJsonLd,
  stripPrices,
} from '@lib/seo';

export const dynamicParams = false;

export function generateStaticParams() {
  return allOffers.map((o) => ({ offer: o.slug }));
}

// offer.line alone runs 58-108 chars; pad it into the 140-160 window with
// factual, price-free context.
const describe = (entry: NonNullable<ReturnType<typeof findOffer>>) =>
  stripPrices(
    fitDescription(
      [entry.offer.line],
      [
        [
          `${entry.pillar.title} from Alchemy Labs, an AI-native brand studio in Mumbai.`,
          `${entry.pillar.title} by Alchemy Labs, Mumbai.`,
        ],
        ['Scoped in writing before work starts.', 'Scope confirmed in writing.'],
      ],
    ),
  );

export function generateMetadata({ params }: { params: { offer: string } }): Metadata {
  const entry = findOffer(params.offer);
  if (!entry) return { title: 'Service not found', robots: { index: false } };
  return pageMetadata({
    title: `${entry.offer.name} · ${entry.pillar.title}`,
    description: describe(entry),
    path: `/services/studio/${entry.slug}`,
    og: `offer-${entry.slug}`,
  });
}

export default function Page({ params }: { params: { offer: string } }) {
  const entry = findOffer(params.offer);
  if (!entry) notFound();
  const path = `/services/studio/${entry.slug}`;
  return (
    <>
      <JsonLd
        data={[
          breadcrumbJsonLd([
            { name: 'Services', path: '/services' },
            { name: entry.offer.name, path },
          ]),
          serviceJsonLd({
            name: entry.offer.name,
            description: stripPrices(entry.detail?.what ?? entry.offer.line),
            path,
            serviceType: entry.pillar.title,
          }),
          ...(entry.detail?.faqs?.length ? [faqJsonLd(entry.detail.faqs)] : []),
        ]}
      />
      <OfferDetailView slug={params.offer} />
    </>
  );
}
