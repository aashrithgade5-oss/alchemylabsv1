import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Layers, Sparkles, Clapperboard, Crown } from 'lucide-react';

const solutions = [
  {
    id: 'brand-architecture',
    title: 'Brand Architecture',
    icon: Layers,
    description:
      'Strategic brand systems engineered for AI-scale distribution. We build the foundations that let brands move at machine speed without losing human resonance.',
    outcomes: [
      'Multi-channel identity frameworks',
      'Voice & tone architecture',
      'Asset generation systems',
      'Brand governance protocols',
    ],
  },
  {
    id: 'cultural-strategy',
    title: 'Luxury & Cultural Strategy',
    icon: Crown,
    description:
      'Cultural intelligence that positions brands at the intersection of relevance and permanence. We decode taste and encode it into scalable systems.',
    outcomes: [
      'Cultural positioning analysis',
      'Luxury market penetration',
      'Heritage brand evolution',
      'Audience archetype mapping',
    ],
  },
  {
    id: 'ai-content',
    title: 'AI-Native Content Systems',
    icon: Sparkles,
    description:
      'Content infrastructure designed from the ground up for AI workflows. Programmatic creativity with editorial precision.',
    outcomes: [
      'AI content pipelines',
      'Prompt engineering frameworks',
      'Quality control systems',
      'Scale-to-craft ratios',
    ],
  },
  {
    id: 'campaigns',
    title: 'Cinematic Campaigns',
    icon: Clapperboard,
    description:
      'Visual storytelling that transcends platforms. From hero films to social micro-content, every frame serves the narrative.',
    outcomes: [
      'Hero campaign development',
      'Motion identity systems',
      'Social content suites',
      'Launch activation strategy',
    ],
  },
];

export const Solutions = () => {
  const [activeTab, setActiveTab] = useState(0);
  const activeSolution = solutions[activeTab];

  return (
    <section id="solutions" className="relative py-32 overflow-hidden section-gradient">
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
            What We Build
          </p>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl leading-display tracking-display">
            <span className="italic text-glow-subtle">Solutions</span>
            <span className="text-porcelain/80"> for the</span>
            <br />
            <span className="text-alchemy-red italic text-glow">Intelligence Era</span>
          </h2>
        </motion.div>

        {/* Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {solutions.map((solution, i) => (
            <button
              key={solution.id}
              onClick={() => setActiveTab(i)}
              className={`glass-tab ${activeTab === i ? 'active' : ''}`}
            >
              <solution.icon className="w-4 h-4 inline-block mr-2" />
              <span className="hidden sm:inline">{solution.title}</span>
              <span className="sm:hidden">{solution.title.split(' ')[0]}</span>
            </button>
          ))}
        </motion.div>

        {/* Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeSolution.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="grid lg:grid-cols-2 gap-8"
          >
            {/* Description */}
            <div className="glass-deep rounded-2xl p-8 md:p-10">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-xl glass-red flex items-center justify-center">
                  <activeSolution.icon className="w-6 h-6 text-alchemy-red" />
                </div>
                <h3 className="font-display text-2xl md:text-3xl italic">
                  {activeSolution.title}
                </h3>
              </div>
              <p className="font-body text-base md:text-lg text-porcelain/70 leading-relaxed mb-8 font-light">
                {activeSolution.description}
              </p>
              <a
                href="#contact"
                className="inline-flex items-center gap-2 font-body text-alchemy-red hover:text-crimson-bright transition-colors group"
              >
                <span>Discuss Your Project</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </a>
            </div>

            {/* Outcomes */}
            <div className="space-y-3">
              <p className="font-mono text-xs text-porcelain/40 tracking-label uppercase mb-6">
                Key Outcomes
              </p>
              {activeSolution.outcomes.map((outcome, i) => (
                <motion.div
                  key={outcome}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1, duration: 0.4 }}
                  className="glass p-5 rounded-xl flex items-center gap-4 group hover:glass-red transition-all duration-300"
                >
                  <span className="font-mono text-xs text-alchemy-red text-glow-subtle">
                    0{i + 1}
                  </span>
                  <span className="font-body text-porcelain/80">{outcome}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};
