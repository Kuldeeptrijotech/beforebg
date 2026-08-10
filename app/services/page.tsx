import type { Metadata } from "next";
import Link from "next/link";
import implementationImage from "../assets/image/S0201.jpg";
import supportImage from "../assets/image/S0202.jpg";
import btpImage from "../assets/image/S0203.jpg";
import integrationImage from "../assets/image/S0204.jpg";
import aiImage from "../assets/image/S0205.jpg";
import PageHero from "../components/common/PageHero";
import ContactCta from "../components/common/ContactCta";
import MediaTextRow from "../components/common/MediaTextRow";

export const metadata: Metadata = { title: "Our Services", description: "Explore Trijotech SAP implementation, support, BTP, data integration, and AI services." };

const services = [
  { title: <>SAP Implementation <em>Services</em></>, image: implementationImage, href: "/services/sap-implementation", description: "Trijotech delivers end-to-end SAP solutions that streamline consolidation, budgeting, forecasting, and profitability analysis. Through automation and real-time insights, we drive accuracy, compliance, and strategic alignment—empowering smarter, data-driven decisions.", bullets: ["Legal & Management Consolidation →", "Data Analytics & Enterprise Intelligence →", "Planning, Budgeting & Forecasting →", "FP&A and Profitability Analysis →"] },
  { title: <>SAP Support <em>& AMS</em></>, image: supportImage, href: "/services/sap-support", description: "We provide reliable SAP Support and AMS (Application Management Services) to keep your systems running smoothly 24×7. Our team offers both functional and technical support for key SAP solutions like SAC, Datasphere, S/4HANA Group Reporting, and PaPM. We help with everything from bug fixing and enhancements to upgrades and hypercare support. With a dedicated AMS team focused on Legal Consolidation, Planning, Budgeting & Forecasting (PBF), and FP&A, we make sure your SAP landscape stays updated, efficient, and ready for the future." },
  { title: <>SAP BTP Full <em>Stack Applications</em></>, image: btpImage, href: "/services/sap-btp-full-stack", description: "Modern applications built on SAP Business Technology Platform (BTP) make your SAP systems smarter, faster, and easier to use. These apps help you extend and customize your existing SAP setup. You can automate tasks with SAP Build Process Automation, create simple and clean user interfaces with SAP Fiori/UI5, and add smart features using embedded AI. Ready-made tools are also available to speed up sales and purchase order processes—making your work easier and more efficient." },
  { title: <>SAP Data Integration <em>Services</em></>, image: integrationImage, href: "/services/sap-data-integration", description: "Our SAP Data Integration Services help you connect and streamline siloed systems through powerful middleware solutions. We specialize in building robust interfaces using SAP PI/PO and SAP Cloud Integration (CPI), enabling seamless data flow across platforms. Our integrations support REST, OData, IDoc, SFTP, and API-based connections to ensure smooth communication between systems. Whether it’s integrating SAP with non-SAP applications like BMS, e-Invoicing platforms, or custom-built tools, Trijotech ensures secure, efficient, and scalable data integration tailored to your business needs." },
  { title: <>SAP AI & Data <em>Insight Services</em></>, image: aiImage, href: "/services/sap-ai-ml", description: "Harness the power of intelligent technologies with Trijotech’s SAP AI & Data Insight Services. We bring the best of SAP AI tools—like Joule for conversational analytics and SAP Business AI for real-time recommendations—into your core business operations. From automated forecasting with Smart Predict in SAP Analytics Cloud to seamless task automation using SAP iRPA, we help organizations become insight-driven. Our solutions also integrate SAP AI Core, Digital Assistant, and embedded machine learning in S/4HANA to enable smarter decisions at every level." },
];

const reasons = [
  ["Deep Expertise:", "Trijotech offers expert SAP consulting across advanced solutions like Group Reporting, SAP SAC, BTP, and PaPM, along with core modules such as ABAP, FICO, MM, and SD. Our certified consultants ensure tailored implementation, integration, and optimization to align SAP systems with your business goals."],
  ["SAP Implementation & Consulting:", "Trijotech provides quality SAP Consulting & Support services across the US, Europe, Middle East & APAC. We specialize in Business Planning, Legal & Management Consolidation, and Data Analytics. Our mission is to maximize revenue, productivity, and efficiency while ensuring long-term customer trust and success."],
  ["Business-Centric Approach:", "We combine the responsiveness of a boutique firm with the capabilities of a full-scale SAP partner. Trijotech is known for its collaborative working style, transparent communication, and measurable outcomes."],
  ["Continuous Improvement Mindset:", "We continually enhance our methods to deliver sustainable results, helping businesses stay ahead of challenges with innovative SAP solutions."],
];

export default function ServicesPage() {
  return <main className="services-page">
    
      <PageHero title="Our Services" backgroundImage="/assets/heroes/services-blue.png" className="services-page-heading"><Link href="/contact" className="filled-button mt-3">Consult Our Experts &rarr;</Link></PageHero>
    <section className="services-wrapper">
      
      {services.map(service=><MediaTextRow key={service.href} className="service-source-row" title={service.title} description={service.description} image={service.image.src} imageAlt="" href={service.href} bullets={service.bullets}/>) }
    </section>
    <section className="services-why-source"><h2>Why <em>Choose Us?</em></h2><p>We combine the responsiveness of a boutique firm with the capabilities of a full-scale SAP partner. Trijotech is known for its collaborative working style, transparent communication, and commitment to delivering measurable outcomes—ensuring every engagement adds strategic value to our clients.</p><ul>{reasons.map(([title,text])=><li key={title}><div><p><strong>{title}</strong> {text}</p></div></li>)}</ul></section>
    
      <ContactCta className="services-contact-source industry-source-page" />
  </main>;
}

