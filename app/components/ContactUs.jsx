"use client";

import { useRef, useState } from "react";

export default function ContactUs({
    heading = "Contact Us",
    description = "Fill in the form provided, and we will contact you within one to two business days.",
    variant = "default",
    showResume = false,
    showInquiryDropdown = false,
    hideHeading = false,
}) {
    const isCareer = variant === "career" || showResume;
    const sectionClass = "w-full bg-transparent p-0 text-slate-900";
    const fieldColumn = "w-full px-[5px] md:w-1/2 md:max-w-1/2 md:basis-1/2";
    const fullColumn = "w-full px-[5px] md:max-w-full md:basis-full";
    const controlClass = "m-0 h-[46px] w-full rounded-[10px] border border-[#b5cee2] bg-white px-[14px] text-[14px] text-[#16324a] outline-none transition-[border-color,box-shadow] duration-200 placeholder:text-slate-500 focus:border-cyan-600 focus:shadow-[0_0_0_3px_rgba(8,145,178,.14)]";
    const formRef = useRef(null);
    const [status, setStatus] = useState({ type: "", message: "" });
    const [submitting, setSubmitting] = useState(false);

    async function handleSubmit(event) {
        event.preventDefault();
        setStatus({ type: "", message: "" });
        const form = event.currentTarget;
        const data = new FormData(form);
        setSubmitting(true);

        try {
            const response = await fetch(isCareer ? "/api/forms/careers" : "/api/forms/contact", {
                method: "POST",
                body: data,
            });
            const result = await response.json();
            if (!response.ok) throw new Error(result.error || "Unable to submit the form.");
            form.reset();
            setStatus({ type: "success", message: result.message });
        } catch (error) {
            setStatus({ type: "error", message: error instanceof Error ? error.message : "Unable to submit the form." });
        } finally {
            setSubmitting(false);
        }
    }

    return (
        <section className={sectionClass}>
            <div className="w-full max-w-none p-0">
                <div className="m-0 flex flex-wrap">
                    {!hideHeading && (
                        <div className="w-full p-0">
                            <div>
                                <h2>{heading.split(" ").slice(0, -1).join(" ")} <em>{heading.split(" ").slice(-1)[0]}</em></h2>
                                {description && <p>{description}</p>}
                            </div>
                        </div>
                    )}
                    <div className="w-full p-0">
                        <div className="mx-auto max-w-[920px] rounded-[22px] border border-[#bfdbeb] bg-[linear-gradient(145deg,#f8fcff,#eef7fc)] p-[clamp(18px,3vw,30px)] shadow-[0_16px_38px_rgba(8,47,73,.1)]">
                            <form ref={formRef} id={`contact-${variant}`} onSubmit={handleSubmit} encType="multipart/form-data">
                                <div className="-mx-[5px] flex flex-wrap gap-y-[3px]">
                                    <div className={fieldColumn}><fieldset className="m-0"><input name="name" type="text" className={controlClass} placeholder="Full Name" minLength={2} maxLength={100} required /></fieldset></div>
                                    <div className={fieldColumn}><fieldset className="m-0"><input name="email" type="email" className={controlClass} placeholder="E-Mail Address" maxLength={254} required /></fieldset></div>
                                    <div className={fieldColumn}><fieldset className="m-0"><input name="phone" type="tel" className={controlClass} placeholder="Phone Number" pattern="[+0-9()\-\s]{7,25}" required /></fieldset></div>

                                    {!isCareer && <div className={fieldColumn}><fieldset className="m-0"><input name="company" type="text" className={controlClass} placeholder="Company Name (Optional)" maxLength={120} /></fieldset></div>}
                                    {!isCareer && <div className={fieldColumn}><fieldset className="m-0"><input name="subject" type="text" className={controlClass} placeholder="Subject" minLength={3} maxLength={160} required /></fieldset></div>}

                                    {showInquiryDropdown && <div className={fieldColumn}><fieldset className="m-0"><select name="inquiryType" className={controlClass} defaultValue="" required><option value="" disabled>Select Inquiry Type</option><option value="SAP Implementation">SAP Implementation</option><option value="SAP Support">SAP Support</option><option value="SAP BTP Full Stack Application">SAP BTP Full Stack Application</option><option value="Products">Products</option><option value="Careers">Careers</option><option value="Other">Other</option></select></fieldset></div>}

                                    {isCareer && <><div className={fieldColumn}><fieldset className="m-0"><select name="position" className={controlClass} defaultValue="" required><option value="" disabled>Select Position</option><option value="SAP Functional Consultant">SAP Functional Consultant</option><option value="SAP Technical Consultant">SAP Technical Consultant</option><option value="SAP Developer">SAP Developer</option><option value="Business Analyst">Business Analyst</option><option value="Other">Other</option></select></fieldset></div><div className={fieldColumn}><fieldset className="m-0"><input name="experience" type="number" className={controlClass} placeholder="Years of Experience" min="0" max="60" step="0.5" required /></fieldset></div><div className={fieldColumn}><fieldset className="m-0"><input name="company" type="text" className={controlClass} placeholder="Current Company (Optional)" maxLength={120} /></fieldset></div></>}

                                    <div className={fullColumn}><fieldset className="m-0"><textarea name="message" rows={6} className={`${controlClass} h-24 min-h-24 resize-y py-3`} placeholder={isCareer ? "Message / Cover Letter" : "Your Message"} minLength={10} maxLength={5000} required /></fieldset></div>
                                    {isCareer && <div className={fullColumn}><fieldset className="m-0"><label className="mb-[5px] block text-[13px] font-semibold text-slate-700" htmlFor="career-resume">Upload Resume (PDF, DOC or DOCX, max 5 MB)</label><input id="career-resume" type="file" name="resume" className={`${controlClass} h-[42px] px-[9px] py-[7px]`} accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document" required /></fieldset></div>}
                                    <div className="pointer-events-none absolute h-px w-px overflow-hidden whitespace-nowrap [clip:rect(0_0_0_0)]" aria-hidden="true"><label>Website<input name="website" type="text" tabIndex={-1} autoComplete="off" /></label></div>
                                    <div className={fullColumn}><fieldset className="m-0"><label className="flex items-start gap-2 text-[13px] leading-[1.45] text-slate-700"><input className="mt-[3px] shrink-0" name="consent" type="checkbox" value="yes" required /> <span>I consent to Trijotech using this information to respond to my {isCareer ? "application" : "enquiry"}.</span></label></fieldset></div>
                                    {status.message && <div className={fullColumn}><p className={`mb-5 rounded-md px-4 py-3 text-sm ${status.type === "success" ? "bg-[#e9f8f0] text-[#075f3e]" : "bg-[#fff0f0] text-[#8a1f1f]"}`} role="status" aria-live="polite">{status.message}</p></div>}
                                    <div className={`${fullColumn} flex justify-center`}><fieldset className="m-0"><button type="submit" className="inline-flex min-h-11 w-full min-w-[190px] items-center justify-center rounded-xl border border-cyan-700 bg-[linear-gradient(135deg,#0891b2,#0e7490)] px-6 text-[14px] font-bold tracking-[.01em] text-white shadow-[0_8px_18px_rgba(8,145,178,.22)] transition duration-200 hover:-translate-y-px hover:brightness-[1.06] hover:shadow-[0_11px_22px_rgba(8,145,178,.27)] disabled:cursor-not-allowed disabled:opacity-65 disabled:transform-none md:w-auto" disabled={submitting}>{submitting ? "Sending..." : isCareer ? "Submit Application" : "Send Message"}</button></fieldset></div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
