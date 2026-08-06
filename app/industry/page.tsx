import type { Metadata } from "next";
import Link from "next/link";
import heroImage from "../assets/new_/industry1.png";
import pharma from "../assets/new_/L0601.jpg";
import manufacturing from "../assets/new_/L0602.jpg";
import fintech from "../assets/new_/L0603.jpg";
import entertainment from "../assets/new_/L0604.jpg";
import steel from "../assets/new_/L0605.jpg";
import telecom from "../assets/new_/L0606.jpg";
import PageHero from "../components/common/PageHero";
import ContactCta from "../components/common/ContactCta";
import MediaTextRow from "../components/common/MediaTextRow";
import SectionHeading from "../components/common/SectionHeading";

export const metadata: Metadata = {
  title: "Industry",
  description: "Explore Trijotech SAP expertise across pharmaceutical, manufacturing, fintech, entertainment, steel, and telecommunications industries.",
};

const industries = [
  ["Pharma", pharma, "A prominent pharmaceutical company improved its operational efficiency by merging finance, sales, and supply chain data using SAP SAC Financial Planning. Enhancements to the user interface and user experience made navigation smoother and more intuitive. Tailored financial models and applications refined the budgeting and forecasting processes. Automation and improved functionality helped streamline operations. Consequently, the organization became more precise, agile, and effective in its decision-making, fostering growth and success in a competitive market."],
  ["Manufacturing", manufacturing, "SAP S/4HANA Group Reporting revolutionized the financial processes for a prominent steel manufacturer. By integrating data from various departments, it delivered accurate insights and improved clarity. Furthermore, it refined reporting models and hierarchies, ensuring uniformity. The automation of intercompany matching and reconciliation minimized errors. Additionally, the system streamlined both management and legal consolidation, enhancing financial transparency. Consequently, decision-making became quicker, more precise, and more efficient."],
  ["Fintech", fintech, "Implementing SAP BTP Workflow Management in a top telecommunications company greatly improved operational efficiency. Initially, the design of workflows streamlined business processes, enhancing task management across various departments. Furthermore, integration with SAP ERP facilitated a smooth data flow and alignment of systems. User roles and authorizations were also effectively managed, ensuring secure access and compliance. Lastly, the strong notification system boosted communication and collaboration among teams."],
  ["Entertainment", entertainment, "SAP BPC was put in place at a prominent entertainment company to improve financial planning and analysis. It facilitated better data integration among departments, ensuring that financial data remained consistent. Tailored customizations made the system fit the company’s specific requirements, enhancing both reporting accuracy and efficiency. Furthermore, thorough testing, training, and documentation were offered to support the transition. Consequently, employees adapted swiftly and made effective use of the system, leading to improved overall performance and productivity."],
  ["Steel Manufacturing", steel, "SAP BW, which enhanced efficiency and offered real-time insights into crucial KPIs such as Book to Bill Ratio, Revenue, DSO, OTD, and Order Intake. This led to optimized production processes, better cash flow management, and improved on-time delivery rates. The detailed reporting capabilities supported more informed decision-making, minimized bottlenecks, and ensured production was aligned with market demand. Ultimately, these enhancements contributed to business growth, strengthened competitive advantage, and increased operational efficiency."],
  ["Telecommunication", telecom, "SAP Group Reporting helped a top fintech automate its consolidation and reporting processes. By setting up legal consolidation from start to finish, the solution made data entry easier with GRDC forms, which cut down on input errors. It also enhanced intercompany matching and reconciliation. Furthermore, reporting for statistical financial statement items and sub-items became more efficient. Consequently, financial transparency, compliance, and data-driven decision-making improved, resulting in better performance and recognition from regulators."],
] as const;

export default function IndustryPage() {
  return (
    <main className="industry-page industry-source-page">
      
      <PageHero title="Industry" backgroundImage={heroImage.src} className="header-text p-h-img-industry">
        <Link href="/contact" className="filled-button mt-3">Consult Our Experts &rarr;</Link>
      </PageHero>

      <section className="services industry-source-content">
        <div className="container">
          <SectionHeading className="industry-source-intro" title={<>Our <em>Experties</em></>} description="At Trijotech, we offer cutting-edge SAP solutions designed to enhance business processes, improve operations, and foster growth. With extensive experience and a wealth of industry knowledge, we enable organizations to utilize SAP technologies to tackle challenges and achieve their goals. Whether you need ERP implementation, data analytics, or cloud solutions, we are here to support you throughout the entire process. Our commitment is to operational excellence, rethinking processes, and leveraging data to ensure your success in the digital era. By choosing SAP, your business can flourish?and with Trijotech’s assistance, we guarantee your success at every stage of the journey." />
          <SectionHeading className="industry-source-intro" title={<>Industries <em>We Serve</em></>} />

          <div className="industry-source-list">
            
            {industries.map(([title, image, description]) => (
              <MediaTextRow key={title} className="industry-source-item" title={<em>{title}</em>} description={description} image={image.src} imageAlt={title} />

            ))}
          </div>
        </div>
      </section>

      
      <ContactCta />
    </main>
  );
}
