import React, { useRef, useEffect } from 'react';
import { Menu, X, Settings, PlusCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { useIsMobile } from '@/hooks/use-mobile';
import { Link } from 'react-router-dom';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

const Header = () => {
  const isMobile = useIsMobile();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = React.useState(false);
  const dropdownRef = useRef(null);

  // Handle click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-6 py-4 backdrop-blur-lg bg-white/90 border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Link to="/" className="text-xl font-medium tracking-tight">Memory Capsule</Link>
        </div>

        {isMobile ? (
          <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-full">
                {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px] border-l">
              <nav className="flex flex-col gap-4 mt-8">
                <Link to="/product" onClick={() => setIsMenuOpen(false)}>
                  <Button variant="ghost" className="justify-start h-12 text-lg w-full">Product</Button>
                </Link>
                <Link to="/features" onClick={() => setIsMenuOpen(false)}>
                  <Button variant="ghost" className="justify-start h-12 text-lg w-full">Features</Button>
                </Link>
                <Link to="/pricing" onClick={() => setIsMenuOpen(false)}>
                  <Button variant="ghost" className="justify-start h-12 text-lg w-full">Pricing</Button>
                </Link>
                <Link to="/faq" onClick={() => setIsMenuOpen(false)}>
                  <Button variant="ghost" className="justify-start h-12 text-lg w-full">FAQ</Button>
                </Link>
                <Link to="/about" onClick={() => setIsMenuOpen(false)}>
                  <Button variant="ghost" className="justify-start h-12 text-lg w-full">About</Button>
                </Link>
                <Link to="/create" onClick={() => setIsMenuOpen(false)}>
                  <Button variant="ghost" className="justify-start h-12 text-lg w-full">
                    <PlusCircle className="mr-2 h-5 w-5" />
                    Create Memory
                  </Button>
                </Link>
                <Link to="/settings" onClick={() => setIsMenuOpen(false)}>
                  <Button variant="ghost" className="justify-start h-12 text-lg w-full">
                    <Settings className="mr-2 h-5 w-5" />
                    Settings
                  </Button>
                </Link>
              </nav>
            </SheetContent>
          </Sheet>
        ) : (
          <nav className="flex items-center gap-4">
            {/* Custom dropdown implementation instead of NavigationMenu */}
            <div className="relative" ref={dropdownRef}>
              <button 
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center gap-1 px-4 py-2 rounded-md hover:bg-gray-100 transition-colors"
              >
                <span>Product</span>
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  width="16" 
                  height="16" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                  className={`ml-1 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`}
                >
                  <path d="m6 9 6 6 6-6"/>
                </svg>
              </button>
              
              {isDropdownOpen && (
                <div className="absolute left-0 mt-2 w-[420px] max-w-[90vw] bg-white rounded-md shadow-lg border border-gray-200 z-50">
                  <div className="p-4 grid gap-3 md:grid-cols-2">
                    <div className="row-span-3 md:col-span-1">
                      <Link
                        to="/product"
                        className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-blue-50 to-blue-100 p-6 no-underline outline-none focus:shadow-md"
                        onClick={() => setIsDropdownOpen(false)}
                      >
                        <div className="mt-4 mb-2 text-lg font-medium">
                          Memory Capsule
                        </div>
                        <p className="text-sm leading-tight text-gray-600">
                          Transform your travel experiences into beautiful digital mementos.
                        </p>
                      </Link>
                    </div>
                    
                    <div className="md:col-span-1">
                      <Link 
                        to="/features" 
                        className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-blue-50 focus:bg-blue-50"
                        onClick={() => setIsDropdownOpen(false)}
                      >
                        <div className="text-sm font-medium leading-none">Features</div>
                        <p className="line-clamp-2 text-sm leading-snug text-gray-500">
                          Explore all the powerful features we offer
                        </p>
                      </Link>
                    </div>
                    
                    <div className="md:col-span-1">
                      <Link 
                        to="/pricing" 
                        className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-blue-50 focus:bg-blue-50"
                        onClick={() => setIsDropdownOpen(false)}
                      >
                        <div className="text-sm font-medium leading-none">Pricing</div>
                        <p className="line-clamp-2 text-sm leading-snug text-gray-500">
                          Find the perfect plan for you or your team
                        </p>
                      </Link>
                    </div>
                    
                    <div className="md:col-span-1">
                      <Link 
                        to="/faq" 
                        className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-blue-50 focus:bg-blue-50"
                        onClick={() => setIsDropdownOpen(false)}
                      >
                        <div className="text-sm font-medium leading-none">FAQ</div>
                        <p className="line-clamp-2 text-sm leading-snug text-gray-500">
                          Frequently asked questions about our product
                        </p>
                      </Link>
                    </div>
                    
                    <div className="md:col-span-1">
                      <Link 
                        to="/about" 
                        className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-blue-50 focus:bg-blue-50"
                        onClick={() => setIsDropdownOpen(false)}
                      >
                        <div className="text-sm font-medium leading-none">About Us</div>
                        <p className="line-clamp-2 text-sm leading-snug text-gray-500">
                          Learn about our mission and values
                        </p>
                      </Link>
                    </div>
                  </div>
                </div>
              )}
            </div>
            
            <Link to="/create">
              <Button variant="ghost" className="font-medium">
                <PlusCircle className="mr-2 h-4 w-4" />
                Create Memory
              </Button>
            </Link>
            
            <Link to="/settings">
              <Button variant="ghost" className="font-medium">
                <Settings className="mr-2 h-4 w-4" />
                Settings
              </Button>
            </Link>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;