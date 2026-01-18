import caseStudy1 from '@/assets/case-study-1.jpg';
import caseStudy2 from '@/assets/case-study-2.jpg';
import caseStudy3 from '@/assets/case-study-3.jpg';
import aiMediaGen1 from '@/assets/ai-media-gen-1.mov';
import aiMediaGen2 from '@/assets/ai-media-gen-2.mov';

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
}

export const projects: Project[] = [
  {
    id: 'ai-media-gen',
    title: 'AI MEDIA GEN',
    brand: 'IKEA',
    category: 'AI Video Generation',
    description: 'Transforming furniture showcasing with AI-generated cinematic video content.',
    overview: 'A groundbreaking collaboration with IKEA to create AI-generated product showcase videos that bring furniture to life. Using cutting-edge generative AI, we produced cinematic content that demonstrates how products transform living spaces—achieving in hours what traditional production takes weeks.',
    image: caseStudy1,
    video: aiMediaGen1,
    video2: aiMediaGen2,
    size: 'large',
    services: [
      { title: 'AI Video Generation', description: 'Cinematic product videos created entirely with generative AI' },
      { title: 'Visual Storytelling', description: 'Narrative-driven content showcasing product in context' },
      { title: 'Rapid Production', description: 'From concept to delivery in 48 hours' }
    ],
    visuals: [caseStudy1, caseStudy2, caseStudy3]
  },
  {
    id: 'nike',
    title: 'NIKE',
    brand: 'Nike',
    category: 'Campaign Concept',
    description: 'AI-augmented athlete portraits pushing visual boundaries.',
    overview: 'Conceptual campaign exploring how Nike could use generative AI to create surreal, larger-than-life athlete portraits that capture human potential. A meditation on the intersection of sport, technology, and art.',
    image: caseStudy2,
    size: 'medium',
    services: [
      { title: 'Concept Development', description: 'Art direction and visual strategy' },
      { title: 'AI Portrait Generation', description: 'Hyper-stylized athlete imagery' },
      { title: 'Motion Design', description: 'Animated campaign assets' }
    ],
    visuals: [caseStudy2, caseStudy1, caseStudy3]
  },
  {
    id: 'balenciaga',
    title: 'BALENCIAGA',
    brand: 'Balenciaga',
    category: 'Brand Evolution',
    description: 'Pushing luxury fashion into the AI aesthetic frontier.',
    overview: 'A speculative project imagining Balenciaga\'s next evolution—where haute couture meets machine learning. We created conceptual campaign visuals that embody the house\'s avant-garde spirit through AI.',
    image: caseStudy3,
    size: 'medium',
    services: [
      { title: 'Visual Exploration', description: 'AI-generated lookbook concepts' },
      { title: 'Aesthetic Development', description: 'Defining AI-native luxury visual language' },
      { title: 'Campaign Direction', description: 'Strategic visual narrative' }
    ],
    visuals: [caseStudy3, caseStudy1, caseStudy2]
  },
  {
    id: 'aesop',
    title: 'AESOP',
    brand: 'Aesop',
    category: 'Content Systems',
    description: 'Scalable beauty content with artisanal quality.',
    overview: 'Exploring how Aesop\'s meticulous approach to beauty could translate into AI-generated content that maintains the brand\'s signature restraint and sophistication. Every asset feels handcrafted, yet infinitely scalable.',
    image: caseStudy1,
    size: 'small',
    services: [
      { title: 'Content Pipeline', description: 'Automated visual generation system' },
      { title: 'Style Consistency', description: 'Brand-trained AI models' },
      { title: 'Quality Control', description: 'Human-in-the-loop refinement' }
    ],
    visuals: [caseStudy1, caseStudy2]
  },
  {
    id: 'arc-teryx',
    title: 'ARC\'TERYX',
    brand: 'Arc\'teryx',
    category: 'Visual Identity',
    description: 'Technical precision meets natural beauty.',
    overview: 'A conceptual project exploring how Arc\'teryx could use AI to generate campaign imagery that captures the sublime beauty of extreme environments while maintaining technical accuracy.',
    image: caseStudy2,
    size: 'small',
    services: [
      { title: 'Environment Generation', description: 'AI-created landscape visuals' },
      { title: 'Product Integration', description: 'Seamless product placement' },
      { title: 'Asset Library', description: 'Infinite terrain variations' }
    ],
    visuals: [caseStudy2, caseStudy3]
  }
];
