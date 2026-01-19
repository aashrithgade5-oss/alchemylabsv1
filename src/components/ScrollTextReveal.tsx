import { useRef, ReactNode } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

interface ScrollTextRevealProps {
  children: string;
  className?: string;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'span';
}

// Word-by-word reveal based on scroll position
export const ScrollTextReveal = ({ 
  children, 
  className = '',
  as: Component = 'p'
}: ScrollTextRevealProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 0.9", "start 0.25"]
  });

  const words = children.split(' ');

  return (
    <div ref={containerRef} className={className}>
      <Component className="flex flex-wrap">
        {words.map((word, i) => {
          const start = i / words.length;
          const end = start + (1 / words.length);
          
          return (
            <Word key={i} progress={scrollYProgress} range={[start, end]}>
              {word}
            </Word>
          );
        })}
      </Component>
    </div>
  );
};

const Word = ({ 
  children, 
  progress, 
  range 
}: { 
  children: string; 
  progress: any; 
  range: [number, number];
}) => {
  const opacity = useTransform(progress, range, [0.15, 1]);
  const blur = useTransform(progress, range, [4, 0]);
  const y = useTransform(progress, range, [8, 0]);
  
  return (
    <span className="relative mr-[0.25em] mt-[0.1em]">
      <motion.span
        style={{ opacity, y, filter: blur.get() > 0 ? `blur(${blur.get()}px)` : 'none' }}
        className="inline-block"
      >
        {children}
      </motion.span>
    </span>
  );
};

// Character-by-character reveal
interface CharacterRevealProps {
  children: string;
  className?: string;
  staggerDelay?: number;
}

export const ScrollCharacterReveal = ({ 
  children, 
  className = '',
  staggerDelay = 0.02
}: CharacterRevealProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 0.9", "start 0.3"]
  });

  const characters = children.split('');

  return (
    <div ref={containerRef} className={className}>
      <span className="inline-block">
        {characters.map((char, i) => {
          const start = i / characters.length;
          const end = start + (1 / characters.length);
          
          return (
            <Character key={i} progress={scrollYProgress} range={[start, end]}>
              {char === ' ' ? '\u00A0' : char}
            </Character>
          );
        })}
      </span>
    </div>
  );
};

const Character = ({ 
  children, 
  progress, 
  range 
}: { 
  children: string; 
  progress: any; 
  range: [number, number];
}) => {
  const opacity = useTransform(progress, range, [0, 1]);
  const y = useTransform(progress, range, [20, 0]);
  const scale = useTransform(progress, range, [0.8, 1]);
  
  return (
    <motion.span
      style={{ opacity, y, scale }}
      className="inline-block"
    >
      {children}
    </motion.span>
  );
};

// Paragraph reveal with blur effect
interface ParagraphRevealProps {
  children: ReactNode;
  className?: string;
}

export const ScrollParagraphReveal = ({ 
  children, 
  className = '' 
}: ParagraphRevealProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.95", "start 0.35"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 0.5, 1]);
  const y = useTransform(scrollYProgress, [0, 1], [60, 0]);
  const blur = useTransform(scrollYProgress, [0, 0.5, 1], [8, 2, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [0.96, 1]);

  return (
    <motion.div 
      ref={ref}
      style={{ 
        opacity, 
        y, 
        scale,
        filter: blur.get() > 0 ? `blur(${blur.get()}px)` : 'none'
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

// Line-by-line reveal for longer text
interface LineRevealProps {
  lines: string[];
  className?: string;
  lineClassName?: string;
}

export const ScrollLineReveal = ({ 
  lines, 
  className = '',
  lineClassName = ''
}: LineRevealProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 0.9", "start 0.2"]
  });

  return (
    <div ref={containerRef} className={className}>
      {lines.map((line, i) => {
        const start = i / lines.length;
        const end = start + (1 / lines.length);
        
        return (
          <Line 
            key={i} 
            progress={scrollYProgress} 
            range={[start, end]}
            className={lineClassName}
          >
            {line}
          </Line>
        );
      })}
    </div>
  );
};

const Line = ({ 
  children, 
  progress, 
  range,
  className
}: { 
  children: string; 
  progress: any; 
  range: [number, number];
  className?: string;
}) => {
  const opacity = useTransform(progress, range, [0.1, 1]);
  const x = useTransform(progress, range, [-30, 0]);
  const blur = useTransform(progress, range, [5, 0]);
  
  return (
    <motion.div
      style={{ 
        opacity, 
        x,
        filter: blur.get() > 0 ? `blur(${blur.get()}px)` : 'none'
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

// Mask reveal effect (text revealed as if wiping away a mask)
interface MaskRevealProps {
  children: ReactNode;
  className?: string;
}

export const ScrollMaskReveal = ({ children, className = '' }: MaskRevealProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.85", "start 0.3"]
  });

  const clipPath = useTransform(
    scrollYProgress,
    [0, 1],
    ["inset(0 100% 0 0)", "inset(0 0% 0 0)"]
  );

  return (
    <div ref={ref} className={`relative ${className}`}>
      {/* Background text (dimmed) */}
      <div className="opacity-10">
        {children}
      </div>
      
      {/* Revealed text */}
      <motion.div 
        style={{ clipPath }}
        className="absolute inset-0"
      >
        {children}
      </motion.div>
    </div>
  );
};
