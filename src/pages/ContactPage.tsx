import { motion } from 'framer-motion';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { Contact } from '@/components/Contact';

export const ContactPage = () => {
  return (
    <div className="min-h-screen bg-background grain-overlay">
      <Navigation />
      
      {/* Hero Header */}
      <section className="relative pt-32 pb-16 overflow-hidden section-gradient">
        <div className="absolute inset-0">
          <div className="absolute top-1/3 left-1/4 w-[600px] h-[600px] bg-alchemy-red/10 rounded-full blur-[180px]" />
        </div>
        
        <div className="relative z-10 max-w-5xl mx-auto px-6 md:px-12 text-center">
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
            Start a <span className="italic text-alchemy-red">Conversation</span>
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="font-body text-lg md:text-xl text-porcelain/50 max-w-2xl mx-auto font-light"
          >
            Ready to transform your brand? Let's discuss your vision and craft something extraordinary together.
          </motion.p>
        </div>
      </section>
      
      {/* Contact Form Section */}
      <Contact />
      
      <Footer />
    </div>
  );
};

export default ContactPage;
