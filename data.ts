
import React from 'react';
// FIX: Import the BlogPost type to be used for the new blogPosts data array.
import type { BlogPost } from './types';

const AIGLogo = () => (
    React.createElement('svg', {
        viewBox: "0 0 100 50",
        xmlns: "http://www.w3.org/2000/svg",
        className: "max-h-16 w-auto",
        "aria-label": "AIG Logo"
    },
        React.createElement('rect', {
            width: "100",
            height: "50",
            rx: "5",
            fill: "#004b90"
        }),
        React.createElement('text', {
            x: "50",
            y: "32",
            fontFamily: "Arial, sans-serif",
            fontSize: "24",
            fontWeight: "bold",
            fill: "white",
            textAnchor: "middle",
            letterSpacing: "2"
        }, 'AIG')
    )
);


interface Carrier {
    name: string;
    domain: string | null;
    websiteUrl: string;
    customLogo?: React.ReactNode;
}

export const trusted_carriers: Carrier[] = [
    { name: 'Aflac', domain: 'aflac.com', websiteUrl: 'https://www.aflac.com' },
    { name: 'Americo', domain: 'americo.com', websiteUrl: 'https://www.americo.com' },
    { name: 'American Continental Insurance Co', domain: 'aetna.com', websiteUrl: 'https://www.aetna.com' },
    { name: 'Banner Life', domain: 'lgamerica.com', websiteUrl: 'https://www.lgamerica.com' },
    { name: 'Blue Ridge Ins Co.', domain: 'donegalgroup.com', websiteUrl: 'https://www.donegalgroup.com' },
    { name: 'Bristol West', domain: 'bristolwest.com', websiteUrl: 'https://www.bristolwest.com' },
    { name: 'Combined Insurance', domain: 'combinedinsurance.com', websiteUrl: 'https://www.combinedinsurance.com' },
    { name: 'Corebridge Financial', domain: 'corebridgefinancial.com', websiteUrl: 'https://www.corebridgefinancial.com' },
    { name: 'F&G', domain: 'fglife.com', websiteUrl: 'https://www.fglife.com' },
    { name: 'Foremost', domain: 'foremost.com', websiteUrl: 'https://www.foremost.com' },
    { name: 'Geico', domain: 'geico.com', websiteUrl: 'https://www.geico.com' },
    { name: 'Gerber Life', domain: 'gerberlife.com', websiteUrl: 'https://www.gerberlife.com' },
    { name: 'Great American Insurance Group', domain: 'greatamericaninsurancegroup.com', websiteUrl: 'https://www.greatamericaninsurancegroup.com' },
    { name: 'The Hartford', domain: 'thehartford.com', websiteUrl: 'https://www.thehartford.com' },
    { name: 'Illinois Mutual', domain: 'illinoismutual.com', websiteUrl: 'https://www.illinoismutual.com' },
    { name: 'John Hancock', domain: 'johnhancock.com', websiteUrl: 'https://www.johnhancock.com' },
    { name: 'Protective Life', domain: 'protective.com', websiteUrl: 'https://www.protective.com' },
    { name: 'Liberty Bankers Life', domain: 'lbig.com', websiteUrl: 'https://www.lbig.com' },
    { name: 'Lincoln Financial', domain: 'lfg.com', websiteUrl: 'https://www.lfg.com' },
    { name: 'National Life Group', domain: 'nationallife.com', websiteUrl: 'https://www.nationallife.com' },
    { name: 'New York Life', domain: 'newyorklife.com', websiteUrl: 'https://www.newyorklife.com' },
    { name: 'Next Insurance', domain: 'nextinsurance.com', websiteUrl: 'https://www.nextinsurance.com' },
    { name: 'Prudential', domain: 'prudential.com', websiteUrl: 'https://www.prudential.com' },
    { name: 'Root Insurance', domain: 'joinroot.com', websiteUrl: 'https://www.joinroot.com' },
    { name: 'Symetra', domain: 'symetra.com', websiteUrl: 'https://www.symetra.com' },
    { name: 'Transamerica', domain: 'transamerica.com', websiteUrl: 'https://www.transamerica.com' },
    { name: 'AIG', domain: null, websiteUrl: 'https://www.aig.com', customLogo: React.createElement(AIGLogo) },
    { name: 'Allianz', domain: 'allianz.com', websiteUrl: 'https://www.allianz.com' },
    { name: 'Ameritas Life', domain: 'ameritas.com', websiteUrl: 'https://www.ameritas.com' },
    { name: 'Foresters Financial', domain: 'foresters.com', websiteUrl: 'https://www.foresters.com' },
    { name: 'Kansas City Life', domain: 'kclife.com', websiteUrl: 'https://www.kclife.com' },
    { name: 'Mutual of Omaha', domain: 'mutualofomaha.com', websiteUrl: 'https://www.mutualofomaha.com' },
].sort((a, b) => a.name.localeCompare(b.name));


// --- Data from former db.json ---
export const core_services = [
    {
      "name": "Life Insurance",
      "path": "/services/life",
      "description": "Protect your family's future with comprehensive life insurance policies."
    },
    {
      "name": "Auto & Commercial",
      "path": "/services/auto",
      "description": "Coverage for your personal vehicles, classic cars, and commercial fleets."
    },
    {
      "name": "Property Insurance",
      "path": "/services/property",
      "description": "Secure your home and belongings against unforeseen events."
    },
    {
      "name": "Real Estate",
      "path": "/services/real-estate",
      "description": "Guidance on buying, selling, and investing in residential and commercial properties."
    },
    {
      "name": "Health Insurance",
      "path": "/services/health",
      "description": "Access quality healthcare with individual and family plans."
    },
    {
      "name": "Group Benefits",
      "path": "/services/group-benefits",
      "description": "Offer your employees valuable benefits like health and disability coverage."
    }
  ];

export const service_details = {
    "life": [
      {
        "name": "Whole Life Insurance",
        "description": "Permanent coverage that builds cash value over time.",
        "benefits": [
          "Lifetime protection",
          "Tax-deferred growth",
          "Borrowing options"
        ]
      },
      {
        "name": "Universal Life Insurance",
        "description": "Flexible premiums and adjustable death benefits.",
        "benefits": [
          "Cash value growth",
          "Flexibility",
          "Tax advantages"
        ]
      },
      {
        "name": "Indexed Universal Life (IUL)",
        "description": "Tied to market performance (e.g., S&P 500) with downside protection.",
        "benefits": [
          "Growth potential",
          "Living benefits",
          "Tax-free loans"
        ]
      },
      {
        "name": "Annuities",
        "description": "Guaranteed income for retirement.",
        "benefits": [
          "Lifetime income",
          "Principal protection",
          "Growth options"
        ]
      },
      {
        "name": "Term Life",
        "description": "Affordable coverage for a set period (10, 20, 30 years).",
        "benefits": [
          "High coverage",
          "Low cost",
          "Simple protection"
        ]
      },
      {
        "name": "Term Life with Living Benefits",
        "description": "Adds protection for illness or injury.",
        "benefits": [
          "Access cash while living for critical, chronic, or terminal conditions."
        ]
      }
    ],
    "auto": [
      {
        "name": "Passenger Auto",
        "description": "Protection for everyday vehicles.",
        "benefits": [
          "Covers liability, collision, and comprehensive damages."
        ]
      },
      {
        "name": "Classic & Custom Cars",
        "description": "Tailored coverage for collectible and modified vehicles.",
        "benefits": []
      },
      {
        "name": "Commercial (Heavy-Duty) Vehicles",
        "description": "Coverage for trucks, fleets, and contractors.",
        "benefits": [
          "Protects against liability, damage, and downtime."
        ]
      }
    ],
    "property": [
      {
        "name": "Homeowners Insurance",
        "description": "Protection for home, belongings, and liability.",
        "benefits": []
      },
      {
        "name": "Renters Insurance",
        "description": "Protects personal items and provides liability coverage.",
        "benefits": []
      },
      {
        "name": "Theft, Flood & Fire Coverage",
        "description": "Add-ons for natural and accidental damages.",
        "benefits": []
      }
    ],
    "health": [
      {
        "name": "Health & Dental",
        "description": "Individual and family medical coverage.",
        "benefits": [
          "Access to quality care",
          "Preventive benefits",
          "Affordable premiums"
        ]
      }
    ],
    "real-estate": [
      {
        "name": "Residential Sales",
        "description": "Expert guidance for buying or selling your primary home, vacation property, or investment rental.",
        "benefits": [
          "Market analysis",
          "Expert negotiation",
          "Seamless closing process"
        ]
      },
      {
        "name": "Commercial Properties",
        "description": "Strategic advice for acquiring or divesting commercial real estate, including office, retail, and industrial spaces.",
        "benefits": [
          "Investment analysis",
          "Lease negotiation",
          "Property management"
        ]
      },
      {
        "name": "Investment Properties",
        "description": "Identify and analyze opportunities for real estate investment to build long-term wealth.",
        "benefits": [
          "Cash flow analysis",
          "Portfolio diversification",
          "1031 exchanges"
        ]
      }
    ],
    "group-benefits": [
      {
        "name": "Supplemental Health Plans",
        "description": "Protect income during illness or injury.",
        "benefits": []
      },
      {
        "name": "Family Health Insurance",
        "description": "Group options for dependents and employees.",
        "benefits": []
      },
      {
        "name": "Income Protector",
        "description": "Provides monthly income if unable to work.",
        "benefits": []
      },
      {
        "name": "Accidental AD & Disability",
        "description": "Covers long and short-term disabilities and accidents.",
        "benefits": []
      }
    ]
  };

export const advisors = [
    {
      "id": 1,
      "name": "Jessica Miller",
      "title": "Senior Life & Health Advisor",
      "imageUrl": "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=400&auto=format&fit=crop",
      "specialties": [
        "Life Insurance",
        "Health Insurance",
        "Retirement Planning"
      ],
      "bio": "With over 15 years of experience, Jessica specializes in creating comprehensive life and health insurance strategies for families and individuals, ensuring their long-term security.",
      "languages": [
        "English",
        "Spanish"
      ],
      "email": "jessica.miller@newhollandfinancial-demo.com",
      "availability": {
        "Monday": [
          "09:00",
          "10:00",
          "11:00",
          "14:00"
        ],
        "Tuesday": [
          "09:00",
          "10:00",
          "14:00",
          "15:00"
        ],
        "Wednesday": [
          "10:00",
          "11:00",
          "12:00"
        ],
        "Thursday": [
          "09:00",
          "10:00",
          "15:00",
          "16:00"
        ],
        "Friday": [
          "09:00",
          "10:00"
        ]
      }
    },
    {
      "id": 2,
      "name": "Brian Carter",
      "title": "Property & Commercial Specialist",
      "imageUrl": "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=400&auto=format&fit=crop",
      "specialties": [
        "Homeowners Insurance",
        "Commercial Auto",
        "Group Benefits"
      ],
      "bio": "Brian is an expert in property and commercial lines, helping business owners and homeowners protect their most valuable assets with tailored coverage.",
      "languages": [
        "English"
      ],
      "email": "brian.carter@newhollandfinancial-demo.com",
      "availability": {
        "Monday": [
          "10:00",
          "11:00",
          "13:00"
        ],
        "Wednesday": [
          "09:00",
          "10:00",
          "11:00",
          "14:00",
          "15:00"
        ],
        "Friday": [
          "13:00",
          "14:00",
          "15:00"
        ]
      }
    },
    {
      "id": 3,
      "name": "Samantha Chen",
      "title": "Family & Auto Protection Advisor",
      "imageUrl": "https://images.unsplash.com/photo-1554774853-719586f82d77?q=80&w=400&auto=format&fit=crop",
      "specialties": [
        "Auto Insurance",
        "Renters Insurance",
        "Term Life"
      ],
      "bio": "Samantha is passionate about helping young families and individuals find affordable and effective coverage for their cars, homes, and loved ones.",
      "languages": [
        "English",
        "Mandarin",
        "Cantonese"
      ],
      "email": "samantha.chen@newhollandfinancial-demo.com",
      "availability": {
        "Tuesday": [
          "10:00",
          "11:00",
          "13:00",
          "14:00",
          "15:00"
        ],
        "Wednesday": [
          "10:00",
          "11:00",
          "12:00"
        ],
        "Thursday": [
          "10:00",
          "11:00",
          "13:00",
          "14:00"
        ]
      }
    }
  ];

export const video_resources = [
    {
      "id": "vid-1624582301",
      "title": "Term vs. Whole Life Insurance Explained",
      "description": "Understand the key differences between term and whole life insurance to decide which is right for you.",
      "type": "youtube",
      "source": "h_43-16PS5k"
    },
    {
      "id": "vid-1624582302",
      "title": "Understanding Annuities: A Beginner's Guide",
      "description": "Learn the basics of annuities and how they can provide a steady income stream during retirement.",
      "type": "youtube",
      "source": "fTTGALaI-1w"
    }
  ];

export const document_resources = [
    {
      "id": "doc-fact-finder-1",
      "title": "Financial Fact Finder",
      "description": "A comprehensive worksheet to help you organize your finances and plan for your family's future.",
      "filePath": "https://www.newyorklife.com/content/dam/nyl/docs/pdfs/financial-calculators/client-fact-finder.pdf"
    },
    {
      "id": "doc-inventory-checklist-2",
      "title": "Home Inventory Checklist",
      "description": "A helpful guide and template for creating a home inventory for your property insurance records.",
      "filePath": "https://www.iii.org/sites/default/files/docs/pdf/home_inventory_checklist.pdf"
    }
  ];

export const products = [
    {
      "id": 101,
      "name": "Financial Peace of Mind Mug",
      "price": 15.99,
      "imageUrl": "https://images.unsplash.com/photo-1594228949824-c15535b248a3?q=80&w=600&auto=format&fit=crop",
      "description": "Start your day with a reminder of your financial goals. A sturdy and glossy ceramic mug."
    },
    {
      "id": 102,
      "name": "Insure Your Future T-Shirt",
      "price": 24.5,
      "imageUrl": "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?q=80&w=600&auto=format&fit=crop",
      "description": "A comfortable 100% cotton t-shirt that makes a statement about planning for the future."
    },
    {
      "id": 103,
      "name": "The Complete Guide to Personal Finance (eBook)",
      "price": 9.99,
      "imageUrl": "https://images.unsplash.com/photo-1589998059171-988d887df646?q=80&w=600&auto=format&fit=crop",
      "description": "A comprehensive digital guide covering everything from budgeting to investing. Instant download."
    },
    {
      "id": 104,
      "name": "Secure Future Leather-bound Journal",
      "price": 29.99,
      "imageUrl": "https://images.unsplash.com/photo-1516414447565-b14be0adf13e?q=80&w=600&auto=format&fit=crop",
      "description": "A high-quality journal to track your financial journey, goals, and achievements."
    }
  ];

export const commissions = [
    {
      "id": "C001",
      "policyId": "POL-LIFE-98765",
      "clientName": "John Doe",
      "amount": 1250.75,
      "date": "2024-05-15T10:00:00Z",
      "agentId": "mock-user-agent-123"
    },
    {
      "id": "C002",
      "policyId": "POL-AUTO-12345",
      "clientName": "Jane Smith",
      "amount": 345.5,
      "date": "2024-05-20T14:30:00Z",
      "agentId": "mock-user-agent-123"
    },
    {
      "id": "C003",
      "policyId": "POL-HOME-67890",
      "clientName": "Peter Jones",
      "amount": 870,
      "date": "2024-06-01T11:00:00Z",
      "agentId": "another-agent-id"
    },
    {
      "id": "C004",
      "policyId": "POL-LIFE-54321",
      "clientName": "Mary Williams",
      "amount": 2100,
      "date": "2024-06-05T09:00:00Z",
      "agentId": "mock-user-agent-123"
    },
    {
      "id": "C005",
      "policyId": "POL-GRP-11223",
      "clientName": "Tech Solutions Inc.",
      "amount": 5430.25,
      "date": "2024-06-10T16:00:00Z",
      "agentId": "mock-user-agent-123"
    }
  ];

export const leads = [
    {
      "id": "L001",
      "name": "Alex Johnson",
      "email": "alex.j@example.com",
      "phone": "555-0101",
      "status": "New",
      "source": "Website Form",
      "assignedAgentId": "mock-user-agent-123",
      "createdAt": "2024-06-20T10:00:00Z",
      "updatedAt": "2024-06-20T10:00:00Z"
    },
    {
      "id": "L002",
      "name": "Brenda Smith",
      "email": "brenda.s@example.com",
      "phone": "555-0102",
      "status": "In Progress",
      "source": "Referral",
      "assignedAgentId": "mock-user-agent-123",
      "createdAt": "2024-06-18T15:30:00Z",
      "updatedAt": "2024-06-19T11:00:00Z"
    },
    {
      "id": "L003",
      "name": "Charles Davis",
      "email": "charles.d@example.com",
      "phone": "555-0103",
      "status": "Closed - Lost",
      "source": "Cold Call",
      "assignedAgentId": "another-agent-id",
      "createdAt": "2024-05-10T09:00:00Z",
      "updatedAt": "2024-06-15T14:00:00Z"
    }
  ];

export const clients = [
    {
      "id": "CL001",
      "name": "Diana Prince",
      "email": "diana.p@example.com",
      "phone": "555-0201",
      "policies": [
        "POL-LIFE-98765",
        "POL-AUTO-12345"
      ],
      "agentId": "mock-user-agent-123",
      "joinedDate": "2022-08-15T00:00:00Z"
    },
    {
      "id": "CL002",
      "name": "Bruce Wayne",
      "email": "bruce.w@example.com",
      "phone": "555-0202",
      "policies": [
        "POL-HOME-67890"
      ],
      "agentId": "another-agent-id",
      "joinedDate": "2021-03-20T00:00:00Z"
    },
    {
      "id": "CL003",
      "name": "Clark Kent",
      "email": "clark.k@example.com",
      "phone": "555-0203",
      "policies": [
        "POL-LIFE-54321"
      ],
      "agentId": "mock-user-agent-123",
      "joinedDate": "2023-11-01T00:00:00Z"
    }
  ];

export const tasks = [
    {
      "id": "T001",
      "title": "Follow up with Alex Johnson about life insurance quote",
      "dueDate": "2024-08-28T16:00:00.000Z",
      "isCompleted": false,
      "assignedToId": "mock-user-agent-123",
      "reminderOffset": 60,
      "relatedTo": {
        "type": "Lead",
        "id": "L001",
        "name": "Alex Johnson"
      }
    },
    {
      "id": "T002",
      "title": "Prepare annual review documents for Diana Prince",
      "dueDate": "2024-08-30T10:00:00.000Z",
      "isCompleted": false,
      "assignedToId": "mock-user-agent-123",
      "reminderOffset": 1440,
      "relatedTo": {
        "type": "Client",
        "id": "CL001",
        "name": "Diana Prince"
      }
    },
    {
      "id": "T003",
      "title": "Send birthday card to Clark Kent",
      "dueDate": "2024-09-01T09:00:00.000Z",
      "isCompleted": true,
      "assignedToId": "mock-user-agent-123",
      "reminderOffset": null,
      "relatedTo": {
        "type": "Client",
        "id": "CL003",
        "name": "Clark Kent"
      }
    },
    {
      "id": "T004",
      "title": "Call Brenda Smith to check on application status",
      "dueDate": "2024-08-29T14:30:00.000Z",
      "isCompleted": false,
      "assignedToId": "mock-user-agent-123",
      "reminderOffset": 15,
      "relatedTo": {
        "type": "Lead",
        "id": "L002",
        "name": "Brenda Smith"
      }
    }
  ];
// FIX: Add and export blogPosts data to resolve import errors in other components.
export const blogPosts: BlogPost[] = [
    {
        slug: 'understanding-term-life-insurance',
        title: 'Understanding Term Life Insurance: A Beginner\'s Guide',
        description: 'Term life insurance is a popular choice for many families. This guide breaks down what it is, how it works, and who it\'s best for.',
        author: 'Jessica Miller',
        authorTitle: 'Senior Life & Health Advisor',
        authorImageUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=400&auto=format&fit=crop',
        date: '2024-06-15T10:00:00Z',
        readTime: 5,
        category: 'Life Insurance',
        tags: ['Term Life', 'Financial Planning', 'Family Protection'],
        imageUrl: 'https://images.unsplash.com/photo-1560520031-3a17f672c4c2?q=80&w=1200&auto=format&fit=crop',
        content: `
            <h2>What is Term Life Insurance?</h2>
            <p>Term life insurance is a type of life insurance policy that provides coverage for a specific period or "term." If the insured person passes away during this term, a death benefit is paid out to the beneficiaries. It's often considered the simplest and most affordable type of life insurance.</p>
            <h3>Key Features:</h3>
            <ul>
                <li><strong>Fixed Premiums:</strong> Your payments typically remain the same for the entire term.</li>
                <li><strong>Specific Term Lengths:</strong> Common terms are 10, 20, or 30 years.</li>
                <li><strong>No Cash Value:</strong> Unlike whole life insurance, it does not have a savings component. Its sole purpose is to provide a death benefit.</li>
            </ul>
            <h2>Who is it for?</h2>
            <p>Term life is ideal for individuals who need coverage for a specific period, such as until their children are grown, or their mortgage is paid off. It's a great way to ensure your loved ones are financially protected during your highest-earning years.</p>
        `,
        relatedServices: [{ name: 'Life Insurance', path: '/services/life' }]
    },
    {
        slug: '5-tips-for-lowering-your-auto-insurance-premium',
        title: '5 Tips for Lowering Your Auto Insurance Premium',
        description: 'Looking to save money on car insurance? Here are five practical tips that could help you reduce your premium without sacrificing coverage.',
        author: 'Brian Carter',
        authorTitle: 'Property & Commercial Specialist',
        authorImageUrl: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=400&auto=format&fit=crop',
        date: '2024-06-10T14:30:00Z',
        readTime: 4,
        category: 'Auto Insurance',
        tags: ['Auto Insurance', 'Saving Money', 'Tips'],
        imageUrl: 'https://images.unsplash.com/photo-1517524206127-48bbd363f357?q=80&w=1200&auto=format&fit=crop',
        content: `
            <h2>Saving on Car Insurance</h2>
            <p>Everyone wants to save money on car insurance. Here are a few ways to potentially lower your rates:</p>
            <ol>
                <li><strong>Shop Around:</strong> Don't settle for the first quote you get. Comparing rates from different carriers is the single best way to find a better deal.</li>
                <li><strong>Increase Your Deductible:</strong> A higher deductible usually means a lower premium. Just make sure you can afford to pay it out-of-pocket if you need to file a claim.</li>
                <li><strong>Look for Discounts:</strong> Many insurers offer discounts for things like a good driving record, low mileage, bundling policies (e.g., auto and home), or having safety features in your car.</li>
                <li><strong>Maintain a Good Credit Score:</strong> In many states, your credit score can impact your insurance rates. A better score can lead to lower premiums.</li>
                <li><strong>Review Your Coverage Annually:</strong> Your needs change over time. An older car might not need collision or comprehensive coverage, which could save you a significant amount.</li>
            </ol>
        `,
        relatedServices: [{ name: 'Auto & Commercial', path: '/services/auto' }]
    },
    {
        slug: 'navigating-the-real-estate-market',
        title: 'Navigating Today\'s Real Estate Market as a First-Time Buyer',
        description: 'Buying your first home can be daunting. This article provides key insights and advice for first-time homebuyers to navigate the current real estate landscape successfully.',
        author: 'Samantha Chen',
        authorTitle: 'Family & Auto Protection Advisor',
        authorImageUrl: 'https://images.unsplash.com/photo-1554774853-719586f82d77?q=80&w=400&auto=format&fit=crop',
        date: '2024-05-28T09:00:00Z',
        readTime: 6,
        category: 'Real Estate',
        tags: ['Home Buying', 'Real Estate', 'Financial Planning'],
        imageUrl: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=1200&auto=format&fit=crop',
        content: `
            <h2>Tips for First-Time Homebuyers</h2>
            <p>The real estate market can be competitive, but with the right strategy, you can successfully purchase your first home.</p>
            <h3>Get Pre-Approved, Not Just Pre-Qualified</h3>
            <p>A pre-approval from a lender shows sellers that you're a serious buyer with the financial backing to make a purchase. It carries more weight than a pre-qualification.</p>
            <h3>Know Your Budget</h3>
            <p>Understand all the costs involved: down payment, closing costs, property taxes, homeowners insurance, and potential mortgage insurance (PMI). Don't just focus on the sale price.</p>
            <h3>Be Flexible</h3>
            <p>In a tight market, you may need to be flexible on your wish list. Prioritize your "must-haves" versus your "nice-to-haves." Sometimes, the perfect house is one you can grow into and customize over time.</p>
        `,
        relatedServices: [{ name: 'Real Estate', path: '/services/real-estate' }, { name: 'Property Insurance', path: '/services/property' }]
    }
];
