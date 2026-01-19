import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, X, Check, Sparkles, Layers, Target, Palette, Mountain, Grid3X3 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
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
      {/* Dynamic gradient background */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Central glow */}
        <motion.div 
          className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] rounded-full blur-[180px]"
          animate={{
            opacity: [0.08, 0.15, 0.08],
            scale: [1, 1.05, 1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          style={{ background: 'radial-gradient(ellipse, rgba(225, 6, 19, 0.2) 0%, transparent 70%)' }}
        />
        {/* Left accent */}
        <motion.div 
          className="absolute top-1/2 left-0 w-[500px] h-[500px] rounded-full blur-[150px]"
          animate={{
            opacity: [0.05, 0.1, 0.05],
            x: [-50, 0, -50],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          style={{ background: 'radial-gradient(circle, rgba(225, 6, 19, 0.15) 0%, transparent 70%)' }}
        />
        {/* Right accent */}
        <motion.div 
          className="absolute bottom-1/4 right-0 w-[600px] h-[600px] rounded-full blur-[160px]"
          animate={{
            opacity: [0.06, 0.12, 0.06],
            x: [50, 0, 50],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          style={{ background: 'radial-gradient(circle, rgba(80, 4, 10, 0.2) 0%, transparent 70%)' }}
        />
        {/* Bottom gradient */}
        <div className="absolute bottom-0 left-0 right-0 h-64 bg-gradient-to-t from-alchemy-black to-transparent" />
      </div>

      <div className="relative z-10 max-w-[1600px] mx-auto px-6 md:px-12">
        {/* Header */}
        <ScrollReveal>
          <motion.div className="text-center mb-16">
            <p className="font-mono text-[11px] text-alchemy-red tracking-[0.3em] uppercase mb-5">
              Our Portfolio
            </p>
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl xl:text-7xl leading-[1.05] tracking-[-0.02em] mb-6">
              <span className="italic text-alchemy-red">Curated</span>
              <span className="text-porcelain"> Works</span>
            </h2>
            <p className="font-body text-base md:text-lg text-porcelain/50 max-w-lg mx-auto font-light leading-relaxed">
              Strategic brand transformations where intelligence meets craft.
            </p>
          </motion.div>
        </ScrollReveal>

        {/* Symmetric Liquid Glass Filter Bar */}
        <ScrollReveal delay={0.1}>
          <div className="flex justify-center mb-16">
            <motion.div 
              className="inline-flex items-center gap-2 p-2 rounded-full"
              style={{
                background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.06) 0%, rgba(255, 255, 255, 0.02) 100%)',
                backdropFilter: 'blur(24px)',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.05)',
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
                        background: 'linear-gradient(135deg, rgba(225, 6, 19, 0.25) 0%, rgba(225, 6, 19, 0.1) 100%)',
                        border: '1px solid rgba(225, 6, 19, 0.4)',
                        boxShadow: '0 0 20px rgba(225, 6, 19, 0.2)',
                      }}
                      transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                  <span className="relative z-10">{filter}</span>
                </motion.button>
              ))}
            </motion.div>
          </div>
        </ScrollReveal>

        {/* Grid with rounded aesthetic */}
        <SpotlightContainer className="grid grid-cols-12 gap-5 md:gap-6 auto-rows-[200px] md:auto-rows-[280px]">
          {filteredProjects.map((project, i) => {
            const Icon = projectIcons[project.id] || Sparkles;
            
            return (
              <SpotlightItem key={project.id} id={project.id} className={gridPositions[i] || 'col-span-6 md:col-span-4'}>
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ duration: 0.6, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                  onClick={() => setSelectedProject(project)}
                  className="group relative rounded-3xl overflow-hidden cursor-pointer h-full"
                  style={{
                    background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.04) 0%, rgba(255, 255, 255, 0.01) 100%)',
                    backdropFilter: 'blur(20px)',
                    border: '1px solid rgba(255, 255, 255, 0.06)',
                  }}
                >
                  {/* Image/Video */}
                  <div className="absolute inset-0 overflow-hidden rounded-3xl">
                    {project.video && i === 0 ? (
                      <ShimmerVideo
                        src={project.video}
                        wrapperClassName="w-full h-full"
                        className="w-full h-full object-cover opacity-50 group-hover:opacity-70 transition-all duration-700 group-hover:scale-105"
                      />
                    ) : (
                      <ShimmerImage
                        src={project.image}
                        alt={project.title}
                        wrapperClassName="w-full h-full"
                        className="w-full h-full object-cover opacity-40 group-hover:opacity-60 transition-all duration-700 group-hover:scale-105"
                      />
                    )}
                  </div>

                  {/* Gradient overlays */}
                  <div className="absolute inset-0 bg-gradient-to-t from-alchemy-black via-alchemy-black/50 to-alchemy-black/20 rounded-3xl" />
                  <div className="absolute inset-0 bg-gradient-to-br from-alchemy-red/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl" />

                  {/* Content */}
                  <div className="absolute inset-0 p-6 md:p-8 flex flex-col justify-between">
                    {/* Top row */}
                    <div className="flex items-start justify-between">
                      <motion.div
                        className="w-12 h-12 rounded-2xl flex items-center justify-center"
                        style={{
                          background: 'linear-gradient(135deg, rgba(225, 6, 19, 0.2) 0%, rgba(225, 6, 19, 0.08) 100%)',
                          backdropFilter: 'blur(12px)',
                          border: '1px solid rgba(225, 6, 19, 0.3)',
                        }}
                        whileHover={{ scale: 1.1, rotate: 5 }}
                      >
                        <Icon className="w-5 h-5 text-alchemy-red" />
                      </motion.div>
                      
                      <span 
                        className="px-3 py-1.5 rounded-full text-[10px] font-mono text-porcelain/80 tracking-[0.15em] uppercase"
                        style={{
                          background: 'rgba(255, 255, 255, 0.06)',
                          backdropFilter: 'blur(12px)',
                          border: '1px solid rgba(255, 255, 255, 0.1)',
                        }}
                      >
                        {project.category}
                      </span>
                    </div>

                    {/* Bottom row */}
                    <div>
                      <motion.h3 
                        className={`font-display italic text-porcelain mb-3 leading-tight ${
                          i === 0 ? 'text-3xl md:text-4xl lg:text-5xl' : 'text-xl md:text-2xl lg:text-3xl'
                        }`}
                        whileHover={{ x: 6 }}
                        transition={{ duration: 0.3 }}
                      >
                        {project.title}
                      </motion.h3>

                      <p className={`font-body text-porcelain/50 font-light line-clamp-2 mb-4 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0 ${
                        i === 0 ? 'text-sm md:text-base max-w-md' : 'text-xs md:text-sm'
                      }`}>
                        {project.description}
                      </p>

                      <motion.div 
                        className="inline-flex items-center gap-2 text-alchemy-red font-body text-sm opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0"
                        whileHover={{ x: 4 }}
                      >
                        <span>Explore</span>
                        <ArrowUpRight className="w-4 h-4" />
                      </motion.div>
                    </div>
                  </div>

                  {/* Border glow on hover */}
                  <motion.div 
                    className="absolute inset-0 rounded-3xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{
                      border: '1px solid rgba(225, 6, 19, 0.35)',
                      boxShadow: '0 0 50px rgba(225, 6, 19, 0.12), inset 0 0 60px rgba(225, 6, 19, 0.04)',
                    }}
                  />
                </motion.div>
              </SpotlightItem>
            );
          })}
        </SpotlightContainer>

        {/* View All CTA */}
        <ScrollReveal delay={0.3}>
          <motion.div className="flex justify-center mt-16">
            <motion.button
              onClick={() => navigate('/work')}
              className="group inline-flex items-center gap-3 px-8 py-4 rounded-full font-body text-sm"
              style={{
                background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.06) 0%, rgba(255, 255, 255, 0.02) 100%)',
                backdropFilter: 'blur(24px)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
              }}
              whileHover={{ 
                scale: 1.02,
                boxShadow: '0 0 40px rgba(225, 6, 19, 0.2)',
                borderColor: 'rgba(225, 6, 19, 0.3)',
              }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="text-porcelain group-hover:text-alchemy-red transition-colors">View All Works</span>
              <ArrowUpRight className="w-4 h-4 text-porcelain/50 group-hover:text-alchemy-red group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
            </motion.button>
          </motion.div>
        </ScrollReveal>
      </div>

      {/* Modal - keeping existing modal code */}
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
              className="relative z-10 w-full max-w-5xl max-h-[90vh] overflow-y-auto rounded-3xl"
              style={{
                background: 'linear-gradient(135deg, rgba(20, 20, 22, 0.95) 0%, rgba(10, 10, 11, 0.98) 100%)',
                backdropFilter: 'blur(40px)',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                boxShadow: '0 0 100px rgba(225, 6, 19, 0.1), 0 32px 64px rgba(0, 0, 0, 0.5)',
              }}
            >
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-6 right-6 z-20 w-12 h-12 rounded-full flex items-center justify-center hover:bg-porcelain/10 transition-colors"
                style={{
                  background: 'rgba(255, 255, 255, 0.06)',
                  backdropFilter: 'blur(12px)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                }}
              >
                <X className="w-5 h-5 text-porcelain/60" />
              </button>

              <div className="relative aspect-[16/9] overflow-hidden rounded-t-3xl">
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

                <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12">
                  <div className="flex items-center gap-3 mb-4">
                    <span 
                      className="inline-block px-3 py-1 rounded-full text-xs font-mono text-porcelain/80 tracking-[0.15em] uppercase"
                      style={{
                        background: 'rgba(255, 255, 255, 0.08)',
                        backdropFilter: 'blur(12px)',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                      }}
                    >
                      {selectedProject.category}
                    </span>
                  </div>
                  <h3 className="font-display text-4xl md:text-5xl lg:text-6xl italic text-porcelain mb-2">
                    {selectedProject.title}
                  </h3>
                </div>
              </div>

              <div className="p-8 md:p-12">
                <div className="mb-12">
                  <h4 className="font-mono text-xs text-alchemy-red tracking-[0.2em] uppercase mb-4">
                    Overview
                  </h4>
                  <p className="font-body text-base md:text-lg text-porcelain/70 leading-relaxed font-light">
                    {selectedProject.overview}
                  </p>
                </div>

                <div className="mb-12">
                  <h4 className="font-mono text-xs text-alchemy-red tracking-[0.2em] uppercase mb-6">
                    What We Offer
                  </h4>
                  <div className="grid md:grid-cols-3 gap-4">
                    {selectedProject.services.map((service, i) => (
                      <div 
                        key={i} 
                        className="rounded-2xl p-6"
                        style={{
                          background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.04) 0%, rgba(255, 255, 255, 0.01) 100%)',
                          border: '1px solid rgba(255, 255, 255, 0.06)',
                        }}
                      >
                        <div 
                          className="w-8 h-8 rounded-xl flex items-center justify-center mb-4"
                          style={{
                            background: 'linear-gradient(135deg, rgba(225, 6, 19, 0.2) 0%, rgba(225, 6, 19, 0.08) 100%)',
                            border: '1px solid rgba(225, 6, 19, 0.3)',
                          }}
                        >
                          <Check className="w-4 h-4 text-alchemy-red" />
                        </div>
                        <p className="font-body text-sm text-porcelain/70">{service}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  {selectedProject.cta && (
                    <motion.button
                      onClick={() => {
                        if (selectedProject.cta?.link.startsWith('/')) {
                          navigate(selectedProject.cta.link);
                        } else {
                          window.open(selectedProject.cta?.link, '_blank');
                        }
                      }}
                      className="inline-flex items-center gap-3 px-8 py-4 rounded-full font-body text-sm"
                      style={{
                        background: 'linear-gradient(135deg, rgba(225, 6, 19, 0.2) 0%, rgba(225, 6, 19, 0.08) 100%)',
                        border: '1px solid rgba(225, 6, 19, 0.4)',
                        boxShadow: '0 0 30px rgba(225, 6, 19, 0.2)',
                      }}
                      whileHover={{ scale: 1.02, boxShadow: '0 0 50px rgba(225, 6, 19, 0.3)' }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <span className="text-porcelain">{selectedProject.cta.label}</span>
                      <ArrowUpRight className="w-4 h-4 text-alchemy-red" />
                    </motion.button>
                  )}
                  <motion.button
                    onClick={() => setSelectedProject(null)}
                    className="inline-flex items-center gap-3 px-8 py-4 rounded-full font-body text-sm text-porcelain/60 hover:text-porcelain transition-colors"
                    style={{
                      background: 'rgba(255, 255, 255, 0.04)',
                      border: '1px solid rgba(255, 255, 255, 0.08)',
                    }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Close
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
