import { memo } from 'react';
import { Link } from 'react-router-dom';
import { ScrollReveal } from '@/components/ScrollReveal';
import { MagneticCTA } from '@/components/portfolio/MagneticCTA';

export const FoundersCTA = memo(() => {
  return (
    <section className="relative py-24 sm:py-32 md:py-40 overflow-hidden">
      {/* Red glow background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-alchemy-red/10 rounded-full blur-[200px]" />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[300px] bg-deep-crimson/8 rounded-full blur-[150px]" />
      </div>

      <div className="relative z-10 max-w-3xl mx-auto px-5 sm:px-6 md:px-12 text-center">
        <ScrollReveal>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl italic text-porcelain mb-6 tracking-tight">
            Start a Conversation
          </h2>
          
          <p className="font-body text-base sm:text-lg text-porcelain/50 font-light mb-8 sm:mb-10">
            Ready to build something that matters? Let's talk about your brand.
          </p>

          <MagneticCTA href="/contact" variant="primary" size="lg">
            Start a Conversation
          </MagneticCTA>

          <p className="font-mono text-xs text-porcelain/30 tracking-[0.2em] uppercase mt-8">
            SELECTIVE PARTNERSHIPS. INTENTIONAL WORK.
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
});

FoundersCTA.displayName = 'FoundersCTA';
