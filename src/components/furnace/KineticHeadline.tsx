'use client';

import { m, useScroll, useSpring, useTransform, useVelocity } from 'framer-motion';
import { useMemo } from 'react';

const ease: [number, number, number, number] = [0.16, 1, 0.3, 1];

/**
 * Skew the wrapped element with scroll velocity. Spring-smoothed and capped
 * low so it reads as weight shifting, never as wobble.
 */
export function useScrollVelocitySkew(maxDeg = 0.6) {
  const { scrollY } = useScroll();
  const velocity = useVelocity(scrollY);
  const smoothed = useSpring(velocity, { stiffness: 250, damping: 50, mass: 0.6 });
  return useTransform(smoothed, [-1800, 0, 1800], [maxDeg, 0, -maxDeg], { clamp: true });
}

interface KineticHeadlineProps {
  text: string;
  className?: string;
  /** Tag to render — h1 on the hero, h2 elsewhere. */
  as?: 'h1' | 'h2' | 'p';
  delay?: number;
}

// Word-split headline: each word rises out of blur in a tight stagger.
// The split happens at render from a static string, so SSR output is stable.
export function KineticHeadline({ text, className = '', as = 'h1', delay = 0 }: KineticHeadlineProps) {
  const words = useMemo(() => text.split(' '), [text]);
  const Tag = m[as];

  return (
    <Tag
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-60px' }}
      transition={{ staggerChildren: 0.09, delayChildren: delay }}
      aria-label={text}
    >
      {words.map((word, i) => (
        <span key={i} className="inline-block overflow-visible whitespace-pre" aria-hidden>
          <m.span
            className="inline-block will-change-transform"
            variants={{
              hidden: { y: '55%', opacity: 0, filter: 'blur(14px)' },
              visible: {
                y: '0%',
                opacity: 1,
                filter: 'blur(0px)',
                transition: { duration: 1.1, ease },
              },
            }}
          >
            {word}
            {i < words.length - 1 ? ' ' : ''}
          </m.span>
        </span>
      ))}
    </Tag>
  );
}
