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
};

export const solutions: SolutionItem[] = [
  {
    title: "E-invoicing Pro",
    slug: "einvoicing-pro",
    href: "/solutions/einvoicing-pro",
    description:
      "Automate invoice generation, validation, submission, and tracking with SAP-integrated compliance workflows built for modern enterprise finance teams.",
    image: "/static/Hero-Animation-1.gif",
    imageAlt: "E-invoicing compliance and SAP integration animation",
    showOnHome: true,
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
  },
  {
    title: "Finlagoon Consolidation",
    slug: "finlagoon-consolidation",
    href: "/solutions/finlagoon-consolidation",
    description:
      "Speed up group close cycles with an automated consolidation solution that supports multi-entity reporting, currency conversion, and IFRS-compliant financial alignment.",
    image: "/static/Software_Animation_1.gif",
    imageAlt: "Financial consolidation and group reporting animation",
    showOnHome: true,
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
  },
  {
    title: "Profitability Pro",
    slug: "profitability-pro",
    href: "/solutions/profitability-pro",
    description:
      "Gain timely profitability insight across products, customers, and business units with allocation automation and driver-based margin analytics.",
    image: "/static/Hero-Animation-4.gif",
    imageAlt: "Profitability and financial performance animation",
    showOnHome: true,
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
  },
];

export function getSolutionBySlug(slug: string) {
  return solutions.find((solution) => solution.slug === slug) ?? null;
}
