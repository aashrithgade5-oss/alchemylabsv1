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
    <>
      <motion.div
        className="fixed top-0 left-0 right-0 z-[9999] h-[2px] origin-left"
        style={{
          scaleX,
          background: 'linear-gradient(90deg, hsl(356 94% 45%), hsl(356 85% 55%), hsl(356 94% 45%))',
          boxShadow: '0 0 10px hsl(356 94% 45% / 0.5), 0 0 24px hsl(356 94% 45% / 0.2)',
        }}
      />
      <motion.div
        className="fixed top-0 left-0 right-0 z-[9998] h-[4px] origin-left blur-[3px]"
        style={{
          scaleX,
          background: 'linear-gradient(90deg, transparent, hsl(356 94% 45% / 0.4), transparent)',
        }}
      />
    </>
  );
});

ScrollProgress.displayName = 'ScrollProgress';