import SolutionDetailLanding from "@/components/landing/SolutionDetailLanding";
import type { SolutionItem } from "@/lib/solutions-data";
import ProfitabilityCube from "@/components/scenes/ProfitabilityCube";

export default function ProfitabilityProPage({ solution }: { solution: SolutionItem }) {
  return (
    <SolutionDetailLanding
      solution={solution}
      heroImage="/assets/image/Product_4.png"
      impactImage="/assets/image/L0505.png"
      cleanImpactImage={true}
      scene={<ProfitabilityCube />}
    />
  );
}
