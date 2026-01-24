import { motion } from 'framer-motion';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { ScrollReveal } from '@/components/ScrollReveal';

const TermsPage = () => {
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
                Terms of <span className="italic text-alchemy-red">Service</span>
              </h1>
              <p className="font-mono text-xs text-porcelain/40">
                Last updated: January 2026
              </p>
            </motion.div>
          </ScrollReveal>

          <div className="space-y-8 font-body text-porcelain/70 leading-relaxed">
            <ScrollReveal delay={0.1}>
              <section>
                <h2 className="font-display text-2xl text-porcelain mb-4">1. Agreement to Terms</h2>
                <p>
                  By accessing or using the Alchemy Labs website and services, you agree to be bound by these Terms of Service. If you disagree with any part of these terms, you may not access our services.
                </p>
              </section>
            </ScrollReveal>

            <ScrollReveal delay={0.15}>
              <section>
                <h2 className="font-display text-2xl text-porcelain mb-4">2. Services</h2>
                <p className="mb-4">
                  Alchemy Labs provides branding, design, and AI-powered creative services. Our services include but are not limited to:
                </p>
                <ul className="list-disc list-inside space-y-2 text-porcelain/60">
                  <li>Brand identity design and strategy</li>
                  <li>AI-powered media generation</li>
                  <li>Strategic consultation sessions</li>
                  <li>Design systems and visual identity</li>
                </ul>
              </section>
            </ScrollReveal>

            <ScrollReveal delay={0.2}>
              <section>
                <h2 className="font-display text-2xl text-porcelain mb-4">3. Intellectual Property</h2>
                <p>
                  All content, including but not limited to text, graphics, logos, and designs on this website, are the property of Alchemy Labs unless otherwise stated. Upon full payment for commissioned work, intellectual property rights for deliverables transfer to the client as outlined in individual project agreements.
                </p>
              </section>
            </ScrollReveal>

            <ScrollReveal delay={0.25}>
              <section>
                <h2 className="font-display text-2xl text-porcelain mb-4">4. Project Terms</h2>
                <p className="mb-4">
                  When engaging our services:
                </p>
                <ul className="list-disc list-inside space-y-2 text-porcelain/60">
                  <li>Timelines are estimated and may vary based on project scope</li>
                  <li>Revisions beyond the agreed scope may incur additional charges</li>
                  <li>Cancellation policies are outlined in individual project agreements</li>
                  <li>Payment terms are Net 15 unless otherwise agreed</li>
                </ul>
              </section>
            </ScrollReveal>

            <ScrollReveal delay={0.3}>
              <section>
                <h2 className="font-display text-2xl text-porcelain mb-4">5. Limitation of Liability</h2>
                <p>
                  Alchemy Labs shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use of our services. Our total liability shall not exceed the amount paid for the specific service in question.
                </p>
              </section>
            </ScrollReveal>

            <ScrollReveal delay={0.35}>
              <section>
                <h2 className="font-display text-2xl text-porcelain mb-4">6. Confidentiality</h2>
                <p>
                  We respect the confidentiality of our clients' business information. Any information shared during the course of our engagement will be kept confidential unless explicitly authorized for public use or required by law.
                </p>
              </section>
            </ScrollReveal>

            <ScrollReveal delay={0.4}>
              <section>
                <h2 className="font-display text-2xl text-porcelain mb-4">7. Changes to Terms</h2>
                <p>
                  We reserve the right to modify these terms at any time. Changes will be effective immediately upon posting to this website. Your continued use of our services constitutes acceptance of the updated terms.
                </p>
              </section>
            </ScrollReveal>

            <ScrollReveal delay={0.45}>
              <section>
                <h2 className="font-display text-2xl text-porcelain mb-4">8. Contact</h2>
                <p>
                  For questions about these Terms of Service, please contact us at{' '}
                  <a href="mailto:brandalchemie@gmail.com" className="text-alchemy-red hover:underline">
                    brandalchemie@gmail.com
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

export default TermsPage;