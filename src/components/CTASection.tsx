
import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

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
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link to="/create">
            <Button className="rounded-full h-12 px-12 text-base bg-blue-600 hover:bg-blue-700 text-white transition-all duration-300">
              Create Your First Memory
            </Button>
          </Link>
          <Link to="/settings">
            <Button variant="outline" className="rounded-full h-12 px-8 text-base border-gray-300 text-gray-700 hover:bg-gray-100">
              Configure API Keys
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
