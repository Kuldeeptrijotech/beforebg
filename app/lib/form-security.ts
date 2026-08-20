import nodemailer from "nodemailer";

const attempts = new Map<string, { count: number; resetAt: number }>();
const WINDOW_MS = 15 * 60 * 1000;
const MAX_ATTEMPTS = 5;
const MAX_TRACKED_CLIENTS = 10_000;

function pruneAttempts(now: number) {
  if (attempts.size < MAX_TRACKED_CLIENTS) return;
  attempts.forEach((record, address) => {
    if (record.resetAt <= now) attempts.delete(address);
  });
  while (attempts.size >= MAX_TRACKED_CLIENTS) {
    const oldest = attempts.keys().next().value;
    if (oldest === undefined) break;
    attempts.delete(oldest);
  }
}

export function clientIp(request: Request) {
  return request.headers.get("cf-connecting-ip") || request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
}

export function isRateLimited(ip: string) {
  const now = Date.now();
  const current = attempts.get(ip);
  if (!current || current.resetAt <= now) {
    if (current) attempts.delete(ip);
    pruneAttempts(now);
    attempts.set(ip, { count: 1, resetAt: now + WINDOW_MS });
    return false;
  }
  current.count += 1;
  return current.count > MAX_ATTEMPTS;
}

const CLOUDFLARE_TEST_SECRET_KEYS = new Set([
  "1x0000000000000000000000000000000AA",
  "2x0000000000000000000000000000000AA",
  "3x0000000000000000000000000000000AA",
]);

export async function verifyCaptcha(token: string, ip: string, expectedAction: "contact_form" | "career_form") {
  const secret = process.env.TURNSTILE_SECRET_KEY?.trim();
  const allowedHosts = (process.env.TURNSTILE_ALLOWED_HOSTNAMES || "").split(",").map((host) => host.trim().toLowerCase()).filter(Boolean);
  if (!secret || CLOUDFLARE_TEST_SECRET_KEYS.has(secret) || !token || token.length > 2048 || allowedHosts.length === 0) return false;
  const body = new URLSearchParams({ secret, response: token });
  if (ip !== "unknown") body.set("remoteip", ip);
  try {
    const response = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body,
      cache: "no-store",
      signal: AbortSignal.timeout(10_000),
    });
    if (!response.ok) return false;
    const result = (await response.json()) as { success?: boolean; hostname?: string; action?: string };
    return result.success === true && result.action === expectedAction && typeof result.hostname === "string" && allowedHosts.includes(result.hostname.toLowerCase());
  } catch {
    return false;
  }
}

export function text(form: FormData, name: string, max: number) {
  const value = form.get(name);
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

export function validEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) && value.length <= 254;
}

export function validPhone(value: string) {
  return /^[+0-9()\-\s]{7,25}$/.test(value);
}

export function escapeHtml(value: string) {
  return value.replace(/[&<>'"]/g, (character) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;" })[character] || character);
}

export function mailer() {
  const host = process.env.SMTP_HOST;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  if (!host || !user || !pass) throw new Error("Email service is not configured.");
  return nodemailer.createTransport({
    host,
    port: Number(process.env.SMTP_PORT || 587),
    secure: process.env.SMTP_SECURE === "true",
    auth: { user, pass },
  });
}

export function sender() {
  return process.env.SMTP_FROM || process.env.SMTP_USER || "";
}

export function fieldRows(fields: Array<[string, string]>) {
  return fields.map(([label, value]) => `<tr><th style="padding:8px;text-align:left;vertical-align:top">${escapeHtml(label)}</th><td style="padding:8px">${escapeHtml(value || "Not provided").replace(/\n/g, "<br>")}</td></tr>`).join("");
}
