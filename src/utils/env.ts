
/**
 * Utility function to safely access environment variables
 */
export const getEnvVariable = (key: string): string => {
  const value = import.meta.env[key];
  if (!value) {
    console.warn(`Environment variable ${key} is not set.`);
    return '';
  }
  return value;
};

// API keys and credentials
export const getOpenAIApiKey = (): string => getEnvVariable('VITE_OPENAI_API_KEY');
export const getSpotifyClientId = (): string => getEnvVariable('VITE_SPOTIFY_CLIENT_ID');
export const getSpotifyClientSecret = (): string => getEnvVariable('VITE_SPOTIFY_CLIENT_SECRET');
