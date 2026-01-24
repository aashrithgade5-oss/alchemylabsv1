import { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Check, Loader, MessageCircle, Mail, ArrowLeft } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { TurnstileWidget } from '@/components/TurnstileWidget';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

const serviceOptions = [
  { group: 'AI Solutions', options: ['AI Media Production', 'Content Cloning', 'AI Content Planner', 'Visual Content Bot'] },
  { group: 'Branding Solutions', options: ['Brand Identity System', 'Visual Identity', 'Brand Kit', 'Brand Narrative'] },
  { group: 'Consultation', options: ['75-Min Strategy Session', '150-Min Deep Dive', '300-Min Simulation'] },
];

export const BookSprint = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    service: '',
    message: '',
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);
  const [captchaError, setCaptchaError] = useState(false);

  const handleCaptchaVerify = useCallback((token: string) => {
    setTurnstileToken(token);
    setCaptchaError(false);
  }, []);

  const handleCaptchaError = useCallback(() => {
    setCaptchaError(true);
    toast.error('Security verification failed. Please refresh and try again.');
  }, []);

  const handleCaptchaExpire = useCallback(() => {
    setTurnstileToken(null);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!turnstileToken) {
      toast.error('Please complete the security verification.');
      return;
    }
    
    setSubmitting(true);

    try {
      const { error } = await supabase
        .from('contact_submissions')
        .insert([{
          name: formData.name,
          email: formData.email,
          company: formData.company,
          service: formData.service,
          message: formData.message,
        }]);

      if (error) throw error;

      // Try to send email notification with CAPTCHA token
      try {
        await supabase.functions.invoke('send-contact-email', {
          body: { ...formData, turnstileToken },
        });
      } catch (emailError) {
        console.log('Email notification skipped');
      }

      setSubmitted(true);
      toast.success('Booking request received!');
    } catch (error) {
      console.error('Submission error:', error);
      toast.error('Something went wrong. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-background grain-overlay">
        <Navigation />
        
        <section className="min-h-screen flex items-center justify-center section-gradient">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="max-w-lg mx-auto px-6 text-center"
          >
            <div className="w-20 h-20 rounded-full glass-red flex items-center justify-center mx-auto mb-8">
              <Check className="w-10 h-10 text-alchemy-red" />
            </div>
            
            <h1 className="font-display text-4xl md:text-5xl italic text-porcelain mb-4">
              Booking Received
            </h1>
            
            <p className="font-body text-lg text-porcelain/50 font-light mb-8">
              We'll be in touch within 24 hours to confirm your session.
            </p>
            
            <button
              onClick={() => navigate('/')}
              className="text-alchemy-red hover:underline font-body"
            >
              Return to Home →
            </button>
          </motion.div>
        </section>
        
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background grain-overlay">
      <Navigation />
      
      {/* Hero */}
      <section className="relative min-h-[50vh] flex items-center overflow-hidden section-gradient">
        <div className="absolute inset-0">
          <div className="absolute top-1/3 left-1/4 w-[600px] h-[600px] bg-alchemy-red/10 rounded-full blur-[150px]" />
        </div>
        
        <div className="relative z-10 max-w-4xl mx-auto px-6 md:px-12 pt-32 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-8"
          >
            <Link 
              to="/solutions" 
              className="inline-flex items-center gap-2 text-sm text-porcelain/50 hover:text-alchemy-red transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="font-body">Back to Solutions</span>
            </Link>
          </motion.div>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="font-mono text-xs text-alchemy-red tracking-label uppercase mb-4"
          >
            Book a Call
          </motion.p>
          
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-display tracking-display text-porcelain mb-6"
          >
            Let's Build Something
            <br />
            <span className="italic text-alchemy-red">Inevitable</span>
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="font-body text-lg text-porcelain/50 font-light"
          >
            Schedule a strategic session. We'll reply within 24 hours.
          </motion.p>
        </div>
      </section>
      
      {/* Form Section */}
      <section className="relative py-20 overflow-hidden section-gradient">
        <div className="relative z-10 max-w-2xl mx-auto px-6 md:px-12">
          <motion.form
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            onSubmit={handleSubmit}
            className="glass-deep rounded-3xl p-8 md:p-12"
          >
            <div className="space-y-6 mb-8">
              {/* Name */}
              <div>
                <label className="block font-body text-sm text-porcelain/60 mb-2">
                  Name *
                </label>
                <input
                  type="text"
                  placeholder="Your name"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  required
                  className="glass-input"
                />
              </div>
              
              {/* Email */}
              <div>
                <label className="block font-body text-sm text-porcelain/60 mb-2">
                  Email *
                </label>
                <input
                  type="email"
                  placeholder="you@company.com"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  required
                  className="glass-input"
                />
              </div>
              
              {/* Company */}
              <div>
                <label className="block font-body text-sm text-porcelain/60 mb-2">
                  Company
                </label>
                <input
                  type="text"
                  placeholder="Company name"
                  value={formData.company}
                  onChange={(e) => setFormData({...formData, company: e.target.value})}
                  className="glass-input"
                />
              </div>
              
              {/* Service */}
              <div>
                <label className="block font-body text-sm text-porcelain/60 mb-2">
                  Service Interest *
                </label>
                <select
                  value={formData.service}
                  onChange={(e) => setFormData({...formData, service: e.target.value})}
                  required
                  className="glass-input select-dropdown"
                >
                  <option value="">Select a service...</option>
                  {serviceOptions.map((group) => (
                    <optgroup key={group.group} label={group.group}>
                      {group.options.map((option) => (
                        <option key={option} value={option}>{option}</option>
                      ))}
                    </optgroup>
                  ))}
                </select>
              </div>
              
              {/* Message */}
              <div>
                <label className="block font-body text-sm text-porcelain/60 mb-2">
                  Tell us about your challenge
                </label>
                <textarea
                  placeholder="Brief overview of what you're looking to achieve..."
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                  className="glass-input resize-none"
                />
              </div>
            </div>
            
            {/* CAPTCHA */}
            <div className="mb-6">
              <TurnstileWidget
                onVerify={handleCaptchaVerify}
                onError={handleCaptchaError}
                onExpire={handleCaptchaExpire}
              />
              {captchaError && (
                <p className="text-red-500 text-sm text-center mt-2">
                  Security verification failed. Please refresh and try again.
                </p>
              )}
            </div>
            
            {/* Submit */}
            <button
              type="submit"
              disabled={submitting || !turnstileToken}
              className="w-full glass-cta-primary py-5 text-lg justify-center disabled:opacity-50"
            >
              {submitting ? (
                <span className="flex items-center justify-center gap-2">
                  <Loader className="w-5 h-5 animate-spin" />
                  Submitting...
                </span>
              ) : (
                <span className="flex items-center justify-center gap-2">
                  Book Session
                  <ArrowRight className="w-5 h-5" />
                </span>
              )}
            </button>
            
            <p className="font-body text-sm text-center text-porcelain/40 mt-6">
              We'll confirm within 24 hours. No spam, ever.
            </p>
          </motion.form>
          
          {/* Alternative Contact */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-12 text-center"
          >
            <p className="font-body text-sm text-porcelain/40 mb-6">
              Prefer to reach out directly?
            </p>
            
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href="https://wa.me/917794912315"
                target="_blank"
                rel="noopener noreferrer"
                className="glass-deep px-6 py-3 rounded-full hover:border-green-500/30 transition-colors flex items-center gap-2"
              >
                <MessageCircle className="w-4 h-4 text-green-500" />
                <span className="font-body text-sm text-porcelain/70">WhatsApp</span>
              </a>
              
              <a
                href="mailto:brandalchemie@gmail.com"
                className="glass-deep px-6 py-3 rounded-full hover:border-alchemy-red/30 transition-colors flex items-center gap-2"
              >
                <Mail className="w-4 h-4 text-alchemy-red" />
                <span className="font-body text-sm text-porcelain/70">Email</span>
              </a>
            </div>
          </motion.div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default BookSprint;
