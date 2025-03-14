
import React, { createContext, useContext, useState, useEffect } from 'react';

// Memory types
export interface Photo {
  id: string;
  url: string;
}

export interface Postcard {
  id: string;
  imageUrl: string;
  caption: string;
}

export interface Song {
  name: string;
  artist: string;
  url?: string;
}

export interface Memory {
  id: string;
  title: string;
  destination: string;
  description?: string;
  startDate: Date;
  endDate: Date;
  photos: Photo[];
  createdAt: Date;
  generationComplete: boolean;
  postcards?: Postcard[];
  soundtrack?: {
    id: string;
    songs: Song[];
  };
  soundtrackMoods?: string[];
  narrative?: string;
  highlights?: string[];
}

export interface Memory {
  id: string;
  title: string;
  destination: string;
  description?: string;
  startDate: Date;
  endDate: Date;
  photos: Photo[];
  createdAt: Date;
  generationComplete: boolean;
  postcards?: Postcard[];
  soundtrack?: {
    id: string;
    songs: Song[];
  };
  soundtrackMoods?: string[]; // Add this new property
  narrative?: string;
  highlights?: string[];
}

interface MemoryContextType {
  memories: Memory[];
  addMemory: (memory: Omit<Memory, 'id' | 'createdAt'>) => Memory;
  getMemory: (id: string) => Memory | undefined;
  updateMemory: (id: string, updates: Partial<Memory>) => void;
  deleteMemory: (id: string) => void;
}

const MemoryContext = createContext<MemoryContextType | undefined>(undefined);

export const MemoryProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [memories, setMemories] = useState<Memory[]>(() => {
    const savedMemories = localStorage.getItem('memories');
    return savedMemories ? JSON.parse(savedMemories) : [];
  });

  useEffect(() => {
    localStorage.setItem('memories', JSON.stringify(memories));
  }, [memories]);

  const addMemory = (memory: Omit<Memory, 'id' | 'createdAt'>) => {
    const newMemory: Memory = {
      ...memory,
      id: Date.now().toString(),
      createdAt: new Date(),
      generationComplete: false,
    };
    
    setMemories((prev) => [newMemory, ...prev]);
    return newMemory;
  };

  const getMemory = (id: string) => {
    return memories.find(memory => memory.id === id);
  };

  const updateMemory = (id: string, updates: Partial<Memory>) => {
    setMemories(prev => 
      prev.map(memory => 
        memory.id === id ? { ...memory, ...updates } : memory
      )
    );
  };

  const deleteMemory = (id: string) => {
    setMemories(prev => prev.filter(memory => memory.id !== id));
  };

  return (
    <MemoryContext.Provider value={{ memories, addMemory, getMemory, updateMemory, deleteMemory }}>
      {children}
    </MemoryContext.Provider>
  );
};

export const useMemories = () => {
  const context = useContext(MemoryContext);
  if (context === undefined) {
    throw new Error('useMemories must be used within a MemoryProvider');
  }
  return context;
};
