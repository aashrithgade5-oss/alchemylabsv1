import { memo } from 'react';
import { ScrollReveal } from '@/components/ScrollReveal';

export const WhoWeServe = memo(() => {
  return (
    <section className="relative py-24 sm:py-32 md:py-40 overflow-hidden">
      <div className="relative z-10 max-w-4xl mx-auto px-5 sm:px-6 md:px-12 text-center">
        <ScrollReveal>
          <p
            className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl italic leading-[1.3] tracking-tight text-balance"
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
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
});

WhoWeServe.displayName = 'WhoWeServe';
