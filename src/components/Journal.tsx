import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const posts = [
  {
    id: 1,
    date: 'Jan 2026',
    title: 'The Architecture of AI-Native Brands',
    excerpt:
      'How the next generation of iconic brands will be built from the ground up with intelligence at their core.',
  },
  {
    id: 2,
    date: 'Dec 2025',
    title: 'Luxury in the Age of Infinite Content',
    excerpt:
      'When everyone can create, scarcity becomes the new currency. A framework for maintaining exclusivity.',
  },
  {
    id: 3,
    date: 'Nov 2025',
    title: 'Systems Thinking for Creative Teams',
    excerpt:
      'Moving beyond project-based work to build repeatable creative infrastructure.',
  },
];

export const Journal = () => {
  return (
    <section id="journal" className="relative py-32 overflow-hidden">
      <div className="absolute inset-0 bg-charcoal-ui" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="mb-16"
        >
          <p className="font-mono text-xs text-alchemy-red tracking-label uppercase mb-4">
            Perspectives
          </p>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl leading-display tracking-display">
            The Journal
          </h2>
          <p className="text-xl text-porcelain/70 mt-4">
            Perspectives on brand, systems, and intelligence.
          </p>
        </motion.div>

        {/* Posts Grid */}
        <div className="grid md:grid-cols-3 gap-6">
          {posts.map((post, i) => (
            <motion.article
              key={post.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                delay: i * 0.1,
                duration: 0.6,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="glass-deep rounded-xl p-8 group cursor-pointer hover:border-alchemy-red/30 transition-all duration-400"
            >
              <span className="font-mono text-xs text-porcelain/50 tracking-label uppercase">
                {post.date}
              </span>
              <h3 className="font-display text-xl md:text-2xl mt-4 mb-4 group-hover:text-alchemy-red transition-colors duration-300">
                {post.title}
              </h3>
              <p className="text-porcelain/70 leading-relaxed mb-6">
                {post.excerpt}
              </p>
              <a
                href="#"
                className="inline-flex items-center gap-2 text-sm text-porcelain/70 hover:text-alchemy-red transition-colors duration-300 group/link"
              >
                <span>Read Article</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover/link:translate-x-1" />
              </a>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};
