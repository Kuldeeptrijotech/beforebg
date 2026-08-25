import Link from "next/link";
import { StaticImageData } from "next/image";
import ContactUs from "./ContactUs";

type OfferItem = {
    title: string;
    description: string;
};

type CtaButton = {
    href: string;
    label: string;
    variant?: "filled" | "outline";
};

type ServicePageProps = {
    eyebrow?: string;
    title: string;
    subtitle?: string;
    heroImage: StaticImageData;
    cta?: { href: string; label: string };
    intro?: string;
    offeringsHeading?: string;
    offerings?: OfferItem[];
    partner?: {
        video: string;
        title: string;
        description: string;
    } | null;
    impact?: {
        heading: string;
        items: { title: string; description: string; image?: StaticImageData }[];
    } | null;
    industries?: {
        heading: string;
        description?: string;
        images: StaticImageData[];
        footerTitle?: string;
        footerDescription?: string;
    } | null;
    testimonials?: {
        heading: string;
        subheading?: string;
        items: { title: string; quote: string }[];
    } | null;
    ctaSection?: {
        title: string;
        description?: string;
        buttons: CtaButton[];
    } | null;
    showContactForm?: boolean;
};

export default function ServicePage({
    eyebrow,
    title,
    subtitle,
    heroImage,
    cta = { href: "/contact", label: "Consult Our Experts" },
    intro,
    offeringsHeading = "Our Service Offerings",
    offerings = [],
    partner = null,
    impact = null,
    industries = null,
    testimonials = null,
    ctaSection = null,
    showContactForm = true,
}: ServicePageProps) {
    return (
        <main className="public-alternating-page">
            
            <section
                className="page-heading service-page-heading"
                style={{ backgroundImage: `url(${heroImage.src})` }}
            >
                <div className="service-hero-overlay" />
                <div className="container">
                    <div className="row">
                        <div className="col-md-12 service-hero-content">
                            {eyebrow && <p className="eyebrow service-eyebrow">{eyebrow}</p>}
                            <h1>{title}</h1>
                            {subtitle && <span>{subtitle}</span>}
                            {cta.href && (
                                <Link href={cta.href} className="filled-button service-hero-cta">
                                    {cta.label}
                                </Link>
                            )}
                        </div>
                    </div>
                </div>
            </section>

            
            {intro && (
                <section className="services service-intro-section">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-12">
                                <div className="section-heading service-heading-left">
                                    <p className="service-intro">{intro}</p>
                                    <h2>{offeringsHeading}</h2>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            )}

            
            {offerings.length > 0 && (
                <section className="services service-offerings">
                    <div className="container">
                        <div className="row">
                            {offerings.map((item) => (
                                <div className="col-md-4" key={item.title}>
                                    <div className="service-item">
                                        <div className="down-content">
                                            <h4>{item.title}</h4>
                                            <p>{item.description}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            
            {partner && (
                <section className="more-info">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-12">
                                <div className="more-info-content">
                                    <div className="row">
                                        <div className="col-md-6">
                                            <div className="left-image">
                                                <iframe
                                                    width="510"
                                                    height="400"
                                                    src={partner.video}
                                                    title="YouTube video player"
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
                                                    <em>{partner.title}</em>
                                                </h2>
                                                <p>{partner.description}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            )}

            
            {impact && impact.items.length > 0 && (
                <section className="services service-impact">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-12">
                                <div className="section-heading">
                                    <h2 dangerouslySetInnerHTML={{ __html: impact.heading }} />
                                </div>
                            </div>
                            {impact.items.map((item) => (
                                <div className="col-md-4" key={item.title}>
                                    <div className="service-item1 service-impact-item">
                                        {item.image && <img src={item.image.src} alt={item.title} />}
                                        <p className="service-impact-text">
                                            <strong>{item.title}</strong>
                                            <br />
                                            {item.description}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            
            {industries && industries.images.length > 0 && (
                <section className="services service-industries">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-12">
                                <div className="section-heading">
                                    <h2 dangerouslySetInnerHTML={{ __html: industries.heading }} />
                                    {industries.description && <p>{industries.description}</p>}
                                </div>
                            </div>
                            {industries.images.map((img, i) => (
                                <div className="col-md-4" key={`industry-${i}`}>
                                    <div className="service-item">
                                        <img src={img.src} alt={`Industry ${i + 1}`} />
                                    </div>
                                </div>
                            ))}
                            {industries.footerTitle && (
                                <div className="col-md-12">
                                    <div className="section-heading service-industries-footer">
                                        <p>
                                            <strong>{industries.footerTitle}</strong>
                                        </p>
                                        {industries.footerDescription && <p>{industries.footerDescription}</p>}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </section>
            )}

            
            {testimonials && testimonials.items.length > 0 && (
                <section className="testimonials">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-12">
                                <div className="section-heading">
                                    <h2 dangerouslySetInnerHTML={{ __html: testimonials.heading }} />
                                    {testimonials.subheading && <span>{testimonials.subheading}</span>}
                                </div>
                            </div>
                            {testimonials.items.map((item) => (
                                <div className="col-md-6" key={item.title}>
                                    <div className="testimonial-item">
                                        <div className="inner-content">
                                            <h4>{item.title}</h4>
                                            <p>{item.quote}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            
            {ctaSection && (
                <section className="services service-cta">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-12">
                                <div className="section-heading service-cta-section">
                                    <h3>{ctaSection.title}</h3>
                                    {ctaSection.description && <p>{ctaSection.description}</p>}
                                    <div className="service-cta-buttons">
                                        {ctaSection.buttons.map((btn) => (
                                            <Link
                                                key={`${btn.href}-${btn.label}`}
                                                href={btn.href}
                                                className={
                                                    btn.variant === "outline"
                                                        ? "service-outline-button"
                                                        : "filled-button service-cta-button"
                                                }
                                            >
                                                {btn.label}
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            )}

            
            {showContactForm && <ContactUs />}
        </main>
    );
}

