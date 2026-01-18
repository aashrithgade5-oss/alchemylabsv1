import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, X, Check, Play, Filter } from 'lucide-react';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { projects, Project } from '@/data/projects';
import { ScrollReveal, StaggerReveal } from '@/components/ScrollReveal';
import { SpotlightContainer, SpotlightItem } from '@/components/SpotlightGrid';
import { ShimmerImage, ShimmerVideo } from '@/components/ShimmerImage';
import { Lightbox, LightboxTrigger } from '@/components/Lightbox';

// Extract unique categories
const allCategories = ['All', ...Array.from(new Set(projects.map(p => p.category)))];

export const Work = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState('All');
  const [lightboxMedia, setLightboxMedia] = useState<{ src: string; type: 'image' | 'video'; caption?: string } | null>(null);

  // Filter projects based on category
  const filteredProjects = useMemo(() => {
    if (activeCategory === 'All') return projects;
    return projects.filter(p => p.category === activeCategory);
  }, [activeCategory]);

  // Separate featured from rest
  const featuredProject = filteredProjects[0];
  const otherProjects = filteredProjects.slice(1);

  const openLightbox = (src: string, type: 'image' | 'video', caption?: string) => {
    setLightboxMedia({ src, type, caption });
  };

  return (
    <div className="min-h-screen bg-background grain-overlay">
      <Navigation />
      
      {/* Hero with Filters */}
      <section className="relative pt-32 pb-8 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-alchemy-red/5 rounded-full blur-[200px] translate-x-1/2 -translate-y-1/2" />
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12">
          {/* Header */}
          <ScrollReveal>
            <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-16">
              <div>
                <p className="font-mono text-xs text-alchemy-red tracking-label uppercase mb-4">
                  Portfolio
                </p>
                <h1 className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl leading-[0.9] tracking-display text-porcelain text-balance">
                  Selected
                  <br />
                  <span className="italic text-alchemy-red">Works</span>
                </h1>
              </div>
              
              <p className="font-body text-base text-porcelain/40 max-w-sm font-light lg:text-right">
                Conceptual explorations where intelligence meets craft.
              </p>
            </div>
          </ScrollReveal>

          {/* Category Filters */}
          <ScrollReveal delay={0.2}>
            <div className="flex flex-wrap items-center gap-3">
              <div className="flex items-center gap-2 text-porcelain/40 mr-4">
                <Filter className="w-4 h-4" />
                <span className="font-mono text-xs tracking-label uppercase">Filter</span>
              </div>
              
              {allCategories.map((category) => (
                <motion.button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`relative px-4 py-2 rounded-full font-body text-sm transition-all duration-300 ${
                    activeCategory === category
                      ? 'text-porcelain'
                      : 'text-porcelain/50 hover:text-porcelain/80'
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {activeCategory === category && (
                    <motion.div
                      layoutId="filter-indicator"
                      className="absolute inset-0 bg-alchemy-red/20 border border-alchemy-red/40 rounded-full"
                      transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                    />
                  )}
                  <span className="relative z-10">{category}</span>
                </motion.button>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Featured Project */}
      <AnimatePresence mode="wait">
        {featuredProject && (
          <motion.section 
            key={featuredProject.id + '-featured'}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="relative py-8"
          >
            <div className="max-w-[1600px] mx-auto px-6 md:px-12">
              <ScrollReveal>
                <motion.div
                  onClick={() => setSelectedProject(featuredProject)}
                  onMouseEnter={() => setHoveredId(featuredProject.id)}
                  onMouseLeave={() => setHoveredId(null)}
                  className="group relative rounded-3xl overflow-hidden cursor-pointer"
                >
                  <div className="relative aspect-[21/9] md:aspect-[2.5/1] overflow-hidden">
                    {featuredProject.video ? (
                      <ShimmerVideo
                        src={featuredProject.video}
                        wrapperClassName="w-full h-full"
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    ) : (
                      <ShimmerImage
                        src={featuredProject.image}
                        alt={featuredProject.title}
                        wrapperClassName="w-full h-full"
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    )}
                    
                    <div className="absolute inset-0 bg-gradient-to-r from-alchemy-black/80 via-alchemy-black/40 to-transparent" />
                    <div className="absolute inset-0 bg-alchemy-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    
                    <div className="absolute inset-0 p-8 md:p-16 flex flex-col justify-between">
                      <div className="flex items-start justify-between">
                        <motion.span 
                          className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-xs font-mono text-porcelain/80 tracking-label uppercase"
                          animate={{ scale: hoveredId === featuredProject.id ? 1.05 : 1 }}
                        >
                          <span className="w-2 h-2 rounded-full bg-alchemy-red animate-pulse" />
                          {featuredProject.category}
                        </motion.span>
                        
                        <motion.div
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: hoveredId === featuredProject.id ? 1 : 0, scale: hoveredId === featuredProject.id ? 1 : 0.8 }}
                          className="w-16 h-16 rounded-full glass-red flex items-center justify-center"
                        >
                          <Play className="w-6 h-6 text-porcelain ml-1" />
                        </motion.div>
                      </div>
                      
                      <div>
                        <motion.p
                          className="font-mono text-xs text-alchemy-red tracking-label uppercase mb-3"
                          animate={{ x: hoveredId === featuredProject.id ? 10 : 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          Featured Project
                        </motion.p>
                        <h2 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl italic text-porcelain mb-4 text-balance">
                          {featuredProject.title}
                        </h2>
                        <p className="font-body text-base md:text-lg text-porcelain/60 max-w-lg font-light">
                          {featuredProject.description}
                        </p>
                        
                        <motion.div 
                          className="inline-flex items-center gap-2 mt-6 text-alchemy-red font-body"
                          animate={{ x: hoveredId === featuredProject.id ? 10 : 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          <span>Explore Project</span>
                          <ArrowUpRight className="w-5 h-5 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                        </motion.div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none border border-alchemy-red/30 shadow-[0_0_60px_rgba(225,6,19,0.15)]" />
                </motion.div>
              </ScrollReveal>
            </div>
          </motion.section>
        )}
      </AnimatePresence>

      {/* Projects Grid with Spotlight Effect */}
      <section className="relative py-16 md:py-24 luxury-margin">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          {otherProjects.length > 0 && (
            <>
              <ScrollReveal>
                <div className="flex items-center gap-4 mb-12">
                  <div className="w-12 h-px bg-alchemy-red/50" />
                  <span className="font-mono text-xs text-porcelain/40 tracking-label uppercase">
                    {activeCategory === 'All' ? 'More Projects' : `${activeCategory} Projects`}
                  </span>
                  <span className="font-mono text-xs text-porcelain/20">
                    ({otherProjects.length})
                  </span>
                </div>
              </ScrollReveal>

              <SpotlightContainer className="grid grid-cols-12 gap-4 md:gap-6 lg:gap-8">
                <AnimatePresence mode="popLayout">
                  {otherProjects.map((project, i) => {
                    const layouts = [
                      'col-span-12 md:col-span-7',
                      'col-span-12 md:col-span-5',
                      'col-span-12 md:col-span-5',
                      'col-span-12 md:col-span-7',
                    ];
                    const aspectRatios = [
                      'aspect-[16/10]',
                      'aspect-[4/5]',
                      'aspect-[1/1]',
                      'aspect-[16/9]',
                    ];
                    
                    return (
                      <SpotlightItem key={project.id} id={project.id} className={layouts[i % layouts.length]}>
                        <motion.div
                          layout
                          initial={{ opacity: 0, y: 60, scale: 0.95 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.9 }}
                          transition={{ duration: 0.5, delay: i * 0.05 }}
                          onClick={() => setSelectedProject(project)}
                          onMouseEnter={() => setHoveredId(project.id)}
                          onMouseLeave={() => setHoveredId(null)}
                          className="group relative rounded-2xl overflow-hidden cursor-pointer h-full"
                        >
                          <div className={`relative overflow-hidden ${aspectRatios[i % aspectRatios.length]}`}>
                            {project.video ? (
                              <ShimmerVideo
                                src={project.video}
                                wrapperClassName="w-full h-full"
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                              />
                            ) : (
                              <ShimmerImage
                                src={project.image}
                                alt={project.title}
                                wrapperClassName="w-full h-full"
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                              />
                            )}
                            
                            <div className="absolute inset-0 bg-gradient-to-t from-alchemy-black via-alchemy-black/30 to-transparent" />
                            <div className="absolute inset-0 bg-alchemy-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 backdrop-blur-[2px]" />
                            
                            <div className="absolute inset-0 p-6 md:p-8 flex flex-col justify-between">
                              <div className="flex items-center justify-between">
                                <span className="px-3 py-1.5 rounded-full glass text-[10px] font-mono text-porcelain/70 tracking-label uppercase">
                                  {project.category}
                                </span>
                                
                                <motion.span
                                  className="font-mono text-[10px] text-porcelain/30 tracking-label"
                                  animate={{ opacity: hoveredId === project.id ? 1 : 0.3 }}
                                >
                                  0{i + 2}
                                </motion.span>
                              </div>
                              
                              <div>
                                <motion.h3 
                                  className="font-display text-2xl md:text-3xl lg:text-4xl italic text-porcelain mb-2 text-balance"
                                  animate={{ x: hoveredId === project.id ? 8 : 0 }}
                                  transition={{ duration: 0.3 }}
                                >
                                  {project.title}
                                </motion.h3>
                                
                                <motion.p
                                  className="font-body text-sm text-porcelain/50 max-w-sm font-light line-clamp-2"
                                  initial={{ opacity: 0, y: 10 }}
                                  animate={{ 
                                    opacity: hoveredId === project.id ? 1 : 0,
                                    y: hoveredId === project.id ? 0 : 10
                                  }}
                                  transition={{ duration: 0.3 }}
                                >
                                  {project.description}
                                </motion.p>
                                
                                <motion.div 
                                  className="inline-flex items-center gap-2 mt-4 text-alchemy-red font-body text-sm"
                                  initial={{ opacity: 0 }}
                                  animate={{ opacity: hoveredId === project.id ? 1 : 0 }}
                                  transition={{ duration: 0.3 }}
                                >
                                  <span>View</span>
                                  <ArrowUpRight className="w-4 h-4" />
                                </motion.div>
                              </div>
                            </div>
                          </div>
                          
                          <motion.div
                            className="absolute inset-0 rounded-2xl border border-alchemy-red/0 pointer-events-none"
                            animate={{ 
                              borderColor: hoveredId === project.id ? 'rgba(225,6,19,0.4)' : 'rgba(225,6,19,0)',
                              boxShadow: hoveredId === project.id ? '0 0 40px rgba(225,6,19,0.15)' : '0 0 0px rgba(225,6,19,0)'
                            }}
                            transition={{ duration: 0.4 }}
                          />
                        </motion.div>
                      </SpotlightItem>
                    );
                  })}
                </AnimatePresence>
              </SpotlightContainer>
            </>
          )}

          {/* Empty State */}
          {filteredProjects.length === 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-20"
            >
              <p className="font-display text-2xl italic text-porcelain/50">
                No projects in this category yet.
              </p>
              <button
                onClick={() => setActiveCategory('All')}
                className="mt-4 font-body text-sm text-alchemy-red hover:text-alchemy-red/80 transition-colors"
              >
                View all projects →
              </button>
            </motion.div>
          )}
        </div>
      </section>

      {/* Case Study Modal with Lightbox Support */}
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
              initial={{ scale: 0.95, y: 30, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.95, y: 30, opacity: 0 }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
              className="relative z-10 w-full max-w-6xl max-h-[90vh] overflow-y-auto rounded-3xl bg-charcoal-ui/80 backdrop-blur-xl border border-porcelain/5"
            >
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-6 right-6 z-20 w-12 h-12 rounded-full glass flex items-center justify-center hover:bg-porcelain/10 transition-colors"
              >
                <X className="w-5 h-5 text-porcelain/60" />
              </button>
              
              {/* Media with Lightbox */}
              <LightboxTrigger
                onClick={() => openLightbox(
                  selectedProject.video || selectedProject.image,
                  selectedProject.video ? 'video' : 'image',
                  selectedProject.title
                )}
                className="rounded-t-3xl overflow-hidden"
              >
                <div className="aspect-video overflow-hidden">
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
                </div>
              </LightboxTrigger>
              
              <div className="p-8 md:p-12">
                <div className="flex flex-wrap items-center gap-3 mb-6">
                  <span className="px-4 py-2 rounded-full glass text-xs font-mono text-porcelain/70 tracking-label uppercase">
                    {selectedProject.category}
                  </span>
                  <span className="px-4 py-2 rounded-full glass text-xs font-mono text-alchemy-red tracking-label uppercase">
                    {selectedProject.brand}
                  </span>
                </div>
                
                <h2 className="font-display text-4xl md:text-5xl lg:text-6xl italic text-porcelain mb-6 text-balance">
                  {selectedProject.title}
                </h2>
                
                <div className="grid md:grid-cols-3 gap-8 mb-10">
                  <div className="md:col-span-2">
                    <h4 className="font-mono text-xs text-alchemy-red tracking-label uppercase mb-4">Overview</h4>
                    <p className="font-body text-base text-porcelain/60 font-light leading-relaxed">
                      {selectedProject.overview}
                    </p>
                  </div>
                  
                  <div className="space-y-6">
                    <div>
                      <h4 className="font-mono text-xs text-alchemy-red tracking-label uppercase mb-3">Client</h4>
                      <p className="font-body text-porcelain">{selectedProject.brand}</p>
                    </div>
                    <div>
                      <h4 className="font-mono text-xs text-alchemy-red tracking-label uppercase mb-3">Services</h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedProject.services.map((service, idx) => (
                          <span key={typeof service === 'string' ? service : idx} className="px-3 py-1 rounded-full glass text-xs font-body text-porcelain/60">
                            {typeof service === 'string' ? service : (service as { title: string }).title}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Secondary Media with Lightbox */}
                {selectedProject.video2 && (
                  <LightboxTrigger
                    onClick={() => openLightbox(selectedProject.video2!, 'video', `${selectedProject.title} - Detail`)}
                    className="rounded-2xl overflow-hidden"
                  >
                    <div className="rounded-2xl overflow-hidden">
                      <ShimmerVideo
                        src={selectedProject.video2}
                        wrapperClassName="w-full"
                        className="w-full aspect-video object-cover"
                      />
                    </div>
                    <p className="font-mono text-xs text-porcelain/30 mt-2 text-center">Click to expand</p>
                  </LightboxTrigger>
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