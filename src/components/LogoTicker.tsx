import { motion } from 'framer-motion';

// Placeholder logos - in production, replace with actual client logos
const clients = [
  { name: 'TechCorp', id: 1 },
  { name: 'Innovate Inc', id: 2 },
  { name: 'Future Labs', id: 3 },
  { name: 'Digital First', id: 4 },
  { name: 'Scale Up', id: 5 },
  { name: 'Growth Co', id: 6 },
  { name: 'Vision AI', id: 7 },
  { name: 'NextGen', id: 8 },
];

export const LogoTicker = () => {
  return (
    <section className="relative py-16 overflow-hidden border-y border-porcelain/5">
      {/* Gradient fade edges */}
      <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-alchemy-black to-transparent z-10" />
      <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-alchemy-black to-transparent z-10" />

      <div className="text-center mb-8">
        <span className="font-mono text-xs uppercase tracking-[0.2em] text-porcelain/40">
          Trusted by forward-thinking brands
        </span>
      </div>

      {/* Ticker container */}
      <div className="relative flex overflow-hidden">
        <motion.div
          className="flex gap-16 items-center"
          animate={{
            x: [0, -1920],
          }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: 'loop',
              duration: 30,
              ease: 'linear',
            },
          }}
        >
          {/* Double the logos for seamless loop */}
          {[...clients, ...clients, ...clients, ...clients].map((client, i) => (
            <div
              key={`${client.id}-${i}`}
              className="flex-shrink-0 group"
            >
              {/* Placeholder logo - replace with actual images */}
              <div className="flex items-center gap-3 px-8 py-4 glass rounded-full opacity-40 hover:opacity-100 transition-opacity duration-300">
                <div className="w-8 h-8 rounded-lg bg-porcelain/10 flex items-center justify-center">
                  <span className="font-display text-sm italic text-alchemy-red">
                    {client.name.charAt(0)}
                  </span>
                </div>
                <span className="font-body text-sm text-porcelain/70 whitespace-nowrap">
                  {client.name}
                </span>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
