import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "../../components/common/PageHero";
import ContactCta from "../../components/common/ContactCta";
import CardGrid from "../../components/common/CardGrid";
import SectionHeading from "../../components/common/SectionHeading";

export const metadata: Metadata = {
  title: "SAP Implementation Services",
  description: "Transforming businesses with expert SAP implementation solutions from Trijotech.",
};

const offerings = [
  {
    title: "Legal & Management Consolidation",
    description: "Consolidate financial data from multiple subsidiaries and business units into one unified platform. Our solutions support both legal and management consolidation, ensuring compliance while providing a single source of truth.",
  },
  {
    title: "Data Analytics & Enterprise Intelligence",
    description: "We transform enterprise data into actionable insights, enabling real-time visibility and smarter decision-making. Our solutions provide predictive analytics and performance tracking to support business growth. By aligning data with strategic goals, we help drive continuous improvement.",
  },
  {
    title: "Planning, Budgeting & Forecasting",
    description: "Build agile, driver-based planning models with SAP SAC to adapt quickly to changing business needs. Predictive forecasting and scenario simulations help drive smarter, faster decision-making. Integrated planning ensures real-time visibility, streamlined budgeting cycles, and improved alignment across functions.",
  },
  {
    title: "FP&A and Profitability Analysis",
    description: "We improve financial planning with accurate forecasting and integrated profitability insights. Our solutions enable dynamic cost allocation and margin tracking. This helps organizations optimize performance and profitability.",
  },
];

export default function Page() {
  return (
    <main className="sap-implementation-source-page">
      
      <PageHero title="SAP Implementation Services" subtitle="Transforming Businesses with Expert SAP Solutions" backgroundImage="/assets/heroes/sap-implementation-blue.png" className="sap-implementation-hero">
        <Link href="/contact" className="filled-button">Consult Our Expert</Link>
      </PageHero>

      <section className="sap-implementation-content">
        <div className="container">
          <p className="implementation-intro">At Trijotech, we help businesses go beyond ERP deployment — we enable transformation. Whether you&apos;re starting fresh with SAP or modernizing your existing landscape, our SAP implementation services are built to deliver real, measurable outcomes. We bring the right blend of strategy, technology, and industry knowledge to create connected, intelligent enterprises that are ready for what&apos;s next.</p>

          <section className="implementation-offerings">
            <SectionHeading title={<>Implementation <em>Services</em></>} />
            
            <CardGrid cards={offerings} className="implementation-grid" cardClassName="implementation-card" />

          </section>

          <section className="implementation-partner">
            <div className="partner-image"><img src="/assets/image/Services_000.png" alt="Trijotech SAP Services Partner" /></div>
            <div className="partner-copy">
              <div className="partner-title"><h2><em>Trijotech is now a SAP Services Partner</em></h2><img src="/assets/image/SAP-partner-logo-1-scaled.png" alt="SAP Partner" /></div>
              <p>This serves as further validation of Trijotech&apos;s SAP expertise across key areas including SAP S/4HANA Implementation, Business Transformation, Central Finance, SAP BTP, Analytics with SAP SAC, and AI-driven insights—solidifying our position as a trusted SAP Service Partner committed to delivering strategic outcomes.</p>
            </div>
          </section>

          <section className="implementation-results">
            <div className="section-heading"><h2>From implementation to <em>Business advantage</em></h2><span>Explore how business achieved real result through our SAP-driven solution</span></div>
            <div className="results-grid">
              <article><h4>Streamlining Financial Operations for a Global Manufacturer</h4><p>“A global manufacturing company struggled with delayed financial closings and inconsistent reporting. Trijotech implemented SAP S/4HANA with Group Reporting, enabling faster consolidations, improved accuracy, and greater visibility across entities.”</p></article>
              <article><h4>Retail Transformation Through Real-Time Analytics</h4><p>“A growing retail chain struggled with delayed and inconsistent reporting across departments. Trijotech implemented SAP Analytics Cloud to unify data and deliver real-time dashboards for sales, finance, and operations. The leadership team now makes faster, data-driven decisions with clear visibility into key business metrics.”</p></article>
            </div>
          </section>

          <section className="implementation-cta">
            <h3>Ready to Transform Your Business with SAP?</h3>
            <p>Let our SAP experts help you design and implement a solution that drives real business value. Whether you&apos;re looking to modernize existing systems or implement SAP for the first time, we&apos;re here to guide you every step of the way.</p>
            <div><Link href="/contact" className="cta-primary">Consult Our Experts</Link><Link href="/services" className="cta-outline">Explore Our Services</Link></div>
          </section>
        </div>
      </section>

      
      <ContactCta className="implementation-contact industry-source-page" />
    </main>
  );
}
