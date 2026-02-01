// Project/Work gallery data for Aashrith portfolio
import { LightboxItem } from '@/components/portfolio/LightboxModal';

export const portfolioProjects: LightboxItem[] = [
  // Row 1: Brand Systems
  {
    id: 'brand-1',
    image: '/placeholder.svg',
    title: 'Luxury Brand Identity System',
    context: 'End-to-end brand architecture for a luxury fashion house',
    tags: ['Brand Architecture', 'Identity Design', 'Strategy'],
    category: 'BRAND ALCHEMY',
  },
  {
    id: 'brand-2',
    image: '/placeholder.svg',
    title: 'D2C Brand Positioning',
    context: 'Strategic positioning and visual identity for direct-to-consumer startup',
    tags: ['Positioning', 'Visual Identity', 'D2C'],
    category: 'ALCHEMY LABS',
  },
  {
    id: 'brand-3',
    image: '/placeholder.svg',
    title: 'Tech Startup Rebrand',
    context: 'Complete brand overhaul for a B2B SaaS platform',
    tags: ['Rebrand', 'B2B', 'Tech'],
    category: 'ALCHEMY LABS',
  },
  {
    id: 'brand-4',
    image: '/placeholder.svg',
    title: 'Healthcare Brand System',
    context: 'Brand identity framework for healthcare technology company',
    tags: ['Healthcare', 'Identity System', 'Trust'],
    category: 'BRAND ALCHEMY',
  },

  // Row 2: AI Visual Experiments
  {
    id: 'ai-1',
    image: '/placeholder.svg',
    title: 'AI-Generated Campaign Visuals',
    context: 'Experimental AI workflow for luxury campaign imagery',
    tags: ['AI', 'Midjourney', 'Campaign'],
    category: 'ASHZZ.AI',
  },
  {
    id: 'ai-2',
    image: '/placeholder.svg',
    title: 'Generative Brand Assets',
    context: 'AI-native asset creation pipeline for rapid iteration',
    tags: ['Generative', 'Workflow', 'Assets'],
    category: 'ASHZZ.AI',
  },
  {
    id: 'ai-3',
    image: '/placeholder.svg',
    title: 'Neural Brand Exploration',
    context: 'Concept exploration using AI-assisted visual generation',
    tags: ['Concept', 'Neural', 'Exploration'],
    category: 'ASHZZ.AI',
  },
  {
    id: 'ai-4',
    image: '/placeholder.svg',
    title: 'AI Motion Design',
    context: 'AI-enhanced motion design for social campaigns',
    tags: ['Motion', 'AI', 'Social'],
    category: 'ALCHEMY LABS',
  },

  // Row 3: Thought Leadership
  {
    id: 'content-1',
    image: '/placeholder.svg',
    title: 'Brand Systems Framework',
    context: 'Visual framework explaining brand-as-infrastructure philosophy',
    tags: ['Framework', 'Education', 'LinkedIn'],
    category: 'LINKEDIN',
  },
  {
    id: 'content-2',
    image: '/placeholder.svg',
    title: 'AI Branding Insights',
    context: 'Thought leadership on AI-native brand building',
    tags: ['AI', 'Insights', 'Strategy'],
    category: 'LINKEDIN',
  },
  {
    id: 'content-3',
    image: '/placeholder.svg',
    title: 'Positioning Mastery',
    context: 'Educational content on strategic brand positioning',
    tags: ['Positioning', 'Education', 'Marketing'],
    category: 'BRAND ALCHEMY',
  },
  {
    id: 'content-4',
    image: '/placeholder.svg',
    title: 'Luxury Brand Principles',
    context: 'Visual essay on luxury brand building principles',
    tags: ['Luxury', 'Principles', 'Design'],
    category: 'LINKEDIN',
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
  {
    id: 'ai-branding',
    title: 'AI Branding Studio',
    promise: 'AI-native brand systems with luxury-grade taste and speed',
    deliverables: [
      'Brand Strategy & Positioning',
      'AI-Assisted Visual Identity',
      'Campaign & Content Systems',
    ],
  },
  {
    id: 'branding-systems',
    title: 'Branding Systems',
    promise: 'Complete identity infrastructure that scales with your business',
    deliverables: [
      'Brand Architecture',
      'Identity Guidelines',
      'Narrative Framework',
    ],
  },
  {
    id: 'advisory',
    title: 'Founder Advisory',
    promise: 'Strategic counsel for founder-led brands and ventures',
    deliverables: [
      'Brand Strategy Sessions',
      'Positioning Audits',
      'Growth Roadmapping',
    ],
  },
];
