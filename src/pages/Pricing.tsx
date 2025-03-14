
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle } from 'lucide-react';

const PricingTier = ({ 
  title, 
  price, 
  description, 
  features, 
  popular = false 
}: { 
  title: string; 
  price: string; 
  description: string; 
  features: string[]; 
  popular?: boolean; 
}) => {
  return (
    <Card className={`flex flex-col h-full ${popular ? 'border-blue-400 shadow-lg ring-2 ring-blue-200' : ''}`}>
      {popular && (
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-blue-600 text-white px-4 py-1 rounded-full text-sm font-medium">
          Most Popular
        </div>
      )}
      <CardHeader>
        <CardTitle className="text-xl">{title}</CardTitle>
        <div className="mt-3">
          <span className="text-3xl font-bold">{price}</span>
          {price !== 'Free' && <span className="text-gray-500 ml-1">/month</span>}
        </div>
        <CardDescription className="mt-2">{description}</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
        <ul className="space-y-3">
          {features.map((feature, index) => (
            <li key={index} className="flex items-start">
              <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
              <span className="text-gray-700 text-sm">{feature}</span>
            </li>
          ))}
        </ul>
      </CardContent>
      <CardFooter>
        <Button 
          className={`w-full rounded-lg ${popular ? 'bg-blue-600 hover:bg-blue-700' : ''}`}
          variant={popular ? 'default' : 'outline'}
        >
          Get Started
        </Button>
      </CardFooter>
    </Card>
  );
};

const Pricing = () => {
  const pricingTiers = [
    {
      title: "Basic",
      price: "Free",
      description: "Perfect for occasional travelers",
      features: [
        "Up to 5 memory capsules",
        "10 photos per capsule",
        "Basic AI-generated captions",
        "Standard download options",
        "7-day cloud storage"
      ]
    },
    {
      title: "Premium",
      price: "$9.99",
      description: "Ideal for frequent travelers",
      popular: true,
      features: [
        "Unlimited memory capsules",
        "100 photos per capsule",
        "Advanced AI-generated content",
        "Custom trip soundtracks",
        "High-quality downloads",
        "Unlimited cloud storage",
        "Priority support"
      ]
    },
    {
      title: "Family",
      price: "$19.99",
      description: "Share with up to 5 family members",
      features: [
        "Everything in Premium",
        "5 user accounts",
        "Shared memories and collections",
        "Collaborative editing",
        "Family trip organization",
        "Advanced privacy controls",
        "Dedicated support"
      ]
    }
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">Simple, Transparent Pricing</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Choose the plan that works best for you and start preserving your travel memories today.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16 relative">
            {pricingTiers.map((tier, index) => (
              <PricingTier 
                key={index}
                title={tier.title}
                price={tier.price}
                description={tier.description}
                features={tier.features}
                popular={tier.popular}
              />
            ))}
          </div>

          <div className="bg-gray-50 rounded-xl p-8 mb-16">
            <h2 className="text-2xl font-bold mb-4 text-gray-900">Frequently Asked Questions</h2>
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium mb-2 text-gray-900">Can I upgrade or downgrade my plan?</h3>
                <p className="text-gray-600">Yes, you can change your plan at any time. Your new plan will take effect immediately.</p>
              </div>
              <div>
                <h3 className="text-lg font-medium mb-2 text-gray-900">Is there a free trial?</h3>
                <p className="text-gray-600">Yes, we offer a 14-day free trial of our Premium plan so you can experience all the features.</p>
              </div>
              <div>
                <h3 className="text-lg font-medium mb-2 text-gray-900">What happens to my data if I cancel?</h3>
                <p className="text-gray-600">Your data will remain accessible for 30 days after cancellation, giving you time to download your memories.</p>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Pricing;
