
import type { Product, Advisor, User, EditableContent } from './types';
// FIX: 'Role' is an enum used as a value, so it must be imported directly,
// not as a type. The other imports are interfaces and can be type-only.
import { Role } from './types';

export const users: User[] = [
  { id: 1, name: 'Admin User', email: 'admin@nhf.com', role: Role.Admin },
  { id: 2, name: 'Jessica Miller', email: 'jessica.miller@newhollandfinancial-demo.com', role: Role.Advisor },
  { id: 3, name: 'Brian Carter', email: 'brian.carter@newhollandfinancial-demo.com', role: Role.Advisor },
  { id: 4, name: 'John Doe', email: 'john.doe@example.com', role: Role.User },
  { id: 5, name: 'Manager User', email: 'manager@nhf.com', role: Role.Manager },
  { id: 6, name: 'Sub Admin User', email: 'subadmin@nhf.com', role: Role.SubAdmin },
  { id: 7, name: 'Underwriter User', email: 'underwriter@nhf.com', role: Role.Underwriter },
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


export const initialContent: EditableContent = {
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
    { name: 'Twitter', url: 'https://twitter.com/Newhollandfg' },
    { name: 'TikTok', url: 'https://www.tiktok.com/@newhollandfinancial' },
    { name: 'Snapchat', url: 'https://www.snapchat.com/add/newhollandfinancial' },
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
    { id: 're-1', category: 'Real Estate', question: "What are the first steps to buying a home?", answer: "Get pre-approved for a mortgage to understand your budget and show sellers you're a serious buyer." },
  ],
  real_estate_info_resources: [
    { title: 'Buying a Home', description: 'Expert guidance from pre-approval to closing.', points: ['Financial pre-approval', 'Personalized searches', 'Expert negotiation'] },
    { title: 'Selling Your Property', description: 'Maximize your return and minimize stress.', points: ['Market analysis', 'Staging tips', 'Targeted marketing'] },
    { title: 'Investing in Real Estate', description: 'Build long-term wealth through strategic investments.', points: ['Cash flow analysis', 'Portfolio diversification', '1031 exchanges'] },
  ]
};

export const products: Product[] = [
  { id: 101, name: "Financial Peace of Mind Mug", price: 15.99, imageUrl: "https://images.unsplash.com/photo-1594228949824-c15535b248a3?q=80&w=600&auto=format&fit=crop", description: "A sturdy ceramic mug for your morning coffee." },
  { id: 102, name: "Insure Your Future T-Shirt", price: 24.50, imageUrl: "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?q=80&w=600&auto=format&fit=crop", description: "A comfortable 100% cotton t-shirt." },
  { id: 103, name: "Guide to Personal Finance (eBook)", price: 9.99, imageUrl: "https://images.unsplash.com/photo-1589998059171-988d887df646?q=80&w=600&auto=format&fit=crop", description: "A comprehensive digital guide. Instant download." },
  { id: 104, name: "Secure Future Leather Journal", price: 29.99, imageUrl: "https://images.unsplash.com/photo-1516414447565-b14be0adf13e?q=80&w=600&auto=format&fit=crop", description: "A high-quality journal to track your financial goals." }
];

export const advisors: Advisor[] = [
  { "id": 1, "name": "Jessica Miller", "title": "Senior Life & Health Advisor", "imageUrl": "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=400&auto=format&fit=crop", "specialties": ["Life Insurance", "Health Insurance", "Retirement Planning"], "bio": "With over 15 years of experience, Jessica specializes in creating comprehensive life and health insurance strategies.", "languages": ["English", "Spanish"], "email": "jessica.miller@newhollandfinancial-demo.com", "phone": "(717) 555-0101", "availability": { "Monday": ["09:00", "10:00", "14:00"], "Tuesday": ["09:00", "10:00", "15:00"], "Friday": ["09:00", "10:00"] } },
  { "id": 2, "name": "Brian Carter", "title": "Property & Commercial Specialist", "imageUrl": "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=400&auto=format&fit=crop", "specialties": ["Homeowners Insurance", "Commercial Auto", "Group Benefits"], "bio": "Brian is an expert in property and commercial lines, helping business owners and homeowners protect their most valuable assets.", "languages": ["English"], "email": "brian.carter@newhollandfinancial-demo.com", "phone": "(717) 555-0102", "availability": { "Monday": ["10:00", "11:00"], "Wednesday": ["09:00", "10:00", "14:00"], "Friday": ["13:00", "14:00"] } },
  { "id": 3, "name": "Samantha Chen", "title": "Family & Auto Protection Advisor", "imageUrl": "https://images.unsplash.com/photo-1554774853-719586f82d77?q=80&w=400&auto=format&fit=crop", "specialties": ["Auto Insurance", "Renters Insurance", "Term Life"], "bio": "Samantha is passionate about helping young families find affordable and effective coverage for their cars, homes, and loved ones.", "languages": ["English", "Mandarin"], "email": "samantha.chen@newhollandfinancial-demo.com", "phone": "(717) 555-0103", "availability": { "Tuesday": ["10:00", "11:00", "14:00"], "Thursday": ["10:00", "11:00", "13:00"] } }
];

export const service_details: { [key: string]: any[] } = {
  "life": [{ "name": "Whole Life Insurance", "description": "Permanent coverage that builds cash value over time.", "benefits": ["Lifetime protection", "Tax-deferred growth", "Borrowing options"] }],
  "auto": [{ "name": "Passenger Auto", "description": "Protection for everyday vehicles.", "benefits": ["Covers liability, collision, and comprehensive damages."] }],
  "property": [{ "name": "Homeowners Insurance", "description": "Protection for home, belongings, and liability.", "benefits": [] }],
  "real-estate": [
    {
      "name": "Residential Sales & Purchases",
      "description": "Whether you're a first-time homebuyer or a seasoned seller, we provide expert guidance through every step of the process, ensuring a smooth and successful transaction.",
      "benefits": ["Personalized property searches", "Expert negotiation on offers", "Comprehensive closing coordination", "First-time homebuyer programs"]
    },
    {
      "name": "Commercial Real Estate",
      "description": "We assist businesses in finding, acquiring, or leasing commercial properties that align with their operational needs and investment goals.",
      "benefits": ["Office, retail, and industrial spaces", "Lease negotiation and analysis", "Investment property acquisition", "Site selection services"]
    },
    {
      "name": "Real Estate Investment Consulting",
      "description": "Leverage our market expertise to build your real estate portfolio. We help you identify and analyze investment opportunities for long-term wealth creation.",
      "benefits": ["Rental property analysis (Cap Rate, ROI)", "Portfolio diversification strategies", "Guidance on 1031 exchanges", "Market trend forecasting"]
    },
    {
      "name": "Property Management Services",
      "description": "Maximize your return and minimize the hassle of owning rental properties with our comprehensive property management services.",
      "benefits": ["Tenant screening and placement", "Rent collection and financial reporting", "Maintenance and repair coordination", "Lease enforcement"]
    },
    {
      "name": "Comparative Market Analysis (CMA)",
      "description": "Understand the true market value of your property with our detailed CMA report, essential for setting the right price whether you're buying or selling.",
      "benefits": ["Accurate home valuation", "Insights into local market trends", "Informed pricing strategies", "Competitive positioning"]
    },
    {
      "name": "Relocation Services",
      "description": "Moving to or from Iowa? We offer dedicated relocation services to make your transition seamless, from finding a new home to settling into your community.",
      "benefits": ["Area tours and community information", "Coordination with moving services", "Temporary housing assistance", "Selling your current home"]
    }
  ],
  "health": [{ "name": "Health & Dental", "description": "Individual and family medical coverage.", "benefits": ["Access to quality care", "Preventive benefits"] }],
  "group-benefits": [{ "name": "Supplemental Health Plans", "description": "Protect income during illness or injury.", "benefits": [] }]
};
