import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, X, Check } from 'lucide-react';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { projects, Project } from '@/data/projects';

export const Work = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <div className="min-h-screen bg-background grain-overlay">
      <Navigation />
      
      {/* Hero */}
      <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden section-gradient">
        <div className="absolute inset-0">
          <div className="absolute top-1/3 right-1/4 w-[500px] h-[500px] bg-alchemy-red/8 rounded-full blur-[150px]" />
        </div>
        
        <div className="relative z-10 max-w-5xl mx-auto px-6 md:px-12 text-center pt-32">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="font-mono text-xs text-alchemy-red tracking-label uppercase mb-6"
          >
            Selected Work
          </motion.p>
          
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="font-display text-5xl sm:text-6xl md:text-7xl leading-display tracking-display text-porcelain mb-8"
          >
            <span className="font-helvetica font-bold uppercase tracking-tight">AETHER</span>
            <br />
            <span className="italic text-alchemy-red">Rituals</span>
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="font-body text-lg text-porcelain/50 max-w-xl mx-auto font-light"
          >
            Conceptual explorations where intelligence meets craft.
            Each project is a meditation on what brands could become.
          </motion.p>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="relative py-32 section-gradient">
        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid grid-cols-12 gap-4 md:gap-6">
            {projects.map((project, i) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                onClick={() => setSelectedProject(project)}
                className={`group relative rounded-2xl overflow-hidden cursor-pointer interactive-hover ${
                  project.size === 'large' 
                    ? 'col-span-12 md:col-span-8 row-span-2' 
                    : project.size === 'medium'
                    ? 'col-span-12 md:col-span-4'
                    : 'col-span-12 sm:col-span-6 md:col-span-4'
                }`}
              >
                <div className={`relative overflow-hidden ${
                  project.size === 'large' ? 'aspect-[16/10]' : 'aspect-[4/5]'
                }`}>
                  <motion.img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-alchemy-black via-alchemy-black/40 to-transparent" />
                  <div className="absolute inset-0 bg-alchemy-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-500 backdrop-blur-sm" />

                  <div className="absolute inset-0 p-6 md:p-8 flex flex-col justify-end">
                    <div className="mb-auto">
                      <span className="inline-block px-3 py-1 rounded-full glass text-xs font-mono text-porcelain/80 tracking-label uppercase">
                        {project.category}
                      </span>
                    </div>
                    <h3 className="font-display text-2xl md:text-3xl lg:text-4xl italic text-porcelain mb-1">
                      {project.title}
                    </h3>
                    <p className="font-mono text-xs text-alchemy-red tracking-label uppercase opacity-0 group-hover:opacity-100 transition-opacity duration-300 mb-3">
                      Conceptual
                    </p>
                    <p className="font-body text-sm text-porcelain/60 max-w-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 translate-y-4 group-hover:translate-y-0 mb-4 font-light">
                      {project.description}
                    </p>
                    <div className="inline-flex items-center gap-2 text-alchemy-red font-body text-sm opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-4 group-hover:translate-y-0">
                      <span>View Case Study</span>
                      <ArrowUpRight className="w-4 h-4" />
                    </div>
                  </div>
                </div>

                <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                  <div className="absolute inset-0 rounded-2xl border border-alchemy-red/40 shadow-[0_0_30px_rgba(225,6,19,0.2)]" />
                </div>
              </motion.div>
            ))}
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
            <div className="absolute inset-0 bg-alchemy-black/90 backdrop-blur-md" />
            <motion.div
              initial={{ scale: 0.9, y: 50, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.9, y: 50, opacity: 0 }}
              transition={{ type: 'spring', damping: 25 }}
              onClick={(e) => e.stopPropagation()}
              className="relative z-10 w-full max-w-5xl max-h-[90vh] overflow-y-auto glass-deep rounded-3xl"
            >
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-6 right-6 z-20 w-10 h-10 rounded-full glass flex items-center justify-center hover:bg-porcelain/10 transition-colors"
              >
                <X className="w-5 h-5 text-porcelain" />
              </button>

              <div className="relative aspect-[16/9] overflow-hidden rounded-t-3xl">
                <img src={selectedProject.image} alt={selectedProject.title} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-alchemy-black via-alchemy-black/50 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12">
                  <span className="inline-block px-3 py-1 rounded-full glass text-xs font-mono text-porcelain/80 tracking-label uppercase mb-4">
                    {selectedProject.category}
                  </span>
                  <h3 className="font-display text-4xl md:text-5xl lg:text-6xl italic text-porcelain mb-2">
                    {selectedProject.title}
                  </h3>
                </div>
              </div>

              <div className="p-8 md:p-12">
                <div className="mb-12">
                  <h4 className="font-mono text-xs text-alchemy-red tracking-label uppercase mb-4">Overview</h4>
                  <p className="font-body text-base md:text-lg text-porcelain/70 leading-relaxed font-light">
                    {selectedProject.overview}
                  </p>
                </div>

                <div className="mb-12">
                  <h4 className="font-mono text-xs text-alchemy-red tracking-label uppercase mb-6">What We Did</h4>
                  <div className="grid md:grid-cols-3 gap-6">
                    {selectedProject.services.map((service, i) => (
                      <div key={i} className="glass rounded-xl p-6">
                        <div className="w-8 h-8 rounded-lg glass-red flex items-center justify-center mb-4">
                          <Check className="w-4 h-4 text-alchemy-red" />
                        </div>
                        <h5 className="font-display text-lg italic text-porcelain mb-2">{service.title}</h5>
                        <p className="font-body text-sm text-porcelain/50 font-light">{service.description}</p>
                      </div>
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
