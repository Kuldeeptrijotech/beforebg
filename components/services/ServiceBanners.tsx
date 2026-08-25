"use client";

import React from "react";
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
    image: "/static/Service_Consulting.jpg",
    imageAlt: "SAP enterprise strategy consulting session in modern glass executive boardroom",
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
    image: "/static/Service_Support.jpg",
    imageAlt: "Modern 24*7 IT operations command center monitoring enterprise cloud systems",
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
    image: "/static/Service_BTP.jpg",
    imageAlt: "High-tech software lab developing modern enterprise SAP BTP cloud applications",
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
    image: "/static/Service_Data_Integration.jpg",
    imageAlt: "Futuristic enterprise data center with illuminated fiber optic data streaming pipelines",
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
    image: "/static/Service_AI_ML.jpg",
    imageAlt: "Artificial intelligence research lab visualizing 3D neural network analytics and predictive data models",
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
              <div className="service-banner-inner mx-auto grid w-full max-w-[1560px] grid-cols-1 lg:grid-cols-12 lg:items-stretch">
                {/* ── Mobile Order 1 / Desktop Order 3: Full Rectangular Image Frame ── */}
                <div className="service-col-right order-1 lg:order-3 relative h-[240px] sm:h-[320px] md:h-[380px] lg:h-auto lg:min-h-[400px] w-full lg:col-span-5 overflow-hidden">
                  <div className="service-image-frame relative h-full w-full overflow-hidden">
                    <Image
                      src={item.image}
                      alt={item.imageAlt}
                      fill
                      priority={index < 2}
                      sizes="(max-width: 1024px) 100vw, 42vw"
                      className="service-photo object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                  </div>
                </div>

                {/* ── Mobile Order 2 / Desktop Order 1: Number, Title, Description ── */}
                <div className="service-col-left order-2 lg:order-1 flex flex-col justify-center px-6 py-8 sm:px-10 sm:py-10 lg:col-span-4 lg:py-14 xl:col-span-4 xl:pl-16 xl:pr-8">
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
                    className={`service-heading-title mt-3 text-2xl font-black uppercase tracking-tight sm:text-3xl lg:text-[1.75rem] xl:text-[1.95rem] leading-[1.18] ${
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
                    className={`service-paragraph-description mt-3 text-sm sm:text-base leading-relaxed font-medium max-w-md ${
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
                <div className="service-col-middle order-3 lg:order-2 flex flex-col justify-center px-6 pb-10 pt-2 sm:px-10 sm:pb-12 lg:col-span-3 lg:py-14 lg:pb-14 xl:col-span-3 xl:px-8">
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

                  {/* Vertical List of Enables using Clean Bullet Points */}
                  <ul className="service-enable-list mt-4 space-y-2.5">
                    {item.enables.map((label) => (
                      <li
                        key={label}
                        className="service-enable-item flex items-center gap-3 text-sm font-semibold"
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

                  {/* Explore Service CTA Link */}
                  <div className="service-cta-wrapper mt-6">
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
