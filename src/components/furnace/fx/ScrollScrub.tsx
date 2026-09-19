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
  className,
}: {
  word: string;
  range: [number, number];
  progress: MotionValue<number>;
  className?: string;
}) {
  // Fully hidden at rest: nothing renders pre-faded-in before its reveal.
  const opacity = useTransform(progress, range, [0, 1]);
  const blurPx = useTransform(progress, range, [12, 0]);
  const filter = useMotionTemplate`blur(${blurPx}px)`;
  return <m.span className={className} style={{ opacity, filter }}>{word}</m.span>;
}

export function ScrollScrub({
  text,
  className = '',
  as: Tag = 'h2',
  wordClassName,
}: {
  /** Pass an array for clause-per-line: each item renders as its own line
      (the clause-per-line rule), with the word scrub running across all. */
  text: string | string[];
  className?: string;
  as?: ElementType;
  /** Extra class per word span (e.g. glass-type); reduced-motion branch
      renders plain text, so keep the fill color on className too. */
  wordClassName?: string;
}) {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  // Tight scrub band: reveal completes by mid-viewport so it reads responsive,
  // not lagging behind the reader's eye.
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 0.9', 'start 0.5'],
  });

  const lines = Array.isArray(text) ? text : [text];
  const total = lines.reduce((n, line) => n + line.split(' ').length, 0);

  if (reduced) {
    return (
      <Tag className={className}>
        {lines.map((line) => (
          <span key={line} className="block">
            {line}
          </span>
        ))}
      </Tag>
    );
  }

  // Root classes are unchanged for string callers; array lines each render as
  // a full-width row (clause-per-line) inheriting the root's justification.
  let offset = 0;
  return (
    <Tag ref={ref} className={`flex flex-wrap gap-x-[0.3em] ${className}`}>
      {lines.map((line) => {
        const words = line.split(' ');
        const start = offset;
        offset += words.length;
        const wordSpans = words.map((word, i) => {
          const n = start + i;
          return (
            <Word
              key={`${word}-${n}`}
              word={word}
              range={[n / total, Math.min(n / total + 0.3, 1)]}
              progress={scrollYProgress}
              className={wordClassName}
            />
          );
        });
        if (!Array.isArray(text)) return wordSpans;
        return (
          <span
            key={line}
            style={{ justifyContent: 'inherit' }}
            className="flex w-full flex-wrap gap-x-[0.3em]"
          >
            {wordSpans}
          </span>
        );
      })}
    </Tag>
  );
}
