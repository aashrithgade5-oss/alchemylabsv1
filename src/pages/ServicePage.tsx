import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, Check, ChevronDown } from 'lucide-react';
import { useState } from 'react';
import { allServices, consultationServices, Service, ConsultationService } from '@/data/services';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { MagneticButton } from '@/components/MagneticButton';

const getServiceData = (slug: string): (Service | ConsultationService | undefined) => {
  const regular = allServices.find(s => s.slug === slug);
  if (regular) return regular;
  return consultationServices.find(s => s.slug === slug);
};

const processSteps = [
  { title: 'Discovery', description: 'We dive deep into your brand, market, and objectives to understand the full picture.' },
  { title: 'Strategy', description: 'We architect a clear roadmap with defined deliverables, timelines, and success metrics.' },
  { title: 'Creation', description: 'Our team executes with precision, keeping you informed at every milestone.' },
  { title: 'Delivery', description: 'You receive polished assets, documentation, and ongoing support to ensure success.' },
];

const faqs = [
  { 
    question: 'How long does a typical project take?', 
    answer: 'Timelines vary by scope. Most projects range from 2-6 weeks. We\'ll provide a detailed timeline during our initial consultation.' 
  },
  { 
    question: 'What do I need to provide to get started?', 
    answer: 'We\'ll need access to any existing brand assets, a brief overview of your objectives, and availability for a kickoff call.' 
  },
  { 
    question: 'Do you offer revisions?', 
    answer: 'Yes, all projects include revision rounds. The exact number depends on the service tier and is outlined in our proposal.' 
  },
  { 
    question: 'Can we start with a smaller scope?', 
    answer: 'Absolutely. We often recommend starting with a strategy session or single deliverable to establish fit before larger engagements.' 
  },
];

export const ServicePage = () => {
  const { slug } = useParams<{ slug: string }>();
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  
  const service = slug ? getServiceData(slug) : undefined;
  
  if (!service) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-display text-4xl italic text-porcelain mb-4">Service Not Found</h1>
          <Link to="/#solutions" className="text-alchemy-red hover:underline">
            ← Back to Solutions
          </Link>
        </div>
      </div>
    );
  }

  const isConsultation = 'duration' in service;
  const Icon = service.icon;
  const pillarName = service.pillar === 'ai' ? 'AI Solutions' : service.pillar === 'branding' ? 'Branding Solutions' : 'Consultation';

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero */}
      <section className="relative pt-32 pb-20 overflow-hidden section-gradient">
        <div className="absolute inset-0">
          <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-alchemy-red/10 rounded-full blur-[120px]" />
        </div>
        
        <div className="relative z-10 max-w-5xl mx-auto px-6 md:px-12">
          {/* Breadcrumb */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-8"
          >
            <Link 
              to="/#solutions" 
              className="inline-flex items-center gap-2 text-sm text-porcelain/50 hover:text-alchemy-red transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="font-body">Back to Solutions</span>
            </Link>
          </motion.div>

          {/* Pillar badge */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-mono text-xs text-alchemy-red tracking-label uppercase mb-4"
          >
            {pillarName}
          </motion.p>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-display tracking-display text-porcelain mb-6"
          >
            <span className="italic text-alchemy-red">{service.title.split(' ')[0]}</span>
            <span className="text-porcelain/80"> {service.title.split(' ').slice(1).join(' ')}</span>
          </motion.h1>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="font-body text-lg md:text-xl text-porcelain/60 max-w-2xl font-light leading-relaxed mb-8"
          >
            {service.description}
          </motion.p>

          {/* Meta & CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-wrap items-center gap-6"
          >
            <MagneticButton 
              href="#contact" 
              className="glass-cta-primary relative overflow-hidden"
            >
              Book This Service
              <ArrowRight className="w-4 h-4" />
            </MagneticButton>
            
            <span className="font-mono text-sm text-alchemy-red">
              {isConsultation ? (service as ConsultationService).duration : (service as Service).meta}
            </span>
          </motion.div>
        </div>
      </section>

      {/* What You Get */}
      <section className="py-24 section-gradient">
        <div className="relative z-10 max-w-5xl mx-auto px-6 md:px-12">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="font-display text-3xl md:text-4xl leading-display tracking-display text-porcelain mb-12"
          >
            What You <span className="italic text-alchemy-red">Get</span>
          </motion.h2>

          <div className="grid md:grid-cols-2 gap-6">
            {(isConsultation ? (service as ConsultationService).includes : (service as Service).features).map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="glass-deep rounded-2xl p-6 flex gap-4"
              >
                <div className="w-10 h-10 rounded-xl glass-red flex items-center justify-center flex-shrink-0">
                  <Check className="w-5 h-5 text-alchemy-red" />
                </div>
                <div>
                  <p className="font-body text-base text-porcelain/80">{item}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-24 section-gradient">
        <div className="relative z-10 max-w-5xl mx-auto px-6 md:px-12">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="font-display text-3xl md:text-4xl leading-display tracking-display text-porcelain mb-12"
          >
            The <span className="italic text-alchemy-red">Process</span>
          </motion.h2>

          <div className="space-y-6">
            {processSteps.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="glass-deep rounded-2xl p-6 md:p-8 flex gap-6"
              >
                <span className="font-display text-4xl md:text-5xl text-alchemy-red/20">
                  0{i + 1}
                </span>
                <div>
                  <h3 className="font-display text-xl md:text-2xl italic text-porcelain mb-2">
                    {step.title}
                  </h3>
                  <p className="font-body text-base text-porcelain/60 font-light">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 section-gradient">
        <div className="relative z-10 max-w-3xl mx-auto px-6 md:px-12">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="font-display text-3xl md:text-4xl leading-display tracking-display text-porcelain mb-12 text-center"
          >
            Common <span className="italic text-alchemy-red">Questions</span>
          </motion.h2>

          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="glass-deep rounded-2xl overflow-hidden"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full p-6 flex items-center justify-between text-left"
                >
                  <span className="font-display text-lg italic text-porcelain pr-4">
                    {faq.question}
                  </span>
                  <ChevronDown 
                    className={`w-5 h-5 text-alchemy-red transition-transform duration-300 flex-shrink-0 ${
                      openFaq === i ? 'rotate-180' : ''
                    }`} 
                  />
                </button>
                <motion.div
                  initial={false}
                  animate={{ 
                    height: openFaq === i ? 'auto' : 0,
                    opacity: openFaq === i ? 1 : 0
                  }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <p className="px-6 pb-6 font-body text-base text-porcelain/60 font-light">
                    {faq.answer}
                  </p>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 section-gradient">
        <div className="relative z-10 max-w-3xl mx-auto px-6 md:px-12 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="font-display text-3xl md:text-4xl lg:text-5xl leading-display tracking-display text-porcelain mb-6"
          >
            Ready to <span className="italic text-alchemy-red">start</span>?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-body text-lg text-porcelain/50 mb-8 font-light"
          >
            Let's build something inevitable together.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <MagneticButton 
              href="#contact" 
              className="glass-cta-primary relative overflow-hidden"
            >
              Book {service.title}
              <ArrowRight className="w-4 h-4" />
            </MagneticButton>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};
