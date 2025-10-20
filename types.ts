import type { ReactNode } from 'react';

export enum Role {
  Admin = 'admin',
  Advisor = 'advisor',
  User = 'user'
}

export interface User {
  id: number;
  name: string;
  email: string;
  role: Role;
}

export interface Service {
  name: string;
  path: string;
  description: string;
  icon: ReactNode;
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
  phone?: string;
  availability?: {
    [dayOfWeek: string]: string[];
  };
}

export interface VideoResource {
  id: string;
  title: string;
  description: string;
  type: 'youtube' | 'direct' | 'tiktok';
  source: string;
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

export interface FAQItem {
  id:string;
  question: string;
  answer: string;
  category: 'General Insurance' | 'Life & Health' | 'Property & Auto' | 'Real Estate' | 'Financial Planning';
}

export interface InfoResource {
  title: string;
  description: string;
  points: string[];
}

export interface SocialLink {
  name: string;
  url: string;
}

export interface CompanyInfo {
    phone: string;
    email: string;
}

export interface EditableContent {
    core_services: Omit<Service, 'icon'>[];
    social_links_data: SocialLink[];
    company_info: CompanyInfo;
    video_resources: VideoResource[];
    document_resources: DocumentResource[];
    faq_data: FAQItem[];
    real_estate_info_resources: InfoResource[];
}
