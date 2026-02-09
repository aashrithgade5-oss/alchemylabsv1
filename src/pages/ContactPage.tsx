import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { Contact } from '@/components/Contact';
import contactBg from '@/assets/contact-bg.png';

export const ContactPage = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start']
  });

  const bgY = useTransform(scrollYProgress, [0, 1], [0, 80]);
  const textY = useTransform(scrollYProgress, [0, 1], [0, 100]);

  return (
    <div className="min-h-screen bg-background grain-overlay relative">
      {/* Full-page background image — blurred, dimmed, fixed feel */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <motion.img
          src={contactBg}
          alt=""
          aria-hidden
          style={{ y: bgY }}
          className="w-full h-full object-cover scale-110 blur-[60px] opacity-30"
        />
        {/* Top fade into nav */}
        <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-transparent" style={{ height: '30%' }} />
        {/* Bottom fade into footer */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-background via-background/80 to-transparent" style={{ height: '40%' }} />
        {/* Overall darken + vignette */}
        <div className="absolute inset-0 bg-background/50" />
        <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at center, transparent 30%, hsl(var(--background)) 80%)' }} />
      </div>

      <Navigation />
      
      {/* Hero Header */}
      <section ref={heroRef} className="relative pt-32 pb-24 overflow-hidden min-h-[70vh] flex items-center z-10">
        {/* Animated Gradient Orbs */}
        <div className="absolute inset-0 pointer-events-none">
          <motion.div 
            animate={{ scale: [1, 1.2, 1], opacity: [0.08, 0.15, 0.08] }}
            transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute top-1/4 left-1/4 w-[400px] h-[400px] rounded-full blur-[120px]"
            style={{ background: 'radial-gradient(circle, hsla(357, 95%, 45%, 0.2) 0%, transparent 70%)' }}
          />
          <motion.div 
            animate={{ scale: [1.2, 1, 1.2], opacity: [0.06, 0.12, 0.06] }}
            transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
            className="absolute bottom-1/4 right-1/4 w-[350px] h-[350px] rounded-full blur-[100px]"
            style={{ background: 'radial-gradient(circle, hsla(357, 95%, 35%, 0.25) 0%, transparent 70%)' }}
          />
        </div>
        
        <motion.div 
          style={{ y: textY }}
          className="relative z-10 max-w-5xl mx-auto px-6 md:px-12 text-center"
        >
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="font-mono text-xs text-alchemy-red tracking-label uppercase mb-4"
          >
            Get In Touch
          </motion.p>
          
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-display tracking-display text-porcelain mb-6"
          >
            <span className="font-medium">Start a</span> <span className="italic text-alchemy-red text-glow">Conversation</span>
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="font-body text-lg md:text-xl text-porcelain/50 max-w-2xl mx-auto font-light"
          >
            Ready to transform your brand? Let's discuss your vision and craft something extraordinary together.
          </motion.p>

          {/* Scroll indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.8 }}
            className="mt-16"
          >
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              className="w-7 h-11 rounded-full border-2 border-porcelain/25 mx-auto flex items-start justify-center p-2"
            >
              <motion.div 
                animate={{ y: [0, 12, 0], opacity: [1, 0.3, 1] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                className="w-1.5 h-1.5 rounded-full bg-alchemy-red" 
              />
            </motion.div>
          </motion.div>
        </motion.div>
      </section>
      
      {/* Contact Form Section */}
      <div className="relative z-10">
        <Contact />
      </div>
      
      <div className="relative z-10">
        <Footer />
      </div>
    </div>
  );
};

export default ContactPage;
