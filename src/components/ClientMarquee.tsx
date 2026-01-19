import { motion } from 'framer-motion';

const testimonials = [
  { text: "Transformed our entire brand identity", author: "Sarah Chen", role: "CEO, TechFlow" },
  { text: "AI-driven strategy that actually delivers", author: "Marcus Webb", role: "Founder, Aether" },
  { text: "The future of creative consulting", author: "Elena Rodriguez", role: "CMO, Vertex Labs" },
  { text: "Exceeded every expectation", author: "James Liu", role: "Director, NovaSphere" },
  { text: "Precision meets artistry", author: "Aisha Patel", role: "CEO, Lumina AI" },
  { text: "Revolutionary approach to branding", author: "David Kim", role: "VP, Horizon" },
];

const logoNames = [
  "VERTEX", "AETHER", "NOVA", "LUMINA", "HORIZON", 
  "PRISM", "ZENITH", "APEX", "VORTEX", "CIPHER"
];

export const ClientMarquee = () => {
  return (
    <section className="relative py-24 overflow-hidden border-y border-porcelain/5">
      {/* Gradient fades */}
      <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-alchemy-black to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-alchemy-black to-transparent z-10 pointer-events-none" />
      
      {/* Logo Marquee - Top */}
      <div className="mb-16">
        <p className="text-center font-mono text-[10px] tracking-[0.3em] uppercase text-porcelain/30 mb-8">
          Trusted by Industry Leaders
        </p>
        <motion.div
          className="flex gap-20 whitespace-nowrap"
          animate={{ x: [0, -1920] }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: "loop",
              duration: 30,
              ease: "linear",
            },
          }}
        >
          {[...logoNames, ...logoNames, ...logoNames].map((name, i) => (
            <div 
              key={i} 
              className="flex items-center gap-3 text-porcelain/20 hover:text-porcelain/40 transition-colors duration-500"
            >
              <div className="w-8 h-8 rounded-lg bg-porcelain/5 border border-porcelain/10 flex items-center justify-center">
                <span className="font-display text-xs italic text-alchemy-red/50">{name[0]}</span>
              </div>
              <span className="font-body text-sm tracking-widest uppercase">{name}</span>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Testimonials Marquee - Bottom (reverse direction) */}
      <motion.div
        className="flex gap-8 whitespace-nowrap"
        animate={{ x: [-1920, 0] }}
        transition={{
          x: {
            repeat: Infinity,
            repeatType: "loop",
            duration: 40,
            ease: "linear",
          },
        }}
      >
        {[...testimonials, ...testimonials, ...testimonials].map((testimonial, i) => (
          <div 
            key={i}
            className="flex-shrink-0 px-8 py-6 rounded-2xl border border-porcelain/5 bg-porcelain/[0.02] backdrop-blur-sm min-w-[350px]"
          >
            <p className="font-body text-base text-porcelain/60 mb-4 italic">
              "{testimonial.text}"
            </p>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-alchemy-red/20 to-deep-crimson/20 border border-alchemy-red/20 flex items-center justify-center">
                <span className="font-display text-sm italic text-alchemy-red">
                  {testimonial.author[0]}
                </span>
              </div>
              <div>
                <p className="font-body text-sm text-porcelain/80">{testimonial.author}</p>
                <p className="font-mono text-[10px] text-porcelain/40 tracking-wider">{testimonial.role}</p>
              </div>
            </div>
          </div>
        ))}
      </motion.div>
    </section>
  );
};
