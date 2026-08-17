import SolutionDetailLanding from "@/components/landing/SolutionDetailLanding";
import type { SolutionItem } from "@/lib/solutions-data";
import ConsolidationScene from "@/components/scenes/ConsolidationScene";
export default function FinlagoonConsolidationPage({ solution }: { solution: SolutionItem }) {
  return (
    <SolutionDetailLanding
      solution={solution}
      heroImage="/assets/heroes/industry-blue.png"
      impactImage="/static/Software_Animation_1.gif"
      scene={<ConsolidationScene />}
    />
  );
}
