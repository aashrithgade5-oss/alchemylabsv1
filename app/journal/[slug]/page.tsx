import type { Metadata } from 'next';
import { postsData } from '@/data/journalPosts';
import BlogPostPage from '@/views/BlogPostPage';
import { ogImageFor } from '@lib/seo';
import { ogCard } from '@lib/og';

// Every post previously shared the site-wide title and OG card, so all six
// links looked identical when shared. First content paragraph doubles as the
// description (trimmed to a sane meta length).
export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const post = postsData[params.slug];
  if (!post) return { title: 'Post not found' };

  const firstParagraph = post.content.find((p) => !p.startsWith('#')) ?? '';
  const description =
    firstParagraph.length > 155 ? `${firstParagraph.slice(0, 152).trimEnd()}…` : firstParagraph;

  return {
    title: post.title,
    description,
    alternates: { canonical: `/journal/${params.slug}` },
    openGraph: {
      title: `${post.title} · Alchemy Labs`,
      description,
      url: `/journal/${params.slug}`,
      type: 'article',
      authors: [post.author.name],
      images: [ogImageFor('journal', post.title)],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${post.title} · Alchemy Labs`,
      description,
      images: [ogCard('journal')],
    },
  };
}

// Prerender all six posts at build time rather than on demand.
export function generateStaticParams() {
  return Object.keys(postsData).map((slug) => ({ slug }));
}

// See the services route: a bare re-export of a 'use client' binding stops
// Next from prerendering the params.
export default function Page() {
  return <BlogPostPage />;
}
