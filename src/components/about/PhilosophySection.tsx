import { motion } from 'framer-motion';
import { memo } from 'react';
import { ScrollReveal } from '@/components/ScrollReveal';

export const PhilosophySection = memo(() => {
  return (
    <section className="relative py-20 sm:py-28 md:py-40 bg-cream-editorial overflow-hidden">
      {/* Ambient glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-1/4 w-[400px] h-[400px] bg-alchemy-red/5 rounded-full blur-[150px]" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-5 sm:px-6 md:px-12">
        {/* Section label */}
        <ScrollReveal>
          <div className="flex items-center gap-4 mb-10 sm:mb-14">
            <div className="w-10 sm:w-14 h-px bg-alchemy-red/40" />
            <span className="font-mono text-[11px] sm:text-xs tracking-[0.25em] uppercase text-alchemy-black/40">
              Our Philosophy
            </span>
          </div>
        </ScrollReveal>

        {/* Two-column editorial layout */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-24">
          {/* Left — Large pull quote */}
          <div>
            <ScrollReveal>
              <div className="relative">
                {/* Decorative quote mark */}
                <motion.span
                  className="absolute -left-4 sm:-left-6 -top-6 text-alchemy-red/60 text-7xl sm:text-8xl font-display leading-none select-none"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 0.6, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  "
                </motion.span>
                <blockquote className="font-display text-2xl sm:text-3xl md:text-4xl italic text-alchemy-black leading-[1.3] pl-6 sm:pl-8">
                  We don't chase{' '}
                  <span className="text-alchemy-red">trends.</span>
                  <br />
                  We build{' '}
                  <span className="text-alchemy-red">systems</span>{' '}
                  that survive them.
                </blockquote>
              </div>
            </ScrollReveal>
          </div>

          {/* Right — Body copy + stats */}
          <div className="space-y-6 sm:space-y-8">
            <ScrollReveal delay={0.1}>
              <p className="font-body text-base sm:text-lg text-alchemy-black/65 leading-relaxed">
                Alchemy Labs was built on a simple belief: brands don't fail because of lack of creativity—they fail because they lack{' '}
                <strong className="text-alchemy-black/80">structure, taste, and long-term thinking.</strong>
              </p>
            </ScrollReveal>

            <ScrollReveal delay={0.2}>
              <p className="font-body text-base sm:text-lg text-alchemy-black/65 leading-relaxed">
                We operate at the intersection of brand architecture, culture, and AI-native execution—designing systems that hold attention, scale with intelligence, and age with relevance.
              </p>
            </ScrollReveal>

            {/* Stats row */}
            <ScrollReveal delay={0.3}>
              <div className="flex items-center gap-8 pt-6 border-t border-alchemy-black/10">
                <div>
                  <span className="font-display text-3xl sm:text-4xl italic text-alchemy-red block">
                    8+
                  </span>
                  <span className="font-mono text-[10px] sm:text-xs text-alchemy-black/40 tracking-[0.15em] uppercase">
                    Years Experience
                  </span>
                </div>
                <div className="w-px h-10 bg-alchemy-black/10" />
                <div>
                  <span className="font-display text-3xl sm:text-4xl italic text-alchemy-red block">
                    50+
                  </span>
                  <span className="font-mono text-[10px] sm:text-xs text-alchemy-black/40 tracking-[0.15em] uppercase">
                    Brands Transformed
                  </span>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
});

PhilosophySection.displayName = 'PhilosophySection';
