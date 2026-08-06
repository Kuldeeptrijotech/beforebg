"use client";

import { useEffect, useState } from "react";
import clientAvatar from "../assets/images/client-01.png";

const testimonials = [
    {
        name: "Large IT Company from Asia",
        role: "Project Manager",
        company: "IT Services",
        rating: 5,
        quote:
            "We are pleased to present the SPOT AWARD in recognition of the excellent work by the Trijotech consultant. Their dedication, responsiveness and SAP expertise were instrumental in delivering a complex transformation on time.",
    },
    {
        name: "Global Manufacturing Company",
        role: "Chief Technology Officer",
        company: "Manufacturing",
        rating: 5,
        quote:
            "Compared to other partners we've worked with, Trijotech demonstrated a level of dedication and expertise that truly set them apart. From day one they understood our challenges and delivered with precision.",
    },
    {
        name: "Kalpesh Chavda",
        role: "Chief Executive Officer",
        company: "Diligent Global",
        rating: 5,
        quote:
            "Thanks for the support Trijotech and the team has extended over the last 3 years. Their consistent quality, clear communication and business-driven approach made them a partner we can always rely on.",
    },
    {
        name: "Leads & Strategy Director",
        role: "Director SAP CoE",
        company: "Banking & Finance",
        rating: 5,
        quote:
            "Trijotech helped us streamline our SAP finance close and reporting. Their consultants are not only technically strong but also deeply understand the business outcome behind every requirement.",
    },
    {
        name: "Head of IT",
        role: "Head of Enterprise Systems",
        company: "Retail",
        rating: 5,
        quote:
            "We engaged Trijotech for SAP AMS support and the experience was seamless. Incidents are resolved quickly, SLAs are consistently met, and the team proactively suggests improvements.",
    },
    {
        name: "Finance Transformation Lead",
        role: "Group Finance Controller",
        company: "Oil & Energy",
        rating: 5,
        quote:
            "Trijotech delivered our S/4HANA Group Reporting rollout with exceptional quality. Their advisory on consolidation and reporting best practices gave us a single source of truth we trust.",
    },
];

const getPerView = () => {
    if (typeof window === "undefined") return 3;
    if (window.innerWidth <= 560) return 1;
    if (window.innerWidth <= 860) return 2;
    return 3;
};

export default function Testimonials() {
    const [activeIndex, setActiveIndex] = useState(0);
    const [paused, setPaused] = useState(false);
    const [perView, setPerView] = useState(3);

    const maxIndex = Math.max(0, testimonials.length - perView);

    const goTo = (index) => {
        setActiveIndex(Math.max(0, Math.min(index, maxIndex)));
    };

    const next = () => {
        setActiveIndex((current) => (current >= maxIndex ? 0 : current + 1));
    };

    const prev = () => {
        setActiveIndex((current) => (current <= 0 ? maxIndex : current - 1));
    };

    useEffect(() => {
        const updatePerView = () => setPerView(getPerView());
        updatePerView();
        window.addEventListener("resize", updatePerView);
        return () => window.removeEventListener("resize", updatePerView);
    }, []);

    useEffect(() => {
        if (paused) return;
        const timer = setInterval(() => {
            setActiveIndex((current) => (current >= maxIndex ? 0 : current + 1));
        }, 4000);
        return () => clearInterval(timer);
    }, [paused, maxIndex]);

    return (
        <section className="testimonials testimonials-section">
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <div className="section-heading">
                            <h2>What our clients say <em>about us</em></h2>
                            <span>Testimonials from our greatest clients</span>
                        </div>
                    </div>
                    <div className="col-md-12">
                        <div
                            className="testimonial-carousel"
                            onMouseEnter={() => setPaused(true)}
                            onMouseLeave={() => setPaused(false)}
                        >
                            <div className="testimonial-track" style={{ transform: `translateX(-${activeIndex * (100 / perView)}%)` }}>
                                {testimonials.map((item) => (
                                    <div className="testimonial-slide" key={item.name}>
                                        <div className="testimonial-item">
                                            <div className="quote-icon">&#8220;</div>
                                            <div className="star-rating">
                                                {Array.from({ length: item.rating }).map((_, i) => (
                                                    <span key={i} className="star">&#9733;</span>
                                                ))}
                                            </div>
                                            <p className="testimonial-quote">{item.quote}</p>
                                            <div className="testimonial-author">
                                                <div className="author-avatar">
                                                    <img src={clientAvatar.src} alt={item.name} />
                                                </div>
                                                <div className="author-info">
                                                    <h4>{item.name}</h4>
                                                    <span>{item.role} &middot; {item.company}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <button type="button" className="testimonial-control prev-control" onClick={prev} aria-label="Previous testimonial">
                                &#8249;
                            </button>
                            <button type="button" className="testimonial-control next-control" onClick={next} aria-label="Next testimonial">
                                &#8250;
                            </button>
                            <div className="testimonial-dots">
                                {Array.from({ length: maxIndex + 1 }).map((_, i) => (
                                    <button
                                        key={i}
                                        type="button"
                                        className={`testimonial-dot ${i === activeIndex ? "is-active" : ""}`}
                                        onClick={() => goTo(i)}
                                        aria-label={`Go to testimonial ${i + 1}`}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
