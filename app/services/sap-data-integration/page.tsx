import type { Metadata } from "next";
import SapDataIntegrationPage from "@/components/services/SapDataIntegrationPage";
export const metadata: Metadata = { title: "SAP Data Integration Services" };
const offerings = [
  { title: "SAP Cloud Integration", description: "Design secure cloud integration flows across SAP and third-party applications." },
  { title: "SAP PI/PO Modernization", description: "Assess, migrate, and modernize established interfaces for a cloud-ready landscape." },
  { title: "API Integration", description: "Create governed, reusable APIs that simplify system and partner connectivity." },
  { title: "Data Migration", description: "Move business data with structured validation, reconciliation, and cutover planning." },
  { title: "Event-Driven Integration", description: "Enable responsive processes through real-time events and asynchronous patterns." },
  { title: "Integration Monitoring", description: "Improve reliability through traceability, alerts, operational dashboards, and support." },
];
const impacts = [
  { title: "Connected Operations", description: "Keep information moving consistently across applications and business processes." },
  { title: "Reliable Data", description: "Improve trust through controlled mappings, validation, and reconciliation." },
  { title: "Real-Time Visibility", description: "Make current operational information available where decisions happen." },
  { title: "Scalable Architecture", description: "Use repeatable integration patterns that can grow with the enterprise." },
];
export default function Page() { return <SapDataIntegrationPage offerings={offerings} impacts={impacts} />; }
