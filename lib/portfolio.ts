// Single data source for the rebuilt portfolio. Every entry is honestly
// labeled — no invented clients, no invented metrics. Migrated from
// src/data/projects.ts (which stays untouched for the old routes until
// their phase retires them).

import { hf } from './hf';

// Higgsfield art-direction placeholders (2026-09-27, owner will swap in real
// shoots later). One map, keyed by role, shared by /aashrith and /work so a
// swap is a one-line change. All images: gpt_image_2_5, 2k, no rendered text.
export const AG_MEDIA = {
  // Studio186 open case study
  s186Cover: hf('hf_20260927_102237_88c51dc6-b4d9-4591-9e9f-6577b6a88887.png'), // 16:9 studio table
  s186Window: hf('hf_20260927_102238_9789ca4c-0460-4aaa-89fa-fe80b2cb251d.png'), // 16:9 Mumbai window
  heConversation: hf('hf_20260927_102237_d1c78fde-5eda-4a93-9fb8-0df5c9dd4a55.png'), // 16:9 podcast set
  heDawn: hf('hf_20260927_102237_4a046e74-7d95-4dbf-b610-d540cf861cc8.png'), // 4:5 promenade at dawn
  heStill: hf('hf_20260927_102238_0b81cb68-d48c-4e5a-abb1-68eb2814a4ed.png'), // 4:5 morning still life
  evolveKit: hf('hf_20260927_102238_ce88608b-21ff-4beb-bd51-f0030daf2537.png'), // 16:9 five-sleeve kit
  evolveArc: hf('hf_20260927_102238_800b844f-716c-44f8-aff1-76aa677d6e72.png'), // 4:5 five-day flat lay
  evolveRitual: hf('hf_20260927_102237_c745db80-4c91-4535-801e-35493f0e4658.png'), // 4:5 kitchen lifestyle
  deorhiCourtyard: hf('hf_20260927_102237_6cc1fb9d-1064-4598-8ba7-16aee02363fa.png'), // 16:9 haveli courtyard
  deorhiThreshold: hf('hf_20260927_102237_6d91bedd-6733-44f7-a281-d52a6ae5c774.png'), // 4:5 threshold door
  taqshaBlock: hf('hf_20260927_102237_6b2f5e1c-a7bb-4d46-975b-b34b18bd895b.png'), // 4:5 block printing
  taqshaStill: hf('hf_20260927_102237_3e0833e4-4eaa-46ea-b3aa-f8bb8f019c0c.png'), // 4:5 craft still life
  // Upgraded concept imagery (generated from the original frames as references)
  aetherHero: hf('hf_20260927_102344_53e9cc03-920d-448a-a539-ceaadc77bbaf.png'), // 16:9
  aether2: hf('hf_20260927_102344_6a80c31e-e184-4b58-8ca3-6739e29ca50a.png'), // 4:5
  aether3: hf('hf_20260927_102344_638763c4-1419-4f0d-98a8-0419eee2311b.png'), // 4:5
  aether4: hf('hf_20260927_102343_eb075858-bccb-40e5-bf12-f58434f99294.png'), // 4:5
  genesisHero: hf('hf_20260927_102344_0293257b-9260-4cec-9714-f87ebecf4db8.png'), // 16:9
  genesisPortrait: hf('hf_20260927_102344_66c12599-046b-4903-a151-fe91a55674bf.png'), // 4:5
  genesisRail: hf('hf_20260927_102344_df101a4c-864a-40da-b497-b5bd4bbe0697.png'), // 4:5
  diorHero: hf('hf_20260927_102344_088384a8-ef8b-475b-9b37-d493de203ad2.png'), // 16:9
  diorGold: hf('hf_20260927_102344_5abf0ab6-90bc-4db1-945e-448c91f5c9e0.png'), // 4:5
  diorShadow: hf('hf_20260927_102344_caa4a96b-9dfe-405e-bae6-01e84a9018be.png'), // 4:5
  oakleyHero: hf('hf_20260927_102344_630a2d3f-2230-4c30-afab-17dfd346a0c8.png'), // 16:9
  oakleyRider: hf('hf_20260927_102347_0ebbf1ba-160c-40c9-be93-ecb57ef98d47.png'), // 4:5
  oakleyMacro: hf('hf_20260927_102347_aac4bea2-5f75-495d-b7e2-f5f251c2d394.png'), // 4:5
} as const;

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
      AG_MEDIA.aetherHero,
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
    visuals: [AG_MEDIA.genesisHero, '/media/genesis-bento.webp'],
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
    visuals: [AG_MEDIA.oakleyHero, '/media/oakley-bento.webp'],
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
    visuals: [AG_MEDIA.diorHero, '/media/dior-bento.webp'],
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
