"use client";

export default function ContactUs({
    heading = "Contact Us",
    description = "Fill in the form provided, and we will contact you within one to two business days.",
    variant = "default",
    showResume = false,
    showInquiryDropdown = false,
    hideHeading = false,
}) {
    const sectionClass = `contact-us-section callback-form contact-us ${variant === "industry" ? "industry-contact" : ""}`;

    return (
        <section className={sectionClass}>
            <div className="container">
                <div className="row">
                    {!hideHeading && (
                        <div className="col-md-12">
                            <div className="section-heading">
                                <h2>
                                    {heading.split(" ").slice(0, -1).join(" ")}{" "}
                                    <em>{heading.split(" ").slice(-1)[0]}</em>
                                </h2>
                                {description && <p>{description}</p>}
                            </div>
                        </div>
                    )}
                    <div className="col-md-12">
                        <div className="contact-form">
                            <form id={`contact-${variant}`} action="/contact" method="get">
                                <div className="row">
                                    <div className="col-lg-4 col-md-12 col-sm-12">
                                        <fieldset>
                                            <input name="name" type="text" className="form-control" id="name" placeholder="Full Name" required />
                                        </fieldset>
                                    </div>
                                    <div className="col-lg-4 col-md-12 col-sm-12">
                                        <fieldset>
                                            <input name="email" type="text" className="form-control" id="email" pattern="[^ @]*@[^ @]*" placeholder="E-Mail Address" required />
                                        </fieldset>
                                    </div>
                                    <div className="col-lg-4 col-md-12 col-sm-12">
                                        <fieldset>
                                            <input name="subject" type="text" className="form-control" id="subject" placeholder="Subject" required />
                                        </fieldset>
                                    </div>
                                    {showInquiryDropdown && (
                                        <div className="col-lg-12 col-md-12 col-sm-12">
                                            <fieldset>
                                                <select name="inquiryType" className="form-control" id="inquiry-type" defaultValue="" required>
                                                    <option value="" disabled>Select Inquiry Type</option>
                                                    <option value="sap-implementation">SAP Implementation</option>
                                                    <option value="sap-support">SAP Support</option>
                                                    <option value="sap-btp">SAP BTP Full Stack Application</option>
                                                    <option value="products">Products</option>
                                                    <option value="careers">Careers</option>
                                                    <option value="other">Other</option>
                                                </select>
                                            </fieldset>
                                        </div>
                                    )}
                                    {showResume && (
                                        <div className="col-lg-12 col-md-12 col-sm-12">
                                            <fieldset>
                                                <select name="position" className="form-control" id="career-position" defaultValue="" required>
                                                    <option value="" disabled>Select Position</option>
                                                    <option value="sap-functional-consultant">SAP Functional Consultant</option>
                                                    <option value="sap-technical-consultant">SAP Technical Consultant</option>
                                                    <option value="sap-developer">SAP Developer</option>
                                                    <option value="business-analyst">Business Analyst</option>
                                                    <option value="other">Other</option>
                                                </select>
                                            </fieldset>
                                        </div>
                                    )}
                                    <div className="col-lg-12">
                                        <fieldset>
                                            <textarea name="message" rows={6} className="form-control" id="message" placeholder="Your Message" required />
                                        </fieldset>
                                    </div>
                                    {showResume && (
                                        <div className="col-lg-12">
                                            <fieldset>
                                                <label className="file-label">Upload Resume</label>
                                                <input type="file" name="resume" className="form-control" required />
                                            </fieldset>
                                        </div>
                                    )}
                                    <div className="col-lg-12">
                                        <fieldset>
                                            <button type="submit" id="form-submit" className="filled-button">
                                                Send Message
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
