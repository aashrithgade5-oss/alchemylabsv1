// Single data source for the rebuilt portfolio. Every entry is honestly
// labeled — no invented clients, no invented metrics. Migrated from
// src/data/projects.ts (which stays untouched for the old routes until
// their phase retires them).

export type EntryLabel = 'CONCEPT' | 'SELF-INITIATED' | 'CLIENT';

export interface PortfolioEntry {
  id: string;
  title: string;
  label: EntryLabel;
  discipline: string;
  summary: string;
  image: string;
  visuals: string[];
  featured?: boolean;
}

export const portfolio: PortfolioEntry[] = [
  {
    id: 'aether-rituals',
    title: 'Aether Rituals',
    label: 'CONCEPT',
    discipline: 'AI + BRAND SYSTEM',
    summary:
      'A concept skincare house built end to end: identity, packaging, and campaign film from one AI pipeline under a single creative direction.',
    image: '/assets/case-study-3.jpg',
    visuals: [
      '/assets/aether-rituals-1.png',
      '/assets/aether-rituals-2.png',
      '/assets/aether-rituals-3.png',
      '/assets/aether-rituals-4.png',
      '/assets/aether-rituals-5.png',
    ],
    featured: true,
  },
  {
    id: 'genesis',
    title: 'Genesis',
    label: 'CONCEPT',
    discipline: 'AI + BRAND SYSTEM',
    summary:
      'A framework study for hybrid engagements: generative production and brand architecture priced and delivered as one offer.',
    image: '/assets/genesis-bento.png',
    visuals: ['/assets/genesis-bento.png'],
  },
  {
    id: 'oakley-concept',
    title: 'Oakley',
    label: 'CONCEPT',
    discipline: 'AI CAMPAIGN',
    summary:
      'An unsolicited campaign exploration for Oakley: performance eyewear rendered through generative visual narratives.',
    image: '/assets/oakley-bento.png',
    visuals: ['/assets/oakley-bento.png'],
  },
  {
    id: 'ai-media-gen',
    title: 'AI Media Generation',
    label: 'SELF-INITIATED',
    discipline: 'AI FILM + IMAGE',
    summary:
      'Studio reels and stills from our production pipeline, graded and finished by hand.',
    image: '/assets/case-study-2.jpg',
    visuals: ['/assets/case-study-2.jpg', '/assets/case-study-1.jpg'],
  },
];

export const featuredEntries = portfolio.filter((entry) => entry.featured);
