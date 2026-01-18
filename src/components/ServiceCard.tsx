import { motion } from 'framer-motion';
import { ArrowRight, Check } from 'lucide-react';
import { Service } from '@/data/services';
import { Link } from 'react-router-dom';

interface ServiceCardProps {
  service: Service;
  index: number;
}

export const ServiceCard = ({ service, index }: ServiceCardProps) => {
  const Icon = service.icon;
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ 
        delay: index * 0.1, 
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1]
      }}
      className="group relative rounded-2xl overflow-hidden"
    >
      {/* Glass background */}
      <div className="absolute inset-0 glass-deep transition-all duration-500 group-hover:border-alchemy-red/30" />
      
      {/* Hover glow effect */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-alchemy-red/5 via-transparent to-transparent" />
      </div>
      
      {/* Content */}
      <div className="relative z-10 p-6 md:p-8">
        {/* Icon */}
        <div className="mb-5">
          <div className="w-12 h-12 rounded-xl glass-red flex items-center justify-center group-hover:shadow-[0_0_20px_rgba(225,6,19,0.3)] transition-shadow duration-500">
            <Icon className="w-6 h-6 text-alchemy-red" />
          </div>
        </div>
        
        {/* Title */}
        <h3 className="font-display text-xl md:text-2xl italic text-porcelain mb-3">
          {service.title}
        </h3>
        
        {/* Description */}
        <p className="font-body text-sm text-porcelain/60 leading-relaxed mb-5 font-light">
          {service.description}
        </p>
        
        {/* Features List */}
        <ul className="space-y-2 mb-6">
          {service.features.map((feature, i) => (
            <li key={i} className="flex items-start gap-2 text-sm text-porcelain/50">
              <Check className="w-4 h-4 text-alchemy-red mt-0.5 flex-shrink-0" />
              <span className="font-body font-light">{feature}</span>
            </li>
          ))}
        </ul>
        
        {/* Footer */}
        <div className="flex items-center justify-between pt-4 border-t border-porcelain/10">
          <span className="font-mono text-xs text-alchemy-red">
            {service.meta}
          </span>
          <Link 
            to={`/services/${service.slug}`}
            className="inline-flex items-center gap-1 text-sm text-porcelain/50 hover:text-alchemy-red transition-colors group/link"
          >
            <span className="font-body">Explore</span>
            <ArrowRight className="w-3 h-3 transition-transform group-hover/link:translate-x-1" />
          </Link>
        </div>
      </div>
    </motion.div>
  );
};
