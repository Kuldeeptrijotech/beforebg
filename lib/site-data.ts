export type NavItem = {
  label: string;
  href: string;
};

export const publicRoutes = [
  "/",
  "/services",
  "/solutions",
  "/industries",
  "/blogs",
  "/case-studies",
  "/careers",
  "/contact",
  "/privacy-policy"
] as const;

export const siteConfig = {
  name: "Trijotech",
  description:
    "SAP, data, and cloud transformation services for modern enterprise teams.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  navItems: [
    { label: "Services", href: "/services" },
    { label: "Solutions", href: "/solutions" },
    { label: "Industries", href: "/industries" },
    { label: "Blogs", href: "/blogs" },
    { label: "Case Studies", href: "/case-studies" },
    { label: "Careers", href: "/careers" }
  ] satisfies NavItem[],
  footer: {
    summary:
      "Trijotech helps organizations modernize SAP landscapes, data platforms, and cloud applications with practical engineering teams.",
    columns: [
      {
        title: "Useful Links",
        links: [
          { label: "Home", href: "/" },
          { label: "Blogs", href: "/blogs" },
          { label: "Case Studies", href: "/case-studies" },
          { label: "Videos", href: "/videos" }
        ]
      },
      {
        title: "Company",
        links: [
          { label: "Services", href: "/services" },
          { label: "Solutions", href: "/solutions" },
          { label: "Industries", href: "/industries" },
          { label: "Careers", href: "/careers" },
          { label: "Contact", href: "/contact" }
        ]
      },
      {
        title: "Compliance",
        links: [
          { label: "Privacy Policy", href: "/privacy-policy" }
        ]
      }
    ],
    contact: {
      email: "sales@trijotech.com",
      phones: [
        {
          label: "+91 120-3506433",
          href: "tel:+911203506433"
        },
        {
          label: "+91 7982531976",
          href: "tel:+917982531976"
        }
      ],
      addresses: [
        {
          title: "Corporate Address",
          lines: [
            "C56A, Infinity Technopark, 501, 16, C Block,",
            "Phase 2, Sector 62, Noida,",
            "Uttar Pradesh 201309"
          ]
        },
        {
          title: "Registered Address",
          lines: [
            "House No. 74, 2nd Floor, Block B,",
            "Pocket 6, Sector 7, Rohini,",
            "North West Delhi - 110085"
          ]
        }
      ]
    },
    badges: [
      {
        label: "Trijotech Software Consulting Pvt Ltd",
        src: "/static/footer/trijotech-footer-logo.png",
        width: 500,
        height: 289
      },
      {
        label: "SAP Partner",
        src: "/static/footer/sap-partner-logo.png",
        width: 130,
        height: 65
      },
      {
        label: "ISO certifications",
        src: "/static/footer/iso-certifications.png",
        width: 135,
        height: 65
      }
    ],
    socialLinks: [
      {
        label: "YouTube",
        href: "https://www.youtube.com/@trijotech"
      },
      {
        label: "LinkedIn",
        href: "https://www.linkedin.com/company/trijotech/"
      },
      {
        label: "X",
        href: "https://x.com/trijotech"
      }
    ]
  }
} as const;


export type ServiceItem = {
  title: string;
  description: string;
  href: string;
  image: string;
  imageAlt: string;
  showOnHome: boolean;
};

export type WhyChooseUsItem = {
  title: string;
  description: string;
  image: string;
  imageAlt: string;
  showOnHome: boolean;
}

export const services = [
  {
    title: "SAP Consulting",
    description:
      "Implementation, integration, reporting, and business process optimization for SAP landscapes.",
    href: "/services/sap-consulting",
    image: "/static/Hero-Animation-1.mp4",
    imageAlt: "SAP consulting and enterprise workflow animation",
    showOnHome: true,
  },
  {
    title: "SAP Support & AMS",
    description:
      "Stabilize, support, and continuously optimize SAP environments with dependable application management.",
    href: "/services/sap-support-ams",
    image: "/static/Hero-Animation-3.mp4",
    imageAlt: "SAP support and managed services animation",
    showOnHome: true,
  },
  {
    title: "SAP BTP Full Stack Applications",
    description:
      "Build portals, workflows, extensions, and integrations on SAP Business Technology Platform.",
    href: "/services/sap-btp-full-stack-applications",
    image: "/static/Hero-Animation-2.mp4",
    imageAlt: "SAP BTP application development animation",
    showOnHome: true,
  },
  {
    title: "SAP Data Integration & Migration",
    description:
      "Move, transform, and connect business data across SAP and non-SAP systems with reliable delivery.",
    href: "/services/sap-data-integration-migration",
    image: "/static/Hero-Animation-4.webm",
    imageAlt: "Data integration and migration animation",
    showOnHome: true,
  },
  {
    title: "SAP AI & Data Insight Services",
    description:
      "Use analytics, automation, and AI-assisted insight to turn enterprise data into better decisions.",
    href: "/services/sap-ai-data-insight-services",
    image: "/static/Hero-Animation-5.mp4",
    imageAlt: "AI and enterprise data insights animation",
    showOnHome: false,
  },
] satisfies ServiceItem[];


export const whyChooseUs = [
  {
    title: "Specialized SAP and Industry Expertise",
    description:
      "We combine business process knowledge with deep SAP capabilities across analytics, consolidation, planning, reporting, integration, and enterprise transformation. Every solution is designed to be practical, scalable, and tied to measurable business value.",
    image: "/static/Hero-Animation-1.mp4",
    imageAlt: "SAP expertise and enterprise transformation",
    showOnHome: true,
  },
  {
    title: "Global Experience, Local Commitment",
    description:
      "We support organizations across the US, Europe, the Middle East, and APAC with SAP and digital solutions adapted to regional business needs while staying aligned with global delivery standards and best practices.",
    image: "/static/Hero-Animation-3.mp4",
    imageAlt: "Global SAP delivery and regional business support",
    showOnHome: true,
  },
  {
    title: "Certified Talent, Quality-Driven Delivery",
    description:
      "Our SAP-certified professionals follow structured delivery practices with clear communication, transparent execution, and quality checkpoints that help every engagement move forward with confidence.",
    image: "/static/Hero-Animation-5.mp4",
    imageAlt: "Certified SAP talent and quality delivery",
    showOnHome: true,
  },
] satisfies WhyChooseUsItem[];

export type WhyChooseStatItem = {
  value: string;
  label: string;
  summary: string;
};

export const whyChooseStats = [
  {
    value: "9+",
    label: "Years in SAP implementation and support",
    summary:
      "Hands-on SAP delivery experience across implementation, stabilization, support, and continuous improvement.",
  },
  {
    value: "100+",
    label: "Projects delivered",
    summary:
      "Successful delivery across SAP consulting, data integration, reporting, analytics, and enterprise transformation programs.",
  },
  {
    value: "50+",
    label: "Clients served",
    summary:
      "Trusted by clients across regions and industries with practical, scalable, and business-focused SAP solutions.",
  },
  {
    value: "30+",
    label: "Years of founder industry experience",
    summary:
      "Leadership shaped by deep industry experience, delivery ownership, and long-term client success.",
  },
] satisfies WhyChooseStatItem[];

export type ProductItem = {
  title: string;
  description: string;
  href: string;
  image: string;
  imageAlt: string;
  showOnHome: boolean;
};

export const products = [
  {
    title: "E-invoicing Pro",
    description:
      "A secure and scalable e-invoicing solution that enables seamless compliance through direct integration with government portals. Built for SAP S/4HANA Public and Private Cloud, it reduces manual effort, minimizes errors, and provides real-time visibility into the invoicing process.",
    href: "/solutions/e-invoicing-pro",
    image: "/static/Hero-Animation-1.mp4",
    imageAlt: "E-invoicing compliance and SAP integration animation",
    showOnHome: true,
  },
  {
    title: "Profitability Pro",
    description:
      "An SAP BTP-based consolidation solution that automates legal and financial consolidation across entities and jurisdictions. It supports Multi-GAAP and IFRS requirements, accelerates financial close, and reduces dependency on spreadsheets through real-time dashboards.",
    href: "/solutions/profitability-pro",
    image: "/static/Hero-Animation-4.webm",
    imageAlt: "Profitability and financial consolidation dashboard animation",
    showOnHome: true,
  },
  {
    title: "Finlagoon Consolidation",
    description:
      "An SAP BTP-based consolidation solution that automates legal and financial consolidation across entities and jurisdictions. It supports Multi-GAAP and IFRS requirements, accelerates financial close, and reduces dependency on spreadsheets through real-time dashboards.",
    href: "/solutions/finlagoon-consolidation",
    image: "/static/Hero-Animation-2.mp4",
    imageAlt: "SAP BTP applications, portals, and workflows animation",
    showOnHome: true,
  },
] satisfies ProductItem[];

export type IndustryItem = {
  title: string;
  description: string;
  href: string;
  image: string;
  imageAlt: string;
  showOnHome: boolean;
};

export const industries = [
  {
    title: "Retail & Supply Chain",
    description:
      "Build connected, intelligent and resilient retail and supply chain operations using modern SAP solutions.",
    href: "/industries/retail-supply-chain",
    image: "/static/Retail_and_supply_chain_image.png",
    imageAlt: "Retail and supply chain operations and analytics",
    showOnHome: true,
  },
  {
    title: "Life Sciences & Pharma",
    description:
      "SAP-led planning, finance, supply chain, and analytics solutions for pharmaceutical teams that need accuracy and compliance.",
    href: "/industries/pharmaceuticals-life-sciences",
    image: "/static/cards/Pharma.webp",
    imageAlt: "Pharma and life sciences SAP analytics",
    showOnHome: true,
  },
  {
    title: "Manufacturing & Industrial",
    description:
      "Connected SAP solutions for production, procurement, inventory, reporting, and operational performance.",
    href: "/industries/manufacturing",
    image: "/static/cards/Manufacturing.webp",
    imageAlt: "Manufacturing and industrial operations",
    showOnHome: true,
  },
  {
    title: "Banking & Fintech",
    description:
      "Data-driven SAP and cloud solutions for finance platforms that need secure reporting and scalable operations.",
    href: "/industries/fintech",
    image: "/static/cards/FinTech.webp",
    imageAlt: "Banking and fintech data dashboard",
    showOnHome: true,
  },
  {
    title: "Oil & Gas",
    description:
      "Real-time asset telemetry, hydrocarbon accounting, emissions compliance, and joint venture analytics.",
    href: "/industries/oil-and-gas",
    image: "/static/Oil_and_Gas.jpg",
    imageAlt: "Oil and gas energy operations and pipeline telemetry",
    showOnHome: true,
  },
  {
    title: "Healthcare",
    description:
      "Clinical data analytics, hospital resource planning, and regulatory compliance powered by SAP.",
    href: "/industries/healthcare",
    image: "/static/Healthcare.jpg",
    imageAlt: "Healthcare analytics and clinical operations",
    showOnHome: true,
  },
  {
    title: "Telecom & Media",
    description:
      "Enterprise SAP, integration, and reporting solutions for telecom teams managing network infrastructure and subscribers.",
    href: "/industries/telecommunications",
    image: "/static/Telecommunication.jpg",
    imageAlt: "Telecommunication and media infrastructure systems",
    showOnHome: true,
  },
  {
    title: "Steel Manufacturing",
    description:
      "SAP solutions for complex steel operations, production planning, materials, financial control, and KPI monitoring.",
    href: "/industries/steel-manufacturing",
    image: "/static/Steel_Manufacturing.jpg",
    imageAlt: "Steel manufacturing and heavy industrial operations",
    showOnHome: true,
  },
] satisfies IndustryItem[];

export type TestimonialItem = {
  companyName: string;
  writerName: string;
  designation: string;
  testimonial: string;
  href?: string;
  image?: string;
  imageAlt?: string;
  showOnHome: boolean;
};

export const testimonials = [
  {
    companyName: "Large IT Company from Asia",
    writerName: "Large IT Company from Asia",
    designation: "Project Manager",
    testimonial:
      "We are pleased to present the SPOT AWARD in recognition of the excellent work by the Trijotech consultant. Your dedication, ownership, and willingness to take on additional responsibilities truly stood out. Your efforts in delivering the S/4HANA solution ensured a successful outcome and earned appreciation from the customer.",
    image: "",
    imageAlt: "",
    showOnHome: true,
  },
  {
    companyName: "Global Manufacturing Company, Asia",
    writerName: "Global Manufacturing Company, Asia",
    designation: "CTO",
    testimonial:
      "Compared to other partners we've worked with, Trijotech demonstrated dedication and expertise that set them apart. Their SAP consultants ensured seamless communication and proactive support. The automation of our material master data process exceeded expectations and significantly improved operational efficiency.",
    image: "",
    imageAlt: "",
    showOnHome: true,
  },
  {
    companyName: "Diligent Global",
    writerName: "Kalpesh Chavda",
    designation: "CEO",
    testimonial:
      "Trijotech has supported us with an excellent team for BPC implementation and has been prompt in delivery and response. Their consultants have strong capability around Legal & Management Consolidation and Data Analytics. I strongly recommend Trijotech for SAP BPC and Group Reporting implementation services.",
    image: "",
    imageAlt: "",
    showOnHome: true,
  },
  {
    companyName: "NEC",
    writerName: "Bharat Bhushan",
    designation: "Senior Manager",
    testimonial:
      "We're really happy with the way Trijotech has handled the SAP AMS project. The team has shown true ownership, worked with full dedication, and always responded quickly when needed. Thank you for the great support—keep it going!",
    image: "",
    imageAlt: "",
    showOnHome: true,
  },
  {
    companyName: "Verovis",
    writerName: "Guenteher",
    designation: "Verovis",
    testimonial:
      "We would like to thank Trijotech for their outstanding support in resolving the challenges we were facing with SAP BPC. Their team was prompt, supportive, and easy to work with throughout the process. Thanks to their efforts, things are now running smoothly.",
    image: "",
    imageAlt: "",
    showOnHome: true,
  },
  {
    companyName: "Valantic Group",
    writerName: "Matthias Weil",
    designation: "Executive Board Member",
    testimonial:
      "Trijotech has been our trusted partner for many years for all things SAP software. Their profound technical expertise has helped us elevate our game in BPC, Group Reporting, and SAP Analytics Cloud.",
    image: "",
    imageAlt: "",
    showOnHome: true,
  },
] satisfies TestimonialItem[];

export type FeaturedBlogItem = {
  title: string;
  description: string;
  date: string;
  href: string;
  image: string;
  imageAlt: string;
  showOnHome: boolean;
};

export const featuredBlogs = [
  {
    title: "E-Invoicing Pro: Simplifying Invoicing for Modern Businesses",
    description:
      "Simplify invoicing with SAP-integrated compliance, automation, and better visibility across the invoicing process.",
    date: "March 2024",
    href: "/blogs/e-invoicing-pro-simplifying-invoicing-for-modern-businesses",
    image: "/static/blogs/blog-1.png",
    imageAlt: "E-Invoicing Pro blog preview",
    showOnHome: true,
  },
  {
    title: "SAP Analytics Cloud for Annual Budgeting in Oil & Gas",
    description:
      "See how SAP Analytics Cloud supports data-driven planning, budgeting, and better business decisions in Oil and Gas.",
    date: "May 2024",
    href: "/blogs/sap-analytics-cloud-oil-gas-industry",
    image: "/static/blogs/blog-2.png",
    imageAlt: "SAP Analytics Cloud budgeting blog preview",
    showOnHome: true,
  },
  {
    title: "Key Preparations Before Starting Your Legal & Compliance Journey",
    description:
      "Understand the practical planning steps that help enterprises prepare for SAP-led legal, compliance, and reporting programs.",
    date: "December 2024",
    href: "/blogs/key-preparations-before-starting-your-legal-management-consolidation-projects",
    image: "/static/blogs/blog-3.png",
    imageAlt: "Legal and compliance preparation blog preview",
    showOnHome: true,
  },
  {
    title: "Starting a Data Analytics Project for Your Company",
    description:
      "A practical guide to beginning a data analytics initiative with clearer goals, stronger data foundations, and measurable outcomes.",
    date: "October 2024",
    href: "/blogs/starting-a-data-analytics-project-for-your-company-heres-what-you-need-to-know",
    image: "/static/blogs/blog-4.jpg",
    imageAlt: "Data analytics project blog preview",
    showOnHome: true,
  },
] satisfies FeaturedBlogItem[];

export type FeaturedVideoItem = {
  title: string;
  description: string;
  youtubeId: string;
  youtubeUrl: string;
  showOnHome: boolean;
};

export const featuredVideos = [
  {
    title: "Why Every Business Needs SAP Profitability",
    description:
      "A focused video on why profitability insight matters for modern business planning, control, and performance.",
    youtubeId: "c8MdA6ihDZw",
    youtubeUrl: "https://www.youtube.com/watch?v=c8MdA6ihDZw",
    showOnHome: true,
  },
  {
    title: "The Journey of SAP Analytics & Planning Made Simple",
    description:
      "A simple walkthrough of how SAP analytics and planning help organizations connect data with better decisions.",
    youtubeId: "mh4wKCYlFgI",
    youtubeUrl: "https://www.youtube.com/watch?v=mh4wKCYlFgI",
    showOnHome: true,
  },
  {
    title: "Maximizing ROI for Large Scale S/4HANA Transformation",
    description:
      "Practical points for improving value realization and reducing risk in enterprise S/4HANA transformation programs.",
    youtubeId: "7pszJqQBMAY",
    youtubeUrl: "https://www.youtube.com/watch?v=7pszJqQBMAY",
    showOnHome: true,
  },
  {
    title: "E-Invoicing Pro: Simplifying Compliance",
    description:
      "A product-focused video on streamlining e-invoicing compliance with SAP integration and automation.",
    youtubeId: "rg5odsXS1sM",
    youtubeUrl: "https://www.youtube.com/watch?v=rg5odsXS1sM",
    showOnHome: true,
  },
] satisfies FeaturedVideoItem[];

export const homeCta = {
  eyebrow: "Ready to Modernize?",
  title: "Let's build the SAP solution your business actually needs.",
  description:
    "Talk to Trijotech about SAP consulting, implementation, support, data integration, analytics, and enterprise application development.",
  primaryAction: {
    label: "Start a conversation",
    href: "/contact",
  },
  secondaryAction: {
    label: "Explore services",
    href: "/services",
  },
  highlights: [
    "SAP-certified delivery teams",
    "Enterprise-ready implementation support",
    "Practical solutions aligned with business outcomes",
  ],
} as const;
