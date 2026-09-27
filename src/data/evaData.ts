import { hf } from '@lib/hf';

// Eva Doshi — every fact here comes from her résumé. No invented metrics.
// Deliberately omitted: date of birth, school percentages, phone number.

// Art-directed stills (Higgsfield, gpt_image_2_5). One role per file so a swap is one line.
// No faces, no readable text: they set the scene, the facts carry the story.
export const evaMedia = {
  atelier: { src: hf('hf_20260927_102013_389122da-3aad-43a2-9901-9c48834d60d1.png'), w: 1792, h: 2240, alt: 'Eva, seen from behind, choosing a blush silk blouse from a rail in a dim atelier' },
  desk: { src: hf('hf_20260927_102012_3bbf06d7-0c32-42e9-9223-cdd40d2518b6.png'), w: 2048, h: 1360, alt: 'Fabric swatches, a loupe and a fountain pen on a walnut desk at night' },
  agency: { src: hf('hf_20260927_102012_e130c551-242a-40f8-81c6-1e897f4a7e98.png'), w: 2048, h: 1360, alt: 'Storyboards pinned to a cork wall in an agency studio after hours' },
  launch: { src: hf('hf_20260927_102012_884884f3-561b-4929-b151-0daca9f18782.png'), w: 2048, h: 1360, alt: 'Sealed invitations beside a velvet rope at a launch night, camera flashes behind' },
  pitch: { src: hf('hf_20260927_102013_5ac0f515-d973-47c5-966e-224bfefe9322.png'), w: 2048, h: 1360, alt: 'Bound proposals on a teak table in jaali-screen afternoon light' },
  reel: { src: hf('hf_20260927_102013_13abe4ca-c357-4b48-8245-cb7e1091f868.png'), w: 2048, h: 1360, alt: 'Hands holding a camera on a gimbal while a model walks past a clothing rail' },
  stage: { src: hf('hf_20260927_102012_89562850-ff74-4325-9c04-ff1bdaa45062.png'), w: 2688, h: 1520, alt: 'Backstage at a college festival: clipboard and walkie-talkie, crowd in pink stage haze' },
  paris: { src: hf('hf_20260927_102012_9548e7bd-978f-4467-9334-86848a3447fc.png'), w: 1792, h: 2240, alt: 'A Paris balcony at dusk with a closed notebook and an espresso on the ledge' },
  letter: { src: hf('hf_20260927_102013_330c8516-30d9-43ff-8670-1f0513721459.png'), w: 1792, h: 2240, alt: 'A cream envelope with a rose wax seal beside a garden rose on dark linen' },
  mumbai: { src: hf('hf_20260927_102012_014cf2d9-2d03-4604-bad7-08be6cb1dc28.png'), w: 2688, h: 1520, alt: 'Marine Drive, Mumbai, at dusk' },
} as const;

export type EvaImage = (typeof evaMedia)[keyof typeof evaMedia];

export const eva = {
  name: 'Eva Doshi',
  role: 'Marketing & luxury brand strategist',
  city: 'Mumbai',
  email: 'evadoshi05@gmail.com',
  linkedin: 'https://www.linkedin.com/in/eva-doshi-0b07b531b',
  resume: '/resumes/eva-doshi-resume.pdf',
  // Cycled in the hero: "Brand strategy with <word>."
  heroWords: ['taste', 'intent', 'restraint', 'story', 'polish'],
};

export const heroStats = [
  { value: '12+', label: 'Brands at Dentsu Creative' },
  { value: '4+', label: 'Brand Alchemy clients' },
  { value: '100%', label: 'Client retention to date' },
];

// Real Brand Alchemy posts. Ratios are the source files' own (1080² / 1080×1350 / 1200×1500),
// so nothing is cropped out of a designed post.
const POST_RATIO: Record<number, 'square' | 'portrait'> = { 1: 'square', 8: 'square' };
export const brandAlchemyPosts = Array.from({ length: 9 }, (_, i) => ({
  src: `/media/ba-post-${i + 1}.jpg`,
  ratio: POST_RATIO[i + 1] ?? 'portrait',
}));

// The whole chain, each link backed by a line of the résumé.
export const chain = [
  { step: 'Pitch', where: 'Concept Communication', proof: 'Integrated proposals for 3+ client accounts' },
  { step: 'Position', where: 'Brand Alchemy', proof: 'Fashion and luxury positioning, as co-founder' },
  { step: 'Write', where: 'Dentsu Creative', proof: 'Copy and social creatives across 12+ brands' },
  { step: 'Amplify', where: 'StyleGasp Advertising', proof: 'Press releases and outreach across 10+ creators' },
  { step: 'Shoot & cut', where: 'Freelance', proof: '6+ branded Reels in two months, shoot to edit' },
  { step: 'Deliver', where: 'Brand Alchemy', proof: '4+ clients, full lifecycle, 100% retained' },
];

export const brandAlchemyWork = [
  'Client acquisition',
  'Creative direction',
  'Luxury positioning',
  'Fashion brand strategy',
  'End-to-end delivery',
  'Full client lifecycle',
  'Social storytelling',
];

export type Role = {
  org: string;
  place: string;
  title: string;
  dates: string;
  points: string[];
  tags?: string[];
  image: EvaImage;
};

export const experience: Role[] = [
  {
    org: 'Brand Alchemy / Alchemy Labs',
    image: evaMedia.desk,
    place: 'Mumbai',
    title: 'Co-Founder',
    dates: 'June – Present',
    points: [
      'Built and scaled a brand strategy consultancy for fashion and luxury positioning.',
      'Leads client acquisition, creative direction and end-to-end delivery.',
      'Onboarded 4+ clients across the full lifecycle, with 100% retention to date.',
    ],
  },
  {
    org: 'Dentsu Creative',
    image: evaMedia.agency,
    place: 'Worli, Mumbai',
    title: 'Graduate Trainee, Content Creation',
    dates: 'Jul 2025 – Jan 2026',
    points: [
      'End-to-end content (digital storytelling, copywriting, social creatives) across 12+ brands in luxury, FMCG and lifestyle.',
      '360° campaign ideation with weekly delivery across Instagram, digital and OOH.',
    ],
    tags: ['Forevermark', 'Jack & Jones', 'Cetaphil', 'Dove', 'Sugar Free'],
  },
  {
    org: 'StyleGasp Advertising',
    image: evaMedia.launch,
    place: 'Juhu, Mumbai',
    title: 'Marketing & PR Intern',
    dates: 'Jun – Jul 2025',
    points: ['Event promotion, press releases and influencer outreach across 10+ creators.'],
  },
  {
    org: 'Concept Communication Ltd.',
    image: evaMedia.pitch,
    place: 'Ahmedabad',
    title: 'Marketing & Sales Intern',
    dates: 'Apr – May 2025',
    points: ['Pitch development, integrated proposals and market research for 3+ client accounts.'],
  },
  {
    org: 'Freelance',
    image: evaMedia.reel,
    place: 'Mumbai',
    title: 'Videographer, fashion influencer projects',
    dates: 'Feb – Mar 2025',
    points: [
      'Branded Reels for fashion labels — 6+ collaborations in two months.',
      'Solo shoot-to-edit workflow.',
    ],
    tags: ['AND', 'Pepe Jeans', 'Azorte', 'Lovechild by Masaba'],
  },
];

export const positions = [
  { title: 'Head of Artist Relations', org: 'Double Tap Influencer Festival, NMIMS', note: '200+ influencers reached, 8–10 finalized' },
  { title: 'Head of Marketing', org: 'Rudra Fest', note: '₹1,30,000 in cash sponsorships · 15–20 member team' },
  { title: 'Head of Sponsorships', org: 'Parda Film Festival', note: 'NMIMS × New York Film Academy' },
  { title: 'Head of Outreach', org: 'SoBA Speaks', note: '' },
  { title: 'Marketing POC', org: 'Rivaya Fest', note: '' },
];

export const skills = [
  'Luxury marketing & strategy',
  'Campaign planning',
  'Social media',
  'Influencer & brand outreach',
  'Sales',
  'AI-augmented marketing',
];

export const education = [
  { school: 'NMIMS', detail: 'School of Branding & Advertising' },
  { school: 'HEC Paris', detail: 'Summer School — Luxury Management' },
];

export const languages = [
  { name: 'English', level: 'Fluent' },
  { name: 'Hindi', level: 'Fluent' },
  { name: 'Gujarati', level: 'Fluent' },
  { name: 'French', level: 'Basic' },
];

export const debating = ['IIT Bombay Debate 2024', 'RMUN 2.0'];
