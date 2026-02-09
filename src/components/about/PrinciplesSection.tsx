import { motion } from 'framer-motion';
import { memo } from 'react';
import { ScrollReveal } from '@/components/ScrollReveal';
import { SequentianBackground } from '@/components/SequentianBackground';

const principles = [
  { text: 'Restraint beats noise', index: 1 },
  { text: 'Systems beat luck', index: 2 },
  { text: 'Taste beats templates', index: 3 },
];

export const PrinciplesSection = memo(() => {
  return (
    <section className="relative py-16 sm:py-24 md:py-32 overflow-hidden">
      {/* Sequentian Soft Nebula background */}
      <SequentianBackground variant={5} opacity={0.35} parallax scaleEnd={1.08} blur={2} glow={false} />

      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-0 left-1/4 w-[500px] h-[300px] bg-alchemy-red/5 rounded-full blur-[150px]" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-5 sm:px-6 md:px-12">
        <ScrollReveal>
          <div className="flex items-center gap-6 mb-10 sm:mb-14">
            <div className="w-12 sm:w-16 h-px bg-alchemy-red/40" />
            <span className="font-mono text-[11px] sm:text-xs text-porcelain/40 tracking-[0.25em] uppercase">
              Core Principles
            </span>
          </div>
        </ScrollReveal>

        {/* Principles */}
        <div className="space-y-4 sm:space-y-6">
          {principles.map((principle, i) => (
            <ScrollReveal key={principle.text} delay={i * 0.12}>
              <motion.div
                className="relative p-8 sm:p-10 md:p-12 rounded-2xl cursor-default group overflow-hidden"
                style={{
                  background: 'linear-gradient(135deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0.01) 100%)',
                  borderLeft: '2px solid rgba(220,38,38,0.2)',
                  borderTop: '1px solid rgba(255,255,255,0.06)',
                  borderRight: '1px solid rgba(255,255,255,0.06)',
                  borderBottom: '1px solid rgba(255,255,255,0.06)',
                }}
                whileHover={{
                  borderColor: 'rgba(220,38,38,0.5)',
                }}
                transition={{ duration: 0.3 }}
              >
                {/* Hover glow */}
                <div
                  className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    background: 'radial-gradient(ellipse at 50% 0%, rgba(220,38,38,0.06) 0%, transparent 70%)',
                  }}
                />

                {/* Giant serif numeral background */}
                <span className="absolute right-6 sm:right-10 top-1/2 -translate-y-1/2 font-display text-[8rem] sm:text-[10rem] md:text-[12rem] italic text-porcelain/[0.025] leading-none pointer-events-none select-none">
                  0{principle.index}
                </span>

                <div className="relative z-10 flex items-center gap-6 sm:gap-10">
                  {/* Mono index */}
                  <span className="font-mono text-xs sm:text-sm text-alchemy-red/50 tracking-wider shrink-0">
                    0{principle.index}
                  </span>

                  {/* Principle text */}
                  <p className="font-display text-xl sm:text-2xl md:text-4xl lg:text-5xl italic text-porcelain">
                    {principle.text}
                  </p>
                </div>
              </motion.div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
});

PrinciplesSection.displayName = 'PrinciplesSection';
