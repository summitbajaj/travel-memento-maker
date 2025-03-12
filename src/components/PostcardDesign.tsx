
import React, { useRef } from 'react';
import { Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import html2canvas from 'html2canvas';

interface PostcardProps {
  imageUrl: string;
  caption: string;
  destination: string;
  date?: string;
}

const PostcardDesign = ({ imageUrl, caption, destination, date }: PostcardProps) => {
  const postcardRef = useRef<HTMLDivElement>(null);

  const handleDownload = async () => {
    if (!postcardRef.current) return;
    
    try {
      toast.info("Preparing your postcard for download...");
      
      const canvas = await html2canvas(postcardRef.current, {
        scale: 2,
        useCORS: true,
        logging: false,
        backgroundColor: null
      });
      
      const imageData = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.href = imageData;
      link.download = `postcard-${destination.toLowerCase().replace(/\s+/g, '-')}.png`;
      link.click();
      
      toast.success("Postcard downloaded successfully!");
    } catch (error) {
      console.error('Error downloading postcard:', error);
      toast.error("Failed to download postcard. Please try again.");
    }
  };

  return (
    <div className="group relative">
      <div 
        ref={postcardRef}
        className="relative overflow-hidden rounded-xl transform transition-all duration-300 hover:shadow-2xl bg-white"
      >
        {/* Postcard Border */}
        <div className="absolute inset-0 border-[10px] border-white rounded-xl pointer-events-none z-10"></div>
        
        {/* Postcard Main Image */}
        <div className="aspect-[4/3] overflow-hidden">
          <img 
            src={imageUrl} 
            alt={caption} 
            className="w-full h-full object-cover transition-transform group-hover:scale-105"
          />
        </div>
        
        {/* Postcard Overlay and Content */}
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent text-white">
          <div className="flex flex-col">
            <div className="flex justify-between items-start mb-2">
              <div className="text-xs font-medium uppercase tracking-wider bg-white/20 backdrop-blur-sm px-2 py-1 rounded">
                {destination}
              </div>
              {date && (
                <div className="text-xs opacity-80">
                  {date}
                </div>
              )}
            </div>
            <p className="text-sm italic font-medium text-white/90">{caption}</p>
          </div>
        </div>
        
        {/* Postcard Stamp Corner */}
        <div className="absolute top-3 right-3 w-16 h-16 rounded-md bg-white/80 backdrop-blur-sm border border-white/50 flex items-center justify-center rotate-6 opacity-60 shadow-lg">
          <div className="text-[8px] uppercase tracking-wider text-gray-600 transform -rotate-6 text-center">
            <div className="border-b border-gray-300 pb-1 mb-1">Memories</div>
            <div className="font-bold">Postcard</div>
          </div>
        </div>
      </div>
      
      {/* Download Button */}
      <Button 
        onClick={handleDownload}
        variant="outline"
        size="sm"
        className="absolute top-3 left-3 opacity-0 group-hover:opacity-100 transition-opacity bg-white/70 hover:bg-white text-gray-700 backdrop-blur-sm z-20"
      >
        <Download size={16} className="mr-1" />
        Save
      </Button>
    </div>
  );
};

export default PostcardDesign;
