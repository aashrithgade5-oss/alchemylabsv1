import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useState } from 'react';
import alchemyLogo from '@/assets/alchemy-logo.png';

const footerLinks = {
  company: [
    { label: 'About', href: '#about' },
    { label: 'Work', href: '#work' },
    { label: 'Journal', href: '#journal' },
    { label: 'Contact', href: '#contact' },
  ],
  services: [
    { label: 'Brand Architecture', href: '#solutions' },
    { label: 'Cultural Strategy', href: '#solutions' },
    { label: 'AI Content Systems', href: '#solutions' },
    { label: 'Cinematic Assets', href: '#solutions' },
  ],
  connect: [
    { label: 'Twitter', href: '#' },
    { label: 'LinkedIn', href: '#' },
    { label: 'Instagram', href: '#' },
    { label: 'Dribbble', href: '#' },
  ],
};

export const Footer = () => {
  const [email, setEmail] = useState('');

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Newsletter signup:', email);
    setEmail('');
  };

  return (
    <footer className="relative overflow-hidden section-gradient">
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 py-20">
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <a href="#" className="inline-flex items-center gap-4">
            <img 
              src={alchemyLogo} 
              alt="Alchemy Labs" 
              className="w-12 h-12 object-contain"
            />
            <div className="flex flex-col leading-none">
              <span className="font-display text-2xl md:text-3xl italic text-porcelain">
                Alchemy
              </span>
              <span className="font-mono text-[10px] text-porcelain/40 tracking-[0.25em] uppercase">
                LABS
              </span>
            </div>
          </a>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 mb-16">
          {/* Company */}
          <div>
            <h3 className="font-mono text-xs text-porcelain/40 tracking-label uppercase mb-6">
              Company
            </h3>
            <ul className="space-y-4">
              {footerLinks.company.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="font-body text-porcelain/60 hover:text-porcelain transition-colors duration-300"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-mono text-xs text-porcelain/40 tracking-label uppercase mb-6">
              Services
            </h3>
            <ul className="space-y-4">
              {footerLinks.services.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="font-body text-porcelain/60 hover:text-porcelain transition-colors duration-300"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h3 className="font-mono text-xs text-porcelain/40 tracking-label uppercase mb-6">
              Connect
            </h3>
            <ul className="space-y-4">
              {footerLinks.connect.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="font-body text-porcelain/60 hover:text-porcelain transition-colors duration-300"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="font-mono text-xs text-porcelain/40 tracking-label uppercase mb-6">
              Newsletter
            </h3>
            <p className="font-body text-sm text-porcelain/50 mb-4 font-light">
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
                className="glass-input text-sm"
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
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-porcelain/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="font-mono text-xs text-porcelain/40">
            © 2026 <span className="font-display italic">Alchemy Labs</span>. All rights reserved.
          </p>
          <div className="flex gap-8">
            <a
              href="#"
              className="font-body text-sm text-porcelain/40 hover:text-porcelain transition-colors"
            >
              Privacy
            </a>
            <a
              href="#"
              className="font-body text-sm text-porcelain/40 hover:text-porcelain transition-colors"
            >
              Terms
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
