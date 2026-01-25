import { motion } from 'framer-motion';
import { ArrowRight, Phone, Map, Zap, Rocket } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useState, memo } from 'react';
import { DynamicGlowBg } from './DynamicGlowBg';

const processSteps = [
  {
    number: '01',
    title: 'Sprint Call',
    description: 'Clarify goal + constraints',
    icon: Phone,
    duration: '30 min',
  },
  {
    number: '02',
    title: 'System Map',
    description: 'What to build + why',
    icon: Map,
    duration: '24h',
  },
  {
    number: '03',
    title: 'Build + Iterate',
    description: 'Rapid execution',
    icon: Zap,
    duration: 'Ongoing',
  },
  {
    number: '04',
    title: 'Deploy + Handoff',
    description: 'Ready to ship',
    icon: Rocket,
    duration: 'Final',
  },
];

const deliverables = [
  {
    title: 'What you receive',
    items: ['Production-ready assets', 'Brand system documentation', 'Implementation guidelines'],
  },
  {
    title: 'Timeline',
    items: ['First build: 24 hours', 'Iterations: Unlimited', 'Full delivery: 1-2 weeks'],
  },
  {
    title: 'Collaboration model',
    items: ['Direct founder access', 'Async updates', 'Real-time feedback loops'],
  },
];

export const ProcessSection = memo(() => {
  const [expandedDeliverable, setExpandedDeliverable] = useState<number | null>(null);

  return (
    <section id="process" className="relative py-32 overflow-hidden">
      {/* Dynamic Glow Background */}
      <DynamicGlowBg variant="liquid" position="left" opacity={0.3} />
      
      {/* Additional gradient overlay */}
      <div className="absolute inset-0 pointer-events-none">
        <div 
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(180deg, hsl(0 0% 4% / 0.85) 0%, hsl(0 0% 4% / 0.65) 50%, hsl(0 0% 4% / 0.85) 100%)',
          }}
        />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-20"
        >
          <span className="inline-block px-4 py-2 rounded-full backdrop-blur-md mb-6"
            style={{
              background: 'linear-gradient(135deg, rgba(220, 38, 38, 0.15) 0%, rgba(255, 255, 255, 0.05) 100%)',
              border: '1px solid rgba(220, 38, 38, 0.3)',
            }}
          >
            <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-porcelain/80">
              The Process
            </span>
          </span>
          
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl leading-[1.05] tracking-[-0.02em] text-porcelain mb-6">
            <span className="block">A <span className="italic text-alchemy-red">sprint</span>,</span>
            <span className="block">not a saga.</span>
          </h2>
          
          <p className="font-body text-sm md:text-base text-porcelain/50 max-w-md mx-auto font-light">
            Four steps. Clear deliverables. No bloated decks.
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="grid md:grid-cols-4 gap-6 mb-16">
          {processSteps.map((step, i) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                className="relative group"
              >
                {/* Connector line */}
                {i < processSteps.length - 1 && (
                  <div className="hidden md:block absolute top-10 left-[calc(50%+28px)] w-[calc(100%-56px)] h-px bg-gradient-to-r from-porcelain/10 via-alchemy-red/30 to-porcelain/10" />
                )}
                
                <div 
                  className="rounded-2xl p-6 text-center h-full transition-all duration-300 group-hover:border-alchemy-red/30"
                  style={{
                    background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.04) 0%, rgba(255, 255, 255, 0.01) 100%)',
                    backdropFilter: 'blur(16px)',
                    border: '1px solid rgba(255, 255, 255, 0.06)',
                  }}
                >
                  {/* Icon */}
                  <div 
                    className="w-14 h-14 rounded-xl mx-auto mb-4 flex items-center justify-center group-hover:shadow-[0_0_20px_rgba(220,38,38,0.25)] transition-shadow duration-300"
                    style={{
                      background: 'linear-gradient(135deg, rgba(220, 38, 38, 0.15) 0%, rgba(220, 38, 38, 0.05) 100%)',
                      border: '1px solid rgba(220, 38, 38, 0.25)',
                    }}
                  >
                    <Icon className="w-6 h-6 text-alchemy-red" />
                  </div>

                  <span className="font-mono text-[10px] text-alchemy-red/60 tracking-[0.2em] uppercase">
                    Step {step.number}
                  </span>
                  
                  <h3 className="font-display text-xl italic text-porcelain mt-2 mb-2">
                    {step.title}
                  </h3>
                  
                  <p className="font-body text-sm text-porcelain/50 font-light mb-3">
                    {step.description}
                  </p>
                  
                  <span className="font-mono text-[10px] text-porcelain/30 uppercase tracking-wider">
                    {step.duration}
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Deliverables Accordion */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mb-16"
        >
          <h3 className="font-mono text-xs text-center text-porcelain/40 tracking-[0.2em] uppercase mb-8">
            Deliverables Snapshot
          </h3>
          
          <div className="grid md:grid-cols-3 gap-4">
            {deliverables.map((section, i) => (
              <motion.div
                key={section.title}
                className="rounded-xl overflow-hidden cursor-pointer transition-all duration-300"
                style={{
                  background: expandedDeliverable === i 
                    ? 'linear-gradient(135deg, rgba(220, 38, 38, 0.1) 0%, rgba(255, 255, 255, 0.03) 100%)'
                    : 'linear-gradient(135deg, rgba(255, 255, 255, 0.03) 0%, rgba(255, 255, 255, 0.01) 100%)',
                  border: expandedDeliverable === i 
                    ? '1px solid rgba(220, 38, 38, 0.3)'
                    : '1px solid rgba(255, 255, 255, 0.06)',
                }}
                onClick={() => setExpandedDeliverable(expandedDeliverable === i ? null : i)}
              >
                <div className="p-5">
                  <div className="flex items-center justify-between">
                    <h4 className="font-body text-sm font-medium text-porcelain">
                      {section.title}
                    </h4>
                    <motion.div
                      animate={{ rotate: expandedDeliverable === i ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <ArrowRight className="w-4 h-4 text-alchemy-red rotate-90" />
                    </motion.div>
                  </div>
                  
                  <motion.div
                    initial={false}
                    animate={{ 
                      height: expandedDeliverable === i ? 'auto' : 0,
                      opacity: expandedDeliverable === i ? 1 : 0,
                    }}
                    transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                    className="overflow-hidden"
                  >
                    <ul className="mt-4 space-y-2">
                      {section.items.map((item, j) => (
                        <li key={j} className="flex items-center gap-2 text-sm text-porcelain/60 font-light">
                          <span className="w-1 h-1 rounded-full bg-alchemy-red" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-center"
        >
          <Link
            to="/book-sprint"
            className="inline-flex items-center gap-3 px-8 py-4 rounded-full font-body font-medium text-sm transition-all duration-300 group"
            style={{
              background: 'linear-gradient(135deg, rgba(220, 38, 38, 0.2) 0%, rgba(220, 38, 38, 0.08) 100%)',
              border: '1px solid rgba(220, 38, 38, 0.4)',
              boxShadow: '0 0 30px rgba(220, 38, 38, 0.2)',
            }}
          >
            <span className="text-porcelain">Book a Sprint</span>
            <ArrowRight className="w-4 h-4 text-porcelain group-hover:translate-x-1 transition-transform duration-300" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
});

ProcessSection.displayName = 'ProcessSection';
