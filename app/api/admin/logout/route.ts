import { NextResponse } from "next/server";
import { SESSION_COOKIE, sessionCookieOptions } from "@/app/lib/admin-auth";

export async function POST() {
  const response = NextResponse.json({ success: true });
  response.cookies.set(SESSION_COOKIE, "", { ...sessionCookieOptions, maxAge: 0 });
  return response;
}
