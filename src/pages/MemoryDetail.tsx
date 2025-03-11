import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
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
  const location = useLocation();
  const { getMemory, updateMemory } = useMemories();
  const [memory, setMemory] = useState<Memory | undefined>(undefined);
  const [isGenerating, setIsGenerating] = useState(false);

  useEffect(() => {
    if (id) {
      const foundMemory = getMemory(id);
      if (foundMemory) {
        setMemory(foundMemory);

        const searchParams = new URLSearchParams(location.search);
        const autoGenerate = searchParams.get('autoGenerate');

        if (!foundMemory.generationComplete && (autoGenerate === 'true' || isGenerating)) {
          startGeneration(foundMemory);
        }
      } else {
        toast.error("Memory not found");
        navigate('/');
      }
    }
  }, [id, getMemory, navigate, location.search]);

  const generateMemoryContent = async (mem: Memory) => {
    try {
      const openaiKey = localStorage.getItem('openai-api-key');

      // Generate postcards with image descriptions using GPT-4o Vision
      const postcards = [];
      for (let i = 0; i < Math.min(mem.photos.length, 3); i++) {
        const photoUrl = mem.photos[i].url;
        let imageContent;
        if (photoUrl.startsWith('data:image')) {
          imageContent = photoUrl;
        } else {
          try {
            const response = await fetch(photoUrl);
            const blob = await response.blob();
            const reader = new FileReader();
            imageContent = await new Promise((resolve) => {
              reader.onloadend = () => resolve(reader.result);
              reader.readAsDataURL(blob);
            });
          } catch (error) {
            console.error('Error fetching image:', error);
            postcards.push({
              id: `postcard-${i + 1}`,
              imageUrl: photoUrl,
              caption: `Beautiful moments in ${mem.destination}`
            });
            continue;
          }
        }

        const captionResponse = await fetch('https://api.openai.com/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${openaiKey}`
          },
          body: JSON.stringify({
            model: 'gpt-4o',
            messages: [
              {
                role: 'system',
                content: 'You are a poetic travel writer who creates beautiful, evocative captions for travel photos. Keep captions concise (1-2 sentences) but deeply atmospheric.'
              },
              {
                role: 'user',
                content: [
                  {
                    type: 'text',
                    text: `Create a beautiful, poetic caption for this travel photo from ${mem.destination}. Focus on the mood, atmosphere, and essence captured in the image.`
                  },
                  {
                    type: 'image_url',
                    image_url: {
                      url: imageContent
                    }
                  }
                ]
              }
            ],
            max_tokens: 100
          })
        });

        const captionData = await captionResponse.json();
        postcards.push({
          id: `postcard-${i + 1}`,
          imageUrl: photoUrl,
          caption: captionData.choices[0].message.content.replace(/"/g, '')
        });
      }

      // Collect all photo image data for narrative generation
      const photoContents = [];
      for (let i = 0; i < Math.min(mem.photos.length, 5); i++) {
        const photoUrl = mem.photos[i].url;
        if (photoUrl.startsWith('data:image')) {
          photoContents.push({
            type: 'image_url',
            image_url: {
              url: photoUrl
            }
          });
        } else {
          try {
            const response = await fetch(photoUrl);
            const blob = await response.blob();
            const reader = new FileReader();
            const imageContent = await new Promise((resolve) => {
              reader.onloadend = () => resolve(reader.result);
              reader.readAsDataURL(blob);
            });
            photoContents.push({
              type: 'image_url',
              image_url: {
                url: imageContent as string
              }
            });
          } catch (error) {
            console.error('Error fetching image:', error);
            continue;
          }
        }
      }

      // Generate narrative using GPT-4o based on actual photo content
      const messageContent = [
        {
          type: 'text',
          text: `Create an evocative, creative travel narrative about a trip to ${mem.destination} for the dates ${format(new Date(mem.startDate), 'MMM d, yyyy')} to ${format(new Date(mem.endDate), 'MMM d, yyyy')}. 
Description: ${mem.description || 'No additional details provided.'}

Instead of a day-by-day breakdown, write a flowing, atmospheric piece that captures the essence of the destination and the emotional journey of the travelers. Focus on sensory details, meaningful moments, and the spirit of the place. Make it evocative and literary in style, with rich imagery. Title the piece creatively.`
        },
        ...photoContents
      ];

      const narrativeResponse = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${openaiKey}`
        },
        body: JSON.stringify({
          model: 'gpt-4o',
          messages: [
            {
              role: 'system',
              content: 'You are a masterful travel writer who creates evocative, literary narratives about travel experiences. Your writing is rich with sensory details, emotional resonance, and a strong sense of place.'
            },
            {
              role: 'user',
              content: messageContent
            }
          ],
          max_tokens: 1200
        })
      });

      const narrativeData = await narrativeResponse.json();
      const narrative = narrativeData.choices[0].message.content;

      // Generate highlights based on photos and description
      const highlightsResponse = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${openaiKey}`
        },
        body: JSON.stringify({
          model: 'gpt-4o',
          messages: [
            {
              role: 'system',
              content: 'Create a list of 5 vivid, specific highlights or memorable moments that would define this trip based on the photos and description.'
            },
            {
              role: 'user',
              content: messageContent
            }
          ],
          max_tokens: 500
        })
      });

      const highlightsData = await highlightsResponse.json();
      const highlightsText = highlightsData.choices[0].message.content;
      const highlights = highlightsText
        .split(/\n/)
        .filter(line => line.trim().match(/^(\d+\.|\*|\-)\s+/))
        .map(line => line.replace(/^(\d+\.|\*|\-)\s+/, '').trim());

      // Generate soundtrack using Spotify (same as before)
      const spotifyClientId = localStorage.getItem('spotify-client-id');
      const spotifyClientSecret = localStorage.getItem('spotify-client-secret');

      // Get Spotify access token
      const tokenResponse = await fetch('https://accounts.spotify.com/api/token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Authorization': 'Basic ' + btoa(`${spotifyClientId}:${spotifyClientSecret}`)
        },
        body: 'grant_type=client_credentials'
      });
      const tokenData = await tokenResponse.json();
      const accessToken = tokenData.access_token;

      // Generate mood keywords for the trip using OpenAI
      const moodResponse = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${openaiKey}`
        },
        body: JSON.stringify({
          model: 'gpt-4o',
          messages: [
            {
              role: 'system',
              content: 'Generate 3 specific music genres or moods for a travel soundtrack that perfectly captures the vibe in these photos.'
            },
            {
              role: 'user',
              content: messageContent
            }
          ],
          max_tokens: 100
        })
      });
      const moodData = await moodResponse.json();
      let moods = moodData.choices[0].message.content
        .split(/,|\n/)
        .map(mood => mood.trim())
        .filter(mood => mood !== '');
      if (moods.length === 0) {
        moods = ['chill'];
      }

      // Search for tracks based on moods
      let tracks = [];
      for (const mood of moods) {
        if (!mood) continue;
        const searchResponse = await fetch(`https://api.spotify.com/v1/search?q=${encodeURIComponent(mood)}&type=track&limit=4`, {
          headers: {
            'Authorization': `Bearer ${accessToken}`
          }
        });
        const searchData = await searchResponse.json();
        if (searchData.tracks && searchData.tracks.items) {
          tracks = [
            ...tracks,
            ...searchData.tracks.items.map(item => ({
              name: item.name,
              artist: item.artists[0].name,
              url: item.external_urls.spotify
            }))
          ];
        }
      }
      // Filter to get a diverse set of 10 tracks maximum
      tracks = tracks.filter((track, index, self) => index === self.findIndex(t => t.name === track.name)).slice(0, 10);

      const generatedMemory = {
        ...mem,
        generationComplete: true,
        postcards,
        soundtrack: {
          id: Date.now().toString(),
          songs: tracks
        },
        narrative,
        highlights
      };

      updateMemory(mem.id, generatedMemory);
      setMemory(generatedMemory);
      setIsGenerating(false);
      toast.success("Memory generation complete!");

    } catch (error) {
      console.error('Error generating memory content:', error);
      toast.error("Error generating memory content. Please check your API keys and try again.");
      setIsGenerating(false);
    }
  };

  const startGeneration = (mem: Memory) => {
    if (isGenerating) return;
    setIsGenerating(true);
    const openaiKey = localStorage.getItem('openai-api-key');
    const spotifyClientId = localStorage.getItem('spotify-client-id');
    const spotifyClientSecret = localStorage.getItem('spotify-client-secret');
    if (!openaiKey || !spotifyClientId || !spotifyClientSecret) {
      toast.error("Please configure your API keys in Settings first");
      navigate('/settings');
      setIsGenerating(false);
      return;
    }
    toast.info("Generating your memory capsule. This may take a minute...");
    generateMemoryContent(mem);
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
                          {song.url && (
                            <a 
                              href={song.url} 
                              target="_blank" 
                              rel="noopener noreferrer" 
                              className="text-xs text-blue-600 hover:underline"
                            >
                              Listen on Spotify
                            </a>
                          )}
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
                  onClick={() => startGeneration(memory)}
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
