'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft, Calendar, Clock, Share2, Twitter, Linkedin } from 'lucide-react';

import { postsData } from '@/data/journalPosts';

const slugify = (title: string) => 
  title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

export const BlogPostPage = () => {
  const pathname = usePathname();
  const slug = pathname.split('/').pop() || '';
  const post = slug ? postsData[slug] : null;

  if (!post) {
    return (
      <div className="min-h-screen bg-background grain-overlay flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-headline text-4xl text-porcelain mb-4">Post Not Found</h1>
          <Link href="/journal" className="text-alchemy-red hover:underline">
            Back to Journal
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background grain-overlay">

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
              href="/journal"
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
            className="font-headline text-4xl sm:text-5xl md:text-6xl leading-display tracking-display text-porcelain"
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
              <span className="font-headline text-lg text-alchemy-red">A</span>
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
                    className="font-headline text-2xl md:text-3xl text-porcelain mt-12 mb-6"
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
              href="/journal"
              className="inline-flex items-center gap-2 font-body text-base text-porcelain/50 hover:text-alchemy-red transition-colors no-glow"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to all articles
            </Link>
          </motion.div>
        </div>
      </section>

    </div>
  );
};

export default BlogPostPage;
