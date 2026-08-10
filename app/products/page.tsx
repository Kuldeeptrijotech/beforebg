import type { Metadata } from "next";
import PageHero from "../components/common/PageHero";
import ContactCta from "../components/common/ContactCta";
import CardGrid from "../components/common/CardGrid";
import Link from "next/link";
import ProductCarousel from "./ProductCarousel";
import back1 from "../assets/new_/back1.png";
import product4 from "../assets/new_/Product_4.png";
import product3 from "../assets/new_/Product_3.jpg";
import haupt1 from "../assets/new_/Haupt1.png";
import haupt2 from "../assets/new_/Haupt2.jpg";
import haupt3 from "../assets/new_/Haupt3.jpg";
import haupt4 from "../assets/new_/Haupt4.jpg";
import haupt5 from "../assets/new_/Haupt5.jpg";
import haupt6 from "../assets/new_/Haupt6.jpg";
import haupt7 from "../assets/new_/Haupt7.jpg";
import haupt8 from "../assets/new_/Haupt8.jpg";
import l0402 from "../assets/new_/L0402.png";
import l0403 from "../assets/new_/L0403.png";
import l0404 from "../assets/new_/L0404.png";
import l0408 from "../assets/new_/L0408.png";
import l0409 from "../assets/new_/L0409.png";
import l0503 from "../assets/new_/L0503.png";
import l0504 from "../assets/new_/L0504.png";
import l0505 from "../assets/new_/L0505.png";

const whyChooseItems = [
  {
    title: "Tailored for Your Operations",
    description:
      "Every solution is customized to workflows, industry needs, and operational priorities.",
  },
  {
    title: "Built on SAP Standards",
    description:
      "Seamless integration, high security, and future-ready scalability using SAP best practices.",
  },
  {
    title: "Automated & Efficient",
    description:
      "Replace spreadsheets and manual processes with automated, end-to-end workflows.",
  },
  {
    title: "Scalable & Adaptable",
    description:
      "Solutions ready for growth, system upgrades, and changing business environments.",
  },
];

const eInvoicingWhy = [
  {
    image: l0402,
    title: "Eliminate Expensive Licensing Fees",
    subtitle: "Reduce costs significantly",
  },
  {
    image: l0403,
    title: "Seamless SAP S/4HANA Integration",
    subtitle: "Hassle-free deployment",
  },
  {
    image: l0404,
    title: "Automated End-to-End Workflow",
    subtitle: "From invoice submission to approval tracking",
  },
  {
    image: l0408,
    title: "No Hidden Costs",
    subtitle: "High ROI with complete transparency",
  },
  {
    image: l0409,
    title: "User-Centric Design",
    subtitle: "Minimal training required for quick adoption",
  },
];

const eInvoicingStandOut = [
  {
    image: l0402,
    title: "Direct Government Portal Integration",
    subtitle: "Send invoices for approval seamlessly",
  },
  {
    image: l0403,
    title: "Instant Approval & Tracking",
    subtitle: "Real-time status updates",
  },
  {
    image: l0404,
    title: "Mass Invoice Processing",
    subtitle: "Effortlessly print or email invoices",
  },
  {
    image: l0408,
    title: "Regulatory Compliance",
    subtitle: "Compliant with evolving tax regulations",
  },
];

const hauptWhy = [
  {
    title: "Automated Reporting for Fast, Error-Free Closings",
    description:
      "Reduce manual efforts and close faster with automated reporting workflows.",
  },
  {
    title: "Multi-Currency Support & Smart Currency Conversion",
    description:
      "Handle multiple currencies with built-in exchange rate application and reports in base and converted currencies.",
  },
  {
    title: "Customizable Reporting Aligned to Business KPIs",
    description:
      "Tailor reports to internal metrics—adjust layouts, apply filters, and select key data fields.",
  },
  {
    title: "Full Audit Trails & Role-Based Access Control",
    description:
      "Ensure secure, compliant operations with detailed audit trails and customizable access roles.",
  },
];

const hauptFeatures = [
  {
    title: "Customizable Reports",
    description:
      "Design reports—adjust layouts, apply filters, and choose relevant fields to fit business needs.",
  },
  {
    title: "Historical Comparison",
    description:
      "Track performance over time with built-in period comparisons for strategic insights.",
  },
  {
    title: "Export & Integration",
    description:
      "Export in Excel or PDF, and integrate with BI tools for broader analysis and sharing.",
  },
];

const profitabilityCore = [
  {
    title:
      "Design reports your way—adjust layouts, apply filters, and choose relevant data fields to fit business needs.",
  },
  {
    title: "Automates allocation of COGS, Net Sales, Gross Sales, and more.",
  },
  {
    title: "Real-time P&L visibility for strategic clarity.",
  },
  {
    title: "Dynamic driver-based cost allocations.",
  },
  {
    title: "Helps identify and control unprofitable segments proactively.",
  },
  {
    title: "What Makes E-Invoicing Pro Stand Out?",
  },
];

const products = [
  {
    title: "E-invoicing Pro",
    image: l0503,
    description:
      "We enable seamless compliance through direct integration with government portals, reducing manual effort and errors. Compatible with S/4HANA Public and Private Cloud, the solution is secure, scalable, and built on SAP standards. Real-time tracking ensures full visibility into the invoicing process.",
  },
  {
    title: "HauptBuch Consolidation",
    image: l0504,
    description:
      "We automate legal and financial consolidations across entities and jurisdictions, reducing manual work and ensuring accuracy. Built on SAP BTP with Work Zone integration, the solution supports Multi-GAAP and IFRS compliance. Real-time dashboards offer a unified view, helping speed up financial close and eliminate reliance on spreadsheets.",
  },
  {
    title: "Profitability Pro",
    image: l0505,
    description:
      "We provide real-time profitability insights at both product and customer levels. By automating allocations for COGS, Net Sales, and Gross Sales, reporting becomes faster and more accurate. Dynamic driver mapping ensures precise cost distribution, helping businesses improve margin control and act early on underperforming areas.",
  },
];

const hauptImages = [haupt2, haupt3, haupt4, haupt5, haupt6, haupt7, haupt8];

export const metadata: Metadata = {
  title: "Products",
  description: "Explore Trijotech in-house SAP products including E-Invoicing Pro, HauptBuch Consolidation, and Profitability Pro.",
};

export default function ProductsPage() {
  return (
    <main className="products-page">
      
      <PageHero title="Products" backgroundImage="/assets/heroes/products-blue.png" className="p-h-img-product">
        <Link href="/contact" className="filled-button mt-3">Consult Our Experts &rarr;</Link>
      </PageHero>
      
      <div className="services">
        <div className="container">
          <div className="section-heading">
            <p
              style={{
                marginTop: "30px",
                marginBottom: "30px",
                fontSize: "16px",
                textAlign: "left",
              }}
            >
              At Trijotech, we offer cutting-edge SAP solutions designed to
              enhance business processes, improve operations, and foster growth.
              With extensive experience and a wealth of industry knowledge, we
              enable organizations to utilize SAP technologies to tackle
              challenges and achieve their goals. Whether you need ERP
              implementation, data analytics, or cloud solutions, we are here to
              support you throughout the entire process. Our commitment is to
              operational excellence, rethinking processes, and leveraging data
              to ensure your success in the digital era. By choosing SAP, your
              business can flourish—and with Trijotech&rsquo;s assistance, we
              guarantee your success at every stage of the journey.
            </p>
          </div>

          
          <div
            className="services products-why-section"
            style={{
              padding: "60px 0",
              backgroundImage: `url(${back1.src})`,
            }}
          >
            <div className="container">
              <div className="row">
                <div className="col-md-12">
                  <div className="section-heading">
                    <h2
                      style={{
                        textAlign: "left",
                        fontSize: "32px",
                        fontWeight: "700",
                        color: "#000",
                        marginBottom: "40px",
                      }}
                    >
                      Why Choose <em>In-House SAP Solutions from Trijotech?</em>
                    </h2>
                  </div>
                </div>

                <CardGrid cards={whyChooseItems} className="inhouse-card-grid" cardClassName="inhouse-card" />

              </div>
            </div>
          </div>
        </div>
      </div>

      
      <div className="more-info">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="more-info-content">
                <div className="row">
                  <div className="col-md-6">
                    <div className="left-image">
                      <iframe
                        width="100%"
                        height="309"
                        src="https://www.youtube.com/embed/sHlIfRtrMK0"
                        title="E-Invoicing Pro: Simplifying Invoicing for Modern Businesses"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        referrerPolicy="strict-origin-when-cross-origin"
                        allowFullScreen
                      />
                    </div>
                  </div>
                  <div className="col-md-6 align-self-center">
                    <div className="right-content">
                      <h2>
                        <em>E-invoicing Pro</em>
                      </h2>
                      <p>
                        Keep up with government mandates and eliminate manual
                        errors with our end-to-end e-invoicing solution. Whether
                        you&rsquo;re on public or private cloud, E-invoicing Pro
                        ensures seamless compliance and real-time invoice
                        tracking.
                      </p>
                      <Link href="/contact" className="filled-button">
                        Contact Us
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      
      <div
        className="services"
        style={{
          padding: "60px 0",
          backgroundImage: `url(${product4.src})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          color: "#fff",
        }}
      >
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="section-heading">
                <h2 style={{ textAlign: "left" }}>
                  Why Choose<em> E-Invoicing Pro?</em>
                </h2>
              </div>
            </div>

            {eInvoicingWhy.map((item) => (
              <div className="col-md-4" key={item.title}>
                <a href="/services" style={{ textDecoration: "none", color: "inherit" }}>
                  <div className="service-item1 e-invoicing-why-card">
                    <img src={item.image.src} alt="" />
                    <div className="service-title1">
                      {item.title}
                      <br />
                      {item.subtitle}
                    </div>
                  </div>
                </a>
              </div>
            ))}

            <div className="col-md-12">
              <div className="section-heading">
                <h2 style={{ textAlign: "left" }}>
                  What Makes<em> E-Invoicing Pro Stand Out?</em>
                </h2>
              </div>
            </div>

            {eInvoicingStandOut.map((item) => (
              <div className="col-md-3 e-invoicing-standout-column" key={item.title}>
                <a href="/services" style={{ textDecoration: "none", color: "inherit" }}>
                  <div className="service-item1 e-invoicing-why-card">
                    <img src={item.image.src} alt="" />
                    <div className="service-title1">
                      {item.title}
                      <br />
                      {item.subtitle}
                    </div>
                  </div>
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>

      
      <div className="services">
        <div className="container my-5">
          <div className="row align-items-center">
            <div className="col-md-6">
              <div className="d-flex align-items-start">
                <img
                  src={haupt1.src}
                  alt="Logo"
                  style={{ width: "60px", height: "auto", marginRight: "15px" }}
                />
                <div>
                  <h2
                    style={{
                      textAlign: "left",
                      color: "#000",
                      fontWeight: "700",
                      marginBottom: "20px",
                    }}
                  >
                    HauptBuch Consolidation
                  </h2>
                  <p
                    style={{
                      textAlign: "left",
                      fontSize: "16px",
                      lineHeight: "1.6",
                      color: "#333",
                    }}
                  >
                    Managing financial consolidation across multiple entities is
                    complex, but it doesn&rsquo;t have to be.{" "}
                    <b>HauptBuch Consolidation</b> is a single, intelligent
                    platform built to streamline your financial close and
                    reporting cycles. With robust automation, smart currency
                    handling, and fully customizable reports, HauptBuch Consol
                    brings speed, accuracy, and control to finance leaders
                    handling multi-entity structures.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <ProductCarousel images={hauptImages} />
            </div>
          </div>
        </div>
      </div>

      
      <div
        className="services hauptbuch-features-section"
        style={{
          padding: "60px 0",
          backgroundImage: `url(${product4.src})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          color: "#fff",
        }}
      >
        <div className="container" style={{ minHeight: "320px" }}>
          <div className="row">
            <div className="col-md-12">
              <div className="section-heading">
                <h2
                  style={{
                    textAlign: "left",
                    fontSize: "32px",
                    fontWeight: "700",
                    color: "#000",
                    marginBottom: "40px",
                  }}
                >
                  Why Choose<em> HauptBuch Consolidation?</em>
                </h2>
              </div>
            </div>
            <CardGrid cards={hauptWhy} className="hauptbuch-card-grid hauptbuch-card-grid-four" cardClassName="hauptbuch-card" />
<div className="col-md-12">
              <div className="section-heading" style={{ marginTop: "60px" }}>
                <h2
                  style={{
                    textAlign: "left",
                    fontSize: "32px",
                    fontWeight: "700",
                    color: "#000",
                    marginBottom: "40px",
                  }}
                >
                  Next-Level <em>Consolidation Features</em>
                </h2>
              </div>
            </div>
            <CardGrid cards={hauptFeatures} className="hauptbuch-card-grid hauptbuch-card-grid-three" cardClassName="hauptbuch-card" /></div>
        </div>
      </div>

      
      <div className="services">
        <div className="container">
          <div className="section-heading">
            <h1 style={{ textAlign: "left", marginBottom: "30px" }}>
              <em>Profitability Pro</em>
            </h1>
            <p style={{ textAlign: "left" }}>
              With Profitability Pro, you get real-time visibility into
              what&rsquo;s driving profits—and what&rsquo;s not. Automatically
              allocate expenses, assess margins, and make data-backed decisions
              to improve financial performance at every level.
            </p>
          </div>
        </div>
      </div>

      
      <div
        className="services"
        style={{
          padding: "60px 0",
          backgroundImage: `url(${product3.src})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          color: "#fff",
        }}
      >
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div
                className="section-heading"
                style={{ paddingTop: "40px", paddingBottom: "20px" }}
              >
                <h2
                  style={{
                    fontSize: "32px",
                    fontWeight: "700",
                    color: "#fff",
                    textAlign: "left",
                    margin: "0",
                  }}
                >
                  Next-Level <em>Profitability Analysis Features</em>
                </h2>
              </div>
            </div>
          </div>

          <div className="row">
            {profitabilityCore.map((item, i) => (
              <div className="col-md-4 mb-4" key={i}>
                <div
                  className="down-content"
                  style={{
                    borderRadius: "12px",
                    padding: "25px 20px",
                    textAlign: "left",
                    minHeight: "150px",
                    backgroundColor: "rgba(255,255,255,0.85)",
                    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                  }}
                >
                  <p
                    style={{
                      fontSize: "15px",
                      color: "#000",
                      lineHeight: "1.6",
                      margin: "0",
                    }}
                  >
                    {item.title}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      
      <div className="services">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="section-heading">
                <h2>
                  Our <em>Products</em>
                </h2>
              </div>
            </div>
            {products.map((product) => (
              <div className="col-md-4" key={product.title}>
                <div className="service-item">
                  <img src={product.image.src} alt={product.title} />
                  <div className="down-content">
                    <h4>{product.title}</h4>
                    <p>{product.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <ContactCta />
    </main>
  );
}








