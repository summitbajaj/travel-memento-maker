
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import MemoryGallery from '@/components/MemoryGallery';

const Index = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow pt-16">
        <MemoryGallery />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
