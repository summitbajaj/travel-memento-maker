
import React, { useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

const HeroSection = () => {
  const imagesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!imagesRef.current) return;
      
      const { clientX, clientY } = e;
      const images = imagesRef.current.querySelectorAll('.parallax-image');
      
      images.forEach((image, index) => {
        const htmlImage = image as HTMLElement;
        const speed = 0.01 + (index * 0.005);
        
        const x = (window.innerWidth / 2 - clientX) * speed;
        const y = (window.innerHeight / 2 - clientY) * speed;
        
        htmlImage.style.transform = `translate(${x}px, ${y}px)`;
      });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-blue-50/30 to-white/95 z-0"></div>
      
      <div ref={imagesRef} className="absolute inset-0 overflow-hidden">
        {[
          'https://images.unsplash.com/photo-1433086966358-54859d0ed716?q=80&w=400&auto=format',
          'https://images.unsplash.com/photo-1482938289607-e9573fc25ebb?q=80&w=400&auto=format',
          'https://images.unsplash.com/photo-1472396961693-142e6e269027?q=80&w=400&auto=format'
        ].map((src, index) => (
          <div 
            key={index}
            className={`parallax-image absolute rounded-xl shadow-2xl opacity-70 
              ${index === 0 ? 'w-64 top-[15%] right-[10%] rotate-3' : ''}
              ${index === 1 ? 'w-56 bottom-[20%] left-[15%] -rotate-6' : ''}
              ${index === 2 ? 'w-48 top-[30%] left-[10%] rotate-12' : ''}
            `}
          >
            <img 
              src={src} 
              alt="Travel memory" 
              className="w-full h-full object-cover rounded-xl"
              loading="lazy"
              style={{transition: 'transform 0.6s cubic-bezier(0.22, 1, 0.36, 1)'}}
            />
          </div>
        ))}
      </div>
      
      <div className="max-w-4xl mx-auto text-center px-6 z-10">
        <div className="animate-fade-in">
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
            <Button className="rounded-full h-12 px-8 text-base bg-gray-900 hover:bg-gray-800 transition-all duration-300">
              Create a Memory
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button variant="outline" className="rounded-full h-12 px-8 text-base">
              Explore Gallery
            </Button>
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 rounded-full border-2 border-gray-400 flex justify-center pt-1">
          <div className="w-1 h-2 bg-gray-400 rounded-full animate-ping-slow"></div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
