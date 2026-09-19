'use client';
import { useState, useCallback, useEffect, memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Calendar, MessageCircle, Instagram, Mail, Loader2, Check, Home, Linkedin, Youtube, Copy } from 'lucide-react';
import Link from 'next/link';
import { toast } from 'sonner';
import { TurnstileWidget } from './TurnstileWidget';
import { socialLinks } from '@/data/socialLinks';
import { confettiBurst, confettiCelebrate } from '@/lib/confetti';

const serviceOptions = [
  { value: '', label: 'Select what you need...', disabled: true },
  { value: 'fast-24h', label: 'Fast · 24h AI Build', group: 'pillars' },
  { value: 'foundation-brand', label: 'Foundation · Brand System', group: 'pillars' },
  { value: 'clarity-advisory', label: 'Clarity · Strategy Advisory', group: 'pillars' },
  { value: 'not-sure', label: 'Not sure yet · Help me figure out', group: 'other' },
  { value: 'specific-request', label: 'Specific request · Direct to founder', group: 'other' },
];

// /services pillar slugs → form subject values (?pillar= preselect)
const pillarToService: Record<string, string> = {
  ai: 'fast-24h',
  brand: 'foundation-brand',
  advisory: 'clarity-advisory',
};

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
  const [honeypot, setHoneypot] = useState('');
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  // Calendly: lazy iframe modal — the old window.Calendly popup call was a
  // silent no-op (the widget script was never loaded anywhere).
  const [calendlyOpen, setCalendlyOpen] = useState(false);
  // R-7c Tier 1 (intent) / Tier 2 (confirmed booking via Calendly postMessage)
  const [intentFired, setIntentFired] = useState(false);
  const [booked, setBooked] = useState(false);

  const openCalendly = useCallback(() => {
    setCalendlyOpen(true);
    setIntentFired(true);
    confettiBurst();
  }, []);

  // Tier 2 trigger: Calendly's real event_scheduled postMessage from the
  // iframe — the click never counts as a booking.
  useEffect(() => {
    if (!calendlyOpen) return;
    const onMessage = (e: MessageEvent) => {
      const fromCalendly =
        e.origin === 'https://calendly.com' || e.origin.endsWith('.calendly.com');
      if (!fromCalendly) return;
      if ((e.data as { event?: string })?.event === 'calendly.event_scheduled') {
        setCalendlyOpen(false);
        setBooked(true);
        confettiCelebrate();
      }
    };
    window.addEventListener('message', onMessage);
    return () => window.removeEventListener('message', onMessage);
  }, [calendlyOpen]);

  // Booked overlay auto-dismisses at 3.5s (or on click, see JSX).
  useEffect(() => {
    if (!booked) return;
    const t = setTimeout(() => setBooked(false), 3500);
    return () => clearTimeout(t);
  }, [booked]);

  // Honor /contact?pillar=<slug|value>: preselect the subject once on mount.
  useEffect(() => {
    const pillar = new URLSearchParams(window.location.search).get('pillar');
    if (!pillar) return;
    const value =
      pillarToService[pillar] ??
      (serviceOptions.some((o) => o.value === pillar) ? pillar : null);
    if (value) setFormData((f) => ({ ...f, service: value }));
  }, []);

  const handleTurnstileVerify = useCallback((token: string) => {
    setTurnstileToken(token);
  }, []);

  const handleTurnstileError = useCallback(() => {
    setTurnstileToken(null);
    // Suppress error toast on preview/localhost — Turnstile always fails there
    const h = window.location.hostname;
    if (h.includes('lovable.app') || h === 'localhost' || h === '127.0.0.1') return;
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
      // Lazy: supabase-js only downloads when someone actually submits,
      // keeping it out of /contact First Load JS (220kB overage item).
      const { supabase } = await import('@/integrations/supabase/client');
      // The edge function verifies Turnstile + rate limit, then persists and
      // emails; the browser has no direct insert rights on the table.
      const { error } = await supabase.functions.invoke('send-contact-email', {
        body: {
          name: formData.name,
          email: formData.email,
          company: formData.company,
          service: formData.service,
          message: formData.message,
          turnstileToken,
          website: honeypot,
        },
      });

      if (error) throw error;

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
    <section id="contact" className="relative overflow-hidden px-2 py-12 md:px-6 md:py-16">
      {/* Background atmosphere */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] rounded-full blur-[180px] opacity-40"
          style={{ background: 'radial-gradient(ellipse, rgba(255,77,28,0.08), transparent 70%)' }} />
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] rounded-full blur-[150px] opacity-30"
          style={{ background: 'radial-gradient(ellipse, rgba(255,77,28,0.06), transparent 70%)' }} />
      </div>
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
                  background: 'linear-gradient(135deg, rgba(255, 77, 28, 0.15) 0%, rgba(255, 255, 255, 0.05) 100%)',
                  border: '1px solid rgba(255, 77, 28, 0.3)',
                }}
              >
                <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-bone/80">
                  Get Started
                </span>
              </span>
              <h2 className="font-headline text-3xl sm:text-4xl md:text-5xl leading-[1.1] tracking-[-0.02em] text-bone mb-4">
                Let's build something
                <br />
                <span className="text-ember">inevitable.</span>
              </h2>
              <p className="font-body text-base text-bone/50 mb-8 font-light">
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
                    <MessageCircle className="w-5 h-5 text-ember" />
                  </div>
                  <p className="font-body text-sm text-bone">WhatsApp</p>
                </motion.a>

                <div>
                  <motion.a
                    href="mailto:alchemylabs.work@gmail.com?subject=Inquiry – Alchemy Labs"
                    className="flex items-center gap-4 p-4 rounded-xl transition-all duration-300 group"
                    style={{
                      background: 'rgba(255, 255, 255, 0.03)',
                      border: '1px solid rgba(255, 255, 255, 0.06)',
                    }}
                    whileHover={{ x: 4, scale: 1.02, borderColor: 'rgba(255, 77, 28, 0.3)' }}
                    transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                  >
                    <div className="w-10 h-10 rounded-lg bg-ember/10 flex items-center justify-center group-hover:shadow-[0_0_15px_rgba(255,77,28,0.25)] transition-shadow">
                      <Mail className="w-5 h-5 text-ember" />
                    </div>
                    <p className="font-body text-sm text-bone">Email</p>
                  </motion.a>
                  <button
                    onClick={() => copyToClipboard('alchemylabs.work@gmail.com')}
                    className="flex items-center gap-1.5 mt-1.5 ml-14 font-mono text-[10px] text-bone/35 hover:text-bone/60 transition-colors"
                  >
                    <Copy className="w-3 h-3" />
                    alchemylabs.work@gmail.com
                  </button>
                </div>
              </div>

              {/* Social Links */}
              <div className="pt-6 border-t border-porcelain/10">
                <p className="font-mono text-[10px] text-bone/40 tracking-wider uppercase mb-4">Follow Us</p>
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
                      <Icon className={`w-4 h-4 text-bone/60 ${hoverColor} transition-colors`} />
                    </motion.a>
                  ))}
                </div>
              </div>

              {/* Founder note — with pull-quotes, the only sanctioned Playfair italic use */}
              <div className="mt-8 border-t border-porcelain/10 pt-6">
                <p className="font-playfair text-lg italic leading-relaxed text-bone/75">
                  &ldquo;Every brief lands on my desk first. If we take your project,
                  it&rsquo;s because I already know what to do with it.&rdquo;
                </p>
                <p className="mt-3 font-mono text-[10px] tracking-[0.25em] uppercase text-bone/40">
                  — Ash, Founder
                </p>
              </div>

              {/* Founder Direct */}
              <div className="mt-8 p-4 rounded-xl" style={{
                background: 'linear-gradient(135deg, rgba(255, 77, 28, 0.06) 0%, rgba(255, 255, 255, 0.02) 100%)',
                border: '1px solid rgba(255, 77, 28, 0.15)',
              }}>
                <p className="font-body text-xs text-bone/60 mb-3">
                  Need to speak directly with the founders?
                </p>
                <div className="flex gap-3">
                  <div>
                    <motion.a 
                      href="mailto:aashrithgade5@gmail.com?subject=Direct Inquiry – Alchemy Labs"
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-lg font-mono text-xs text-ember hover:bg-ember/10 transition-colors"
                      style={{ border: '1px solid rgba(255, 77, 28, 0.25)' }}
                      whileHover={{ scale: 1.02 }}
                    >
                      <Mail className="w-3.5 h-3.5" />
                      Aashrith
                    </motion.a>
                    <button
                      onClick={() => copyToClipboard('aashrithgade5@gmail.com')}
                      className="flex items-center gap-1 mt-1 ml-1 font-mono text-[9px] text-bone/30 hover:text-bone/50 transition-colors"
                    >
                      <Copy className="w-2.5 h-2.5" />
                      copy email
                    </button>
                  </div>
                  <div>
                    <motion.a 
                      href="mailto:evadoshi05@gmail.com?subject=Direct Inquiry – Alchemy Labs"
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-lg font-mono text-xs text-ember hover:bg-ember/10 transition-colors"
                      style={{ border: '1px solid rgba(255, 77, 28, 0.25)' }}
                      whileHover={{ scale: 1.02 }}
                    >
                      <Mail className="w-3.5 h-3.5" />
                      Eva
                    </motion.a>
                    <button
                      onClick={() => copyToClipboard('evadoshi05@gmail.com')}
                      className="flex items-center gap-1 mt-1 ml-1 font-mono text-[9px] text-bone/30 hover:text-bone/50 transition-colors"
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
                    <p className="font-mono text-[11px] tracking-[0.25em] uppercase text-bone/50 mb-2">
                      15 MIN STRATEGY CALL
                    </p>
                    <h3 className="font-headline text-2xl md:text-3xl text-ember">
                      First one for free.
                    </h3>
                  </div>

                  <div className="grid md:grid-cols-2 gap-5 mb-5">
                    <div className="space-y-2">
                      <label htmlFor="c-name" className="font-mono text-[10px] text-bone/50 tracking-[0.15em] uppercase">
                        Your Name *
                      </label>
                      <input
                        type="text"
                        id="c-name" value={formData.name}
                        onChange={(e) => {
                          setFormData({ ...formData, name: e.target.value });
                          validateField('name', e.target.value);
                        }}
                        placeholder="Alex Rivera"
                        className={`glass-input glass-input-elevated ${fieldErrors.name ? 'border-ember/50' : ''}`}
                        required
                        disabled={isSubmitting}
                      />
                      {fieldErrors.name && (
                        <p className="font-mono text-[10px] text-ember">{fieldErrors.name}</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="c-email" className="font-mono text-[10px] text-bone/50 tracking-[0.15em] uppercase">
                        Email *
                      </label>
                      <input
                        type="email"
                        id="c-email" value={formData.email}
                        onChange={(e) => {
                          setFormData({ ...formData, email: e.target.value });
                          validateField('email', e.target.value);
                        }}
                        placeholder="alex@company.com"
                        className={`glass-input glass-input-elevated ${fieldErrors.email ? 'border-ember/50' : ''}`}
                        required
                        disabled={isSubmitting}
                      />
                      {fieldErrors.email && (
                        <p className="font-mono text-[10px] text-ember">{fieldErrors.email}</p>
                      )}
                    </div>
                  </div>

                  <div className="space-y-2 mb-5">
                    <label htmlFor="c-company" className="font-mono text-[10px] text-bone/50 tracking-[0.15em] uppercase">
                      Company
                    </label>
                    <input
                      type="text"
                      id="c-company" value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      placeholder="Your Company Name"
                      className="glass-input glass-input-elevated"
                      disabled={isSubmitting}
                    />
                  </div>

                  <div className="space-y-2 mb-5">
                    <label htmlFor="c-service" className="font-mono text-[10px] text-bone/50 tracking-[0.15em] uppercase">
                      What do you need?
                    </label>
                    <select
                      id="c-service" value={formData.service}
                      onChange={(e) => handleServiceChange(e.target.value)}
                      className="glass-input glass-input-elevated cursor-pointer text-bone"
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
                    <p className="font-mono text-[9px] text-bone/30">
                      "Specific request" opens your email client
                    </p>
                  </div>

                  <div className="space-y-2 mb-6">
                    <label htmlFor="c-message" className="font-mono text-[10px] text-bone/50 tracking-[0.15em] uppercase">
                      What are we building? *
                    </label>
                    <textarea
                      id="c-message" value={formData.message}
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
                    <span className="font-mono text-[9px] text-bone/40 tracking-wider">Reply within 24h</span>
                    <span className="text-bone/20">·</span>
                    <span className="font-mono text-[9px] text-bone/40 tracking-wider">NDA available</span>
                    <span className="text-bone/20">·</span>
                    <span className="font-mono text-[9px] text-bone/40 tracking-wider">Free first call</span>
                  </div>

                  {/* honeypot — off-screen, skipped by keyboard + screen readers */}
                  <div aria-hidden className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
                    <input tabIndex={-1} autoComplete="off" value={honeypot} onChange={(e) => setHoneypot(e.target.value)} />
                  </div>

                  {/* The form's own submit — previously there was none, so briefs never sent */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="mb-3 w-full flex items-center justify-center gap-3 py-4 px-8 rounded-full bg-ember font-body font-medium text-sm text-void transition-colors duration-300 hover:bg-amber disabled:opacity-60"
                  >
                    {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                    <span>{isSubmitting ? 'Sending' : 'Send the brief'}</span>
                  </button>

                  {/* CTA Button — Opens Calendly popup */}
                  <button
                    type="button"
                    onClick={openCalendly}
                    className="gradient-border-glow-btn w-full flex items-center justify-center gap-3 py-4 px-8 rounded-full font-body font-medium text-sm text-bone transition-all duration-300 hover:brightness-110 relative overflow-hidden"
                  >
                    <span>Schedule a Meeting</span>
                    <Calendar className="w-4 h-4" />
                  </button>

                  {/* R-7c Tier 1 inline copy: fades in once intent is signaled */}
                  <motion.p
                    key={intentFired ? 'intent' : 'idle'}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.6 }}
                    className="font-mono text-[10px] text-center text-bone/35 mt-4"
                  >
                    {intentFired
                      ? 'One click closer to elevating your brand.'
                      : 'Opens our Calendly page to book your 15-min Strategy Sprint.'}
                  </motion.p>
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
                    <Check className="w-8 h-8 text-ember" />
                  </motion.div>
                  
                  <motion.h3
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="font-headline text-3xl md:text-4xl text-bone mb-3"
                  >
                    Done! We'll get back to you.
                  </motion.h3>
                  <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="font-body text-base text-bone/60 font-light mb-10"
                  >
                    Your brief is in our hands. Book your free strategy call below.
                  </motion.p>
                  
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="flex flex-col items-center gap-4"
                  >
                    {/* Primary Calendly CTA — uses official popup widget */}
                    <button
                      type="button"
                      onClick={openCalendly}
                      className="gradient-border-glow inline-flex items-center gap-3 px-8 py-4 rounded-full font-body font-medium text-sm text-bone transition-all duration-300 hover:brightness-110 cursor-pointer"
                    >
                      <Calendar className="w-5 h-5 text-ember" />
                      <span>Book Your Call</span>
                    </button>

                    <div className="flex flex-wrap justify-center gap-3 mt-2">
                      <Link
                        href="/"
                        className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-body text-sm text-bone/60 hover:text-bone transition-colors"
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
                        <MessageCircle className="w-4 h-4 text-ember" />
                        <span className="text-bone">WhatsApp Us</span>
                      </a>
                    </div>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Calendly modal: iframe mounts only while open, so nothing loads
          until the CTA is clicked */}
      <AnimatePresence>
        {calendlyOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4"
            role="dialog"
            aria-modal="true"
            aria-label="Schedule a meeting"
          >
            <button
              aria-label="Close scheduler"
              onClick={() => setCalendlyOpen(false)}
              className="absolute inset-0 cursor-default bg-black/80 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, y: 24, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 24, scale: 0.98 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="relative h-[85vh] w-full max-w-3xl overflow-hidden rounded-2xl bg-white shadow-2xl"
            >
              <button
                onClick={() => setCalendlyOpen(false)}
                aria-label="Close"
                className="absolute right-3 top-3 z-10 rounded-full bg-black/10 p-2 text-black/60 transition-colors hover:bg-black/20"
              >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
                  <path d="M1 1l12 12M13 1L1 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </button>
              <iframe
                src={`${CALENDLY_URL}?hide_gdpr_banner=1`}
                title="Schedule a meeting with Alchemy Labs"
                className="h-full w-full border-0"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* R-7c Tier 2: confirmed-booking celebration — full backdrop blur
          (static 14px, one-shot overlay, not the scroll-driven veil),
          auto-dismiss 3.5s or on click */}
      <AnimatePresence>
        {booked && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            role="status"
            onClick={() => setBooked(false)}
            className="fixed inset-0 z-[110] flex items-center justify-center bg-void/60 px-6"
            style={{ backdropFilter: 'blur(14px)', WebkitBackdropFilter: 'blur(14px)' }}
          >
            <motion.p
              initial={{ opacity: 0, y: 18, filter: 'blur(8px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="max-w-2xl text-center font-headline text-3xl font-black leading-tight text-bone md:text-5xl"
            >
              Your discovery session is booked.{' '}
              <span className="font-playfair font-normal italic">Elevation starts now.</span>
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
});

Contact.displayName = 'Contact';
