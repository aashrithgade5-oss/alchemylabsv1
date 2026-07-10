'use client';

import { useEffect, useRef, useState } from 'react';
import { useInView, useSpring, useTransform } from 'framer-motion';

interface CounterProps {
  value: number;
  suffix?: string;
  prefix?: string;
  className?: string;
}

// Spring counter, same mechanism as src/components/AnimatedCounter.tsx
// but stripped to the number itself; styling belongs to the caller.
export function Counter({ value, suffix = '', prefix = '', className = '' }: CounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });
  const spring = useSpring(0, { mass: 1, stiffness: 75, damping: 18 });
  const rounded = useTransform(spring, (v) => Math.floor(v));
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (isInView) spring.set(value);
  }, [isInView, value, spring]);

  useEffect(() => rounded.on('change', setDisplay), [rounded]);

  return (
    <span ref={ref} className={className}>
      {prefix}
      {display}
      {suffix}
    </span>
  );
}
