import { memo } from 'react';
import { motion } from 'framer-motion';

interface CategoryHeaderProps {
  number: string;
  title: string;
  subtitle: string;
  description: string;
}

const easing = [0.22, 1, 0.36, 1] as const;

export const CategoryHeader = memo(({ number, title, subtitle, description }: CategoryHeaderProps) => (
  <div className="mb-12 md:mb-16">
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.6, ease: easing }}
      className="flex items-center gap-3 mb-6"
    >
      <span className="font-mono text-xs text-alchemy-red/60 tracking-[0.3em] uppercase">
        {number}
      </span>
      <div className="w-8 h-px bg-alchemy-red/30" />
      <span className="font-mono text-xs text-porcelain/40 tracking-[0.2em] uppercase">
        {subtitle}
      </span>
    </motion.div>

    <motion.h2
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.8, delay: 0.1, ease: easing }}
      className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl italic text-porcelain mb-4"
    >
      {title}
    </motion.h2>

    <motion.p
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.6, delay: 0.2, ease: easing }}
      className="font-body text-base md:text-lg text-porcelain/50 font-light max-w-2xl"
    >
      {description}
    </motion.p>
  </div>
));

CategoryHeader.displayName = 'CategoryHeader';
