// Project/Work gallery data for Aashrith portfolio
import { LightboxItem } from '@/components/portfolio/LightboxModal';
import { ThoughtLeadershipEntry } from '@/components/portfolio/ThoughtLeadershipCard';

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

// Thought leadership entries
export const thoughtLeadershipEntries: ThoughtLeadershipEntry[] = [
  {
    id: 'tl-1',
    type: 'linkedin',
    title: 'Why Brand Architecture Matters More Than Brand Identity',
    excerpt: 'Most founders obsess over logos. The ones who win obsess over systems. Here\'s the framework I use to build brands that compound.',
    engagement: { views: '12.4K', comments: '89', shares: '34' },
  },
  {
    id: 'tl-2',
    type: 'case-study',
    title: 'From Zero to $9K in 6 Months: The Alchemy Labs Blueprint',
    excerpt: 'How we built a founder-led studio that generates revenue through systems, not hustle. A transparent look at our first 6 months.',
    engagement: { views: '8.2K', comments: '67' },
  },
  {
    id: 'tl-3',
    type: 'linkedin',
    title: 'AI Won\'t Replace Designers. But AI-Native Designers Will.',
    excerpt: 'The shift from tool-based to system-based creative work. Why the next wave of branding is built on AI infrastructure.',
    engagement: { views: '15.1K', comments: '142', shares: '56' },
  },
  {
    id: 'tl-4',
    type: 'linkedin',
    title: 'The 3-Layer Brand System: Strategy → Narrative → Design',
    excerpt: 'Every brand I build follows this exact framework. Strategy defines the why. Narrative defines the voice. Design makes it visible.',
    engagement: { views: '9.7K', comments: '54', shares: '28' },
  },
  {
    id: 'tl-5',
    type: 'case-study',
    title: 'Building a 3.8K AI Community from Scratch',
    excerpt: 'How Ashzz.ai grew a Discord community of GenAI builders through value-first content and genuine expertise.',
    engagement: { views: '6.3K', comments: '43' },
  },
  {
    id: 'tl-6',
    type: 'linkedin',
    title: 'Luxury Brands Don\'t Compete on Features. They Compete on Taste.',
    excerpt: 'What I learned studying luxury positioning across fashion, tech, and lifestyle brands. Restraint is the ultimate differentiator.',
    engagement: { views: '11.8K', comments: '76', shares: '41' },
  },
];

// Services/Offerings data
export interface ServiceOffering {
  id: string;
  title: string;
  promise: string;
  deliverables: string[];
}

export const serviceOfferings: ServiceOffering[] = [
  { id: 'ai-branding', title: 'AI Branding Studio', promise: 'AI-native brand systems with luxury-grade taste and speed', deliverables: ['Brand Strategy & Positioning', 'AI-Assisted Visual Identity', 'Campaign & Content Systems'] },
  { id: 'branding-systems', title: 'Branding Systems', promise: 'Complete identity infrastructure that scales with your business', deliverables: ['Brand Architecture', 'Identity Guidelines', 'Narrative Framework'] },
  { id: 'advisory', title: 'Founder Advisory', promise: 'Strategic counsel for founder-led brands and ventures', deliverables: ['Brand Strategy Sessions', 'Positioning Audits', 'Growth Roadmapping'] },
];
