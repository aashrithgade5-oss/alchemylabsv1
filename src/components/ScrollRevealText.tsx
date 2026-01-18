import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

interface ScrollRevealTextProps {
  children: string;
  className?: string;
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'span';
  delay?: number;
}

export const ScrollRevealText = ({
  children,
  className = '',
  as: Component = 'p',
  delay = 0,
}: ScrollRevealTextProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 0.9', 'start 0.3'],
  });

  const opacity = useTransform(scrollYProgress, [0, 1], [0.2, 1]);
  const y = useTransform(scrollYProgress, [0, 1], [40, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [0.97, 1]);

  return (
    <motion.div
      ref={ref}
      style={{ opacity, y, scale }}
      transition={{ delay }}
    >
      <Component className={className}>{children}</Component>
    </motion.div>
  );
};

interface WordByWordRevealProps {
  children: string;
  className?: string;
  wordClassName?: string;
}

export const WordByWordReveal = ({
  children,
  className = '',
  wordClassName = '',
}: WordByWordRevealProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 0.85', 'start 0.35'],
  });

  const words = children.split(' ');

  return (
    <div ref={ref} className={`flex flex-wrap gap-x-2 gap-y-1 ${className}`}>
      {words.map((word, i) => {
        const start = i / words.length;
        const end = start + 1 / words.length;

        return (
          <WordReveal
            key={i}
            word={word}
            progress={scrollYProgress}
            start={start}
            end={end}
            className={wordClassName}
          />
        );
      })}
    </div>
  );
};

interface WordRevealProps {
  word: string;
  progress: any;
  start: number;
  end: number;
  className?: string;
}

const WordReveal = ({ word, progress, start, end, className }: WordRevealProps) => {
  const opacity = useTransform(progress, [start, end], [0.15, 1]);
  const y = useTransform(progress, [start, end], [10, 0]);

  return (
    <motion.span style={{ opacity, y }} className={`inline-block ${className}`}>
      {word}
    </motion.span>
  );
};

interface CharacterRevealProps {
  children: string;
  className?: string;
  charClassName?: string;
}

export const CharacterReveal = ({
  children,
  className = '',
  charClassName = '',
}: CharacterRevealProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 0.9', 'start 0.4'],
  });

  const characters = children.split('');

  return (
    <div ref={ref} className={className}>
      {characters.map((char, i) => {
        const start = i / characters.length;
        const end = start + 1 / characters.length;

        return (
          <CharReveal
            key={i}
            char={char}
            progress={scrollYProgress}
            start={start}
            end={end}
            className={charClassName}
          />
        );
      })}
    </div>
  );
};

interface CharRevealProps {
  char: string;
  progress: any;
  start: number;
  end: number;
  className?: string;
}

const CharReveal = ({ char, progress, start, end, className }: CharRevealProps) => {
  const opacity = useTransform(progress, [start, end], [0.1, 1]);
  const y = useTransform(progress, [start, end], [20, 0]);
  const scale = useTransform(progress, [start, end], [0.8, 1]);

  return (
    <motion.span
      style={{ opacity, y, scale }}
      className={`inline-block ${char === ' ' ? 'w-2' : ''} ${className}`}
    >
      {char === ' ' ? '\u00A0' : char}
    </motion.span>
  );
};
