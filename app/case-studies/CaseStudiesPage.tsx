"use client";
import ImageSlider from "../components/common/ImageSlider";
import PageHero from "../components/common/PageHero";
import ContactCta from "../components/common/ContactCta";
import SectionHeading from "../components/common/SectionHeading";

const studies = [
  {
    title: <>Maximizing ROI for Large <em>Scale S/4HANA Transformations</em></>,
    description: "Discover the incredible benefits that S/4HANA brings, including streamlined processes and innovative SAP tools that ensure a smooth transition. Our experts share valuable insights on selecting the perfect cloud offering tailored to your unique business needs, helping you achieve unparalleled efficiency and cost-effectiveness.",
    images: Array.from({ length: 25 }, (_, i) => `/assets/image/Casestudy1_${i === 0 ? "001" : String(i + 1).padStart(i + 1 >= 10 ? 4 : 3, "0")}.png`),
  },
  {
    title: <>SAP SAC Financial Planning for <em>a Major Pharmaceutical Company</em></>,
    description: "The case study illustrates how SAP SAC was used for financial planning by a leading pharmaceutical company. The goal was to analyze data from a BW environment, which included entities such as profit centers, segments, and material costs. The aim was to make use of this data analysis to effectively support the company’s financial planning objectives.",
    images: Array.from({ length: 8 }, (_, i) => `/assets/image/Casestudy2_${String(i + 1).padStart(3, "0")}.jpg`),
  },
  {
    title: <>Elevate Your Business with <em>SAP Profitability &amp; Performance Management (PaPM)</em></>,
    description: "Discover how SAP PaPM can transform your approach to financial and operational performance management, with a comprehensive agenda covering its core functionalities, solution architecture, key use cases, and real-world success stories.",
    images: Array.from({ length: 11 }, (_, i) => `/assets/image/Casestudy3_${i + 1 >= 10 ? String(i + 1).padStart(4, "0") : String(i + 1).padStart(3, "0")}.png`),
  },
  {
    title: <>MIS &amp; KPIs Dashboard Implementation for a <em>Leading European Automotive Manufacturer using SAP BW/4HANA &amp; SAP Analytics Cloud</em></>,
    description: "This case study illustrates the implementation of performance indicators (KPIs) and management information system (MIS) reporting for a major British car manufacturer. The implementation was carried out using SAP BW and SAC, with a focus on optimizing business performance through a thorough understanding of KPIs.",
    images: Array.from({ length: 13 }, (_, i) => `/assets/image/Casestudy4_${i + 1 >= 10 ? String(i + 1).padStart(4, "0") : String(i + 1).padStart(3, "0")}.jpg`),
  },
  {
    title: <>Legal Consolidation and Disclosure reporting for <em>Major APAC Palm oil Manufacturers using SAP BPC 11.0</em></>,
    description: "Legal Consolidation and Disclosure reporting for Major APAC Palmoil Manufacturer. It describes a unique approach towards BPC Legal Consolidation (SAP Business Object Planning & Consolidation 11.1 NW for Consolidation) to repurpose the Group Currency of a Group as a source for another group based on alternative currency base.",
    images: Array.from({ length: 4 }, (_, i) => `/assets/image/Casestudy5_${String(i + 1).padStart(3, "0")}.png`),
  },
];

export default function CaseStudiesPage() {
  return (
    <main className="case-studies-page">
      
      <PageHero title="Our Case Studies" className="case-studies-hero" />


      {studies.map((study, index) => (
        <section className="case-study-section" key={index}>
          <div className="container">
            <SectionHeading title={study.title} description={study.description}/>
            
            <ImageSlider images={study.images} label={`Case study ${index + 1}`} />

          </div>
        </section>
      ))}

      
      <ContactCta className="case-studies-contact industry-source-page" />
    </main>
  );
}
