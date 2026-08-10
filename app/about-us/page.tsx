import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import ContactCta from "../components/common/ContactCta";
import TeamGallery from "../components/TeamGallery";

export const metadata: Metadata = {
  title: "About Us | Trijotech",
  description:
    "Meet Trijotech, an SAP consulting partner helping organizations simplify transformation through practical expertise, collaboration, and accountable delivery.",
};

const values = [
  {
    number: "01",
    title: "Own the Outcome",
    description: "We take responsibility from the first conversation through delivery, adoption, and measurable business value.",
  },
  {
    number: "02",
    title: "Keep It Practical",
    description: "We turn complex SAP and data challenges into clear, maintainable solutions that teams can confidently use.",
  },
  {
    number: "03",
    title: "Build Together",
    description: "We work as an extension of your team, sharing knowledge and making decisions with transparency at every stage.",
  },
];

const leadership = [
  {
    name: "Rakesh Kumar",
    role: "Managing Director",
    image: "/assets/images/team_01.jpg",
    description: "Rakesh leads with accountability, business ownership, and a practical focus on SAP transformation that delivers measurable value.",
  },
  {
    name: "Anjali Patel",
    role: "CEO & Co-Founder",
    image: "/assets/images/team_02.jpg",
    description: "Anjali builds trusted partnerships and ensures every engagement balances strategy, delivery, and lasting adoption.",
  },
  {
    name: "Priya Sharma",
    role: "Director of Customer Success",
    image: "/assets/images/team_03.jpg",
    description: "Priya helps clients turn programs into sustainable change, with a strong emphasis on adoption, support, and continuous improvement.",
  },
];

export default function AboutUsPage() {
  return (
    <main className="about-page">
      <section className="about-hero">
        <Image
          src="/assets/about/trijotech-team-collaboration-blue.png"
          alt="Trijotech consultants collaborating on enterprise technology solutions"
          fill
          priority
          sizes="100vw"
          className="about-hero-image"
        />
        <div className="about-hero-overlay" />
        <div className="container about-hero-content">
          <span className="about-eyebrow">About Trijotech</span>
          <h1>Technology expertise.<br /><em>Business ownership.</em></h1>
          <p>We help ambitious organizations make SAP transformation simpler, faster, and more valuable—without losing sight of the people who use it.</p>
          <Link href="/contact" className="filled-button">Talk to Our Team</Link>
        </div>
      </section>

      <section className="about-intro">
        <div className="container">
          <div className="about-intro-grid">
            <div>
              <span className="about-eyebrow">Who We Are</span>
              <h2>A trusted partner for your <em>digital journey</em></h2>
            </div>
            <div className="about-intro-copy">
              <p>Trijotech is a technology consulting company focused on SAP, enterprise data, analytics, integration, and intelligent automation. We combine deep functional understanding with hands-on engineering to solve the challenges that matter most to your business.</p>
              <p>Our consultants bring global experience and a collaborative mindset to every engagement. Whether you are modernizing a core platform, improving planning and reporting, or building new capabilities on SAP BTP, we stay close to the outcome from strategy through support.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="about-purpose">
        <div className="container">
          <div className="section-heading">
            <h2>Our Vision, <em>Mission &amp; Values</em></h2>
            <p>The principles that guide every engagement and long-term client partnership.</p>
          </div>
          <div className="about-purpose-grid">
            <div className="about-purpose-card">
              <span className="about-eyebrow">Our Vision</span>
              <h2>To be a trusted partner in digital transformation, delivering intelligent solutions that create long-term value.</h2>
            </div>
            <div className="about-purpose-card about-purpose-card-accent">
              <span className="about-eyebrow">Our Mission</span>
              <h2>We empower businesses with innovative SAP solutions and financial expertise to drive efficiency, transparency and growth.</h2>
            </div>
            <div className="about-purpose-card">
              <span className="about-eyebrow">Our Values</span>
              <h2>Integrity, excellence, collaboration, innovation and customer success.</h2>
            </div>
          </div>
        </div>
      </section>

      <section className="about-values">
        <div className="container">
          <div className="section-heading">
            <h2>How We <em>Work</em></h2>
            <p>Simple principles guide our teams and every client relationship.</p>
          </div>
          <div className="about-values-grid">
            {values.map((value) => (
              <article className="about-value-card" key={value.number}>
                <span>{value.number}</span>
                <h3>{value.title}</h3>
                <p>{value.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="about-leadership">
        <div className="container">
          <div className="section-heading">
            <h2>Leadership <em>That Builds Trust</em></h2>
            <p>Our leadership team pairs deep SAP experience with a practical focus on predictable delivery and long-term client success.</p>
          </div>
          <div className="about-leadership-grid">
            {leadership.map((leader) => (
              <article className="about-leadership-card" key={leader.name}>
                <div className="leadership-card-figure">
                  <Image
                    src={leader.image}
                    alt={`Photo of ${leader.name}`}
                    width={120}
                    height={120}
                    className="leadership-avatar"
                  />
                </div>
                <div className="leadership-card-copy">
                  <h3>{leader.name}</h3>
                  <p className="leadership-role">{leader.role}</p>
                  <p>{leader.description}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <TeamGallery />

      <ContactCta />
    </main>
  );
}
