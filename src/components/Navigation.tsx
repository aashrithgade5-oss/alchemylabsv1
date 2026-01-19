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

      {/* Mobile Menu Overlay - Full Screen with Centered Content */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-40 md:hidden"
          >
            {/* Background with liquid glass effect */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-alchemy-black/98 backdrop-blur-3xl"
            >
              {/* Decorative gradients */}
              <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[400px] h-[400px] bg-gradient-radial from-alchemy-red/10 to-transparent rounded-full blur-[100px]" />
              <div className="absolute bottom-1/4 left-1/2 -translate-x-1/2 w-[300px] h-[300px] bg-gradient-radial from-deep-crimson/8 to-transparent rounded-full blur-[80px]" />
            </motion.div>
            
            {/* Navigation Content - Perfectly Centered */}
            <motion.nav
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="relative h-full flex flex-col items-center justify-center"
            >
              {/* Close button at top */}
              <motion.button
                initial={{ opacity: 0, rotate: -90 }}
                animate={{ opacity: 1, rotate: 0 }}
                exit={{ opacity: 0, rotate: 90 }}
                transition={{ duration: 0.3 }}
                onClick={() => setIsMobileMenuOpen(false)}
                className="absolute top-6 right-6 p-3 text-porcelain/60 hover:text-porcelain transition-colors"
                aria-label="Close menu"
              >
                <X size={28} />
              </motion.button>

              {/* Nav Items - Centered Stack */}
              <ul className="flex flex-col items-center gap-6">
                {navItems.map((item, i) => (
                  <motion.li
                    key={item.label}
                    initial={{ opacity: 0, y: 30, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ 
                      delay: i * 0.08, 
                      duration: 0.5,
                      ease: [0.22, 1, 0.36, 1]
                    }}
                  >
                    <Link
                      to={item.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={`block font-display text-4xl sm:text-5xl italic transition-all duration-300 no-glow ${
                        isActive(item.href) 
                          ? 'text-alchemy-red' 
                          : 'text-porcelain/80 hover:text-alchemy-red'
                      }`}
                    >
                      {item.label}
                      {isActive(item.href) && (
                        <motion.div 
                          layoutId="mobile-nav-indicator"
                          className="h-[2px] bg-alchemy-red mt-1 mx-auto"
                          style={{ width: '60%' }}
                        />
                      )}
                    </Link>
                  </motion.li>
                ))}
              </ul>

              {/* CTA Button */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ delay: 0.5, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="mt-12"
              >
                <Link
                  to="/contact"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="glass-cta-primary px-8 py-4 text-lg no-glow"
                >
                  Contact Us
                </Link>
              </motion.div>

              {/* Footer info */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ delay: 0.6, duration: 0.4 }}
                className="absolute bottom-8 text-porcelain/30 font-mono text-xs tracking-widest"
              >
                ALCHEMY LABS
              </motion.p>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
