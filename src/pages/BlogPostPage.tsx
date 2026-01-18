import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Calendar, Clock, Share2, Twitter, Linkedin } from 'lucide-react';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';

// Mock full post data - in production this would come from a CMS or database
const postsData: Record<string, {
  title: string;
  date: string;
  category: string;
  readTime: string;
  author: { name: string; role: string; avatar?: string };
  heroImage?: string;
  content: string[];
}> = {
  'architecture-of-ai-native-brands': {
    title: 'The Architecture of AI-Native Brands',
    date: 'January 2026',
    category: 'Strategy',
    readTime: '8 min read',
    author: { name: 'Alchemy Labs', role: 'Brand Strategists' },
    content: [
      'The next generation of iconic brands will be built from the ground up with intelligence at their core. This isn\'t about adding AI features to existing products—it\'s about fundamentally reimagining what a brand can be when it\'s born intelligent.',
      'We\'re witnessing the emergence of brands that learn, adapt, and evolve in real-time. These AI-native organizations don\'t just respond to market changes—they anticipate them. They don\'t just personalize experiences—they create genuinely unique interactions for every customer.',
      '## The Shift from Static to Dynamic',
      'Traditional brand architecture relies on fixed guidelines, rigid systems, and periodic updates. AI-native brands operate differently. Their visual systems flex and adapt while maintaining coherent identity. Their voice evolves through millions of interactions while staying true to core values.',
      'Consider how a traditional luxury brand maintains exclusivity through scarcity. An AI-native luxury brand can maintain exclusivity while being infinitely accessible—creating unique, one-of-a-kind experiences at scale.',
      '## Building Blocks of AI-Native Branding',
      '**Adaptive Visual Systems**: Identity elements that respond to context, user preference, and real-time data while maintaining recognizability.',
      '**Conversational Brand Voice**: Not chatbots, but genuine brand personalities that can engage authentically across any channel or format.',
      '**Predictive Experience Design**: Anticipating customer needs before they\'re articulated, creating moments of unexpected delight.',
      '**Living Brand Guidelines**: Documentation that evolves, learns from implementation, and provides contextual guidance.',
      '## The Competitive Imperative',
      'Companies that fail to embrace AI-native brand architecture will find themselves at an insurmountable disadvantage. The gap between intelligent brands and traditional ones will only widen as AI capabilities accelerate.',
      'The question isn\'t whether your brand should become AI-native. The question is how quickly you can make the transition while your competitors hesitate.',
    ],
  },
  'luxury-in-age-of-infinite-content': {
    title: 'Luxury in the Age of Infinite Content',
    date: 'December 2025',
    category: 'Culture',
    readTime: '6 min read',
    author: { name: 'Alchemy Labs', role: 'Cultural Analysts' },
    content: [
      'When everyone can create, scarcity becomes the new currency. The democratization of creative tools has fundamentally altered the landscape of luxury branding.',
      'In a world of infinite content, true luxury lies not in production capability, but in curatorial excellence and authentic human craft.',
      '## The Paradox of Abundance',
      'AI can now generate stunning visuals, compelling copy, and even strategic frameworks in seconds. This abundance creates a paradox: as creation becomes easier, discernment becomes more valuable.',
      'Luxury brands must navigate this paradox carefully. The answer isn\'t to reject AI tools—it\'s to use them in ways that amplify rather than replace human judgment and craft.',
      '## A New Framework for Exclusivity',
      'Traditional luxury relied on material scarcity—rare materials, limited production, exclusive access. The new luxury framework relies on experiential scarcity—moments that cannot be replicated, relationships that cannot be automated.',
      '**Time as Luxury**: In an age of instant everything, taking time becomes the ultimate luxury.',
      '**Human Touch**: Genuine human craft and attention become differentiators.',
      '**Curation Over Creation**: The ability to select and contextualize matters more than the ability to produce.',
    ],
  },
  'systems-thinking-creative-teams': {
    title: 'Systems Thinking for Creative Teams',
    date: 'November 2025',
    category: 'Process',
    readTime: '10 min read',
    author: { name: 'Alchemy Labs', role: 'Process Architects' },
    content: [
      'Moving beyond project-based work to build repeatable creative infrastructure. The most effective creative organizations aren\'t just talented—they\'re systematic.',
      'This piece explores how to design creative systems that compound over time, turning every project into an investment in future capability.',
      '## The Limits of Project Thinking',
      'Most creative agencies operate in project mode: brief comes in, team assembles, work happens, delivery occurs, team disperses. Each project starts from scratch.',
      'This approach has fundamental limitations. Knowledge doesn\'t accumulate. Processes don\'t improve. Each project is an expense rather than an investment.',
      '## Building Creative Infrastructure',
      'The alternative is to think systematically about creative work. Every project should contribute to building assets, processes, and capabilities that make future work faster, better, and more consistent.',
      '**Component Libraries**: Reusable design elements that accelerate production while ensuring consistency.',
      '**Process Templates**: Documented workflows that capture institutional knowledge and enable scaling.',
      '**Quality Frameworks**: Systematic approaches to evaluation that reduce subjectivity and improve outcomes.',
    ],
  },
  'death-of-brand-guidelines-pdf': {
    title: 'The Death of the Brand Guidelines PDF',
    date: 'October 2025',
    category: 'Branding',
    readTime: '7 min read',
    author: { name: 'Alchemy Labs', role: 'Brand Architects' },
    content: [
      'Why static brand books are obsolete and what replaces them in the age of AI. The traditional PDF brand guidelines have served their purpose for decades, but they\'re fundamentally incompatible with how modern brands operate.',
      '## The Static Document Problem',
      'Brand guidelines PDFs are frozen in time. The moment they\'re published, they begin to age. They can\'t adapt to new contexts, answer specific questions, or evolve with the brand.',
      'Worse, they\'re passive. They require someone to read, interpret, and apply them correctly. In practice, they\'re often ignored or misunderstood.',
      '## The Living Brand System',
      'The replacement isn\'t just a digital version of the same document. It\'s an entirely new category: the living brand system.',
      'Living brand systems are interactive, contextual, and intelligent. They don\'t just describe rules—they help apply them. They don\'t just show examples—they generate them.',
      '**Contextual Guidance**: Instead of generic rules, provide specific recommendations based on the actual use case.',
      '**Generative Examples**: Instead of limited examples, generate infinite contextually-appropriate applications.',
      '**Real-Time Updates**: Instead of periodic revisions, evolve continuously based on usage and feedback.',
    ],
  },
  'velocity-without-compromise': {
    title: 'Velocity Without Compromise',
    date: 'September 2025',
    category: 'Process',
    readTime: '5 min read',
    author: { name: 'Alchemy Labs', role: 'Efficiency Experts' },
    content: [
      'How we ship in days what takes others months—without sacrificing craft. Speed and quality are not inherently opposed. The organizations that move fastest are often the ones that produce the best work.',
      '## The False Tradeoff',
      'The conventional wisdom says you can have speed or quality, but not both. This is only true if you\'re operating with conventional approaches.',
      'With the right systems, tools, and mindset, speed becomes an enabler of quality rather than its enemy.',
      '## Principles of High-Velocity Craft',
      '**Parallel over Sequential**: Run workstreams simultaneously rather than in sequence.',
      '**Decide Fast, Iterate Faster**: Make decisions quickly, then refine through rapid iteration.',
      '**Invest in Systems**: Time spent building reusable systems pays compound returns.',
      '**Ruthless Prioritization**: Do fewer things at higher quality rather than more things poorly.',
    ],
  },
  'new-visual-language-of-ai': {
    title: 'The New Visual Language of AI',
    date: 'August 2025',
    category: 'Design',
    readTime: '12 min read',
    author: { name: 'Alchemy Labs', role: 'Design Directors' },
    content: [
      'Aesthetic patterns emerging from generative systems and what they mean for design. AI-generated imagery is developing its own visual vocabulary—one that\'s neither purely human nor purely algorithmic.',
      '## Emergent Aesthetics',
      'When you study thousands of AI-generated images, patterns emerge. Certain color relationships, compositional tendencies, and textural qualities appear with striking regularity.',
      'These aren\'t bugs or limitations—they\'re the beginnings of a new aesthetic vocabulary that designers must understand and leverage.',
      '## Implications for Design Practice',
      'Understanding AI\'s visual tendencies enables designers to work with these systems more effectively. You can lean into their strengths, work around their limitations, and create work that feels genuinely novel.',
      '**Hybrid Workflows**: Combining AI generation with human refinement to achieve results neither could accomplish alone.',
      '**Prompt Engineering as Design Skill**: The ability to guide AI systems becomes as important as traditional design skills.',
      '**Curation as Creation**: Selecting and refining from AI outputs is itself a creative act.',
    ],
  },
};

const slugify = (title: string) => 
  title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

export const BlogPostPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const post = slug ? postsData[slug] : null;

  if (!post) {
    return (
      <div className="min-h-screen bg-background grain-overlay flex items-center justify-center">
        <Navigation />
        <div className="text-center">
          <h1 className="font-display text-4xl text-porcelain mb-4">Post Not Found</h1>
          <Link to="/journal" className="text-alchemy-red hover:underline">
            Back to Journal
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background grain-overlay">
      <Navigation />

      {/* Hero */}
      <section className="relative min-h-[50vh] flex items-end overflow-hidden section-gradient">
        <div className="absolute inset-0">
          <div className="absolute top-1/3 left-1/4 w-[600px] h-[600px] bg-alchemy-red/8 rounded-full blur-[180px]" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-6 md:px-12 pb-16 pt-40">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Link
              to="/journal"
              className="inline-flex items-center gap-2 font-mono text-xs text-porcelain/50 hover:text-alchemy-red transition-colors mb-8 no-glow"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Journal
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="flex items-center gap-4 mb-6"
          >
            <span className="px-3 py-1 rounded-full bg-alchemy-red/15 text-alchemy-red font-mono text-xs tracking-label uppercase">
              {post.category}
            </span>
            <span className="flex items-center gap-2 font-mono text-xs text-porcelain/50">
              <Calendar className="w-3 h-3" />
              {post.date}
            </span>
            <span className="flex items-center gap-2 font-mono text-xs text-porcelain/50">
              <Clock className="w-3 h-3" />
              {post.readTime}
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-display text-4xl sm:text-5xl md:text-6xl leading-display tracking-display text-porcelain"
          >
            {post.title}
          </motion.h1>
        </div>
      </section>

      {/* Content */}
      <section className="relative py-20">
        <div className="relative z-10 max-w-3xl mx-auto px-6 md:px-12">
          {/* Author */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex items-center gap-4 pb-10 mb-10 border-b border-porcelain/10"
          >
            <div className="w-12 h-12 rounded-full bg-alchemy-red/15 flex items-center justify-center">
              <span className="font-display text-lg text-alchemy-red">A</span>
            </div>
            <div>
              <p className="font-body text-base text-porcelain">{post.author.name}</p>
              <p className="font-mono text-xs text-porcelain/50">{post.author.role}</p>
            </div>
            <div className="ml-auto flex items-center gap-3">
              <button className="w-10 h-10 rounded-full glass-deep flex items-center justify-center hover:border-alchemy-red/30 transition-colors">
                <Share2 className="w-4 h-4 text-porcelain/50" />
              </button>
              <button className="w-10 h-10 rounded-full glass-deep flex items-center justify-center hover:border-alchemy-red/30 transition-colors">
                <Twitter className="w-4 h-4 text-porcelain/50" />
              </button>
              <button className="w-10 h-10 rounded-full glass-deep flex items-center justify-center hover:border-alchemy-red/30 transition-colors">
                <Linkedin className="w-4 h-4 text-porcelain/50" />
              </button>
            </div>
          </motion.div>

          {/* Article Content */}
          <motion.article
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="prose prose-invert prose-lg max-w-none"
          >
            {post.content.map((paragraph, i) => {
              if (paragraph.startsWith('## ')) {
                return (
                  <h2
                    key={i}
                    className="font-display text-2xl md:text-3xl text-porcelain mt-12 mb-6 italic"
                  >
                    {paragraph.replace('## ', '')}
                  </h2>
                );
              }
              if (paragraph.startsWith('**') && paragraph.endsWith('**')) {
                return null; // Skip standalone bold lines
              }
              if (paragraph.includes('**')) {
                // Handle paragraphs with bold text
                const parts = paragraph.split(/\*\*(.*?)\*\*/g);
                return (
                  <p
                    key={i}
                    className="font-body text-lg text-porcelain/70 leading-relaxed mb-6 font-light"
                  >
                    {parts.map((part, j) => 
                      j % 2 === 1 ? (
                        <strong key={j} className="text-porcelain font-medium">{part}</strong>
                      ) : (
                        part
                      )
                    )}
                  </p>
                );
              }
              return (
                <p
                  key={i}
                  className="font-body text-lg text-porcelain/70 leading-relaxed mb-6 font-light"
                >
                  {paragraph}
                </p>
              );
            })}
          </motion.article>

          {/* Back Link */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-16 pt-10 border-t border-porcelain/10"
          >
            <Link
              to="/journal"
              className="inline-flex items-center gap-2 font-body text-base text-porcelain/50 hover:text-alchemy-red transition-colors no-glow"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to all articles
            </Link>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default BlogPostPage;
