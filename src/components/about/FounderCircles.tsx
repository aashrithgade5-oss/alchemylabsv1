import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { memo, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

import sequentian1 from '@/assets/sequentian-1.png';
import sequentian4 from '@/assets/sequentian-4.png';

const CINEMATIC_EASE = [0.22, 1, 0.36, 1] as const;

const founders = [
  {
    name: 'Aashrith',
    fullName: 'Aashrith Gade',
    title: 'Founder · CEO · Director',
    specialty: 'Brand Architecture · Creative Direction · AI-Native Strategy',
    slug: '/aashrith',
    bg: sequentian1,
    bgOpacity: 0.15,
    gradient: 'linear-gradient(135deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.01) 50%, rgba(220,38,38,0.03) 100%)',
  },
  {
    name: 'Eva',
    fullName: 'Eva Doshi',
    title: 'Co-Founder · Client Relations · Outreach',
    specialty: 'Luxury Brand Strategy · Creative Direction · Growth & Partnerships',
    slug: '/eva',
    bg: sequentian4,
    bgOpacity: 0.12,
    gradient: 'linear-gradient(135deg, rgba(220,38,38,0.06) 0%, rgba(185,28,28,0.03) 50%, rgba(255,255,255,0.02) 100%)',
  },
];

const FounderPanel = memo(({ founder, index }: { founder: typeof founders[0]; index: number }) => {
  const [isHovered, setIsHovered] = useState(false);
  const isMobile = useIsMobile();

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springConfig = { damping: 25, stiffness: 150 };
  const sx = useSpring(mouseX, springConfig);
  const sy = useSpring(mouseY, springConfig);
  const rotateX = useTransform(sy, [-150, 150], [4, -4]);
  const rotateY = useTransform(sx, [-150, 150], [-4, 4]);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (isMobile) return;
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left - rect.width / 2);
    mouseY.set(e.clientY - rect.top - rect.height / 2);
  }, [isMobile, mouseX, mouseY]);

  const handleMouseLeave = useCallback(() => {
    mouseX.set(0);
    mouseY.set(0);
    setIsHovered(false);
  }, [mouseX, mouseY]);

  return (
    <motion.div
      className="relative flex-1 min-w-0"
      style={!isMobile ? { perspective: 1000 } : undefined}
      initial={{ opacity: 0, x: index === 0 ? -60 : 60 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.8, delay: index * 0.2, ease: CINEMATIC_EASE }}
    >
      <motion.div
        className="relative overflow-hidden rounded-2xl lg:rounded-3xl cursor-pointer group"
        style={{
          aspectRatio: isMobile ? 'auto' : '3/4',
          ...((!isMobile) ? { rotateX, rotateY, transformStyle: 'preserve-3d' as const } : {}),
        }}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={handleMouseLeave}
        whileHover={!isMobile ? { y: -6 } : undefined}
        transition={{ duration: 0.3 }}
      >
        {/* Sequentian background per panel */}
        <img
          src={founder.bg}
          alt=""
          loading="lazy"
          decoding="async"
          className="absolute inset-0 w-full h-full object-cover pointer-events-none"
          style={{ opacity: founder.bgOpacity }}
        />

        {/* Glass background */}
        <div
          className="absolute inset-0 transition-all duration-500"
          style={{
            background: founder.gradient,
            backdropFilter: 'blur(24px) saturate(180%)',
            border: isHovered
              ? '1px solid rgba(220,38,38,0.4)'
              : '1px solid rgba(255,255,255,0.08)',
          }}
        />

        {/* Inner red glow on hover */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse at 50% 40%, rgba(220,38,38,0.1) 0%, transparent 70%)',
          }}
        />

        {/* Content */}
        <div className="relative z-10 flex flex-col items-center justify-center text-center h-full px-6 sm:px-10 py-12 sm:py-16 lg:py-0">
          {/* Large uppercase name */}
          <h3 className="font-body text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black uppercase tracking-[0.1em] text-porcelain mb-3">
            {founder.fullName}
          </h3>

          {/* Title */}
          <p className="font-mono text-[10px] sm:text-xs text-alchemy-red/80 tracking-[0.15em] uppercase mb-3">
            {founder.title}
          </p>

          {/* Specialty */}
          <p className="font-body text-xs sm:text-sm text-porcelain/40 mb-8 max-w-xs leading-relaxed">
            {founder.specialty}
          </p>

          {/* Discover Portfolio CTA */}
          <Link
            to={founder.slug}
            className="inline-flex items-center gap-2.5 px-7 py-3 rounded-full text-xs sm:text-sm font-body font-medium transition-all duration-300 group/btn no-glow"
            style={{
              background: 'rgba(220,38,38,0.15)',
              border: '1px solid rgba(220,38,38,0.4)',
              boxShadow: isHovered ? '0 0 30px rgba(220,38,38,0.2)' : '0 0 20px rgba(220,38,38,0.1)',
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
FounderPanel.displayName = 'FounderPanel';

export const FounderCircles = memo(() => {
  const isMobile = useIsMobile();

  return (
    <section className="relative py-16 sm:py-24 lg:py-32 overflow-hidden">
      {/* Dark background */}
      <div className="absolute inset-0 bg-background" />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 70% 50% at 50% 50%, rgba(220,38,38,0.03) 0%, transparent 70%)',
        }}
      />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-0 items-stretch">
          {/* Left panel */}
          <FounderPanel founder={founders[0]} index={0} />

          {/* Center divider (desktop only) */}
          {!isMobile && (
            <div className="relative flex items-center justify-center w-px mx-4">
              <motion.div
                className="w-px bg-gradient-to-b from-transparent via-alchemy-red/60 to-transparent"
                initial={{ height: '0%' }}
                whileInView={{ height: '100%' }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 1, delay: 0.6, ease: CINEMATIC_EASE }}
              />
            </div>
          )}

          {/* Right panel */}
          <FounderPanel founder={founders[1]} index={1} />
        </div>
      </div>
    </section>
  );
});

FounderCircles.displayName = 'FounderCircles';
