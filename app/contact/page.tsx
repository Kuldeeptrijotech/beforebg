import type { Metadata } from "next";
import ContactUs from "../components/ContactUs";
import PageHero from "../components/common/PageHero";

export const metadata: Metadata = {
  title: "Contact",
  description: "Contact Trijotech for SAP consulting, implementation, support, and technology solutions.",
};

export default function ContactPage() {
  return (
    <main className="contact-page">
      
      <PageHero title="Contact Us" backgroundImage="/assets/heroes/contact-generated-v2.png" className="contact-page-heading" />

      <section className="contact-information" aria-label="Contact information">
        <div className="container">
          <div className="row">
            <div className="col-md-4">
              <article className="contact-item ">
                <i className="fa fa-phone !text-emerald-400" aria-hidden="true" />
                <h4 className="!text-[#0f172a]">Phone</h4>
                <a href="tel:+911203506433" className="!text-emerald-400 hover:!text-emerald-500">+91 120-3506433</a>
                <a href="tel:+917982531976" className="!text-emerald-400 hover:!text-emerald-500">+91 7982531976</a>
              </article>
            </div>
            <div className="col-md-4">
              <article className="contact-item">
                <i className="fa fa-envelope !text-emerald-400" aria-hidden="true" />
                <h4 className="!text-[#0f172a]">Email</h4>
                <a href="mailto:sales@trijotech.com" className="!text-emerald-400 hover:!text-emerald-500">sales@trijotech.com</a>
              </article>
            </div>
            <div className="col-md-4">
              <article className="contact-item">
                <i className="fa fa-map-marker !text-emerald-400" aria-hidden="true" />
                <h4 className="!text-[#0f172a]">Corporate Address</h4>
                <p className="text-slate-700">C56A, Infinity Tecnopark, 501, 16, C Block, Phase 2, Sector 62, Noida, Uttar Pradesh 201309</p>
              </article>
            </div>
          </div>
        </div>
      </section>

      <ContactUs showInquiryDropdown />
    </main>
  );
}
