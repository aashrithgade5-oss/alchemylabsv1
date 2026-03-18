import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, Phone, Map, Zap, Rocket } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useState, memo, useRef } from 'react';
import { DynamicGlowBg } from './DynamicGlowBg';

const processSteps = [
  { number: '01', title: 'Sprint Call', description: 'Clarify goal + constraints', icon: Phone, duration: '30 min' },
  { number: '02', title: 'System Map', description: 'What to build + why', icon: Map, duration: '24h' },
  { number: '03', title: 'Build + Iterate', description: 'Rapid execution', icon: Zap, duration: 'Ongoing' },
  { number: '04', title: 'Deploy + Handoff', description: 'Ready to ship', icon: Rocket, duration: 'Final' },
];

const deliverables = [
  { title: 'What you receive', items: ['Production-ready assets', 'Brand system documentation', 'Implementation guidelines'] },
  { title: 'Timeline', items: ['First build: 24 hours', 'Iterations: Unlimited', 'Full delivery: 1-2 weeks'] },
  { title: 'Collaboration model', items: ['Direct founder access', 'Async updates', 'Real-time feedback loops'] },
];

export const ProcessSection = memo(() => {
  const [expandedDeliverable, setExpandedDeliverable] = useState<number | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start end', 'end start'] });
  const connectorWidth = useTransform(scrollYProgress, [0.2, 0.6], ['0%', '100%']);

  return (
    <section id="process" ref={sectionRef} className="relative py-32 overflow-hidden">
      <DynamicGlowBg variant="liquid" position="left" opacity={0.3} />
      
      <div className="absolute inset-0 pointer-events-none" style={{
        background: 'linear-gradient(180deg, hsl(0 0% 4% / 0.85) 0%, hsl(0 0% 4% / 0.65) 50%, hsl(0 0% 4% / 0.85) 100%)',
      }} />

      <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40, filter: 'blur(10px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-20"
        >
          <span className="inline-block px-4 py-2 rounded-full mb-6"
            style={{
              background: 'rgba(220,38,38,0.1)',
              border: '1px solid rgba(220,38,38,0.3)',
              boxShadow: '0 0 20px rgba(220,38,38,0.1)',
            }}
          >
            <span className="font-mono text-[10px] tracking-[0.25em] uppercase text-porcelain/80">The Process</span>
          </span>
          
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl leading-[1.05] tracking-[-0.02em] text-porcelain mb-6">
            <span className="block">
              A <span className="italic text-alchemy-red" style={{ textShadow: '0 0 40px rgba(220,38,38,0.3)' }}>sprint</span>,
            </span>
            <span className="block">not a saga.</span>
          </h2>
          
          <p className="font-body text-sm md:text-base text-porcelain/50 max-w-md mx-auto font-light">
            Four steps. Clear deliverables. No bloated decks.
          </p>
        </motion.div>

        {/* Timeline — with scroll-animated connector */}
        <div className="relative mb-16">
          {/* Animated connector line */}
          <div className="hidden md:block absolute top-10 left-[10%] right-[10%] h-px">
            <div className="absolute inset-0 bg-porcelain/[0.05]" />
            <motion.div 
              className="absolute inset-y-0 left-0 bg-gradient-to-r from-alchemy-red via-alchemy-red/60 to-transparent"
              style={{ width: connectorWidth, boxShadow: '0 0 10px rgba(220,38,38,0.4)' }}
            />
          </div>

          <div className="grid md:grid-cols-4 gap-6">
            {processSteps.map((step, i) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={step.number}
                  initial={{ opacity: 0, y: 40, scale: 0.9 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
                  whileHover={{ y: -6, scale: 1.03 }}
                  className="relative group"
                >
                  <div className="rounded-2xl p-6 text-center h-full transition-all duration-500 group-hover:border-alchemy-red/30"
                    style={{
                      background: 'linear-gradient(145deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.01) 100%)',
                      backdropFilter: 'blur(16px)',
                      border: '1px solid rgba(255,255,255,0.07)',
                    }}
                  >
                    {/* Hover glow */}
                    <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                      style={{ background: 'radial-gradient(ellipse at 50% 30%, rgba(220,38,38,0.1) 0%, transparent 70%)' }}
                    />

                    {/* Specular top */}
                    <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent rounded-t-2xl" />

                    <div className="w-14 h-14 rounded-xl mx-auto mb-4 flex items-center justify-center transition-all duration-500 group-hover:shadow-[0_0_25px_rgba(220,38,38,0.3)]"
                      style={{
                        background: 'linear-gradient(135deg, rgba(220,38,38,0.15) 0%, rgba(220,38,38,0.05) 100%)',
                        border: '1px solid rgba(220,38,38,0.25)',
                      }}
                    >
                      <Icon className="w-6 h-6 text-alchemy-red" />
                    </div>

                    <span className="font-display text-lg italic text-alchemy-red/60 tracking-[0.2em]">{step.number}</span>
                    <h3 className="font-display text-xl italic text-porcelain mt-2 mb-2">{step.title}</h3>
                    <p className="font-body text-sm text-porcelain/50 font-light mb-3">{step.description}</p>
                    <span className="font-mono text-[10px] text-porcelain/30 uppercase tracking-wider">{step.duration}</span>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Deliverables */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-16"
        >
          <h3 className="font-mono text-xs text-center text-porcelain/40 tracking-[0.25em] uppercase mb-8">
            Deliverables Snapshot
          </h3>
          
          <div className="grid md:grid-cols-3 gap-4">
            {deliverables.map((section, i) => (
              <motion.div
                key={section.title}
                whileHover={{ scale: 1.02 }}
                className="rounded-xl overflow-hidden cursor-pointer transition-all duration-300"
                style={{
                  background: expandedDeliverable === i 
                    ? 'linear-gradient(145deg, rgba(220,38,38,0.12) 0%, rgba(255,255,255,0.03) 100%)'
                    : 'linear-gradient(145deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.01) 100%)',
                  border: expandedDeliverable === i 
                    ? '1px solid rgba(220,38,38,0.35)'
                    : '1px solid rgba(255,255,255,0.06)',
                  boxShadow: expandedDeliverable === i ? '0 0 30px rgba(220,38,38,0.1)' : 'none',
                }}
                onClick={() => setExpandedDeliverable(expandedDeliverable === i ? null : i)}
              >
                <div className="p-5">
                  <div className="flex items-center justify-between">
                    <h4 className="font-body text-sm font-medium text-porcelain">{section.title}</h4>
                    <motion.div animate={{ rotate: expandedDeliverable === i ? 180 : 0 }} transition={{ duration: 0.3 }}>
                      <ArrowRight className="w-4 h-4 text-alchemy-red rotate-90" />
                    </motion.div>
                  </div>
                  
                  <motion.div
                    initial={false}
                    animate={{ height: expandedDeliverable === i ? 'auto' : 0, opacity: expandedDeliverable === i ? 1 : 0 }}
                    transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                    className="overflow-hidden"
                  >
                    <ul className="mt-4 space-y-2">
                      {section.items.map((item, j) => (
                        <li key={j} className="flex items-center gap-2 text-sm text-porcelain/60 font-light">
                          <span className="w-1.5 h-1.5 rounded-full bg-alchemy-red" />
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
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-center"
        >
          <Link
            to="/book-sprint"
            className="inline-flex items-center gap-3 glass-cta-primary group relative overflow-hidden"
          >
            <span className="relative z-10 font-body font-medium text-sm">Book a Sprint</span>
            <ArrowRight className="relative z-10 w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
});

ProcessSection.displayName = 'ProcessSection';
