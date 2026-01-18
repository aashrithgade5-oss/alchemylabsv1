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
    <section id="journal" className="relative py-32 overflow-hidden section-gradient">
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="mb-16 text-center"
        >
          <p className="font-mono text-xs text-alchemy-red tracking-label uppercase mb-4">
            Perspectives
          </p>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl leading-display tracking-display">
            The <span className="italic text-alchemy-red">Journal</span>
          </h2>
          <p className="font-body text-base text-porcelain/50 mt-6 font-light">
            Perspectives on{' '}
            <span className="font-display italic text-porcelain/70">brand</span>,{' '}
            <span className="font-display italic text-porcelain/70">systems</span>, and{' '}
            <span className="font-display italic text-porcelain/70">intelligence</span>.
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
              className="glass-deep rounded-2xl p-8 group cursor-pointer hover:border-alchemy-red/30 transition-all duration-400"
            >
              <span className="font-mono text-xs text-porcelain/40 tracking-label uppercase">
                {post.date}
              </span>
              <h3 className="font-display text-xl md:text-2xl italic text-porcelain mt-4 mb-4 group-hover:text-alchemy-red transition-colors duration-300">
                {post.title}
              </h3>
              <p className="font-body text-sm text-porcelain/50 leading-relaxed mb-6 font-light">
                {post.excerpt}
              </p>
              <a
                href="#"
                className="inline-flex items-center gap-2 font-body text-sm text-porcelain/50 hover:text-alchemy-red transition-colors duration-300 group/link"
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
