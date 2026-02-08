import { motion } from 'framer-motion';
import { memo } from 'react';
import { ScrollReveal } from '@/components/ScrollReveal';
import { BlueprintGrid } from '@/components/effects';

export const PhilosophySection = memo(() => {
  return (
    <section className="relative py-20 sm:py-28 md:py-40 bg-cream-editorial overflow-hidden">
      {/* Blueprint overlay */}
      <BlueprintGrid opacity={0.02} />

      {/* Ambient glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-1/4 w-[400px] h-[400px] bg-alchemy-red/5 rounded-full blur-[150px]" />
      </div>

      {/* Technical corner labels */}
      <div className="absolute top-16 right-12 font-mono text-[10px] text-alchemy-red/20 hidden lg:block">
        <div className="flex items-center gap-2">
          <div className="w-1.5 h-1.5 bg-alchemy-red/40 rounded-full animate-pulse" />
          <span>PHILOSOPHY.MODULE</span>
        </div>
      </div>
      <div className="absolute bottom-16 left-12 font-mono text-[10px] text-alchemy-red/20 hidden lg:block">
        <div className="flex items-center gap-2">
          <span>v2.0.1</span>
          <div className="w-16 h-px bg-alchemy-red/20" />
        </div>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-5 sm:px-6 md:px-12">
        {/* Section label */}
        <ScrollReveal>
          <div className="flex items-center gap-4 mb-10 sm:mb-12">
            <div className="w-10 sm:w-14 h-px bg-alchemy-red/40" />
            <span className="font-mono text-[11px] sm:text-xs tracking-[0.25em] uppercase text-alchemy-black/40">
              Our Philosophy
            </span>
          </div>
        </ScrollReveal>

        {/* Two-column editorial layout */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Left — Large pull quote with hand-drawn accent */}
          <div>
            <ScrollReveal>
              <div className="relative">
                {/* Hand-drawn dashed accent line */}
                <svg className="absolute -left-4 top-0 w-6 h-32 opacity-40 hidden sm:block" viewBox="0 0 24 128">
                  <path
                    d="M 4 0 L 4 128"
                    stroke="hsl(var(--alchemy-red))"
                    strokeWidth="2"
                    fill="none"
                    strokeDasharray="4 4"
                  />
                </svg>

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
                  <motion.span
                    className="inline-block bg-gradient-to-r from-alchemy-red via-alchemy-pink to-alchemy-red bg-clip-text text-transparent bg-[length:200%_100%]"
                    animate={{ backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'] }}
                    transition={{ duration: 6, repeat: Infinity }}
                  >
                    trends.
                  </motion.span>
                  <br />
                  We build{' '}
                  <motion.span
                    className="inline-block bg-gradient-to-r from-alchemy-red via-alchemy-pink to-alchemy-red bg-clip-text text-transparent bg-[length:200%_100%]"
                    animate={{ backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'] }}
                    transition={{ duration: 6, repeat: Infinity, delay: 0.5 }}
                  >
                    systems
                  </motion.span>{' '}
                  that survive them.
                </blockquote>
              </div>
            </ScrollReveal>
          </div>

          {/* Right — Body copy + stats */}
          <div className="space-y-5 sm:space-y-6">
            <ScrollReveal delay={0.1}>
              <p className="font-body text-base sm:text-lg text-alchemy-black/70 leading-[1.7]">
                Alchemy Labs was built on a simple belief: brands don't fail because of lack of creativity—they fail because they lack{' '}
                <strong className="text-alchemy-black/85">structure, taste, and long-term thinking.</strong>
              </p>
            </ScrollReveal>

            <ScrollReveal delay={0.2}>
              <p className="font-body text-base sm:text-lg text-alchemy-black/70 leading-[1.7]">
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
