
import type { ReactNode } from 'react';

export interface Service {
  name: string;
  path: string;
  description: string;
  // Fix: Made icon optional to correctly reflect API response and simplify usage.
  icon?: ReactNode;
}

export interface ServiceDetail {
    name: string;
    description: string;
    benefits: string[];
}

export interface Advisor {
  id: number;
  name:string;
  title: string;
  imageUrl: string;
  specialties: string[];
  bio: string;
  languages?: string[];
  email?: string;
  availability?: {
    [dayOfWeek: string]: string[]; // e.g., { "Monday": ["09:00", "14:00"], ... }
  };
}

export interface VideoResource {
  id: string;
  title: string;
  description: string;
  type: 'youtube' | 'direct';
  source: string; // YouTube Video ID or full URL for a direct video file
}

export interface DocumentResource {
  id: string;
  title: string;
  description: string;
  filePath: string;
}

export interface Product {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
  description: string;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface AgentApplication {
  id: number;
  name: string;
  email: string;
  phone: string;
  licenses: string;
  experience: number;
  linkedin?: string;
  message?: string;
  submittedAt: string;
}