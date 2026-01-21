import { useState, useEffect, useCallback } from 'react';
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
  { label: 'Contact', href: '/contact' },
];

export const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const location = useLocation();

  // Close menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  // Smart scroll behavior - hide on scroll down, show on scroll up
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      setIsScrolled(currentScrollY > 50);
      
      // Hide when scrolling down past 200px, show when scrolling up
      if (currentScrollY > lastScrollY && currentScrollY > 200) {
        setIsHidden(true);
      } else {
        setIsHidden(false);
      }
      
      setLastScrollY(currentScrollY);
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      const scrollY = window.scrollY;
      document.body.style.overflow = 'hidden';
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.left = '0';
      document.body.style.right = '0';
    } else {
      const scrollY = document.body.style.top;
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.left = '';
      document.body.style.right = '';
      if (scrollY) {
        window.scrollTo(0, parseInt(scrollY || '0') * -1);
      }
    }
    return () => {
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.left = '';
      document.body.style.right = '';
    };
  }, [isMobileMenuOpen]);

  const isActive = useCallback((href: string) => {
    if (href === '/') return location.pathname === '/';
    return location.pathname.startsWith(href.replace('/#', ''));
  }, [location.pathname]);

  const toggleMenu = useCallback(() => {
    setIsMobileMenuOpen(prev => !prev);
  }, []);

  const closeMenu = useCallback(() => {
    setIsMobileMenuOpen(false);
  }, []);

  return (
    <>
      {/* Main Navigation Bar */}
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ 
          y: isHidden && !isMobileMenuOpen ? -100 : 0, 
          opacity: isHidden && !isMobileMenuOpen ? 0 : 1 
        }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className="fixed top-0 left-0 right-0 z-[100] px-4 md:px-8 py-4"
      >
        <motion.div 
          className={`max-w-6xl mx-auto transition-all duration-500 ${
            isScrolled ? 'glass-nav-pill py-3 px-6' : 'py-4 px-6'
          }`}
        >
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-3 group flex-shrink-0 no-glow" onClick={closeMenu}>
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
                <span className="font-alchemy text-xl md:text-2xl text-porcelain tracking-wide">
                  Alchemy
                </span>
                <span className="font-body text-[10px] md:text-xs font-bold text-porcelain/70 tracking-[0.35em] uppercase">
                  LABS
                </span>
              </motion.div>
            </Link>

            {/* Desktop Navigation */}
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
            
            {/* Desktop CTA */}
            <Link
              to="/book-sprint"
              className={`hidden md:flex items-center gap-2 text-sm font-medium px-5 py-2.5 rounded-full transition-all duration-300 no-glow ${
                isScrolled
                  ? 'bg-alchemy-red text-porcelain hover:bg-alchemy-red/90'
                  : 'glass-cta-nav text-porcelain'
              }`}
            >
              Book a Sprint
            </Link>

            {/* Mobile Menu Toggle Button - Higher z-index */}
            <button
              onClick={toggleMenu}
              className="md:hidden relative z-[110] w-12 h-12 flex items-center justify-center text-porcelain hover:text-alchemy-red transition-colors rounded-full bg-alchemy-black/50 backdrop-blur-sm border border-porcelain/10"
              aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={isMobileMenuOpen}
            >
              <AnimatePresence mode="wait" initial={false}>
                {isMobileMenuOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <X size={24} />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Menu size={24} />
                  </motion.div>
                )}
              </AnimatePresence>
            </button>
          </div>
        </motion.div>
      </motion.nav>

      {/* Mobile Menu Overlay - Full screen with proper z-index */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[105] md:hidden overflow-hidden"
            role="dialog"
            aria-modal="true"
            aria-label="Navigation menu"
          >
            {/* Solid Dark Background */}
            <motion.div 
              className="absolute inset-0"
              style={{ backgroundColor: '#0A0A0B' }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />
            
            {/* Subtle Grid Pattern */}
            <div 
              className="absolute inset-0 opacity-[0.03]" 
              style={{
                backgroundImage: `
                  linear-gradient(rgba(225, 6, 19, 0.5) 1px, transparent 1px),
                  linear-gradient(90deg, rgba(225, 6, 19, 0.5) 1px, transparent 1px)
                `,
                backgroundSize: '40px 40px',
              }} 
            />
            
            {/* Red Glow */}
            <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[300px] h-[300px] rounded-full bg-alchemy-red/20 blur-[100px] pointer-events-none" />
            
            {/* Menu Content - Properly positioned */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
              className="relative z-10 h-full flex flex-col items-center justify-center px-8"
            >
              {/* Navigation Links */}
              <nav className="flex flex-col items-center gap-5">
                {navItems.map((item, index) => (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, y: 25 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ 
                      delay: 0.15 + index * 0.06,
                      duration: 0.4,
                      ease: [0.22, 1, 0.36, 1]
                    }}
                  >
                    <Link
                      to={item.href}
                      onClick={closeMenu}
                      className={`relative block text-center font-display text-3xl sm:text-4xl italic tracking-tight
                        transition-all duration-300 py-2 px-4 no-glow
                        ${isActive(item.href) 
                          ? 'text-alchemy-red' 
                          : 'text-porcelain hover:text-alchemy-red/80'
                        }`}
                    >
                      <span className="absolute -left-10 top-1/2 -translate-y-1/2 font-mono text-[10px] text-porcelain/30">
                        0{index + 1}
                      </span>
                      {item.label}
                      {isActive(item.href) && (
                        <span className="absolute -left-4 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-alchemy-red" />
                      )}
                    </Link>
                  </motion.div>
                ))}
              </nav>

              {/* CTA Button */}
              <motion.div
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ delay: 0.5, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="mt-10"
              >
                <Link
                  to="/book-sprint"
                  onClick={closeMenu}
                  className="inline-flex items-center justify-center gap-2 px-8 py-3.5 
                    bg-alchemy-red text-porcelain font-body font-medium text-base
                    rounded-full transition-all duration-300
                    hover:bg-alchemy-red/90 active:scale-95 no-glow
                    shadow-lg shadow-alchemy-red/30"
                >
                  Book a Sprint
                </Link>
              </motion.div>

              {/* Footer Branding */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ delay: 0.6, duration: 0.3 }}
                className="absolute bottom-8 left-0 right-0 text-center font-mono text-[10px] text-porcelain/25 tracking-[0.2em] uppercase"
              >
                © 2025 Alchemy Labs
              </motion.p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
