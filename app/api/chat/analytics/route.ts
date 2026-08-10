import { NextRequest, NextResponse } from "next/server";
import { recordChatEvent } from "@/app/services/chatbot-analytics";
export async function POST(request: NextRequest) {
  if (request.headers.get("origin") && request.headers.get("origin") !== request.nextUrl.origin) return NextResponse.json({}, { status: 403 });
  recordChatEvent("open"); return NextResponse.json({ success: true });
}
