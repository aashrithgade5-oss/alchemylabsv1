import { motion } from 'framer-motion';
import { memo } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { ScrollReveal } from '@/components/ScrollReveal';

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

          <Link
            to="/contact"
            className="inline-flex items-center gap-3 px-8 py-4 rounded-full font-body font-medium text-porcelain transition-all duration-400 group"
            style={{
              background: 'linear-gradient(135deg, rgba(220,38,38,0.2) 0%, rgba(220,38,38,0.08) 100%)',
              border: '1px solid rgba(220,38,38,0.4)',
              boxShadow: '0 0 30px rgba(220,38,38,0.2), 0 0 60px rgba(220,38,38,0.1)'
            }}
          >
            <span>Start a Conversation</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>

          <p className="font-mono text-xs text-porcelain/30 tracking-[0.2em] uppercase mt-8">
            SELECTIVE PARTNERSHIPS. INTENTIONAL WORK.
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
});

FoundersCTA.displayName = 'FoundersCTA';
