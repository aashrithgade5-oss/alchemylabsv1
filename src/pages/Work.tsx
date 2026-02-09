import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, X, Check } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { SEOHead } from '@/components/SEOHead';
import { projects, Project } from '@/data/projects';
import { ScrollReveal } from '@/components/ScrollReveal';
import { ShimmerImage, ShimmerVideo } from '@/components/ShimmerImage';
import { Lightbox, LightboxTrigger } from '@/components/Lightbox';
import { BlueprintGrid } from '@/components/effects/BlueprintGrid';
import { NoiseTexture } from '@/components/effects/NoiseTexture';
import { WorkProjectCard } from '@/components/work/WorkProjectCard';

// Unified filter options
const filters = [
  { id: 'all', label: 'All' },
  { id: 'client', label: 'Client' },
  { id: 'conceptual', label: 'Conceptual' },
];

// Masonry-style layout: alternating 2-col and 1-col rows
const gridPositions = [
  'col-span-12 md:col-span-7 row-span-2',
  'col-span-12 md:col-span-5 row-span-1',
  'col-span-12 md:col-span-5 row-span-1',
  'col-span-12 md:col-span-5 row-span-1',
  'col-span-12 md:col-span-7 row-span-2',
  'col-span-12 md:col-span-5 row-span-1',
];

export const Work = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [activeFilter, setActiveFilter] = useState('all');
  const [lightboxMedia, setLightboxMedia] = useState<{ src: string; type: 'image' | 'video'; caption?: string } | null>(null);
  const navigate = useNavigate();

  // Filter projects based on category and service type
  const filteredProjects = useMemo(() => {
    if (activeFilter === 'all') return projects;
    if (activeFilter === 'client') return projects.filter(p => !p.isConceptual);
    if (activeFilter === 'conceptual') return projects.filter(p => p.isConceptual);
    return projects;
  }, [activeFilter]);

  const openLightbox = (src: string, type: 'image' | 'video', caption?: string) => {
    setLightboxMedia({ src, type, caption });
  };

  return (
    <div className="min-h-screen bg-background grain-overlay">
      <SEOHead 
        title="Portfolio"
        description="Explore our curated works: brand architecture, AI-generated campaigns, and strategic consultation projects."
      />
      <Navigation />
      
      {/* Hero */}
      <section className="relative pt-32 pb-16 overflow-hidden">
        {/* Background layers */}
        <div className="absolute inset-0 pointer-events-none">
          <BlueprintGrid opacity={0.02} />
          <NoiseTexture opacity={0.03} />
          <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full blur-[100px] -translate-y-1/3 translate-x-1/4" style={{ background: 'radial-gradient(circle, rgba(225,6,19,0.08) 0%, transparent 70%)' }} />
          <div className="absolute bottom-0 left-0 w-[500px] h-[400px] rounded-full blur-[80px] translate-y-1/3 -translate-x-1/4" style={{ background: 'radial-gradient(circle, rgba(225,6,19,0.05) 0%, transparent 70%)' }} />
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12">
          {/* Breadcrumbs */}
          <Breadcrumbs className="mb-8" />
          
          {/* Header */}
          <ScrollReveal>
            <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-16">
              <div>
                <p className="font-mono text-xs text-alchemy-red tracking-label uppercase mb-4">
                  Portfolio
                </p>
                <h1 className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl leading-[0.9] tracking-display text-porcelain text-balance">
                  Curated
                  <br />
                  <span className="italic text-alchemy-red">Works</span>
                </h1>
              </div>
              
              <p className="font-body text-base text-porcelain/40 max-w-sm font-light lg:text-right">
                Services we offer and conceptual explorations demonstrating our capabilities.
              </p>
            </div>
          </ScrollReveal>

          {/* Minimal Filter Bar */}
          <ScrollReveal delay={0.2}>
            <div className="inline-flex items-center gap-1 p-1 rounded-full border border-white/[0.06] bg-white/[0.03]">
              {filters.map((filter) => (
                <button
                  key={filter.id}
                  onClick={() => setActiveFilter(filter.id)}
                  className={`relative px-5 py-2 rounded-full font-mono text-xs uppercase tracking-[0.12em] transition-colors duration-200 ${
                    activeFilter === filter.id
                      ? 'text-porcelain'
                      : 'text-porcelain/40 hover:text-porcelain/70'
                  }`}
                >
                  {activeFilter === filter.id && (
                    <motion.div
                      layoutId="work-filter"
                      className="absolute inset-0 rounded-full bg-alchemy-red/15 border border-alchemy-red/30"
                      transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                    />
                  )}
                  <span className="relative z-10">{filter.label}</span>
                </button>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Grid */}
      <section className="relative py-8 pb-24">
        {/* Subtle background texture */}
        <div className="absolute inset-0 pointer-events-none">
          <BlueprintGrid opacity={0.015} />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] rounded-full blur-[120px]" style={{ background: 'radial-gradient(circle, rgba(225,6,19,0.06) 0%, transparent 60%)' }} />
        </div>

        <div className="max-w-[1400px] mx-auto px-6 md:px-10 relative z-10">
          {/* Project count */}
          <div className="flex items-center justify-between mb-8">
            <span className="font-mono text-[10px] text-porcelain/30 uppercase tracking-[0.15em]">
              {filteredProjects.length} project{filteredProjects.length !== 1 ? 's' : ''}
            </span>
            <div className="h-px flex-1 mx-6 bg-white/[0.04]" />
            <span className="font-mono text-[10px] text-porcelain/20 uppercase tracking-[0.15em]">
              Grid View
            </span>
          </div>

          <div className="grid grid-cols-12 gap-3 md:gap-4 auto-rows-[160px] md:auto-rows-[220px]">
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((project, i) => {
                const position = gridPositions[i % gridPositions.length];
                const isHero = position.includes('row-span-2');

                return (
                  <motion.div
                    key={project.id}
                    className={position}
                    layout
                  >
                    <WorkProjectCard
                      project={project}
                      index={i}
                      isHero={isHero}
                      onClick={() => setSelectedProject(project)}
                    />
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>

          {/* Empty State */}
          {filteredProjects.length === 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-20"
            >
              <p className="font-display text-2xl italic text-porcelain/50">
                No works in this category yet.
              </p>
              <button
                onClick={() => setActiveFilter('all')}
                className="mt-4 font-body text-sm text-alchemy-red hover:text-alchemy-red/80 transition-colors duration-200"
              >
                View all works →
              </button>
            </motion.div>
          )}
        </div>
      </section>

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

              {/* Hero Media with Lightbox */}
              <LightboxTrigger
                onClick={() => openLightbox(
                  selectedProject.video || selectedProject.image,
                  selectedProject.video ? 'video' : 'image',
                  selectedProject.title
                )}
                className="rounded-t-3xl overflow-hidden"
              >
                <div className="relative aspect-video overflow-hidden">
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
              </LightboxTrigger>

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

                {/* Services */}
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

                {/* Visual Gallery with Lightbox */}
                <div className="mb-12">
                  <h4 className="font-mono text-xs text-alchemy-red tracking-label uppercase mb-6">
                    Visual Exploration
                  </h4>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {selectedProject.visuals.map((visual, i) => (
                      <LightboxTrigger
                        key={i}
                        onClick={() => openLightbox(visual, 'image', `${selectedProject.title} - Visual ${i + 1}`)}
                        className="aspect-square rounded-xl overflow-hidden"
                      >
                        <ShimmerImage
                          src={visual}
                          alt={`${selectedProject.title} visual ${i + 1}`}
                          wrapperClassName="w-full h-full"
                          className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                        />
                      </LightboxTrigger>
                    ))}
                  </div>
                </div>

                {/* CTA for services */}
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

      {/* Lightbox */}
      <Lightbox
        isOpen={lightboxMedia !== null}
        onClose={() => setLightboxMedia(null)}
        imageSrc={lightboxMedia?.type === 'image' ? lightboxMedia.src : undefined}
        videoSrc={lightboxMedia?.type === 'video' ? lightboxMedia.src : undefined}
        caption={lightboxMedia?.caption}
      />

      <Footer />
    </div>
  );
};

export default Work;