import caseStudy1 from '@/assets/case-study-1.jpg';
import caseStudy2 from '@/assets/case-study-2.jpg';
import caseStudy3 from '@/assets/case-study-3.jpg';
import aiMediaGen1 from '@/assets/ai-media-gen-1.mov';
import aiMediaGen2 from '@/assets/ai-media-gen-2.mov';
import aetherRitualsPreview from '@/assets/aether-rituals-preview.mp4';
import aetherRituals1 from '@/assets/aether-rituals-1.png';
import aetherRituals2 from '@/assets/aether-rituals-2.png';
import aetherRituals3 from '@/assets/aether-rituals-3.png';
import aetherRituals4 from '@/assets/aether-rituals-4.png';
import aetherRituals5 from '@/assets/aether-rituals-5.png';

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
    id: 'aether-rituals',
    title: 'Aether Rituals',
    brand: 'Alchemy Labs',
    category: 'AI + Branding Hybrid',
    description: 'A concept branding case study fusing AI media generation with strategic brand architecture.',
    overview: 'Aether Rituals is our flagship concept study—a fusion of our two core pillars: AI-powered media generation and strategic branding. This hybrid service concept demonstrates how machine intelligence and human creative direction converge to produce identity systems, campaign assets, and motion content that neither discipline could achieve alone.',
    image: caseStudy3,
    video: aetherRitualsPreview,
    video2: aiMediaGen2,
    size: 'large',
    services: [
      { title: 'AI Media Generation', description: 'Studio-grade video, imagery, and motion content' },
      { title: 'Brand Identity Design', description: 'Logo systems, typography, and visual language' },
      { title: 'Hybrid Strategy', description: 'Fusing AI production with brand architecture' }
    ],
    visuals: [aetherRituals1, aetherRituals2, aetherRituals3, aetherRituals4, aetherRituals5],
    isConceptual: true,
    filterTags: ['conceptual', 'ai-gen', 'branding']
  },
  {
    id: 'branding-solutions',
    title: 'Branding Solutions',
    brand: 'Alchemy Labs',
    category: 'Brand Architecture',
    description: 'Complete identity systems engineered for recognition and resonance.',
    overview: 'Our branding methodology fuses strategic clarity with visual poetry. We craft identity systems that don\'t just represent—they resonate. From verbal identity to visual language, every touchpoint is orchestrated to create inevitable recognition.',
    image: caseStudy1,
    video: aiMediaGen1,
    size: 'medium',
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
    id: 'ai-media-gen',
    title: 'AI Media Gen',
    brand: 'Alchemy Labs',
    category: 'AI Content Production',
    description: 'Studio-grade AI-generated video, imagery, and motion content at scale.',
    overview: 'Our AI media generation pipeline produces campaign-ready assets—video, stills, and motion graphics—at a fraction of traditional production timelines. Every output is guided by human creative direction and refined to meet studio-grade standards.',
    image: caseStudy2,
    video: aiMediaGen1,
    video2: aiMediaGen2,
    size: 'medium',
    services: [
      { title: 'Video Production', description: 'AI-generated campaign films and reels' },
      { title: 'Image Generation', description: 'Photorealistic and stylized stills' },
      { title: 'Motion Design', description: 'Animated assets and visual effects' }
    ],
    visuals: [caseStudy2, caseStudy1, caseStudy3],
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
    id: 'genesis',
    title: 'Genesis',
    brand: 'Alchemy Labs',
    category: 'AI + Branding Concept',
    description: 'A hybrid conceptual pricing model merging AI production with brand strategy.',
    overview: 'Genesis is our conceptual framework for pricing hybrid AI + Branding engagements. It demonstrates how we bundle generative AI media production with strategic brand architecture into a single, cohesive service offering—designed for founders and creative directors who want both pillars in one retainer.',
    image: caseStudy2,
    size: 'small',
    services: [
      { title: 'Hybrid Pricing Model', description: 'Unified AI + branding service packages' },
      { title: 'Brand + AI Audit', description: 'Current-state analysis across both pillars' },
      { title: 'Retainer Architecture', description: 'Scalable engagement frameworks' }
    ],
    visuals: [caseStudy2, caseStudy3],
    isConceptual: true,
    filterTags: ['conceptual', 'ai-gen', 'branding']
  }
];
