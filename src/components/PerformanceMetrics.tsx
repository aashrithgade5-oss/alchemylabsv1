import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { MetricCard } from './AnimatedCounter';
import { Zap, Users, InfinityIcon } from 'lucide-react';

const metrics = [
  {
    value: 0,
    displayValue: '∞',
    label: 'Creative Capacity',
    description: 'Limitless production powered by AI-native workflows and 24/7 systems.',
    icon: Infinity,
    isSpecial: true,
  },
  {
    value: 24,
    suffix: 'h',
    label: 'Concept Speed',
    description: 'From brief to first concept in under a day. Speed without sacrifice.',
    icon: Zap,
  },
  {
    value: 1,
    suffix: ':1',
    label: 'Founder Access',
    description: 'Direct collaboration with founding partners on every project.',
    icon: Users,
  },
];

export const PerformanceMetrics = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section 
      ref={sectionRef}
      className="relative py-32 overflow-hidden"
    >
      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-alchemy-red/5 rounded-full blur-[150px]" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Section header */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-20"
        >
          <span className="inline-block px-4 py-2 rounded-full glass text-xs font-mono tracking-widest text-alchemy-red/80 uppercase mb-6">
            By The Numbers
          </span>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-porcelain mb-6 tracking-tight">
            Built for <span className="text-alchemy-red">Velocity</span>
          </h2>
          <p className="font-body text-lg text-porcelain/60 max-w-2xl mx-auto">
            Our AI-native infrastructure enables unprecedented speed and scale, 
            without compromising on craft.
          </p>
        </motion.div>

        {/* Metrics grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 max-w-5xl mx-auto">
          {metrics.map((metric, index) => (
            <div key={metric.label} className="relative">
              {metric.isSpecial ? (
                <SpecialMetricCard 
                  displayValue={metric.displayValue || '∞'}
                  label={metric.label}
                  description={metric.description}
                  delay={index * 0.15}
                  isInView={isInView}
                />
              ) : (
                <MetricCard 
                  value={metric.value}
                  suffix={metric.suffix}
                  label={metric.label}
                  description={metric.description}
                  delay={index * 0.15}
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Special card for infinity symbol
const SpecialMetricCard = ({ 
  displayValue, 
  label, 
  description,
  delay,
  isInView,
}: {
  displayValue: string;
  label: string;
  description: string;
  delay: number;
  isInView: boolean;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40, scale: 0.95 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ 
        duration: 0.8, 
        delay,
        ease: [0.22, 1, 0.36, 1]
      }}
      className="relative group"
    >
      {/* Glow effect */}
      <div className="absolute -inset-px rounded-2xl bg-gradient-to-b from-alchemy-red/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl" />
      
      {/* Card */}
      <div className="relative p-8 rounded-2xl glass-deep border border-alchemy-red/10 hover:border-alchemy-red/30 transition-all duration-500">
        {/* Metric value */}
        <motion.div 
          className="flex items-baseline gap-1 mb-3"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={isInView ? { scale: 1, opacity: 1 } : {}}
          transition={{ 
            duration: 1.2, 
            delay: delay + 0.3,
            ease: [0.22, 1, 0.36, 1]
          }}
        >
          <span className="font-display text-5xl md:text-6xl text-alchemy-red tracking-tight">
            {displayValue}
          </span>
        </motion.div>

        {/* Label */}
        <h3 className="font-body text-lg text-porcelain/90 font-medium mb-2">
          {label}
        </h3>

        {/* Description */}
        <p className="font-body text-sm text-porcelain/50 leading-relaxed">
          {description}
        </p>

        {/* Decorative corner accent */}
        <div className="absolute top-4 right-4 w-8 h-8">
          <div className="absolute top-0 right-0 w-full h-[1px] bg-gradient-to-l from-alchemy-red/60 to-transparent" />
          <div className="absolute top-0 right-0 h-full w-[1px] bg-gradient-to-b from-alchemy-red/60 to-transparent" />
        </div>

        {/* Floating icon */}
        <motion.div 
          className="absolute bottom-4 right-4 opacity-10"
          animate={{ 
            y: [0, -5, 0],
            rotate: [0, 5, 0]
          }}
          transition={{ 
            duration: 4, 
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <InfinityIcon className="w-12 h-12 text-alchemy-red" />
        </motion.div>
      </div>
    </motion.div>
  );
};
