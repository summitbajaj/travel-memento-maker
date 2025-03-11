
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useMemories, Memory } from '@/contexts/MemoryContext';
import { format } from 'date-fns';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Loader2, Calendar, MapPin, Clock, Share, Download, ArrowLeft } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const MemoryDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getMemory, updateMemory } = useMemories();
  const [memory, setMemory] = useState<Memory | undefined>(undefined);
  const [isGenerating, setIsGenerating] = useState(false);
  
  useEffect(() => {
    if (id) {
      const foundMemory = getMemory(id);
      if (foundMemory) {
        setMemory(foundMemory);
        
        // If the memory exists but generation is not complete, simulate generation
        if (!foundMemory.generationComplete) {
          simulateGeneration(foundMemory);
        }
      } else {
        toast.error("Memory not found");
        navigate('/');
      }
    }
  }, [id, getMemory, navigate]);
  
  const simulateGeneration = (mem: Memory) => {
    setIsGenerating(true);
    
    // Check if API keys are configured
    const openaiKey = localStorage.getItem('openai-api-key');
    const spotifyClientId = localStorage.getItem('spotify-client-id');
    const spotifyClientSecret = localStorage.getItem('spotify-client-secret');
    
    if (!openaiKey || !spotifyClientId || !spotifyClientSecret) {
      toast.error("Please configure your API keys in Settings first");
      navigate('/settings');
      return;
    }
    
    // Simulate AI generation with timeout
    setTimeout(() => {
      // Mock generated content
      const generatedMemory = {
        ...mem,
        generationComplete: true,
        postcards: [
          { id: '1', imageUrl: mem.photos[0]?.url, caption: `Beautiful views in ${mem.destination}` },
          { id: '2', imageUrl: mem.photos[1]?.url, caption: `Unforgettable moments in ${mem.destination}` },
          { id: '3', imageUrl: mem.photos[2]?.url, caption: `The journey through ${mem.destination} was magnificent` },
        ],
        soundtrack: {
          id: '1',
          songs: [
            { name: 'Wanderlust', artist: 'Travel Tunes' },
            { name: 'Sunset Memories', artist: 'Ambient Journeys' },
            { name: 'Road Less Traveled', artist: 'Voyager' },
            { name: 'Mountain High', artist: 'The Explorers' },
            { name: 'Ocean Waves', artist: 'Coastal Dreams' },
            { name: 'City Lights', artist: 'Urban Adventures' },
            { name: 'Train to Nowhere', artist: 'Nomad Soul' },
            { name: 'Desert Wind', artist: 'The Travelers' },
            { name: 'Foreign Land', artist: 'Border Crossing' },
            { name: 'Coming Home', artist: 'Return Journey' },
          ]
        },
        narrative: `During our trip to ${mem.destination}, we experienced the most incredible adventure. 
        From the moment we arrived, the atmosphere was electric with possibility. 
        The local culture enveloped us in its rich traditions and warm hospitality. 
        We wandered through charming streets, discovering hidden gems around every corner.
        
        The cuisine was a revelation, each meal a celebration of flavors we had never encountered before. 
        Mornings were spent exploring historic sites, while afternoons gave way to peaceful moments of reflection 
        by stunning natural landmarks. The evenings transformed the landscape into a magical backdrop for unforgettable conversations.
        
        Weather patterns shifted unpredictably, but each meteorological surprise only added to the authenticity of our experience. 
        We made friends with locals who shared stories that textbooks could never capture. 
        Their insights gave us a deeper appreciation for the place we were temporarily calling home.
        
        As our journey came to a close, we found ourselves changed in subtle yet profound ways. 
        The memories we collected will remain vivid long after the photos have faded. 
        This trip wasn't just a departure from routine—it was a transformative experience that expanded our understanding of the world and ourselves.`,
        highlights: [
          "Exploring the historic district at sunrise",
          "Tasting local delicacies at the night market",
          "Meeting fellow travelers from across the globe",
          "Witnessing breathtaking natural phenomena",
          "Learning traditional crafts from local artisans"
        ]
      };
      
      // Update the memory with generated content
      updateMemory(mem.id, generatedMemory);
      setMemory(generatedMemory);
      setIsGenerating(false);
      toast.success("Memory generation complete!");
    }, 3000);
  };
  
  if (!memory) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow flex items-center justify-center py-12">
          <Loader2 className="h-10 w-10 animate-spin text-primary" />
        </main>
        <Footer />
      </div>
    );
  }
  
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow py-12 px-6 pt-24">
        <div className="max-w-5xl mx-auto">
          <Button 
            variant="ghost" 
            className="mb-6 flex items-center gap-2"
            onClick={() => navigate('/')}
          >
            <ArrowLeft size={16} />
            Back to Memories
          </Button>
          
          <div className="flex flex-col md:flex-row justify-between items-start gap-6 mb-8">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold">{memory.title}</h1>
              <div className="flex flex-wrap gap-4 mt-3">
                <div className="flex items-center text-muted-foreground">
                  <MapPin size={16} className="mr-1" />
                  {memory.destination}
                </div>
                <div className="flex items-center text-muted-foreground">
                  <Calendar size={16} className="mr-1" />
                  {memory.startDate && memory.endDate ? (
                    `${format(new Date(memory.startDate), 'MMM d, yyyy')} - ${format(new Date(memory.endDate), 'MMM d, yyyy')}`
                  ) : 'Dates not specified'}
                </div>
                <div className="flex items-center text-muted-foreground">
                  <Clock size={16} className="mr-1" />
                  Created {format(new Date(memory.createdAt), 'MMM d, yyyy')}
                </div>
              </div>
            </div>
            
            <div className="flex gap-2">
              <Button variant="outline" className="flex items-center gap-2">
                <Share size={16} />
                Share
              </Button>
              <Button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white">
                <Download size={16} />
                Download
              </Button>
            </div>
          </div>
          
          {isGenerating ? (
            <Card className="w-full p-8 text-center">
              <div className="flex flex-col items-center justify-center gap-4">
                <Loader2 className="h-12 w-12 animate-spin text-primary" />
                <div>
                  <h3 className="text-xl font-semibold">Generating Your Memory Capsule</h3>
                  <p className="text-muted-foreground mt-1">This may take a minute or two...</p>
                </div>
              </div>
            </Card>
          ) : memory.generationComplete ? (
            <Tabs defaultValue="postcards" className="w-full">
              <TabsList className="grid grid-cols-4 mb-6">
                <TabsTrigger value="postcards">Postcards</TabsTrigger>
                <TabsTrigger value="soundtrack">Soundtrack</TabsTrigger>
                <TabsTrigger value="narrative">Narrative</TabsTrigger>
                <TabsTrigger value="highlights">Highlights</TabsTrigger>
              </TabsList>
              
              <TabsContent value="postcards" className="mt-0">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {memory.postcards?.map((postcard) => (
                    <Card key={postcard.id} className="overflow-hidden">
                      <div className="aspect-[4/3] overflow-hidden">
                        <img 
                          src={postcard.imageUrl} 
                          alt={postcard.caption} 
                          className="w-full h-full object-cover transition-transform hover:scale-105"
                        />
                      </div>
                      <CardContent className="p-4">
                        <p className="text-sm italic text-muted-foreground">{postcard.caption}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="soundtrack" className="mt-0">
                <Card>
                  <CardHeader>
                    <CardTitle>Your Trip Soundtrack</CardTitle>
                    <CardDescription>
                      A custom playlist that matches the mood and experience of your journey
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ol className="list-decimal pl-6 space-y-3">
                      {memory.soundtrack?.songs.map((song, index) => (
                        <li key={index} className="pl-2">
                          <div className="font-medium">{song.name}</div>
                          <div className="text-sm text-muted-foreground">{song.artist}</div>
                        </li>
                      ))}
                    </ol>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="narrative" className="mt-0">
                <Card>
                  <CardHeader>
                    <CardTitle>Your Travel Story</CardTitle>
                    <CardDescription>
                      A creative narrative based on your travel experience
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="prose max-w-none">
                      {memory.narrative?.split('\n\n').map((paragraph, index) => (
                        <p key={index}>{paragraph}</p>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="highlights" className="mt-0">
                <Card>
                  <CardHeader>
                    <CardTitle>Trip Highlights</CardTitle>
                    <CardDescription>
                      The most memorable moments from your journey
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-4">
                      {memory.highlights?.map((highlight, index) => (
                        <li key={index} className="flex items-start gap-4">
                          <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center">
                            {index + 1}
                          </div>
                          <div className="flex-1">
                            <p>{highlight}</p>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          ) : (
            <Card className="w-full p-8 text-center">
              <div className="flex flex-col items-center justify-center gap-4">
                <div>
                  <h3 className="text-xl font-semibold">Memory Ready for Generation</h3>
                  <p className="text-muted-foreground mt-1">Click below to start creating your memory capsule</p>
                </div>
                <Button 
                  onClick={() => simulateGeneration(memory)}
                  className="mt-2 bg-blue-600 hover:bg-blue-700 text-white"
                >
                  Generate Now
                </Button>
              </div>
            </Card>
          )}
          
          <div className="mt-12">
            <h2 className="text-xl font-semibold mb-4">Your Photos</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {memory.photos.map((photo, index) => (
                <div key={index} className="aspect-square rounded-md overflow-hidden">
                  <img 
                    src={photo.url} 
                    alt={`Trip photo ${index + 1}`} 
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default MemoryDetail;
