
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { CheckCircle } from 'lucide-react';
import FeaturesSection from '@/components/FeaturesSection';

const Features = () => {
  const featuresList = [
    "Create beautiful digital postcards with AI-enhanced captions",
    "Generate custom trip soundtracks that match your journey's mood",
    "Turn your travel stories into compelling narratives",
    "Easily share your memories with friends and family",
    "Download your entire collection for offline viewing",
    "Organize memories by trip, location, or date",
    "Add custom tags and annotations to your photos",
    "Access your memories from any device",
    "Collaborate with travel companions to build shared memories",
    "Unlimited cloud storage for all your travel experiences"
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">Features</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Discover all the powerful tools and features that make Memory Capsule the perfect way to preserve your travel experiences.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
            <div>
              <h2 className="text-2xl font-bold mb-6 text-gray-900">Everything You Need</h2>
              <ul className="space-y-4">
                {featuresList.map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <CheckCircle className="h-6 w-6 text-green-500 mr-3 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-xl overflow-hidden shadow-lg">
              <img 
                src="https://images.unsplash.com/photo-1516546453174-5e1098a4b4af?q=80&w=800&auto=format" 
                alt="Feature showcase"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          <FeaturesSection />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Features;
