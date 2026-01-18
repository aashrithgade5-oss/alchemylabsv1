import { Navigation } from '@/components/Navigation';
import { Hero } from '@/components/Hero';
import { Solutions } from '@/components/Solutions';
import { CaseStudies } from '@/components/CaseStudies';
import { Manifesto } from '@/components/Manifesto';
import { Journal } from '@/components/Journal';
import { Contact } from '@/components/Contact';
import { Footer } from '@/components/Footer';
import { ScrollProgress } from '@/components/ScrollProgress';

const Index = () => {
  return (
    <div className="relative grain-overlay">
      <ScrollProgress />
      <Navigation />
      <main>
        <Hero />
        <Solutions />
        <CaseStudies />
        <Manifesto />
        <Journal />
        <Contact />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
