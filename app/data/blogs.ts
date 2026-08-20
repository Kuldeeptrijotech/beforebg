const blogImage = (fileName: string) => `/assets/image/${fileName}`;

export interface Blog {
  title: string;
  description: string;
  image: string;
  link: string;
  date: string;
}

export type BlogPost = {
  id: string;
  title: string;
  slug: string;
  shortDescription: string;
  content: string;
  contentImages: Array<{ id: string; src: string; alt: string; caption: string }>;
  contentBlocks: Array<{
    id: string;
    type: "heading" | "subheading" | "content" | "image" | "quote" | "bulletList" | "numberedList" | "callout" | "divider" | "link";
    value: string;
    imageSrc: string;
    imageAlt: string;
    caption: string;
    linkUrl: string;
    headingLevel?: 1 | 2 | 3 | 4 | 5 | 6;
    style: {
      textAlign?: "left" | "center" | "right" | "justify";
      fontSize?: "small" | "medium" | "large" | "xlarge" | "huge";
      textColor?: string;
      backgroundColor?: string;
      backgroundGradient?: string;
      spacing?: "none" | "compact" | "normal" | "spacious" | "custom";
      customMarginTop?: string;
      customMarginBottom?: string;
      imageWidth?: "25" | "33" | "50" | "66" | "75" | "100";
      imageAlign?: "left" | "center" | "right";
      borderRadius?: "0" | "8" | "16" | "24" | "32" | "full";
      fontWeight?: "300" | "400" | "500" | "600" | "700" | "800" | "900";
      fontFamily?: "sans" | "serif" | "mono" | "display";
      fontStyle?: "normal" | "italic";
      textDecoration?: "none" | "underline" | "line-through";
      lineHeight?: "tight" | "compact" | "normal" | "relaxed" | "loose";
      letterSpacing?: "tighter" | "tight" | "normal" | "wide" | "wider";
      textTransform?: "none" | "uppercase" | "lowercase" | "capitalize";
      padding?: "0" | "8" | "12" | "16" | "20" | "24" | "32" | "40";
      blockRadius?: "0" | "8" | "12" | "16" | "20" | "24" | "32" | "999";
      borderStyle?: "none" | "solid" | "dashed" | "dotted" | "double";
      borderWidth?: "0" | "1" | "2" | "3" | "4";
      borderColor?: string;
      boxShadow?: "none" | "soft" | "medium" | "glow-green" | "glow-amber" | "glow-cyan" | "deep";
      opacity?: "100" | "90" | "80" | "70" | "50";
      imageMaxHeight?: "200" | "320" | "480" | "640" | "800" | "auto";
      imageObjectFit?: "contain" | "cover";
      imageShadow?: "none" | "soft" | "strong" | "glow-green" | "glow-amber";
      customCss?: string;
    };
  }>;
  featuredImage: string;
  featuredImageStyle: {
    width: "50" | "75" | "100";
    align: "left" | "center" | "right";
    maxHeight: "320" | "480" | "640" | "auto";
    objectFit: "contain" | "cover";
    borderRadius: "0" | "8" | "16" | "24";
  };
  imageAlt: string;
  author: string;
  category: string;
  tags: string[];
  publishedAt: string | null;
  updatedAt: string;
  status: "draft" | "published";
  seoTitle: string;
  seoDescription: string;
};

export const blogs: Blog[] = [
  {
    title: "E-Invoicing Pro: Simplifying Invoicing for Modern Businesses",
    description: "Simplify your invoicing processes with SAP-integrated solutions ensuring compliance and efficiency.",
    image: blogImage("Blog 1.png"),
    link: "/blogs/e-invoicing-pro-simplifying-invoicing-for-modern-businesses",
    date: "March 2024"
  },
  {
    title: "SAP Analytics Cloud for Annual Budgeting in Oil & Gas",
    description: "Learn how SAP Analytics Cloud is reshaping business decision-making with data-driven insights.",
    image: blogImage("Blog 2.png"),
    link: "/blogs/sap-analytics-cloud-oil-gas-industry",
    date: "May 2024"
  },
  {
    title: "Key Preparations Before Starting Your Legal & Management Consolidation Projects",
    description: "Unlock the full potential of S/4HANA with strategies to maximize ROI in digital transformations.",
    image: blogImage("Blog 3.png"),
    link: "/blogs/key-preparations-before-starting-your-legal-management-consolidation-projects",
    date: "December 2024"
  },
  {
    title: "Starting a Data Analytics Project for Your Company? Here's What You Need to Know",
    description: "Discover the essential steps to kickstart a successful data analytics project and drive business growth.",
    image: blogImage("Blog 4.jpg"),
    link: "/blogs/starting-a-data-analytics-project-for-your-company-heres-what-you-need-to-know",
    date: "October 2024"
  },
  {
    title: "Unveiling the Secrets: Navigating Data Analytics Challenges in a Global FMCG Company's Transformation",
    description: "Gain insights into overcoming common challenges in SAP data analytics to streamline your operations.",
    image: blogImage("Blog 5.jpg"),
    link: "/blogs/unveiling-the-secrets-navigating-data-analytics-challenges",
    date: "July 2024"
  },
  {
    title: "SAP BTP (Business Technology Platform) – Overview",
    description: "Get a comprehensive overview of SAP's Business Technology Platform and its transformative capabilities.",
    image: blogImage("Blog 6.jpg"),
    link: "/blogs/sap-btp-overview",
    date: "June 2024"
  },
  {
    title: "SAP BTP: Unleashing the Power of Innovation For Pragmatic Business Growth",
    description: "Explore how SAP BTP empowers businesses to innovate and adapt in today's dynamic market.",
    image: blogImage("Blog 7.png"),
    link: "/blogs/sap-btp-unleashing-the-power-of-innovation-for-pragmatic-business-growth",
    date: "May 2024"
  },
  {
    title: "Integration Strategies with SAP BTP",
    description: "Master effective integration strategies using SAP BTP to connect your systems and data seamlessly.",
    image: blogImage("Blog 8.jpg"),
    link: "/blogs/integration-strategies-with-sap-btp",
    date: "March 2024"
  },
  {
    title: "Leverage SAP BTP Cloud: Transition your Data Migration/ Integration Solutions from SAP PI/PO to SAP CPI",
    description: "Learn how SAP BTP Cloud Integration simplifies and secures your data migration projects.",
    image: blogImage("Blog 9.jpg"),
    link: "/blogs/leverage-sap-btp-cloud-transition-your-data-migration-integration-solutions-from-sap-pi-po-to-sap-cpi",
    date: "February 2024"
  },
  {
    title: "How to maximize the business potential with SAP BTP",
    description: "Explore proven methods to leverage SAP solutions and unlock your business's maximum potential.",
    image: blogImage("Blog 10.png"),
    link: "/blogs/how-to-maximize-the-business-potential-with-sap-btp",
    date: "January 2024"
  },
  {
    title: "SAP SAC: Unlocking the Power of Data Connection And Data Sources",
    description: "See how SAP SAC connects your data sources to provide a unified view for better decision-making.",
    image: blogImage("Blog 11.jpg"),
    link: "/blogs/sap-sac-unlocking-the-power-of-data-connection-and-data-sources",
    date: "December 2023"
  },
  {
    title: "SAP BW Bridge in SAP Datasphere – Unlock the business potential",
    description: "Discover how SAP BW Bridge in Datasphere helps you unlock valuable insights from your data warehouse.",
    image: blogImage("Blog 12.jpg"),
    link: "/blogs/sap-bw-bridge-in-sap-datasphere-unlock-the-business-potential",
    date: "November 2023"
  },
  {
    title: "SAP GRDC – Leverage GRDC to derive Partner Units and Segment through Data Mappings",
    description: "Learn how to use SAP GRDC to enhance your group reporting and consolidation practices.",
    image: blogImage("Blog 13.jpg"),
    link: "/blogs/sap-grdc-leverage-grdc-to-derive-partner-units-and-segment-through-data-mappings",
    date: "October 2023"
  },
  {
    title: "Join the (R)Evolution to Future-Proof Your Business with SAP S/4HANA",
    description: "Understand the benefits of the RISE with SAP program and how it can future-proof your enterprise.",
    image: blogImage("Blog 14.jpg"),
    link: "/blogs/join-the-revolution-to-future-proof-your-business-with-sap-s-4hana",
    date: "October 2023"
  },
  {
    title: "SAP S/4HANA Group Reporting Data Collection for Capturing Non-Financial Data & Disclosures",
    description: "Explore the data collection process for consolidation within SAP S/4HANA Group Reporting.",
    image: blogImage("Blog 15.jpg"),
    link: "/blogs/sap-s-4-hana-group-reporting-data-collection-for-capturing-non-financial-data-disclosures",
    date: "October 2023"
  },
  {
    title: "S/4HANA Group Reporting – Automate Legal Consolidation, Financial Reporting, and Monthly & Annual Financial Close Process",
    description: "Learn how to achieve automated legal consolidation with SAP S/4HANA Group Reporting.",
    image: blogImage("Blog 16.jpg"),
    link: "/blogs/s-4-hana-group-reporting-automate-legal-consolidation-financial-reporting-and-monthly-annual-financial-close-process",
    date: "May 2023"
  },
  {
    title: "SAP S/4HANA Group Reporting : Overview",
    description: "Get a complete overview of SAP S/4HANA Group Reporting and its key functionalities.",
    image: blogImage("Blog 17.jpg"),
    link: "/blogs/sap-s-4-hana-group-reporting-overview",
    date: "October 2023"
  },
  {
    title: "SAP PaPM ( Profitability and Performance Management) – Recommendation Rule in Machine Learning Function",
    description: "Understand the core concepts of SAP PaPM and how it drives better profitability analysis.",
    image: blogImage("Blog 18.jpg"),
    link: "/blogs/sap-profitability-and-performance-management-papm-recommendation-rule-in-machine-learning-function",
    date: "May 2023"
  },
  {
    title: "SAP PaPM – Simplifying Signature Tab",
    description: "See how SAP PaPM simplifies complex financial processes to deliver meaningful results.",
    image: blogImage("Blog 19.jpg"),
    link: "/blogs/sap-papm-simplifying-signature-tab",
    date: "February 2023"
  },
  {
    title: "SAP PaPM(Profitability and Performance Management) – Overview of PaPM, NODE and Environment Creation Part-1",
    description: "An in-depth look at the capabilities and benefits of SAP PaPM for managing profitability and performance.",
    image: blogImage("Blog 20.jpg"),
    link: "/blogs/sap-profitability-and-performance-management-papm-overview-of-papm-node-and-environment-creation-part-1",
    date: "January 2023"
  },
  {
    title: "SAP SAC Integration with SAP BW/4HANA",
    description: "Discover how to integrate SAP SAC with SAP S/4HANA for enhanced data analysis and business insights.",
    image: blogImage("Blog 21.jpg"),
    link: "/blogs/sap-sac-integration-with-sap-bw-4hana",
    date: "December 2022"
  },
  {
    title: "SAP Analytics Cloud: Predictive Analysis via inbuilt Machine Learning",
    description: "Harness the power of machine learning in SAP Analytics Cloud for advanced predictive analysis.",
    image: blogImage("Blog 22.jpg"),
    link: "/blogs/sap-analytics-cloud-predictive-analysis-via-inbuilt-machine-learning",
    date: "December 2022"
  },
  {
    title: "SAP CPI – Turbocharge your Integration solutions",
    description: "Find out how SAP CPI can boost the performance and efficiency of your integration solutions.",
    image: blogImage("Blog 23.jpg"),
    link: "/blogs/sap-cpi-turbocharge-your-integration-solutions",
    date: "November 2022"
  },
  {
    title: "SAP BW Automation: Maximizing Efficiency through Automated Process",
    description: "Discover how SAP BW Automation can help you maximize efficiency and streamline your data processes.",
    image: blogImage("Blog 24.jpg"),
    link: "/blogs/unlocking-the-power-of-sap-bw-authorization-maximizing-efficiency-through-automated-processes",
    date: "July 2022"
  },
  {
    title: "SAP Analytics Cloud (SAC) – Healthcare Analytics",
    description: "Introduction: In the context of SAP Analytics Cloud healthcare, due…",
    image: blogImage("Blog 25.jpg"),
    link: "/blogs/sap-analytics-cloud-sac-healthcare-analytics",
    date: "July 2022"
  },
  {
    title: "SAP Analytics Cloud (SAC) – Unified Story Features",
    description: "Introduction: The Optimized Story Experience from Unified Story in SAP…",
    image: blogImage("Blog 26.jpg"),
    link: "/blogs/sap-analytics-cloud-sac-unified-story-features",
    date: "July 2022"
  },
  {
    title: "SAP Analytics cloud (SAC) – Custom Widgets (Part I)",
    description: "Introduction: In today's rapidly evolving digital landscape, businesses require access….",
    image: blogImage("Blog 27.jpg"),
    link: "/blogs/sap-analytics-cloud-sac-custom-widgets-part-1",
    date: "July 2022"
  },
  {
    title: "SAP Analytics Cloud (SAC)- How to set up a landing page for the SAC dashboard",
    description: "Introduction: SAP Analytics Cloud is a powerful tool that enables…",
    image: blogImage("Blog 28.jpg"),
    link: "/blogs/sap-analytics-cloud-sac-how-to-set-up-a-landing-page-for-the-sac-dashboard",
    date: "July 2022"
  },
  {
    title: "SAP Analytics Cloud (SAC) – Overview",
    description: "Introduction:  In today's data-driven world, businesses are constantly seeking ways….",
    image: blogImage("Blog 29.jpg"),
    link: "/blogs/sap-analytics-cloud-sac-overview",
    date: "July 2022"
  },
  {
    title: "SAP Analytics Cloud – Implementing SAC for Retail Industry",
    description: "Introduction Gathering from the years of experience of our expert…",
    image: blogImage("Blog 30.jpg"),
    link: "/blogs/sap-analytics-cloud-implementing-sac-for-retail-industry",
    date: "July 2022"
  },
  {
    title: "Public vs Private Cloud – choosing right strategy as per your need",
    description: "Introduction In today's rapidly evolving business landscape, harnessing the power…",
    image: blogImage("Blog 31.jpg"),
    link: "/blogs/public-vs-private-cloud-choosing-right-strategy-as-per-your-need",
    date: "July 2022"
  },
  {
    title: "Consolidation: what is the difference between Legal & Management Consolidation – Part II?",
    description: "Legal Consolidation One of our Textiles Client and  wanted to…",
    image: blogImage("Blog 32.jpg"),
    link: "/blogs/consolidation-what-is-the-difference-between-legal-management-consolidation-part-ii",
    date: "July 2022"
  },
  {
    title: "Comparison of Consolidation Tools from SAP – Part I",
    description: "Introduction SAP Customers always inquire about which SAP Consolidation Tool…",
    image: blogImage("Blog 33.jpg"),
    link: "/blogs/comparison-of-consolidation-tools-from-sap-part-i",
    date: "July 2022"
  }
];

export function legacyBlogPosts(): BlogPost[] {
  return blogs.map((blog, index) => {
    const slug = blog.link.replace(/^\/blogs\//, "");
    const parsedDate = new Date(`1 ${blog.date.replace(/[^a-zA-Z0-9 ]/g, "")}`);
    const publishedAt = Number.isNaN(parsedDate.getTime()) ? null : parsedDate.toISOString();
    return {
      id: `legacy-${index + 1}`,
      title: blog.title,
      slug,
      shortDescription: blog.description,
      content: "",
      contentImages: [],
      contentBlocks: [],
      featuredImage: blog.image,
      featuredImageStyle: { width: "100", align: "center", maxHeight: "640", objectFit: "contain", borderRadius: "16" },
      imageAlt: blog.title,
      author: "Trijotech",
      category: "SAP Insights",
      tags: [],
      publishedAt,
      updatedAt: publishedAt || new Date(0).toISOString(),
      status: "published",
      seoTitle: blog.title,
      seoDescription: blog.description,
    };
  });
}
