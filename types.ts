
import type { ReactNode } from 'react';

export enum Role {
  Admin = 'admin',
  Advisor = 'advisor',
  User = 'user',
  Manager = 'manager',
  SubAdmin = 'subadmin',
  Underwriter = 'underwriter'
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
  socialLinks?: SocialLink[];
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

export type HeroBackgroundType = 'image' | 'video' | 'youtube';

export interface HeroBackground {
  type: HeroBackgroundType;
  source: string; // URL for image/video, or YouTube embed ID
}


export interface EditableContent {
    core_services: Omit<Service, 'icon'>[];
    social_links_data: SocialLink[];
    company_info: CompanyInfo;
    video_resources: VideoResource[];
    document_resources: DocumentResource[];
    faq_data: FAQItem[];
    real_estate_info_resources: InfoResource[];
    hero_background: HeroBackground;
}

// CRM Types
export type LeadStatus = 'New' | 'Contacted' | 'Qualified' | 'Approved' | 'Declined' | 'Closed - Won' | 'Closed - Lost';

export interface Lead {
  id: number;
  name: string;
  email: string;
  phone: string;
  status: LeadStatus;
  source: string;
  assignedTo: number | null; // Advisor ID
  lastContacted: string;
  createdAt: string;
  // New detailed fields for Sub-Admin lead creation
  dob?: string;
  ssn?: string;
  bornState?: string;
  address?: string;
  city?: string;
  state?: string;
  zipcode?: string;
  productType?: string;
  preferredCarrier?: string;
  coverageAmount?: number;
  weight?: number;
  height?: number;
  // Banking Information
  bankName?: string;
  accountType?: 'checking' | 'saving';
  routingNumber?: string;
  accountNumber?: string;
  // Decline reason
  declineReason?: string;
}

export interface Client {
    id: number;
    name: string;
    email: string;
    phone: string;
    advisorId: number;
    policies: Policy[];
    since: string;
}

export interface Policy {
    id: string;
    type: 'Life' | 'Auto' | 'Home' | 'Health';
    premium: number;
    status: 'Active' | 'Pending' | 'Expired';
    renewalDate: string;
}

export interface PerformanceData {
    advisorId: number;
    metrics: {
        leads: number;
        conversionRate: number; // percentage
        closedDeals: number;
        salesVolume: number; // in USD
        commissions: number; // in USD
    };
}

export interface Notification {
  id: number;
  userId: number; // Advisor ID
  message: string;
  read: boolean;
  createdAt: string;
  link?: string;
}

export interface Commission {
  id: string;
  clientId: number;
  clientName: string;
  advisorId: number;
  policyId: string;
  policyType: Policy['type'];
  premium: number;
  commissionRate: number; // percentage
  commissionAmount: number;
  status: 'Paid' | 'Pending';
  date: string; // ISO string
}

export interface AdvisorRequest {
  id: string;
  type: 'Callback' | 'Quote';
  name: string;
  phone: string;
  email?: string;
  message?: string;
  createdAt: string;
  status: 'New' | 'Contacted';
  advisorId: number;
}

export type ApplicationStatus = 'Pending' | 'Approved' | 'Rejected';

export interface AgentApplication {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  licenseNumber: string;
  experience: string;
  resumeUrl?: string; // Storing the resume as a data URL
  status: ApplicationStatus;
  submittedAt: string;
}