import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useState } from 'react';

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
    <footer className="relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-t from-alchemy-black via-charcoal-ui to-charcoal-ui" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 py-20">
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <a href="#" className="inline-flex items-baseline gap-1">
            <span className="font-display text-3xl md:text-4xl font-light text-porcelain">
              Alchemy
            </span>
            <span className="font-display text-2xl md:text-3xl font-medium tracking-widest text-porcelain uppercase">
              LABS
            </span>
          </a>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 mb-16">
          {/* Company */}
          <div>
            <h3 className="font-mono text-xs text-porcelain/50 tracking-label uppercase mb-4">
              Company
            </h3>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-porcelain/70 hover:text-porcelain transition-colors duration-300"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-mono text-xs text-porcelain/50 tracking-label uppercase mb-4">
              Services
            </h3>
            <ul className="space-y-3">
              {footerLinks.services.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-porcelain/70 hover:text-porcelain transition-colors duration-300"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h3 className="font-mono text-xs text-porcelain/50 tracking-label uppercase mb-4">
              Connect
            </h3>
            <ul className="space-y-3">
              {footerLinks.connect.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-porcelain/70 hover:text-porcelain transition-colors duration-300"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="font-mono text-xs text-porcelain/50 tracking-label uppercase mb-4">
              Newsletter
            </h3>
            <p className="text-sm text-porcelain/60 mb-4">
              Quarterly insights on brand systems and AI.
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
                className="glass-cta-primary w-full justify-center text-sm px-4 py-2.5"
              >
                <span>Subscribe</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-porcelain/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="font-mono text-xs text-porcelain/50">
            © 2026 Alchemy Labs. All rights reserved.
          </p>
          <div className="flex gap-8">
            <a
              href="#"
              className="text-sm text-porcelain/50 hover:text-porcelain transition-colors"
            >
              Privacy
            </a>
            <a
              href="#"
              className="text-sm text-porcelain/50 hover:text-porcelain transition-colors"
            >
              Terms
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
