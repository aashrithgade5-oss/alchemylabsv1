import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Section {
  id: string;
  label: string;
}

const sections: Section[] = [
  { id: 'hero', label: 'Home' },
  { id: 'solutions', label: 'Solutions' },
  { id: 'work', label: 'Work' },
  { id: 'manifesto', label: 'Manifesto' },
  { id: 'journal', label: 'Journal' },
  { id: 'contact', label: 'Contact' },
];

export const VisualBreadcrumbs = () => {
  const [activeSection, setActiveSection] = useState('hero');
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show breadcrumbs after scrolling past hero
      setIsVisible(window.scrollY > 300);

      // Find current section
      const sectionElements = sections
        .map((s) => ({
          id: s.id,
          element: document.getElementById(s.id),
        }))
        .filter((s) => s.element);

      for (const section of sectionElements.reverse()) {
        if (section.element) {
          const rect = section.element.getBoundingClientRect();
          if (rect.top <= window.innerHeight / 2) {
            setActiveSection(section.id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const activeIndex = sections.findIndex((s) => s.id === activeSection);
  const progress = ((activeIndex + 1) / sections.length) * 100;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 20 }}
          className="fixed right-6 top-1/2 -translate-y-1/2 z-50 hidden lg:flex flex-col items-end gap-3"
        >
          {/* Progress line */}
          <div className="absolute right-[5px] top-0 bottom-0 w-[2px] bg-porcelain/10 rounded-full overflow-hidden">
            <motion.div
              className="absolute top-0 left-0 right-0 bg-alchemy-red rounded-full"
              style={{ height: `${progress}%` }}
              transition={{ type: 'spring', damping: 30, stiffness: 200 }}
            />
          </div>

          {sections.map((section, i) => {
            const isActive = section.id === activeSection;
            const isPast = i < activeIndex;

            return (
              <motion.button
                key={section.id}
                onClick={() => scrollToSection(section.id)}
                className="group flex items-center gap-3 relative"
                whileHover={{ x: -4 }}
                transition={{ type: 'spring', damping: 20, stiffness: 300 }}
              >
                {/* Label - shows on hover */}
                <span
                  className={`font-mono text-xs uppercase tracking-wider opacity-0 group-hover:opacity-100 transition-opacity duration-200 ${
                    isActive ? 'text-alchemy-red' : 'text-porcelain/50'
                  }`}
                >
                  {section.label}
                </span>

                {/* Dot */}
                <motion.div
                  className={`w-[10px] h-[10px] rounded-full border-2 transition-colors duration-300 ${
                    isActive
                      ? 'bg-alchemy-red border-alchemy-red shadow-[0_0_10px_rgba(225,6,19,0.5)]'
                      : isPast
                      ? 'bg-alchemy-red/50 border-alchemy-red/50'
                      : 'bg-transparent border-porcelain/30'
                  }`}
                  whileHover={{ scale: 1.2 }}
                />
              </motion.button>
            );
          })}
        </motion.div>
      )}
    </AnimatePresence>
  );
};
