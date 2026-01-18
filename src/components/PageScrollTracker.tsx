import { motion, useScroll, useTransform } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';

interface Section {
  id: string;
  label: string;
  offset: number;
}

const routeSections: Record<string, Section[]> = {
  '/': [
    { id: 'hero', label: 'Home', offset: 0 },
    { id: 'solutions', label: 'Solutions', offset: 0.15 },
    { id: 'work', label: 'Work', offset: 0.35 },
    { id: 'manifesto', label: 'Philosophy', offset: 0.55 },
    { id: 'editorial', label: 'Approach', offset: 0.7 },
    { id: 'journal', label: 'Journal', offset: 0.85 },
    { id: 'contact', label: 'Contact', offset: 0.95 },
  ],
  '/about': [
    { id: 'hero', label: 'About', offset: 0 },
    { id: 'manifesto', label: 'Manifesto', offset: 0.25 },
    { id: 'founders', label: 'Founders', offset: 0.5 },
    { id: 'values', label: 'Values', offset: 0.75 },
  ],
  '/work': [
    { id: 'hero', label: 'Portfolio', offset: 0 },
    { id: 'featured', label: 'Featured', offset: 0.2 },
    { id: 'projects', label: 'Projects', offset: 0.5 },
  ],
  '/solutions': [
    { id: 'hero', label: 'Solutions', offset: 0 },
    { id: 'pillars', label: 'Pillars', offset: 0.25 },
    { id: 'services', label: 'Services', offset: 0.6 },
    { id: 'cta', label: 'Start', offset: 0.9 },
  ],
  '/contact': [
    { id: 'hero', label: 'Contact', offset: 0 },
    { id: 'form', label: 'Form', offset: 0.5 },
  ],
};

export const PageScrollTracker = () => {
  const location = useLocation();
  const { scrollYProgress } = useScroll();
  const [activeSection, setActiveSection] = useState(0);
  
  const basePath = '/' + (location.pathname.split('/')[1] || '');
  const sections = routeSections[basePath] || routeSections['/'];

  // Don't render on homepage - Manifesto has its own sticky indicator
  const isHomePage = location.pathname === '/';

  // Track which section is active
  useEffect(() => {
    const unsubscribe = scrollYProgress.on('change', (progress) => {
      const currentIndex = sections.findIndex((section, i) => {
        const nextSection = sections[i + 1];
        if (!nextSection) return progress >= section.offset;
        return progress >= section.offset && progress < nextSection.offset;
      });
      if (currentIndex !== -1) {
        setActiveSection(currentIndex);
      }
    });

    return () => unsubscribe();
  }, [scrollYProgress, sections]);

  // Progress line height
  const lineHeight = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  // Hide on homepage
  if (isHomePage) return null;

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8, delay: 1 }}
      className="fixed right-6 md:right-10 top-1/2 -translate-y-1/2 z-40 hidden lg:flex flex-col items-end gap-4"
    >
      {/* Progress track */}
      <div className="relative flex flex-col gap-4">
        {/* Background track */}
        <div className="absolute right-[3px] top-0 bottom-0 w-px bg-porcelain/10" />
        
        {/* Progress line */}
        <motion.div
          style={{ height: lineHeight }}
          className="absolute right-[3px] top-0 w-px bg-alchemy-red origin-top"
        />

        {sections.map((section, i) => (
          <motion.button
            key={section.id}
            onClick={() => {
              const targetScroll = section.offset * (document.documentElement.scrollHeight - window.innerHeight);
              window.scrollTo({ top: targetScroll, behavior: 'smooth' });
            }}
            className="relative flex items-center gap-3 group py-1"
            whileHover={{ x: -4 }}
            transition={{ duration: 0.2 }}
          >
            {/* Label */}
            <motion.span
              initial={{ opacity: 0, x: 10 }}
              animate={{ 
                opacity: activeSection === i ? 1 : 0,
                x: activeSection === i ? 0 : 10
              }}
              className="font-mono text-[10px] tracking-wider uppercase text-alchemy-red whitespace-nowrap"
            >
              {section.label}
            </motion.span>

            {/* Hidden label on hover for non-active */}
            {activeSection !== i && (
              <span className="font-mono text-[10px] tracking-wider uppercase text-porcelain/40 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity absolute right-5">
                {section.label}
              </span>
            )}

            {/* Dot */}
            <motion.div
              className={`w-[7px] h-[7px] rounded-full border transition-all duration-300 ${
                activeSection === i
                  ? 'bg-alchemy-red border-alchemy-red scale-110'
                  : 'bg-transparent border-porcelain/30 group-hover:border-porcelain/60'
              }`}
              animate={{
                scale: activeSection === i ? 1.2 : 1,
              }}
              transition={{ duration: 0.2 }}
            />
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
};
