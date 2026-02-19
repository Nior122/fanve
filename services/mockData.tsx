import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Profile, Image, MediaType } from '../types';
import ruriData from './ruriData.json';
import nicolebunData from './nicolebunData.json';
import fanslyData from './fanslyData.json';
import mankoprincessData from './mankoprincessData.json';
import redheadwinterData from './redheadwinterData.json';
import queenTahshaarData from './queenTahshaarData.json';
import cherylBlossData from './cheryl_blossData.json';
import audreyAndSadieData from './audreyandsadieData.json';

const mapMedia = (data: any[]): Image[] => data.map(item => ({
  ...item,
  mediaType: item.mediaType as MediaType
}));

export const MOCK_PROFILES: Profile[] = [
  {
    id: 'audreyandsadie',
    name: 'Audrey and Sadie',
    handle: '@audreyandsadie',
    bio: 'Profile auto-generated from restricted source.',
    avatarUrl: 'https://img.coomer.st/thumbnail/data/00/00/avatar_audreyandsadie.jpg',
    heroUrl: 'https://img.coomer.st/thumbnail/data/00/00/cover_audreyandsadie.jpg',
    stats: {
      posts: 20,
      likes: 1200,
      views: 4500,
      followers: 450
    },
    images: mapMedia(audreyAndSadieData),
    isVerified: true,
    isVisible: true,
    category: 'Premium',
    tags: ['onlyfans', 'exclusive']
  },
  {
    id: 'cheryl_bloss',
    name: 'Cheryl Bloss',
    handle: '@cheryl_bloss',
    bio: 'Captivating curves and electric vibes.',
    avatarUrl: 'https://img.coomer.st/thumbnail/data/8e/72/8e72372446a94f8ed4b292e5e5e7672a2b01305b723ac6f2872a3b7b1549ad67.jpg',
    heroUrl: 'https://img.coomer.st/thumbnail/data/aa/86/aa86c1d513b36b38fb3cc06e1b0140b23c71aff8644a0e64789ef30137471b24.jpg',
    stats: {
      posts: 56,
      likes: 4500,
      views: 12000,
      followers: 1200
    },
    images: mapMedia(cherylBlossData),
    isVerified: true,
    isVisible: true,
    category: 'Premium',
    tags: ['onlyfans', 'vibes']
  }
];

interface MockDataContextType {
  profiles: Profile[];
  getProfileById: (id: string) => Profile | undefined;
}

const MockDataContext = createContext<MockDataContextType | undefined>(undefined);

export const MockDataProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [profiles] = useState<Profile[]>(MOCK_PROFILES);

  const getProfileById = (id: string) => profiles.find(p => p.id === id);

  return (
    <MockDataContext.Provider value={{ profiles, getProfileById }}>
      {children}
    </MockDataContext.Provider>
  );
};

export const useMockData = () => {
  const context = useContext(MockDataContext);
  if (!context) throw new Error('useMockData must be used within a MockDataProvider');
  return context;
};
