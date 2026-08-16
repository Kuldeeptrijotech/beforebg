import type { Metadata } from "next";
import SapAiPage from "@/components/services/SapAiPage";
export const metadata: Metadata = { title: "SAP AI & Data Insight Services" };
const offerings = [
  { title: "SAP Business AI", description: "Embed intelligent recommendations and assistance into core SAP workflows." },
  { title: "Predictive Analytics", description: "Use historical and operational data to anticipate trends, risks, and opportunities." },
  { title: "Intelligent Automation", description: "Automate repetitive decisions and processes with AI-supported rules and workflows." },
  { title: "Data Foundation", description: "Connect and prepare trusted enterprise data for reliable analytics and machine learning." },
  { title: "AI-Driven Insights", description: "Surface timely, contextual insight to support faster and more confident decisions." },
  { title: "Responsible AI Adoption", description: "Apply governance, security, and practical controls as intelligent capabilities scale." },
];
const impacts = [
  { title: "Faster Decisions", description: "Put relevant predictions and recommendations closer to the point of action." },
  { title: "Greater Efficiency", description: "Reduce manual effort by automating repeatable analysis and operational tasks." },
  { title: "Adaptive Operations", description: "Build processes that respond more intelligently as conditions and data change." },
  { title: "Trusted Insight", description: "Ground AI outcomes in connected, governed enterprise information." },
];
export default function Page() { return <SapAiPage offerings={offerings} impacts={impacts} />; }
