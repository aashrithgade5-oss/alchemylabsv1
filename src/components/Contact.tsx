import { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Calendar } from 'lucide-react';

export const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    budget: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted:', formData);
  };

  return (
    <section id="contact" className="relative py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-alchemy-black" />
      <div className="absolute inset-0 bg-gradient-radial from-deep-crimson/20 via-transparent to-transparent" />

      <div className="relative z-10 max-w-4xl mx-auto px-6 md:px-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-display tracking-display">
            Let's build something
            <br />
            <span className="text-alchemy-red">inevitable.</span>
          </h2>
          <p className="text-xl text-porcelain/70 mt-6">
            Brief us in under 3 minutes.
          </p>
        </motion.div>

        {/* Form */}
        <motion.form
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          onSubmit={handleSubmit}
          className="glass-deep rounded-2xl p-8 md:p-12"
        >
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            {/* Name */}
            <div className="space-y-2">
              <label className="font-mono text-xs text-porcelain/60 tracking-label uppercase">
                Your Name
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                placeholder="Alex Rivera"
                className="glass-input"
                required
              />
            </div>

            {/* Email */}
            <div className="space-y-2">
              <label className="font-mono text-xs text-porcelain/60 tracking-label uppercase">
                Email
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                placeholder="alex@company.com"
                className="glass-input"
                required
              />
            </div>
          </div>

          {/* Company */}
          <div className="space-y-2 mb-6">
            <label className="font-mono text-xs text-porcelain/60 tracking-label uppercase">
              Company
            </label>
            <input
              type="text"
              value={formData.company}
              onChange={(e) =>
                setFormData({ ...formData, company: e.target.value })
              }
              placeholder="Your Company Name"
              className="glass-input"
            />
          </div>

          {/* Budget */}
          <div className="space-y-2 mb-6">
            <label className="font-mono text-xs text-porcelain/60 tracking-label uppercase">
              Investment Range
            </label>
            <select
              value={formData.budget}
              onChange={(e) =>
                setFormData({ ...formData, budget: e.target.value })
              }
              className="glass-input cursor-pointer"
            >
              <option value="" disabled>
                Select a range
              </option>
              <option value="25-50k">$25K – $50K</option>
              <option value="50-100k">$50K – $100K</option>
              <option value="100-250k">$100K – $250K</option>
              <option value="250k+">$250K+</option>
            </select>
          </div>

          {/* Message */}
          <div className="space-y-2 mb-8">
            <label className="font-mono text-xs text-porcelain/60 tracking-label uppercase">
              What are we building?
            </label>
            <textarea
              value={formData.message}
              onChange={(e) =>
                setFormData({ ...formData, message: e.target.value })
              }
              placeholder="Tell us about your vision..."
              rows={4}
              className="glass-input resize-none"
              required
            />
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <motion.button
              type="submit"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="glass-cta-primary w-full sm:w-auto justify-center"
            >
              <span>Send Brief</span>
              <Send className="w-4 h-4" />
            </motion.button>

            <a
              href="#"
              className="inline-flex items-center gap-2 px-6 py-4 text-porcelain/70 hover:text-alchemy-red transition-colors group"
            >
              <Calendar className="w-4 h-4" />
              <span>Book a Call Instead</span>
            </a>
          </div>

          {/* Reassurance */}
          <p className="font-mono text-xs text-center text-porcelain/50 mt-8">
            Selective partnerships. Fast replies. No spam.
          </p>
        </motion.form>
      </div>
    </section>
  );
};
