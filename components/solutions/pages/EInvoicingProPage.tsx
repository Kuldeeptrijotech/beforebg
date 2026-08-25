import SolutionDetailLanding from "@/components/landing/SolutionDetailLanding";
import type { SolutionItem } from "@/lib/solutions-data";

export default function EInvoicingProPage({ solution }: { solution: SolutionItem }) {
  return (
    <SolutionDetailLanding
      solution={solution}
      heroImage="/assets/heroes/e-invoicing-generated-v2.png"
      impactImage="/assets/heroes/e-invoicing-generated-v2.png"
      showHeroCopy={true}
    />
  );
}
