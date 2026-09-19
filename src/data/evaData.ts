// Eva Doshi — every fact here comes from her résumé. No invented metrics.
// Deliberately omitted: date of birth, school percentages, phone number.

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

export const brandAlchemyPosts = Array.from({ length: 9 }, (_, i) => `/media/ba-post-${i + 1}.jpg`);

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
};

export const experience: Role[] = [
  {
    org: 'Brand Alchemy / Alchemy Labs',
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
    place: 'Juhu, Mumbai',
    title: 'Marketing & PR Intern',
    dates: 'Jun – Jul 2025',
    points: ['Event promotion, press releases and influencer outreach across 10+ creators.'],
  },
  {
    org: 'Concept Communication Ltd.',
    place: 'Ahmedabad',
    title: 'Marketing & Sales Intern',
    dates: 'Apr – May 2025',
    points: ['Pitch development, integrated proposals and market research for 3+ client accounts.'],
  },
  {
    org: 'Freelance',
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
