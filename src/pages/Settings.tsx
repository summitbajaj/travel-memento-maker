
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const Settings = () => {
  const navigate = useNavigate();
  const [openAIKey, setOpenAIKey] = useState(localStorage.getItem('openai-api-key') || '');
  const [claudeKey, setClaudeKey] = useState(localStorage.getItem('claude-api-key') || '');
  const [spotifyClientId, setSpotifyClientId] = useState(localStorage.getItem('spotify-client-id') || '');
  const [spotifyClientSecret, setSpotifyClientSecret] = useState(localStorage.getItem('spotify-client-secret') || '');
  
  const handleSave = () => {
    // Store API keys in localStorage (for demo purposes)
    localStorage.setItem('openai-api-key', openAIKey);
    localStorage.setItem('claude-api-key', claudeKey);
    localStorage.setItem('spotify-client-id', spotifyClientId);
    localStorage.setItem('spotify-client-secret', spotifyClientSecret);
    
    toast.success('API keys saved successfully');
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow py-12 px-6 pt-24">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">Settings</h1>
          
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>API Configuration</CardTitle>
              <CardDescription>
                Configure your API keys for various services used in the Memory Capsule
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="openai-key">OpenAI API Key</Label>
                <Input
                  id="openai-key"
                  type="password" 
                  placeholder="sk-..."
                  value={openAIKey}
                  onChange={(e) => setOpenAIKey(e.target.value)}
                />
                <p className="text-sm text-gray-500">Required for generating postcards and narratives</p>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="claude-key">Claude API Key</Label>
                <Input
                  id="claude-key"
                  type="password"
                  placeholder="sk-ant-..."
                  value={claudeKey}
                  onChange={(e) => setClaudeKey(e.target.value)}
                />
                <p className="text-sm text-gray-500">Alternative AI provider for content generation</p>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="spotify-client-id">Spotify Client ID</Label>
                <Input
                  id="spotify-client-id"
                  type="password"
                  placeholder="Client ID from Spotify Developer Dashboard"
                  value={spotifyClientId}
                  onChange={(e) => setSpotifyClientId(e.target.value)}
                />
                <p className="text-sm text-gray-500">Required for soundtrack generation</p>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="spotify-client-secret">Spotify Client Secret</Label>
                <Input
                  id="spotify-client-secret"
                  type="password"
                  placeholder="Client Secret from Spotify Developer Dashboard"
                  value={spotifyClientSecret}
                  onChange={(e) => setSpotifyClientSecret(e.target.value)}
                />
                <p className="text-sm text-gray-500">Required for soundtrack generation</p>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleSave} className="bg-blue-600 hover:bg-blue-700 text-white">
                Save API Keys
              </Button>
            </CardFooter>
          </Card>
          
          <div className="flex justify-between">
            <Button 
              variant="outline" 
              onClick={() => navigate('/')}
              className="border-gray-300"
            >
              Back to Home
            </Button>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Settings;
