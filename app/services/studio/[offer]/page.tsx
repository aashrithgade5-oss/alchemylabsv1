import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { allOffers, findOffer } from '@/components/furnace/services/offerDetails';
import { OfferDetailView } from '@/components/furnace/services/OfferDetailView';

export const dynamicParams = false;

export function generateStaticParams() {
  return allOffers.map((o) => ({ offer: o.slug }));
}

export function generateMetadata({ params }: { params: { offer: string } }): Metadata {
  const entry = findOffer(params.offer);
  if (!entry) return { title: 'Service not found' };
  const url = `/services/studio/${entry.slug}`;
  const title = `${entry.offer.name} · ${entry.pillar.title}`;
  return {
    title,
    description: entry.offer.line,
    alternates: { canonical: url },
    openGraph: { title: `${title} · Alchemy Labs`, description: entry.offer.line, url, type: 'website' },
  };
}

export default function Page({ params }: { params: { offer: string } }) {
  if (!findOffer(params.offer)) notFound();
  return <OfferDetailView slug={params.offer} />;
}
