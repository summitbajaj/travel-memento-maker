import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-16 overflow-hidden">
      {/* Background gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-blue-50/70 to-white z-0"></div>
      
      {/* Background images with fixed positioning */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        {[
          'https://images.unsplash.com/photo-1433086966358-54859d0ed716?q=80&w=800&auto=format',
          'https://images.unsplash.com/photo-1482938289607-e9573fc25ebb?q=80&w=800&auto=format',
          'https://images.unsplash.com/photo-1472396961693-142e6e269027?q=80&w=800&auto=format'
        ].map((src, index) => (
          <div 
            key={index}
            className={`absolute rounded-xl shadow-2xl opacity-80 transition-transform duration-700 ease-in-out
              ${index === 0 ? 'w-80 top-[15%] right-[15%] rotate-3 hover:rotate-1 hover:scale-105' : ''}
              ${index === 1 ? 'w-72 bottom-[20%] left-[20%] -rotate-6 hover:rotate-[-3deg] hover:scale-105' : ''}
              ${index === 2 ? 'w-64 top-[30%] left-[10%] rotate-12 hover:rotate-9 hover:scale-105' : ''}
            `}
          >
            <img 
              src={src} 
              alt="Travel memory" 
              className="w-full h-full object-cover rounded-xl"
              loading="lazy"
            />
          </div>
        ))}
      </div>
      
      {/* Hero content */}
      <div className="max-w-4xl mx-auto text-center px-6 z-10">
        <div className="bg-white/90 backdrop-blur-sm p-8 md:p-10 rounded-xl shadow-sm">
          <span className="inline-block py-1 px-3 mb-6 rounded-full bg-gray-100 text-gray-800 text-sm font-medium">
            Transform your travel memories
          </span>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight text-gray-900">
            Capture your journey,<br />relive the memories
          </h1>
          <p className="text-lg md:text-xl text-gray-600 mb-10 max-w-2xl mx-auto leading-relaxed">
            Turn your travel experiences into beautiful digital mementos. Upload photos, share stories, and let AI create personalized postcards, soundtracks, and narratives.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/create">
              <Button className="rounded-full h-12 px-8 text-base bg-blue-600 hover:bg-blue-700 text-white transition-all duration-300">
                Create a Memory
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link to="/settings">
              <Button variant="outline" className="rounded-full h-12 px-8 text-base border-gray-300 text-gray-700 hover:bg-gray-100">
                Configure API Keys
              </Button>
            </Link>
          </div>
        </div>
      </div>
      
      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 opacity-75 hover:opacity-100 transition-opacity">
        <Link to="#features" className="flex flex-col items-center text-gray-500 hover:text-gray-700">
          <span className="text-sm mb-2">Scroll to explore</span>
          <div className="w-6 h-10 rounded-full border-2 border-gray-400 flex justify-center pt-1">
            <div className="w-1 h-2 bg-gray-400 rounded-full animate-bounce"></div>
          </div>
        </Link>
      </div>
    </section>
  );
};

export default HeroSection;