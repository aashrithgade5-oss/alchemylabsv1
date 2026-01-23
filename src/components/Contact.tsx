import { useState, useCallback, memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Calendar, MessageCircle, Instagram, Mail, Loader2, Check, ArrowRight, Home } from 'lucide-react';
import { Link } from 'react-router-dom';
import { MagneticButton } from './MagneticButton';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { TurnstileWidget } from './TurnstileWidget';

export const Contact = memo(() => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    service: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  const handleTurnstileVerify = useCallback((token: string) => {
    setTurnstileToken(token);
  }, []);

  const handleTurnstileError = useCallback(() => {
    setTurnstileToken(null);
    toast.error('Security verification failed. Please refresh and try again.');
  }, []);

  const handleTurnstileExpire = useCallback(() => {
    setTurnstileToken(null);
  }, []);

  const validateField = (name: string, value: string) => {
    const errors: Record<string, string> = { ...fieldErrors };
    
    if (name === 'email' && value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      errors.email = 'Please enter a valid email';
    } else if (name === 'email') {
      delete errors.email;
    }
    
    if (name === 'name' && value && value.length < 2) {
      errors.name = 'Name is too short';
    } else if (name === 'name') {
      delete errors.name;
    }
    
    setFieldErrors(errors);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!turnstileToken) {
      toast.error('Please complete the security verification.');
      return;
    }
    
    setIsSubmitting(true);

    try {
      const { error: dbError } = await supabase
        .from('contact_submissions')
        .insert({
          name: formData.name,
          email: formData.email,
          company: formData.company || null,
          service: formData.service || null,
          message: formData.message,
        });

      if (dbError) throw dbError;

      const { error: emailError } = await supabase.functions.invoke('send-contact-email', {
        body: {
          name: formData.name,
          email: formData.email,
          company: formData.company,
          service: formData.service,
          message: formData.message,
          turnstileToken: turnstileToken,
        },
      });

      if (emailError) {
        console.error('Email notification error:', emailError);
      }

      setIsSubmitted(true);
      setTurnstileToken(null);
    } catch (error) {
      console.error('Error submitting form:', error);
      toast.error('Something went wrong. Please try again.');
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setFormData({ name: '', email: '', company: '', service: '', message: '' });
    setIsSubmitted(false);
    setIsSubmitting(false);
  };

  return (
    <section id="contact" className="relative py-32 overflow-hidden section-gradient">
      <div className="absolute inset-0 bg-gradient-radial from-deep-crimson/8 via-transparent to-transparent" />

      <div className="relative z-10 max-w-5xl mx-auto px-6 md:px-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-12"
        >
          <span className="inline-block px-4 py-2 rounded-full backdrop-blur-md mb-6"
            style={{
              background: 'linear-gradient(135deg, rgba(220, 38, 38, 0.15) 0%, rgba(255, 255, 255, 0.05) 100%)',
              border: '1px solid rgba(220, 38, 38, 0.3)',
            }}
          >
            <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-porcelain/80">
              Get Started
            </span>
          </span>
          <h2 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-[1.05] tracking-[-0.02em] text-porcelain">
            Let's build something
            <br />
            <span className="italic text-alchemy-red">inevitable.</span>
          </h2>
          <p className="font-body text-base text-porcelain/50 mt-6 font-light">
            Brief us in under 3 minutes.
          </p>
        </motion.div>

        {/* Form / Success State */}
        <AnimatePresence mode="wait">
          {!isSubmitted ? (
            <motion.form
              key="form"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              onSubmit={handleSubmit}
              className="glass-deep rounded-2xl p-6 md:p-10 mb-10"
            >
              <div className="grid md:grid-cols-2 gap-5 mb-5">
                {/* Name */}
                <div className="space-y-2">
                  <label className="font-mono text-[10px] text-porcelain/50 tracking-[0.15em] uppercase">
                    Your Name
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => {
                      setFormData({ ...formData, name: e.target.value });
                      validateField('name', e.target.value);
                    }}
                    placeholder="Alex Rivera"
                    className={`glass-input ${fieldErrors.name ? 'border-alchemy-red/50' : ''}`}
                    required
                    disabled={isSubmitting}
                  />
                  {fieldErrors.name && (
                    <p className="font-mono text-[10px] text-alchemy-red">{fieldErrors.name}</p>
                  )}
                </div>

                {/* Email */}
                <div className="space-y-2">
                  <label className="font-mono text-[10px] text-porcelain/50 tracking-[0.15em] uppercase">
                    Email
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => {
                      setFormData({ ...formData, email: e.target.value });
                      validateField('email', e.target.value);
                    }}
                    placeholder="alex@company.com"
                    className={`glass-input ${fieldErrors.email ? 'border-alchemy-red/50' : ''}`}
                    required
                    disabled={isSubmitting}
                  />
                  {fieldErrors.email && (
                    <p className="font-mono text-[10px] text-alchemy-red">{fieldErrors.email}</p>
                  )}
                </div>
              </div>

              {/* Company */}
              <div className="space-y-2 mb-5">
                <label className="font-mono text-[10px] text-porcelain/50 tracking-[0.15em] uppercase">
                  Company
                </label>
                <input
                  type="text"
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  placeholder="Your Company Name"
                  className="glass-input"
                  disabled={isSubmitting}
                />
              </div>

              {/* Service Selection */}
              <div className="space-y-2 mb-5">
                <label className="font-mono text-[10px] text-porcelain/50 tracking-[0.15em] uppercase">
                  Interested In
                </label>
                <select
                  value={formData.service}
                  onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                  className="glass-input cursor-pointer select-dropdown"
                  disabled={isSubmitting}
                >
                  <option value="" disabled>Select a pillar...</option>
                  <option value="ai-solutions">AI Product Studio (24h build)</option>
                  <option value="branding-solutions">Brand Systems</option>
                  <option value="consultation">Advisory</option>
                  <option value="not-sure">Not Sure / Multiple</option>
                </select>
              </div>

              {/* Message */}
              <div className="space-y-2 mb-6">
                <label className="font-mono text-[10px] text-porcelain/50 tracking-[0.15em] uppercase">
                  What are we building?
                </label>
                <textarea
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Tell us about your vision..."
                  rows={4}
                  className="glass-input resize-none"
                  required
                  disabled={isSubmitting}
                />
              </div>

              {/* Turnstile */}
              <TurnstileWidget 
                onVerify={handleTurnstileVerify}
                onError={handleTurnstileError}
                onExpire={handleTurnstileExpire}
              />

              {/* Actions */}
              <div className="flex flex-col sm:flex-row items-center gap-4">
                <MagneticButton
                  type="submit"
                  className="glass-cta-primary w-full sm:w-auto justify-center relative overflow-hidden"
                  disabled={isSubmitting || !turnstileToken || Object.keys(fieldErrors).length > 0}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Sending...</span>
                    </>
                  ) : (
                    <>
                      <span>Send Brief</span>
                      <Send className="w-4 h-4" />
                    </>
                  )}
                </MagneticButton>

                <Link
                  to="/book-sprint"
                  className="inline-flex items-center gap-2 px-6 py-4 font-body text-porcelain/50 hover:text-alchemy-red transition-colors group no-glow"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Book a Call Instead</span>
                </Link>
              </div>

              {/* After submit microtext */}
              <p className="font-mono text-[10px] text-center text-porcelain/40 mt-6">
                Next: we reply within 24h with a tailored plan and suggested sprint slot.
              </p>
            </motion.form>
          ) : (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              className="glass-deep rounded-2xl p-10 md:p-16 text-center mb-10"
            >
              <div 
                className="w-16 h-16 rounded-full mx-auto mb-6 flex items-center justify-center"
                style={{
                  background: 'linear-gradient(135deg, rgba(34, 197, 94, 0.2) 0%, rgba(34, 197, 94, 0.05) 100%)',
                  border: '1px solid rgba(34, 197, 94, 0.3)',
                }}
              >
                <Check className="w-8 h-8 text-green-500" />
              </div>
              
              <h3 className="font-display text-3xl md:text-4xl italic text-porcelain mb-3">
                Received.
              </h3>
              <p className="font-body text-base text-porcelain/60 font-light mb-8">
                We'll reply within 24 hours with a tailored plan.
              </p>
              
              <div className="flex flex-wrap justify-center gap-4">
                <Link
                  to="/"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-body text-sm text-porcelain/60 hover:text-porcelain transition-colors"
                  style={{
                    background: 'rgba(255, 255, 255, 0.04)',
                    border: '1px solid rgba(255, 255, 255, 0.08)',
                  }}
                  onClick={resetForm}
                >
                  <Home className="w-4 h-4" />
                  <span>Back to Home</span>
                </Link>
                
                <Link
                  to="/book-sprint"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-body text-sm transition-all duration-300"
                  style={{
                    background: 'linear-gradient(135deg, rgba(220, 38, 38, 0.2) 0%, rgba(220, 38, 38, 0.08) 100%)',
                    border: '1px solid rgba(220, 38, 38, 0.4)',
                  }}
                >
                  <Calendar className="w-4 h-4 text-porcelain" />
                  <span className="text-porcelain">Book a Call Now</span>
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Contact Methods */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="grid md:grid-cols-3 gap-5"
        >
          {/* WhatsApp */}
          <motion.a
            href="https://wa.me/917794912315"
            target="_blank"
            rel="noopener noreferrer"
            className="glass-deep rounded-xl p-6 text-center hover:border-green-500/30 transition-all duration-300 group"
            whileHover={{ y: -4 }}
          >
            <div className="w-12 h-12 rounded-xl bg-green-500/10 flex items-center justify-center mx-auto mb-3 group-hover:shadow-[0_0_15px_rgba(34,197,94,0.25)] transition-shadow">
              <MessageCircle className="w-6 h-6 text-green-500" />
            </div>
            <h3 className="font-display text-base italic text-porcelain mb-1">Text Us</h3>
            <p className="font-mono text-[10px] text-alchemy-red">+91 7794912315</p>
          </motion.a>

          {/* Instagram */}
          <motion.a
            href="https://instagram.com/alchemylabs"
            target="_blank"
            rel="noopener noreferrer"
            className="glass-deep rounded-xl p-6 text-center hover:border-pink-500/30 transition-all duration-300 group"
            whileHover={{ y: -4 }}
          >
            <div className="w-12 h-12 rounded-xl bg-pink-500/10 flex items-center justify-center mx-auto mb-3 group-hover:shadow-[0_0_15px_rgba(236,72,153,0.25)] transition-shadow">
              <Instagram className="w-6 h-6 text-pink-500" />
            </div>
            <h3 className="font-display text-base italic text-porcelain mb-1">DM Us</h3>
            <p className="font-mono text-[10px] text-alchemy-red">@alchemylabs</p>
          </motion.a>

          {/* Email */}
          <motion.a
            href="mailto:brandalchemie@gmail.com"
            className="glass-deep rounded-xl p-6 text-center hover:border-alchemy-red/30 transition-all duration-300 group"
            whileHover={{ y: -4 }}
          >
            <div className="w-12 h-12 rounded-xl bg-alchemy-red/10 flex items-center justify-center mx-auto mb-3 group-hover:shadow-[0_0_15px_rgba(220,38,38,0.25)] transition-shadow">
              <Mail className="w-6 h-6 text-alchemy-red" />
            </div>
            <h3 className="font-display text-base italic text-porcelain mb-1">Email Us</h3>
            <p className="font-mono text-[10px] text-alchemy-red">brandalchemie@gmail.com</p>
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
});

Contact.displayName = 'Contact';
