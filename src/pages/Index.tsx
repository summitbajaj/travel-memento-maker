
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import HeroSection from '@/components/HeroSection';
import FeaturesSection from '@/components/FeaturesSection';
import CTASection from '@/components/CTASection';
import HowItWorksSection from '@/components/HowItWorksSection';
import MemoryGallery from '@/components/MemoryGallery';
import { useMemories } from '@/contexts/MemoryContext';

const Index = () => {
  const { memories } = useMemories();
  
  // Check if user has configured API keys
  const hasKeys = localStorage.getItem('openai-api-key') && 
                 localStorage.getItem('spotify-client-id') &&
                 localStorage.getItem('spotify-client-secret');

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      {!hasKeys ? (
        // Show marketing sections if user hasn't set up API keys
        <>
          <HeroSection />
          <FeaturesSection />
          <HowItWorksSection />
          <CTASection />
        </>
      ) : (
        // Show memory gallery if user has set up API keys
        <main className="flex-grow pt-16">
          <MemoryGallery />
        </main>
      )}
      
      <Footer />
    </div>
  );
};

export default Index;
