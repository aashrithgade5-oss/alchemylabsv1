import { motion } from 'framer-motion';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { ScrollReveal } from '@/components/ScrollReveal';

const PrivacyPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <section className="pt-32 pb-20 px-6 md:px-12">
        <div className="max-w-3xl mx-auto">
          <ScrollReveal>
            <motion.div className="mb-12">
              <span className="font-mono text-xs text-alchemy-red tracking-[0.2em] uppercase mb-4 block">
                Legal
              </span>
              <h1 className="font-display text-4xl md:text-5xl lg:text-6xl text-porcelain mb-6">
                Privacy <span className="italic text-alchemy-red">Policy</span>
              </h1>
              <p className="font-mono text-xs text-porcelain/40">
                Last updated: January 2026
              </p>
            </motion.div>
          </ScrollReveal>

          <div className="space-y-8 font-body text-porcelain/70 leading-relaxed">
            <ScrollReveal delay={0.1}>
              <section>
                <h2 className="font-display text-2xl text-porcelain mb-4">1. Information We Collect</h2>
                <p className="mb-4">
                  At Alchemy Labs, we collect information you provide directly to us, including:
                </p>
                <ul className="list-disc list-inside space-y-2 text-porcelain/60">
                  <li>Name and contact information (email, phone)</li>
                  <li>Company or organization details</li>
                  <li>Project requirements and messages</li>
                  <li>Communication preferences</li>
                </ul>
              </section>
            </ScrollReveal>

            <ScrollReveal delay={0.15}>
              <section>
                <h2 className="font-display text-2xl text-porcelain mb-4">2. How We Use Your Information</h2>
                <p className="mb-4">
                  We use the information we collect to:
                </p>
                <ul className="list-disc list-inside space-y-2 text-porcelain/60">
                  <li>Respond to your inquiries and provide our services</li>
                  <li>Send you updates about your projects</li>
                  <li>Improve our website and services</li>
                  <li>Comply with legal obligations</li>
                </ul>
              </section>
            </ScrollReveal>

            <ScrollReveal delay={0.2}>
              <section>
                <h2 className="font-display text-2xl text-porcelain mb-4">3. Data Security</h2>
                <p>
                  We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. Your data is encrypted in transit and at rest.
                </p>
              </section>
            </ScrollReveal>

            <ScrollReveal delay={0.25}>
              <section>
                <h2 className="font-display text-2xl text-porcelain mb-4">4. Third-Party Services</h2>
                <p>
                  We may use third-party services for analytics, email delivery, and security verification. These services have their own privacy policies, and we encourage you to review them. We do not sell your personal information to third parties.
                </p>
              </section>
            </ScrollReveal>

            <ScrollReveal delay={0.3}>
              <section>
                <h2 className="font-display text-2xl text-porcelain mb-4">5. Your Rights</h2>
                <p className="mb-4">
                  You have the right to:
                </p>
                <ul className="list-disc list-inside space-y-2 text-porcelain/60">
                  <li>Access your personal data</li>
                  <li>Request correction of inaccurate data</li>
                  <li>Request deletion of your data</li>
                  <li>Opt-out of marketing communications</li>
                </ul>
              </section>
            </ScrollReveal>

            <ScrollReveal delay={0.35}>
              <section>
                <h2 className="font-display text-2xl text-porcelain mb-4">6. Contact Us</h2>
                <p>
                  If you have any questions about this Privacy Policy or our data practices, please contact us at{' '}
                  <a href="mailto:alchemylabs.work@gmail.com?subject=Privacy Inquiry – Alchemy Labs" className="text-alchemy-red hover:underline">
                    alchemylabs.work@gmail.com
                  </a>
                </p>
              </section>
            </ScrollReveal>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default PrivacyPage;