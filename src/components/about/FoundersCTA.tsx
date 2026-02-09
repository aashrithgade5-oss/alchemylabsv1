import { memo } from 'react';
import { ScrollReveal } from '@/components/ScrollReveal';
import { MagneticCTA } from '@/components/portfolio/MagneticCTA';
import { SequentianBackground } from '@/components/SequentianBackground';

export const FoundersCTA = memo(() => {
  return (
    <section className="relative py-24 sm:py-32 md:py-40 overflow-hidden">
      {/* Sequentian Soft Nebula background */}
      <SequentianBackground variant={2} opacity={0.4} parallax />

      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-alchemy-red/10 rounded-full blur-[200px]" />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[300px] bg-deep-crimson/[0.08] rounded-full blur-[150px]" />
      </div>

      <div className="relative z-10 max-w-3xl mx-auto px-5 sm:px-6 md:px-12 text-center">
        <ScrollReveal>
          <blockquote className="font-display text-2xl sm:text-3xl md:text-4xl italic text-porcelain leading-[1.35] mb-8 tracking-tight">
            "Alchemy Labs is{' '}
            <span className="text-alchemy-red">not for everyone.</span>
            <br />
            It's for those who want to build{' '}
            <span className="text-alchemy-red">something that lasts."</span>
          </blockquote>

          <p className="font-body text-base sm:text-lg text-porcelain/45 font-light mb-10">
            Ready to build something that matters? Let's talk about your brand.
          </p>

          <MagneticCTA href="/contact" variant="primary" size="lg">
            Start a Conversation
          </MagneticCTA>

          <div className="flex items-center justify-center gap-3 mt-10">
            <span className="font-mono text-[10px] sm:text-xs text-porcelain/25 tracking-[0.15em] uppercase">
              Selective partnerships
            </span>
            <span className="text-porcelain/15">·</span>
            <span className="font-mono text-[10px] sm:text-xs text-porcelain/25 tracking-[0.15em] uppercase">
              Intentional work
            </span>
            <span className="text-porcelain/15">·</span>
            <span className="font-mono text-[10px] sm:text-xs text-porcelain/25 tracking-[0.15em] uppercase">
              Mumbai
            </span>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
});

FoundersCTA.displayName = 'FoundersCTA';
