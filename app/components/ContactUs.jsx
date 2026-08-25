"use client";

import { useEffect, useRef, useState } from "react";
import { Check, ChevronDown, FileText, Upload } from "lucide-react";

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
                type="hidden"
                name={name}
                value={selected}
                onChange={() => {}}
                tabIndex={-1}
                className="absolute inset-0 opacity-0 pointer-events-none h-full w-full"
                aria-hidden="true"
            />
            <button
                type="button"
                onClick={() => setIsOpen((prev) => !prev)}
                className={`${controlClass} contact-custom-select-trigger flex items-center justify-between text-left cursor-pointer transition-colors ${
                    !selected ? "text-slate-400" : "text-white"
                } ${isOpen ? "border-white ring-2 ring-[#ffffff]/20" : ""}`}
                aria-haspopup="listbox"
                aria-expanded={isOpen}
                aria-required={required}
            >
                <span className={`contact-custom-select-value truncate ${selected ? "is-selected" : "is-placeholder"}`}>{selected || placeholder}</span>
                <ChevronDown
                    className={`h-4 w-4 shrink-0 text-slate-400 transition-transform duration-200 ${
                        isOpen ? "rotate-180 text-white" : ""
                    }`}
                />
            </button>

            {isOpen && (
                <div className="contact-custom-select-menu absolute left-0 right-0 top-[calc(100%+6px)] z-50 overflow-hidden rounded-2xl border border-white/15 bg-[#0b1d33] p-1.5 shadow-[0_20px_50px_rgba(0,0,0,0.85)] backdrop-blur-2xl animate-in fade-in duration-150">
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
                                    className={`contact-custom-select-option flex items-center justify-between rounded-xl px-3.5 py-2.5 text-[14px] cursor-pointer transition-all duration-150 ${
                                        isSelected
                                            ? "bg-white/20 font-semibold text-white"
                                            : "text-slate-200 hover:bg-white/[0.08] hover:text-white"
                                    }`}
                                >
                                    <span>{option}</span>
                                    {isSelected && <Check className="h-4 w-4 text-white" />}
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
    const controlClass = "contact-form-control m-0 h-[48px] w-full rounded-xl border border-white/12 bg-white/[0.05] px-4 text-[14px] text-white outline-none transition-all duration-200 placeholder:text-slate-400 backdrop-blur-md focus:border-white focus:bg-white/[0.08] focus:shadow-[0_0_0_3px_rgba(255, 255, 255,0.25)]";
    const formRef = useRef(null);
    const fileInputRef = useRef(null);
    const [selectedFile, setSelectedFile] = useState(null);
    const [status, setStatus] = useState({ type: "", message: "" });
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        const form = formRef.current;
        if (!form) return;
        const handleReset = () => setSelectedFile(null);
        form.addEventListener("reset", handleReset);
        return () => form.removeEventListener("reset", handleReset);
    }, []);

    const handleFileChange = (e) => {
        const file = e.target.files?.[0];
        setSelectedFile(file || null);
    };

    const formatFileSize = (bytes) => {
        if (!bytes) return "";
        if (bytes < 1024) return `${bytes} B`;
        if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
        return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
    };

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
            setSelectedFile(null);
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
                            <h2 className="text-3xl font-bold text-white">{heading.split(" ").slice(0, -1).join(" ")} <em className="text-white not-italic">{heading.split(" ").slice(-1)[0]}</em></h2>
                            {description && <p className="mt-3 text-slate-300 max-w-2xl mx-auto">{description}</p>}
                        </div>
                    )}
                    <div className="w-full p-0">
                        <div className="contact-form-panel mx-auto max-w-[920px] rounded-[28px] border border-white/12 bg-white/[0.04] p-[clamp(20px,4vw,40px)] shadow-2xl backdrop-blur-xl">
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
                                                <label className="mb-2 block text-[13px] font-semibold text-slate-300" htmlFor="career-resume">
                                                    Upload Resume (PDF, DOC or DOCX, max 5 MB)
                                                </label>
                                                <div className="career-upload-zone group relative flex min-h-[140px] w-full flex-col items-center justify-center rounded-2xl border-2 border-dashed border-white/15 bg-white/[0.03] p-6 text-center backdrop-blur-md transition-all duration-200 hover:border-white/60 hover:bg-white/[0.06] focus-within:border-white focus-within:shadow-[0_0_0_3px_rgba(255, 255, 255,0.25)]">
                                                    <input
                                                        ref={fileInputRef}
                                                        id="career-resume"
                                                        type="file"
                                                        name="resume"
                                                        onChange={handleFileChange}
                                                        accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                                                        required
                                                        className="absolute inset-0 z-10 h-full w-full cursor-pointer opacity-0"
                                                        title=""
                                                    />

                                                    {selectedFile ? (
                                                        <div className="flex flex-col items-center justify-center gap-2">
                                                            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/20 text-white ring-1 ring-[#ffffff]/40 shadow-inner">
                                                                <FileText className="h-6 w-6 text-white" />
                                                            </div>
                                                            <div className="text-center">
                                                                <p className="max-w-[260px] truncate text-sm font-semibold text-white sm:max-w-md">
                                                                    {selectedFile.name}
                                                                </p>
                                                                <p className="mt-0.5 text-xs text-white">
                                                                    {formatFileSize(selectedFile.size)}
                                                                </p>
                                                            </div>
                                                            <div className="mt-2 inline-flex items-center gap-1.5 rounded-lg border border-white/40 bg-white/20 px-3.5 py-1.5 text-xs font-semibold text-white transition-colors group-hover:bg-white group-hover:text-slate-900">
                                                                <Upload className="h-3.5 w-3.5" />
                                                                <span>Change File</span>
                                                            </div>
                                                        </div>
                                                    ) : (
                                                        <div className="flex flex-col items-center justify-center gap-2.5">
                                                            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/15 text-white ring-1 ring-[#ffffff]/30 transition-transform duration-200 group-hover:scale-110">
                                                                <Upload className="h-5 w-5" />
                                                            </div>
                                                            <div className="inline-flex items-center justify-center gap-2 rounded-xl bg-white/20 px-5 py-2.5 text-xs sm:text-sm font-semibold text-white ring-1 ring-[#ffffff]/40 shadow-sm transition-all group-hover:bg-white group-hover:text-slate-950">
                                                                <Upload className="h-4 w-4" />
                                                                <span>Choose File</span>
                                                            </div>
                                                            <p className="career-upload-help text-xs text-slate-400">
                                                                or drag and drop your file here (PDF, DOC or DOCX up to 5 MB)
                                                            </p>
                                                        </div>
                                                    )}
                                                </div>
                                            </fieldset>
                                        </div>
                                    )}
                                    <div className="pointer-events-none absolute h-px w-px overflow-hidden whitespace-nowrap [clip:rect(0_0_0_0)]" aria-hidden="true"><label>Website<input name="website" type="text" tabIndex={-1} autoComplete="off" /></label></div>
                                    <div className={fullColumn}>
                                        <fieldset className="m-0">
                                            <label className="contact-consent flex items-start gap-2.5 text-[13px] leading-[1.45] text-black">
                                                <input className="mt-1 h-4 w-4 rounded border-white/20 bg-white/10 text-white focus:ring-[#ffffff]" name="consent" type="checkbox" value="yes" required />
                                                <span>I consent to Trijotech using this information to respond to my {isCareer ? "application" : "enquiry"}.</span>
                                            </label>
                                        </fieldset>
                                    </div>
                                    {status.message && (
                                        <div className={fullColumn}>
                                            <p className={`rounded-xl px-4 py-3 text-sm font-medium ${status.type === "success" ? "border border-white/40 bg-white/15 text-white" : "border border-rose-500/40 bg-rose-500/15 text-rose-300"}`} role="status" aria-live="polite">
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
