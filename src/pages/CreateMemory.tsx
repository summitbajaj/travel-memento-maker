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
import { useMemories, Photo } from '@/contexts/MemoryContext';
import { getOpenAIApiKey, getSpotifyClientId, getSpotifyClientSecret } from '@/utils/env';

const CreateMemory = () => {
  const navigate = useNavigate();
  const { addMemory } = useMemories();
  const [title, setTitle] = useState('');
  const [destination, setDestination] = useState('');
  const [description, setDescription] = useState('');
  const [startDate, setStartDate] = useState<Date | undefined>(undefined);
  const [endDate, setEndDate] = useState<Date | undefined>(undefined);
  const [uploading, setUploading] = useState(false);
  const [photos, setPhotos] = useState<File[]>([]);
  const [photosPreviews, setPhotosPreviews] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

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

  const handleCreateMemory = async () => {
    if (!validateForm()) return;
    
    // Check if API keys are configured in environment variables
    const openaiKey = getOpenAIApiKey();
    const spotifyClientId = getSpotifyClientId();
    const spotifyClientSecret = getSpotifyClientSecret();
    
    if (!openaiKey || !spotifyClientId || !spotifyClientSecret) {
      toast.error("API keys are not configured in environment variables.");
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Convert files to photo objects with URLs
      const photosData: Photo[] = photosPreviews.map((url, index) => ({
        id: `photo-${index}`,
        url
      }));
      
      // Add the memory to context
      const newMemory = addMemory({
        title,
        destination,
        description,
        startDate: startDate as Date,
        endDate: endDate as Date,
        photos: photosData,
        generationComplete: false
      });
      
      toast.success("Memory created successfully!");
      
      // Navigate to the memory detail page with a query parameter to trigger generation
      navigate(`/memory/${newMemory.id}?autoGenerate=true`);
    } catch (error) {
      toast.error("Failed to create memory. Please try again.");
      console.error(error);
    } finally {
      setIsSubmitting(false);
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
                onClick={handleCreateMemory}
                disabled={isSubmitting}
                className="bg-blue-600 hover:bg-blue-700 text-white"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Creating...
                  </>
                ) : (
                  "Create Memory"
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
