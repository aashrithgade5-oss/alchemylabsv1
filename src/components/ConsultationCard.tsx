import { motion } from 'framer-motion';
import { ArrowRight, Check } from 'lucide-react';
import { ConsultationService } from '@/data/services';
import { Link } from 'react-router-dom';

interface ConsultationCardProps {
  service: ConsultationService;
  index: number;
}

export const ConsultationCard = ({ service, index }: ConsultationCardProps) => {
  const Icon = service.icon;
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ 
        delay: index * 0.15, 
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1]
      }}
      className="group relative rounded-2xl overflow-hidden flex flex-col"
    >
      {/* Glass background */}
      <div className="absolute inset-0 glass-deep transition-all duration-500 group-hover:border-alchemy-red/30" />
      
      {/* Hover glow */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-alchemy-red/5 via-transparent to-transparent" />
      </div>
      
      {/* Content */}
      <div className="relative z-10 p-6 md:p-8 flex flex-col flex-grow">
        {/* Duration Badge */}
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-lg glass-red flex items-center justify-center">
            <Icon className="w-5 h-5 text-alchemy-red" />
          </div>
          <span className="font-mono text-xs text-alchemy-red tracking-label uppercase">
            {service.duration}
          </span>
        </div>
        
        {/* Title */}
        <h3 className="font-display text-xl md:text-2xl italic text-porcelain mb-3">
          {service.headline}
        </h3>
        
        {/* Description */}
        <p className="font-body text-sm text-porcelain/60 leading-relaxed mb-5 font-light">
          {service.description}
        </p>
        
        {/* What's Included */}
        <div className="mb-5">
          <p className="font-mono text-xs text-porcelain/40 tracking-label uppercase mb-3">
            What's Included
          </p>
          <ul className="space-y-2">
            {service.includes.map((item, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-porcelain/50">
                <Check className="w-4 h-4 text-alchemy-red mt-0.5 flex-shrink-0" />
                <span className="font-body font-light">{item}</span>
              </li>
            ))}
          </ul>
        </div>
        
        {/* Best For */}
        <div className="mb-6">
          <p className="font-mono text-xs text-porcelain/40 tracking-label uppercase mb-2">
            Best For
          </p>
          <p className="font-body text-sm text-porcelain/60 font-light">
            {service.bestFor}
          </p>
        </div>
        
        {/* CTA */}
        <div className="mt-auto">
          <Link
            to={`/services/${service.slug}`}
            className="inline-flex items-center gap-2 glass-cta-primary w-full justify-center py-3"
          >
            <span className="font-body text-sm">Book {service.duration.split(' ')[0]} Session</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </motion.div>
  );
};
