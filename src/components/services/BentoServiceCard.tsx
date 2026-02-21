import { memo, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Check } from 'lucide-react';
import type { ServiceItem } from '@/data/servicesData';

const CALENDLY_URL = 'https://calendly.com/alchemylabs-work/30min';
const easing = [0.22, 1, 0.36, 1] as const;

const openCalendly = () => {
  (window as any).Calendly?.initPopupWidget({ url: CALENDLY_URL });
};

interface BentoServiceCardProps {
  service: ServiceItem;
  index: number;
  /** If true, card spans full width (16:9 hero card) */
  featured?: boolean;
}

export const BentoServiceCard = memo(({ service, index, featured = false }: BentoServiceCardProps) => {
  const [expanded, setExpanded] = useState(false);
  const Icon = service.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6, delay: index * 0.08, ease: easing }}
      className={featured ? 'col-span-full' : ''}
    >
      <div
        className={`group relative rounded-2xl overflow-hidden transition-all duration-500 cursor-pointer ${
          featured ? 'aspect-[16/7] md:aspect-[16/6]' : 'aspect-[16/9]'
        }`}
        style={{
          background: 'linear-gradient(135deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.01) 100%)',
          border: '1px solid rgba(255,255,255,0.08)',
        }}
        onClick={() => setExpanded(!expanded)}
      >
        {/* Gradient accent */}
        <div
          className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none bg-gradient-to-br ${service.gradientFrom} ${service.gradientVia} ${service.gradientTo}`}
        />

        {/* Inner glow on hover */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
          style={{ boxShadow: 'inset 0 0 80px rgba(220,38,38,0.06)' }}
        />

        {/* Ghost number */}
        <span className="absolute -top-4 -right-2 font-display text-[100px] md:text-[140px] text-porcelain/[0.02] leading-none pointer-events-none select-none">
          {String(index + 1).padStart(2, '0')}
        </span>

        {/* Content */}
        <div className="relative z-10 h-full p-6 sm:p-8 md:p-10 flex flex-col justify-between">
          {/* Top */}
          <div>
            <div className="flex items-start gap-4 mb-4">
              <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{
                  background: 'linear-gradient(135deg, rgba(220,38,38,0.12) 0%, rgba(220,38,38,0.04) 100%)',
                  border: '1px solid rgba(220,38,38,0.2)',
                }}
              >
                <Icon className="w-5 h-5 text-alchemy-red" />
              </div>
              <div className="flex-1 min-w-0">
                {service.tier && (
                  <p className="font-mono text-[9px] sm:text-[10px] text-alchemy-red/60 tracking-[0.2em] uppercase mb-1">
                    {service.tier}
                  </p>
                )}
                <h3 className="font-display text-lg sm:text-xl md:text-2xl italic text-porcelain group-hover:text-alchemy-red transition-colors duration-300 leading-tight">
                  {service.name}
                </h3>
              </div>
            </div>

            <p className="font-body text-sm text-alchemy-red/60 mb-2 font-light">
              {service.tagline}
            </p>
            <p className="font-body text-xs sm:text-sm text-porcelain/45 font-light leading-relaxed line-clamp-2 md:line-clamp-3">
              {service.description}
            </p>
          </div>

          {/* Bottom meta */}
          <div className="flex items-end justify-between mt-4">
            <div className="flex gap-6">
              <div>
                <p className="font-mono text-[9px] text-porcelain/30 tracking-wider uppercase">Timeline</p>
                <p className="font-mono text-xs text-porcelain/60">{service.timeline}</p>
              </div>
              <div>
                <p className="font-mono text-[9px] text-porcelain/30 tracking-wider uppercase">Investment</p>
                <p className="font-mono text-xs text-porcelain/60">{service.pricing}</p>
              </div>
            </div>

            <button
              onClick={(e) => { e.stopPropagation(); openCalendly(); }}
              className="flex items-center gap-2 text-porcelain/50 group-hover:text-alchemy-red transition-colors duration-300"
            >
              <span className="font-body text-xs sm:text-sm hidden sm:inline">Book Sprint</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
            </button>
          </div>
        </div>
      </div>

      {/* Expandable detail panel */}
      <motion.div
        initial={false}
        animate={{ height: expanded ? 'auto' : 0, opacity: expanded ? 1 : 0 }}
        transition={{ duration: 0.5, ease: easing }}
        className="overflow-hidden"
      >
        <div className="pt-4 pb-2 px-1">
          <div className="rounded-xl p-6 sm:p-8"
            style={{
              background: 'linear-gradient(135deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0.01) 100%)',
              border: '1px solid rgba(255,255,255,0.06)',
            }}
          >
            {/* Conviction */}
            <p className="font-display text-sm italic text-alchemy-red/70 mb-5 leading-relaxed">
              "{service.conviction}"
            </p>

            {/* Deliverables */}
            <div className="mb-5">
              <p className="font-mono text-[9px] text-alchemy-red/50 tracking-[0.2em] uppercase mb-3">Deliverables</p>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {service.deliverables.map((item, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <Check className="w-3.5 h-3.5 text-alchemy-red/60 mt-0.5 flex-shrink-0" />
                    <span className="font-body text-xs text-porcelain/55 font-light">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Ideal For */}
            <p className="font-body text-xs text-porcelain/35 font-light">
              <span className="font-mono text-[9px] text-porcelain/25 tracking-wider uppercase">Ideal for: </span>
              {service.idealFor}
            </p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
});

BentoServiceCard.displayName = 'BentoServiceCard';
