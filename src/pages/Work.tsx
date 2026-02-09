import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, X, Check } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { SEOHead } from '@/components/SEOHead';
import { projects, Project, FilterTag } from '@/data/projects';
import { ScrollReveal } from '@/components/ScrollReveal';
import { Lightbox, LightboxTrigger } from '@/components/Lightbox';
import { BlueprintGrid } from '@/components/effects/BlueprintGrid';
import { NoiseTexture } from '@/components/effects/NoiseTexture';
import { WorkProjectCard } from '@/components/work/WorkProjectCard';
import { MediaCarousel } from '@/components/work/MediaCarousel';

const filters: { id: string; label: string; tag?: FilterTag }[] = [
  { id: 'all', label: 'All' },
  { id: 'client', label: 'Client', tag: 'client' },
  { id: 'conceptual', label: 'Conceptual', tag: 'conceptual' },
  { id: 'ai-gen', label: 'AI Gen', tag: 'ai-gen' },
  { id: 'branding', label: 'Branding Cases', tag: 'branding' },
];

const gridPositions = [
  'col-span-12 md:col-span-7 row-span-2',
  'col-span-12 md:col-span-5 row-span-1',
  'col-span-12 md:col-span-5 row-span-1',
  'col-span-12 md:col-span-5 row-span-1',
  'col-span-12 md:col-span-7 row-span-2',
  'col-span-12 md:col-span-5 row-span-1',
];

/** Build carousel items from project media */
function buildCarouselItems(project: Project) {
  const items: { src: string; type: 'image' | 'video'; caption?: string }[] = [];
  if (project.video) items.push({ src: project.video, type: 'video', caption: `${project.title} — Preview` });
  if (project.video2) items.push({ src: project.video2, type: 'video', caption: `${project.title} — Reel` });
  project.visuals.forEach((v, i) => items.push({ src: v, type: 'image', caption: `${project.title} — Visual ${i + 1}` }));
  return items;
}

export const Work = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [activeFilter, setActiveFilter] = useState('all');
  const [lightboxMedia, setLightboxMedia] = useState<{ src: string; type: 'image' | 'video'; caption?: string } | null>(null);
  const navigate = useNavigate();

  const filteredProjects = useMemo(() => {
    if (activeFilter === 'all') return projects;
    const tag = filters.find(f => f.id === activeFilter)?.tag;
    if (!tag) return projects;
    return projects.filter(p => p.filterTags.includes(tag));
  }, [activeFilter]);

  return (
    <div className="min-h-screen bg-background grain-overlay">
      <SEOHead
        title="Portfolio"
        description="Explore our curated works: brand architecture, AI-generated campaigns, and strategic consultation projects."
      />
      <Navigation />

      {/* Hero */}
      <section className="relative pt-32 pb-16 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <BlueprintGrid opacity={0.02} />
          <NoiseTexture opacity={0.03} />
          <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full blur-[100px] -translate-y-1/3 translate-x-1/4" style={{ background: 'radial-gradient(circle, rgba(225,6,19,0.08) 0%, transparent 70%)' }} />
          <div className="absolute bottom-0 left-0 w-[500px] h-[400px] rounded-full blur-[80px] translate-y-1/3 -translate-x-1/4" style={{ background: 'radial-gradient(circle, rgba(225,6,19,0.05) 0%, transparent 70%)' }} />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12">
          <Breadcrumbs className="mb-8" />

          <ScrollReveal>
            <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-16">
              <div>
                <p className="font-mono text-xs text-alchemy-red tracking-label uppercase mb-4">Portfolio</p>
                <h1 className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl leading-[0.9] tracking-display text-porcelain text-balance">
                  Curated<br />
                  <span className="italic text-alchemy-red">Works</span>
                </h1>
              </div>
              <p className="font-body text-base text-porcelain/40 max-w-sm font-light lg:text-right">
                Services we offer and conceptual explorations demonstrating our capabilities.
              </p>
            </div>
          </ScrollReveal>

          {/* Filter Bar */}
          <ScrollReveal delay={0.2}>
            <div className="inline-flex items-center gap-1 p-1 rounded-full border border-white/[0.06] bg-white/[0.03] flex-wrap">
              {filters.map((filter) => (
                <button
                  key={filter.id}
                  onClick={() => setActiveFilter(filter.id)}
                  className={`relative px-5 py-2 rounded-full font-mono text-xs uppercase tracking-[0.12em] transition-colors duration-200 ${
                    activeFilter === filter.id ? 'text-porcelain' : 'text-porcelain/40 hover:text-porcelain/70'
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
        <div className="absolute inset-0 pointer-events-none">
          <BlueprintGrid opacity={0.015} />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] rounded-full blur-[120px]" style={{ background: 'radial-gradient(circle, rgba(225,6,19,0.06) 0%, transparent 60%)' }} />
        </div>

        <div className="max-w-[1400px] mx-auto px-6 md:px-10 relative z-10">
          <div className="flex items-center justify-between mb-8">
            <span className="font-mono text-[10px] text-porcelain/30 uppercase tracking-[0.15em]">
              {filteredProjects.length} project{filteredProjects.length !== 1 ? 's' : ''}
            </span>
            <div className="h-px flex-1 mx-6 bg-white/[0.04]" />
            <span className="font-mono text-[10px] text-porcelain/20 uppercase tracking-[0.15em]">Grid View</span>
          </div>

          <div className="grid grid-cols-12 gap-3 md:gap-4 auto-rows-[160px] md:auto-rows-[220px]">
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((project, i) => {
                const position = gridPositions[i % gridPositions.length];
                const isHero = position.includes('row-span-2');
                return (
                  <motion.div key={project.id} className={position} layout>
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

          {filteredProjects.length === 0 && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center py-20">
              <p className="font-display text-2xl italic text-porcelain/50">No works in this category yet.</p>
              <button onClick={() => setActiveFilter('all')} className="mt-4 font-body text-sm text-alchemy-red hover:text-alchemy-red/80 transition-colors duration-200">
                View all works →
              </button>
            </motion.div>
          )}
        </div>
      </section>

      {/* Detail Modal */}
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
              initial={{ scale: 0.92, y: 40, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.92, y: 40, opacity: 0 }}
              transition={{ type: 'spring', damping: 28, stiffness: 260 }}
              onClick={(e) => e.stopPropagation()}
              className="relative z-10 w-full max-w-5xl max-h-[90vh] overflow-y-auto rounded-3xl"
              style={{
                background: 'linear-gradient(160deg, rgba(18,18,20,0.97) 0%, rgba(8,8,9,0.99) 100%)',
                backdropFilter: 'blur(40px)',
                border: '1px solid rgba(255,255,255,0.07)',
                boxShadow: '0 0 80px rgba(225,6,19,0.08), 0 24px 48px rgba(0,0,0,0.6)',
              }}
            >
              {/* Close */}
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-5 right-5 z-20 w-11 h-11 rounded-full flex items-center justify-center hover:bg-porcelain/10 transition-colors"
                style={{ background: 'rgba(255,255,255,0.06)', backdropFilter: 'blur(12px)', border: '1px solid rgba(255,255,255,0.1)' }}
              >
                <X className="w-4 h-4 text-porcelain/60" />
              </button>

              {/* Carousel Media */}
              <div className="p-6 md:p-8 pb-0">
                <div className="flex items-center gap-3 mb-5">
                  <span className="px-3 py-1 rounded-full text-[10px] font-mono text-porcelain/70 tracking-[0.12em] uppercase" style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.08)' }}>
                    {selectedProject.category}
                  </span>
                  {selectedProject.isConceptual && (
                    <span className="px-3 py-1 rounded-full text-[10px] font-mono text-alchemy-red tracking-[0.12em] uppercase bg-alchemy-red/10 border border-alchemy-red/20">
                      Conceptual
                    </span>
                  )}
                </div>
                <h3 className="font-display text-3xl md:text-4xl lg:text-5xl italic text-porcelain mb-6 text-balance">
                  {selectedProject.title}
                </h3>
                <MediaCarousel items={buildCarouselItems(selectedProject)} title={selectedProject.title} />
              </div>

              {/* Content */}
              <div className="p-6 md:p-8 pt-6 space-y-10">
                {/* Overview */}
                <div>
                  <h4 className="font-mono text-xs text-alchemy-red tracking-label uppercase mb-3">Overview</h4>
                  <p className="font-body text-base text-porcelain/65 leading-relaxed font-light">{selectedProject.overview}</p>
                </div>

                {/* Services */}
                <div>
                  <h4 className="font-mono text-xs text-alchemy-red tracking-label uppercase mb-5">
                    {selectedProject.isConceptual ? 'What We Explored' : 'What We Offer'}
                  </h4>
                  <div className="grid md:grid-cols-3 gap-3">
                    {selectedProject.services.map((service, i) => (
                      <div key={i} className="rounded-xl p-5" style={{ background: 'linear-gradient(135deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.01) 100%)', border: '1px solid rgba(255,255,255,0.06)' }}>
                        <div className="w-7 h-7 rounded-lg flex items-center justify-center mb-3" style={{ background: 'linear-gradient(135deg, rgba(225,6,19,0.2) 0%, rgba(225,6,19,0.08) 100%)', border: '1px solid rgba(225,6,19,0.3)' }}>
                          <Check className="w-3.5 h-3.5 text-alchemy-red" />
                        </div>
                        <h5 className="font-display text-base italic text-porcelain mb-1.5">{service.title}</h5>
                        <p className="font-body text-xs text-porcelain/45 font-light">{service.description}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* CTA */}
                {!selectedProject.isConceptual && (
                  <div className="flex justify-center pt-2">
                    <motion.button
                      onClick={() => { setSelectedProject(null); navigate('/book-sprint'); }}
                      className="inline-flex items-center gap-3 px-8 py-4 rounded-full"
                      style={{
                        background: 'linear-gradient(135deg, rgba(225,6,19,0.2) 0%, rgba(225,6,19,0.08) 100%)',
                        backdropFilter: 'blur(16px)',
                        border: '1px solid rgba(225,6,19,0.4)',
                        boxShadow: '0 0 30px rgba(225,6,19,0.2)',
                      }}
                      whileHover={{ scale: 1.02, boxShadow: '0 0 50px rgba(225,6,19,0.4)' }}
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
