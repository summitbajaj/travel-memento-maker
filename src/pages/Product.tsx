
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const Product = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">Memory Capsule Product</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our intuitive platform helps you preserve your travel memories in beautiful digital formats.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
            <div>
              <h2 className="text-2xl font-bold mb-4 text-gray-900">Preserve Your Travel Memories</h2>
              <p className="text-gray-600 mb-6">
                Memory Capsule transforms your photos, stories, and experiences into beautiful digital mementos that you can
                revisit and share for years to come. Our AI-powered technology enhances your content and creates meaningful
                narratives that capture the essence of your travels.
              </p>
              <Link to="/create">
                <Button className="rounded-full h-12 px-8 text-base bg-blue-600 hover:bg-blue-700 text-white">
                  Start Creating Now
                </Button>
              </Link>
            </div>
            <div className="rounded-xl overflow-hidden shadow-lg">
              <img 
                src="https://images.unsplash.com/photo-1527631746610-bca00a040d60?q=80&w=800&auto=format" 
                alt="Travel memories"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          <div className="mb-16">
            <h2 className="text-3xl font-bold mb-8 text-center text-gray-900">Key Product Benefits</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card>
                <CardHeader>
                  <CardTitle>AI-Enhanced Postcards</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Turn your favorite photos into stunning digital postcards with AI-generated captions that capture the mood and essence.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Custom Trip Soundtracks</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Get personalized music recommendations that match the atmosphere and emotions of your journey.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Narrative Generation</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Our AI crafts compelling stories based on your photos and descriptions that bring your adventures to life.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>

          <div className="text-center">
            <Link to="/features">
              <Button variant="outline" className="rounded-full h-12 px-8 text-base mr-4">
                Explore All Features
              </Button>
            </Link>
            <Link to="/pricing">
              <Button className="rounded-full h-12 px-8 text-base bg-blue-600 hover:bg-blue-700 text-white">
                View Pricing
              </Button>
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Product;
