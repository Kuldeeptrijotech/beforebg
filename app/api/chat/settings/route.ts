import { NextResponse } from "next/server";
import { readChatbotSettings } from "@/app/services/chatbot-settings";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const settings = await readChatbotSettings();
    return NextResponse.json(
      {
        enabled: settings.enabled,
        assistantName: settings.assistantName,
        welcomeMessage: settings.welcomeMessage,
        suggestedQuestions: settings.suggestedQuestions,
        contactButton: settings.contactButton,
        maximumMessageLength: settings.maximumMessageLength,
      },
      { headers: { "Cache-Control": "no-store" } }
    );
  } catch (err) {
    return NextResponse.json(
      {
        enabled: true,
        assistantName: "Trijotech Assistant",
        welcomeMessage: "Hello! How can I help you today?",
        suggestedQuestions: [],
        contactButton: { enabled: true, label: "Contact Us", href: "/contact" },
        maximumMessageLength: 2000,
      },
      { headers: { "Cache-Control": "no-store" } }
    );
  }
}

