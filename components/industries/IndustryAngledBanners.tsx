"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export type IndustryBannerItem = {
  number: string;
  title: string;
  slug: string;
  rowId: string;
  description: string;
  image: string;
  imageAlt: string;
  enables: string[];
};

const industryBanners: IndustryBannerItem[] = [
  {
    number: "01",
    title: "Retail & Supply Chain",
    slug: "retail-supply-chain",
    rowId: "ind-retail-supply-chain",
    description: "Build agile, resilient and customer-centric supply chains that create lasting value.",
    image: "/static/Retail_and_supply_chain_image.png",
    imageAlt: "Retail and supply chain automated logistics and warehouse",
    enables: [
      "Supply Chain Planning",
      "Demand Forecasting",
      "Warehouse Management",
      "Order Fulfillment",
      "Real-Time Visibility",
    ],
  },
  {
    number: "02",
    title: "Pharmaceuticals & Life Sciences",
    slug: "pharmaceuticals-life-sciences",
    rowId: "ind-pharma-life-sciences",
    description: "Accelerate innovation and ensure compliance with intelligent, future-ready solutions.",
    image: "/static/Pharma.jpg",
    imageAlt: "Pharmaceuticals and life sciences laboratory analytics",
    enables: [
      "GxP Compliance & Quality",
      "Quality Management",
      "Digital Manufacturing",
      "Supply Chain Insights",
      "Regulatory Reporting",
    ],
  },
  {
    number: "03",
    title: "Manufacturing",
    slug: "manufacturing",
    rowId: "ind-manufacturing-plant",
    description: "Intelligent manufacturing solutions that drive efficiency, quality and sustainable growth.",
    image: "/static/Manufacturing.jpg",
    imageAlt: "Industrial automated manufacturing plant and robotic arms",
    enables: [
      "Production Planning",
      "Asset Management",
      "Digital Manufacturing",
      "Advanced Analytics",
      "Maintenance Excellence",
    ],
  },
  {
    number: "04",
    title: "Fintech",
    slug: "fintech",
    rowId: "ind-fintech-banking",
    description: "Secure, scalable and compliant financial solutions for the digital economy.",
    image: "/static/FinTech.jpg",
    imageAlt: "Fintech digital banking architecture and financial interface",
    enables: [
      "Core Banking on SAP",
      "Risk & Compliance",
      "Financial Analytics",
      "Customer Experience",
      "Process Automation",
    ],
  },
  {
    number: "05",
    title: "Entertainment",
    slug: "entertainment",
    rowId: "ind-entertainment-media",
    description: "Improve planning, reporting and collaboration across media and entertainment enterprises.",
    image: "/static/Entertainment.jpg",
    imageAlt: "Entertainment and digital media production studio",
    enables: [
      "Media Asset Planning",
      "Royalty & Revenue Analytics",
      "Digital Content Lifecycle",
      "Budgeting & Forecasting",
      "System Integration",
    ],
  },
  {
    number: "06",
    title: "Steel Manufacturing",
    slug: "steel-manufacturing",
    rowId: "ind-steel-manufacturing",
    description: "Use analytics and SAP technologies to improve production, financial performance and operational visibility.",
    image: "/static/Steel_Manufacturing.jpg",
    imageAlt: "Steel manufacturing mill, furnace and telemetry",
    enables: [
      "Production Analytics",
      "Real-Time KPI Monitoring",
      "Plant Asset Performance",
      "Financial Close & Control",
      "Supply Chain Sync",
    ],
  },
  {
    number: "07",
    title: "Telecommunications",
    slug: "telecommunications",
    rowId: "ind-telecom-networks",
    description: "Improve telecom financial processes, reporting and operational performance using SAP.",
    image: "/static/Telecommunication.jpg",
    imageAlt: "Telecommunications optical networks and digital connectivity",
    enables: [
      "Network Asset Management",
      "Billing & Revenue Workflows",
      "Group Reporting & Consolidation",
      "Process Automation",
      "Traffic & Usage Insights",
    ],
  },
  {
    number: "08",
    title: "Oil & Gas",
    slug: "oil-and-gas",
    rowId: "ind-oil-and-gas",
    description: "Modernize upstream, midstream and downstream operations with real-time SAP analytics and asset telemetry.",
    image: "/static/Oil_and_Gas.jpg",
    imageAlt: "High-tech oil and gas refinery pipelines and digital energy telemetry",
    enables: [
      "Upstream & Hydrocarbon Accounting",
      "Pipeline & Asset Telemetry",
      "ESG & Carbon Compliance",
      "Supply & Trading Analytics",
      "Predictive Plant Maintenance",
    ],
  },
  {
    number: "09",
    title: "Healthcare",
    slug: "healthcare",
    rowId: "ind-healthcare-systems",
    description: "Improve patient outcomes, streamline clinical workflows, and modernize healthcare data infrastructure.",
    image: "/static/Healthcare.jpg",
    imageAlt: "Modern surgical operating room with advanced clinical robotics and digital patient telemetry",
    enables: [
      "Clinical Data Analytics",
      "Hospital Information Systems",
      "Patient Care Telemetry",
      "Regulatory & HIPAA Compliance",
      "Medical Supply Chain Sync",
    ],
  },
];

export default function IndustryAngledBanners() {
  return (
    <section id="explore" className="industry-banners-section w-full overflow-hidden bg-[#030713]">
      <div className="industry-banners-container w-full">
        {industryBanners.map((item, index) => {
          const isDark = index % 2 === 1; // 0=White, 1=Black, 2=White, 3=Black, 4=White, 5=Black, 6=White, 7=Black, 8=White

          return (
            <div
              key={item.slug}
              id={item.rowId}
              className={`industry-banner-row industry-row-${item.slug} group relative w-full transition-colors duration-300 ${
                isDark
                  ? "industry-banner-row-dark industry-row-dark !bg-[#000000] !text-[#ffffff]"
                  : "industry-banner-row-light industry-row-light !bg-[#ffffff] !text-[#000000]"
              }`}
              style={{
                backgroundColor: isDark ? "#000000" : "#ffffff",
                color: isDark ? "#ffffff" : "#000000",
              }}
            >
              <div className="industry-banner-inner mx-auto grid w-full max-w-[1560px] grid-cols-1 lg:grid-cols-12 lg:items-stretch">
                {/* ── Mobile Order 1 / Desktop Order 3: Full Rectangular Image Frame ── */}
                <div className="industry-col-right order-1 lg:order-3 relative h-[240px] sm:h-[320px] md:h-[380px] lg:h-auto lg:min-h-[400px] w-full lg:col-span-5 overflow-hidden">
                  <div className="industry-image-frame relative h-full w-full overflow-hidden">
                    <Image
                      src={item.image}
                      alt={item.imageAlt}
                      fill
                      priority={index < 2}
                      sizes="(max-width: 1024px) 100vw, 42vw"
                      className="industry-photo object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                  </div>
                </div>

                {/* ── Mobile Order 2 / Desktop Order 1: Number, Title, Description ── */}
                <div className="industry-col-left order-2 lg:order-1 flex flex-col justify-center px-6 py-8 sm:px-10 sm:py-10 lg:col-span-4 lg:py-14 xl:col-span-4 xl:pl-16 xl:pr-8">
                  {/* Number badge */}
                  <div className="industry-num-wrapper flex items-center">
                    <span
                      className={`industry-number-badge text-3xl font-black tracking-tight sm:text-4xl ${
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

                  {/* Industry Title */}
                  <h3
                    className={`industry-heading-title mt-3 text-2xl font-black uppercase tracking-tight sm:text-3xl lg:text-[1.75rem] xl:text-[1.95rem] leading-[1.18] ${
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
                    className={`industry-paragraph-description mt-3 text-sm sm:text-base leading-relaxed font-medium max-w-md ${
                      isDark ? "!text-[#ffffff]" : "!text-slate-800"
                    }`}
                    style={{
                      color: isDark ? "#ffffff" : "#1e293b",
                      WebkitTextFillColor: isDark ? "#ffffff" : "#1e293b",
                    }}
                  >
                    {item.description}
                  </p>
                </div>

                {/* ── Mobile Order 3 / Desktop Order 2: "WHAT WE ENABLE" Capabilities & CTA ── */}
                <div className="industry-col-middle order-3 lg:order-2 flex flex-col justify-center px-6 pb-10 pt-2 sm:px-10 sm:pb-12 lg:col-span-3 lg:py-14 lg:pb-14 xl:col-span-3 xl:px-8">
                  <p
                    className={`industry-enable-heading text-[11px] font-black tracking-[0.24em] uppercase ${
                      isDark ? "!text-[#ffffff]" : "!text-[#008fd3]"
                    }`}
                    style={{
                      color: isDark ? "#ffffff" : "#008fd3",
                      WebkitTextFillColor: isDark ? "#ffffff" : "#008fd3",
                    }}
                  >
                    WHAT WE ENABLE
                  </p>

                  {/* Vertical List of Enables using Clean Bullet Points */}
                  <ul className="industry-enable-list mt-4 space-y-2.5">
                    {item.enables.map((label) => (
                      <li
                        key={label}
                        className="industry-enable-item flex items-center gap-3 text-sm font-semibold"
                      >
                        <span
                          className={`industry-bullet-dot h-2 w-2 shrink-0 rounded-full ${
                            isDark ? "!bg-[#ffffff]" : "!bg-[#008fd3]"
                          }`}
                          style={{
                            backgroundColor: isDark ? "#ffffff" : "#008fd3",
                          }}
                        />
                        <span
                          className={`industry-enable-label ${
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

                  {/* Explore Industry CTA Link */}
                  <div className="industry-cta-wrapper mt-6">
                    <Link
                      href={`/industries/${item.slug}`}
                      className={`industry-explore-btn inline-flex items-center gap-2 text-sm font-bold transition-all duration-200 group-hover:gap-3 ${
                        isDark ? "!text-[#ffffff] [&>svg]:!text-[#ffffff] [&>svg]:!stroke-[#ffffff]" : "!text-[#008fd3] [&>svg]:!text-[#008fd3] [&>svg]:!stroke-[#008fd3]"
                      }`}
                      style={{
                        color: isDark ? "#ffffff" : "#008fd3",
                        WebkitTextFillColor: isDark ? "#ffffff" : "#008fd3",
                      }}
                    >
                      Explore Industry <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
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
