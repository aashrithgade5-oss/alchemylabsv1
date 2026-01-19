import { useRef, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring, useInView } from 'framer-motion';
import { ArrowUpRight, Sparkles, Palette, Target, Layers, Mountain, Grid3X3 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { projects } from '@/data/projects';
import { ShimmerImage, ShimmerVideo } from './ShimmerImage';

const projectIcons: Record<string, React.ElementType> = {
  'branding-solutions': Palette,
  'consultation-sessions': Target,
  'aether-rituals': Sparkles,
  'oakley-showcase': Mountain,
  'arcteryx-branding': Layers,
  'identity-systems': Grid3X3,
};

interface HorizontalScrollProps {
  onProjectSelect?: (project: typeof projects[0]) => void;
}

export const HorizontalScroll = ({ onProjectSelect }: HorizontalScrollProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const isInView = useInView(containerRef, { once: false, margin: '-100px' });
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  // Smooth spring for x translation
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  // Calculate how far to scroll horizontally (based on number of projects)
  const x = useTransform(smoothProgress, [0, 1], ['0%', '-75%']);
  
  // Background parallax
  const bgX = useTransform(smoothProgress, [0, 1], ['0%', '-20%']);

  return (
    <section 
      ref={containerRef}
      className="relative"
      style={{ height: `${Math.max(200, projects.length * 80)}vh` }}
    >
      {/* Sticky container */}
      <div className="sticky top-0 h-screen overflow-hidden">
        {/* Background gradient parallax */}
        <motion.div 
          className="absolute inset-0 pointer-events-none"
          style={{ x: bgX }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-alchemy-black via-charcoal-ui to-alchemy-black" />
          <div className="absolute top-1/2 left-1/4 w-[600px] h-[600px] bg-gradient-radial from-alchemy-red/10 to-transparent rounded-full blur-[150px]" />
          <div className="absolute top-1/3 right-1/4 w-[400px] h-[400px] bg-gradient-radial from-deep-crimson/8 to-transparent rounded-full blur-[120px]" />
        </motion.div>

        {/* Header */}
        <div className="absolute top-12 left-12 z-20">
          <motion.p 
            className="font-mono text-xs text-alchemy-red tracking-[0.3em] uppercase mb-2"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            Case Studies
          </motion.p>
          <motion.h2 
            className="font-display text-4xl md:text-5xl italic text-porcelain"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Featured <span className="text-alchemy-red">Works</span>
          </motion.h2>
        </div>

        {/* Progress indicator */}
        <div className="absolute top-12 right-12 z-20 flex items-center gap-4">
          <span className="font-mono text-xs text-porcelain/40">
            Scroll to explore
          </span>
          <motion.div 
            className="w-32 h-0.5 bg-porcelain/10 rounded-full overflow-hidden"
          >
            <motion.div 
              className="h-full bg-gradient-to-r from-alchemy-red to-deep-crimson rounded-full"
              style={{ scaleX: smoothProgress, transformOrigin: 'left' }}
            />
          </motion.div>
        </div>

        {/* Horizontal scrolling content */}
        <motion.div 
          className="absolute top-0 left-0 h-full flex items-center gap-8 px-12 pt-32"
          style={{ x }}
        >
          {projects.slice(0, 6).map((project, i) => {
            const Icon = projectIcons[project.id] || Sparkles;
            
            return (
              <motion.div
                key={project.id}
                className="relative flex-shrink-0 w-[80vw] md:w-[60vw] lg:w-[50vw] h-[70vh] rounded-3xl overflow-hidden cursor-pointer group"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: false, margin: '-20%' }}
                transition={{ duration: 0.8, delay: i * 0.1 }}
                onClick={() => onProjectSelect?.(project)}
                style={{
                  background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.04) 0%, rgba(255, 255, 255, 0.01) 100%)',
                  backdropFilter: 'blur(20px)',
                  border: '1px solid rgba(255, 255, 255, 0.06)',
                }}
              >
                {/* Media */}
                <div className="absolute inset-0 overflow-hidden">
                  {project.video ? (
                    <ShimmerVideo
                      src={project.video}
                      wrapperClassName="w-full h-full"
                      className="w-full h-full object-cover opacity-40 group-hover:opacity-60 transition-all duration-1000 group-hover:scale-105"
                    />
                  ) : (
                    <ShimmerImage
                      src={project.image}
                      alt={project.title}
                      wrapperClassName="w-full h-full"
                      className="w-full h-full object-cover opacity-40 group-hover:opacity-60 transition-all duration-1000 group-hover:scale-105"
                    />
                  )}
                </div>

                {/* Gradient overlays */}
                <div className="absolute inset-0 bg-gradient-to-t from-alchemy-black via-alchemy-black/70 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-r from-alchemy-black/50 to-transparent" />
                
                {/* Hover gradient */}
                <div 
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                  style={{
                    background: 'radial-gradient(ellipse at 30% 70%, rgba(225, 6, 19, 0.2) 0%, transparent 60%)',
                  }}
                />

                {/* Number */}
                <div className="absolute top-8 left-8 font-mono text-[100px] md:text-[150px] text-porcelain/[0.03] leading-none pointer-events-none">
                  0{i + 1}
                </div>

                {/* Content */}
                <div className="absolute inset-0 p-8 md:p-12 flex flex-col justify-between">
                  {/* Top */}
                  <div className="flex items-start justify-between">
                    <motion.div
                      className="w-14 h-14 rounded-2xl flex items-center justify-center"
                      style={{
                        background: 'linear-gradient(135deg, rgba(225, 6, 19, 0.2) 0%, rgba(225, 6, 19, 0.08) 100%)',
                        backdropFilter: 'blur(12px)',
                        border: '1px solid rgba(225, 6, 19, 0.3)',
                      }}
                      whileHover={{ scale: 1.1, rotate: 5 }}
                    >
                      <Icon className="w-6 h-6 text-alchemy-red" />
                    </motion.div>
                    
                    <div className="flex items-center gap-2">
                      {project.isConceptual && (
                        <span className="px-3 py-1.5 rounded-full text-[10px] font-mono text-porcelain/50 tracking-[0.2em] uppercase bg-porcelain/5 border border-porcelain/10">
                          Concept
                        </span>
                      )}
                      <span 
                        className="px-4 py-2 rounded-full text-[10px] font-mono text-porcelain/80 tracking-[0.2em] uppercase"
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

                  {/* Bottom */}
                  <div>
                    <motion.h3 
                      className="font-display text-4xl md:text-5xl lg:text-6xl italic text-porcelain mb-4 max-w-lg"
                      whileHover={{ x: 10 }}
                      transition={{ duration: 0.3 }}
                    >
                      {project.title}
                    </motion.h3>
                    
                    <p className="font-body text-base md:text-lg text-porcelain/50 font-light max-w-md mb-8 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0">
                      {project.description}
                    </p>

                    <motion.div 
                      className="inline-flex items-center gap-3 px-6 py-3 rounded-full text-alchemy-red font-body text-sm opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0"
                      style={{
                        background: 'rgba(225, 6, 19, 0.1)',
                        border: '1px solid rgba(225, 6, 19, 0.3)',
                      }}
                      whileHover={{ x: 5 }}
                    >
                      <span>View Project</span>
                      <ArrowUpRight className="w-4 h-4" />
                    </motion.div>
                  </div>
                </div>

                {/* Border glow */}
                <motion.div 
                  className="absolute inset-0 rounded-3xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    border: '1px solid rgba(225, 6, 19, 0.4)',
                    boxShadow: '0 0 60px rgba(225, 6, 19, 0.2), inset 0 0 80px rgba(225, 6, 19, 0.05)',
                  }}
                />
              </motion.div>
            );
          })}
          
          {/* View All CTA Card */}
          <motion.div
            className="relative flex-shrink-0 w-[40vw] h-[70vh] rounded-3xl overflow-hidden cursor-pointer group flex items-center justify-center"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: false }}
            onClick={() => navigate('/work')}
            style={{
              background: 'linear-gradient(135deg, rgba(225, 6, 19, 0.08) 0%, rgba(225, 6, 19, 0.02) 100%)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(225, 6, 19, 0.2)',
            }}
            whileHover={{ 
              scale: 1.02,
              boxShadow: '0 0 80px rgba(225, 6, 19, 0.3)',
            }}
          >
            <div className="text-center">
              <p className="font-mono text-xs text-alchemy-red tracking-[0.3em] uppercase mb-4">
                Explore More
              </p>
              <h3 className="font-display text-4xl md:text-5xl italic text-porcelain mb-8">
                View All <span className="text-alchemy-red">Works</span>
              </h3>
              <motion.div 
                className="inline-flex items-center gap-3 px-8 py-4 rounded-full"
                style={{
                  background: 'linear-gradient(135deg, rgba(225, 6, 19, 0.2) 0%, rgba(225, 6, 19, 0.1) 100%)',
                  border: '1px solid rgba(225, 6, 19, 0.4)',
                }}
                whileHover={{ scale: 1.05 }}
              >
                <span className="font-body text-porcelain">Enter Gallery</span>
                <ArrowUpRight className="w-5 h-5 text-alchemy-red" />
              </motion.div>
            </div>
          </motion.div>
        </motion.div>

        {/* Corner accents */}
        <div className="absolute top-8 left-8 w-20 h-20 border-l-2 border-t-2 border-porcelain/5 pointer-events-none" />
        <div className="absolute top-8 right-8 w-20 h-20 border-r-2 border-t-2 border-porcelain/5 pointer-events-none" />
        <div className="absolute bottom-8 left-8 w-20 h-20 border-l-2 border-b-2 border-porcelain/5 pointer-events-none" />
        <div className="absolute bottom-8 right-8 w-20 h-20 border-r-2 border-b-2 border-porcelain/5 pointer-events-none" />
      </div>
    </section>
  );
};
