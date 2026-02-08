import { motion } from 'framer-motion';
import { memo } from 'react';
import { ScrollReveal } from '@/components/ScrollReveal';

const principles = [
  { text: 'Restraint beats noise', index: 1 },
  { text: 'Systems beat luck', index: 2 },
  { text: 'Taste beats templates', index: 3 }
];

export const PrinciplesSection = memo(() => {
  return (
    <section className="relative py-16 sm:py-20 md:py-28 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-0 left-1/4 w-[500px] h-[300px] bg-alchemy-red/5 rounded-full blur-[150px]" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-5 sm:px-6 md:px-12">
        <ScrollReveal>
          <div className="flex items-center gap-6 mb-8 sm:mb-12">
            <div className="w-12 sm:w-16 h-px bg-alchemy-red/40" />
            <span className="font-mono text-xs text-porcelain/40 tracking-[0.3em] uppercase">
              Core Principles
            </span>
          </div>
        </ScrollReveal>

        {/* Principle cards */}
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
          {principles.map((principle, i) => (
            <ScrollReveal key={principle.text} delay={i * 0.1}>
              <motion.div
                className="relative p-6 sm:p-8 rounded-2xl cursor-default group"
                style={{
                  background: 'linear-gradient(135deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.01) 100%)',
                  border: '1px solid rgba(255,255,255,0.06)'
                }}
                whileHover={{ 
                  borderColor: 'rgba(220,38,38,0.3)',
                  scale: 1.02
                }}
                transition={{ duration: 0.3 }}
              >
                {/* Hover glow */}
                <div 
                  className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    background: 'radial-gradient(ellipse at 50% 0%, rgba(220,38,38,0.08) 0%, transparent 70%)'
                  }}
                />

                {/* Large serif numeral background */}
                <span className="absolute top-4 right-4 font-display text-5xl sm:text-6xl italic text-porcelain/[0.04] leading-none pointer-events-none select-none">
                  0{principle.index}
                </span>

                {/* Index */}
                <span className="relative z-10 font-mono text-xs text-alchemy-red/50 tracking-wider block mb-3">
                  0{principle.index}
                </span>

                {/* Principle text */}
                <p className="relative z-10 font-display text-lg sm:text-xl md:text-2xl italic text-porcelain">
                  {principle.text}
                </p>
              </motion.div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
});

PrinciplesSection.displayName = 'PrinciplesSection';
