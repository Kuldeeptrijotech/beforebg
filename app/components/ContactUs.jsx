"use client";

import { useRef, useState } from "react";
import TurnstileWidget from "./TurnstileWidget";

export default function ContactUs({
    heading = "Contact Us",
    description = "Fill in the form provided, and we will contact you within one to two business days.",
    variant = "default",
    showResume = false,
    showInquiryDropdown = false,
    hideHeading = false,
}) {
    const isCareer = variant === "career" || showResume;
    const sectionClass = `contact-us-section callback-form contact-us ${variant === "industry" ? "industry-contact" : ""}`;
    const formRef = useRef(null);
    const [captchaToken, setCaptchaToken] = useState("");
    const [captchaKey, setCaptchaKey] = useState(0);
    const [status, setStatus] = useState({ type: "", message: "" });
    const [submitting, setSubmitting] = useState(false);

    async function handleSubmit(event) {
        event.preventDefault();
        setStatus({ type: "", message: "" });
        if (!captchaToken) {
            setStatus({ type: "error", message: "Please complete the human verification." });
            return;
        }

        const form = event.currentTarget;
        const data = new FormData(form);
        data.set("captchaToken", captchaToken);
        setSubmitting(true);

        try {
            const response = await fetch(isCareer ? "/api/forms/careers" : "/api/forms/contact", {
                method: "POST",
                body: data,
            });
            const result = await response.json();
            if (!response.ok) throw new Error(result.error || "Unable to submit the form.");
            form.reset();
            setCaptchaToken("");
            setCaptchaKey((value) => value + 1);
            setStatus({ type: "success", message: result.message });
        } catch (error) {
            setStatus({ type: "error", message: error instanceof Error ? error.message : "Unable to submit the form." });
            setCaptchaToken("");
            setCaptchaKey((value) => value + 1);
        } finally {
            setSubmitting(false);
        }
    }

    return (
        <section className={sectionClass}>
            <div className="container">
                <div className="row">
                    {!hideHeading && (
                        <div className="col-md-12">
                            <div className="section-heading">
                                <h2>{heading.split(" ").slice(0, -1).join(" ")} <em>{heading.split(" ").slice(-1)[0]}</em></h2>
                                {description && <p>{description}</p>}
                            </div>
                        </div>
                    )}
                    <div className="col-md-12">
                        <div className="contact-form">
                            <form ref={formRef} id={`contact-${variant}`} onSubmit={handleSubmit} encType="multipart/form-data">
                                <div className="row">
                                    <div className="col-lg-4 col-md-12 col-sm-12"><fieldset><input name="name" type="text" className="form-control" placeholder="Full Name" minLength={2} maxLength={100} required /></fieldset></div>
                                    <div className="col-lg-4 col-md-12 col-sm-12"><fieldset><input name="email" type="email" className="form-control" placeholder="E-Mail Address" maxLength={254} required /></fieldset></div>
                                    <div className="col-lg-4 col-md-12 col-sm-12"><fieldset><input name="phone" type="tel" className="form-control" placeholder="Phone Number" pattern="[+0-9()\-\s]{7,25}" required /></fieldset></div>

                                    {!isCareer && <div className="col-lg-6 col-md-12 col-sm-12"><fieldset><input name="company" type="text" className="form-control" placeholder="Company Name (Optional)" maxLength={120} /></fieldset></div>}
                                    {!isCareer && <div className="col-lg-6 col-md-12 col-sm-12"><fieldset><input name="subject" type="text" className="form-control" placeholder="Subject" minLength={3} maxLength={160} required /></fieldset></div>}

                                    {showInquiryDropdown && <div className="col-lg-12 col-md-12 col-sm-12"><fieldset><select name="inquiryType" className="form-control" defaultValue="" required><option value="" disabled>Select Inquiry Type</option><option value="SAP Implementation">SAP Implementation</option><option value="SAP Support">SAP Support</option><option value="SAP BTP Full Stack Application">SAP BTP Full Stack Application</option><option value="Products">Products</option><option value="Careers">Careers</option><option value="Other">Other</option></select></fieldset></div>}

                                    {isCareer && <><div className="col-lg-6 col-md-12 col-sm-12"><fieldset><select name="position" className="form-control" defaultValue="" required><option value="" disabled>Select Position</option><option value="SAP Functional Consultant">SAP Functional Consultant</option><option value="SAP Technical Consultant">SAP Technical Consultant</option><option value="SAP Developer">SAP Developer</option><option value="Business Analyst">Business Analyst</option><option value="Other">Other</option></select></fieldset></div><div className="col-lg-6 col-md-12 col-sm-12"><fieldset><input name="experience" type="number" className="form-control" placeholder="Years of Experience" min="0" max="60" step="0.5" required /></fieldset></div><div className="col-lg-6 col-md-12 col-sm-12"><fieldset><input name="company" type="text" className="form-control" placeholder="Current Company (Optional)" maxLength={120} /></fieldset></div><div className="col-lg-6 col-md-12 col-sm-12"><fieldset><input name="location" type="text" className="form-control" placeholder="Current Location (Optional)" maxLength={120} /></fieldset></div></>}

                                    <div className="col-lg-12"><fieldset><textarea name="message" rows={6} className="form-control" placeholder={isCareer ? "Message / Cover Letter" : "Your Message"} minLength={10} maxLength={5000} required /></fieldset></div>
                                    {isCareer && <div className="col-lg-12"><fieldset><label className="file-label" htmlFor="career-resume">Upload Resume (PDF, DOC or DOCX, max 5 MB)</label><input id="career-resume" type="file" name="resume" className="form-control" accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document" required /></fieldset></div>}
                                    <div className="form-honeypot" aria-hidden="true"><label>Website<input name="website" type="text" tabIndex={-1} autoComplete="off" /></label></div>
                                    <div className="col-lg-12"><fieldset className="form-consent"><label><input name="consent" type="checkbox" value="yes" required /> <span>I consent to Trijotech using this information to respond to my {isCareer ? "application" : "enquiry"}.</span></label></fieldset></div>
                                    <div className="col-lg-12"><TurnstileWidget key={captchaKey} action={isCareer ? "career_form" : "contact_form"} onToken={setCaptchaToken} /></div>
                                    {status.message && <div className="col-lg-12"><p className={`form-status form-status-${status.type}`} role="status" aria-live="polite">{status.message}</p></div>}
                                    <div className="col-lg-12"><fieldset><button type="submit" className="filled-button" disabled={submitting}>{submitting ? "Sending..." : isCareer ? "Submit Application" : "Send Message"}</button></fieldset></div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
