

import type { Product, Advisor, User, EditableContent, ServiceDetail } from './types';
// FIX: 'Role' is an enum used as a value, so it must be imported directly,
// not as a type. The other imports are interfaces and can be type-only.
import { Role } from './types';

export const users: User[] = [
  { id: 1, name: 'Admin User', email: 'admin@nhf.com', role: Role.Admin, phone: '555-0199', language: 'English' },
  { id: 2, name: 'Jessica Miller', email: 'jessica.miller@newhollandfinancial-demo.com', role: Role.Advisor, phone: '(717) 555-0101', baseCommissionRate: 55, language: 'English' },
  { id: 3, name: 'Brian Carter', email: 'brian.carter@newhollandfinancial-demo.com', role: Role.Advisor, phone: '(717) 555-0102', baseCommissionRate: 50, language: 'English' },
  { id: 4, name: 'John Doe', email: 'john.doe@example.com', role: Role.User, phone: '555-0104', language: 'English' },
  { id: 5, name: 'Manager User', email: 'manager@nhf.com', role: Role.Manager, phone: '555-0105', language: 'English' },
  { id: 6, name: 'Sub Admin User', email: 'subadmin@nhf.com', role: Role.SubAdmin, phone: '555-0106', language: 'English' },
  { id: 7, name: 'Underwriter User', email: 'underwriter@nhf.com', role: Role.Underwriter, phone: '555-0107', language: 'English' },
  { id: 8, name: 'Samantha Chen', email: 'samantha.chen@newhollandfinancial-demo.com', role: Role.Advisor, phone: '(717) 555-0103', baseCommissionRate: 50, language: 'English' },
];

export const trustedCarrierNames: string[] = [
    'Aflac',
    'AIG',
    'Allianz',
    'American Continental Insurance Co',
    'Americo',
    'Ameritas Life',
    'Banner Life',
    'Blue Ridge Ins Co.',
    'Bristol West',
    'Combined Insurance',
    'Corebridge Financial',
    'F&G',
    'Foremost',
    'Foresters Financial',
    'Geico',
    'Gerber Life',
    'Great American Insurance Group',
    'Illinois Mutual',
    'John Hancock',
    'Kansas City Life',
    'Liberty Bankers Life',
    'Lincoln Financial',
    'Mutual of Omaha',
    'National Life Group',
    'New York Life',
    'Next Insurance',
    'Protective Life',
    'Prudential',
    'Root Insurance',
    'Symetra',
    'The Hartford',
    'Transamerica',
].sort();

export const productTypes: string[] = [
    'Whole Life',
    'Term Life',
    'Universal Life',
    'Indexed Universal Life',
    'Variable Life Insurance',
    'Final Expenses',
    'Critical Illness',
    'Health Insurance',
    'Real Estate',
    'Auto or Commercial',
    'Homeowner Insurance',
    'Rent Insurance',
    'Errors and Emission'
].sort();


export const initialContent: EditableContent = {
  hero_background: {
    type: 'video',
    source: 'https://videos.pexels.com/video-files/8544002/8544002-hd_1920_1080_25fps.mp4'
  },
  core_services: [
    { name: "Life Insurance", path: "/services/life", description: "Protect your family's future with comprehensive life insurance policies." },
    { name: "Auto & Commercial", path: "/services/auto", description: "Coverage for your personal vehicles, classic cars, and commercial fleets." },
    { name: "Property Insurance", path: "/services/property", description: "Secure your home and belongings against unforeseen events." },
    { name: "Real Estate", path: "/services/real-estate", description: "Guidance on buying, selling, and investing in residential and commercial properties." },
    { name: "Health Insurance", path: "/services/health", description: "Access quality healthcare with individual and family plans." },
    { name: "Group Benefits", path: "/services/group-benefits", description: "Offer your employees valuable benefits like health and disability coverage." }
  ],
  social_links_data: [
    { name: 'LinkedIn', url: 'https://linkedin.com/company/newhollandfinancial' },
    { name: 'Facebook', url: 'https://facebook.com/newhollandfinancial' },
    { name: 'Instagram', url: 'https://instagram.com/newhollandfinancial' },
    { name: 'X', url: 'https://x.com/Newhollandfg' },
    { name: 'TikTok', url: 'https://www.tiktok.com/@newhollandfinancial' },
    { name: 'Snapchat', url: 'https://www.snapchat.com/add/newhollandfinancial' },
    { name: 'Threads', url: 'https://www.threads.net/@newhollandfinancial' },
  ],
  company_info: {
      phone: '(717) 847-9638',
      email: 'info@newhollandfinancial.com',
  },
  video_resources: [
    { id: "h_43-16PS5k", title: "Term vs. Whole Life Insurance Explained", description: "Understand the key differences between term and whole life insurance to decide which is right for you.", type: "youtube", source: "h_43-16PS5k" },
    { id: "fTTGALaI-1w", title: "Understanding Annuities: A Beginner's Guide", description: "Learn the basics of annuities and how they can provide a steady income stream during retirement.", type: "youtube", source: "fTTGALaI-1w" }
  ],
  document_resources: [
    { id: "doc-fact-finder-1", title: "Financial Fact Finder", description: "A comprehensive worksheet to help you organize your finances and plan for your family's future.", filePath: "https://www.newyorklife.com/content/dam/nyl/docs/pdfs/financial-calculators/client-fact-finder.pdf" },
    { id: "doc-inventory-checklist-2", title: "Home Inventory Checklist", description: "A helpful guide for creating a home inventory for your property insurance records.", filePath: "https://www.iii.org/sites/default/files/docs/pdf/home_inventory_checklist.pdf" }
  ],
  faq_data: [
    { id: 'gen-1', category: 'General Insurance', question: "What is an insurance premium and a deductible?", answer: "A premium is the fixed amount you pay regularly. A deductible is the amount you pay out-of-pocket for a claim before your insurance pays." },
    { id: 'gen-2', category: 'General Insurance', question: "How do I file an insurance claim?", answer: "Contact us or your carrier directly with your policy number and details of the incident. We'll guide you through the process." },
    { id: 'life-1', category: 'Life & Health', question: "Term vs. Whole life insurance?", answer: "Term life covers a specific period and is affordable. Whole life is permanent and builds cash value." },
    { id: 'life-2', category: 'Life & Health', question: "How much life insurance do I need?", answer: "A common rule is 10-12 times your annual income, but it depends on your debts, future expenses, and financial goals." },
    { id: 'prop-1', category: 'Property & Auto', question: "Does homeowners insurance cover floods?", answer: "No, standard policies do not cover flood or earthquake damage. You need separate, specialized policies for this." },
    { id: 're-1', category: 'Real Estate', question: "What are the first steps to buying a home?", answer: "Getting pre-approved for a mortgage is the best first step. It shows sellers you're a serious buyer and helps you understand your budget." },
    { id: 'fp-1', category: 'Financial Planning', question: "What is an annuity?", answer: "An annuity is a contract between you and an insurance company in which you make a lump-sum payment or series of payments and, in return, receive regular disbursements, beginning either immediately or at some point in the future." },
  ],
  // FIX: Added missing 'real_estate_info_resources' to satisfy the EditableContent type.
  real_estate_info_resources: [
    {
      title: 'Buying a Home',
      description: 'Key steps and considerations when purchasing a property.',
      points: ['Get pre-approved for a mortgage', 'Find a trusted real estate agent', 'Make a competitive offer', 'Complete a home inspection']
    },
    {
      title: 'Selling Your Property',
      description: 'Strategies to maximize your home\'s value and sell quickly.',
      points: ['Price your home correctly', 'Stage your home effectively', 'Market your property online', 'Negotiate offers wisely']
    },
    {
      title: 'Investing in Real Estate',
      description: 'Learn about opportunities in real estate investment.',
      points: ['Understand market trends', 'Analyze cash flow and ROI', 'Explore different property types', 'Leverage financing options']
    }
  ],
};

// FIX: Added and exported `advisors` data for the AdvisorContext.
export const advisors: Advisor[] = [
  {
    id: 2,
    name: 'Jessica Miller',
    title: 'Senior Financial Advisor',
    imageUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=800&auto=format&fit=crop',
    specialties: ['Life Insurance', 'Retirement Planning', 'Annuities'],
    bio: 'With over 15 years of experience, Jessica specializes in crafting personalized life insurance and retirement strategies to help families secure their financial futures. She is passionate about educating clients and empowering them to make informed decisions.',
    slug: 'jessica-miller',
    languages: ['English', 'Spanish'],
    email: 'jessica.miller@newhollandfinancial-demo.com',
    phone: '(717) 555-0101',
    availability: {
      'Monday': ['09:00', '10:00', '14:00', '15:00'],
      'Tuesday': ['10:00', '11:00', '13:00'],
      'Wednesday': ['09:00', '10:00', '14:00', '15:00'],
      'Thursday': ['11:00', '14:00'],
      'Friday': ['09:00', '10:00'],
    },
    socialLinks: [{ name: 'LinkedIn', url: 'https://www.linkedin.com/in/jessica-miller-demo' }]
  },
  {
    id: 3,
    name: 'Brian Carter',
    title: 'Property & Casualty Specialist',
    imageUrl: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=800&auto=format&fit=crop',
    specialties: ['Auto & Commercial', 'Property Insurance', 'Business Insurance'],
    bio: 'Brian is an expert in property and casualty insurance. He works with individuals and businesses to protect their most valuable assets, from personal homes and vehicles to large commercial operations. His proactive approach minimizes risks for his clients.',
    slug: 'brian-carter',
    languages: ['English'],
    email: 'brian.carter@newhollandfinancial-demo.com',
    phone: '(717) 555-0102',
    availability: {
      'Monday': ['11:00', '13:00', '16:00'],
      'Tuesday': ['09:00', '10:00', '14:00', '15:00'],
      'Wednesday': ['11:00', '13:00'],
      'Thursday': ['09:00', '10:00', '14:00', '15:00'],
      'Friday': ['13:00', '14:00'],
    },
    socialLinks: [{ name: 'X', url: 'https://x.com/brian-carter-demo' }]
  },
  {
    id: 8,
    name: 'Samantha Chen',
    title: 'Health & Benefits Consultant',
    imageUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=800&auto=format&fit=crop',
    specialties: ['Health Insurance', 'Group Benefits', 'Real Estate'],
    bio: 'Samantha helps businesses design competitive employee benefits packages and guides individuals through the complexities of health insurance. She is also a licensed real estate agent, offering a unique combination of expertise to her clients.',
    slug: 'samantha-chen',
    languages: ['English', 'Mandarin'],
    email: 'samantha.chen@newhollandfinancial-demo.com',
    phone: '(717) 555-0103',
    availability: {
      'Monday': ['10:00', '11:00', '15:00'],
      'Tuesday': ['13:00', '14:00', '16:00'],
      'Wednesday': ['10:00', '11:00', '15:00'],
      'Thursday': ['13:00', '14:00'],
      'Friday': ['11:00'],
    },
    socialLinks: [{ name: 'LinkedIn', url: 'https://www.linkedin.com/in/samantha-chen-demo' }]
  },
];

// FIX: Added and exported `products` data for the ProductContext.
export const products: Product[] = [
  { id: 1, name: 'Financial Planning Guide', price: 29.99, imageUrl: 'https://images.unsplash.com/photo-1554224155-1696413565d3?q=80&w=800&auto=format&fit=crop', description: 'A comprehensive guide to managing your personal finances and planning for the future.' },
  { id: 2, name: 'Retirement Savings Workbook', price: 19.99, imageUrl: 'https://images.unsplash.com/photo-1633158829595-186091380214?q=80&w=800&auto=format&fit=crop', description: 'An interactive workbook to help you plan and track your retirement savings goals.' },
  { id: 3, name: 'Insurance 101 E-Book', price: 9.99, imageUrl: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=800&auto=format&fit=crop', description: 'An essential e-book that demystifies the world of insurance.' },
  { id: 4, name: 'Investment Strategies Webinar', price: 49.99, imageUrl: 'https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?q=80&w=800&auto=format&fit=crop', description: 'Access to our exclusive webinar on building a successful investment portfolio.' },
];

// FIX: Added and exported `service_details` for all service pages.
export const service_details: { [key: string]: ServiceDetail[] } = {
  life: [
    { name: 'Term Life Insurance', description: 'Provides coverage for a specific period (e.g., 10, 20, or 30 years). It\'s an affordable way to protect your family during critical years.', benefits: ['Affordable premiums', 'Simple to understand', 'Covers specific financial obligations like mortgages or college tuition'] },
    { name: 'Whole Life Insurance', description: 'A permanent policy that provides lifelong coverage and builds cash value over time. The cash value grows at a guaranteed rate.', benefits: ['Lifelong protection', 'Builds tax-deferred cash value', 'Fixed premiums'] },
    { name: 'Indexed Universal Life (IUL)', description: 'A type of permanent life insurance with flexible premiums and a cash value component that is tied to a stock market index, like the S&P 500.', benefits: ['Potential for higher cash value growth', 'Flexible premiums and death benefit', 'Downside protection from market losses'] },
    { name: 'Final Expense Insurance', description: 'A small whole life policy designed to cover end-of-life expenses like medical bills, credit card debt, and funeral costs.', benefits: ['Small, affordable premiums', 'No medical exam usually required', 'Peace of mind for loved ones'] },
  ],
  auto: [
    { name: 'Personal Auto Insurance', description: 'Protects you financially in case of an accident involving your personal vehicle. Covers liability, collision, and comprehensive damages.', benefits: ['Fulfills legal driving requirements', 'Covers medical expenses for you and others', 'Protects your vehicle from damage or theft'] },
    { name: 'Commercial Auto Insurance', description: 'Provides coverage for vehicles used for business purposes, from single cars to entire fleets. Protects your business from liability.', benefits: ['Covers employees driving company vehicles', 'Protects business assets', 'Higher liability limits available'] },
    { name: 'Classic Car Insurance', description: 'Specialized coverage for antique, classic, or collector cars. Policies are based on an agreed value rather than actual cash value.', benefits: ['Guaranteed "Agreed Value" coverage', 'Lower premiums than standard auto policies', 'Flexible usage options'] },
  ],
  property: [
    { name: 'Homeowners Insurance', description: 'Protects your home and personal belongings from damage or loss due to events like fire, theft, or storms. Also includes liability coverage.', benefits: ['Covers structural damage to your home', 'Protects your personal property', 'Provides liability protection against accidents'] },
    { name: 'Renters Insurance', description: 'Covers your personal belongings if you rent a home or apartment. It also provides liability protection if someone is injured in your rental.', benefits: ['Affordable way to protect your possessions', 'Liability coverage for accidents', 'Covers additional living expenses if your rental is uninhabitable'] },
    { name: 'Flood & Fire Insurance', description: 'Specialized policies that provide coverage for damages specifically caused by floods or fires, which are often excluded from standard homeowners policies.', benefits: ['Essential for homes in high-risk areas', 'Covers costly repairs and rebuilding', 'Peace of mind against natural disasters'] },
  ],
  health: [
      { name: 'Individual & Family Plans', description: 'Health coverage for individuals and families who don\'t have access to employer-sponsored plans. We help you navigate the marketplace.', benefits: ['Access to a network of doctors and hospitals', 'Covers preventive care services', 'Financial protection against high medical costs'] },
      { name: 'Dental Insurance', description: 'Plans that help cover the cost of dental care, from routine cleanings to major procedures like crowns and root canals.', benefits: ['Promotes regular preventive care', 'Reduces out-of-pocket dental costs', 'Various plan levels to fit your needs'] },
  ],
  'group-benefits': [
      { name: 'Group Health Plans', description: 'Offer your employees access to quality healthcare with group medical, dental, and vision insurance plans.', benefits: ['Attracts and retains top talent', 'Tax advantages for the business', 'Promotes a healthier, more productive workforce'] },
      { name: 'Disability & Income Protection', description: 'Provides employees with income replacement if they are unable to work due to illness or injury.', benefits: ['Protects employees\' financial stability', 'Short-term and long-term options', 'Valuable addition to a benefits package'] },
  ],
  'real-estate': [
    { name: 'Residential Real Estate', description: 'Expert guidance for buying or selling your home. We help you navigate the market, negotiate offers, and handle all the paperwork for a smooth transaction.', benefits: ['Expert market analysis and pricing', 'Professional marketing for sellers', 'Skilled negotiation on your behalf'] },
    { name: 'Commercial Real Estate', description: 'Services for buying, selling, or leasing commercial properties, including office spaces, retail locations, and industrial buildings.', benefits: ['In-depth investment analysis', 'Access to off-market properties', 'Guidance on zoning and regulations'] },
    { name: 'Real Estate Investment', description: 'Strategic advice for individuals and companies looking to invest in real estate. We help identify profitable opportunities and manage properties.', benefits: ['Identify high-yield investment properties', 'Portfolio diversification strategies', 'Long-term wealth creation'] },
  ],
};