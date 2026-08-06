import { createHmac, timingSafeEqual } from "node:crypto";
import type { NextRequest } from "next/server";

export const SESSION_COOKIE = "trijotech_admin_session";
const SESSION_SECONDS = 60 * 60 * 8;

function secret(): string {
  return process.env.ADMIN_SESSION_SECRET || process.env.ADMIN_PASSWORD || "";
}

function signature(payload: string): string {
  return createHmac("sha256", secret()).update(payload).digest("base64url");
}

export function createSessionToken(): string {
  if (!secret()) throw new Error("Admin authentication is not configured.");
  const payload = `admin:${Date.now() + SESSION_SECONDS * 1000}`;
  return `${Buffer.from(payload).toString("base64url")}.${signature(payload)}`;
}

export function verifySessionToken(token?: string): boolean {
  if (!token || !secret()) return false;
  const [encoded, supplied] = token.split(".");
  if (!encoded || !supplied) return false;
  try {
    const payload = Buffer.from(encoded, "base64url").toString("utf8");
    const [, expiresValue] = payload.split(":");
    if (!expiresValue || Number(expiresValue) <= Date.now()) return false;
    const expected = signature(payload);
    const left = Buffer.from(supplied);
    const right = Buffer.from(expected);
    return left.length === right.length && timingSafeEqual(left, right);
  } catch {
    return false;
  }
}

export function isAdminRequest(request: NextRequest): boolean {
  return verifySessionToken(request.cookies.get(SESSION_COOKIE)?.value);
}

export function passwordMatches(password: string): boolean {
  const configured = process.env.ADMIN_PASSWORD;
  if (!configured || !password) return false;
  const left = Buffer.from(password);
  const right = Buffer.from(configured);
  return left.length === right.length && timingSafeEqual(left, right);
}

export const sessionCookieOptions = {
  httpOnly: true,
  sameSite: "strict" as const,
  secure: process.env.NODE_ENV === "production",
  path: "/",
  maxAge: SESSION_SECONDS,
};
