import { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Calendar, MessageCircle, Instagram, Mail } from 'lucide-react';
import { aiServices, brandingServices, consultationServices } from '@/data/services';

export const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    service: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  return (
    <section id="contact" className="relative py-32 overflow-hidden section-gradient">
      {/* Extra red glow */}
      <div className="absolute inset-0 bg-gradient-radial from-deep-crimson/10 via-transparent to-transparent" />

      <div className="relative z-10 max-w-5xl mx-auto px-6 md:px-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-display tracking-display text-porcelain">
            Let's build something
            <br />
            <span className="italic text-alchemy-red">inevitable.</span>
          </h2>
          <p className="font-body text-base text-porcelain/50 mt-6 font-light">
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
          className="glass-deep rounded-3xl p-8 md:p-12 mb-12"
        >
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            {/* Name */}
            <div className="space-y-2">
              <label className="font-mono text-xs text-porcelain/50 tracking-label uppercase">
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
              <label className="font-mono text-xs text-porcelain/50 tracking-label uppercase">
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
            <label className="font-mono text-xs text-porcelain/50 tracking-label uppercase">
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

          {/* Service Selection */}
          <div className="space-y-2 mb-6">
            <label className="font-mono text-xs text-porcelain/50 tracking-label uppercase">
              Desired Service
            </label>
            <select
              value={formData.service}
              onChange={(e) =>
                setFormData({ ...formData, service: e.target.value })
              }
              className="glass-input cursor-pointer"
            >
              <option value="" disabled>
                Select a service...
              </option>
              <optgroup label="AI Solutions">
                {aiServices.map((service) => (
                  <option key={service.id} value={service.id}>
                    {service.title}
                  </option>
                ))}
              </optgroup>
              <optgroup label="Branding Solutions">
                {brandingServices.map((service) => (
                  <option key={service.id} value={service.id}>
                    {service.title}
                  </option>
                ))}
              </optgroup>
              <optgroup label="Consultation">
                {consultationServices.map((service) => (
                  <option key={service.id} value={service.id}>
                    {service.title}
                  </option>
                ))}
              </optgroup>
              <option value="not-sure">Not Sure / Multiple Services</option>
            </select>
          </div>

          {/* Message */}
          <div className="space-y-2 mb-8">
            <label className="font-mono text-xs text-porcelain/50 tracking-label uppercase">
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
              className="inline-flex items-center gap-2 px-6 py-4 font-body text-porcelain/50 hover:text-alchemy-red transition-colors group"
            >
              <Calendar className="w-4 h-4" />
              <span>Book a Call Instead</span>
            </a>
          </div>

          {/* Reassurance */}
          <p className="font-mono text-xs text-center text-porcelain/40 mt-8">
            Selective partnerships. Fast replies. No spam.
          </p>
        </motion.form>

        {/* Contact Methods */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="grid md:grid-cols-3 gap-6"
        >
          {/* WhatsApp */}
          <motion.a
            href="https://wa.me/917794912315"
            target="_blank"
            rel="noopener noreferrer"
            className="glass-deep rounded-2xl p-8 text-center hover:border-alchemy-red/30 transition-all duration-300 group"
            whileHover={{ scale: 1.02 }}
          >
            <div className="w-14 h-14 rounded-xl bg-green-500/10 flex items-center justify-center mx-auto mb-4 group-hover:shadow-[0_0_20px_rgba(34,197,94,0.3)] transition-shadow">
              <MessageCircle className="w-7 h-7 text-green-500" />
            </div>
            <h3 className="font-display text-lg italic text-porcelain mb-1">Text Us</h3>
            <p className="font-body text-sm text-porcelain/50 mb-3">WhatsApp</p>
            <p className="font-mono text-sm text-alchemy-red">+91 7794912315</p>
          </motion.a>

          {/* Instagram */}
          <motion.a
            href="https://instagram.com/alchemylabs"
            target="_blank"
            rel="noopener noreferrer"
            className="glass-deep rounded-2xl p-8 text-center hover:border-alchemy-red/30 transition-all duration-300 group"
            whileHover={{ scale: 1.02 }}
          >
            <div className="w-14 h-14 rounded-xl bg-pink-500/10 flex items-center justify-center mx-auto mb-4 group-hover:shadow-[0_0_20px_rgba(236,72,153,0.3)] transition-shadow">
              <Instagram className="w-7 h-7 text-pink-500" />
            </div>
            <h3 className="font-display text-lg italic text-porcelain mb-1">DM Us</h3>
            <p className="font-body text-sm text-porcelain/50 mb-3">Instagram</p>
            <p className="font-mono text-sm text-alchemy-red">@alchemylabs</p>
          </motion.a>

          {/* Email */}
          <motion.a
            href="mailto:brandalchemie@gmail.com"
            className="glass-deep rounded-2xl p-8 text-center hover:border-alchemy-red/30 transition-all duration-300 group"
            whileHover={{ scale: 1.02 }}
          >
            <div className="w-14 h-14 rounded-xl bg-alchemy-red/10 flex items-center justify-center mx-auto mb-4 group-hover:shadow-[0_0_20px_rgba(225,6,19,0.3)] transition-shadow">
              <Mail className="w-7 h-7 text-alchemy-red" />
            </div>
            <h3 className="font-display text-lg italic text-porcelain mb-1">Email Us</h3>
            <p className="font-body text-sm text-porcelain/50 mb-3">Direct Mail</p>
            <p className="font-mono text-sm text-alchemy-red">brandalchemie@gmail.com</p>
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};
