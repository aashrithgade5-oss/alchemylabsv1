import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import alchemyLogo from '@/assets/alchemy-logo.png';

const navItems = [
  { label: 'Home', href: '/' },
  { label: 'Solutions', href: '/solutions' },
  { label: 'About', href: '/about' },
  { label: 'Work', href: '/work' },
  { label: 'Journal', href: '/journal' },
];

export const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isActive = (href: string) => {
    if (href === '/') return location.pathname === '/';
    return location.pathname.startsWith(href.replace('/#', ''));
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="fixed top-0 left-0 right-0 z-50 px-4 md:px-8 py-4"
      >
        {/* Liquid Glass Nav Container */}
        <div 
          className={`max-w-6xl mx-auto transition-all duration-500 ${
            isScrolled ? 'glass-nav-pill py-3 px-6' : 'py-4 px-6'
          }`}
        >
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-3 group flex-shrink-0 no-glow">
              {/* Zoomed and cropped logo container */}
              <motion.div 
                className="w-10 h-10 md:w-12 md:h-12 rounded-full overflow-hidden relative"
                animate={{ scale: isScrolled ? 0.9 : 1 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              >
                <img 
                  src={alchemyLogo} 
                  alt="Alchemy Labs" 
                  className="w-[140%] h-[140%] object-cover absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                />
              </motion.div>
              <motion.div 
                className="hidden sm:flex items-baseline gap-1.5"
                animate={{ opacity: isScrolled ? 0.95 : 1 }}
                transition={{ duration: 0.3 }}
              >
                <span className="font-display text-xl md:text-2xl font-normal text-porcelain tracking-wide italic">
                  Alchemy
                </span>
                <span className="font-body text-[10px] md:text-xs font-bold text-porcelain/70 tracking-[0.35em] uppercase">
                  LABS
                </span>
              </motion.div>
            </Link>

            {/* Desktop Navigation - Center */}
            <ul className="hidden md:flex items-center gap-1 lg:gap-2">
              {navItems.map((item) => (
                <li key={item.label}>
                  <Link
                    to={item.href}
                    className={`relative px-4 py-2 font-body text-sm transition-colors duration-300 no-glow rounded-full ${
                      isActive(item.href) 
                        ? 'text-alchemy-red' 
                        : 'text-porcelain/60 hover:text-porcelain'
                    }`}
                  >
                    {item.label}
                    {isActive(item.href) && (
                      <motion.div
                        layoutId="nav-indicator"
                        className="absolute inset-0 bg-alchemy-red/10 rounded-full border border-alchemy-red/20"
                        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                      />
                    )}
                  </Link>
                </li>
              ))}
            </ul>
            
            {/* CTA Button */}
            <Link
              to="/contact"
              className={`hidden md:flex items-center gap-2 text-sm font-medium px-5 py-2.5 rounded-full transition-all duration-300 no-glow ${
                isScrolled
                  ? 'bg-alchemy-red text-porcelain hover:bg-alchemy-red/90'
                  : 'glass-cta-nav text-porcelain'
              }`}
            >
              Contact
            </Link>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 text-porcelain"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 md:hidden"
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-alchemy-black/98 backdrop-blur-2xl"
            />
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="relative h-full flex flex-col items-center justify-center gap-8 p-8"
            >
              {navItems.map((item, i) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ delay: i * 0.1, duration: 0.4 }}
                >
                  <Link
                    to={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`font-display text-3xl italic transition-colors no-glow ${
                      isActive(item.href) ? 'text-alchemy-red' : 'text-porcelain hover:text-alchemy-red'
                    }`}
                  >
                    {item.label}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ delay: 0.5, duration: 0.4 }}
              >
                <Link
                  to="/contact"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="glass-cta-primary mt-4 no-glow"
                >
                  Contact Us
                </Link>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
