
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const FAQ = () => {
  const faqs = [
    {
      question: "What is Memory Capsule?",
      answer: "Memory Capsule is an AI-powered platform that helps you transform your travel experiences into beautiful digital mementos. We create postcards, custom soundtracks, and narratives based on your photos and descriptions."
    },
    {
      question: "How do I get started?",
      answer: "Getting started is easy! Simply create an account, click on 'Create Memory' in the navigation bar, and follow the guided process to upload your photos and descriptions. Our AI will do the rest!"
    },
    {
      question: "Is my data secure?",
      answer: "Yes, we take data security very seriously. All your photos and content are encrypted and stored securely. We never share your data with third parties without your explicit permission."
    },
    {
      question: "Can I share my memory capsules with others?",
      answer: "Absolutely! You can share your memory capsules via a unique link that you can send to friends and family. You can also download your capsules to share offline."
    },
    {
      question: "How many photos can I include in a memory capsule?",
      answer: "The number of photos depends on your subscription plan. Free users can include up to 10 photos per capsule, while Premium users can include up to 100 photos per capsule."
    },
    {
      question: "Can I edit the AI-generated content?",
      answer: "Yes, you have full control over the AI-generated content. You can edit captions, narratives, and other elements to make them perfect for your memories."
    },
    {
      question: "What formats can I download my memory capsules in?",
      answer: "You can download your postcards as images (JPEG/PNG), narratives as text files, and complete capsules as ZIP archives containing all elements."
    },
    {
      question: "Do you offer a free trial?",
      answer: "Yes, we offer a 14-day free trial of our Premium plan so you can experience all the features before deciding if it's right for you."
    },
    {
      question: "How do I cancel my subscription?",
      answer: "You can cancel your subscription at any time from your account settings. Your data will remain accessible for 30 days after cancellation."
    },
    {
      question: "Is there a mobile app available?",
      answer: "We currently offer a responsive web application that works great on mobile devices. A dedicated mobile app is in development and coming soon."
    }
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow pt-24 pb-16">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">Frequently Asked Questions</h1>
            <p className="text-xl text-gray-600">
              Find answers to common questions about Memory Capsule.
            </p>
          </div>

          <Accordion type="single" collapsible className="mb-16">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left text-lg font-medium text-gray-900">{faq.question}</AccordionTrigger>
                <AccordionContent className="text-gray-700">{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          <div className="text-center py-8 bg-gray-50 rounded-xl">
            <h2 className="text-2xl font-bold mb-4 text-gray-900">Still have questions?</h2>
            <p className="text-gray-600 mb-6">
              If you couldn't find the answer you were looking for, check out our product page for more information.
            </p>
            <Link to="/product">
              <Button className="rounded-full h-12 px-8 text-base bg-blue-600 hover:bg-blue-700 text-white">
                Learn More About Our Product
              </Button>
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default FAQ;
