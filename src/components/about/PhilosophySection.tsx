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
                {/* Decorative quote mark */}
                <motion.span 
                  className="absolute -left-6 sm:-left-8 -top-4 text-alchemy-red text-7xl sm:text-8xl font-display leading-none select-none"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 0.8, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  "
                </motion.span>
                <blockquote className="font-display text-2xl sm:text-3xl md:text-4xl italic text-alchemy-black leading-[1.3] pl-8 sm:pl-10">
                  We don't chase trends. We build systems that survive them.
                </blockquote>
                {/* Closing quote mark */}
                <motion.span 
                  className="absolute right-0 bottom-0 text-alchemy-red/20 text-6xl sm:text-7xl font-display leading-none select-none"
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 0.4, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                >
                  "
                </motion.span>
              </div>
            </ScrollReveal>
          </div>

          {/* Right - Body copy */}
          <div className="space-y-6 sm:space-y-8">
            <ScrollReveal delay={0.1}>
              <p className="font-body text-base sm:text-lg text-alchemy-black/70 font-light leading-relaxed">
                Alchemy Labs was built on a simple belief: brands don't fail because of lack of creativity—they fail because they lack structure, taste, and long-term thinking.
              </p>
            </ScrollReveal>
            
            <ScrollReveal delay={0.2}>
              <p className="font-body text-base sm:text-lg text-alchemy-black/70 font-light leading-relaxed">
                We operate at the intersection of brand architecture, culture, and AI-native execution—designing systems that hold attention, scale with intelligence, and age with relevance.
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
