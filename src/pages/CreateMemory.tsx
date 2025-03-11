
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Calendar } from '@/components/ui/calendar';
import { CalendarIcon, ImagePlus, Loader2 } from 'lucide-react';
import { format } from 'date-fns';
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from '@/lib/utils';

const CreateMemory = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [destination, setDestination] = useState('');
  const [description, setDescription] = useState('');
  const [startDate, setStartDate] = useState<Date | undefined>(undefined);
  const [endDate, setEndDate] = useState<Date | undefined>(undefined);
  const [uploading, setUploading] = useState(false);
  const [photos, setPhotos] = useState<File[]>([]);
  const [photosPreviews, setPhotosPreviews] = useState<string[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newPhotos = Array.from(e.target.files);
      
      // Limit to 10 photos
      const totalPhotos = [...photos, ...newPhotos];
      const limitedPhotos = totalPhotos.slice(0, 10);
      
      if (totalPhotos.length > 10) {
        toast.warning("Maximum of 10 photos allowed. We've selected the first 10.");
      }
      
      setPhotos(limitedPhotos);
      
      // Generate previews
      const previews = limitedPhotos.map(file => URL.createObjectURL(file));
      setPhotosPreviews(previews);
    }
  };

  const removePhoto = (index: number) => {
    const updatedPhotos = [...photos];
    updatedPhotos.splice(index, 1);
    setPhotos(updatedPhotos);
    
    const updatedPreviews = [...photosPreviews];
    URL.revokeObjectURL(updatedPreviews[index]);
    updatedPreviews.splice(index, 1);
    setPhotosPreviews(updatedPreviews);
  };

  const validateForm = () => {
    if (!title) {
      toast.error("Please provide a title for your memory");
      return false;
    }
    if (!destination) {
      toast.error("Please enter your travel destination");
      return false;
    }
    if (!startDate || !endDate) {
      toast.error("Please select both start and end dates for your trip");
      return false;
    }
    if (photos.length === 0) {
      toast.error("Please upload at least one photo");
      return false;
    }
    return true;
  };

  const handleGenerateMemories = async () => {
    if (!validateForm()) return;
    
    // Check if API keys are configured
    const openaiKey = localStorage.getItem('openai-api-key');
    const spotifyClientId = localStorage.getItem('spotify-client-id');
    const spotifyClientSecret = localStorage.getItem('spotify-client-secret');
    
    if (!openaiKey || !spotifyClientId || !spotifyClientSecret) {
      toast.error("Please configure your API keys in Settings first");
      navigate('/settings');
      return;
    }
    
    setIsGenerating(true);
    
    // Simulate the generation process (in a real app, this would call an API)
    try {
      // Mock generation process with a timeout
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      toast.success("Memory capsule created successfully!");
      navigate('/'); // Navigate to gallery or view page when implemented
    } catch (error) {
      toast.error("Failed to generate memory. Please try again.");
      console.error(error);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow py-12 px-6 pt-24">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">Create a New Memory</h1>
          
          <Card>
            <CardHeader>
              <CardTitle>Trip Details</CardTitle>
              <CardDescription>
                Enter the details of your travel experience 
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="title">Memory Title</Label>
                <Input
                  id="title"
                  placeholder="e.g., Summer in Paris"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="destination">Destination</Label>
                <Input
                  id="destination"
                  placeholder="e.g., Paris, France"
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label>Start Date</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className="w-full justify-start text-left font-normal"
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {startDate ? format(startDate, 'PPP') : <span>Pick a date</span>}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={startDate}
                        onSelect={setStartDate}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
                
                <div className="space-y-2">
                  <Label>End Date</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className="w-full justify-start text-left font-normal"
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {endDate ? format(endDate, 'PPP') : <span>Pick a date</span>}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={endDate}
                        onSelect={setEndDate}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  placeholder="Describe your travel experience..."
                  rows={4}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
              
              <div className="space-y-4">
                <Label>Photos (Max 10)</Label>
                
                <div className="flex flex-wrap gap-4 mt-2">
                  {photosPreviews.map((preview, index) => (
                    <div 
                      key={index} 
                      className="relative w-24 h-24 rounded-md overflow-hidden group"
                    >
                      <img 
                        src={preview} 
                        alt={`Upload ${index + 1}`} 
                        className="w-full h-full object-cover"
                      />
                      <button
                        type="button"
                        onClick={() => removePhoto(index)}
                        className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <span className="text-white text-xs">Remove</span>
                      </button>
                    </div>
                  ))}
                  
                  {photos.length < 10 && (
                    <label className="w-24 h-24 border-2 border-dashed border-gray-300 rounded-md flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50 transition-colors">
                      <ImagePlus className="h-6 w-6 text-gray-400" />
                      <span className="text-xs text-gray-500 mt-1">Add Photo</span>
                      <input 
                        type="file" 
                        accept="image/*" 
                        multiple 
                        className="hidden" 
                        onChange={handlePhotoUpload}
                      />
                    </label>
                  )}
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button 
                variant="outline" 
                onClick={() => navigate('/')}
              >
                Cancel
              </Button>
              <Button 
                onClick={handleGenerateMemories}
                disabled={isGenerating}
                className="bg-blue-600 hover:bg-blue-700 text-white"
              >
                {isGenerating ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Generating...
                  </>
                ) : (
                  "Generate Memories"
                )}
              </Button>
            </CardFooter>
          </Card>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default CreateMemory;
