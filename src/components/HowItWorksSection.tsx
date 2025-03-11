
import React from 'react';
import { ArrowRight } from 'lucide-react';

const steps = [
  {
    number: '01',
    title: 'Create Your Trip',
    description: 'Enter your travel dates, destination, and a brief description of your journey.',
    image: 'https://images.unsplash.com/photo-1482938289607-e9573fc25ebb?q=80&w=800&auto=format'
  },
  {
    number: '02',
    title: 'Upload Your Photos',
    description: 'Select up to 10 of your favorite photos that capture the essence of your trip.',
    image: 'https://images.unsplash.com/photo-1472396961693-142e6e269027?q=80&w=800&auto=format'
  },
  {
    number: '03',
    title: 'Generate Memories',
    description: 'Our AI creates postcards, a soundtrack, and a narrative based on your content.',
    image: 'https://images.unsplash.com/photo-1433086966358-54859d0ed716?q=80&w=800&auto=format'
  },
  {
    number: '04',
    title: 'Share and Enjoy',
    description: 'Explore your personalized memory capsule and share it with friends and family.',
    image: 'https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?q=80&w=800&auto=format'
  }
];

const HowItWorksSection = () => {
  return (
    <section className="py-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">How It Works</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Four simple steps to transform your travel experiences into lasting memories.
          </p>
        </div>
        
        <div className="space-y-24">
          {steps.map((step, index) => (
            <div 
              key={index} 
              className={`flex flex-col ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} items-center gap-8 md:gap-16`}
            >
              <div className="w-full md:w-1/2 space-y-6">
                <div className="flex items-center">
                  <span className="text-6xl font-bold text-gray-100">{step.number}</span>
                  <ArrowRight className="h-6 w-6 text-gray-300 mx-4" />
                  <h3 className="text-2xl font-bold text-gray-900">{step.title}</h3>
                </div>
                <p className="text-lg text-gray-600 pl-24">{step.description}</p>
              </div>
              
              <div className="w-full md:w-1/2 overflow-hidden rounded-xl shadow-lg">
                <img 
                  src={step.image} 
                  alt={step.title}
                  className="w-full h-80 object-cover transition-transform duration-500 hover:scale-105"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
