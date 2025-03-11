import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Eye, EyeOff, AlertCircle } from 'lucide-react';

const Settings = () => {
  const [openaiKey, setOpenaiKey] = useState('');
  const [spotifyClientId, setSpotifyClientId] = useState('');
  const [spotifyClientSecret, setSpotifyClientSecret] = useState('');
  const [showOpenaiKey, setShowOpenaiKey] = useState(false);
  const [showSpotifyClientId, setShowSpotifyClientId] = useState(false);
  const [showSpotifyClientSecret, setShowSpotifyClientSecret] = useState(false);
  
  useEffect(() => {
    const savedOpenaiKey = localStorage.getItem('openai-api-key');
    const savedSpotifyClientId = localStorage.getItem('spotify-client-id');
    const savedSpotifyClientSecret = localStorage.getItem('spotify-client-secret');
    
    if (savedOpenaiKey) setOpenaiKey(savedOpenaiKey);
    if (savedSpotifyClientId) setSpotifyClientId(savedSpotifyClientId);
    if (savedSpotifyClientSecret) setSpotifyClientSecret(savedSpotifyClientSecret);
  }, []);
  
  const saveSettings = () => {
    if (!openaiKey) {
      toast.error('OpenAI API key is required');
      return;
    }
    
    if (!spotifyClientId) {
      toast.error('Spotify Client ID is required');
      return;
    }
    
    if (!spotifyClientSecret) {
      toast.error('Spotify Client Secret is required');
      return;
    }
    
    if (!openaiKey.startsWith('sk-')) {
      toast.warning('OpenAI API key should start with "sk-"');
    }
    
    localStorage.setItem('openai-api-key', openaiKey);
    localStorage.setItem('spotify-client-id', spotifyClientId);
    localStorage.setItem('spotify-client-secret', spotifyClientSecret);
    
    toast.success('API settings saved successfully. You can now create and generate memories!');
  };
  
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow py-12 px-6 pt-24">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">API Settings</h1>
          
          <Card>
            <CardHeader>
              <CardTitle>Configure API Keys</CardTitle>
              <CardDescription>
                Enter your API keys to enable the memory generation features.
                <div className="mt-2 p-3 bg-amber-50 border border-amber-200 rounded-md flex items-start gap-2">
                  <AlertCircle className="h-5 w-5 text-amber-500 flex-shrink-0 mt-0.5" />
                  <p className="text-amber-800">
                    All fields are required. Your API keys are stored locally on your device and are not sent to our servers.
                  </p>
                </div>
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="openai-key">OpenAI API Key</Label>
                <div className="relative">
                  <Input
                    id="openai-key"
                    type={showOpenaiKey ? 'text' : 'password'}
                    placeholder="sk-..."
                    value={openaiKey}
                    onChange={(e) => setOpenaiKey(e.target.value)}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-2 top-1/2 -translate-y-1/2"
                    onClick={() => setShowOpenaiKey(!showOpenaiKey)}
                  >
                    {showOpenaiKey ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </Button>
                </div>
                <p className="text-sm text-muted-foreground">
                  Get your key from <a href="https://platform.openai.com/api-keys" target="_blank" rel="noreferrer" className="text-blue-600 hover:underline">OpenAI's API dashboard</a>
                </p>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="spotify-client-id" className="flex items-center gap-1">
                  Spotify Client ID
                  <span className="text-red-500">*</span>
                </Label>
                <div className="relative">
                  <Input
                    id="spotify-client-id"
                    type={showSpotifyClientId ? 'text' : 'password'}
                    placeholder="Enter your Spotify Client ID"
                    value={spotifyClientId}
                    onChange={(e) => setSpotifyClientId(e.target.value)}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-2 top-1/2 -translate-y-1/2"
                    onClick={() => setShowSpotifyClientId(!showSpotifyClientId)}
                  >
                    {showSpotifyClientId ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </Button>
                </div>
                <p className="text-sm text-muted-foreground">
                  Get your Client ID from the <a href="https://developer.spotify.com/dashboard" target="_blank" rel="noreferrer" className="text-blue-600 hover:underline">Spotify Developer Dashboard</a>
                </p>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="spotify-client-secret" className="flex items-center gap-1">
                  Spotify Client Secret
                  <span className="text-red-500">*</span>
                </Label>
                <div className="relative">
                  <Input
                    id="spotify-client-secret"
                    type={showSpotifyClientSecret ? 'text' : 'password'}
                    placeholder="Enter your Spotify Client Secret"
                    value={spotifyClientSecret}
                    onChange={(e) => setSpotifyClientSecret(e.target.value)}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-2 top-1/2 -translate-y-1/2"
                    onClick={() => setShowSpotifyClientSecret(!showSpotifyClientSecret)}
                  >
                    {showSpotifyClientSecret ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </Button>
                </div>
                <p className="text-sm text-muted-foreground">
                  Found in the same place as your Client ID after creating an app in the Spotify Developer Dashboard
                </p>
              </div>
            </CardContent>
            <CardFooter>
              <Button 
                onClick={saveSettings}
                className="ml-auto bg-blue-600 hover:bg-blue-700 text-white"
              >
                Save Settings
              </Button>
            </CardFooter>
          </Card>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Settings;
