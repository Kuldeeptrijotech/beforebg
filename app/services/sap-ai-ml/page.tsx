import type { Metadata } from "next";
import { ContactButton, ImpactGrid, OfferingGrid, Results, ServiceHero } from "../../components/LegacyServiceDetail";
export const metadata: Metadata = { title: "SAP AI & ML Data Integration" };
const offerings = [
    { title: "Custom App Development on BTP", description: "Design and build new cloud-native business applications that solve specific business problems or address niche use cases—without affecting your SAP core." },
    { title: "App Extensions for S/4HANA", description: "Develop side-by-side extensions to enhance existing SAP applications using SAP Extension Suite while maintaining system upgrades and performance integrity." },
    { title: "Front-End Experience with Fiori/UI5", description: "Craft intuitive and mobile-friendly apps using SAP Fiori/UI5 that boost productivity and user satisfaction across departments." },
    { title: "CAP/RAP-Based Service Layer", description: "Leverage SAP Cloud Application Programming Model (CAP) and RESTful Application Programming (RAP) to build robust business logic services with high maintainability." },
    { title: "Workflow Automation", description: "Use BTP Workflow and Business Rules to automate approvals, escalations, and other tasks—creating intelligent, rules-driven processes." },
    { title: "API & Integration Suite", description: "Connect to SAP and non-SAP systems using pre-built connectors and APIs through SAP BTP Integration Suite. Reduce data silos and improve process continuity." }];
const impacts = [
    { title: "Faster Time to Market", description: "Build and deploy applications 2–3x faster using reusable components, pre-configured services, and low-code capabilities.", image: "/assets/image/L0402.png" },
    { title: "Seamless SAP Integration", description: "Integrate tightly with SAP S/4HANA, SuccessFactors, Ariba, and more—ensuring your apps work in harmony with your digital core.", image: "/assets/image/L0403.png" },
    { title: "Greater Visibility & Control", description: "Combine operational workflows with embedded analytics for enhanced oversight and decision-making.", image: "/assets/image/L0404.png" },
    { title: "Anywhere Access", description: "Design apps that run smoothly across desktop, tablet, and mobile for a truly connected workforce.", image: "/assets/image/L0405.png" }];
export default function Page() { return <main className="legacy-service-source-page"><ServiceHero title="SAP AI & ML Data Integration" image="/assets/image/Home3.png" /><OfferingGrid heading={<>Our Service <em>Offerings</em></>} intro="At Trijotech, we combine SAP data integration with the power of Artificial Intelligence and Machine Learning. Our solutions help organizations automate processes, surface intelligent insights, and build a data foundation that learns and adapts—unlocking new levels of efficiency and business value." cards={offerings} /><ImpactGrid cards={impacts} /><Results /><ContactButton /></main> }
