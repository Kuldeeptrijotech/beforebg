import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

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
    image: "/assets/services/service_consulting.jpg",
    imageAlt: "Executive boardroom with warm architectural lighting and consultants reviewing SAP transformation strategy",
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
    image: "/assets/services/service_support.jpg",
    imageAlt: "24*7 global IT operations center with real-time green telemetry and cloud uptime monitoring displays",
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
    image: "/assets/services/service_btp.jpg",
    imageAlt: "Creative software engineering studio with neon violet accents and engineers building full-stack SAP BTP cloud applications",
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
    image: "/assets/services/service_data_integration.jpg",
    imageAlt: "Enterprise datacenter with glowing golden-orange fiber optic cables and cloud API connectivity pipelines",
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
    image: "/assets/services/service_ai_ml.jpg",
    imageAlt: "Advanced AI research laboratory visualizing holographic 3D neural network clusters and predictive data models",
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
    <section id="explore-services" className="service-banners-section w-full overflow-hidden bg-[#030713]">
      <div className="service-banners-container w-full">
        {serviceBanners.map((item, index) => {
          const isDark = index % 2 === 1; // 0=White, 1=Black, 2=White, 3=Black, 4=White
          const isImageRight = index % 2 === 0; // 0=Right, 1=Left, 2=Right, 3=Left, 4=Right

          return (
            <div
              key={item.slug}
              id={item.rowId}
              className={`service-banner-row service-row-${item.slug} group relative w-full transition-colors duration-300 ${
                isDark
                  ? "service-banner-row-dark service-row-dark !bg-[#000000] !text-[#ffffff]"
                  : "service-banner-row-light service-row-light !bg-[#ffffff] !text-[#000000]"
              }`}
              style={{
                backgroundColor: isDark ? "#000000" : "#ffffff",
                color: isDark ? "#ffffff" : "#000000",
              }}
            >
              <div className="service-banner-inner mx-auto grid w-full max-w-[1600px] grid-cols-1 lg:grid-cols-2 lg:items-stretch">
                {/* ── 50% Image Column: Mobile Order 1 / Desktop Order 2 (if right) or Order 1 (if left) ── */}
                <div
                  className={`service-col-image order-1 ${
                    isImageRight ? "lg:order-2" : "lg:order-1"
                  } relative h-[260px] sm:h-[340px] md:h-[400px] lg:h-auto lg:min-h-[460px] w-full overflow-hidden`}
                >
                  <div className="service-image-frame relative h-full w-full overflow-hidden">
                    <Image
                      src={item.image}
                      alt={item.imageAlt}
                      fill
                      priority={index < 2}
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      className="service-photo object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                  </div>
                </div>

                {/* ── 50% Content Column: Mobile Order 2 / Desktop Order 1 (if image right) or Order 2 (if image left) ── */}
                <div
                  className={`service-col-content order-2 ${
                    isImageRight
                      ? "lg:order-1 lg:pl-10 lg:pr-10 xl:pl-16 xl:pr-14"
                      : "lg:order-2 lg:pl-10 lg:pr-10 xl:pl-14 xl:pr-16"
                  } flex flex-col justify-center px-6 py-8 sm:px-10 sm:py-10 lg:py-14`}
                >
                  {/* Number badge */}
                  <div className="service-num-wrapper flex items-center">
                    <span
                      className={`service-number-badge text-3xl font-black tracking-tight sm:text-4xl ${
                        isDark ? "!text-[#ffffff]" : "!text-[#008fd3]"
                      }`}
                      style={{
                        color: isDark ? "#ffffff" : "#008fd3",
                        WebkitTextFillColor: isDark ? "#ffffff" : "#008fd3",
                      }}
                    >
                      {item.number}
                    </span>
                  </div>

                  {/* Service Title */}
                  <h3
                    className={`service-heading-title mt-3 text-2xl font-black uppercase tracking-tight sm:text-3xl lg:text-[1.85rem] xl:text-[2.05rem] leading-[1.15] ${
                      isDark ? "!text-[#ffffff]" : "!text-[#000000]"
                    }`}
                    style={{
                      color: isDark ? "#ffffff" : "#000000",
                      WebkitTextFillColor: isDark ? "#ffffff" : "#000000",
                    }}
                  >
                    {item.title}
                  </h3>

                  {/* Description */}
                  <p
                    className={`service-paragraph-description mt-3.5 text-sm sm:text-base leading-relaxed font-medium ${
                      isDark ? "!text-[#ffffff]" : "!text-slate-800"
                    }`}
                    style={{
                      color: isDark ? "#ffffff" : "#1e293b",
                      WebkitTextFillColor: isDark ? "#ffffff" : "#1e293b",
                    }}
                  >
                    {item.description}
                  </p>

                  {/* WHAT WE ENABLE */}
                  <div className="service-enable-wrapper mt-6 border-t border-black/10 dark:border-white/10 pt-5">
                    <p
                      className={`service-enable-heading text-[11px] font-black tracking-[0.24em] uppercase ${
                        isDark ? "!text-[#ffffff]" : "!text-[#008fd3]"
                      }`}
                      style={{
                        color: isDark ? "#ffffff" : "#008fd3",
                        WebkitTextFillColor: isDark ? "#ffffff" : "#008fd3",
                      }}
                    >
                      WHAT WE ENABLE
                    </p>

                    {/* 2-Column Responsive Grid of Enables */}
                    <ul className="service-enable-list mt-3.5 grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2.5">
                      {item.enables.map((label) => (
                        <li
                          key={label}
                          className="service-enable-item flex items-center gap-2.5 text-xs sm:text-sm font-semibold"
                        >
                          <span
                            className={`service-bullet-dot h-2 w-2 shrink-0 rounded-full ${
                              isDark ? "!bg-[#ffffff]" : "!bg-[#008fd3]"
                            }`}
                            style={{
                              backgroundColor: isDark ? "#ffffff" : "#008fd3",
                            }}
                          />
                          <span
                            className={`service-enable-label ${
                              isDark ? "!text-[#ffffff]" : "!text-[#000000]"
                            }`}
                            style={{
                              color: isDark ? "#ffffff" : "#000000",
                              WebkitTextFillColor: isDark ? "#ffffff" : "#000000",
                            }}
                          >
                            {label}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Explore Service CTA Link */}
                  <div className="service-cta-wrapper mt-7">
                    <Link
                      href={`/services/${item.slug}`}
                      className={`service-explore-btn inline-flex items-center gap-2 text-sm font-bold transition-all duration-200 group-hover:gap-3 ${
                        isDark ? "!text-[#ffffff] [&>svg]:!text-[#ffffff] [&>svg]:!stroke-[#ffffff]" : "!text-[#008fd3] [&>svg]:!text-[#008fd3] [&>svg]:!stroke-[#008fd3]"
                      }`}
                      style={{
                        color: isDark ? "#ffffff" : "#008fd3",
                        WebkitTextFillColor: isDark ? "#ffffff" : "#008fd3",
                      }}
                    >
                      Explore Service <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
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
