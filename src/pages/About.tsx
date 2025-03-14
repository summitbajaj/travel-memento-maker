
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const About = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">About Memory Capsule</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We're on a mission to help people preserve their most precious travel experiences in beautiful digital formats.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-20">
            <div>
              <h2 className="text-2xl font-bold mb-4 text-gray-900">Our Story</h2>
              <p className="text-gray-600 mb-4">
                Memory Capsule was born out of a personal tragedy. When our founder lost years of travel photos in a hard drive crash, he realized how fragile digital memories can be. This experience sparked the idea for a platform that would not only safely store travel memories but transform them into meaningful keepsakes.
              </p>
              <p className="text-gray-600 mb-4">
                Founded in 2022, our team of technologists, designers, and travelers came together with a shared vision: to create a platform that preserves not just photos, but the stories, emotions, and experiences behind them.
              </p>
              <p className="text-gray-600">
                Today, Memory Capsule helps thousands of travelers around the world transform their journeys into beautiful digital mementos that can be revisited and shared for years to come.
              </p>
            </div>
            <div className="rounded-xl overflow-hidden shadow-lg">
              <img 
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=800&auto=format" 
                alt="Our team"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          <div className="mb-20">
            <h2 className="text-3xl font-bold mb-8 text-center text-gray-900">Our Values</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card>
                <CardContent className="pt-6">
                  <h3 className="text-xl font-bold mb-3 text-gray-900">Preservation</h3>
                  <p className="text-gray-600">
                    We believe that travel experiences are precious and deserve to be preserved in ways that capture their full essence and emotion.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <h3 className="text-xl font-bold mb-3 text-gray-900">Innovation</h3>
                  <p className="text-gray-600">
                    We constantly push the boundaries of what's possible with AI and design to create magical experiences that surprise and delight.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <h3 className="text-xl font-bold mb-3 text-gray-900">Privacy</h3>
                  <p className="text-gray-600">
                    We respect that your memories are personal and private. We're committed to protecting your data and giving you full control.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>

          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4 text-gray-900">Ready to Create Your Own Memory Capsule?</h2>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              Join thousands of travelers who are preserving their experiences in beautiful, meaningful ways.
            </p>
            <Link to="/create">
              <Button className="rounded-full h-12 px-8 text-base bg-blue-600 hover:bg-blue-700 text-white">
                Start Creating Now
              </Button>
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default About;
