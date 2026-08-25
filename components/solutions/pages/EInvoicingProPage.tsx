import SolutionDetailLanding from "@/components/landing/SolutionDetailLanding";
import type { SolutionItem } from "@/lib/solutions-data";

export default function EInvoicingProPage({ solution }: { solution: SolutionItem }) {
  return (
    <SolutionDetailLanding
      solution={solution}
      heroImage="/assets/heroes/products-blue.png"
      impactImage="/assets/heroes/products-blue.png"
      showHeroCopy={true}
    />
  );
}

