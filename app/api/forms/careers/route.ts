import { NextResponse } from "next/server";
import { clientIp, escapeHtml, fieldRows, isRateLimited, mailer, sender, text, validEmail, validPhone, verifyCaptcha } from "@/app/lib/form-security";

export const runtime = "nodejs";
const MAX_FILE_SIZE = 5 * 1024 * 1024;
const RESUME_TYPES = new Set(["application/pdf", "application/msword", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"]);

export async function POST(request: Request) {
  try {
    const ip = clientIp(request);
    if (isRateLimited(ip)) return NextResponse.json({ error: "Too many submissions. Please try again later." }, { status: 429 });
    const form = await request.formData();
    if (text(form, "website", 100)) return NextResponse.json({ error: "Unable to submit the form." }, { status: 400 });

    const name = text(form, "name", 100), email = text(form, "email", 254), phone = text(form, "phone", 25);
    const position = text(form, "position", 120), experience = text(form, "experience", 10), company = text(form, "company", 120);
    const location = text(form, "location", 120), message = text(form, "message", 5000), captcha = text(form, "captchaToken", 2048), consent = text(form, "consent", 10);
    const resume = form.get("resume");
    if (name.length < 2 || !validEmail(email) || !validPhone(phone) || !position || !/^\d{1,2}(\.5)?$/.test(experience) || message.length < 10 || consent !== "yes") return NextResponse.json({ error: "Please complete all required fields with valid information." }, { status: 400 });
    if (!(resume instanceof File) || !resume.size || resume.size > MAX_FILE_SIZE || !RESUME_TYPES.has(resume.type)) return NextResponse.json({ error: "Please upload a PDF, DOC, or DOCX resume no larger than 5 MB." }, { status: 400 });
    if (!(await verifyCaptcha(captcha, ip, "career_form"))) return NextResponse.json({ error: "Human verification failed. Please try again." }, { status: 400 });

    const submittedAt = new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata", dateStyle: "long", timeStyle: "short" });
    const transport = mailer(), from = sender(), to = process.env.CAREERS_TO_EMAIL || "hr@trijotech.com";
    const resumeBuffer = Buffer.from(await resume.arrayBuffer());
    await transport.sendMail({ from, to, replyTo: email, subject: `Career Application: ${position} - ${name}`, html: `<h2>Career Application</h2><table>${fieldRows([["Applicant",name],["Email",email],["Phone",phone],["Position",position],["Experience",`${experience} years`],["Current company",company],["Location",location],["Message",message],["Resume",resume.name],["Submitted",submittedAt]])}</table>`, attachments: [{ filename: resume.name.replace(/[^a-zA-Z0-9._-]/g, "_"), content: resumeBuffer, contentType: resume.type }] });
    await transport.sendMail({ from, to: email, subject: "We received your application | Trijotech", html: `<p>Hello ${escapeHtml(name)},</p><p>Thank you for applying for the ${escapeHtml(position)} position at Trijotech. Our HR team has received your application and will contact you if your profile matches our requirements.</p><p>Regards,<br>Trijotech HR Team</p>` });
    return NextResponse.json({ message: "Thank you. Your application has been submitted successfully." });
  } catch (error) {
    console.error("Career form submission failed", error);
    return NextResponse.json({ error: "We could not submit your application right now. Please try again later." }, { status: 500 });
  }
}
