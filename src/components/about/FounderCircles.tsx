import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { memo, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { getIsMobile, prefersReducedMotion } from '@/lib/utils';

const founders = [
  {
    name: 'Aashrith',
    fullName: 'Aashrith Gade',
    title: 'Founder · CEO · Director',
    specialty: 'Brand Architecture · Creative Direction · AI-Native Strategy',
    slug: '/aashrith',
    theme: 'dark' as const,
  },
  {
    name: 'Eva',
    fullName: 'Eva Doshi',
    title: 'Co-Founder · Client Relations · Outreach',
    specialty: 'Luxury Brand Strategy · Creative Direction · Growth & Partnerships',
    slug: '/eva',
    theme: 'light' as const,
  },
];

interface FounderCircleProps {
  founder: typeof founders[0];
  index: number;
}

const FloatingDots = memo(({ count, theme, isHovered }: { count: number; theme: 'dark' | 'light'; isHovered: boolean }) => {
  const reducedMotion = prefersReducedMotion();
  if (reducedMotion) return null;

  return (
    <>
      {Array.from({ length: count }).map((_, i) => {
        const angle = (360 / count) * i;
        const radius = isHovered ? 52 : 50;
        const x = Math.cos((angle * Math.PI) / 180) * radius;
        const y = Math.sin((angle * Math.PI) / 180) * radius;

        return (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              width: 4,
              height: 4,
              left: '50%',
              top: '50%',
              background: theme === 'dark'
                ? 'rgba(255,255,255,0.3)'
                : 'rgba(220,38,38,0.4)',
            }}
            animate={{
              x: x + '%',
              y: y + '%',
              opacity: isHovered ? [0.4, 0.8, 0.4] : [0.15, 0.3, 0.15],
              scale: isHovered ? [1, 1.5, 1] : 1,
            }}
            transition={{
              duration: 3 + i * 0.3,
              repeat: Infinity,
              delay: i * 0.2,
              ease: 'easeInOut',
            }}
          />
        );
      })}
    </>
  );
});
FloatingDots.displayName = 'FloatingDots';

const FounderCircle = memo(({ founder, index }: FounderCircleProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const isMobile = getIsMobile();
  const isDark = founder.theme === 'dark';

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 150 };
  const sx = useSpring(mouseX, springConfig);
  const sy = useSpring(mouseY, springConfig);

  const rotateX = useTransform(sy, [-150, 150], [8, -8]);
  const rotateY = useTransform(sx, [-150, 150], [-8, 8]);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (isMobile) return;
      const rect = e.currentTarget.getBoundingClientRect();
      mouseX.set(e.clientX - rect.left - rect.width / 2);
      mouseY.set(e.clientY - rect.top - rect.height / 2);
    },
    [isMobile, mouseX, mouseY]
  );

  const handleMouseLeave = useCallback(() => {
    mouseX.set(0);
    mouseY.set(0);
    setIsHovered(false);
  }, [mouseX, mouseY]);

  return (
    <motion.div
      className="relative flex items-center justify-center"
      style={!isMobile ? { perspective: 800 } : undefined}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: index * 0.2, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* Floating dots orbit */}
      <FloatingDots count={isMobile ? 4 : 8} theme={founder.theme} isHovered={isHovered} />

      {/* Rotating border ring */}
      <motion.div
        className="absolute inset-0 rounded-full"
        animate={{ rotate: isDark ? 360 : -360 }}
        transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
        style={{
          background: `conic-gradient(from 0deg, transparent 0%, ${
            isDark ? 'rgba(255,255,255,0.12)' : 'rgba(220,38,38,0.2)'
          } 25%, transparent 50%, ${
            isDark ? 'rgba(220,38,38,0.1)' : 'rgba(220,38,38,0.15)'
          } 75%, transparent 100%)`,
          mask: 'radial-gradient(circle, transparent 47%, black 48%, black 50%, transparent 51%)',
          WebkitMask: 'radial-gradient(circle, transparent 47%, black 48%, black 50%, transparent 51%)',
        }}
      />

      {/* Main circle */}
      <motion.div
        className="relative w-64 h-64 sm:w-72 sm:h-72 md:w-80 md:h-80 lg:w-[22rem] lg:h-[22rem] rounded-full flex items-center justify-center cursor-pointer group"
        style={
          !isMobile
            ? { rotateX, rotateY, transformStyle: 'preserve-3d' }
            : undefined
        }
        whileHover={!isMobile ? { scale: 1.04 } : undefined}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* Glass background */}
        <div
          className="absolute inset-0 rounded-full transition-all duration-500"
          style={{
            background: isDark
              ? 'linear-gradient(135deg, rgba(255,255,255,0.07) 0%, rgba(255,255,255,0.02) 50%, rgba(220,38,38,0.05) 100%)'
              : 'linear-gradient(135deg, rgba(220,38,38,0.12) 0%, rgba(185,28,28,0.06) 50%, rgba(255,255,255,0.03) 100%)',
            backdropFilter: 'blur(40px) saturate(180%)',
            border: isDark
              ? '1px solid rgba(255,255,255,0.12)'
              : '1px solid rgba(220,38,38,0.25)',
            boxShadow: isDark
              ? 'inset 0 1px 0 rgba(255,255,255,0.15), 0 8px 40px rgba(0,0,0,0.3)'
              : 'inset 0 1px 0 rgba(220,38,38,0.1), 0 8px 40px rgba(220,38,38,0.15), 0 0 80px rgba(220,38,38,0.08)',
          }}
        />

        {/* Hover glow */}
        <div
          className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{
            background: isDark
              ? 'radial-gradient(ellipse at 50% 30%, rgba(255,255,255,0.1) 0%, transparent 60%)'
              : 'radial-gradient(ellipse at 50% 30%, rgba(220,38,38,0.15) 0%, transparent 60%)',
          }}
        />

        {/* Content */}
        <div className="relative z-10 text-center px-6 sm:px-8">
          <h3 className="font-display text-xl sm:text-2xl md:text-3xl italic text-porcelain mb-1.5">
            {founder.fullName}
          </h3>

          <p className="font-mono text-[10px] sm:text-xs text-alchemy-red/80 tracking-[0.15em] uppercase mb-3">
            {founder.title}
          </p>

          <p className="font-body text-xs sm:text-sm text-porcelain/45 mb-5 leading-relaxed line-clamp-2">
            {founder.specialty}
          </p>

          {/* CTA Button — glass pill */}
          <Link
            to={founder.slug}
            className="inline-flex items-center gap-2.5 px-6 py-2.5 rounded-full text-xs sm:text-sm font-body font-medium transition-all duration-300 group/btn no-glow"
            style={{
              background: 'rgba(220,38,38,0.15)',
              border: '1px solid rgba(220,38,38,0.4)',
              boxShadow: '0 0 20px rgba(220,38,38,0.15)',
            }}
          >
            <span className="text-porcelain group-hover/btn:text-alchemy-red transition-colors">
              Discover Portfolio
            </span>
            <ArrowRight className="w-3.5 h-3.5 text-alchemy-red group-hover/btn:translate-x-1 transition-transform" />
          </Link>
        </div>
      </motion.div>
    </motion.div>
  );
});
FounderCircle.displayName = 'FounderCircle';

export const FounderCircles = memo(() => {
  return (
    <div className="flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-6 xl:gap-12">
      {founders.map((founder, i) => (
        <FounderCircle key={founder.slug} founder={founder} index={i} />
      ))}
    </div>
  );
});

FounderCircles.displayName = 'FounderCircles';
