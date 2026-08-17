export type Industry = {
  slug: string;
  title: string;
  subtitle: string;
  shortDescription: string;
  description: string;
  heroImage: string;
  services: string[];
  benefits: string[];
};

export const industries: Industry[] = [
  {
    slug: "retail-supply-chain",
    title: "Retail & Supply Chain",
    subtitle: "Transforming retail and supply chain operations",
    shortDescription:
      "Build connected, intelligent and resilient retail and supply chain operations using modern SAP solutions.",
    description:
      "Trijotech helps retail and supply chain organizations improve planning, inventory visibility, forecasting and operational performance. We connect business and financial data to enable faster and more informed decision-making.",
    heroImage: "/static/Retail_and_supply_chain_image.png",

    services: [
      "Supply Chain Planning",
      "Inventory Optimization",
      "Demand Forecasting",
      "SAP Analytics",
      "Business Process Automation",
      "Real-Time Reporting",
    ],

    benefits: [
      "Better inventory visibility",
      "Improved demand forecasting",
      "Reduced operational inefficiencies",
      "Faster business decisions",
    ],
  },

  {
    slug: "pharmaceuticals-life-sciences",
    title: "Pharmaceuticals & Life Sciences",
    subtitle: "Digital transformation for life sciences",
    shortDescription:
      "Improve financial planning, analytics and operational efficiency for pharmaceutical and life sciences organizations.",
    description:
      "We help pharmaceutical organizations connect finance, sales and supply chain information using SAP technologies. Our solutions improve planning, forecasting, reporting accuracy and overall business agility.",
    heroImage: "/static/Pharma.jpg",

    services: [
      "SAP Analytics Cloud",
      "Financial Planning",
      "Budgeting & Forecasting",
      "Supply Chain Analytics",
      "Data Integration",
      "Management Reporting",
    ],

    benefits: [
      "Improved financial forecasting",
      "Integrated business information",
      "Better reporting accuracy",
      "Faster planning cycles",
    ],
  },

  {
    slug: "manufacturing",
    title: "Manufacturing",
    subtitle: "Smarter manufacturing through connected data",
    shortDescription:
      "Transform manufacturing finance and operations through automation, analytics and SAP technologies.",
    description:
      "Trijotech enables manufacturing organizations to connect financial and operational information, automate reconciliation and improve management reporting. SAP technologies provide greater transparency and help organizations make faster decisions.",
    heroImage: "/static/Manufacturing.jpg",

    services: [
      "SAP S/4HANA",
      "Group Reporting",
      "Intercompany Reconciliation",
      "Management Consolidation",
      "Performance Analytics",
      "Process Automation",
    ],

    benefits: [
      "Faster financial close",
      "Improved reporting accuracy",
      "Greater financial transparency",
      "Better operational visibility",
    ],
  },

  {
    slug: "fintech",
    title: "Fintech",
    subtitle: "Modern technology for financial businesses",
    shortDescription:
      "Build agile and scalable financial processes using SAP BTP, analytics and automation.",
    description:
      "We help fintech organizations automate workflows, integrate enterprise systems and improve financial reporting. Our SAP-based solutions provide secure, scalable and intelligent business processes.",
    heroImage: "/static/FinTech.jpg",

    services: [
      "SAP BTP",
      "Workflow Automation",
      "SAP Integration",
      "Financial Analytics",
      "Role-Based Security",
      "Cloud Applications",
    ],

    benefits: [
      "Automated business processes",
      "Improved system integration",
      "Better security",
      "Faster operations",
    ],
  },

  {
    slug: "entertainment",
    title: "Entertainment",
    subtitle: "Financial transformation for entertainment businesses",
    shortDescription:
      "Improve planning, reporting and collaboration across entertainment organizations.",
    description:
      "Trijotech helps entertainment companies improve financial planning and analysis through SAP solutions. Integrated reporting and customized planning models allow departments to collaborate more efficiently.",
    heroImage: "/static/Entertainment.jpg",

    services: [
      "SAP BPC",
      "Financial Planning",
      "Budgeting",
      "Management Reporting",
      "Analytics",
      "System Integration",
    ],

    benefits: [
      "Better financial planning",
      "Improved collaboration",
      "Accurate reporting",
      "Higher productivity",
    ],
  },

  {
    slug: "steel-manufacturing",
    title: "Steel Manufacturing",
    subtitle: "Data-driven performance for steel manufacturers",
    shortDescription:
      "Use analytics and SAP technologies to improve production, financial performance and operational visibility.",
    description:
      "We help steel manufacturers use SAP analytics and business intelligence to monitor critical KPIs, improve production efficiency and optimize financial performance.",
    heroImage: "/static/Steel_Manufacturing.jpg",

    services: [
      "SAP BW",
      "Business Intelligence",
      "Production Analytics",
      "Financial Reporting",
      "KPI Monitoring",
      "Performance Management",
    ],

    benefits: [
      "Real-time KPI visibility",
      "Improved production efficiency",
      "Better cash flow visibility",
      "Improved on-time delivery",
    ],
  },

  {
    slug: "telecommunications",
    title: "Telecommunications",
    subtitle: "Connected and intelligent telecom operations",
    shortDescription:
      "Improve telecom financial processes, reporting and operational performance using SAP.",
    description:
      "Trijotech helps telecommunications organizations streamline workflows, financial reporting and enterprise integration. SAP technologies improve process efficiency and provide greater visibility across departments.",
    heroImage: "/static/Telecommunication.jpg",

    services: [
      "SAP Group Reporting",
      "SAP BTP",
      "Workflow Management",
      "Enterprise Integration",
      "Financial Consolidation",
      "Business Analytics",
    ],

    benefits: [
      "Improved process automation",
      "Better financial reporting",
      "Enhanced collaboration",
      "Greater operational visibility",
    ],
  },
];

const SLUG_ALIASES: Record<string, string> = {
  pharma: "pharmaceuticals-life-sciences",
  telecommunication: "telecommunications",
  steel: "steel-manufacturing",
  retail: "retail-supply-chain",
  "supply-chain": "retail-supply-chain",
};

export function getIndustry(slug: string) {
  const canonical = SLUG_ALIASES[slug] || slug;
  return industries.find((industry) => industry.slug === canonical);
}

