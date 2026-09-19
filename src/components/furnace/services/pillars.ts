// The three pillars, consolidated from the old five-category catalogue
// (src/data/servicesData.ts). Same offers, stripped of trademarks and hype.
// No prices: hero services are scoped per project.

export interface Offer {
  name: string;
  line: string;
  timeline: string;
}

export interface Pillar {
  numeral: string;
  slug: 'ai' | 'brand' | 'advisory';
  title: string;
  tag: string;
  description: string;
  /** Cinematic still shown opposite the numeral. */
  still: string;
  offers: Offer[];
}

export const pillars: Pillar[] = [
  {
    numeral: '01',
    slug: 'ai',
    title: 'AI Creative Studio',
    tag: 'FILM · IMAGERY · CONTENT SYSTEMS',
    description: 'Campaign film and imagery from an AI pipeline, directed by hand.',
    // C-P20 imagery pass: abstract treatment for the AI pillar
    still: '/media/cinematic-still-1.png',
    offers: [
      {
        name: 'Campaign Sprint',
        line: 'A full campaign compressed into one focused burst: hero asset, statics, cutdowns, and a rollout map.',
        timeline: '2-5 DAYS',
      },
      {
        name: 'Cinematic Film',
        line: 'A 45 to 90 second founder or product film, with social cutdowns and hook variations.',
        timeline: '7-10 DAYS',
      },
      {
        name: 'AI Production',
        line: 'Campaign-grade stills and motion at volume, under one creative direction.',
        timeline: '7-14 DAYS',
      },
      {
        name: 'Content Engine',
        line: 'The workflow, prompt library, and calendar that keep your output consistent. Monthly continuation available.',
        timeline: '10-14 DAYS',
      },
    ],
  },
  {
    numeral: '02',
    slug: 'brand',
    title: 'Brand Systems',
    tag: 'IDENTITY · NARRATIVE · VISUAL WORLD',
    description: 'Identity built to survive contact with the market.',
    still: '/media/lone-figure-1.png',
    offers: [
      {
        name: 'Identity System',
        line: 'Logo suite, typography, color logic, and usage rules, built digital first.',
        timeline: '7-14 DAYS',
      },
      {
        name: 'Brand World',
        line: 'The visual universe around the mark: direction boards, imagery style, and composition rules.',
        timeline: '10-14 DAYS',
      },
      {
        name: 'Narrative System',
        line: 'Positioning, origin story, and a messaging hierarchy that holds one voice.',
        timeline: '5-12 DAYS',
      },
      {
        name: 'Branding 360',
        line: 'Identity, narrative, and visual direction sequenced into one launch-ready engagement.',
        timeline: '7-14 DAYS',
      },
    ],
  },
  {
    numeral: '03',
    slug: 'advisory',
    title: 'Advisory',
    tag: 'AUDITS · STRATEGY · SYSTEM DESIGN',
    description: 'Straight answers on where your brand goes next.',
    still: '/media/lone-figure-2.png',
    offers: [
      {
        name: 'AI Leverage Audit',
        line: 'Every viable point where AI creates revenue or speed in your operation, ranked by return.',
        timeline: '7-10 DAYS',
      },
      {
        name: 'Precision Audit',
        line: 'One recorded strategic session with priority mapping and concrete next steps.',
        timeline: 'SINGLE SESSION',
      },
      {
        name: 'Strategy Build',
        line: 'The roadmap that turns vision into an executable sequence.',
        timeline: '2-3 WEEKS',
      },
      {
        name: 'Full System Simulation',
        line: 'The complete blueprint across brand, marketing, and operations before you scale.',
        timeline: '4-6 WEEKS',
      },
    ],
  },
];

/** Detail-page slug: kebab-case of the offer name ("Branding 360" -> "branding-360"). */
export const offerSlug = (name: string) =>
  name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
