'use client';

import { useRef, type ElementType } from 'react';
import {
  m,
  useMotionTemplate,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from 'framer-motion';

/**
 * The signature move: per-word blur reveal driven directly by scroll.
 * Each word sharpens (opacity 0.15→1, blur 12→0) across its own slice of the
 * element's pass through the viewport — linear, scroll IS the easing.
 */
function Word({
  word,
  range,
  progress,
}: {
  word: string;
  range: [number, number];
  progress: MotionValue<number>;
}) {
  const opacity = useTransform(progress, range, [0.15, 1]);
  const blurPx = useTransform(progress, range, [12, 0]);
  const filter = useMotionTemplate`blur(${blurPx}px)`;
  return <m.span style={{ opacity, filter }}>{word}</m.span>;
}

export function ScrollScrub({
  text,
  className = '',
  as: Tag = 'h2',
}: {
  text: string;
  className?: string;
  as?: ElementType;
}) {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 0.85', 'start 0.35'],
  });

  const words = text.split(' ');

  if (reduced) {
    return <Tag className={className}>{text}</Tag>;
  }

  return (
    <Tag ref={ref} className={`flex flex-wrap justify-center gap-x-[0.3em] ${className}`}>
      {words.map((word, i) => (
        <Word
          key={`${word}-${i}`}
          word={word}
          range={[i / words.length, Math.min(i / words.length + 0.4, 1)]}
          progress={scrollYProgress}
        />
      ))}
    </Tag>
  );
}
