import { motion } from 'framer-motion';
import { Quote } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    quote: "Alchemy Labs didn't just rebrand us—they redefined how we think about our market position. The AI integration transformed our customer experience.",
    author: "Sarah Chen",
    role: "CEO",
    company: "NexGen Dynamics",
    logo: "/placeholder.svg",
  },
  {
    id: 2,
    quote: "Working with Alchemy was like having a strategic partner who truly understood the intersection of technology and luxury branding.",
    author: "Marcus Webb",
    role: "Founder",
    company: "Horizon Ventures",
    logo: "/placeholder.svg",
  },
  {
    id: 3,
    quote: "They delivered in weeks what we expected would take months. The quality and attention to detail exceeded every expectation.",
    author: "Elena Rodriguez",
    role: "CMO",
    company: "Stellar Industries",
    logo: "/placeholder.svg",
  },
  {
    id: 4,
    quote: "The strategic clarity they brought to our AI implementation was invaluable. Our conversion rates increased by 340% in three months.",
    author: "David Park",
    role: "CTO",
    company: "Quantum Labs",
    logo: "/placeholder.svg",
  },
];

export const Testimonials = () => {
  return (
    <section className="relative py-32 overflow-hidden section-gradient">
      {/* Background Effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 right-1/4 w-[600px] h-[600px] bg-alchemy-red/5 rounded-full blur-[180px] float" />
        <div className="absolute bottom-1/4 left-1/4 w-[400px] h-[400px] bg-deep-crimson/8 rounded-full blur-[150px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-20"
        >
          <p className="font-mono text-xs text-alchemy-red tracking-label uppercase mb-4">
            Client Voices
          </p>
          <h2 className="font-display text-4xl sm:text-5xl md:text-6xl leading-display tracking-display text-porcelain">
            Trusted by{' '}
            <span className="italic text-alchemy-red">Visionaries</span>
          </h2>
        </motion.div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
          {testimonials.map((testimonial, i) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -5 }}
              className="glass-deep rounded-2xl p-8 md:p-10 group cursor-default hover:border-alchemy-red/30 transition-all duration-400"
            >
              {/* Quote Icon */}
              <div className="mb-6">
                <Quote className="w-10 h-10 text-alchemy-red/30 group-hover:text-alchemy-red/50 transition-colors duration-300" />
              </div>

              {/* Quote Text */}
              <p className="font-body text-lg md:text-xl text-porcelain/80 leading-relaxed mb-8 font-light italic">
                "{testimonial.quote}"
              </p>

              {/* Author Info */}
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-alchemy-red/10 flex items-center justify-center">
                  <span className="font-display text-lg text-alchemy-red">
                    {testimonial.author.charAt(0)}
                  </span>
                </div>
                <div className="flex-1">
                  <p className="font-body text-base text-porcelain font-medium">
                    {testimonial.author}
                  </p>
                  <p className="font-mono text-xs text-porcelain/50 tracking-label">
                    {testimonial.role}, {testimonial.company}
                  </p>
                </div>
                <img
                  src={testimonial.logo}
                  alt={testimonial.company}
                  className="w-10 h-10 opacity-40 group-hover:opacity-60 transition-opacity"
                />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Client Logos Strip */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="mt-20 pt-12 border-t border-porcelain/10"
        >
          <p className="font-mono text-xs text-center text-porcelain/40 tracking-label uppercase mb-10">
            Partnered with forward-thinking brands
          </p>
          <div className="flex flex-wrap justify-center items-center gap-12 md:gap-16">
            {['NexGen', 'Horizon', 'Stellar', 'Quantum', 'Apex'].map((brand, i) => (
              <motion.div
                key={brand}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 + i * 0.1 }}
                className="font-display text-xl md:text-2xl text-porcelain/20 hover:text-porcelain/40 transition-colors duration-300 cursor-default"
              >
                {brand}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};
