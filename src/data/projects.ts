import caseStudy1 from '@/assets/case-study-1.jpg';
import caseStudy2 from '@/assets/case-study-2.jpg';
import caseStudy3 from '@/assets/case-study-3.jpg';
import aiMediaGen1 from '@/assets/ai-media-gen-1.mov';
import aiMediaGen2 from '@/assets/ai-media-gen-2.mov';
import aetherRitualsPreview from '@/assets/aether-rituals-preview.mp4';

export type FilterTag = 'client' | 'conceptual' | 'ai-gen' | 'branding';

export interface Project {
  id: string;
  title: string;
  brand: string;
  category: string;
  description: string;
  overview: string;
  image: string;
  video?: string;
  video2?: string;
  size: 'large' | 'medium' | 'small';
  services: {
    title: string;
    description: string;
  }[];
  visuals: string[];
  isConceptual?: boolean;
  filterTags: FilterTag[];
}

export const projects: Project[] = [
  {
    id: 'branding-solutions',
    title: 'Branding Solutions',
    brand: 'Alchemy Labs',
    category: 'Brand Architecture',
    description: 'Complete identity systems engineered for recognition and resonance.',
    overview: 'Our branding methodology fuses strategic clarity with visual poetry. We craft identity systems that don\'t just represent—they resonate. From verbal identity to visual language, every touchpoint is orchestrated to create inevitable recognition.',
    image: caseStudy1,
    video: aiMediaGen1,
    size: 'large',
    services: [
      { title: 'Brand Strategy', description: 'Positioning, messaging, and narrative architecture' },
      { title: 'Visual Identity', description: 'Logo systems, typography, and color science' },
      { title: 'Brand Guidelines', description: 'Comprehensive identity documentation' }
    ],
    visuals: [caseStudy1, caseStudy2, caseStudy3],
    isConceptual: false,
    filterTags: ['client', 'branding']
  },
  {
    id: 'consultation-sessions',
    title: 'Consultation Sessions',
    brand: 'Alchemy Labs',
    category: 'Strategic Advisory',
    description: 'Intensive strategy sessions that transform vision into executable roadmaps.',
    overview: 'Our consultation sessions are not meetings—they\'re interventions. Through structured discovery and strategic synthesis, we help founders and creative directors crystallize their vision into actionable, measurable systems.',
    image: caseStudy2,
    size: 'medium',
    services: [
      { title: 'Discovery Sessions', description: 'Deep-dive analysis of current state and aspirations' },
      { title: 'Strategy Sprints', description: '3-5 day intensive roadmap development' },
      { title: 'Implementation Support', description: 'Ongoing advisory for execution' }
    ],
    visuals: [caseStudy2, caseStudy1, caseStudy3],
    isConceptual: false,
    filterTags: ['client']
  },
  {
    id: 'aether-rituals',
    title: 'Aether Rituals',
    brand: 'Alchemy Labs',
    category: 'AI Ceremony',
    description: 'Where machine learning meets creative intuition—our signature AI process.',
    overview: 'Aether Rituals is our proprietary methodology for AI-augmented creative production. A carefully choreographed dance between human taste and machine capability, producing outputs that neither could achieve alone.',
    image: caseStudy3,
    video: aetherRitualsPreview,
    video2: aiMediaGen2,
    size: 'medium',
    services: [
      { title: 'AI Media Generation', description: 'Studio-grade video and imagery' },
      { title: 'Content Systems', description: 'Scalable production pipelines' },
      { title: 'Style Training', description: 'Brand-specific AI model fine-tuning' }
    ],
    visuals: [caseStudy3, caseStudy1, caseStudy2],
    isConceptual: false,
    filterTags: ['client', 'ai-gen']
  },
  {
    id: 'oakley-showcase',
    title: 'Oakley Showcase',
    brand: 'Oakley',
    category: 'Conceptual Campaign',
    description: 'Reimagining performance eyewear through AI-generated visual narratives.',
    overview: 'A conceptual exploration of how Oakley could leverage generative AI to create otherworldly campaign visuals. We imagined a future where sport meets science fiction—athletes transcending human limits in environments that blur reality and imagination.',
    image: caseStudy1,
    size: 'small',
    services: [
      { title: 'Concept Development', description: 'Visual strategy and creative direction' },
      { title: 'AI Visualization', description: 'Generative imagery and motion' },
      { title: 'Campaign Architecture', description: 'Multi-touchpoint narrative design' }
    ],
    visuals: [caseStudy1, caseStudy2],
    isConceptual: true,
    filterTags: ['conceptual', 'ai-gen']
  },
  {
    id: 'arcteryx-branding',
    title: 'Arc\'teryx Concept',
    brand: 'Arc\'teryx',
    category: 'Conceptual Branding',
    description: 'Technical precision meets sublime nature—a brand evolution study.',
    overview: 'A speculative branding exercise exploring how Arc\'teryx could evolve their visual identity to capture the raw sublimity of extreme environments. We used AI to generate campaign imagery that honors their technical heritage while pushing into new aesthetic territory.',
    image: caseStudy2,
    size: 'small',
    services: [
      { title: 'Visual Exploration', description: 'AI-generated landscape and product imagery' },
      { title: 'Brand Extension', description: 'Conceptual identity evolution' },
      { title: 'Motion Concepts', description: 'Atmospheric brand films' }
    ],
    visuals: [caseStudy2, caseStudy3],
    isConceptual: true,
    filterTags: ['conceptual', 'branding']
  },
  {
    id: 'identity-systems',
    title: 'Identity Systems',
    brand: 'Alchemy Labs',
    category: 'Design Infrastructure',
    description: 'Modular design systems built for scale and consistency.',
    overview: 'We build identity infrastructure—not just logos. Our design systems approach ensures every brand asset, from business cards to billboards, speaks with one unmistakable voice. Components, not campaigns.',
    image: caseStudy3,
    size: 'small',
    services: [
      { title: 'Component Libraries', description: 'Modular design building blocks' },
      { title: 'Style Guides', description: 'Living documentation systems' },
      { title: 'Asset Pipelines', description: 'Automated production workflows' }
    ],
    visuals: [caseStudy3, caseStudy1],
    isConceptual: false,
    filterTags: ['client', 'branding']
  }
];
