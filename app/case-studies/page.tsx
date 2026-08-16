import type { Metadata } from "next";
import CaseStudiesPage from "./CaseStudiesPage";

export const metadata: Metadata = {
  title: "Case Studies",
  description: "Explore Trijotech SAP transformation, planning, analytics, profitability, and consolidation case studies.",
};

export default function Page() {
  return <CaseStudiesPage />;
}
