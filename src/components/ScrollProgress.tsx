import { memo } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';

export const ScrollProgress = memo(() => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 25,
    restDelta: 0.002,
  });

  return (
    <motion.div
      className="scroll-indicator"
      style={{ scaleX }}
    />
  );
});

ScrollProgress.displayName = 'ScrollProgress';
