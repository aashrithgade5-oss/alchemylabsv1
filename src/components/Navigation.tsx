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

  // Scroll behavior
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsScrolled(currentScrollY > 50);
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

  // Body scroll lock for mobile menu
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  const isActive = useCallback((href: string) => {
    if (href === '/') return location.pathname === '/';
    return location.pathname.startsWith(href);
  }, [location.pathname]);

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
        className="fixed top-0 left-0 right-0 z-50 px-4 md:px-8 py-4"
      >
        <div className={`max-w-6xl mx-auto transition-all duration-500 ${
          isScrolled ? 'glass-nav-pill py-3 px-6' : 'py-4 px-6'
        }`}>
          <div className="flex items-center justify-between">
            {/* Logo - Playfair Display Italic */}
            <Link 
              to="/" 
              className="flex items-center gap-3 group flex-shrink-0 no-glow"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <div className="w-10 h-10 md:w-12 md:h-12 rounded-full overflow-hidden relative">
                <img 
                  src={alchemyLogo} 
                  alt="Alchemy Labs" 
                  className="w-[140%] h-[140%] object-cover absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                />
              </div>
              <div className="hidden sm:flex items-baseline gap-1.5">
                <span className="font-display text-xl md:text-2xl italic text-porcelain">
                  Alchemy
                </span>
                <span className="font-body text-[10px] md:text-xs font-medium text-porcelain/60 tracking-[0.2em] uppercase">
                  LABS
                </span>
              </div>
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

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 text-porcelain z-50"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 md:hidden"
          style={{ 
            zIndex: 9999,
            backgroundColor: '#0A0A0B',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            paddingTop: '80px'
          }}
        >
          {/* Close Button */}
          <button
            onClick={() => setIsMobileMenuOpen(false)}
            style={{
              position: 'absolute',
              top: '20px',
              right: '20px',
              padding: '10px',
              color: 'white',
              zIndex: 10000
            }}
            aria-label="Close menu"
          >
            <X size={28} />
          </button>

          {/* Menu Links */}
          <a 
            href="/" 
            onClick={() => setIsMobileMenuOpen(false)}
            style={{ 
              color: 'white', 
              fontSize: '28px', 
              fontStyle: 'italic',
              textDecoration: 'underline',
              marginBottom: '24px',
              fontFamily: 'Playfair Display, serif'
            }}
          >
            Home
          </a>
          <a 
            href="/solutions" 
            onClick={() => setIsMobileMenuOpen(false)}
            style={{ 
              color: 'white', 
              fontSize: '28px', 
              fontStyle: 'italic',
              textDecoration: 'underline',
              marginBottom: '24px',
              fontFamily: 'Playfair Display, serif'
            }}
          >
            Solutions
          </a>
          <a 
            href="/about" 
            onClick={() => setIsMobileMenuOpen(false)}
            style={{ 
              color: 'white', 
              fontSize: '28px', 
              fontStyle: 'italic',
              textDecoration: 'underline',
              marginBottom: '24px',
              fontFamily: 'Playfair Display, serif'
            }}
          >
            About
          </a>
          <a 
            href="/work" 
            onClick={() => setIsMobileMenuOpen(false)}
            style={{ 
              color: 'white', 
              fontSize: '28px', 
              fontStyle: 'italic',
              textDecoration: 'underline',
              marginBottom: '24px',
              fontFamily: 'Playfair Display, serif'
            }}
          >
            Work
          </a>
          <a 
            href="/journal" 
            onClick={() => setIsMobileMenuOpen(false)}
            style={{ 
              color: 'white', 
              fontSize: '28px', 
              fontStyle: 'italic',
              textDecoration: 'underline',
              marginBottom: '24px',
              fontFamily: 'Playfair Display, serif'
            }}
          >
            Journal
          </a>
          <a 
            href="/contact" 
            onClick={() => setIsMobileMenuOpen(false)}
            style={{ 
              color: 'white', 
              fontSize: '28px', 
              fontStyle: 'italic',
              textDecoration: 'underline',
              marginBottom: '40px',
              fontFamily: 'Playfair Display, serif'
            }}
          >
            Contact
          </a>

          {/* CTA Button */}
          <a
            href="/book-sprint"
            onClick={() => setIsMobileMenuOpen(false)}
            style={{
              backgroundColor: '#C8102E',
              color: 'white',
              padding: '14px 32px',
              borderRadius: '9999px',
              fontWeight: '500',
              fontSize: '16px'
            }}
          >
            Book a Sprint
          </a>
        </div>
      )}
    </>
  );
};
