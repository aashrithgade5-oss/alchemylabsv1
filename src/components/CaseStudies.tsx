import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, ArrowRight, X, Check, Sparkles, Layers, Target, Palette, Mountain, Grid3X3 } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';
import { projects, Project } from '@/data/projects';
import { ScrollReveal } from '@/components/ScrollReveal';
import { SpotlightContainer, SpotlightItem } from '@/components/SpotlightGrid';
import { ShimmerImage, ShimmerVideo } from '@/components/ShimmerImage';

// Icon mapping for projects
const projectIcons: Record<string, React.ElementType> = {
  'branding-solutions': Palette,
  'consultation-sessions': Target,
  'aether-rituals': Sparkles,
  'oakley-showcase': Mountain,
  'arcteryx-branding': Layers,
  'identity-systems': Grid3X3,
};

// Filter categories
const filterCategories = ['All', 'Branding', 'AI', 'Consultation', 'Identity'];

// Proof labels for projects
const proofLabels: Record<string, string> = {
  'branding-solutions': '24h Build',
  'consultation-sessions': 'Strategy Sprint',
  'aether-rituals': 'Identity System',
  'oakley-showcase': 'Concept Study',
  'arcteryx-branding': 'Identity System',
  'identity-systems': '24h Build',
};

export const CaseStudies = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [activeFilter, setActiveFilter] = useState('All');
  const navigate = useNavigate();

  // Filter projects based on active filter
  const filteredProjects = activeFilter === 'All' 
    ? projects.slice(0, 6)
    : projects.filter(p => p.category.toLowerCase().includes(activeFilter.toLowerCase())).slice(0, 6);

  // Grid positions for asymmetric layout
  const gridPositions = [
    'col-span-12 md:col-span-8 row-span-2',
    'col-span-6 md:col-span-4',
    'col-span-6 md:col-span-4',
    'col-span-6 md:col-span-4',
    'col-span-6 md:col-span-4',
    'col-span-12 md:col-span-4',
  ];

  return (
    <section id="work" className="relative py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div 
          className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[500px] rounded-full blur-[150px]"
          animate={{ opacity: [0.06, 0.12, 0.06] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
          style={{ background: 'radial-gradient(ellipse, rgba(220, 38, 38, 0.15) 0%, transparent 70%)' }}
        />
        <div className="absolute bottom-0 left-0 right-0 h-64 bg-gradient-to-t from-alchemy-black to-transparent" />
      </div>

      <div className="relative z-10 max-w-[1600px] mx-auto px-6 md:px-12">
        {/* Header */}
        <ScrollReveal>
          <motion.div className="text-center mb-16">
            <span className="inline-block px-4 py-2 rounded-full backdrop-blur-md mb-6"
              style={{
                background: 'linear-gradient(135deg, rgba(220, 38, 38, 0.15) 0%, rgba(255, 255, 255, 0.05) 100%)',
                border: '1px solid rgba(220, 38, 38, 0.3)',
              }}
            >
              <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-porcelain/80">
                Our Portfolio
              </span>
            </span>
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl xl:text-7xl leading-[1.05] tracking-[-0.02em] mb-6">
              <span className="italic text-alchemy-red">Curated</span>
              <span className="text-porcelain"> Works</span>
            </h2>
            <p className="font-body text-base md:text-lg text-porcelain/50 max-w-lg mx-auto font-light leading-relaxed">
              Strategic brand transformations where intelligence meets craft.
            </p>
          </motion.div>
        </ScrollReveal>

        {/* Filter Bar */}
        <ScrollReveal delay={0.1}>
          <div className="flex justify-center mb-16">
            <motion.div 
              className="inline-flex items-center gap-2 p-2 rounded-full"
              style={{
                background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.04) 0%, rgba(255, 255, 255, 0.01) 100%)',
                backdropFilter: 'blur(16px)',
                border: '1px solid rgba(255, 255, 255, 0.06)',
              }}
            >
              {filterCategories.map((filter) => (
                <motion.button
                  key={filter}
                  onClick={() => setActiveFilter(filter)}
                  className={`relative px-5 py-2.5 rounded-full font-body text-sm transition-all duration-300 ${
                    activeFilter === filter 
                      ? 'text-porcelain' 
                      : 'text-porcelain/50 hover:text-porcelain/80'
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {activeFilter === filter && (
                    <motion.div
                      layoutId="activeFilter"
                      className="absolute inset-0 rounded-full"
                      style={{
                        background: 'linear-gradient(135deg, rgba(220, 38, 38, 0.2) 0%, rgba(220, 38, 38, 0.08) 100%)',
                        border: '1px solid rgba(220, 38, 38, 0.35)',
                      }}
                      transition={{ type: 'spring', bounce: 0.15, duration: 0.5 }}
                    />
                  )}
                  <span className="relative z-10">{filter}</span>
                </motion.button>
              ))}
            </motion.div>
          </div>
        </ScrollReveal>

        {/* Grid */}
        <SpotlightContainer className="grid grid-cols-12 gap-5 md:gap-6 auto-rows-[200px] md:auto-rows-[280px]">
          {filteredProjects.map((project, i) => {
            const Icon = projectIcons[project.id] || Sparkles;
            const proofLabel = proofLabels[project.id] || 'Case Study';
            const isConceptual = project.id.includes('oakley') || project.id.includes('arcteryx');
            
            return (
              <SpotlightItem key={project.id} id={project.id} className={gridPositions[i] || 'col-span-6 md:col-span-4'}>
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ duration: 0.5, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }}
                  onClick={() => setSelectedProject(project)}
                  className="group relative rounded-2xl overflow-hidden cursor-pointer h-full"
                  style={{
                    background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.03) 0%, rgba(255, 255, 255, 0.01) 100%)',
                    border: '1px solid rgba(255, 255, 255, 0.05)',
                  }}
                >
                  {/* Image/Video */}
                  <div className="absolute inset-0 overflow-hidden rounded-2xl">
                    {project.video && i === 0 ? (
                      <ShimmerVideo
                        src={project.video}
                        wrapperClassName="w-full h-full"
                        className="w-full h-full object-cover opacity-50 group-hover:opacity-70 transition-all duration-500 group-hover:scale-105"
                      />
                    ) : (
                      <ShimmerImage
                        src={project.image}
                        alt={project.title}
                        wrapperClassName="w-full h-full"
                        className="w-full h-full object-cover opacity-40 group-hover:opacity-60 transition-all duration-500 group-hover:scale-105"
                      />
                    )}
                  </div>

                  {/* Overlays */}
                  <div className="absolute inset-0 bg-gradient-to-t from-alchemy-black via-alchemy-black/50 to-alchemy-black/20 rounded-2xl" />

                  {/* Content */}
                  <div className="absolute inset-0 p-5 md:p-7 flex flex-col justify-between">
                    {/* Top row */}
                    <div className="flex items-start justify-between">
                      <motion.div
                        className="w-10 h-10 rounded-xl flex items-center justify-center"
                        style={{
                          background: 'linear-gradient(135deg, rgba(220, 38, 38, 0.15) 0%, rgba(220, 38, 38, 0.05) 100%)',
                          border: '1px solid rgba(220, 38, 38, 0.25)',
                        }}
                      >
                        <Icon className="w-4 h-4 text-alchemy-red" />
                      </motion.div>
                      
                      <div className="flex flex-col items-end gap-1">
                        {/* Proof Label */}
                        <span 
                          className="px-2.5 py-1 rounded-full text-[9px] font-mono text-porcelain/80 tracking-[0.1em] uppercase"
                          style={{
                            background: 'rgba(255, 255, 255, 0.05)',
                            border: '1px solid rgba(255, 255, 255, 0.08)',
                          }}
                        >
                          {proofLabel}
                        </span>
                        
                        {/* Conceptual tag */}
                        {isConceptual && (
                          <span className="font-mono text-[8px] text-porcelain/40 tracking-wider uppercase">
                            Self-Initiated Study
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Bottom row */}
                    <div>
                      <h3 className={`font-display italic text-porcelain mb-2 leading-tight ${
                        i === 0 ? 'text-2xl md:text-3xl lg:text-4xl' : 'text-lg md:text-xl lg:text-2xl'
                      }`}>
                        {project.title}
                      </h3>

                      {/* Hover overlay - Case study teaser */}
                      <div className="opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
                        <p className="font-mono text-[9px] text-alchemy-red/70 uppercase tracking-wider mb-1">
                          What we did
                        </p>
                        <p className={`font-body text-porcelain/60 font-light line-clamp-2 mb-3 ${
                          i === 0 ? 'text-sm' : 'text-xs'
                        }`}>
                          {project.services?.slice(0, 3).join(' · ') || project.category}
                        </p>
                        <div className="inline-flex items-center gap-2 text-alchemy-red font-body text-sm">
                          <span>Explore</span>
                          <ArrowUpRight className="w-3.5 h-3.5" />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Border glow on hover */}
                  <div 
                    className="absolute inset-0 rounded-2xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-400"
                    style={{
                      border: '1px solid rgba(220, 38, 38, 0.3)',
                      boxShadow: '0 0 40px rgba(220, 38, 38, 0.1)',
                    }}
                  />
                </motion.div>
              </SpotlightItem>
            );
          })}
        </SpotlightContainer>

        {/* Work CTA Strip */}
        <ScrollReveal delay={0.3}>
          <motion.div 
            className="mt-16 text-center rounded-2xl py-12 px-6"
            style={{
              background: 'linear-gradient(135deg, rgba(220, 38, 38, 0.06) 0%, rgba(255, 255, 255, 0.02) 100%)',
              border: '1px solid rgba(220, 38, 38, 0.15)',
            }}
          >
            <h3 className="font-display text-2xl md:text-3xl text-porcelain mb-4">
              Want something like this <span className="italic text-alchemy-red">built fast</span>?
            </h3>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                to="/book-sprint"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-body text-sm transition-all duration-300"
                style={{
                  background: 'linear-gradient(135deg, rgba(220, 38, 38, 0.2) 0%, rgba(220, 38, 38, 0.08) 100%)',
                  border: '1px solid rgba(220, 38, 38, 0.4)',
                }}
              >
                <span className="text-porcelain">Book a Sprint</span>
                <ArrowRight className="w-4 h-4 text-porcelain" />
              </Link>
              <button
                onClick={() => navigate('/work')}
                className="inline-flex items-center gap-2 px-6 py-3 font-body text-sm text-porcelain/50 hover:text-porcelain transition-colors"
              >
                <span>View All Works</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        </ScrollReveal>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedProject(null)}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8"
          >
            <div className="absolute inset-0 bg-alchemy-black/95 backdrop-blur-xl" />

            <motion.div
              initial={{ scale: 0.9, y: 50, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.9, y: 50, opacity: 0 }}
              transition={{ type: 'spring', damping: 25 }}
              onClick={(e) => e.stopPropagation()}
              className="relative z-10 w-full max-w-5xl max-h-[90vh] overflow-y-auto rounded-2xl"
              style={{
                background: 'linear-gradient(135deg, rgba(20, 20, 22, 0.95) 0%, rgba(10, 10, 10, 0.98) 100%)',
                border: '1px solid rgba(255, 255, 255, 0.06)',
              }}
            >
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-6 right-6 z-20 w-10 h-10 rounded-full flex items-center justify-center hover:bg-porcelain/10 transition-colors"
                style={{
                  background: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                }}
              >
                <X className="w-4 h-4 text-porcelain/60" />
              </button>

              <div className="relative aspect-[16/9] overflow-hidden rounded-t-2xl">
                {selectedProject.video ? (
                  <ShimmerVideo
                    src={selectedProject.video}
                    wrapperClassName="w-full h-full"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <ShimmerImage
                    src={selectedProject.image}
                    alt={selectedProject.title}
                    wrapperClassName="w-full h-full"
                    className="w-full h-full object-cover"
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-alchemy-black via-alchemy-black/50 to-transparent" />

                <div className="absolute bottom-0 left-0 right-0 p-8 md:p-10">
                  <span 
                    className="inline-block px-3 py-1 rounded-full text-[10px] font-mono text-porcelain/80 tracking-[0.1em] uppercase mb-3"
                    style={{
                      background: 'rgba(255, 255, 255, 0.06)',
                      border: '1px solid rgba(255, 255, 255, 0.08)',
                    }}
                  >
                    {selectedProject.category}
                  </span>
                  <h3 className="font-display text-3xl md:text-4xl lg:text-5xl italic text-porcelain">
                    {selectedProject.title}
                  </h3>
                </div>
              </div>

              <div className="p-8 md:p-10">
                <div className="mb-10">
                  <h4 className="font-mono text-[10px] text-alchemy-red tracking-[0.2em] uppercase mb-4">
                    Overview
                  </h4>
                  <p className="font-body text-base text-porcelain/70 leading-relaxed font-light">
                    {selectedProject.overview}
                  </p>
                </div>

                <div>
                  <h4 className="font-mono text-[10px] text-alchemy-red tracking-[0.2em] uppercase mb-5">
                    What We Offer
                  </h4>
                  <div className="grid md:grid-cols-3 gap-4">
                    {selectedProject.services.map((service, i) => (
                      <div 
                        key={i} 
                        className="rounded-xl p-5"
                        style={{
                          background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.03) 0%, rgba(255, 255, 255, 0.01) 100%)',
                          border: '1px solid rgba(255, 255, 255, 0.05)',
                        }}
                      >
                        <div className="flex items-center gap-2">
                          <Check className="w-4 h-4 text-alchemy-red" />
                          <span className="font-body text-sm text-porcelain">{service}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
