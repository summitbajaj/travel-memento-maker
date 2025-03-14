
import React from 'react';
import { Button } from '@/components/ui/button';
import { Github, Twitter, Instagram } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <h2 className="text-xl font-medium mb-4">Memory Capsule</h2>
            <p className="text-gray-600 mb-6 max-w-md">
              Transform your travel experiences into beautiful digital mementos with our AI-powered platform.
            </p>
            <div className="flex space-x-4">
              <Button variant="ghost" size="icon" className="rounded-full">
                <Twitter size={18} />
              </Button>
              <Button variant="ghost" size="icon" className="rounded-full">
                <Instagram size={18} />
              </Button>
              <Button variant="ghost" size="icon" className="rounded-full">
                <Github size={18} />
              </Button>
            </div>
          </div>
          
          <div>
            <h3 className="font-medium mb-4 text-gray-900">Product</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/features">
                  <Button variant="link" className="p-0 h-auto text-gray-600 hover:text-gray-900">Features</Button>
                </Link>
              </li>
              <li>
                <Link to="/pricing">
                  <Button variant="link" className="p-0 h-auto text-gray-600 hover:text-gray-900">Pricing</Button>
                </Link>
              </li>
              <li>
                <Link to="/faq">
                  <Button variant="link" className="p-0 h-auto text-gray-600 hover:text-gray-900">FAQ</Button>
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-medium mb-4 text-gray-900">Company</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/about">
                  <Button variant="link" className="p-0 h-auto text-gray-600 hover:text-gray-900">About</Button>
                </Link>
              </li>
              <li>
                <Button variant="link" className="p-0 h-auto text-gray-600 hover:text-gray-900">Contact</Button>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-100 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-gray-500">
            © {new Date().getFullYear()} Memory Capsule. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Button variant="link" className="p-0 h-auto text-sm text-gray-500">
              Privacy Policy
            </Button>
            <Button variant="link" className="p-0 h-auto text-sm text-gray-500">
              Terms of Service
            </Button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
