import { motion } from 'framer-motion';
import { ArrowRight, Calendar } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';

const posts = [
  {
    id: 1,
    slug: 'architecture-of-ai-native-brands',
    date: 'Jan 2026',
    title: 'The Architecture of AI-Native Brands',
    excerpt: 'How the next generation of iconic brands will be built from the ground up with intelligence at their core.',
    category: 'Strategy',
    readTime: '8 min read',
  },
  {
    id: 2,
    slug: 'luxury-in-age-of-infinite-content',
    date: 'Dec 2025',
    title: 'Luxury in the Age of Infinite Content',
    excerpt: 'When everyone can create, scarcity becomes the new currency. A framework for maintaining exclusivity.',
    category: 'Culture',
    readTime: '6 min read',
  },
  {
    id: 3,
    slug: 'systems-thinking-creative-teams',
    date: 'Nov 2025',
    title: 'Systems Thinking for Creative Teams',
    excerpt: 'Moving beyond project-based work to build repeatable creative infrastructure.',
    category: 'Process',
    readTime: '10 min read',
  },
  {
    id: 4,
    slug: 'death-of-brand-guidelines-pdf',
    date: 'Oct 2025',
    title: 'The Death of the Brand Guidelines PDF',
    excerpt: 'Why static brand books are obsolete and what replaces them in the age of AI.',
    category: 'Branding',
    readTime: '7 min read',
  },
  {
    id: 5,
    slug: 'velocity-without-compromise',
    date: 'Sep 2025',
    title: 'Velocity Without Compromise',
    excerpt: 'How we ship in days what takes others months—without sacrificing craft.',
    category: 'Process',
    readTime: '5 min read',
  },
  {
    id: 6,
    slug: 'new-visual-language-of-ai',
    date: 'Aug 2025',
    title: 'The New Visual Language of AI',
    excerpt: 'Aesthetic patterns emerging from generative systems and what they mean for design.',
    category: 'Design',
    readTime: '12 min read',
  },
];

export const JournalPage = () => {
  return (
    <div className="min-h-screen bg-background grain-overlay">
      <Navigation />
      
      {/* Hero */}
      <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden section-gradient">
        <div className="absolute inset-0">
          <div className="absolute top-1/3 left-1/3 w-[500px] h-[500px] bg-alchemy-red/8 rounded-full blur-[150px]" />
        </div>
        
        <div className="relative z-10 max-w-5xl mx-auto px-6 md:px-12 text-center pt-32">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="font-mono text-xs text-alchemy-red tracking-label uppercase mb-6"
          >
            Perspectives
          </motion.p>
          
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="font-display text-5xl sm:text-6xl md:text-7xl leading-display tracking-display text-porcelain mb-8"
          >
            The{' '}
            <span className="italic text-alchemy-red">Journal</span>
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="font-body text-lg text-porcelain/50 max-w-xl mx-auto font-light"
          >
            Perspectives on brand, systems, and intelligence.
          </motion.p>
        </div>
      </section>

      {/* Posts Grid */}
      <section className="relative py-32 section-gradient">
        <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-12">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post, i) => (
              <motion.article
                key={post.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="glass-deep rounded-2xl p-8 group cursor-pointer hover:border-alchemy-red/30 transition-all duration-400 interactive-hover"
              >
                <div className="flex items-center gap-3 mb-4">
                  <span className="px-2 py-1 rounded-full bg-alchemy-red/10 text-alchemy-red font-mono text-[10px] tracking-label uppercase">
                    {post.category}
                  </span>
                  <span className="font-mono text-xs text-porcelain/40 tracking-label uppercase flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {post.date}
                  </span>
                </div>
                
                <h3 className="font-display text-xl md:text-2xl italic text-porcelain mb-4 group-hover:text-alchemy-red transition-colors duration-300">
                  {post.title}
                </h3>
                
                <p className="font-body text-sm text-porcelain/50 leading-relaxed mb-6 font-light">
                  {post.excerpt}
                </p>
                
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs text-porcelain/30">{post.readTime}</span>
                  <Link
                    to={`/journal/${post.slug}`}
                    className="inline-flex items-center gap-2 font-body text-sm text-porcelain/50 hover:text-alchemy-red transition-colors duration-300 group/link no-glow"
                  >
                    <span>Read</span>
                    <ArrowRight className="w-4 h-4 transition-transform group-hover/link:translate-x-1" />
                  </Link>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* Subscribe Section */}
      <section className="relative py-32 section-gradient">
        <div className="relative z-10 max-w-2xl mx-auto px-6 md:px-12">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="glass-deep rounded-3xl p-10 md:p-12 text-center"
          >
            <h2 className="font-display text-3xl md:text-4xl italic text-porcelain mb-4">
              Stay in the Loop
            </h2>
            <p className="font-body text-base text-porcelain/50 font-light mb-8">
              Get our perspectives on brand, strategy, and AI delivered to your inbox.
            </p>
            <form className="flex flex-col sm:flex-row gap-4">
              <input
                type="email"
                placeholder="your@email.com"
                className="glass-input flex-1"
              />
              <button type="submit" className="glass-cta-primary whitespace-nowrap">
                Subscribe
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default JournalPage;
