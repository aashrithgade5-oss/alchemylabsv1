import { motion } from 'framer-motion';
import { memo } from 'react';
import { ScrollReveal } from '@/components/ScrollReveal';
import { Scan, Layers, Zap } from 'lucide-react';

const processSteps = [
  {
    number: '01',
    title: 'Decode',
    icon: Scan,
    description: 'Understand the brand, culture, and leverage points',
    gradient: 'rgba(220,38,38,0.03)',
  },
  {
    number: '02',
    title: 'Architect',
    icon: Layers,
    description: 'Build the system: narrative, identity, execution logic',
    gradient: 'rgba(220,38,38,0.06)',
  },
  {
    number: '03',
    title: 'Execute',
    icon: Zap,
    description: 'Deploy with precision, taste, and AI-native speed',
    gradient: 'rgba(220,38,38,0.10)',
  },
];

export const AboutProcessSection = memo(() => {
  return (
    <section className="relative py-20 sm:py-28 md:py-40 border-y border-porcelain/5 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-graphite-layer/30 to-background" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-alchemy-red/[0.03] rounded-full blur-[200px]" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-5 sm:px-6 md:px-12">
        {/* Header */}
        <ScrollReveal>
          <div className="text-center mb-12 sm:mb-16 md:mb-20">
            <span className="font-mono text-[11px] sm:text-xs text-alchemy-red tracking-[0.3em] uppercase mb-4 block">
              The Process
            </span>
            <h2 className="tracking-tight mb-4">
              <span className="font-body text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light text-porcelain/60 block">
                A sprint,
              </span>
              <span className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl italic text-porcelain">
                not a saga.
              </span>
            </h2>
            <p className="font-body text-base sm:text-lg text-porcelain/40 font-light">
              Three steps. Clear deliverables. No bloated decks.
            </p>
          </div>
        </ScrollReveal>

        {/* Process cards */}
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-0 mb-12 sm:mb-16">
          {processSteps.map((step, i) => (
            <ScrollReveal key={step.title} delay={i * 0.15}>
              <motion.div
                className="relative px-4 md:px-8 py-10 text-center group"
                whileHover={{ y: -4 }}
                transition={{ duration: 0.3 }}
              >
                {/* Vertical separator */}
                {i > 0 && (
                  <div className="hidden md:block absolute left-0 top-1/2 -translate-y-1/2 w-px h-24 bg-gradient-to-b from-transparent via-porcelain/10 to-transparent" />
                )}

                {/* Hover glass + progressive gradient */}
                <div
                  className="absolute inset-2 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    background: `linear-gradient(135deg, rgba(255,255,255,0.03) 0%, ${step.gradient} 100%)`,
                    border: '1px solid rgba(220,38,38,0.1)',
                  }}
                />

                {/* Large background number */}
                <span className="absolute top-4 right-4 font-display text-7xl sm:text-8xl italic text-porcelain/[0.03] leading-none pointer-events-none select-none">
                  {step.number}
                </span>

                {/* Icon */}
                <div className="relative z-10 mb-4 flex justify-center">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 group-hover:scale-110"
                    style={{
                      background: 'rgba(220,38,38,0.1)',
                      border: '1px solid rgba(220,38,38,0.2)',
                    }}
                  >
                    <step.icon className="w-5 h-5 text-alchemy-red" />
                  </div>
                </div>

                {/* Step number */}
                <span className="relative z-10 font-mono text-[11px] text-alchemy-red/50 tracking-wider block mb-2">
                  {step.number}
                </span>

                {/* Title */}
                <h4 className="relative z-10 font-display text-xl sm:text-2xl md:text-3xl italic text-alchemy-red mb-3">
                  {step.title}
                </h4>

                {/* Description */}
                <p className="relative z-10 font-body text-sm text-porcelain/45 font-light">
                  {step.description}
                </p>
              </motion.div>
            </ScrollReveal>
          ))}
        </div>

        {/* Closing */}
        <ScrollReveal delay={0.5}>
          <div className="text-center pt-8 border-t border-porcelain/5">
            <p className="font-body text-base sm:text-lg text-porcelain/35 font-light">
              No bloated decks. No performative strategy.
              <br />
              <span className="text-porcelain/55">Only work that compounds.</span>
            </p>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
});

AboutProcessSection.displayName = 'AboutProcessSection';
