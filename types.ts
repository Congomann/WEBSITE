import type { ReactNode } from 'react';

export interface Service {
  name: string;
  path: string;
  description: string;
  // Fix: Use imported ReactNode type.
  icon: ReactNode;
}

export interface ServiceDetail {
    name: string;
    description: string;
    benefits: string[];
}

export interface Advisor {
  id: number;
  name: string;
  title: string;
  imageUrl: string;
  specialties: string[];
  bio: string;
}

export interface YouTubeVideo {
  id: string;
  title: string;
  description: string;
}

export interface DocumentResource {
  id: string;
  title: string;
  description: string;
  filePath: string;
}