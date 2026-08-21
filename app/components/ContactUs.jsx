"use client";

import { useEffect, useRef, useState } from "react";
import { Check, ChevronDown } from "lucide-react";

function CustomSelect({ name, placeholder, options, required = false, controlClass }) {
    const [isOpen, setIsOpen] = useState(false);
    const [selected, setSelected] = useState("");
    const dropdownRef = useRef(null);

    useEffect(() => {
        function handleClickOutside(event) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    // Reset dropdown selection on form reset
    useEffect(() => {
        const form = dropdownRef.current?.closest("form");
        if (!form) return;
        const handleReset = () => setSelected("");
        form.addEventListener("reset", handleReset);
        return () => form.removeEventListener("reset", handleReset);
    }, []);

    return (
        <div ref={dropdownRef} className="relative w-full">
            <input
                type="text"
                name={name}
                value={selected}
                required={required}
                onChange={() => {}}
                tabIndex={-1}
                className="absolute inset-0 opacity-0 pointer-events-none h-full w-full"
                aria-hidden="true"
            />
            <button
                type="button"
                onClick={() => setIsOpen((prev) => !prev)}
                className={`${controlClass} flex items-center justify-between text-left cursor-pointer transition-colors ${
                    !selected ? "text-slate-400" : "text-white"
                } ${isOpen ? "border-[#29ab87] ring-2 ring-[#29ab87]/20" : ""}`}
                aria-haspopup="listbox"
                aria-expanded={isOpen}
            >
                <span className="truncate">{selected || placeholder}</span>
                <ChevronDown
                    className={`h-4 w-4 shrink-0 text-slate-400 transition-transform duration-200 ${
                        isOpen ? "rotate-180 text-[#29ab87]" : ""
                    }`}
                />
            </button>

            {isOpen && (
                <div className="absolute left-0 right-0 top-[calc(100%+6px)] z-50 overflow-hidden rounded-2xl border border-white/15 bg-[#0b1d33] p-1.5 shadow-[0_20px_50px_rgba(0,0,0,0.85)] backdrop-blur-2xl animate-in fade-in duration-150">
                    <ul role="listbox" className="max-h-60 overflow-y-auto space-y-1">
                        {options.map((option) => {
                            const isSelected = selected === option;
                            return (
                                <li
                                    key={option}
                                    role="option"
                                    aria-selected={isSelected}
                                    onClick={() => {
                                        setSelected(option);
                                        setIsOpen(false);
                                    }}
                                    className={`flex items-center justify-between rounded-xl px-3.5 py-2.5 text-[14px] cursor-pointer transition-all duration-150 ${
                                        isSelected
                                            ? "bg-[#29ab87]/20 font-semibold text-[#7edcc2]"
                                            : "text-slate-200 hover:bg-white/[0.08] hover:text-white"
                                    }`}
                                >
                                    <span>{option}</span>
                                    {isSelected && <Check className="h-4 w-4 text-[#29ab87]" />}
                                </li>
                            );
                        })}
                    </ul>
                </div>
            )}
        </div>
    );
}

export default function ContactUs({
    heading = "Contact Us",
    description = "Fill in the form provided, and we will contact you within one to two business days.",
    variant = "default",
    showResume = false,
    showInquiryDropdown = false,
    hideHeading = false,
}) {
    const isCareer = variant === "career" || showResume;
    const sectionClass = "w-full bg-transparent p-0 text-white";
    const fieldColumn = "w-full px-2 md:w-1/2 md:max-w-1/2 md:basis-1/2";
    const fullColumn = "w-full px-2 md:max-w-full md:basis-full";
    const controlClass = "m-0 h-[48px] w-full rounded-xl border border-white/12 bg-white/[0.05] px-4 text-[14px] text-white outline-none transition-all duration-200 placeholder:text-slate-400 backdrop-blur-md focus:border-[#29ab87] focus:bg-white/[0.08] focus:shadow-[0_0_0_3px_rgba(41,171,135,0.25)]";
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
                        <div className="w-full p-0 mb-8 text-center">
                            <h2 className="text-3xl font-bold text-white">{heading.split(" ").slice(0, -1).join(" ")} <em className="text-[#7edcc2] not-italic">{heading.split(" ").slice(-1)[0]}</em></h2>
                            {description && <p className="mt-3 text-slate-300 max-w-2xl mx-auto">{description}</p>}
                        </div>
                    )}
                    <div className="w-full p-0">
                        <div className="mx-auto max-w-[920px] rounded-[28px] border border-white/12 bg-white/[0.04] p-[clamp(20px,4vw,40px)] shadow-2xl backdrop-blur-xl">
                            <form ref={formRef} id={`contact-${variant}`} onSubmit={handleSubmit} encType="multipart/form-data">
                                <div className="-mx-2 flex flex-wrap gap-y-4">
                                    <div className={fieldColumn}><fieldset className="m-0"><input name="name" type="text" className={controlClass} placeholder="Full Name" minLength={2} maxLength={100} required /></fieldset></div>
                                    <div className={fieldColumn}><fieldset className="m-0"><input name="email" type="email" className={controlClass} placeholder="E-Mail Address" maxLength={254} required /></fieldset></div>
                                    <div className={fieldColumn}><fieldset className="m-0"><input name="phone" type="tel" className={controlClass} placeholder="Phone Number" pattern="[+0-9()\-\s]{7,25}" required /></fieldset></div>

                                    {!isCareer && <div className={fieldColumn}><fieldset className="m-0"><input name="company" type="text" className={controlClass} placeholder="Company Name (Optional)" maxLength={120} /></fieldset></div>}
                                    {!isCareer && <div className={fieldColumn}><fieldset className="m-0"><input name="subject" type="text" className={controlClass} placeholder="Subject" minLength={3} maxLength={160} required /></fieldset></div>}

                                    {showInquiryDropdown && (
                                        <div className={fieldColumn}>
                                            <fieldset className="m-0">
                                                <CustomSelect
                                                    name="inquiryType"
                                                    placeholder="Select Inquiry Type"
                                                    controlClass={controlClass}
                                                    options={[
                                                        "SAP Implementation",
                                                        "SAP Support",
                                                        "SAP BTP Full Stack Application",
                                                        "Products",
                                                        "Careers",
                                                        "Other"
                                                    ]}
                                                    required
                                                />
                                            </fieldset>
                                        </div>
                                    )}

                                    {isCareer && (
                                        <>
                                            <div className={fieldColumn}>
                                                <fieldset className="m-0">
                                                    <CustomSelect
                                                        name="position"
                                                        placeholder="Select Position"
                                                        controlClass={controlClass}
                                                        options={[
                                                            "SAP Functional Consultant",
                                                            "SAP Technical Consultant",
                                                            "SAP Developer",
                                                            "Business Analyst",
                                                            "Other"
                                                        ]}
                                                        required
                                                    />
                                                </fieldset>
                                            </div>
                                            <div className={fieldColumn}><fieldset className="m-0"><input name="experience" type="number" className={controlClass} placeholder="Years of Experience" min="0" max="60" step="0.5" required /></fieldset></div>
                                            <div className={fieldColumn}><fieldset className="m-0"><input name="company" type="text" className={controlClass} placeholder="Current Company (Optional)" maxLength={120} /></fieldset></div>
                                        </>
                                    )}

                                    <div className={fullColumn}><fieldset className="m-0"><textarea name="message" rows={5} className={`${controlClass} h-28 min-h-28 resize-y py-3`} placeholder={isCareer ? "Message / Cover Letter" : "Your Message"} minLength={10} maxLength={5000} required /></fieldset></div>
                                    {isCareer && (
                                        <div className={fullColumn}>
                                            <fieldset className="m-0">
                                                <label className="mb-2 block text-[13px] font-semibold text-slate-300" htmlFor="career-resume">Upload Resume (PDF, DOC or DOCX, max 5 MB)</label>
                                                <input id="career-resume" type="file" name="resume" className={`${controlClass} h-[46px] file:mr-3 file:rounded-lg file:border-0 file:bg-[#29ab87]/20 file:px-3 file:py-1 file:text-xs file:font-semibold file:text-[#7edcc2]`} accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document" required />
                                            </fieldset>
                                        </div>
                                    )}
                                    <div className="pointer-events-none absolute h-px w-px overflow-hidden whitespace-nowrap [clip:rect(0_0_0_0)]" aria-hidden="true"><label>Website<input name="website" type="text" tabIndex={-1} autoComplete="off" /></label></div>
                                    <div className={fullColumn}>
                                        <fieldset className="m-0">
                                            <label className="flex items-start gap-2.5 text-[13px] leading-[1.45] text-slate-300">
                                                <input className="mt-1 h-4 w-4 rounded border-white/20 bg-white/10 text-[#29ab87] focus:ring-[#29ab87]" name="consent" type="checkbox" value="yes" required />
                                                <span>I consent to Trijotech using this information to respond to my {isCareer ? "application" : "enquiry"}.</span>
                                            </label>
                                        </fieldset>
                                    </div>
                                    {status.message && (
                                        <div className={fullColumn}>
                                            <p className={`rounded-xl px-4 py-3 text-sm font-medium ${status.type === "success" ? "border border-[#29ab87]/40 bg-[#29ab87]/15 text-[#7edcc2]" : "border border-rose-500/40 bg-rose-500/15 text-rose-300"}`} role="status" aria-live="polite">
                                                {status.message}
                                            </p>
                                        </div>
                                    )}
                                    <div className={`${fullColumn} flex justify-center mt-2`}>
                                        <fieldset className="m-0">
                                            <button type="submit" className="tri-btn tri-btn-primary min-w-[200px] px-8 py-3.5 text-sm font-semibold tracking-wide" disabled={submitting}>
                                                {submitting ? "Sending..." : isCareer ? "Submit Application" : "Send Message"}
                                            </button>
                                        </fieldset>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
