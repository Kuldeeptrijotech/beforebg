"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { videos } from "../data/videos";
import L0301 from "../assets/image/L0301.jpg";
import L0302 from "../assets/image/L0302.jpg";
import L0303 from "../assets/image/L0303.jpg";
import L0402 from "../assets/image/L0402.png";
import L0403 from "../assets/image/L0403.png";
import L0404 from "../assets/image/L0404.png";
import L0405 from "../assets/image/L0405.png";
import L0406 from "../assets/image/L0406.png";
import L0407 from "../assets/image/L0407.png";
import L0408 from "../assets/image/L0408.png";
import L0409 from "../assets/image/L0409.png";
import L0410 from "../assets/image/L0410.png";
import L0411 from "../assets/image/L0411.png";
import L0601 from "../assets/image/L0601.jpg";
import L0602 from "../assets/image/L0602.jpg";
import L0603 from "../assets/image/L0603.jpg";
import L0604 from "../assets/image/L0604.jpg";
import L0605 from "../assets/image/L0605.jpg";
import L0606 from "../assets/image/L0606.jpg";
import L0701 from "../assets/image/L0701.jpg";
import L0702 from "../assets/image/L0702.jpg";
import L0703 from "../assets/image/L0703.jpg";
import L000 from "../assets/image/L000.png";
import funFactsBg from "../assets/images/fun-facts-bg.jpg";
import CountUp from "./CountUp";
import Testimonials from "./Testimonials";

const serviceCards = [
    {
        title: "Specialized Industry & SAP Expertise",
        description:
            "Our team blends deep financial and business insight with advanced technical skills in SAP Analytics, Consolidation, and Reporting delivering solutions that create real business impact.",
    },
    {
        title: "Global Experience, Local Commitment",
        description:
            "We serve leading enterprises across the US, Europe, Middle East, and APAC, offering tailored SAP solutions aligned with regional requirements and global best practices.",
    },
    {
        title: "Certified Talent, Quality Driven Delivery",
        description:
            "Our SAP certified professionals follow ISO aligned standards and a client first approach, ensuring reliability, transparency, and consistent results in every engagement.",
    },
];

const whatWeOfferCards = [
    { title: "SAP Implementation", image: L0301 },
    { title: "SAP Support & AMS", image: L0302 },
    { title: "SAP BTP Full Stack Application", image: L0303 },
];

const coreServices = [
    { title: "SAP BTP\n(Business Technology Platform)", image: L0402 },
    { title: "S/4 Hana Group Reporting", image: L0403 },
    { title: "SAP Analytics Cloud", image: L0404 },
    { title: "SAP PaPM", image: L0405 },
    { title: "SAP S/4 Hana Transformation", image: L0406 },
    { title: "SAP CPI\n(Cloud Platform Integration)", image: L0407 },
    { title: "Business Planning Consolidation", image: L0408 },
    { title: "Planning Budgeting Forecasting", image: L0409 },
    { title: "Other Associated Areas", image: L0410 },
    { title: "See All Services", image: L0411 },
];

const industries = [L0601, L0602, L0603, L0604, L0605, L0606];

const blogs = [
    {
        title: "SAP S/4HANA Group Reporting : Overview",
        description:
            "Complex financial data from multiple subsidiaries and entities require sharper planning, reporting, and control.",
        image: L0701,
        link: "/blogs",
    },
    {
        title: "SAP Analytics Cloud (SAC) - Healthcare Analytics",
        description:
            "Healthcare analytics continues to evolve with access, expenditure, and demographics shaping decision-making.",
        image: L0702,
        link: "/blogs",
    },
    {
        title: "SAP SAC integration with SAP BW",
        description:
            "Real-time reporting and analytics become simpler when SAP SAC is combined with SAP BW.",
        image: L0703,
        link: "/blogs",
    },
];

export default function HomeSections() {
    const router = useRouter();
    return (
        <>
            <section className="services intro-cards">
                <div className="container">
                    <div className="row">
                        {serviceCards.map((card) => (
                            <div className="col-md-4" key={card.title}>
                                <div className="service-item">
                                    <div className="down-content">
                                        <h4>{card.title}</h4>
                                        <p>{card.description}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section
                className="fun-facts"
                style={{ backgroundImage: `url(${funFactsBg.src})` }}
            >
                <div className="container">
                    <div className="row">
                        <div className="col-md-6">
                            <div className="left-content">
                                <h2>Why Clients Choose Us</h2>
                                <h4>
                                    At <strong>Trijotech</strong>, we go beyond technology delivery — we take ownership of our client&apos;s success. With years of experience implementing SAP solutions across diverse industries, we are trusted for our responsibility, quality, and passion in every engagement. Our team blends deep domain expertise with a customer-first approach, ensuring solutions that are not only technically sound but also business-relevant and future-ready.
                                </h4>
                                <h4>
                                    We pride ourselves on our agility, innovative accelerators, and the long-term partnerships we build — helping organizations unlock value, drive performance, and achieve sustainable growth.
                                </h4>
                            </div>
                        </div>
                        <div className="col-md-6 align-self-center">
                            <div className="row">
                                <div className="col-md-6">
                                    <div className="count-area-content"><CountUp end={8} suffix="+" /><div className="count-title">Years in SAP Implementation &amp; Support</div></div>
                                </div>
                                <div className="col-md-6">
                                    <div className="count-area-content"><CountUp end={100} suffix="+" /><div className="count-title">Projects</div></div>
                                </div>
                                <div className="col-md-6">
                                    <div className="count-area-content"><CountUp end={50} suffix="+" /><div className="count-title">Clients</div></div>
                                </div>
                                <div className="col-md-6">
                                    <div className="count-area-content"><CountUp end={30} suffix="+" /><div className="count-title">Founder&rsquo;s Industry Experience</div></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="services what-we-offer-section">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="section-heading">
                                <h2>What <em>We Offer</em></h2>
                            </div>
                        </div>
                        {whatWeOfferCards.map((item) => (
                            <div className="col-md-4" key={item.title}>
                                <div className="service-item" style={{ position: "relative" }}>
                                    <Image src={item.image} alt={item.title} className="home-section-image" />
                                    <div className="bottom-text" style={{ position: "absolute", bottom: "5px", width: "100%", color: "white", padding: "10px 15px", fontSize: "20px", textAlign: "center" }}>
                                        {item.title}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="services core-services-section">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="section-heading">
                                <h2>Our <em>Core Services</em></h2>
                            </div>
                        </div>
                        {coreServices.map((item) => {
                            const card = (
                                <div className="service-item1">
                                    <Image src={item.image} alt={item.title} className="home-section-image" />
                                    <div className="bottom-text">
                                        {item.title}
                                    </div>
                                </div>
                            );

                            if (item.title === "See All Services") {
                                return (
                                    <div className="col-md-4" key={item.title}>
                                        <Link href="/services" className="core-services-link">{card}</Link>
                                    </div>
                                );
                            }

                            return (
                                <div className="col-md-4" key={item.title}>
                                    {card}
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            <section className="services industries-section">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="section-heading">
                                <h2>Industries <em>We Serve</em></h2>
                            </div>
                        </div>
                        {industries.map((item, index) => (
                            <div className="col-md-4" key={`industry-${index}`}>
                                <div className="service-item">
                                    <img src={typeof item === "string" ? item : item.src} alt="Industry" className="home-section-image" />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="services blogs-section">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="section-heading text-center">
                                <h2>Our <em>Blogs</em></h2>
                            </div>
                        </div>
                        {blogs.map((blog) => (
                            <div className="col-md-4" key={blog.title}>
                                <div className="service-item">
                                    <img src={typeof blog.image === "string" ? blog.image : blog.image.src} alt={blog.title} className="home-section-image" />
                                    <div className="down-content">
                                        <h4>{blog.title}</h4>
                                        <p>{blog.description}</p>
                                        <button type="button" onClick={() => router.push("/blogs")} className="filled-button">Read More</button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="services video-series-section">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="section-heading text-center">
                                <h2>Video <em>Series</em></h2>
                            </div>
                        </div>
                        {videos.map((video) => (
                            <div className="col-md-4" key={video.title}>
                                <div className="service-item">
                                    <div className="down-content">
                                        <iframe
                                            width="100%"
                                            height="250"
                                            src={`${video.embed}${video.embed.includes("?")?"&":"?"}playsinline=1&rel=0`}
                                            title={video.title}
                                            frameBorder="0"
                                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                            allowFullScreen
                                            loading="lazy"
                                            referrerPolicy="strict-origin-when-cross-origin"
                                        />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="more-info who-we-are-section">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="more-info-content">
                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="left-image">
                                            <img src={typeof L000 === "string" ? L000 : L000.src} alt="" className="home-section-image" />
                                        </div>
                                    </div>
                                    <div className="col-md-6 align-self-center">
                                        <div className="right-content">
                                            <span className="who-we-are-label">Who we are</span>
                                            <h2>Find out how Trijotech can take you <em>farther, faster, together.</em></h2>
                                            <p>
                                                We will be happy to help you estimate your project and select the right SAP tool suited to your organizational needs.
                                            </p>
                                            <Link href="/contact" className="filled-button">Read More</Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <Testimonials />
        </>
    );
}
