
import React from 'react';
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
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

const Header = () => {
  const isMobile = useIsMobile();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

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
          <nav className="flex items-center gap-8">
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger>Product</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                      <li className="row-span-3">
                        <NavigationMenuLink asChild>
                          <Link
                            to="/product"
                            className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-blue-50 to-blue-100 p-6 no-underline outline-none focus:shadow-md"
                          >
                            <div className="mt-4 mb-2 text-lg font-medium">
                              Memory Capsule
                            </div>
                            <p className="text-sm leading-tight text-gray-600">
                              Transform your travel experiences into beautiful digital mementos.
                            </p>
                          </Link>
                        </NavigationMenuLink>
                      </li>
                      <li>
                        <Link to="/features" className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-blue-50 focus:bg-blue-50">
                          <div className="text-sm font-medium leading-none">Features</div>
                          <p className="line-clamp-2 text-sm leading-snug text-gray-500">
                            Explore all the powerful features we offer
                          </p>
                        </Link>
                      </li>
                      <li>
                        <Link to="/pricing" className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-blue-50 focus:bg-blue-50">
                          <div className="text-sm font-medium leading-none">Pricing</div>
                          <p className="line-clamp-2 text-sm leading-snug text-gray-500">
                            Find the perfect plan for you or your team
                          </p>
                        </Link>
                      </li>
                      <li>
                        <Link to="/faq" className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-blue-50 focus:bg-blue-50">
                          <div className="text-sm font-medium leading-none">FAQ</div>
                          <p className="line-clamp-2 text-sm leading-snug text-gray-500">
                            Frequently asked questions about our product
                          </p>
                        </Link>
                      </li>
                      <li>
                        <Link to="/about" className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-blue-50 focus:bg-blue-50">
                          <div className="text-sm font-medium leading-none">About Us</div>
                          <p className="line-clamp-2 text-sm leading-snug text-gray-500">
                            Learn about our mission and values
                          </p>
                        </Link>
                      </li>
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Link to="/create">
                    <Button variant="ghost" className="font-medium">
                      <PlusCircle className="mr-2 h-4 w-4" />
                      Create Memory
                    </Button>
                  </Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Link to="/settings">
                    <Button variant="ghost" className="font-medium">
                      <Settings className="mr-2 h-4 w-4" />
                      Settings
                    </Button>
                  </Link>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
