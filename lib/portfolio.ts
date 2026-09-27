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
  /** C-P18: motion entries carry their compressed loop; tiles render it via
      AmbientVideo instead of the still. */
  video?: { src: string; poster: string };
}

export const portfolio: PortfolioEntry[] = [
  {
    id: 'aether-rituals',
    title: 'Aether Rituals',
    label: 'CONCEPT',
    discipline: 'AI + BRAND SYSTEM',
    summary:
      'A concept skincare house built end to end: identity, packaging, and campaign film from one AI pipeline under a single creative direction.',
    image: '/media/case-study-3.jpg',
    visuals: [
      '/media/aether-rituals-1.webp',
      '/media/aether-rituals-2.webp',
      '/media/aether-rituals-3.webp',
      '/media/aether-rituals-4.webp',
      '/media/aether-rituals-5.webp',
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
    image: '/media/genesis-bento.webp',
    visuals: ['/media/genesis-bento.webp'],
    featured: true,
  },
  {
    id: 'oakley-concept',
    title: 'Oakley',
    label: 'CONCEPT',
    discipline: 'AI CAMPAIGN',
    summary:
      'An unsolicited campaign exploration for Oakley: performance eyewear rendered through generative visual narratives.',
    image: '/media/oakley-bento.webp',
    visuals: ['/media/oakley-bento.webp'],
    featured: true,
  },
  {
    id: 'dior-campaign',
    title: 'Dior',
    label: 'CONCEPT',
    discipline: 'AI CAMPAIGN',
    summary:
      "Two parallel luxury fragrance campaigns for J'adore and Poison, architected as one duality: gold-and-amber light against purple-and-shadow, unified under a single creative direction.",
    image: '/media/dior-bento.webp',
    visuals: ['/media/dior-bento.webp'],
    featured: true,
  },
  {
    id: 'ai-media-gen',
    title: 'AI Media Generation',
    label: 'SELF-INITIATED',
    discipline: 'AI FILM + IMAGE',
    summary:
      'Studio reels and stills from our production pipeline, graded and finished by hand.',
    image: '/media/case-study-2.jpg',
    visuals: ['/media/case-study-2.jpg', '/media/case-study-1.jpg'],
  },
  {
    // C-P18: sixth entry — genuinely distinct project from the 12:21 AM
    // media drop, compressed this session (73MB .mov → 4.1MB web mp4).
    id: 'porsche-showreel',
    title: 'Porsche AI Showreel',
    label: 'CONCEPT',
    discipline: 'AI FILM',
    summary:
      'A performance-car showreel cut entirely from AI-generated footage: one marque, one grade, sixty seconds of controlled speed.',
    image: '/media/porsche-showreel-poster.jpg',
    visuals: ['/media/porsche-showreel-poster.jpg'],
    video: { src: '/media/porsche-showreel.mp4', poster: '/media/porsche-showreel-poster.jpg' },
  },
];

export const featuredEntries = portfolio.filter((entry) => entry.featured);
