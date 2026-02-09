import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { Contact } from '@/components/Contact';
import heroVideo from '@/assets/hero-video.mp4';
import contactBg from '@/assets/contact-bg.png';

export const ContactPage = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start']
  });

  const videoScale = useTransform(scrollYProgress, [0, 1], [1, 1.2]);
  const videoOpacity = useTransform(scrollYProgress, [0, 0.8], [0.4, 0]);
  const textY = useTransform(scrollYProgress, [0, 1], [0, 100]);

  return (
    <div className="min-h-screen bg-background grain-overlay">
      <Navigation />
      
      {/* Hero Header with Video Background */}
      <section ref={heroRef} className="relative pt-32 pb-24 overflow-hidden min-h-[70vh] flex items-center">
        {/* Video Background */}
        <motion.div 
          style={{ scale: videoScale, opacity: videoOpacity }}
          className="absolute inset-0 z-0"
        >
          <video autoPlay muted loop playsInline className="w-full h-full object-cover">
            <source src={heroVideo} type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/60 to-background" />
        </motion.div>

        {/* Animated Gradient Orbs */}
        <div className="absolute inset-0 pointer-events-none">
          <motion.div 
            animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.2, 0.1] }}
            transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-alchemy-red/15 rounded-full blur-[120px]" 
          />
          <motion.div 
            animate={{ scale: [1.2, 1, 1.2], opacity: [0.08, 0.15, 0.08] }}
            transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
            className="absolute bottom-1/4 right-1/4 w-[350px] h-[350px] bg-deep-crimson/20 rounded-full blur-[100px]" 
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
      
      {/* Contact Form Section with dynamic background */}
      <section className="relative overflow-hidden">
        {/* Background image — tasteful blur with character */}
        <div className="absolute inset-0 pointer-events-none">
          <img
            src={contactBg}
            alt=""
            aria-hidden
            className="w-full h-full object-cover blur-[12px] opacity-70 scale-110"
          />
          {/* Top merge into hero */}
          <div className="absolute top-0 inset-x-0 h-40 bg-gradient-to-b from-background to-transparent" />
          {/* Bottom merge into footer */}
          <div className="absolute bottom-0 inset-x-0 h-40 bg-gradient-to-t from-background to-transparent" />
          {/* Gentle depth vignette */}
          <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at 50% 50%, transparent 40%, hsl(var(--background) / 0.4) 90%)' }} />
        </div>

        <div className="relative z-10">
          <Contact />
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default ContactPage;
