import React from 'react';
import { ArrowRight } from 'lucide-react';

const steps = [
  {
    number: '1',
    title: 'Upload Your Photos',
    description: 'Select your favorite photos that capture the essence of your trip.',
    image: 'https://images.unsplash.com/photo-1472396961693-142e6e269027?q=80&w=800&auto=format'
  },
  {
    number: '2',
    title: 'AI Enhancement',
    description: 'Our AI generates postcards, soundtracks, and narratives from your content.',
    image: 'https://images.unsplash.com/photo-1433086966358-54859d0ed716?q=80&w=800&auto=format'
  },
  {
    number: '3',
    title: 'Share Your Memories',
    description: 'Explore your personalized memory capsule and share it with loved ones.',
    image: 'https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?q=80&w=800&auto=format'
  }
];

const HowItWorksSection = () => {
  return (
    <section id="how-it-works" className="py-20 bg-gray-50">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">How It Works</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Three simple steps to transform your travel experiences into lasting memories.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <div 
              key={index} 
              className="bg-white rounded-xl overflow-hidden shadow-md transition-transform hover:shadow-lg hover:-translate-y-1"
            >
              <div className="h-48 overflow-hidden">
                <img 
                  src={step.image} 
                  alt={step.title}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                />
              </div>
              
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <div className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-100 text-blue-600 font-bold mr-3">
                    {step.number}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">{step.title}</h3>
                </div>
                <p className="text-gray-600">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;