import { useState, useCallback, memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Calendar, MessageCircle, Instagram, Mail, Loader2, Check, Home, Linkedin, Youtube, Copy } from 'lucide-react';
import { Link } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { TurnstileWidget } from './TurnstileWidget';
import { socialLinks } from './Footer';

const serviceOptions = [
  { value: '', label: 'Select what you need...', disabled: true },
  { value: 'fast-24h', label: 'Fast — 24h AI Build', group: 'pillars' },
  { value: 'foundation-brand', label: 'Foundation — Brand System', group: 'pillars' },
  { value: 'clarity-advisory', label: 'Clarity — Strategy Advisory', group: 'pillars' },
  { value: 'not-sure', label: 'Not sure yet — Help me figure out', group: 'other' },
  { value: 'specific-request', label: 'Specific request — Direct to founder', group: 'other' },
];

const CALENDLY_URL = 'https://calendly.com/alchemylabs-work/30min';

const copyToClipboard = (text: string) => {
  navigator.clipboard.writeText(text).then(() => {
    toast.success('Copied to clipboard');
  });
};

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

  const handleServiceChange = (value: string) => {
    if (value === 'specific-request') {
      window.location.href = `mailto:${socialLinks.founderEmail}?subject=Specific Request - Alchemy Labs`;
      return;
    }
    setFormData({ ...formData, service: value });
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
    <section id="contact" className="relative pt-24 md:pt-40 pb-20 md:pb-32 overflow-hidden">
      <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-12">
        <div className="grid lg:grid-cols-5 gap-12 lg:gap-16">
          
          {/* Left Column - Info & Socials */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              className="rounded-3xl p-8"
              style={{
                background: 'rgba(10, 10, 11, 0.5)',
                backdropFilter: 'blur(20px) saturate(120%)',
                WebkitBackdropFilter: 'blur(20px) saturate(120%)',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.06)',
              }}
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
              <h2 className="font-display text-3xl sm:text-4xl md:text-5xl leading-[1.1] tracking-[-0.02em] text-porcelain mb-4">
                Let's build something
                <br />
                <span className="italic text-alchemy-red">inevitable.</span>
              </h2>
              <p className="font-body text-base text-porcelain/50 mb-8 font-light">
                Brief us in under 3 minutes. We reply within 24 hours.
              </p>

              {/* Contact Methods */}
              <div className="space-y-4 mb-8">
                <motion.a
                  href="https://wa.me/917794912315"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-4 rounded-xl transition-all duration-300 group"
                  style={{
                    background: 'rgba(255, 255, 255, 0.03)',
                    border: '1px solid rgba(255, 255, 255, 0.06)',
                  }}
                  whileHover={{ x: 4, scale: 1.02, borderColor: 'rgba(34, 197, 94, 0.3)' }}
                  transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                >
                  <div className="w-10 h-10 rounded-lg bg-green-500/10 flex items-center justify-center group-hover:shadow-[0_0_15px_rgba(34,197,94,0.25)] transition-shadow">
                    <MessageCircle className="w-5 h-5 text-green-500" />
                  </div>
                  <p className="font-body text-sm text-porcelain">WhatsApp</p>
                </motion.a>

                <div>
                  <motion.a
                    href="mailto:alchemylabs.work@gmail.com?subject=Inquiry – Alchemy Labs"
                    className="flex items-center gap-4 p-4 rounded-xl transition-all duration-300 group"
                    style={{
                      background: 'rgba(255, 255, 255, 0.03)',
                      border: '1px solid rgba(255, 255, 255, 0.06)',
                    }}
                    whileHover={{ x: 4, scale: 1.02, borderColor: 'rgba(220, 38, 38, 0.3)' }}
                    transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                  >
                    <div className="w-10 h-10 rounded-lg bg-alchemy-red/10 flex items-center justify-center group-hover:shadow-[0_0_15px_rgba(220,38,38,0.25)] transition-shadow">
                      <Mail className="w-5 h-5 text-alchemy-red" />
                    </div>
                    <p className="font-body text-sm text-porcelain">Email</p>
                  </motion.a>
                  <button
                    onClick={() => copyToClipboard('alchemylabs.work@gmail.com')}
                    className="flex items-center gap-1.5 mt-1.5 ml-14 font-mono text-[10px] text-porcelain/35 hover:text-porcelain/60 transition-colors"
                  >
                    <Copy className="w-3 h-3" />
                    alchemylabs.work@gmail.com
                  </button>
                </div>
              </div>

              {/* Social Links */}
              <div className="pt-6 border-t border-porcelain/10">
                <p className="font-mono text-[10px] text-porcelain/40 tracking-wider uppercase mb-4">Follow Us</p>
                <div className="flex gap-3">
                  {[
                    { href: socialLinks.instagram, Icon: Instagram, hoverColor: 'hover:text-pink-500' },
                    { href: socialLinks.linkedin, Icon: Linkedin, hoverColor: 'hover:text-blue-500' },
                    { href: socialLinks.youtube, Icon: Youtube, hoverColor: 'hover:text-red-500' },
                  ].map(({ href, Icon, hoverColor }) => (
                    <motion.a
                      key={href}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 rounded-lg flex items-center justify-center transition-all duration-300"
                      style={{
                        background: 'rgba(255, 255, 255, 0.04)',
                        border: '1px solid rgba(255, 255, 255, 0.08)',
                      }}
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                    >
                      <Icon className={`w-4 h-4 text-porcelain/60 ${hoverColor} transition-colors`} />
                    </motion.a>
                  ))}
                </div>
              </div>

              {/* Founder Direct */}
              <div className="mt-8 p-4 rounded-xl" style={{
                background: 'linear-gradient(135deg, rgba(220, 38, 38, 0.06) 0%, rgba(255, 255, 255, 0.02) 100%)',
                border: '1px solid rgba(220, 38, 38, 0.15)',
              }}>
                <p className="font-body text-xs text-porcelain/60 mb-3">
                  Need to speak directly with the founders?
                </p>
                <div className="flex gap-3">
                  <div>
                    <motion.a 
                      href="mailto:aashrithgade5@gmail.com?subject=Direct Inquiry – Alchemy Labs"
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-lg font-mono text-xs text-alchemy-red hover:bg-alchemy-red/10 transition-colors"
                      style={{ border: '1px solid rgba(220, 38, 38, 0.25)' }}
                      whileHover={{ scale: 1.02 }}
                    >
                      <Mail className="w-3.5 h-3.5" />
                      Aashrith
                    </motion.a>
                    <button
                      onClick={() => copyToClipboard('aashrithgade5@gmail.com')}
                      className="flex items-center gap-1 mt-1 ml-1 font-mono text-[9px] text-porcelain/30 hover:text-porcelain/50 transition-colors"
                    >
                      <Copy className="w-2.5 h-2.5" />
                      copy email
                    </button>
                  </div>
                  <div>
                    <motion.a 
                      href="mailto:evadoshi05@gmail.com?subject=Direct Inquiry – Alchemy Labs"
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-lg font-mono text-xs text-alchemy-red hover:bg-alchemy-red/10 transition-colors"
                      style={{ border: '1px solid rgba(220, 38, 38, 0.25)' }}
                      whileHover={{ scale: 1.02 }}
                    >
                      <Mail className="w-3.5 h-3.5" />
                      Eva
                    </motion.a>
                    <button
                      onClick={() => copyToClipboard('evadoshi05@gmail.com')}
                      className="flex items-center gap-1 mt-1 ml-1 font-mono text-[9px] text-porcelain/30 hover:text-porcelain/50 transition-colors"
                    >
                      <Copy className="w-2.5 h-2.5" />
                      copy email
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right Column - Form */}
          <div className="lg:col-span-3">
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
                  className="rounded-2xl p-6 md:p-8"
                  style={{
                    background: 'rgba(10, 10, 11, 0.55)',
                    backdropFilter: 'blur(24px) saturate(120%)',
                    WebkitBackdropFilter: 'blur(24px) saturate(120%)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    boxShadow: '0 8px 32px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.06)',
                  }}
                >
                  {/* Strategy Call Heading — Editorial Split */}
                  <div className="mb-10 text-center">
                    <p className="font-mono text-[11px] tracking-[0.25em] uppercase text-porcelain/50 mb-2">
                      15 MIN STRATEGY CALL
                    </p>
                    <h3 className="font-display text-2xl md:text-3xl italic text-alchemy-red">
                      First one for free.
                    </h3>
                  </div>

                  <div className="grid md:grid-cols-2 gap-5 mb-5">
                    <div className="space-y-2">
                      <label className="font-mono text-[10px] text-porcelain/50 tracking-[0.15em] uppercase">
                        Your Name *
                      </label>
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => {
                          setFormData({ ...formData, name: e.target.value });
                          validateField('name', e.target.value);
                        }}
                        placeholder="Alex Rivera"
                        className={`glass-input glass-input-elevated ${fieldErrors.name ? 'border-alchemy-red/50' : ''}`}
                        required
                        disabled={isSubmitting}
                      />
                      {fieldErrors.name && (
                        <p className="font-mono text-[10px] text-alchemy-red">{fieldErrors.name}</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <label className="font-mono text-[10px] text-porcelain/50 tracking-[0.15em] uppercase">
                        Email *
                      </label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => {
                          setFormData({ ...formData, email: e.target.value });
                          validateField('email', e.target.value);
                        }}
                        placeholder="alex@company.com"
                        className={`glass-input glass-input-elevated ${fieldErrors.email ? 'border-alchemy-red/50' : ''}`}
                        required
                        disabled={isSubmitting}
                      />
                      {fieldErrors.email && (
                        <p className="font-mono text-[10px] text-alchemy-red">{fieldErrors.email}</p>
                      )}
                    </div>
                  </div>

                  <div className="space-y-2 mb-5">
                    <label className="font-mono text-[10px] text-porcelain/50 tracking-[0.15em] uppercase">
                      Company
                    </label>
                    <input
                      type="text"
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      placeholder="Your Company Name"
                      className="glass-input glass-input-elevated"
                      disabled={isSubmitting}
                    />
                  </div>

                  <div className="space-y-2 mb-5">
                    <label className="font-mono text-[10px] text-porcelain/50 tracking-[0.15em] uppercase">
                      What do you need?
                    </label>
                    <select
                      value={formData.service}
                      onChange={(e) => handleServiceChange(e.target.value)}
                      className="glass-input glass-input-elevated cursor-pointer text-porcelain"
                      disabled={isSubmitting}
                      style={{ backgroundColor: 'rgba(20, 20, 22, 0.95)' }}
                    >
                      {serviceOptions.map((option) => (
                        <option 
                          key={option.value} 
                          value={option.value} 
                          disabled={option.disabled}
                          style={{
                            backgroundColor: '#14141A',
                            color: option.disabled ? 'rgba(250, 249, 247, 0.4)' : '#FAF9F7',
                            padding: '12px',
                          }}
                        >
                          {option.label}
                        </option>
                      ))}
                    </select>
                    <p className="font-mono text-[9px] text-porcelain/30">
                      "Specific request" opens your email client
                    </p>
                  </div>

                  <div className="space-y-2 mb-6">
                    <label className="font-mono text-[10px] text-porcelain/50 tracking-[0.15em] uppercase">
                      What are we building? *
                    </label>
                    <textarea
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Tell us about your vision, timeline, and any specific goals..."
                      rows={4}
                      className="glass-input glass-input-elevated resize-none"
                      required
                      disabled={isSubmitting}
                    />
                  </div>

                  <TurnstileWidget 
                    onVerify={handleTurnstileVerify}
                    onError={handleTurnstileError}
                    onExpire={handleTurnstileExpire}
                  />

                  <div className="flex items-center justify-center gap-3 mb-4">
                    <span className="font-mono text-[9px] text-porcelain/40 tracking-wider">Reply within 24h</span>
                    <span className="text-porcelain/20">·</span>
                    <span className="font-mono text-[9px] text-porcelain/40 tracking-wider">NDA available</span>
                    <span className="text-porcelain/20">·</span>
                    <span className="font-mono text-[9px] text-porcelain/40 tracking-wider">Free first call</span>
                  </div>

                  {/* Submit Button — Animated Gradient Border with Glass Interior */}
                  <button
                    type="submit"
                    disabled={isSubmitting || Object.keys(fieldErrors).length > 0}
                    className="gradient-border-glow-btn w-full flex items-center justify-center gap-3 py-4 px-8 rounded-full font-body font-medium text-sm text-porcelain transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed hover:brightness-110 relative"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Submitting...</span>
                      </>
                    ) : (
                      <>
                        <span>Schedule a Meeting</span>
                        <Calendar className="w-4 h-4" />
                      </>
                    )}
                  </button>

                  <p className="font-mono text-[10px] text-center text-porcelain/40 mt-4">
                    Next: pick a time slot on Calendly for your 15-min Strategy Sprint.
                  </p>
                </motion.form>
              ) : (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                  className="glass-deep rounded-2xl p-10 md:p-16 text-center"
                >
                  <motion.div 
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 200, damping: 15, delay: 0.2 }}
                    className="w-16 h-16 rounded-full mx-auto mb-6 flex items-center justify-center"
                    style={{
                      background: 'linear-gradient(135deg, rgba(34, 197, 94, 0.2) 0%, rgba(34, 197, 94, 0.05) 100%)',
                      border: '1px solid rgba(34, 197, 94, 0.3)',
                    }}
                  >
                    <Check className="w-8 h-8 text-green-500" />
                  </motion.div>
                  
                  <motion.h3
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="font-display text-3xl md:text-4xl italic text-porcelain mb-3"
                  >
                    Done! We'll get back to you.
                  </motion.h3>
                  <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="font-body text-base text-porcelain/60 font-light mb-10"
                  >
                    Your brief is in our hands. Book your free strategy call below.
                  </motion.p>
                  
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="flex flex-col items-center gap-4"
                  >
                    {/* Primary Calendly CTA — direct anchor, never blocked */}
                    <a
                      href={CALENDLY_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="gradient-border-glow inline-flex items-center gap-3 px-8 py-4 rounded-full font-body font-medium text-sm text-porcelain transition-all duration-300 hover:brightness-110"
                    >
                      <Calendar className="w-5 h-5 text-alchemy-red" />
                      <span>Book Your Call</span>
                    </a>

                    <div className="flex flex-wrap justify-center gap-3 mt-2">
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
                      
                      <a
                        href="https://wa.me/917794912315"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-body text-sm transition-all duration-300"
                        style={{
                          background: 'linear-gradient(135deg, rgba(34, 197, 94, 0.2) 0%, rgba(34, 197, 94, 0.08) 100%)',
                          border: '1px solid rgba(34, 197, 94, 0.4)',
                        }}
                      >
                        <MessageCircle className="w-4 h-4 text-green-500" />
                        <span className="text-porcelain">WhatsApp Us</span>
                      </a>
                    </div>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
});

Contact.displayName = 'Contact';
