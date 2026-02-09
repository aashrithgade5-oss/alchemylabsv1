import { memo } from 'react';
import { motion } from 'framer-motion';
import { ScrollReveal } from '@/components/ScrollReveal';
import { SequentianBackground } from '@/components/SequentianBackground';

export const WhoWeServe = memo(() => {
  return (
    <section className="relative py-24 sm:py-32 md:py-40 overflow-hidden">
      {/* Sequentian Crimson Cloud background */}
      <SequentianBackground variant={4} opacity={0.35} parallax />

      <div className="relative z-10 max-w-4xl mx-auto px-5 sm:px-6 md:px-12 text-center">
        <ScrollReveal>
          {/* Decorative line above */}
          <div className="w-20 h-px mx-auto mb-10 bg-gradient-to-r from-transparent via-alchemy-red/40 to-transparent" />

          <motion.p
            className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl italic leading-[1.3] tracking-tight text-balance"
            initial={{ scale: 0.96, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            style={{
              background: 'linear-gradient(135deg, hsl(var(--porcelain)) 0%, hsl(var(--alchemy-red)) 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            Alchemy Labs is not for everyone.
            <br />
            It's for those who want to build something that lasts.
          </motion.p>

          {/* Decorative line below */}
          <div className="w-20 h-px mx-auto mt-10 mb-6 bg-gradient-to-r from-transparent via-alchemy-red/40 to-transparent" />

          {/* Attribution */}
          <p className="font-mono text-[10px] sm:text-xs text-porcelain/30 tracking-[0.2em] uppercase">
            — Alchemy Labs Philosophy
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
});

WhoWeServe.displayName = 'WhoWeServe';
