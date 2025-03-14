
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import MemoryGallery from '@/components/MemoryGallery';
import HeroSection from '@/components/HeroSection';
import FeaturesSection from '@/components/FeaturesSection';
import HowItWorksSection from '@/components/HowItWorksSection';
import CTASection from '@/components/CTASection';

const Index = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <HeroSection />
        <FeaturesSection />
        <HowItWorksSection />
        <MemoryGallery />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
