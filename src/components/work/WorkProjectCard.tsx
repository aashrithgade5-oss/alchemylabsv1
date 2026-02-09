import { motion } from 'framer-motion';
import { ArrowUpRight, Sparkles, Layers, Target, Palette, Mountain, Grid3X3 } from 'lucide-react';
import { Project } from '@/data/projects';
import { ShimmerImage, ShimmerVideo } from '@/components/ShimmerImage';

const projectIcons: Record<string, React.ElementType> = {
  'branding-solutions': Palette,
  'consultation-sessions': Target,
  'aether-rituals': Sparkles,
  'oakley-showcase': Mountain,
  'arcteryx-branding': Layers,
  'identity-systems': Grid3X3,
};

interface WorkProjectCardProps {
  project: Project;
  index: number;
  isHero?: boolean;
  onClick: () => void;
}

export const WorkProjectCard = ({ project, index, isHero, onClick }: WorkProjectCardProps) => {
  const Icon = projectIcons[project.id] || Sparkles;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.45, delay: index * 0.06, ease: [0.22, 1, 0.36, 1] }}
      onClick={onClick}
      whileHover={{ y: -6 }}
      className="group relative rounded-2xl overflow-hidden cursor-pointer h-full"
      style={{
        background: 'linear-gradient(160deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.01) 100%)',
        border: '1px solid rgba(255,255,255,0.06)',
      }}
    >
      {/* Media layer */}
      <div className="absolute inset-0 overflow-hidden rounded-2xl">
        {project.video && isHero ? (
          <ShimmerVideo
            src={project.video}
            wrapperClassName="w-full h-full"
            className="w-full h-full object-cover opacity-40 group-hover:opacity-65 group-hover:scale-110 transition-[opacity,transform] duration-700"
          />
        ) : (
          <ShimmerImage
            src={project.image}
            alt={project.title}
            wrapperClassName="w-full h-full"
            className="w-full h-full object-cover opacity-35 group-hover:opacity-55 group-hover:scale-110 transition-[opacity,transform] duration-700"
          />
        )}
      </div>

      {/* Vignette gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-alchemy-black via-alchemy-black/50 to-alchemy-black/10" />

      {/* Red accent glow on hover */}
      <div 
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at 25% 15%, rgba(225,6,19,0.18) 0%, transparent 55%)',
        }}
      />

      {/* Content */}
      <div className="absolute inset-0 p-5 md:p-6 flex flex-col justify-between">
        {/* Top */}
        <div className="flex items-start justify-between">
          <div
            className="w-9 h-9 rounded-lg flex items-center justify-center backdrop-blur-sm"
            style={{
              background: 'rgba(225,6,19,0.12)',
              border: '1px solid rgba(225,6,19,0.25)',
            }}
          >
            <Icon className="w-4 h-4 text-alchemy-red" />
          </div>

          {project.isConceptual && (
            <span className="px-2.5 py-1 rounded-full text-[8px] font-mono text-porcelain/50 tracking-[0.12em] uppercase bg-white/[0.04] border border-white/[0.08]">
              Concept
            </span>
          )}
        </div>

        {/* Bottom */}
        <div>
          <span className="inline-block px-2 py-0.5 rounded-full text-[9px] font-mono text-porcelain/60 tracking-[0.1em] uppercase mb-2 bg-white/[0.05] border border-white/[0.08]">
            {project.category}
          </span>

          <h3 className={`font-display italic text-porcelain leading-tight mb-1.5 ${
            isHero ? 'text-2xl md:text-3xl lg:text-4xl' : 'text-lg md:text-xl'
          }`}>
            {project.title}
          </h3>

          {/* Reveal on hover */}
          <div className="opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
            <p className={`font-body text-porcelain/50 font-light line-clamp-2 mb-2 ${
              isHero ? 'text-sm max-w-md' : 'text-xs'
            }`}>
              {project.description}
            </p>
            <span className="inline-flex items-center gap-1.5 text-alchemy-red font-mono text-[10px] uppercase tracking-[0.12em]">
              <span>Explore</span>
              <ArrowUpRight className="w-3 h-3" />
            </span>
          </div>
        </div>
      </div>

      {/* Border glow on hover */}
      <div
        className="absolute inset-0 rounded-2xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          border: '1px solid rgba(225,6,19,0.35)',
          boxShadow: '0 0 30px rgba(225,6,19,0.12), inset 0 1px 0 rgba(255,255,255,0.04)',
        }}
      />
    </motion.div>
  );
};
