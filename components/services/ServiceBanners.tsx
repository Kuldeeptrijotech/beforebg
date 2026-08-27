import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ServiceMockupComponents } from "./ServiceMockups";

export type ServiceBannerItem = {
  number: string;
  title: string;
  slug: string;
  rowId: string;
  description: string;
  image: string;
  imageAlt: string;
  enables: string[];
};

const serviceBanners: ServiceBannerItem[] = [
  {
    number: "01",
    title: "SAP Consulting",
    slug: "sap-consulting",
    rowId: "srv-consulting",
    description: "End-to-end SAP transformation and consulting that aligns consolidation, planning, forecasting, analytics, and profitability processes with business goals.",
    image: "/assets/services/service_consulting_transparent.png",
    imageAlt: "SAP Consulting architecture roadmap and transformation strategy visualizer",
    enables: [
      "Implementation Strategy",
      "Architecture & Configuration",
      "Planning & Forecasting",
      "Analytics & Reporting",
      "Process Optimization",
    ],
  },
  {
    number: "02",
    title: "SAP Support & AMS",
    slug: "sap-support",
    rowId: "srv-support-ams",
    description: "Reliable functional and technical support that keeps SAP landscapes stable, current, efficient, and ready for evolving business needs.",
    image: "/assets/services/service_support_transparent.png",
    imageAlt: "24*7 SAP AMS operations and system availability telemetry console",
    enables: [
      "Functional & Technical Support",
      "Post-Go-Live Stabilization",
      "Upgrades & Enhancements",
      "Performance Optimization",
      "24*7 SLA Management",
    ],
  },
  {
    number: "03",
    title: "SAP BTP Full Stack Applications",
    slug: "sap-btp-full-stack",
    rowId: "srv-btp-fullstack",
    description: "Modern applications, extensions, workflows, and integrations built on SAP BTP to make enterprise work simpler and faster.",
    image: "/assets/services/service_btp_transparent.png",
    imageAlt: "SAP BTP cloud platform architecture and application development stack",
    enables: [
      "SAP Fiori & UI5 Modernization",
      "Process Automation & Workflows",
      "Full-Stack Cloud Extensions",
      "Embedded Intelligence",
      "Multi-Cloud Integration",
    ],
  },
  {
    number: "04",
    title: "SAP Data Integration Services",
    slug: "sap-data-integration",
    rowId: "srv-data-integration",
    description: "Secure, scalable interfaces connecting SAP and non-SAP systems through SAP PI/PO, Cloud Integration, APIs, and enterprise protocols.",
    image: "/assets/services/service_data_integration_transparent.png",
    imageAlt: "Real-time enterprise data pipeline and multi-cloud integration flow",
    enables: [
      "SAP CPI & PI/PO Integration",
      "API & Middleware Management",
      "Data Migration & Replication",
      "Hybrid Cloud Connectivity",
      "Real-Time Event Streaming",
    ],
  },
  {
    number: "05",
    title: "SAP AI & Data Insight Services",
    slug: "sap-ai-ml",
    rowId: "srv-ai-ml",
    description: "AI, predictive analytics, automation, and intelligent insights embedded into core SAP operations and decision-making.",
    image: "/assets/services/service_ai_analytics_transparent.png",
    imageAlt: "SAP Analytics Cloud and PaPM profitability insights dashboard",
    enables: [
      "SAP Business AI & Copilots",
      "Predictive Financial Analytics",
      "Intelligent Process Automation",
      "Machine Learning Pipelines",
      "Executive Data Insights",
    ],
  },
];

export default function ServiceBanners() {
  return (
    <section id="explore-services" className="service-banners-section w-full overflow-hidden">
      <div className="service-banners-container w-full">
        {serviceBanners.map((item, index) => {
          const isDark = index % 2 === 1; // 0=White, 1=Dark, 2=White, 3=Dark, 4=White
          const isImageRight = index % 2 === 0; // 0=Right, 1=Left, 2=Right, 3=Left, 4=Right
          const Mockup = ServiceMockupComponents[item.slug as keyof typeof ServiceMockupComponents];

          return (
            <div
              key={item.slug}
              id={item.rowId}
              className={`service-banner-row service-row-${item.slug} group relative w-full border-b transition-colors duration-300 ${
                isDark
                  ? "bg-[#050817] text-white border-transparent"
                  : "bg-[#ffffff] text-black border-slate-200"
              }`}
            >
              <div className="service-banner-inner mx-auto grid w-full max-w-[1600px] grid-cols-1 lg:grid-cols-2 lg:items-stretch">
                {/* ── 50% UI Mockup Column: Mobile Order 1 / Desktop Order 2 (if right) or Order 1 (if left) ── */}
                <div
                  className={`service-col-image order-1 ${
                    isImageRight ? "lg:order-2" : "lg:order-1"
                  } relative flex items-center justify-center min-h-[300px] sm:min-h-[360px] md:min-h-[420px] lg:h-auto lg:min-h-[480px] w-full overflow-hidden p-4 sm:p-6 lg:p-10`}
                >
                  {Mockup ? (
                    <Mockup />
                  ) : (
                    <div className="service-image-frame relative h-full w-full flex items-center justify-center">
                      <Image
                        src={item.image}
                        alt={item.imageAlt}
                        fill
                        unoptimized
                        priority={index < 2}
                        sizes="(max-width: 1024px) 100vw, 50vw"
                        className="service-photo object-contain object-center transition-transform duration-700 ease-out group-hover:scale-105"
                      />
                    </div>
                  )}
                </div>

                {/* ── 50% Content Column: Mobile Order 2 / Desktop Order 1 (if image right) or Order 2 (if image left) ── */}
                <div
                  className={`service-col-content order-2 ${
                    isImageRight
                      ? "lg:order-1 lg:pl-10 lg:pr-10 xl:pl-16 xl:pr-14"
                      : "lg:order-2 lg:pl-10 lg:pr-10 xl:pl-14 xl:pr-16"
                  } flex flex-col justify-center px-6 py-8 sm:px-10 sm:py-12 lg:py-16`}
                >
                  {/* Number badge */}
                  <div className="service-num-wrapper flex items-center">
                    <span
                      className={`service-number-badge text-3xl font-black tracking-tight sm:text-4xl ${
                        isDark ? "text-[#38bdf8]" : "text-[#008fd3]"
                      }`}
                    >
                      {item.number}
                    </span>
                  </div>

                  {/* Service Title */}
                  <h3
                    className={`service-heading-title mt-3 text-2xl font-black uppercase tracking-tight sm:text-3xl lg:text-[1.85rem] xl:text-[2.05rem] leading-[1.15] ${
                      isDark ? "text-white" : "text-black"
                    }`}
                  >
                    {item.title}
                  </h3>

                  {/* Description */}
                  <p
                    className={`service-paragraph-description mt-3.5 text-sm sm:text-base leading-relaxed font-medium ${
                      isDark ? "text-slate-300" : "text-slate-700"
                    }`}
                  >
                    {item.description}
                  </p>

                  {/* WHAT WE ENABLE */}
                  <div
                    className={`service-enable-wrapper mt-6 border-t pt-5 ${
                      isDark ? "border-transparent" : "border-slate-200"
                    }`}
                  >
                    <p
                      className={`service-enable-heading text-[11px] font-black tracking-[0.24em] uppercase ${
                        isDark ? "text-[#38bdf8]" : "text-[#008fd3]"
                      }`}
                    >
                      WHAT WE ENABLE
                    </p>

                    {/* 2-Column Responsive Grid of Enables */}
                    <ul className="service-enable-list mt-3.5 grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2.5">
                      {item.enables.map((label) => (
                        <li
                          key={label}
                          className={`service-enable-item flex items-center gap-2.5 text-xs sm:text-sm font-semibold ${
                            isDark ? "text-white" : "text-slate-900"
                          }`}
                        >
                          <span
                            className={`service-bullet-dot h-2 w-2 shrink-0 rounded-full ${
                              isDark ? "bg-[#38bdf8]" : "bg-[#008fd3]"
                            }`}
                          />
                          <span>{label}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Explore Service Link */}
                  <div className="service-action-wrapper mt-7">
                    <Link
                      href={`/services/${item.slug}`}
                      className="service-banner-cta-btn inline-flex items-center gap-2 rounded-full px-6 py-3 text-xs sm:text-sm font-bold text-white transition-all duration-200 border-0 border-none shadow-none"
                      style={{
                        backgroundColor: "#008fd3",
                        background: "#008fd3",
                        color: "#ffffff",
                        border: "none",
                        borderWidth: "0px",
                        outline: "none",
                      }}
                    >
                      Explore Service
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
