import { NextResponse } from "next/server";
import { createSessionToken, passwordMatches, SESSION_COOKIE, sessionCookieOptions } from "@/app/lib/admin-auth";

const attempts = new Map<string, { count: number; resetAt: number }>();
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

export async function POST(request: Request) {
  const address = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "local";
  const now = Date.now();
  const record = attempts.get(address);
  if (record && record.resetAt > now && record.count >= 5) {
    return NextResponse.json({ error: "Too many sign-in attempts. Try again in 15 minutes." }, { status: 429 });
  }

  let password = "";
  try {
    const body = (await request.json()) as { password?: unknown };
    password = typeof body.password === "string" ? body.password : "";
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  if (!process.env.ADMIN_PASSWORD || !process.env.ADMIN_SESSION_SECRET) {
    return NextResponse.json({ error: "Admin credentials are not configured on the server." }, { status: 503 });
  }

  if (!passwordMatches(password)) {
    pruneAttempts(now);
    const next = record && record.resetAt > now ? { ...record, count: record.count + 1 } : { count: 1, resetAt: now + 15 * 60 * 1000 };
    attempts.set(address, next);
    return NextResponse.json({ error: "Incorrect password." }, { status: 401 });
  }

  attempts.delete(address);
  const response = NextResponse.json({ success: true });
  response.cookies.set(SESSION_COOKIE, createSessionToken(), sessionCookieOptions);
  return response;
}
