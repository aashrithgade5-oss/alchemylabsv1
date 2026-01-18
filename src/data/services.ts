import { Sparkles, Copy, Calendar, Bot, Layers, Palette, Brush, Package, BookOpen, Users, Clock, Zap, Target } from 'lucide-react';

export interface Service {
  id: string;
  pillar: 'ai' | 'branding' | 'consultation';
  title: string;
  headline: string;
  description: string;
  features: string[];
  meta: string;
  icon: typeof Sparkles;
  slug: string;
}

export const aiServices: Service[] = [
  {
    id: 'ai-media-production',
    pillar: 'ai',
    title: 'AI Media Production',
    headline: 'AI Media Production',
    description: 'Generative visual systems engineered for velocity. From concept to rendered asset in minutes, not weeks. Images, videos, and motion graphics at machine scale.',
    features: [
      'AI Image & Video Generation (Midjourney, DALL-E, Runway, Pika)',
      'Motion Graphics & Cinematic Edits',
      'Style-Consistent Asset Libraries'
    ],
    meta: 'Delivery: 72 Hours',
    icon: Sparkles,
    slug: 'ai-media-production'
  },
  {
    id: 'content-cloning',
    pillar: 'ai',
    title: 'Content Cloning Systems',
    headline: 'Content Cloning Systems',
    description: 'Your voice. Your tone. Infinitely reproducible. Train custom AI models on your brand DNA—then deploy at scale without losing authenticity.',
    features: [
      'Voice & Tone Model Training',
      'Multi-Channel Content Replication',
      'Brand Consistency at Infinite Scale'
    ],
    meta: 'Setup: 2 Weeks',
    icon: Copy,
    slug: 'content-cloning-systems'
  },
  {
    id: 'content-planner',
    pillar: 'ai',
    title: 'AI 30-Day Content Planner',
    headline: 'AI 30-Day Content Planner',
    description: 'Strategic content calendars powered by predictive intelligence. 30 days of platform-optimized content, auto-generated and ready to schedule—with cultural timing baked in.',
    features: [
      'Platform-Native Content Strategy',
      'Trend-Responsive Calendars',
      'Hooks, Captions, Hashtags Included'
    ],
    meta: 'Refresh: Monthly',
    icon: Calendar,
    slug: 'ai-content-planner'
  },
  {
    id: 'visual-bot',
    pillar: 'ai',
    title: 'Visual Content Bot',
    headline: 'Visual Content Bot',
    description: 'Your 24/7 visual content engine. Automated workflows that monitor trends, generate assets, and deliver platform-ready visuals without human intervention.',
    features: [
      'Automated Visual Generation Pipelines',
      'Real-Time Trend Monitoring & Response',
      'Brand-Safe, Platform-Optimized Output'
    ],
    meta: 'Always On',
    icon: Bot,
    slug: 'visual-content-bot'
  }
];

export const brandingServices: Service[] = [
  {
    id: 'brand-architecture',
    pillar: 'branding',
    title: 'Brand Architecture',
    headline: 'Brand Architecture',
    description: 'Strategic foundations that define how your brand exists in the world. Positioning, narrative structure, and cultural codes—engineered for recognition and longevity.',
    features: [
      'Brand Positioning & Strategic Narrative',
      'Voice, Tone & Personality Systems',
      'Cultural Context Mapping'
    ],
    meta: 'Timeline: 3-4 Weeks',
    icon: Layers,
    slug: 'brand-architecture'
  },
  {
    id: 'visual-identity',
    pillar: 'branding',
    title: 'Visual Identity Systems',
    headline: 'Visual Identity Systems',
    description: 'More than a logo. A complete visual language that scales across every touchpoint. Systematic, memorable, unmistakably yours.',
    features: [
      'Logo Design & Typography Systems',
      'Color Theory & Application Rules',
      'Icon Libraries & Pattern Systems'
    ],
    meta: 'Timeline: 4-6 Weeks',
    icon: Palette,
    slug: 'visual-identity-systems'
  },
  {
    id: 'brand-aesthetics',
    pillar: 'branding',
    title: 'Brand Aesthetics & Design Language',
    headline: 'Brand Aesthetics & Design Language',
    description: 'The invisible rules that make everything feel cohesive. From photography style to layout principles—we define the taste that becomes your signature.',
    features: [
      'Art Direction Guidelines',
      'Photography & Illustration Styles',
      'Layout & Composition Systems'
    ],
    meta: 'Timeline: 2-3 Weeks',
    icon: Brush,
    slug: 'brand-aesthetics'
  },
  {
    id: 'brand-kit',
    pillar: 'branding',
    title: 'Complete Brand Kit',
    headline: 'Complete Brand Kit',
    description: 'Everything your team needs to maintain brand excellence. Templates, guidelines, asset libraries, and usage rules—packaged for immediate deployment.',
    features: [
      'Comprehensive Brand Guidelines (50-100 pages)',
      'Digital Asset Library (Figma, Adobe CC)',
      'Template Systems (Presentations, Documents, Social)'
    ],
    meta: 'Delivery: Full Package',
    icon: Package,
    slug: 'complete-brand-kit'
  },
  {
    id: 'brand-narrative',
    pillar: 'branding',
    title: 'Brand Narrative Studio',
    headline: 'Brand Narrative Studio',
    description: 'Stories that stick. We architect your brand\'s narrative universe—origin stories, manifesto, messaging hierarchy, and the language that makes people believers.',
    features: [
      'Brand Story & Origin Narrative',
      'Manifesto & Mission Architecture',
      'Messaging Framework & Taglines'
    ],
    meta: 'Timeline: 2-3 Weeks',
    icon: BookOpen,
    slug: 'brand-narrative-studio'
  },
  {
    id: 'brainstorm-sessions',
    pillar: 'branding',
    title: 'Branding Brainstorm Sessions',
    headline: 'Branding Brainstorm Sessions',
    description: 'Intensive creative workshops where your team and ours collide. We facilitate breakthrough thinking, refine rough ideas, and leave you with clear direction.',
    features: [
      '4-Hour Intensive Workshop',
      'Collaborative Miro Board Facilitation',
      'Post-Session Strategy Document'
    ],
    meta: 'Format: Virtual or In-Person',
    icon: Users,
    slug: 'branding-brainstorm-sessions'
  }
];

export interface ConsultationService {
  id: string;
  pillar: 'consultation';
  title: string;
  headline: string;
  duration: string;
  durationMinutes: number;
  description: string;
  includes: string[];
  bestFor: string;
  slug: string;
  icon: typeof Clock;
}

export const consultationServices: ConsultationService[] = [
  {
    id: 'strategy-75',
    pillar: 'consultation',
    title: '75-Minute Strategy Session',
    headline: 'Quick-Strike Strategy',
    duration: '75 Minutes',
    durationMinutes: 75,
    description: 'Rapid-fire strategic guidance for immediate decisions. Bring your challenge, leave with clarity. Perfect for tactical questions and focused problem-solving.',
    includes: [
      'Pre-Session Brief Analysis',
      'Live Strategy Session (75 min)',
      'Post-Session Action Summary',
      '7-Day Email Follow-Up Support'
    ],
    bestFor: 'Specific tactical challenges, campaign direction, quick audits',
    slug: 'consultation-75-minute',
    icon: Clock
  },
  {
    id: 'strategy-150',
    pillar: 'consultation',
    title: '150-Minute Deep Dive',
    headline: 'Strategic Deep Dive',
    duration: '150 Minutes',
    durationMinutes: 150,
    description: 'Comprehensive strategic exploration with room to breathe. We dissect your brand, market position, and opportunities—then architect solutions together.',
    includes: [
      'Detailed Pre-Session Research',
      'Extended Strategy Workshop (150 min)',
      'Custom Strategy Framework Document',
      '14-Day Implementation Support'
    ],
    bestFor: 'Brand repositioning, launch strategy, market entry planning',
    slug: 'consultation-150-minute',
    icon: Zap
  },
  {
    id: 'strategy-300',
    pillar: 'consultation',
    title: '300-Minute Simulation',
    headline: 'Solution Simulation Workshop',
    duration: '300 Minutes (Full Day)',
    durationMinutes: 300,
    description: 'Immersive strategy simulation where we don\'t just plan—we prototype. Build mock campaigns, test messaging, simulate launches, and stress-test ideas in real-time.',
    includes: [
      'Comprehensive Brand & Market Audit',
      'Full-Day Workshop with Simulation Exercises',
      'Prototype Deliverables (mockups, frameworks, roadmaps)',
      '30-Day Advisory Retainer'
    ],
    bestFor: 'Major launches, rebrands, market disruption plays',
    slug: 'consultation-300-minute',
    icon: Target
  }
];

export const allServices = [...aiServices, ...brandingServices];
