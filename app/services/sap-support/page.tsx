import type { Metadata } from "next";
import SapSupportPage from "@/components/services/SapSupportPage";
export const metadata: Metadata = { title: "SAP Support & Application Management Services" };
const offerings = [
  { title: "Functional and Technical Support", description: "Resolve incidents and strengthen day-to-day SAP processes across business and technology teams." },
  { title: "Post-Go-Live Stabilization", description: "Address transition issues and reinforce adoption as implementation moves into steady operations." },
  { title: "Upgrade and Release Management", description: "Plan, test, and govern changes without unnecessary business disruption." },
  { title: "Performance Optimization", description: "Analyze slow transactions and reports to improve system responsiveness and user experience." },
  { title: "Security and Role Management", description: "Protect data integrity through access controls, audits, compliance, and role reviews." },
  { title: "Flexible Engagement Models", description: "Choose scalable teams and SLAs aligned with operational demand and service priorities." },
];
const impacts = [
  { title: "Stable Operations", description: "Proactive monitoring and responsive support keep critical processes reliable." },
  { title: "Continuous Improvement", description: "Structured enhancements help the landscape evolve with the business." },
  { title: "Flexible Service", description: "Scale support capacity and expertise as operational needs change." },
  { title: "Secure and Compliant", description: "Governance and role controls protect systems and enterprise data." },
];
export default function Page() { return <SapSupportPage offerings={offerings} impacts={impacts} />; }
