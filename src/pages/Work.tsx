import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, X, Check, Play } from 'lucide-react';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { projects, Project } from '@/data/projects';

export const Work = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  // Separate featured project from rest
  const featuredProject = projects[0];
  const otherProjects = projects.slice(1);

  return (
    <div className="min-h-screen bg-background grain-overlay">
      <Navigation />
      
      {/* Minimal Hero */}
      <section className="relative pt-32 pb-16 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-alchemy-red/5 rounded-full blur-[200px] translate-x-1/2 -translate-y-1/2" />
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
              <p className="font-mono text-xs text-alchemy-red tracking-label uppercase mb-4">
                Portfolio
              </p>
              <h1 className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl leading-[0.9] tracking-display text-porcelain">
                Selected
                <br />
                <span className="italic text-alchemy-red">Works</span>
              </h1>
            </motion.div>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="font-body text-base text-porcelain/40 max-w-sm font-light md:text-right"
            >
              Conceptual explorations where intelligence meets craft.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Featured Project - Full Width */}
      <section className="relative py-8">
        <div className="max-w-[1600px] mx-auto px-6 md:px-12">
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            onClick={() => setSelectedProject(featuredProject)}
            onMouseEnter={() => setHoveredId(featuredProject.id)}
            onMouseLeave={() => setHoveredId(null)}
            className="group relative rounded-3xl overflow-hidden cursor-pointer"
          >
            <div className="relative aspect-[21/9] md:aspect-[2.5/1] overflow-hidden">
              {featuredProject.video ? (
                <video
                  src={featuredProject.video}
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              ) : (
                <img
                  src={featuredProject.image}
                  alt={featuredProject.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              )}
              
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-alchemy-black/80 via-alchemy-black/40 to-transparent" />
              <div className="absolute inset-0 bg-alchemy-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              {/* Content */}
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
                  <h2 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl italic text-porcelain mb-4">
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
            
            {/* Border glow */}
            <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none border border-alchemy-red/30 shadow-[0_0_60px_rgba(225,6,19,0.15)]" />
          </motion.div>
        </div>
      </section>

      {/* Abstract Grid Layout */}
      <section className="relative py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          {/* Section Label */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="flex items-center gap-4 mb-12"
          >
            <div className="w-12 h-px bg-alchemy-red/50" />
            <span className="font-mono text-xs text-porcelain/40 tracking-label uppercase">More Projects</span>
          </motion.div>

          {/* Asymmetric Grid */}
          <div className="grid grid-cols-12 gap-4 md:gap-6 lg:gap-8">
            {otherProjects.map((project, i) => {
              // Create varied layouts
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
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 60 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-100px' }}
                  transition={{ duration: 0.7, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                  onClick={() => setSelectedProject(project)}
                  onMouseEnter={() => setHoveredId(project.id)}
                  onMouseLeave={() => setHoveredId(null)}
                  className={`group relative rounded-2xl overflow-hidden cursor-pointer ${layouts[i % layouts.length]}`}
                >
                  <div className={`relative overflow-hidden ${aspectRatios[i % aspectRatios.length]}`}>
                    {project.video ? (
                      <video
                        src={project.video}
                        autoPlay
                        loop
                        muted
                        playsInline
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    ) : (
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    )}
                    
                    {/* Gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-alchemy-black via-alchemy-black/30 to-transparent" />
                    <div className="absolute inset-0 bg-alchemy-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 backdrop-blur-[2px]" />
                    
                    {/* Content */}
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
                          className="font-display text-2xl md:text-3xl lg:text-4xl italic text-porcelain mb-2"
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
                  
                  {/* Border on hover */}
                  <motion.div
                    className="absolute inset-0 rounded-2xl border border-alchemy-red/0 pointer-events-none"
                    animate={{ 
                      borderColor: hoveredId === project.id ? 'rgba(225,6,19,0.4)' : 'rgba(225,6,19,0)',
                      boxShadow: hoveredId === project.id ? '0 0 40px rgba(225,6,19,0.15)' : '0 0 0px rgba(225,6,19,0)'
                    }}
                    transition={{ duration: 0.4 }}
                  />
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Case Study Modal */}
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
                <X className="w-5 h-5 text-porcelain" />
              </button>

              <div className="relative aspect-[21/9] overflow-hidden rounded-t-3xl">
                {selectedProject.video ? (
                  <video 
                    src={selectedProject.video} 
                    autoPlay 
                    loop 
                    muted 
                    playsInline 
                    className="w-full h-full object-cover" 
                  />
                ) : (
                  <img src={selectedProject.image} alt={selectedProject.title} className="w-full h-full object-cover" />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal-ui via-charcoal-ui/50 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12">
                  <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass text-xs font-mono text-porcelain/80 tracking-label uppercase mb-4">
                    <span className="w-1.5 h-1.5 rounded-full bg-alchemy-red" />
                    {selectedProject.category}
                  </span>
                  <h3 className="font-display text-4xl md:text-5xl lg:text-6xl italic text-porcelain">
                    {selectedProject.title}
                  </h3>
                </div>
              </div>

              <div className="p-8 md:p-12">
                <div className="grid md:grid-cols-3 gap-12 mb-12">
                  <div className="md:col-span-2">
                    <h4 className="font-mono text-xs text-alchemy-red tracking-label uppercase mb-4">Overview</h4>
                    <p className="font-body text-base md:text-lg text-porcelain/70 leading-relaxed font-light">
                      {selectedProject.overview}
                    </p>
                  </div>
                  <div>
                    <h4 className="font-mono text-xs text-alchemy-red tracking-label uppercase mb-4">Client</h4>
                    <p className="font-display text-2xl italic text-porcelain">{selectedProject.brand}</p>
                  </div>
                </div>

                <div>
                  <h4 className="font-mono text-xs text-alchemy-red tracking-label uppercase mb-6">Deliverables</h4>
                  <div className="grid md:grid-cols-3 gap-4">
                    {selectedProject.services.map((service, i) => (
                      <motion.div 
                        key={i} 
                        className="glass rounded-2xl p-6 group hover:border-alchemy-red/20 transition-colors"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 + i * 0.1 }}
                      >
                        <div className="w-10 h-10 rounded-xl glass-red flex items-center justify-center mb-4 group-hover:shadow-[0_0_20px_rgba(225,6,19,0.3)] transition-shadow">
                          <Check className="w-5 h-5 text-alchemy-red" />
                        </div>
                        <h5 className="font-display text-lg italic text-porcelain mb-2">{service.title}</h5>
                        <p className="font-body text-sm text-porcelain/50 font-light">{service.description}</p>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
    </div>
  );
};

export default Work;
