import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, Check, Clock, Zap, Target } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { MagneticButton } from '@/components/MagneticButton';
import { CustomCursor } from '@/components/CustomCursor';

const tiers = [
  {
    title: '75-Minute Strategy Session',
    headline: 'Precision Audit',
    duration: '75 Minutes',
    description: 'Rapid-fire strategic guidance for immediate decisions. Bring your challenge, leave with clarity.',
    bestFor: 'Specific tactical challenges, campaign direction, quick audits',
    youLeaveWith: [
      'Crystal-clear problem diagnosis',
      'Actionable next steps',
      '7-day email follow-up support',
      'Session recording',
    ],
    investment: '$750',
    icon: Clock,
    featured: false,
  },
  {
    title: '150-Minute Deep Dive',
    headline: 'Strategy Build',
    duration: '150 Minutes',
    description: 'Comprehensive strategic exploration with room to breathe. We dissect your brand, market position, and opportunities.',
    bestFor: 'Brand repositioning, launch strategy, market entry planning',
    youLeaveWith: [
      'Custom strategy framework document',
      'Competitive analysis summary',
      '14-day implementation support',
      'Session recording + action items',
    ],
    investment: '$1,500',
    icon: Zap,
    featured: true,
  },
  {
    title: '300-Minute Simulation',
    headline: 'Full System Simulation',
    duration: '300 Minutes (Full Day)',
    description: "Immersive strategy simulation where we don't just plan—we prototype. Build mock campaigns, test messaging, simulate launches.",
    bestFor: 'Major launches, rebrands, market disruption plays',
    youLeaveWith: [
      'Prototype deliverables (mockups, frameworks, roadmaps)',
      'Comprehensive brand & market audit',
      '30-day advisory retainer',
      'Full documentation package',
    ],
    investment: '$3,000',
    icon: Target,
    featured: false,
  },
];

const processSteps = [
  {
    number: '01',
    title: 'Book & Brief',
    description: 'Select your tier and complete a pre-session brief. We arrive prepared, not cold.',
  },
  {
    number: '02',
    title: 'Deep Dive Session',
    description: 'Intensive, focused collaboration. No fluff, no filler—pure strategic signal.',
  },
  {
    number: '03',
    title: 'Deliverables & Support',
    description: 'Walk away with documentation, action items, and continued support window.',
  },
];

export const ConsultationSolutionsPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background grain-overlay">
      <CustomCursor />
      <Navigation />
      
      {/* Hero */}
      <section className="relative min-h-[80vh] flex items-center overflow-hidden section-gradient">
        <div className="absolute inset-0">
          <div className="absolute top-1/3 left-1/4 w-[800px] h-[800px] bg-alchemy-red/10 rounded-full blur-[180px]" />
          <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-alchemy-red/5 rounded-full blur-[150px]" />
        </div>
        
        {/* Background number */}
        <div className="absolute top-1/2 right-0 -translate-y-1/2 pointer-events-none">
          <span className="font-display text-[400px] md:text-[600px] text-porcelain/[0.02] leading-none">
            03
          </span>
        </div>
        
        <div className="relative z-10 max-w-5xl mx-auto px-6 md:px-12 pt-32">
          {/* Breadcrumb */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-8"
          >
            <Link 
              to="/solutions" 
              className="inline-flex items-center gap-2 text-sm text-porcelain/50 hover:text-alchemy-red transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="font-body">Back to Solutions</span>
            </Link>
          </motion.div>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-mono text-xs text-alchemy-red tracking-label uppercase mb-4"
          >
            Pillar 03
          </motion.p>
          
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl leading-display tracking-display text-porcelain mb-8"
          >
            <span className="italic text-alchemy-red">Clarity</span>
            <br />
            With a Plan
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="font-body text-lg md:text-xl text-porcelain/50 max-w-2xl font-light leading-relaxed mb-10"
          >
            Simulation, not theory. You leave with systems, not slides.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <MagneticButton 
              onClick={() => navigate('/book-sprint')}
              className="glass-cta-primary"
            >
              Book a Consultation
              <ArrowRight className="w-4 h-4" />
            </MagneticButton>
          </motion.div>
        </div>
      </section>
      
      {/* Consultation Tiers */}
      <section className="relative py-32 overflow-hidden section-gradient">
        <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mb-16 text-center"
          >
            <h2 className="font-display text-3xl md:text-4xl leading-display tracking-display text-porcelain mb-4">
              Choose Your <span className="italic text-alchemy-red">Depth</span>
            </h2>
            <p className="font-body text-lg text-porcelain/50 font-light">
              Three tiers. One standard: Exceptional.
            </p>
          </motion.div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {tiers.map((tier, i) => {
              const Icon = tier.icon;
              return (
                <motion.div
                  key={tier.title}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: i * 0.15 }}
                  className={`glass-deep rounded-3xl p-8 md:p-10 relative group ${
                    tier.featured ? 'ring-2 ring-alchemy-red/30' : ''
                  }`}
                >
                  {tier.featured && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                      <span className="px-4 py-1 bg-alchemy-red text-porcelain text-xs font-mono tracking-label uppercase rounded-full">
                        Most Popular
                      </span>
                    </div>
                  )}
                  
                  {/* Icon */}
                  <div className="w-14 h-14 rounded-2xl glass-red flex items-center justify-center mb-6">
                    <Icon className="w-6 h-6 text-alchemy-red" />
                  </div>
                  
                  {/* Title */}
                  <h3 className="font-display text-2xl italic text-porcelain mb-2">
                    {tier.headline}
                  </h3>
                  <p className="font-mono text-xs text-alchemy-red tracking-label uppercase mb-4">
                    {tier.duration}
                  </p>
                  
                  {/* Description */}
                  <p className="font-body text-sm text-porcelain/50 font-light leading-relaxed mb-6">
                    {tier.description}
                  </p>
                  
                  {/* Best For */}
                  <div className="mb-6">
                    <p className="font-mono text-xs text-porcelain/40 tracking-label uppercase mb-2">
                      Best For
                    </p>
                    <p className="font-body text-sm text-porcelain/70">
                      {tier.bestFor}
                    </p>
                  </div>
                  
                  {/* You Leave With */}
                  <div className="mb-8">
                    <p className="font-mono text-xs text-porcelain/40 tracking-label uppercase mb-3">
                      You Leave With
                    </p>
                    <ul className="space-y-2">
                      {tier.youLeaveWith.map((item, j) => (
                        <li key={j} className="flex items-start gap-2">
                          <Check className="w-4 h-4 text-alchemy-red mt-0.5 flex-shrink-0" />
                          <span className="font-body text-sm text-porcelain/60">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  {/* Investment */}
                  <div className="mb-8">
                    <span className="font-display text-3xl italic text-alchemy-red">
                      {tier.investment}
                    </span>
                  </div>
                  
                  {/* CTA */}
                  <MagneticButton 
                    onClick={() => navigate('/book-sprint')}
                    className={`w-full justify-center ${tier.featured ? 'glass-cta-primary' : 'glass-cta-nav px-6 py-3'}`}
                  >
                    Book Now
                    <ArrowRight className="w-4 h-4" />
                  </MagneticButton>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>
      
      {/* Process */}
      <section className="relative py-32 overflow-hidden section-gradient">
        <div className="relative z-10 max-w-4xl mx-auto px-6 md:px-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mb-16 text-center"
          >
            <h2 className="font-display text-3xl md:text-4xl leading-display tracking-display text-porcelain">
              How It <span className="italic text-alchemy-red">Works</span>
            </h2>
          </motion.div>
          
          <div className="space-y-8">
            {processSteps.map((step, i) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.15 }}
                className="glass-deep rounded-2xl p-8 flex gap-6"
              >
                <span className="font-display text-5xl text-alchemy-red/20">
                  {step.number}
                </span>
                <div>
                  <h3 className="font-display text-xl italic text-porcelain mb-2">
                    {step.title}
                  </h3>
                  <p className="font-body text-base text-porcelain/50 font-light">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* CTA Footer */}
      <section className="relative py-32 overflow-hidden section-gradient">
        <div className="relative z-10 max-w-3xl mx-auto px-6 md:px-12 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="font-display text-4xl md:text-5xl lg:text-6xl leading-display tracking-display text-porcelain mb-6"
          >
            Ready for <span className="italic text-alchemy-red">clarity</span>?
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-body text-lg text-porcelain/50 mb-10 font-light"
          >
            Let's cut through the noise together.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <MagneticButton 
              onClick={() => navigate('/book-sprint')}
              className="glass-cta-primary"
            >
              Book a Consultation
              <ArrowRight className="w-4 h-4" />
            </MagneticButton>
          </motion.div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default ConsultationSolutionsPage;
