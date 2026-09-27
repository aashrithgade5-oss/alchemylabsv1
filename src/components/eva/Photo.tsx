'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';

type Img = { src: string; alt: string };

// Art-directed still: a clip-path wipe on first entry (hidden at rest), optional slow
// parallax drift inside the frame, and a hover lean-in. No filter animation anywhere, so it
// is safe next to bg-clip:text on WebKit.
export function Photo({
  image,
  ratio,
  sizes,
  className = '',
  parallax = false,
  caption,
  priority = false,
}: {
  image: Img;
  ratio: string;
  sizes: string;
  className?: string;
  parallax?: boolean;
  caption?: string;
  priority?: boolean;
}) {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], ['-6%', '6%']);
  const drift = parallax && !reduce;

  return (
    <figure ref={ref} className={className}>
      <motion.div
        className={`group relative overflow-hidden rounded-2xl border border-bone/10 bg-carbon ${ratio}`}
        initial={reduce ? false : { clipPath: 'inset(12% 8% 12% 8% round 16px)', opacity: 0 }}
        whileInView={{ clipPath: 'inset(0% 0% 0% 0% round 16px)', opacity: 1 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
      >
        <motion.div className={`absolute ${drift ? 'inset-[-7%_0]' : 'inset-0'}`} style={drift ? { y } : undefined}>
          <Image
            src={image.src}
            alt={image.alt}
            fill
            sizes={sizes}
            priority={priority}
            className="object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.03]"
          />
        </motion.div>
      </motion.div>
      {caption && (
        <figcaption className="mt-3 font-mono text-[10px] uppercase tracking-[0.2em] text-bone/45">{caption}</figcaption>
      )}
    </figure>
  );
}
