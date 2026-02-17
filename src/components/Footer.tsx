import { forwardRef } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import alchemyLogo from '@/assets/alchemy-logo.png';
import footerBg from '@/assets/footer-bg.png';

const footerLinks = {
  company: [
    { label: 'About', href: '/about' },
    { label: 'Work', href: '/work' },
    { label: 'Journal', href: '/journal' },
    { label: 'Contact', href: '/contact' },
  ],
  services: [
    { label: 'AI Solutions', href: '/solutions/ai' },
    { label: 'Branding Solutions', href: '/solutions/branding' },
    { label: 'Consultation', href: '/solutions/consultation' },
    { label: 'All Solutions', href: '/solutions' },
  ],
  connect: [
    { label: 'Instagram', href: 'https://www.instagram.com/brandalchemy._', external: true },
    { label: 'LinkedIn', href: 'https://www.linkedin.com/company/brandalchemylabs/', external: true },
    { label: 'YouTube', href: 'https://www.youtube.com/@brandalchemy-in', external: true },
  ],
};

// Social links for reuse across the site
export const socialLinks = {
  instagram: 'https://www.instagram.com/brandalchemy._',
  linkedin: 'https://www.linkedin.com/company/brandalchemylabs/',
  youtube: 'https://www.youtube.com/@brandalchemy-in',
  founderEmail: 'alchemylabs.work@gmail.com',
  founders: {
    aashrith: 'https://www.linkedin.com/in/aashrithgade',
    eva: 'https://www.linkedin.com/in/eva-doshi-0b07b531b/',
  },
};

export const Footer = forwardRef<HTMLElement>((_, ref) => {
  const [email, setEmail] = useState('');

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Newsletter signup:', email);
    setEmail('');
  };

  return (
    <footer ref={ref} className="relative overflow-hidden bg-alchemy-black">
      {/* Dynamic Aesthetic Background */}
      <div className="absolute inset-0 z-0">
        {/* Main background image with enhanced visibility */}
        <img 
          src={footerBg} 
          alt="" 
          className="absolute inset-0 w-full h-full object-cover opacity-60 scale-110"
          style={{ filter: 'blur(8px) saturate(1.2)' }}
        />
        {/* Gradient overlay from bottom for depth */}
        <div className="absolute inset-0 bg-gradient-to-t from-alchemy-black via-alchemy-black/70 to-transparent" />
        {/* Subtle red accent glow at bottom */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[120%] h-[60%] bg-gradient-radial from-alchemy-red/15 via-transparent to-transparent opacity-60" />
        {/* Top fade for smooth transition */}
        <div className="absolute inset-0 bg-gradient-to-b from-alchemy-black via-transparent to-transparent h-32" />
        {/* Noise texture overlay */}
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.65\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noise)\'/%3E%3C/svg%3E")' }} />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-6 md:px-12 py-16 sm:py-20">
        {/* Logo - Playfair Display Italic (matching nav) */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mb-12 sm:mb-16"
        >
          <Link to="/" className="inline-flex items-center gap-4">
            <img 
              src={alchemyLogo} 
              alt="Alchemy Labs" 
              className="w-10 h-10 sm:w-12 sm:h-12 object-contain"
            />
            <div className="flex items-baseline gap-1.5">
              <span className="font-display text-xl sm:text-2xl md:text-3xl italic text-porcelain">
                Alchemy
              </span>
              <span className="font-body text-[10px] sm:text-xs text-porcelain/50 tracking-[0.2em] uppercase">
                LABS
              </span>
            </div>
          </Link>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 sm:gap-12 mb-12 sm:mb-16">
          {/* Company */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <h3 className="font-mono text-[10px] sm:text-xs text-porcelain/60 tracking-[0.15em] uppercase mb-4 sm:mb-6">
              Company
            </h3>
            <ul className="space-y-3 sm:space-y-4">
              {footerLinks.company.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.href}
                    className="font-body text-sm text-porcelain/70 hover:text-porcelain transition-colors duration-300"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Services */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <h3 className="font-mono text-[10px] sm:text-xs text-porcelain/60 tracking-[0.15em] uppercase mb-4 sm:mb-6">
              Services
            </h3>
            <ul className="space-y-3 sm:space-y-4">
              {footerLinks.services.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.href}
                    className="font-body text-sm text-porcelain/70 hover:text-porcelain transition-colors duration-300"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Connect */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <h3 className="font-mono text-[10px] sm:text-xs text-porcelain/60 tracking-[0.15em] uppercase mb-4 sm:mb-6">
              Connect
            </h3>
            <ul className="space-y-3 sm:space-y-4">
              {footerLinks.connect.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-body text-sm text-porcelain/70 hover:text-porcelain transition-colors duration-300"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Newsletter */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            <h3 className="font-mono text-[10px] sm:text-xs text-porcelain/60 tracking-[0.15em] uppercase mb-4 sm:mb-6">
              Newsletter
            </h3>
            <p className="font-body text-xs sm:text-sm text-porcelain/60 mb-4 font-light">
              Quarterly insights on{' '}
              <span className="font-display italic">brand systems</span> and{' '}
              <span className="font-display italic">AI</span>.
            </p>
            <form onSubmit={handleNewsletterSubmit} className="space-y-3">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                className="glass-input text-sm w-full"
                required
              />
              <button
                type="submit"
                className="glass-cta-primary w-full justify-center text-sm px-4 py-3"
              >
                <span>Subscribe</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </form>
            
            {/* Founder Direct Contact */}
            <div className="mt-6 pt-4 border-t border-porcelain/10">
              <p className="font-body text-xs text-porcelain/50 mb-2 font-light">
                Want to discuss something specific with the founders?
              </p>
              <a 
                href="mailto:aashrithgade5@gmail.com?subject=Direct Inquiry – Alchemy Labs"
                className="font-mono text-xs text-alchemy-red hover:text-alchemy-red/80 transition-colors block"
              >
                aashrithgade5@gmail.com
              </a>
              <a 
                href="mailto:evadoshi05@gmail.com?subject=Direct Inquiry – Alchemy Labs"
                className="font-mono text-xs text-alchemy-red hover:text-alchemy-red/80 transition-colors block mt-1"
              >
                evadoshi05@gmail.com
              </a>
            </div>
          </motion.div>
        </div>

        {/* Credibility Footer Line */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.45 }}
          className="text-center mb-6"
        >
          <div className="w-full h-px bg-porcelain/8 mb-6" />
          <p className="font-mono text-[10px] text-porcelain/55 tracking-wider">
            Founder-led. Systems-driven. Outcome-obsessed.
          </p>
        </motion.div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="pt-6 sm:pt-8 border-t border-porcelain/10 flex flex-col items-center gap-4"
        >
          <div className="flex flex-col sm:flex-row justify-between items-center w-full gap-4">
            <p className="font-mono text-[10px] sm:text-xs text-porcelain/50">
              © <span className="text-glow-red">2026</span> <span className="font-display italic">Alchemy Labs</span>. All rights reserved.
            </p>
            <div className="flex gap-6 sm:gap-8">
              <Link
                to="/privacy"
                className="font-body text-xs sm:text-sm text-porcelain/50 hover:text-porcelain transition-colors"
              >
                Privacy
              </Link>
              <Link
                to="/terms"
                className="font-body text-xs sm:text-sm text-porcelain/50 hover:text-porcelain transition-colors"
              >
                Terms
              </Link>
              <Link
                to="/admin/auth"
                className="font-body text-xs sm:text-sm text-porcelain/50 hover:text-porcelain transition-colors"
              >
                Admin
              </Link>
            </div>
          </div>
          
          {/* Pharmaceutical Disclaimer */}
          <p className="font-mono text-[9px] text-porcelain/30 text-center max-w-lg">
            Alchemy Labs is an independent creative studio and is not affiliated with any pharmaceutical entity.
          </p>
        </motion.div>
      </div>
    </footer>
  );
});

Footer.displayName = 'Footer';