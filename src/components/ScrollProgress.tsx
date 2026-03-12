import { memo, useEffect, useState } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';

export const ScrollProgress = memo(() => {
  const {    scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 25,
    restDelta: 0.002,
  });

  const [percentage, setPercentage] = useState(0);

  useEffect(() => {
    return scrollYProgress.on('change', (v) => {
      setPercentage(Math.round(v * 100));
    });
  }, [scrollYProgress]);

  return (
    <>
      {/* Top progress bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 z-[9999] h-[3px] origin-left"
        style={{
          scaleX,
          background: 'linear-gradient(90deg, hsl(356 94% 45%), hsl(356 85% 55%), hsl(356 94% 45%))',
          boxShadow: '0 0 12px hsl(356 94% 45% / 0.6), 0 0 30px hsl(356 94% 45% / 0.3)',
        }}
      />
      {/* Glow trail */}
      <motion.div
        className="fixed top-0 left-0 right-0 z-[9998] h-[6px] origin-left blur-[4px]"
        style={{
          scaleX,
          background: 'linear-gradient(90deg, transparent, hsl(356 94% 45% / 0.5), transparent)',
        }}
      />
    </>
  );
});

ScrollProgress.displayName = 'ScrollProgress';
