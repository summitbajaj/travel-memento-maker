
import React from 'react';
import { Button } from '@/components/ui/button';

const CTASection = () => {
  return (
    <section className="py-24 bg-gradient-to-r from-gray-50 to-gray-100">
      <div className="max-w-5xl mx-auto px-6 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900">
          Ready to Preserve Your Travel Memories?
        </h2>
        <p className="text-lg text-gray-600 mb-10 max-w-2xl mx-auto">
          Start creating your first memory capsule today and transform your travel experiences into lasting digital mementos.
        </p>
        <Button className="rounded-full h-12 px-12 text-base bg-gray-900 hover:bg-gray-800 transition-all duration-300">
          Create Your First Memory
        </Button>
      </div>
    </section>
  );
};

export default CTASection;
