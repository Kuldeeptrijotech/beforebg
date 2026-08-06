import type { Metadata } from "next";
import ContactUs from "../components/ContactUs";
import heroImage from "../assets/new_/contact1.png";
import PageHero from "../components/common/PageHero";

export const metadata: Metadata = {
  title: "Contact",
  description: "Contact Trijotech for SAP consulting, implementation, support, and technology solutions.",
};

export default function ContactPage() {
  return (
    <main className="contact-page">
      
      <PageHero title="Contact Us" backgroundImage={heroImage.src} className="contact-page-heading" />


      <ContactUs showInquiryDropdown />
    </main>
  );
}
