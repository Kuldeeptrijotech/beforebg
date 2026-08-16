import type { Metadata } from "next";
import { notFound } from "next/navigation";
import EInvoicingProPage from "@/components/solutions/pages/EInvoicingProPage";
import FinlagoonConsolidationPage from "@/components/solutions/pages/FinlagoonConsolidationPage";
import ProfitabilityProPage from "@/components/solutions/pages/ProfitabilityProPage";
import {
  getAllSolutionSlugs,
  getSolutionBySlug,
} from "@/lib/solutions-data";

type PageProps = {
  params: Promise<{ slug: string }>;
};

const solutionPages = {
  "e-invoicing-pro": EInvoicingProPage,
  "einvoicing-pro": EInvoicingProPage,
  "finlagoon-consolidation": FinlagoonConsolidationPage,
  "profitability-pro": ProfitabilityProPage,
} as const;

export function generateStaticParams() {
  return getAllSolutionSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const solution = getSolutionBySlug(slug);
  if (!solution) {
    return { title: "Solution not found | Trijotech" };
  }
  return {
    title: `${solution.title} | Trijotech`,
    description: solution.shortDescription,
  };
}

export default async function SolutionDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const solution = getSolutionBySlug(slug);
  const Page = solutionPages[slug as keyof typeof solutionPages];

  if (!solution || !Page) {
    notFound();
  }

  return <Page solution={solution} />;
}
