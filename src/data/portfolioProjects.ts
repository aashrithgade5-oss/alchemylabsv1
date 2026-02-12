// Project/Work gallery data for Aashrith portfolio
import { LightboxItem } from '@/components/portfolio/LightboxModal';

export interface ThoughtLeadershipEntry {
  id: string;
  type: 'linkedin' | 'case-study' | 'instagram';
  title: string;
  excerpt?: string;
  image?: string;
  url?: string;
  engagement?: {
    views?: string;
    comments?: string;
    shares?: string;
  };
}

export const portfolioProjects: LightboxItem[] = [
  { id: 'brand-1', image: '/placeholder.svg', title: 'Luxury Brand Identity System', context: 'End-to-end brand architecture for a luxury fashion house', tags: ['Brand Architecture', 'Identity Design', 'Strategy'], category: 'BRAND ALCHEMY' },
  { id: 'brand-2', image: '/placeholder.svg', title: 'D2C Brand Positioning', context: 'Strategic positioning and visual identity for direct-to-consumer startup', tags: ['Positioning', 'Visual Identity', 'D2C'], category: 'ALCHEMY LABS' },
  { id: 'brand-3', image: '/placeholder.svg', title: 'Tech Startup Rebrand', context: 'Complete brand overhaul for a B2B SaaS platform', tags: ['Rebrand', 'B2B', 'Tech'], category: 'ALCHEMY LABS' },
  { id: 'brand-4', image: '/placeholder.svg', title: 'Healthcare Brand System', context: 'Brand identity framework for healthcare technology company', tags: ['Healthcare', 'Identity System', 'Trust'], category: 'BRAND ALCHEMY' },
  { id: 'ai-1', image: '/placeholder.svg', title: 'AI-Generated Campaign Visuals', context: 'Experimental AI workflow for luxury campaign imagery', tags: ['AI', 'Midjourney', 'Campaign'], category: 'ASHZZ.AI' },
  { id: 'ai-2', image: '/placeholder.svg', title: 'Generative Brand Assets', context: 'AI-native asset creation pipeline for rapid iteration', tags: ['Generative', 'Workflow', 'Assets'], category: 'ASHZZ.AI' },
  { id: 'ai-3', image: '/placeholder.svg', title: 'Neural Brand Exploration', context: 'Concept exploration using AI-assisted visual generation', tags: ['Concept', 'Neural', 'Exploration'], category: 'ASHZZ.AI' },
  { id: 'ai-4', image: '/placeholder.svg', title: 'AI Motion Design', context: 'AI-enhanced motion design for social campaigns', tags: ['Motion', 'AI', 'Social'], category: 'ALCHEMY LABS' },
  { id: 'content-1', image: '/placeholder.svg', title: 'Brand Systems Framework', context: 'Visual framework explaining brand-as-infrastructure philosophy', tags: ['Framework', 'Education', 'LinkedIn'], category: 'LINKEDIN' },
  { id: 'content-2', image: '/placeholder.svg', title: 'AI Branding Insights', context: 'Thought leadership on AI-native brand building', tags: ['AI', 'Insights', 'Strategy'], category: 'LINKEDIN' },
  { id: 'content-3', image: '/placeholder.svg', title: 'Positioning Mastery', context: 'Educational content on strategic brand positioning', tags: ['Positioning', 'Education', 'Marketing'], category: 'BRAND ALCHEMY' },
  { id: 'content-4', image: '/placeholder.svg', title: 'Luxury Brand Principles', context: 'Visual essay on luxury brand building principles', tags: ['Luxury', 'Principles', 'Design'], category: 'LINKEDIN' },
];

// Thought leadership entries -- real links to recent posts
export const thoughtLeadershipEntries: ThoughtLeadershipEntry[] = [
  {
    id: 'tl-1',
    type: 'linkedin',
    title: 'CS30: Marketing Strategy & Brand Strategy',
    url: 'https://www.linkedin.com/posts/aashrithgade_cs30-marketingstrategy-brandstrategy-activity-7411284898843443200-sHM1?utm_source=share&utm_medium=member_desktop&rcm=ACoAAEFBi2MBcc1G5NPfy7QAFNMSihZeedgx3is',
  },
  {
    id: 'tl-2',
    type: 'linkedin',
    title: 'Alchemy Casefiles Vol. 1',
    url: 'https://www.linkedin.com/posts/aashrithgade_alchemy-casefiles-vol-1-activity-7413112047418142720-GLGu?utm_source=share&utm_medium=member_desktop&rcm=ACoAAEFBi2MBcc1G5NPfy7QAFNMSihZeedgx3is',
  },
  {
    id: 'tl-3',
    type: 'linkedin',
    title: 'CS35: AI & Strategic Analysis',
    url: 'https://www.linkedin.com/posts/aashrithgade_cs35-ai-strategicanalysis-activity-7423934475736248320-xvtb?utm_source=share&utm_medium=member_desktop&rcm=ACoAAEFBi2MBcc1G5NPfy7QAFNMSihZeedgx3is',
  },
  {
    id: 'tl-4',
    type: 'linkedin',
    title: 'Jonathan Anderson × Dior — Jan 2026',
    url: 'https://www.linkedin.com/posts/aashrithgade_jonathan-anderson-dior-jan-2026-activity-7417528823618883584-HMQN?utm_source=share&utm_medium=member_desktop&rcm=ACoAAEFBi2MBcc1G5NPfy7QAFNMSihZeedgx3is',
  },
  {
    id: 'tl-5',
    type: 'instagram',
    title: 'AshArchives — Latest Drop',
    url: 'https://www.instagram.com/p/DPWNjBBDF02/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==',
  },
];
