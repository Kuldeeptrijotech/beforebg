export type SolutionFeature = {
  title: string;
  description: string;
};

export type SolutionSection = {
  title: string;
  description?: string;
  items: SolutionFeature[];
};

export type SolutionItem = {
  title: string;
  slug: string;
  href: string;
  description: string;
  image: string;
  imageAlt: string;
  showOnHome: boolean;
  highlights: string[];
  features: string[];
  subtitle: string;
  shortDescription: string;
  heroImage: string;
  cardImage: string;
  eyebrow: string;
  overviewTitle: string;
  overview: string;
  sections: SolutionSection[];
  benefits: string[];
  outcomesTitle: string;
  featureCards: SolutionFeature[];
};

export const solutions: SolutionItem[] = [
  {
    title: "E-Invoicing Pro",
    slug: "e-invoicing-pro",
    href: "/solutions/e-invoicing-pro",
    eyebrow: "E-INVOICING PRO",
    subtitle: "Simplify compliant invoicing from SAP to government portals.",
    description:
      "Keep up with government mandates and eliminate manual errors with our end-to-end e-invoicing solution. Whether you are on public or private cloud, E-Invoicing Pro ensures seamless compliance and real-time invoice tracking.",
    shortDescription:
      "E-Invoicing Pro simplifies compliant electronic invoicing with direct portal integration, automated processing and real-time invoice tracking across SAP environments.",
    image: "/static/Hero-Animation-1.gif",
    imageAlt: "E-invoicing compliance and SAP integration",
    heroImage: "/assets/heroes/products-blue.png",
    cardImage: "/assets/heroes/e-invoicing-generated-v2.png",
    showOnHome: true,
    overviewTitle: "Overview",
    overview:
      "E-Invoicing Pro enables seamless compliance through direct integration with government portals, reducing manual effort and errors. Compatible with SAP S/4HANA Public and Private Cloud, the solution is secure, scalable, and built on SAP standards. Real-time tracking ensures full visibility into the invoicing process — from submission through approval.",
    highlights: [
      "Direct government portal integration for compliant invoicing.",
      "SAP S/4HANA-ready automated invoice processing.",
      "Real-time status tracking, approvals, and audit history.",
    ],
    features: [
      "Automated invoice validation and submission.",
      "Support for both public and private cloud SAP landscapes.",
      "Compliance workflows tailored to local regulations.",
      "Dashboard visibility for approvals, exceptions, and settlement status.",
    ],
    featureCards: [
      { title: "SAP S/4HANA Integration", description: "Hassle-free deployment across public and private cloud." },
      { title: "Government Portal Integration", description: "Send invoices for approval directly to mandated portals." },
      { title: "Real-Time Tracking", description: "Full visibility into invoice status from submit to approval." },
      { title: "Regulatory Compliance", description: "Stay aligned with evolving e-invoicing tax regulations." },
    ],
    sections: [
      {
        title: "Why Choose E-Invoicing Pro",
        description:
          "A purpose-built invoicing layer that removes licensing friction, hidden cost and manual hand-offs — while staying native to SAP.",
        items: [
          { title: "Eliminate Expensive Licensing Fees", description: "Reduce costs significantly compared with traditional licensed e-invoicing add-ons." },
          { title: "Seamless SAP S/4HANA Integration", description: "Hassle-free deployment on S/4HANA Public and Private Cloud, built on SAP standards." },
          { title: "Automated End-to-End Workflow", description: "From invoice submission to approval tracking, without spreadsheet workarounds." },
          { title: "No Hidden Costs", description: "High ROI with complete commercial transparency across the invoicing lifecycle." },
          { title: "User-Centric Design", description: "Minimal training required for quick adoption by finance and AP teams." },
        ],
      },
      {
        title: "Key Capabilities",
        description: "Everything required to run compliant electronic invoicing at enterprise scale.",
        items: [
          { title: "SAP S/4HANA Integration", description: "Native fit for S/4HANA public and private cloud, with secure, scalable SAP-standard architecture." },
          { title: "Automated Workflow", description: "End-to-end automation from invoice creation and submission through approval tracking." },
          { title: "Government Portal Integration", description: "Direct portal connectivity so invoices can be sent for approval without manual re-keying." },
          { title: "Real-Time Approval & Tracking", description: "Instant status updates give finance teams live visibility into every invoice." },
          { title: "Mass Invoice Processing", description: "Process, print or email invoices in bulk to keep high-volume operations moving." },
          { title: "Regulatory Compliance", description: "Stay compliant with evolving government e-invoicing and tax regulations." },
        ],
      },
    ],
    benefits: [
      "Reduced manual processing across the invoice lifecycle",
      "Fewer invoicing errors and less rework",
      "Better compliance with government mandates",
      "Faster invoice visibility and approval tracking",
      "Simplified SAP S/4HANA integration on public and private cloud",
    ],
    outcomesTitle: "Business Outcomes",
  },
  {
    title: "Finlagoon Consolidation",
    slug: "finlagoon-consolidation",
    href: "/solutions/finlagoon-consolidation",
    eyebrow: "FINLAGOON CONSOLIDATION",
    subtitle: "Modern financial consolidation built for finance teams.",
    description:
      "Managing financial consolidation across multiple entities is complex, but it does not have to be. Finlagoon Consolidation is a single, intelligent platform built to streamline your financial close and reporting cycles. With robust automation, smart currency handling and fully customizable reports, it brings speed, accuracy and control to finance leaders handling multi-entity structures.",
    shortDescription:
      "Finlagoon Consolidation brings financial close, consolidation, currency translation, reporting and governance into one intelligent platform for multi-entity organizations.",
    image: "/static/Software_Animation_1.gif",
    imageAlt: "Financial consolidation and group reporting",
    heroImage: "/assets/heroes/industry-blue.png",
    cardImage: "/static/Software_Animation_1.gif",
    showOnHome: true,
    overviewTitle: "Overview",
    overview:
      "Finlagoon Consolidation automates legal and financial consolidations across entities and jurisdictions, reducing manual work and ensuring accuracy. Built on SAP BTP with Work Zone integration, the solution supports Multi-GAAP and IFRS compliance. Real-time dashboards offer a unified view, helping speed up financial close and eliminate reliance on spreadsheets.",
    highlights: [
      "Automated legal and management consolidation across entities.",
      "Multi-GAAP, IFRS, and multi-currency close support.",
      "Clear group reporting with elimination and reconciliation workflows.",
    ],
    features: [
      "Unified consolidation process for subsidiaries and jurisdictions.",
      "Robust audit trails and role-based access control.",
      "Smart currency conversion and reporting in local and group currencies.",
      "Close-ready dashboards that reduce reliance on spreadsheets.",
    ],
    featureCards: [
      { title: "Multi-Entity Close", description: "Automate legal and management consolidation across the group." },
      { title: "Smart Currency Conversion", description: "Apply exchange rates and report in base and converted currencies." },
      { title: "Customizable Reporting", description: "Align layouts, filters and KPIs to how finance actually works." },
      { title: "Governance & Audit", description: "Full audit trails with role-based access for compliant close." },
    ],
    sections: [
      {
        title: "Core Consolidation Capabilities",
        description: "A single platform for multi-entity close — replacing spreadsheet consolidation with controlled, automated workflows.",
        items: [
          { title: "Automated Reporting for Fast, Error-Free Closings", description: "Reduce manual effort and close faster with automated reporting workflows across entities and jurisdictions." },
          { title: "Multi-Currency Support & Smart Currency Conversion", description: "Handle multiple currencies with built-in exchange-rate application and reports in both base and converted currencies." },
          { title: "Multi-GAAP and IFRS Support", description: "Run legal and management consolidation with Multi-GAAP and IFRS compliance on SAP BTP." },
        ],
      },
      {
        title: "Reporting & Analytics",
        description: "Give finance leaders reports they can shape — and history they can trust.",
        items: [
          { title: "Customizable Reporting Aligned to Business KPIs", description: "Tailor reports to internal metrics — adjust layouts, apply filters and select the key data fields that matter." },
          { title: "Customizable Reports", description: "Design reports your way and choose relevant fields so every close pack fits the business." },
          { title: "Historical Comparison", description: "Track performance over time with built-in period comparisons for strategic insight." },
          { title: "Export & Integration", description: "Export in Excel or PDF and integrate with BI tools for broader analysis and sharing." },
        ],
      },
      {
        title: "Governance & Control",
        description: "Close with confidence. Every change is traceable, and every role sees only what it should.",
        items: [
          { title: "Full Audit Trails", description: "Ensure secure, compliant operations with detailed audit trails across consolidation activities." },
          { title: "Role-Based Access Control", description: "Customizable access roles keep sensitive group data governed across entities and teams." },
          { title: "Real-Time Group Dashboards", description: "A unified view of the close replaces spreadsheet version chaos with one source of truth." },
        ],
      },
    ],
    benefits: [
      "Faster, more reliable financial close across complex group structures",
      "Less manual consolidation and spreadsheet risk",
      "Accurate multi-currency and multi-GAAP reporting",
      "Stronger auditability and role-based control",
      "Unified real-time visibility for finance leadership",
    ],
    outcomesTitle: "Business Outcomes",
  },
  {
    title: "Profitability Pro",
    slug: "profitability-pro",
    href: "/solutions/profitability-pro",
    eyebrow: "PROFITABILITY PRO",
    subtitle: "Understand where your business truly makes money.",
    description:
      "With Profitability Pro, you get real-time visibility into what is driving profits — and what is not. Automatically allocate expenses, assess margins and make data-backed decisions to improve financial performance at every level.",
    shortDescription:
      "Profitability Pro delivers real-time product and customer profitability insights by automating allocations, margin analysis and cost-driver mapping.",
    image: "/static/Hero-Animation-4.gif",
    imageAlt: "Profitability and financial performance",
    heroImage: "/assets/image/Product_4.png",
    cardImage: "/assets/image/L0505.png",
    showOnHome: true,
    overviewTitle: "Overview",
    overview:
      "Profitability Pro provides real-time profitability insights at both product and customer levels. By automating allocations for COGS, Net Sales and Gross Sales, reporting becomes faster and more accurate. Dynamic driver mapping ensures precise cost distribution, helping businesses improve margin control and act early on underperforming areas.",
    highlights: [
      "Real-time profitability visibility by customer, product, and segment.",
      "Automated cost allocation based on configurable drivers.",
      "Actionable margin insight for faster decision-making.",
    ],
    features: [
      "Driver-based expense and revenue allocation.",
      "Scenario-ready profit analysis for business segments.",
      "Interactive reporting that highlights unprofitable areas.",
      "Integration-ready design for SAP finance and analytics landscapes.",
    ],
    featureCards: [
      { title: "Product Profitability", description: "See which products truly contribute to margin." },
      { title: "Customer Profitability", description: "Understand profit by customer, not just by revenue." },
      { title: "Automated Allocations", description: "Allocate COGS, Net Sales and Gross Sales without manual models." },
      { title: "Dynamic Driver Mapping", description: "Distribute cost with drivers that reflect how the business runs." },
    ],
    sections: [
      {
        title: "Profitability Analysis",
        description: "Move from revenue reporting to true economic insight at the level finance and commercial teams need.",
        items: [
          { title: "Product Profitability", description: "Measure contribution at product level so portfolio decisions are based on margin, not just top-line sales." },
          { title: "Customer Profitability", description: "See which customers create value after allocations — and which relationships erode margin." },
        ],
      },
      {
        title: "Automated Allocations",
        description: "Replace fragile spreadsheet allocations with controlled, repeatable rules.",
        items: [
          { title: "Automated COGS Allocation", description: "Allocate cost of goods sold consistently so product and customer P&Ls stay comparable." },
          { title: "Net & Gross Sales Allocation", description: "Automate allocation of Net Sales, Gross Sales and related items for faster, more accurate reporting." },
        ],
      },
      {
        title: "Margin Intelligence",
        description: "Give leadership a live view of what is expanding — or compressing — margin.",
        items: [
          { title: "Real-Time Margin Insights", description: "Real-time P&L visibility for strategic clarity across products, customers and segments." },
          { title: "Customizable Profitability Reports", description: "Design reports your way — adjust layouts, apply filters and choose the fields that fit the decision." },
        ],
      },
      {
        title: "Driver-Based Cost Distribution",
        description: "Cost should follow activity. Driver mapping keeps allocations explainable and actionable.",
        items: [
          { title: "Dynamic Driver Mapping", description: "Dynamic driver-based cost allocations keep distribution precise as volumes and structures change." },
          { title: "Underperforming Segment Control", description: "Identify and control unprofitable segments proactively, before they dilute group performance." },
        ],
      },
    ],
    benefits: [
      "Real-time product and customer profitability visibility",
      "Faster, more accurate allocations for COGS, Net Sales and Gross Sales",
      "Clearer margin intelligence for pricing and portfolio decisions",
      "Driver-based cost distribution that finance can explain",
      "Earlier action on underperforming products, customers and segments",
    ],
    outcomesTitle: "Business Outcomes",
  },
];

export function getSolutionBySlug(slug: string) {
  const normalized = slug === "einvoicing-pro" ? "e-invoicing-pro" : slug;
  return solutions.find((solution) => solution.slug === normalized) ?? null;
}

export function getOtherSolutions(slug: string) {
  const normalized = slug === "einvoicing-pro" ? "e-invoicing-pro" : slug;
  return solutions.filter((solution) => solution.slug !== normalized);
}

export function getAllSolutionSlugs() {
  return solutions.map((solution) => solution.slug);
}
