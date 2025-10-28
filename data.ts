
import type { Product, Advisor, User, EditableContent } from './types';
// FIX: 'Role' is an enum used as a value, so it must be imported directly,
// not as a type. The other imports are interfaces and can be type-only.
import { Role } from './types';

export const users: User[] = [
  { id: 1, name: 'Admin User', email: 'admin@nhf.com', role: Role.Admin, phone: '555-0199' },
  { id: 2, name: 'Jessica Miller', email: 'jessica.miller@newhollandfinancial-demo.com', role: Role.Advisor, phone: '(717) 555-0101', baseCommissionRate: 55 },
  { id: 3, name: 'Brian Carter', email: 'brian.carter@newhollandfinancial-demo.com', role: Role.Advisor, phone: '(717) 555-0102', baseCommissionRate: 50 },
  { id: 4, name: 'John Doe', email: 'john.doe@example.com', role: Role.User, phone: '555-0104' },
  { id: 5, name: 'Manager User', email: 'manager@nhf.com', role: Role.Manager, phone: '555-0105' },
  { id: 6, name: 'Sub Admin User', email: 'subadmin@nhf.com', role: Role.SubAdmin, phone: '555-0106' },
  { id: 7, name: 'Underwriter User', email: 'underwriter@nhf.com', role: Role.Underwriter, phone: '555-0107' },
  { id: 8, name: 'Samantha Chen', email: 'samantha.chen@newhollandfinancial-demo.com', role: Role.Advisor, phone: '(717) 555-0103', baseCommissionRate: 50 },
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
    { name: 'Twitter', url: 'https://twitter.com/Newhollandfg' },
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

const ALL_SOCIALS_TEMPLATE = [
    { name: 'LinkedIn', url: '' }, { name: 'Facebook', url: '' }, { name: 'Twitter', url: '' },
    { name: 'Instagram', url: '' }, { name: 'TikTok', url: '' }, { name: 'Snapchat', url: '' }, { name: 'Threads', url: '' },
];

export const advisors: Advisor[] = [
  { "id": 1, "name": "Jessica Miller", "slug": "jessica-miller", "title": "Senior Life & Health Advisor", "imageUrl": "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=400&auto=format&fit=crop", "specialties": ["Life Insurance", "Health Insurance", "Retirement Planning"], "bio": "With over 15 years of experience, Jessica specializes in creating comprehensive life and health insurance strategies.", "languages": ["English", "Spanish"], "email": "jessica.miller@newhollandfinancial-demo.com", "phone": "(717) 555-0101", "availability": { "Monday": ["09:00", "10:00", "14:00"], "Tuesday": ["09:00", "10:00", "15:00"], "Friday": ["09:00", "10:00"] }, "socialLinks": [...ALL_SOCIALS_TEMPLATE] },
  { "id": 2, "name": "Brian Carter", "slug": "brian-carter", "title": "Property & Commercial Specialist", "imageUrl": "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=400&auto=format&fit=crop", "specialties": ["Homeowners Insurance", "Commercial Auto", "Group Benefits"], "bio": "Brian is an expert in property and commercial lines, helping business owners and homeowners protect their most valuable assets.", "languages": ["English"], "email": "brian.carter@newhollandfinancial-demo.com", "phone": "(717) 555-0102", "availability": { "Monday": ["10:00", "11:00"], "Wednesday": ["09:00", "10:00", "14:00"], "Friday": ["13:00", "14:00"] }, "socialLinks": [...ALL_SOCIALS_TEMPLATE] },
  { "id": 3, "name": "Samantha Chen", "slug": "samantha-chen", "title": "Family & Auto Protection Advisor", "imageUrl": "https://images.unsplash.com/photo-1554774853-719586f82d77?q=80&w=400&auto=format&fit=crop", "specialties": ["Auto Insurance", "Renters Insurance", "Term Life"], "bio": "Samantha is passionate about helping young families find affordable and effective coverage for their cars, homes, and loved ones.", "languages": ["English", "Mandarin"], "email": "samantha.chen@newhollandfinancial-demo.com", "phone": "(717) 555-0103", "availability": { "Tuesday": ["10:00", "11:00", "14:00"], "Thursday": ["10:00", "11:00", "13:00"] }, "socialLinks": [...ALL_SOCIALS_TEMPLATE] }
];

export const service_details: { [key: string]: any[] } = {
  "life": [
    {
        name: 'Final Expense Insurance',
        description: 'Designed to cover funeral, burial, and other end-of-life costs so your family doesn’t bear the financial burden.',
        benefits: [
            'Affordable, lifetime coverage (no expiration)',
            'Simple qualification process (often no medical exam)',
            'Provides quick payout to cover funeral costs, debts, or small medical bills',
            'Peace of mind knowing loved ones are protected'
        ]
    },
    {
        name: 'Whole Life Insurance',
        description: 'Provides permanent coverage that lasts your entire lifetime and builds cash value over time.',
        benefits: [
            'Guaranteed death benefit and fixed premiums',
            'Builds tax-deferred cash value you can borrow from',
            'Lifetime protection—coverage never expires',
            'Ideal for legacy planning and wealth transfer'
        ]
    },
    {
        name: 'Universal Life Insurance (UL)',
        description: 'Flexible permanent life insurance allowing you to adjust your premiums and death benefits.',
        benefits: [
            'Flexible payment options',
            'Builds cash value with potential to earn interest',
            'Adjustable coverage amount as your needs change',
            'Useful for long-term family or business financial planning'
        ]
    },
    {
        name: 'Indexed Universal Life (IUL)',
        description: 'A form of Universal Life insurance that links your cash value growth to a market index (like the S&P 500), offering higher potential returns without direct market risk.',
        benefits: [
            'Market-linked growth with downside protection',
            'Tax-deferred cash accumulation',
            'Flexible premiums and coverage',
            'Can provide living benefits for retirement income or emergencies'
        ]
    },
    {
        name: 'Term Life Insurance',
        description: 'Provides affordable coverage for a specific period—10, 20, or 30 years—to protect your loved ones during key financial years.',
        benefits: [
            'Lower cost, higher coverage amounts',
            'Ideal for income replacement, mortgage, or children’s education',
            'Convertible to permanent life insurance in some cases',
            'Simple and easy to qualify for'
        ]
    },
    {
        name: 'Critical Illness Insurance',
        description: 'Pays a lump-sum cash benefit if you’re diagnosed with a covered critical illness such as cancer, heart attack, or stroke.',
        benefits: [
            'Financial support during serious illness',
            'Covers medical expenses, income loss, or household bills',
            'Lump-sum benefit paid directly to you (not medical providers)',
            'Can be added as a rider to life insurance or purchased separately',
            'Helps you focus on recovery, not bills'
        ]
    }
  ],
  "auto": [
    {
        name: 'Auto Insurance',
        description: 'Protects you, your vehicle, and others from financial loss due to accidents, theft, or damage.',
        benefits: [
            'Covers vehicle repairs or replacement after accidents or theft',
            'Pays for injuries to you, your passengers, or others',
            'Includes liability coverage for property damage or bodily injury you cause',
            'Optional coverage for rental cars, roadside assistance, and uninsured drivers',
            'Helps you stay compliant with state insurance laws'
        ]
    },
    {
        name: 'Commercial Truck Insurance',
        description: 'Covers trucks, drivers, and cargo used for business purposes — ideal for owner-operators, fleet owners, and logistics companies.',
        benefits: [
            'Covers damage to trucks, trailers, and cargo',
            'Provides liability protection for accidents caused by your drivers',
            'Covers medical payments, towing, downtime, and rental reimbursement',
            'Can include general liability, motor truck cargo, and non-trucking liability',
            'Helps keep your business running after unexpected losses'
        ]
    }
  ],
  "property": [
    {
        name: 'Property Insurance Overview',
        description: 'Protects residential and business properties against loss or damage from covered perils such as fire, storms, theft, vandalism, and liability claims. Since disasters can strike anytime, property insurance is crucial for protecting your home, business, and financial future.',
        benefits: [
            'Covers damage to the structure and contents from fire, theft, or storms',
            'Pays for temporary living expenses if your home becomes uninhabitable (loss of use)',
            'Liability coverage if someone is injured on your property',
            'Replacement cost coverage to rebuild or repair property without depreciation',
            'Optional umbrella policy for higher liability protection',
            'For businesses: includes coverage for equipment, tools, inventory, signage, and loss of income',
            'Helps you meet lender or lease insurance requirements',
            'Peace of mind knowing your biggest investments are protected',
        ]
    },
    {
        name: 'Main Coverage Types',
        description: 'We offer a range of policies for every need, from personal homes to commercial buildings.',
        benefits: [
            'Homeowners Insurance: Protects your house, attached structures, and personal belongings.',
            'Renters Insurance: Covers personal property and liability for tenants.',
            'Condo Insurance (HO-6): Covers the interior of your unit and personal belongings.',
            'Landlord Insurance: Protects rental properties and provides loss-of-rent coverage.',
            'Commercial Property Insurance: Covers buildings, inventory, and business equipment.',
            'Flood, Earthquake, or Windstorm Insurance: Optional add-ons for natural disaster protection.',
        ]
    },
    {
        name: 'Additional Specialized Protections',
        description: 'Enhance your policy with specialized coverage for unique assets and risks.',
        benefits: [
            'Personal Articles Floater: Covers valuable items like jewelry, art, or collectibles.',
            'Business Interruption Coverage: Replaces lost income if your business is forced to close due to a covered event.',
            'Cyber & Data Breach Coverage: For businesses handling customer data.',
        ]
    }
  ],
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
  "health": [
    {
      "name": "🏥 Health Insurance",
      "description": "Protects individuals, families, and employees from high medical costs while ensuring access to essential and preventive healthcare services. Covers individual & family plans, group health, short-term medical, Medicare, Marketplace (ACA) plans, and more.",
      "benefits": [
        "Coverage for doctor visits, hospitalizations, surgeries, and prescriptions",
        "Preventive and wellness care included (annual exams, screenings, vaccinations)",
        "Emergency and urgent care coverage",
        "Mental health and substance abuse treatment",
        "Maternity, newborn, and pediatric care",
        "Telehealth & Virtual Care — access to licensed doctors 24/7",
        "Critical Illness and Accident Riders available for added protection",
        "Financial safety against unexpected medical bills",
        "Access to large provider networks and negotiated rates",
        "HSA/FSA eligible plans to save pre-tax funds for health expenses"
      ]
    },
    {
      "name": "🦷 Dental & Orthodontic (Braces) Coverage",
      "description": "Keeps your oral health in top shape and helps manage costs for dental and orthodontic treatments. Highlights include routine checkups, fillings, root canals, crowns, and orthodontic coverage for braces and aligners (e.g., Invisalign).",
      "benefits": [
        "Encourages preventive oral care, lowering long-term dental costs",
        "Affordable access to braces for children or adults",
        "Reduces out-of-pocket expenses for major dental work",
        "Can be purchased as standalone or bundled with health coverage",
        "Helps maintain confident smiles and overall well-being"
      ]
    },
    {
      "name": "👁️ Vision Coverage",
      "description": "Helps individuals and families maintain healthy eyesight and reduce the cost of eye care. Highlights include annual eye exams, prescription glasses, contact lenses, and discounts on laser vision correction (LASIK/PRK).",
      "benefits": [
        "Affordable access to routine vision care",
        "Early detection of eye conditions and other health issues",
        "Helps maintain productivity and quality of life",
        "Available as a standalone plan or with health/dental packages"
      ]
    }
  ],
  "group-benefits": [
    {
        name: 'Group Benefits Insurance',
        description: 'Provides businesses with affordable insurance for their employees, protecting their health, income, and financial security. It is a powerful tool to attract and retain talent, fostering a culture of care, loyalty, and stability.',
        benefits: [
            'Group Health, Dental & Vision Plans',
            'Group Life & Disability Insurance',
            'Group Accident & Critical Illness Plans',
            'Group Retirement / 401(k) Plans',
            'Employee Assistance Programs (EAP)',
            'Voluntary Benefits (e.g., legal, pet insurance)',
        ]
    },
    {
        name: 'Key Benefits for Employers',
        description: 'Offering group benefits is a strategic investment in your company\'s greatest asset—its people.',
        benefits: [
            'Attracts and retains top talent',
            'Increases employee satisfaction and productivity',
            'Tax-deductible business expense',
            'Enhances company culture and morale',
            'Reduces turnover and recruitment costs',
            'Demonstrates commitment to employee well-being'
        ]
    },
    {
        name: 'Key Benefits for Employees',
        description: 'Employees gain access to comprehensive and affordable protection for themselves and their families.',
        benefits: [
            'Access to affordable insurance with lower premiums',
            'Guaranteed issue (no medical exam for basic coverage)',
            'Convenient payroll deductions',
            'Financial protection for families',
            'Access to wellness programs and telehealth',
            'Mental health and financial literacy support'
        ]
    },
    {
        name: 'Optional Enhancements',
        description: 'Customize your benefits package to meet the unique needs of your modern workforce.',
        benefits: [
            'Flexible Spending (FSA) and Health Savings (HSA) Accounts',
            'Cafeteria (Section 125) Plans',
            'Dependent Care Benefits',
            'Wellness Incentive Programs',
            'Telemedicine & Virtual Health Platforms',
            'Group Long-Term Care and Hybrid/Remote Worker options'
        ]
    }
]
};