import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, Check, Layers, Palette, Brush, Package, BookOpen, Users, ChevronDown } from 'lucide-react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { MagneticButton } from '@/components/MagneticButton';

const services = [
  {
    title: 'Brand Identity System',
    tagline: 'The complete visual + strategic foundation',
    description: 'Strategic foundations that define how your brand exists in the world. Positioning, narrative structure, and cultural codes—engineered for recognition and longevity.',
    deliverables: [
      'Brand Positioning & Strategic Narrative',
      'Voice, Tone & Personality Systems',
      'Cultural Context Mapping',
      'Competitive Differentiation Framework',
    ],
    timeline: '3-4 Weeks',
    investment: 'From $15K',
    icon: Layers,
  },
  {
    title: 'Visual Identity Systems',
    tagline: 'More than a logo. A complete visual language.',
    description: 'A complete visual language that scales across every touchpoint. Systematic, memorable, unmistakably yours.',
    deliverables: [
      'Logo Design & Typography Systems',
      'Color Theory & Application Rules',
      'Icon Libraries & Pattern Systems',
      'Visual Guidelines Documentation',
    ],
    timeline: '4-6 Weeks',
    investment: 'From $12K',
    icon: Palette,
  },
  {
    title: 'Brand Aesthetics & Design Language',
    tagline: 'The invisible rules that make everything cohesive',
    description: 'From photography style to layout principles—we define the taste that becomes your signature.',
    deliverables: [
      'Art Direction Guidelines',
      'Photography & Illustration Styles',
      'Layout & Composition Systems',
      'Mood Boards & Reference Libraries',
    ],
    timeline: '2-3 Weeks',
    investment: 'From $8K',
    icon: Brush,
  },
  {
    title: 'Complete Brand Kit',
    tagline: 'Everything your team needs for brand excellence',
    description: 'Templates, guidelines, asset libraries, and usage rules—packaged for immediate deployment.',
    deliverables: [
      'Comprehensive Brand Guidelines (50-100 pages)',
      'Digital Asset Library (Figma, Adobe CC)',
      'Template Systems (Presentations, Documents, Social)',
      'Brand Training Materials',
    ],
    timeline: 'Full Package',
    investment: 'From $25K',
    icon: Package,
  },
  {
    title: 'Brand Narrative Studio',
    tagline: 'Stories that stick. Language that converts.',
    description: "We architect your brand's narrative universe—origin stories, manifesto, messaging hierarchy, and the language that makes people believers.",
    deliverables: [
      'Brand Story & Origin Narrative',
      'Manifesto & Mission Architecture',
      'Messaging Framework & Taglines',
      'Content Pillars & Editorial Voice',
    ],
    timeline: '2-3 Weeks',
    investment: 'From $10K',
    icon: BookOpen,
  },
  {
    title: 'Branding Brainstorm Sessions',
    tagline: 'Intensive creative workshops with breakthrough thinking',
    description: 'Where your team and ours collide. We facilitate breakthrough thinking, refine rough ideas, and leave you with clear direction.',
    deliverables: [
      '4-Hour Intensive Workshop',
      'Collaborative Miro Board Facilitation',
      'Post-Session Strategy Document',
      'Recording & Action Items',
    ],
    timeline: 'Virtual or In-Person',
    investment: 'From $3K',
    icon: Users,
  },
];

interface ServiceExpandedCardProps {
  title: string;
  tagline: string;
  description: string;
  deliverables: string[];
  timeline: string;
  investment: string;
  icon: typeof Layers;
  index: number;
}

const ServiceExpandedCard = ({ title, tagline, description, deliverables, timeline, investment, icon: Icon, index }: ServiceExpandedCardProps) => {
  const [expanded, setExpanded] = useState(false);
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="glass-deep rounded-3xl overflow-hidden group"
    >
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full p-8 md:p-10 text-left transition-all duration-300"
      >
        {/* Header */}
        <div className="flex items-start justify-between mb-6">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl glass-red flex items-center justify-center flex-shrink-0">
              <Icon className="w-5 h-5 text-alchemy-red" />
            </div>
            <div>
              <span className="font-mono text-xs text-alchemy-red/60 tracking-label">
                {String(index + 1).padStart(2, '0')}
              </span>
              <h3 className="font-display text-2xl md:text-3xl italic text-porcelain group-hover:text-alchemy-red transition-colors duration-300">
                {title}
              </h3>
            </div>
          </div>
          
          <ChevronDown 
            className={`w-6 h-6 text-alchemy-red transition-transform duration-500 flex-shrink-0 mt-2 ${
              expanded ? 'rotate-180' : ''
            }`} 
          />
        </div>
        
        <p className="font-body text-base text-alchemy-red/70 mb-4">
          {tagline}
        </p>
        
        <p className="font-body text-base text-porcelain/50 font-light leading-relaxed">
          {description}
        </p>
      </button>
      
      {/* Expandable Content */}
      <motion.div
        initial={false}
        animate={{ 
          height: expanded ? 'auto' : 0,
          opacity: expanded ? 1 : 0
        }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="overflow-hidden"
      >
        <div className="px-8 md:px-10 pb-10 pt-4 border-t border-porcelain/10">
          <h4 className="font-mono text-xs text-alchemy-red tracking-label uppercase mb-4">
            Deliverables
          </h4>
          
          <ul className="space-y-3 mb-8">
            {deliverables.map((item, i) => (
              <li key={i} className="flex items-start gap-3">
                <Check className="w-4 h-4 text-alchemy-red mt-1 flex-shrink-0" />
                <span className="font-body text-sm text-porcelain/70">{item}</span>
              </li>
            ))}
          </ul>
          
          <div className="flex flex-wrap gap-8 mb-8">
            <div>
              <p className="font-mono text-xs text-porcelain/40 tracking-label uppercase mb-1">
                Timeline
              </p>
              <p className="font-display text-lg italic text-porcelain">{timeline}</p>
            </div>
            <div>
              <p className="font-mono text-xs text-porcelain/40 tracking-label uppercase mb-1">
                Investment
              </p>
              <p className="font-display text-lg italic text-porcelain">{investment}</p>
            </div>
          </div>
          
          <MagneticButton 
            onClick={() => navigate('/book-sprint')}
            className="glass-cta-primary"
          >
            Book This Sprint
            <ArrowRight className="w-4 h-4" />
          </MagneticButton>
        </div>
      </motion.div>
    </motion.div>
  );
};

export const BrandingSolutionsPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background grain-overlay">
      <Navigation />
      
      {/* Hero */}
      <section className="relative min-h-[80vh] flex items-center overflow-hidden section-gradient">
        <div className="absolute inset-0">
          <div className="absolute top-1/3 left-1/4 w-[800px] h-[800px] bg-alchemy-red/10 rounded-full blur-[180px]" />
          <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-alchemy-red/5 rounded-full blur-[150px]" />
        </div>
        
        {/* Background number */}
        <div className="absolute top-1/2 right-0 -translate-y-1/2 pointer-events-none">
          <span className="font-display text-[400px] md:text-[600px] text-porcelain/[0.02] leading-none">
            02
          </span>
        </div>
        
        <div className="relative z-10 max-w-5xl mx-auto px-6 md:px-12 pt-32">
          {/* Breadcrumb */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-8"
          >
            <Link 
              to="/solutions" 
              className="inline-flex items-center gap-2 text-sm text-porcelain/50 hover:text-alchemy-red transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="font-body">Back to Solutions</span>
            </Link>
          </motion.div>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-mono text-xs text-alchemy-red tracking-label uppercase mb-4"
          >
            Pillar 02
          </motion.p>
          
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl leading-display tracking-display text-porcelain mb-8"
          >
            <span className="italic text-alchemy-red">Identity</span>
            <br />
            Meets System
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="font-body text-lg md:text-xl text-porcelain/50 max-w-2xl font-light leading-relaxed mb-10"
          >
            Identity infrastructure. Narrative precision. Visual inevitability.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <MagneticButton 
              onClick={() => navigate('/book-sprint')}
              className="glass-cta-primary"
            >
              Book a Brand Sprint
              <ArrowRight className="w-4 h-4" />
            </MagneticButton>
          </motion.div>
        </div>
      </section>
      
      {/* Services Grid */}
      <section className="relative py-32 overflow-hidden section-gradient">
        <div className="relative z-10 max-w-5xl mx-auto px-6 md:px-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mb-16"
          >
            <h2 className="font-display text-3xl md:text-4xl leading-display tracking-display text-porcelain">
              The <span className="italic text-alchemy-red">Services</span>
            </h2>
          </motion.div>
          
          <div className="space-y-6">
            {services.map((service, i) => (
              <ServiceExpandedCard key={service.title} {...service} index={i} />
            ))}
          </div>
        </div>
      </section>
      
      {/* CTA Footer */}
      <section className="relative py-32 overflow-hidden section-gradient">
        <div className="relative z-10 max-w-3xl mx-auto px-6 md:px-12 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="font-display text-4xl md:text-5xl lg:text-6xl leading-display tracking-display text-porcelain mb-6"
          >
            Ready to <span className="italic text-alchemy-red">transform</span>?
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-body text-lg text-porcelain/50 mb-10 font-light"
          >
            Let's build an identity that commands attention.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <MagneticButton 
              onClick={() => navigate('/book-sprint')}
              className="glass-cta-primary"
            >
              Book a Sprint
              <ArrowRight className="w-4 h-4" />
            </MagneticButton>
          </motion.div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default BrandingSolutionsPage;
