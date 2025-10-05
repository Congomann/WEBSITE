
import React from 'react';
import type { Service, ServiceDetail, Advisor, YouTubeVideo, DocumentResource } from './types';

const ShieldIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-brand-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 20.944a11.955 11.955 0 018.618-3.04 11.955 11.955 0 018.618 3.04 12.02 12.02 0 00-3-15.904z" />
    </svg>
);

const CarIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-brand-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 22l-4-4 1.5-1.5L9 18l4.5-4.5L19 18l-4 4-2.5-2.5L9 22zM12 12v.01" />
    </svg>
);

const HomeIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-brand-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
    </svg>
);

const HeartIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-brand-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
    </svg>
);

const UsersIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-brand-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.653-.122-1.28-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.653.122-1.28.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
    </svg>
);

export const CORE_SERVICES: Service[] = [
    { name: 'Life Insurance', path: '/services/life', description: 'Protect your family\'s future with comprehensive life insurance policies.', icon: <ShieldIcon /> },
    { name: 'Auto & Commercial', path: '/services/auto', description: 'Coverage for your personal vehicles, classic cars, and commercial fleets.', icon: <CarIcon /> },
    { name: 'Property Insurance', path: '/services/property', description: 'Secure your home and belongings against unforeseen events.', icon: <HomeIcon /> },
    { name: 'Health Insurance', path: '/services/health', description: 'Access quality healthcare with individual and family plans.', icon: <HeartIcon /> },
    { name: 'Group Benefits', path: '/services/group-benefits', description: 'Offer your employees valuable benefits like health and disability coverage.', icon: <UsersIcon /> },
];

export const WHY_CHOOSE_US = [
    { text: 'Trusted Carriers', description: 'We partner with top-rated insurance carriers to offer you reliable and competitive policies.' },
    { text: 'Personalized Coverage', description: 'Our agents work with you to understand your needs and craft a policy that fits your life and budget.' },
    { text: 'Licensed Agents in Multiple States', description: 'Our experienced team is licensed and ready to assist clients across various states.' },
    { text: 'Fast Claims Assistance', description: 'When you need to make a claim, we are here to guide you through the process quickly and efficiently.' },
];

export const LIFE_INSURANCE_DETAILS: ServiceDetail[] = [
  { name: 'Whole Life Insurance', description: 'Permanent coverage that builds cash value over time.', benefits: ['Lifetime protection', 'Tax-deferred growth', 'Borrowing options'] },
  { name: 'Universal Life Insurance', description: 'Flexible premiums and adjustable death benefits.', benefits: ['Cash value growth', 'Flexibility', 'Tax advantages'] },
  { name: 'Indexed Universal Life (IUL)', description: 'Tied to market performance (e.g., S&P 500) with downside protection.', benefits: ['Growth potential', 'Living benefits', 'Tax-free loans'] },
  { name: 'Annuities', description: 'Guaranteed income for retirement.', benefits: ['Lifetime income', 'Principal protection', 'Growth options'] },
  { name: 'Term Life', description: 'Affordable coverage for a set period (10, 20, 30 years).', benefits: ['High coverage for lower cost', 'Simple, straightforward protection', 'Ideal for specific timeframes'] },
  { name: 'Term Life with Living Benefits', description: 'Adds protection for illness or injury.', benefits: ['Access cash while living for critical, chronic, or terminal conditions.'] },
];

export const AUTO_INSURANCE_DETAILS: ServiceDetail[] = [
  { name: 'Passenger Auto', description: 'Protection for your everyday cars, trucks, and SUVs.', benefits: ['Covers liability for bodily injury and property damage', 'Collision coverage for accidents', 'Comprehensive coverage for theft, fire, and other non-collision events'] },
  { name: 'Classic & Custom Cars', description: 'Tailored coverage for collectible and modified vehicles.', benefits: ['Agreed value coverage', 'Specialized repair options', 'Flexible usage policies'] },
  { name: 'Commercial (Heavy-Duty) Vehicles', description: 'Coverage for trucks, fleets, and contractor vehicles.', benefits: ['Protects against liability from business operations', 'Covers physical damage to vehicles', 'Minimizes financial loss from downtime'] },
];

export const PROPERTY_INSURANCE_DETAILS: ServiceDetail[] = [
  { name: 'Homeowners Insurance', description: 'Comprehensive protection for your home, personal belongings, and liability.', benefits: ['Covers damage to your dwelling and other structures', 'Protects personal property like furniture and electronics', 'Provides liability coverage for accidents on your property'] },
  { name: 'Renters Insurance', description: 'Protects your personal items within a rental property and provides liability coverage.', benefits: ['Affordable coverage for your belongings', 'Liability protection against accidents', 'Covers living expenses if your rental becomes uninhabitable'] },
  { name: 'Theft, Flood & Fire Coverage', description: 'Specialized add-ons for protection against specific perils.', benefits: ['Coverage for losses due to theft', 'Protection from flood damage (often a separate policy)', 'Financial security in case of a fire'] },
];

export const HEALTH_INSURANCE_DETAILS: ServiceDetail[] = [
  { name: 'Health & Dental', description: 'Individual and family medical coverage to ensure you have access to the care you need.', benefits: ['Access to a network of quality healthcare providers', 'Coverage for preventive care to stay healthy', 'Affordable premiums and cost-sharing options'] },
];

export const GROUP_BENEFITS_DETAILS: ServiceDetail[] = [
  { name: 'Supplemental Health Plans', description: 'Help protect your income and savings during an unexpected illness or injury.', benefits: ['Cash benefits paid directly to you', 'Helps cover out-of-pocket expenses', 'Complements your existing health insurance'] },
  { name: 'Family Health Insurance', description: 'Group options to provide comprehensive health coverage for dependents and employees.', benefits: ['Often more affordable than individual plans', 'Wide range of coverage options', 'Promotes a healthy and productive workforce'] },
  { name: 'Income Protector', description: 'Provides a monthly income if you are unable to work due to a qualifying disability.', benefits: ['Replaces a portion of your lost income', 'Helps you maintain your standard of living', 'Peace of mind during recovery'] },
  { name: 'Accidental AD & Disability', description: 'Covers long and short-term disabilities, as well as Accidental Death & Dismemberment.', benefits: ['Financial support for short-term recovery', 'Long-term income for extended disabilities', 'Lump-sum payments for covered accidents'] },
];

export const ADVISORS: Advisor[] = [
  {
    id: 1,
    name: 'Jessica Miller',
    title: 'Senior Life & Health Advisor',
    imageUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=400&auto=format&fit=crop',
    specialties: ['Life Insurance', 'Health Insurance', 'Retirement Planning'],
    bio: 'With over 15 years of experience, Jessica specializes in creating comprehensive life and health insurance strategies for families and individuals, ensuring their long-term security.'
  },
  {
    id: 2,
    name: 'Brian Carter',
    title: 'Property & Commercial Specialist',
    imageUrl: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=400&auto=format&fit=crop',
    specialties: ['Homeowners Insurance', 'Commercial Auto', 'Group Benefits'],
    bio: 'Brian is an expert in property and commercial lines, helping business owners and homeowners protect their most valuable assets with tailored coverage.'
  },
  {
    id: 3,
    name: 'Samantha Chen',
    title: 'Family & Auto Protection Advisor',
    imageUrl: 'https://images.unsplash.com/photo-1554774853-719586f82d77?q=80&w=400&auto=format&fit=crop',
    specialties: ['Auto Insurance', 'Renters Insurance', 'Term Life'],
    bio: 'Samantha is passionate about helping young families and individuals find affordable and effective coverage for their cars, homes, and loved ones.'
  }
];

export const YOUTUBE_VIDEOS: YouTubeVideo[] = [
  {
    id: 'h_43-16PS5k',
    title: 'Term vs. Whole Life Insurance Explained',
    description: 'Understand the key differences between term and whole life insurance to decide which is right for you.'
  },
  {
    id: 'fTTGALaI-1w',
    title: 'Understanding Annuities: A Beginner\'s Guide',
    description: 'Learn the basics of annuities and how they can provide a steady income stream during retirement.'
  }
];

export const DOCUMENT_RESOURCES: DocumentResource[] = [
  {
    id: 'doc-fact-finder-1',
    title: 'Financial Fact Finder',
    description: 'A comprehensive worksheet to help you organize your finances and plan for your family\'s future.',
    filePath: 'https://www.newyorklife.com/content/dam/nyl/docs/pdfs/financial-calculators/client-fact-finder.pdf'
  },
  {
    id: 'doc-inventory-checklist-2',
    title: 'Home Inventory Checklist',
    description: 'A helpful guide and template for creating a home inventory for your property insurance records.',
    filePath: 'https://www.iii.org/sites/default/files/docs/pdf/home_inventory_checklist.pdf'
  }
];
