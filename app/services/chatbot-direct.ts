import "server-only";
import type { ChatIntent, ChatSource, KnowledgeEntry } from "@/app/types/chatbot";

type DirectIntent = "CONTACT_DETAILS" | "EMAIL" | "PHONE" | "LOCATION" | "SERVICES" | "SOLUTIONS" | "SPECIFIC_SERVICE" | "ABOUT_COMPANY" | "ABOUT_COMPANY_DETAILED" | "WHY_TRIJOTECH" | "COMPANY_EXPERIENCE" | "PROJECT_COUNT" | "CLIENT_COUNT" | "COMPANY_INNOVATION" | "COMPANY_VISION" | "COMPANY_MISSION" | "COMPANY_GOALS" | "COMPANY_VALUES" | "CAREERS" | "BLOGS" | "PRODUCT_INFORMATION" | "SPECIFIC_PRODUCT" | "SUPPORT" | "PROCEDURE_REQUEST";
export type DirectAnswer = { message: string; intent: ChatIntent; sources: ChatSource[] };

const contactSource: ChatSource = { id: "company-contact", title: "Contact Trijotech", category: "contact", url: "/contact" };
const sourceOf = ({ id, title, category, url }: KnowledgeEntry): ChatSource => ({ id, title, category, url });

function detect(message: string): DirectIntent | null {
  if (/\b(how do i|steps?|step-by-step|procedure|process|sop)\b/i.test(message) && /\b(apply|application|job|career)\b/i.test(message)) return "PROCEDURE_REQUEST";
  if (/\b(e-?mail|email address)\b/i.test(message)) return "EMAIL";
  if (/\b(phone|telephone|mobile|contact number|phone number|your number|call number)\b/i.test(message)) return "PHONE";
  if (/\b(address|location|located|office location|corporate office)\b/i.test(message)) return "LOCATION";
  if (/\b(contact details?|contact information|contact info|contact your sales|contact sales|sales contact|get in touch|reach you|reach your team)\b/i.test(message)) return "CONTACT_DETAILS";
  if (/\b(btp|full.?stack|data integration|sap implementation|application management|sap support|ai and ml|machine learning)\b/i.test(message)) return "SPECIFIC_SERVICE";
  if (/\b(support|help desk|maintenance|application issue)\b/i.test(message)) return "SUPPORT";
  if (/\b(job|jobs|career|careers|opening|openings|vacancy|vacancies|hiring|apply)\b/i.test(message)) return "CAREERS";
  if (/\b(blog|blogs|articles?|insights?|news)\b/i.test(message)) return "BLOGS";
  if (/\b(e-?invoicing pro|hauptbuch|profitability pro)\b/i.test(message)) return "SPECIFIC_PRODUCT";
  if (/\b(product|products)\b/i.test(message)) return "PRODUCT_INFORMATION";
  if (/\b(solution|solutions)\b/i.test(message)) return "SOLUTIONS";
  if (/\b(service|services|what do you provide|what do you offer)\b/i.test(message)) return "SERVICES";
  if (/\bhow many projects?\b|\bprojects? (has|have|did).*(completed|delivered)\b/i.test(message)) return "PROJECT_COUNT";
  if (/\bhow many clients?\b|\bclients? (has|have|did).*(served|worked)\b/i.test(message)) return "CLIENT_COUNT";
  if (/\bhow experienced|years? of (industry )?experience|company experience\b/i.test(message)) return "COMPANY_EXPERIENCE";
  if (/\b(vision|company vision|your vision)\b/i.test(message)) return "COMPANY_VISION";
  if (/\b(mission|company mission|your mission)\b/i.test(message)) return "COMPANY_MISSION";
  if (/\b(goals?|objectives?|company goals|your goals)\b/i.test(message)) return "COMPANY_GOALS";
  if (/\b(values?|principles|how (do|does) (you|trijotech) work|work culture)\b/i.test(message)) return "COMPANY_VALUES";
  if (/\b(is trijotech innovative|innovation|creative approach)\b/i.test(message)) return "COMPANY_INNOVATION";
  if (/\bwhy (should i choose )?trijotech|why choose trijotech\b/i.test(message)) return "WHY_TRIJOTECH";
  if (/\b(tell me more about (trijotech|your company)|detailed .*trijotech|about trijotech in detail)\b/i.test(message)) return "ABOUT_COMPANY_DETAILED";
  if (/\b(about trijotech|tell me about (your company|trijotech)|who is trijotech|what is trijotech|what does trijotech do|what do you do|company overview)\b/i.test(message)) return "ABOUT_COMPANY";
  return null;
}

export function directKnowledgeAnswer(message: string, entries: KnowledgeEntry[]): DirectAnswer | null {
  const intent = detect(message);
  if (!intent) return null;
  const companyFacts = entries.find((item) => item.id === "about-company-about-company");
  const companySource = companyFacts ? sourceOf(companyFacts) : { id: "company-overview", title: "About Trijotech", category: "company", url: "/about-us" };
  if (intent === "EMAIL") return { message: "[sales@trijotech.com](mailto:sales@trijotech.com)", intent: "CONTACT", sources: [contactSource] };
  if (intent === "PHONE") return { message: "+91 120-3506433\n+91 7982531976", intent: "CONTACT", sources: [contactSource] };
  if (intent === "CONTACT_DETAILS" || intent === "SUPPORT") return { message: "**Phone:**\n+91 120-3506433\n+91 7982531976\n\n**Email:**\n[sales@trijotech.com](mailto:sales@trijotech.com)", intent: intent === "SUPPORT" ? "SUPPORT" : "CONTACT", sources: [contactSource] };
  if (intent === "LOCATION") return { message: "C56A, Infinity Tecnopark, 501, 16, C Block, Phase 2, Sector 62, Noida, Uttar Pradesh 201309", intent: "CONTACT", sources: [contactSource] };
  if (intent === "ABOUT_COMPANY") return { message: "Trijotech is an innovative technology solutions and consulting company with 9+ years of industry experience. We have delivered 100+ projects for 50+ clients, combining technical expertise with practical, reliable solutions for real business needs.", intent: "COMPANY", sources: [companySource] };
  if (intent === "ABOUT_COMPANY_DETAILED") return { message: "Trijotech is an innovative and trusted technology solutions company with 9+ years of industry experience. We have successfully delivered 100+ projects and served more than 50 clients.\n\nOur experienced team combines technical and industry knowledge with creativity and innovation to solve real business challenges. We focus on practical, reliable technology solutions, quality-driven execution, and successful delivery.\n\nOur customer-focused approach and commitment to long-term relationships position Trijotech as a trusted technology and implementation partner.", intent: "COMPANY", sources: [companySource] };
  if (intent === "WHY_TRIJOTECH") return { message: "Trijotech brings 9+ years of industry experience, 100+ successfully delivered projects, and experience serving 50+ clients. Our approach combines innovation, creativity, technical expertise, customer focus, and reliable execution to deliver practical solutions that create long-term business value.", intent: "COMPANY", sources: [companySource] };
  if (intent === "COMPANY_EXPERIENCE") return { message: "Trijotech has 9+ years of industry experience, supported by an experienced team with strong technical and industry knowledge. We have delivered 100+ projects for 50+ clients.", intent: "COMPANY", sources: [companySource] };
  if (intent === "PROJECT_COUNT") return { message: "Trijotech has successfully delivered 100+ projects.", intent: "COMPANY", sources: [companySource] };
  if (intent === "CLIENT_COUNT") return { message: "Trijotech has served 50+ clients.", intent: "COMPANY", sources: [companySource] };
  if (intent === "COMPANY_INNOVATION") return { message: "Yes. Trijotech combines innovation and creativity with technical expertise to solve real business problems and deliver practical, reliable, and scalable technology solutions.", intent: "COMPANY", sources: [companySource] };
  if (intent === "COMPANY_VISION" || intent === "COMPANY_MISSION" || intent === "COMPANY_GOALS" || intent === "COMPANY_VALUES") {
    const id = intent === "COMPANY_VISION" ? "company-vision" : intent === "COMPANY_MISSION" ? "company-mission" : intent === "COMPANY_GOALS" ? "company-goals" : "company-values";
    const entry = entries.find((item) => item.id === id);
    return entry ? { message: entry.content, intent: "COMPANY", sources: [sourceOf(entry)] } : null;
  }
  if (intent === "SPECIFIC_SERVICE") {
    const terms = message.toLowerCase();
    const id = /btp|full.?stack/.test(terms) ? "service-btp" : /data integration/.test(terms) ? "service-data" : /ai|machine learning|\bml\b/.test(terms) ? "service-ai" : /support|application management/.test(terms) ? "service-support" : "service-implementation";
    const entry = entries.find((item) => item.id === id);
    return entry ? { message: `**${entry.title}**\n\n${entry.content}`, intent: "SERVICE", sources: [sourceOf(entry)] } : null;
  }
  if (intent === "SERVICES" || intent === "SOLUTIONS") {
    const items = entries.filter((item) => item.category === "services" && item.id !== "service-application-support");
    return items.length ? { message: items.map((item) => `- [${item.title}](${item.url})`).join("\n"), intent: "SERVICE", sources: items.map(sourceOf) } : null;
  }
  if (intent === "PRODUCT_INFORMATION") return { message: "- [E-Invoicing Pro](/products)\n- [HauptBuch Consolidation](/products)\n- [Profitability Pro](/products)", intent: "PRODUCT", sources: [{ id: "products-page", title: "Trijotech Products", category: "products", url: "/products" }] };
  if (intent === "SPECIFIC_PRODUCT") {
    const name = /hauptbuch/i.test(message) ? "HauptBuch Consolidation" : /profitability/i.test(message) ? "Profitability Pro" : "E-Invoicing Pro";
    return { message: `**${name}** is a Trijotech product. For verified feature, fit, demonstration, or pricing details, contact [sales@trijotech.com](mailto:sales@trijotech.com) or +91 120-3506433.`, intent: "PRODUCT", sources: [{ id: "products-page", title: "Trijotech Products", category: "products", url: "/products" }] };
  }
  if (intent === "BLOGS") return { message: "Trijotech publishes insights on SAP, technology, transformation, analytics, and advisory topics. [View Trijotech blogs](/blogs).", intent: "BLOG", sources: [{ id: "general-blogs", title: "Blogs and insights", category: "general", url: "/blogs" }] };
  if (intent === "CAREERS") return { message: "Applications are accepted for SAP Functional Consultant, SAP Technical Consultant, SAP Developer, Business Analyst, and other relevant roles. [View careers and apply](/careers).", intent: "CAREER", sources: [{ id: "careers-page", title: "Careers at Trijotech", category: "careers", url: "/careers" }] };
  if (intent === "PROCEDURE_REQUEST") return { message: "1. Open the [Careers page](/careers).\n2. Select the position and complete your details.\n3. Upload your PDF, DOC, or DOCX resume.\n4. Complete human verification and submit the application.", intent: "CAREER", sources: [{ id: "careers-page", title: "Careers at Trijotech", category: "careers", url: "/careers" }] };
  return null;
}
