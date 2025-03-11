
import React from 'react';
import { Camera, Music, FileText, Star, Share2, Download } from 'lucide-react';

const features = [
  {
    icon: <Camera className="h-8 w-8" />,
    title: 'Custom Postcards',
    description: 'Transform your photos into beautifully designed digital postcards with AI-generated captions.'
  },
  {
    icon: <Music className="h-8 w-8" />,
    title: 'Trip Soundtrack',
    description: 'Get a personalized playlist that captures the mood and emotions of your journey.'
  },
  {
    icon: <FileText className="h-8 w-8" />,
    title: 'Journey Narrative',
    description: 'AI-crafted stories that bring your travel experiences to life in vivid detail.'
  },
  {
    icon: <Star className="h-8 w-8" />,
    title: 'Highlight Moments',
    description: 'Automatically identify and showcase the most memorable moments from your trip.'
  },
  {
    icon: <Share2 className="h-8 w-8" />,
    title: 'Easy Sharing',
    description: 'Share your travel memories with friends and family via link or social media.'
  },
  {
    icon: <Download className="h-8 w-8" />,
    title: 'Download All',
    description: 'Download your entire memory capsule as a ZIP file to keep forever.'
  }
];

const FeaturesSection = () => {
  return (
    <section className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">Preserve Your Adventures</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Our AI-powered platform transforms your travel photos and stories into meaningful digital keepsakes.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="bg-white rounded-xl p-8 shadow-sm border border-gray-100 transition-all duration-300 hover:shadow-md"
            >
              <div className="w-14 h-14 rounded-full bg-gray-100 flex items-center justify-center mb-6">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
