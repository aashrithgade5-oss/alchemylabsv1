import { memo, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Check } from 'lucide-react';
import { ServiceItem } from '@/data/servicesData';

interface NewServiceCardProps {
  service: ServiceItem;
  index: number;
}

const CALENDLY_URL = 'https://calendly.com/alchemylabs-work/30min';
const easing = [0.22, 1, 0.36, 1] as const;

const openCalendly = () => {
  (window as any).Calendly?.initPopupWidget({ url: CALENDLY_URL });
};

export const NewServiceCard = memo(({ service, index }: NewServiceCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const Icon = service.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ delay: index * 0.1, duration: 0.7, ease: easing }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative"
    >
      {/* Glass container */}
      <div
        className="relative rounded-2xl overflow-hidden transition-all duration-500"
        style={{
          background: 'linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%)',
          backdropFilter: 'blur(24px)',
          WebkitBackdropFilter: 'blur(24px)',
          border: '1px solid rgba(255,255,255,0.1)',
          boxShadow: isHovered ? '0 0 60px rgba(220,38,38,0.12)' : 'none',
          borderColor: isHovered ? 'rgba(220,38,38,0.3)' : 'rgba(255,255,255,0.1)',
        }}
      >
        {/* Gradient glow on hover */}
        <div
          className={`absolute inset-0 bg-gradient-to-br ${service.gradientFrom} ${service.gradientVia} ${service.gradientTo} transition-opacity duration-500 pointer-events-none ${isHovered ? 'opacity-100' : 'opacity-0'}`}
        />

        <div className="relative z-10 p-6 md:p-8">
          {/* Header */}
          <div className="flex items-start justify-between gap-4 mb-5">
            <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-alchemy-red/10 group-hover:bg-alchemy-red/20 transition-colors duration-300">
              <Icon className="w-6 h-6 text-alchemy-red" />
            </div>
            {service.tier && (
              <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-alchemy-red/70 border border-alchemy-red/20 rounded-full px-3 py-1 whitespace-nowrap">
                {service.tier}
              </span>
            )}
          </div>

          {/* Name */}
          <h3 className="font-display text-xl md:text-2xl italic text-porcelain mb-2 group-hover:text-alchemy-red transition-colors duration-300">
            {service.name}
          </h3>

          {/* Tagline */}
          <p className="font-body text-sm text-alchemy-red/70 mb-4 font-light">
            {service.tagline}
          </p>

          {/* Description */}
          <p className="font-body text-sm text-porcelain/55 leading-relaxed mb-5 font-light">
            {service.description}
          </p>

          {/* Conviction pullquote */}
          <div className="border-l-2 border-alchemy-red/30 pl-4 mb-6">
            <p className="font-display text-sm italic text-porcelain/70 leading-relaxed">
              {service.conviction}
            </p>
          </div>

          {/* Deliverables */}
          <div className="mb-6">
            <p className="font-mono text-[10px] tracking-[0.2em] uppercase text-porcelain/40 mb-3">
              What You Get
            </p>
            <ul className="space-y-2">
              {service.deliverables.map((item, i) => (
                <li key={i} className="flex items-start gap-2.5 text-sm text-porcelain/50">
                  <Check className="w-3.5 h-3.5 text-alchemy-red mt-0.5 flex-shrink-0" />
                  <span className="font-body font-light">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Meta row */}
          <div className="grid grid-cols-2 gap-4 mb-6 pb-6 border-b border-porcelain/8">
            <div>
              <p className="font-mono text-[10px] tracking-wider uppercase text-porcelain/30 mb-1">Timeline</p>
              <p className="font-mono text-xs text-porcelain/70">{service.timeline}</p>
            </div>
            <div>
              <p className="font-mono text-[10px] tracking-wider uppercase text-porcelain/30 mb-1">Investment</p>
              <p className="font-mono text-xs text-porcelain/70">{service.pricing}</p>
            </div>
          </div>

          {/* Ideal for */}
          <div className="mb-6">
            <p className="font-mono text-[10px] tracking-wider uppercase text-porcelain/30 mb-1">Ideal For</p>
            <p className="font-body text-xs text-porcelain/45 font-light leading-relaxed">{service.idealFor}</p>
          </div>

          {/* CTA */}
          <button
            type="button"
            onClick={openCalendly}
            className="w-full flex items-center justify-center gap-2 py-3 rounded-xl border border-porcelain/10 hover:border-alchemy-red/40 hover:bg-alchemy-red/5 transition-all duration-300 group/btn"
          >
            <span className="font-body text-sm text-porcelain/70 group-hover/btn:text-alchemy-red transition-colors">
              Book Discovery Call
            </span>
            <ArrowRight className="w-3.5 h-3.5 text-porcelain/50 group-hover/btn:text-alchemy-red group-hover/btn:translate-x-1 transition-all duration-300" />
          </button>
        </div>
      </div>
    </motion.div>
  );
});

NewServiceCard.displayName = 'NewServiceCard';
