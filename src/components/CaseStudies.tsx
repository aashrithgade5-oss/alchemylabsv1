import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import caseStudy1 from '@/assets/case-study-1.jpg';
import caseStudy2 from '@/assets/case-study-2.jpg';
import caseStudy3 from '@/assets/case-study-3.jpg';

const projects = [
  {
    id: 1,
    title: 'Maison Élégance',
    category: 'Brand Architecture',
    description: 'Complete brand system for a European luxury fashion house entering the Asian market.',
    image: caseStudy1,
    featured: true,
  },
  {
    id: 2,
    title: 'Atelier Moderne',
    category: 'Cultural Strategy',
    description: 'Positioning strategy for a contemporary art museum rebrand.',
    image: caseStudy2,
    featured: false,
  },
  {
    id: 3,
    title: 'Nexus Technologies',
    category: 'AI Content Systems',
    description: 'Scalable content infrastructure for a Series B tech startup.',
    image: caseStudy3,
    featured: false,
  },
];

export const CaseStudies = () => {
  return (
    <section id="work" className="relative py-32 overflow-hidden">
      <div className="absolute inset-0 bg-alchemy-black" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col md:flex-row md:items-end justify-between mb-16"
        >
          <div>
            <p className="font-mono text-xs text-alchemy-red tracking-label uppercase mb-4">
              Selected Work
            </p>
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl leading-display tracking-display">
              Case Studies
            </h2>
          </div>
          <a
            href="#"
            className="mt-6 md:mt-0 inline-flex items-center gap-2 text-porcelain/70 hover:text-porcelain transition-colors group"
          >
            <span>View All Projects</span>
            <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6">
          {projects.map((project, i) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6, delay: i * 0.15, ease: [0.22, 1, 0.36, 1] }}
              className={`group relative rounded-xl overflow-hidden cursor-pointer ${
                project.featured
                  ? 'md:col-span-2 lg:col-span-8 lg:row-span-2'
                  : 'lg:col-span-4'
              }`}
            >
              {/* Image */}
              <div
                className={`relative overflow-hidden ${
                  project.featured ? 'aspect-[16/10]' : 'aspect-[4/5]'
                }`}
              >
                <motion.img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-alchemy-black via-alchemy-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                {/* Content */}
                <div className="absolute inset-0 p-6 md:p-8 flex flex-col justify-end opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0">
                  <p className="font-mono text-xs text-alchemy-red tracking-label uppercase mb-2">
                    {project.category}
                  </p>
                  <h3 className="font-display text-2xl md:text-3xl mb-2">
                    {project.title}
                  </h3>
                  <p className="text-porcelain/70 text-sm mb-4 max-w-md">
                    {project.description}
                  </p>
                  <div className="inline-flex items-center gap-2 text-alchemy-red">
                    <span className="text-sm font-medium">View Case</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </div>
                </div>
              </div>

              {/* Border glow on hover */}
              <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                <div className="absolute inset-0 rounded-xl border border-alchemy-red/30" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
