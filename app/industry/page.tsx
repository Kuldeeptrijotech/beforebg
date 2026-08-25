import type { Metadata } from "next";
import SectionLanding from "@/components/landing/SectionLanding";
import { industries } from "@/lib/industries-data";

export const metadata: Metadata = { title: "Industries | Trijotech", description: "Industry-focused SAP solutions for connected operations, reporting, analytics, and growth." };

export default function IndustryPage() {
  const cards = industries.map((industry) => ({ title: industry.title, href: `/industries/${industry.slug}`, image: industry.heroImage, imageAlt: `${industry.title} industry`, description: industry.shortDescription, capabilities: industry.services.slice(0, 4), cta: "Explore Industry" }));
  return (
    <SectionLanding
      eyebrow="Industries"
      title={
        <>
          Industry knowledge meets{" "}
          <span className="tri-gradient-text">SAP expertise</span>
        </>
      }
      description="We shape connected, practical SAP solutions around the operational, financial, and data challenges unique to your industry."
      heroImage="/assets/heroes/industry.png"
      animateHero={false}
      cardsTitle={
        <>
          Solutions grounded in{" "}
          <span className="tri-gradient-text">industry realities</span>
        </>
      }
      cardsIntro="Explore how Trijotech brings SAP, analytics, integration, and automation to seven distinct industries."
      cards={cards}
      cardLayout="rows"
    />
  );
}
