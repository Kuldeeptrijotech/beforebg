import PlaceholderPage from "@/components/common/PlaceholderPage";

const products: Record<string, { title: string; description: string }> = {
  "einvoicing-pro": {
    title: "E-invoicing Pro",
    description: "Automate invoice generation, validation, submission, and tracking with an SAP-integrated compliance workflow.",
  },
  "finlagoon-consolidation": {
    title: "Finlagoon Consolidation",
    description: "Simplify financial consolidation across entities and gain clearer visibility into group performance.",
  },
  "profitability-pro": {
    title: "Profitability Pro",
    description: "Analyze profitability across products, customers, regions, and business units with actionable insight.",
  },
};

export default async function ProductDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = products[slug] ?? {
    title: slug.split("-").map((word) => word[0]?.toUpperCase() + word.slice(1)).join(" "),
    description: "A Trijotech enterprise product designed to simplify complex business operations.",
  };
  return <PlaceholderPage eyebrow="Trijotech Product" title={product.title} description={product.description} />;
}
