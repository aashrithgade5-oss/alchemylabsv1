import { motion } from 'framer-motion';
import { memo } from 'react';
import { ScrollReveal } from '@/components/ScrollReveal';
import { Scan, Layers, Zap } from 'lucide-react';

const processSteps = [
  {
    number: '01',
    title: 'Decode',
    icon: Scan,
    description: 'Understand the brand, culture, and leverage points'
  },
  {
    number: '02',
    title: 'Architect',
    icon: Layers,
    description: 'Build the system: narrative, identity, execution logic'
  },
  {
    number: '03',
    title: 'Execute',
    icon: Zap,
    description: 'Deploy with precision, taste, and AI-native speed'
  }
];

export const AboutProcessSection = memo(() => {
  return (
    <section className="relative py-20 sm:py-28 md:py-40 border-y border-porcelain/5 overflow-hidden">
      {/* Background gradient mesh */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-graphite-layer/30 to-background" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-alchemy-red/3 rounded-full blur-[200px]" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-5 sm:px-6 md:px-12">
        <ScrollReveal>
          <div className="text-center mb-12 sm:mb-16 md:mb-20">
            <span className="font-mono text-xs text-alchemy-red tracking-[0.3em] uppercase mb-4 block">
              THE PROCESS
            </span>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl italic text-porcelain tracking-tight mb-4">
              A sprint, not a saga.
            </h2>
            <p className="font-body text-base sm:text-lg text-porcelain/50 font-light">
              Four steps. Clear deliverables. No bloated decks.
            </p>
          </div>
        </ScrollReveal>

        {/* Process cards with vertical separators */}
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-0 mb-12 sm:mb-16">
          {processSteps.map((step, i) => (
            <ScrollReveal key={step.title} delay={i * 0.15}>
              <motion.div 
                className="relative px-4 md:px-8 py-8 text-center group"
                whileHover={{ y: -4 }}
                transition={{ duration: 0.3 }}
              >
                {/* Vertical separator (hidden on first) */}
                {i > 0 && (
                  <div className="hidden md:block absolute left-0 top-1/2 -translate-y-1/2 w-px h-24 bg-gradient-to-b from-transparent via-porcelain/10 to-transparent" />
                )}

                {/* Glass card effect on hover */}
                <div 
                  className="absolute inset-2 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    background: 'linear-gradient(135deg, rgba(255,255,255,0.03) 0%, rgba(220,38,38,0.05) 100%)',
                    border: '1px solid rgba(220,38,38,0.1)'
                  }}
                />

                {/* Icon */}
                <div className="relative z-10 mb-4 flex justify-center">
                  <div 
                    className="w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 group-hover:scale-110"
                    style={{
                      background: 'rgba(220,38,38,0.1)',
                      border: '1px solid rgba(220,38,38,0.2)'
                    }}
                  >
                    <step.icon className="w-5 h-5 text-alchemy-red" />
                  </div>
                </div>

                {/* Step number */}
                <span className="relative z-10 font-display text-4xl sm:text-5xl italic text-porcelain/10 block mb-2">
                  {step.number}
                </span>
                
                {/* Title */}
                <h4 className="relative z-10 font-display text-xl sm:text-2xl md:text-3xl italic text-alchemy-red mb-3">
                  {step.title}
                </h4>
                
                {/* Description */}
                <p className="relative z-10 font-body text-sm text-porcelain/50 font-light">
                  {step.description}
                </p>
              </motion.div>
            </ScrollReveal>
          ))}
        </div>

        {/* Closing statement */}
        <ScrollReveal delay={0.5}>
          <div className="text-center pt-8 border-t border-porcelain/5">
            <p className="font-body text-base sm:text-lg text-porcelain/40 font-light">
              No bloated decks. No performative strategy.<br />
              <span className="text-porcelain/60">Only work that compounds.</span>
            </p>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
});

AboutProcessSection.displayName = 'AboutProcessSection';
