export enum UserRole {
  USER = 'USER',
  ADMIN = 'ADMIN'
}

export interface User {
  id: string;
  email: string;
  role: UserRole;
  favorites: string[]; // Array of Profile IDs
}

export type MediaType = 'image' | 'video';

export interface Image {
  id: string;
  url: string;
  thumbnailUrl: string;
  caption?: string;
  width: number;
  height: number;
  isLocked: boolean; // For members only
  isVisible: boolean; // Soft delete / hide
  mediaType: MediaType;
  // Batch Upload Tracking Fields
  sourceUrl?: string;
  sha256?: string; 
  createdAt?: string;
}

export interface Profile {
  id: string;
  name: string;
  handle: string;
  bio: string;
  avatarUrl: string;
  heroUrl: string;
  tags: string[];
  category: string;
  images: Image[];
  stats: {
    posts: number;
    likes: number;
    views: number;
    followers: number;
  };
  isVerified: boolean;
  isVisible: boolean; // Public/Hidden
  pricePerMonth?: number; // Optional subscription model
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
}