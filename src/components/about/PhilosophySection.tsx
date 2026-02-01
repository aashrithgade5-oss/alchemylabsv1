import { motion } from 'framer-motion';
import { memo } from 'react';
import { ScrollReveal } from '@/components/ScrollReveal';

export const PhilosophySection = memo(() => {
  return (
    <section className="relative py-20 sm:py-28 md:py-40 bg-cream-editorial overflow-hidden">
      {/* Liquid glass ambient */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-1/4 w-[400px] h-[400px] bg-alchemy-red/5 rounded-full blur-[150px]" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-5 sm:px-6 md:px-12">
        {/* Two-column editorial layout */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-24">
          {/* Left - Large pull quote */}
          <div>
            <ScrollReveal>
              <div className="relative">
                {/* Red accent mark */}
                <span className="absolute -left-4 top-0 text-alchemy-red text-6xl font-display">"</span>
                <blockquote className="font-display text-2xl sm:text-3xl md:text-4xl italic text-alchemy-black leading-[1.3] pl-6">
                  We don't chase trends. We build systems that survive them.
                </blockquote>
              </div>
            </ScrollReveal>
          </div>

          {/* Right - Body copy */}
          <div className="space-y-6 sm:space-y-8">
            <ScrollReveal delay={0.1}>
              <p className="font-body text-base sm:text-lg text-alchemy-black/70 font-light leading-relaxed">
                The modern brand landscape rewards speed—but punishes shallowness.
                AI has multiplied output, but diluted meaning. Alchemy Labs was created 
                to restore discipline to branding.
              </p>
            </ScrollReveal>
            
            <ScrollReveal delay={0.2}>
              <p className="font-body text-base sm:text-lg text-alchemy-black/70 font-light leading-relaxed">
                To combine human taste with machine leverage.
                To design not just campaigns—but infrastructure.
                Every brand we touch emerges with a system built for longevity.
              </p>
            </ScrollReveal>

            <ScrollReveal delay={0.3}>
              <div className="flex items-center gap-4 pt-4">
                <div className="h-px flex-1 bg-alchemy-black/10" />
                <span className="font-mono text-xs text-alchemy-red tracking-[0.2em] uppercase">
                  8+ Years Experience
                </span>
                <div className="h-px flex-1 bg-alchemy-black/10" />
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
});

PhilosophySection.displayName = 'PhilosophySection';
