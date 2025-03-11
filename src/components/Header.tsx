
import React from 'react';
import { ChevronDown, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { useIsMobile } from '@/hooks/use-mobile';

const Header = () => {
  const isMobile = useIsMobile();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-6 py-4 backdrop-blur-lg bg-white/80 border-b border-gray-100">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-2">
          <h1 className="text-xl font-medium tracking-tight">Memory Capsule</h1>
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
                <Button variant="ghost" className="justify-start h-12 text-lg">Create Trip</Button>
                <Button variant="ghost" className="justify-start h-12 text-lg">My Gallery</Button>
                <Button variant="ghost" className="justify-start h-12 text-lg">Settings</Button>
                <Button variant="ghost" className="justify-start h-12 text-lg">Sign In</Button>
              </nav>
            </SheetContent>
          </Sheet>
        ) : (
          <nav className="flex items-center gap-8">
            <ul className="flex items-center gap-8">
              <li>
                <Button variant="ghost" className="font-medium">Create Trip</Button>
              </li>
              <li>
                <Button variant="ghost" className="font-medium">My Gallery</Button>
              </li>
              <li>
                <Button variant="ghost" className="font-medium">Settings</Button>
              </li>
            </ul>
            <Button variant="outline" className="rounded-full px-6">Sign In</Button>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
