import { motion } from 'framer-motion';
import { ArrowRight, Check } from 'lucide-react';
import { Service } from '@/data/services';
import { Link } from 'react-router-dom';
import { useState } from 'react';

interface ServiceCardProps {
  service: Service;
  index: number;
}

export const ServiceCard = ({ service, index }: ServiceCardProps) => {
  const Icon = service.icon;
  const [isHovered, setIsHovered] = useState(false);
  
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
      style={{ perspective: '900px', transformStyle: 'preserve-3d' }}
      whileHover={{
        rotateX: -3,
        rotateY: 5,
        scale: 1.025,
        z: 20,
      }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      {/* Glass background with specular top highlight */}
      <div className="absolute inset-0 glass-deep transition-all duration-500 group-hover:border-alchemy-red/30">
        {/* Specular edge highlight */}
        <div 
          className="absolute inset-x-0 top-0 h-px pointer-events-none"
          style={{
            background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.12) 40%, rgba(255,255,255,0.06) 60%, transparent)',
          }}
        />
      </div>

      {/* Motion blur shimmer sweep */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-2xl">
        <motion.div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(108deg, transparent 35%, rgba(255,255,255,0.055) 50%, transparent 65%)',
            filter: 'blur(6px)',
          }}
          initial={{ x: '-120%' }}
          animate={{ x: isHovered ? '220%' : '-120%' }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
        />
      </div>
      
      {/* Hover glow effect */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-alchemy-red/5 via-transparent to-transparent" />
      </div>
      
      {/* Content */}
      <div className="relative z-10 p-6 md:p-8">
        {/* Icon with glow ring */}
        <div className="mb-5">
          <div className="relative w-12 h-12">
            {/* Rotating glow ring */}
            <div 
              className="absolute -inset-[2px] rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-400"
              style={{
                background: 'conic-gradient(from 0deg, rgba(220,38,38,0.7), rgba(220,38,38,0.1), rgba(220,38,38,0.7))',
                animation: isHovered ? 'spin 3s linear infinite' : 'none',
              }}
            />
            <div className="relative z-10 glass-red w-12 h-12 rounded-xl flex items-center justify-center group-hover:shadow-[0_0_20px_rgba(225,6,19,0.3)] transition-shadow duration-500">
              <Icon className="w-6 h-6 text-alchemy-red" />
            </div>
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
            <motion.span
              animate={{ x: isHovered ? 4 : 0, opacity: isHovered ? 1 : 0.5 }}
              transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
            >
              <ArrowRight className="w-3 h-3" />
            </motion.span>
          </Link>
        </div>
      </div>
    </motion.div>
  );
};
