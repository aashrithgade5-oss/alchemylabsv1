import { motion } from 'framer-motion';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';

const founders = [
  {
    name: 'Mr. Ash',
    role: 'Creative Director & Co-Founder',
    bio: 'Architect of brand systems and visual narratives. 15+ years shaping identities for brands that refuse to blend in. Obsessed with the intersection of strategy and aesthetics.',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face',
  },
  {
    name: 'Eva Doshi',
    role: 'Strategy Lead & Co-Founder',
    bio: 'Former management consultant turned brand strategist. Expert in market positioning and cultural intelligence. Believes every great brand is built on uncomfortable truths.',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop&crop=face',
  },
];

const values = [
  { title: 'Velocity', description: 'Speed without sacrifice. We move fast because the market doesn\'t wait.' },
  { title: 'Precision', description: 'Every decision is intentional. No wasted pixels, no empty words.' },
  { title: 'Authenticity', description: 'We build brands that are genuinely different—not just different for difference\'s sake.' },
  { title: 'Craft', description: 'The details are the experience. Excellence lives in the margins.' },
];

export const About = () => {
  return (
    <div className="min-h-screen bg-background grain-overlay">
      <Navigation />
      
      {/* Hero */}
      <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden section-gradient">
        <div className="absolute inset-0">
          <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] bg-alchemy-red/8 rounded-full blur-[150px]" />
        </div>
        
        <div className="relative z-10 max-w-5xl mx-auto px-6 md:px-12 text-center pt-32">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="font-mono text-xs text-alchemy-red tracking-label uppercase mb-6"
          >
            About Us
          </motion.p>
          
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="font-display text-5xl sm:text-6xl md:text-7xl leading-display tracking-display text-porcelain mb-8"
          >
            We Build Brands
            <br />
            <span className="italic text-alchemy-red">That Matter</span>
          </motion.h1>
        </div>
      </section>

      {/* Manifesto */}
      <section className="relative py-32 section-gradient">
        <div className="max-w-4xl mx-auto px-6 md:px-12">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="glass-deep rounded-3xl p-10 md:p-16"
          >
            <h2 className="font-display text-3xl md:text-4xl italic text-porcelain mb-8">
              Our Manifesto
            </h2>
            
            <div className="space-y-6 font-body text-lg text-porcelain/70 font-light leading-relaxed">
              <p>
                We exist for brands that refuse to be forgettable. For founders who know their vision 
                deserves more than templates and trends. For companies ready to invest in identity 
                as infrastructure.
              </p>
              <p>
                Alchemy Labs was born from a simple observation: most agencies optimize for volume. 
                We optimize for impact. We'd rather build one iconic brand than a hundred mediocre ones.
              </p>
              <p className="text-alchemy-red font-medium">
                We don't do safe. We do significant.
              </p>
              <p>
                Our process is intensive. Our standards are high. Our results speak for themselves. 
                We combine strategic rigor with creative ambition—and we do it at a pace that 
                matches the urgency of modern business.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Founders */}
      <section className="relative py-32 section-gradient">
        <div className="max-w-6xl mx-auto px-6 md:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <p className="font-mono text-xs text-alchemy-red tracking-label uppercase mb-4">
              Leadership
            </p>
            <h2 className="font-display text-4xl md:text-5xl italic text-porcelain">
              The Founders
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 md:gap-12">
            {founders.map((founder, i) => (
              <motion.div
                key={founder.name}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: i * 0.15 }}
                className="glass-deep rounded-3xl p-8 md:p-10 group interactive-hover"
              >
                <div className="flex flex-col md:flex-row gap-6 md:gap-8 items-center md:items-start">
                  <div className="w-32 h-32 md:w-40 md:h-40 rounded-2xl overflow-hidden flex-shrink-0 border border-porcelain/10">
                    <img 
                      src={founder.image} 
                      alt={founder.name}
                      className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                    />
                  </div>
                  <div className="text-center md:text-left">
                    <h3 className="font-display text-2xl italic text-porcelain mb-1">
                      {founder.name}
                    </h3>
                    <p className="font-mono text-xs text-alchemy-red tracking-label uppercase mb-4">
                      {founder.role}
                    </p>
                    <p className="font-body text-base text-porcelain/60 font-light leading-relaxed">
                      {founder.bio}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="relative py-32 section-gradient">
        <div className="max-w-6xl mx-auto px-6 md:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <p className="font-mono text-xs text-alchemy-red tracking-label uppercase mb-4">
              Principles
            </p>
            <h2 className="font-display text-4xl md:text-5xl italic text-porcelain">
              What We Believe
            </h2>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, i) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="glass-deep rounded-2xl p-6 interactive-hover"
              >
                <h4 className="font-display text-xl italic text-alchemy-red mb-3">
                  {value.title}
                </h4>
                <p className="font-body text-sm text-porcelain/60 font-light leading-relaxed">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;
