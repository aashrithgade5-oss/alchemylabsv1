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

export const CaseStudies = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const navigate = useNavigate();

  // Abstract 6-element grid positions
  const gridPositions = [
    'col-span-12 md:col-span-8 row-span-2', // Large featured
    'col-span-6 md:col-span-4',              // Top right
    'col-span-6 md:col-span-4',              // Middle right
    'col-span-6 md:col-span-4',              // Bottom left
    'col-span-6 md:col-span-4',              // Bottom middle
    'col-span-12 md:col-span-4',             // Bottom right full width on mobile
  ];

  const aspectRatios = [
    'aspect-[16/10]', // Large
    'aspect-[4/5]',   // Tall
    'aspect-[1/1]',   // Square
    'aspect-[4/3]',   // Landscape
    'aspect-[3/4]',   // Portrait
    'aspect-[16/9]',  // Wide
  ];

  return (
    <section id="work" className="relative py-32 overflow-hidden">
      {/* Enhanced mesh gradient background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1200px] h-[600px] bg-gradient-radial from-alchemy-red/8 via-alchemy-red/3 to-transparent rounded-full blur-[150px]" />
        <div className="absolute top-1/3 right-0 w-[500px] h-[500px] bg-gradient-radial from-deep-crimson/6 to-transparent rounded-full blur-[100px]" />
        <div className="absolute bottom-1/4 left-0 w-[600px] h-[600px] bg-gradient-radial from-alchemy-red/4 to-transparent rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-1/3 w-[400px] h-[400px] bg-gradient-conic from-alchemy-red/5 via-transparent to-deep-crimson/5 rounded-full blur-[100px]" />
      </div>

      <div className="relative z-10 max-w-[1600px] mx-auto px-6 md:px-12">
        {/* Header */}
        <ScrollReveal>
          <motion.div className="text-center mb-20">
            <p className="font-mono text-xs text-alchemy-red tracking-label uppercase mb-4">
              Curated Works
            </p>
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl xl:text-7xl leading-display tracking-display mb-6 text-balance">
              <span className="italic text-alchemy-red">Aether</span>
              <span className="text-porcelain/80"> Rituals</span>
            </h2>
            <p className="font-body text-base md:text-lg text-porcelain/50 max-w-xl mx-auto font-light leading-relaxed">
              Services we offer and conceptual explorations where intelligence meets craft.
              Each piece demonstrates what we'll build for you.
            </p>
          </motion.div>
        </ScrollReveal>

        {/* Abstract 6-Element Grid with Spotlight Effect */}
        <SpotlightContainer className="grid grid-cols-12 gap-4 md:gap-6 auto-rows-[200px] md:auto-rows-[250px]">
          {projects.slice(0, 6).map((project, i) => {
            const Icon = projectIcons[project.id] || Sparkles;
            
            return (
              <SpotlightItem key={project.id} id={project.id} className={gridPositions[i]}>
                <motion.div
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ duration: 0.6, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                  onClick={() => setSelectedProject(project)}
                  className="group relative rounded-2xl overflow-hidden cursor-pointer h-full"
                  style={{
                    background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.04) 0%, rgba(255, 255, 255, 0.01) 100%)',
                    backdropFilter: 'blur(20px)',
                    border: '1px solid rgba(255, 255, 255, 0.06)',
                  }}
                >
                  {/* Image/Video */}
                  <div className="absolute inset-0 overflow-hidden">
                    {project.video && i === 0 ? (
                      <ShimmerVideo
                        src={project.video}
                        wrapperClassName="w-full h-full"
                        className="w-full h-full object-cover opacity-60 group-hover:opacity-80 transition-opacity duration-700 group-hover:scale-105"
                      />
                    ) : (
                      <ShimmerImage
                        src={project.image}
                        alt={project.title}
                        wrapperClassName="w-full h-full"
                        className="w-full h-full object-cover opacity-50 group-hover:opacity-70 transition-all duration-700 group-hover:scale-105"
                      />
                    )}
                  </div>

                  {/* Gradient overlays */}
                  <div className="absolute inset-0 bg-gradient-to-t from-alchemy-black via-alchemy-black/60 to-alchemy-black/20" />
                  <div className="absolute inset-0 bg-gradient-to-br from-alchemy-red/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  {/* Liquid glass hover effect */}
                  <div 
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                    style={{
                      background: 'radial-gradient(ellipse at 30% 20%, rgba(225, 6, 19, 0.15) 0%, transparent 60%)',
                    }}
                  />

                  {/* Content */}
                  <div className="absolute inset-0 p-6 md:p-8 flex flex-col justify-between">
                    {/* Top row: Icon + Category */}
                    <div className="flex items-start justify-between">
                      <motion.div
                        className="w-12 h-12 rounded-xl flex items-center justify-center"
                        style={{
                          background: 'linear-gradient(135deg, rgba(225, 6, 19, 0.2) 0%, rgba(225, 6, 19, 0.08) 100%)',
                          backdropFilter: 'blur(12px)',
                          border: '1px solid rgba(225, 6, 19, 0.3)',
                        }}
                        whileHover={{ scale: 1.1 }}
                      >
                        <Icon className="w-5 h-5 text-alchemy-red" />
                      </motion.div>
                      
                      <div className="flex items-center gap-2">
                        {project.isConceptual && (
                          <span className="px-2 py-1 rounded-full text-[9px] font-mono text-porcelain/50 tracking-label uppercase bg-porcelain/5 border border-porcelain/10">
                            Concept
                          </span>
                        )}
                        <span 
                          className="px-3 py-1.5 rounded-full text-[10px] font-mono text-porcelain/80 tracking-label uppercase"
                          style={{
                            background: 'rgba(255, 255, 255, 0.06)',
                            backdropFilter: 'blur(12px)',
                            border: '1px solid rgba(255, 255, 255, 0.1)',
                          }}
                        >
                          {project.category}
                        </span>
                      </div>
                    </div>

                    {/* Bottom row: Title + Description */}
                    <div>
                      <motion.h3 
                        className={`font-display italic text-porcelain mb-2 text-balance ${
                          i === 0 ? 'text-3xl md:text-4xl lg:text-5xl' : 'text-xl md:text-2xl lg:text-3xl'
                        }`}
                        whileHover={{ x: 8 }}
                        transition={{ duration: 0.3 }}
                      >
                        {project.title}
                      </motion.h3>

                      <p className={`font-body text-porcelain/50 font-light line-clamp-2 mb-4 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0 ${
                        i === 0 ? 'text-sm md:text-base max-w-md' : 'text-xs md:text-sm'
                      }`}>
                        {project.description}
                      </p>

                      {/* CTA */}
                      <motion.div 
                        className="inline-flex items-center gap-2 text-alchemy-red font-body text-sm opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0"
                        whileHover={{ x: 5 }}
                      >
                        <span>Explore</span>
                        <ArrowUpRight className="w-4 h-4" />
                      </motion.div>
                    </div>
                  </div>

                  {/* Border glow on hover */}
                  <motion.div 
                    className="absolute inset-0 rounded-2xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{
                      border: '1px solid rgba(225, 6, 19, 0.4)',
                      boxShadow: '0 0 40px rgba(225, 6, 19, 0.15), inset 0 0 60px rgba(225, 6, 19, 0.05)',
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

      {/* Case Study Mini Page Stack Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedProject(null)}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8"
          >
            {/* Backdrop */}
            <div className="absolute inset-0 bg-alchemy-black/95 backdrop-blur-xl" />

            {/* Stacked page effect */}
            <div className="absolute inset-8 md:inset-16 pointer-events-none">
              <motion.div
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 0.3, y: 0, scale: 0.95 }}
                className="absolute inset-0 rounded-3xl"
                style={{
                  background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.03) 0%, rgba(255, 255, 255, 0.01) 100%)',
                  border: '1px solid rgba(255, 255, 255, 0.05)',
                  transform: 'translateY(30px) scale(0.92)',
                }}
              />
              <motion.div
                initial={{ opacity: 0, y: 15, scale: 0.97 }}
                animate={{ opacity: 0.5, y: 0, scale: 0.97 }}
                className="absolute inset-0 rounded-3xl"
                style={{
                  background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.04) 0%, rgba(255, 255, 255, 0.02) 100%)',
                  border: '1px solid rgba(255, 255, 255, 0.06)',
                  transform: 'translateY(15px) scale(0.96)',
                }}
              />
            </div>

            {/* Modal */}
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
              {/* Close button */}
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

              {/* Hero Image/Video */}
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

                {/* Title overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12">
                  <div className="flex items-center gap-3 mb-4">
                    <span 
                      className="inline-block px-3 py-1 rounded-full text-xs font-mono text-porcelain/80 tracking-label uppercase"
                      style={{
                        background: 'rgba(255, 255, 255, 0.08)',
                        backdropFilter: 'blur(12px)',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                      }}
                    >
                      {selectedProject.category}
                    </span>
                    {selectedProject.isConceptual && (
                      <span className="px-3 py-1 rounded-full text-xs font-mono text-alchemy-red tracking-label uppercase bg-alchemy-red/10 border border-alchemy-red/20">
                        Conceptual
                      </span>
                    )}
                  </div>
                  <h3 className="font-display text-4xl md:text-5xl lg:text-6xl italic text-porcelain mb-2 text-balance">
                    {selectedProject.title}
                  </h3>
                </div>
              </div>

              {/* Content */}
              <div className="p-8 md:p-12">
                {/* Overview */}
                <div className="mb-12">
                  <h4 className="font-mono text-xs text-alchemy-red tracking-label uppercase mb-4">
                    Overview
                  </h4>
                  <p className="font-body text-base md:text-lg text-porcelain/70 leading-relaxed font-light">
                    {selectedProject.overview}
                  </p>
                </div>

                {/* What We Offer/Did */}
                <div className="mb-12">
                  <h4 className="font-mono text-xs text-alchemy-red tracking-label uppercase mb-6">
                    {selectedProject.isConceptual ? 'What We Explored' : 'What We Offer'}
                  </h4>
                  <div className="grid md:grid-cols-3 gap-4">
                    {selectedProject.services.map((service, i) => (
                      <div 
                        key={i} 
                        className="rounded-xl p-6"
                        style={{
                          background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.04) 0%, rgba(255, 255, 255, 0.01) 100%)',
                          border: '1px solid rgba(255, 255, 255, 0.06)',
                        }}
                      >
                        <div 
                          className="w-8 h-8 rounded-lg flex items-center justify-center mb-4"
                          style={{
                            background: 'linear-gradient(135deg, rgba(225, 6, 19, 0.2) 0%, rgba(225, 6, 19, 0.08) 100%)',
                            border: '1px solid rgba(225, 6, 19, 0.3)',
                          }}
                        >
                          <Check className="w-4 h-4 text-alchemy-red" />
                        </div>
                        <h5 className="font-display text-lg italic text-porcelain mb-2">
                          {service.title}
                        </h5>
                        <p className="font-body text-sm text-porcelain/50 font-light">
                          {service.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Visual Gallery */}
                <div className="mb-12">
                  <h4 className="font-mono text-xs text-alchemy-red tracking-label uppercase mb-6">
                    Visual Exploration
                  </h4>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {selectedProject.visuals.map((visual, i) => (
                      <div key={i} className="aspect-square rounded-xl overflow-hidden">
                        <ShimmerImage
                          src={visual}
                          alt={`${selectedProject.title} visual ${i + 1}`}
                          wrapperClassName="w-full h-full"
                          className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                    ))}
                  </div>
                </div>

                {/* CTA */}
                {!selectedProject.isConceptual && (
                  <div className="flex justify-center">
                    <motion.button
                      onClick={() => {
                        setSelectedProject(null);
                        navigate('/book-sprint');
                      }}
                      className="inline-flex items-center gap-3 px-8 py-4 rounded-full"
                      style={{
                        background: 'linear-gradient(135deg, rgba(225, 6, 19, 0.2) 0%, rgba(225, 6, 19, 0.08) 100%)',
                        backdropFilter: 'blur(16px)',
                        border: '1px solid rgba(225, 6, 19, 0.4)',
                        boxShadow: '0 0 30px rgba(225, 6, 19, 0.2)',
                      }}
                      whileHover={{ 
                        scale: 1.02,
                        boxShadow: '0 0 50px rgba(225, 6, 19, 0.4)',
                      }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <span className="font-body text-porcelain">Book This Service</span>
                      <ArrowUpRight className="w-4 h-4 text-alchemy-red" />
                    </motion.button>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};