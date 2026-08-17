import type { Metadata } from "next";
import SectionLanding from "@/components/landing/SectionLanding";

export const metadata: Metadata = { title: "Services | Trijotech", description: "End-to-end SAP implementation, support, integration, cloud, analytics, and AI services." };

const services = [
  { title: "SAP Implementation Services", href: "/services/sap-implementation", image: "/assets/image/S0201.jpg", imageAlt: "SAP implementation consulting", description: "End-to-end SAP transformation that aligns consolidation, planning, forecasting, analytics, and profitability processes with business goals.", capabilities: ["Implementation strategy", "Configuration", "Planning and forecasting", "Analytics and reporting"] },
  { title: "SAP Support & AMS", href: "/services/sap-support", image: "/assets/image/S0202.jpg", imageAlt: "SAP application support", description: "Reliable functional and technical support that keeps SAP landscapes stable, current, efficient, and ready for evolving business needs.", capabilities: ["Functional and technical support", "Post-go-live stabilization", "Upgrades and enhancements", "Performance optimization"] },
  { title: "SAP BTP Full Stack Applications", href: "/services/sap-btp-full-stack", image: "/assets/image/S0203.jpg", imageAlt: "SAP BTP application development", description: "Modern applications, extensions, workflows, and integrations built on SAP BTP to make enterprise work simpler and faster.", capabilities: ["SAP Fiori and UI5", "Process automation", "Full-stack extensions", "Embedded intelligence"] },
  { title: "SAP Data Integration Services", href: "/services/sap-data-integration", image: "/assets/image/S0204.jpg", imageAlt: "Enterprise data integration", description: "Secure, scalable interfaces connecting SAP and non-SAP systems through SAP PI/PO, Cloud Integration, APIs, and enterprise protocols.", capabilities: ["SAP CPI and PI/PO", "API integration", "Data migration", "SAP and non-SAP connectivity"] },
  { title: "SAP AI & Data Insight Services", href: "/services/sap-ai-ml", image: "/assets/image/S0205.jpg", imageAlt: "SAP artificial intelligence and analytics", description: "AI, predictive analytics, automation, and intelligent insights embedded into core SAP operations and decision-making.", capabilities: ["SAP Business AI", "Predictive analytics", "Intelligent automation", "AI-driven insights"] },
];

export default function ServicesPage() {
  return <SectionLanding eyebrow="Services" title="SAP solutions designed to transform your business" description="Trijotech provides end-to-end SAP services across implementation, support, integration, analytics, cloud, and intelligent technologies." heroImage="/assets/heroes/services.png" cardsTitle="Expertise across your SAP journey" cardsIntro="Explore our current services, each built from practical delivery experience and linked to its full service detail." cards={services} showCardIcons cardLayout="carousel" />;
}
