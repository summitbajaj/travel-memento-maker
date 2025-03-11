
import React from 'react';
import { Link } from 'react-router-dom';
import { useMemories, Memory } from '@/contexts/MemoryContext';
import { format } from 'date-fns';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { MapPin, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';

const MemoryGallery = () => {
  const { memories } = useMemories();

  if (memories.length === 0) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-semibold mb-4">Your Memory Gallery</h2>
        <p className="text-muted-foreground mb-8">You haven't created any memories yet.</p>
        <Link to="/create">
          <Button className="bg-blue-600 hover:bg-blue-700 text-white">
            Create Your First Memory
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <section className="py-12">
      <div className="max-w-5xl mx-auto px-6">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-semibold">Your Memory Gallery</h2>
          <Link to="/create">
            <Button className="bg-blue-600 hover:bg-blue-700 text-white">
              Create New Memory
            </Button>
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {memories.map((memory) => (
            <MemoryCard key={memory.id} memory={memory} />
          ))}
        </div>
      </div>
    </section>
  );
};

const MemoryCard = ({ memory }: { memory: Memory }) => {
  // Get the first photo as cover, or use placeholder
  const coverPhoto = memory.photos[0]?.url || "/placeholder.svg";
  
  return (
    <Card className="overflow-hidden flex flex-col h-full">
      <div className="aspect-video overflow-hidden">
        <img 
          src={coverPhoto} 
          alt={memory.title} 
          className="w-full h-full object-cover transition-transform hover:scale-105"
        />
      </div>
      <CardContent className="flex-grow p-5">
        <h3 className="font-bold text-lg mb-2 line-clamp-1">{memory.title}</h3>
        <div className="flex flex-col gap-2 text-sm text-muted-foreground mb-4">
          <div className="flex items-center">
            <MapPin size={14} className="mr-1 flex-shrink-0" />
            <span className="truncate">{memory.destination}</span>
          </div>
          <div className="flex items-center">
            <Calendar size={14} className="mr-1 flex-shrink-0" />
            <span>
              {memory.startDate && memory.endDate ? (
                `${format(new Date(memory.startDate), 'MMM d')} - ${format(new Date(memory.endDate), 'MMM d, yyyy')}`
              ) : 'Dates not specified'}
            </span>
          </div>
        </div>
        <p className="text-sm line-clamp-2">{memory.description || 'No description provided.'}</p>
      </CardContent>
      <CardFooter className="p-5 pt-0">
        <Link to={`/memory/${memory.id}`} className="w-full">
          <Button className="w-full" variant="outline">
            View Memory
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
};

export default MemoryGallery;
