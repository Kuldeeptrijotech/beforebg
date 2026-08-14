import type { Metadata } from "next";
import ContactUs from "../components/ContactUs";
import PageHero from "../components/common/PageHero";

export const metadata: Metadata = {
  title: "Careers",
  description: "Join the Trijotech team and build your career in SAP consulting and technology solutions.",
};

export default function CareersPage() {
  return (
    <main className="careers-page">
      
      <PageHero title="Careers" backgroundImage="/assets/heroes/careers-generated-v2.png" className="header-text p-h-img-carrer" />


      <section className="services careers-intro-section">
        <div className="container">
          <div className="section-heading">
            <p>
              Would you like to join our team?<br />
              Feel free to reach out to{" "}
              <a href="mailto:hr@trijotech.com" className="career-email-link">hr@trijotech.com</a>{" "}
              or fill out the form below — we’ll get in touch to discuss further.
            </p>
          </div>
          <ContactUs variant="career" showResume hideHeading />
        </div>
      </section>
    </main>
  );
}
