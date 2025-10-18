// FIX: Import 'React' to use 'React.ReactNode' type.
import React from 'react';

// FIX: Export all necessary types to be used across the application.
export interface Service {
  path: string;
  name: string;
  description: string;
  icon?: React.ReactNode;
}

export interface Advisor {
  id: number;
  name: string;
  title: string;
  imageUrl: string;
  specialties: string[];
  bio: string;
  languages?: string[];
  availability?: { [key: string]: string[] };
  email?: string;
}

export interface VideoResource {
  id: string;
  title: string;
  description: string;
  type: 'youtube' | 'direct';
  source: string;
}

export interface DocumentResource {
  id: string;
  title: string;
  description: string;
  filePath: string;
}

// FIX: Changed Product from an interface to a class to allow it to be used as a value.
export class Product {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
  description: string;

  constructor(id: number, name: string, price: number, imageUrl: string, description: string) {
    this.id = id;
    this.name = name;
    this.price = price;
    this.imageUrl = imageUrl;
    this.description = description;
  }
}

export interface CartItem extends Product {
  quantity: number;
}

export interface AgentApplication {
  id: number;
  name: string;
  email: string;
  phone: string;
  licenseNo: string;
  city: string;
  state: string;
  experience: number;
  linkedin?: string;
  message: string;
  submittedAt: string;
}

export interface ServiceDetail {
  name: string;
  description: string;
  benefits?: string[];
}


export type Role = 'Admin' | 'Sub-Admin' | 'Manager' | 'Agent';

export interface User {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
  role: Role;
  teamId?: string;
  fcmToken?: string;
}

export type LeadStatus = 'New' | 'Assigned' | 'In Progress' | 'Closed - Won' | 'Closed - Lost';

export interface Lead {
  id: string;
  name: string;
  email: string;
  phone: string;
  status: LeadStatus;
  source: string;
  assignedAgentId?: string;
  assignedAgentName?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Client {
  id: string;
  name: string;
  email: string;
  phone: string;
  policies: string[];
  agentId: string;
  joinedDate: Date;
}

export interface Task {
  id: string;
  title: string;
  dueDate: string; // ISO String
  isCompleted: boolean;
  assignedToId: string;
  reminderOffset: number | null; // in minutes
  relatedTo?: {
    type: 'Lead' | 'Client';
    id: string;
    name: string;
  };
}

export interface Commission {
    id: string;
    policyId: string;
    clientName: string;
    amount: number;
    date: Date;
    agentId: string;
}

export interface Message {
    id: string;
    senderId: string;
    senderName: string;
    recipientId: string; // 'all' for broadcast
    content: string;
    timestamp: Date;
    isRead: boolean;
}

export interface Notification {
    id: string;
    userId: string;
    message: string;
    isRead: boolean;
    timestamp: Date;
    relatedId?: string; // e.g., task ID
}
