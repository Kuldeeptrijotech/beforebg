import { NextResponse } from "next/server";
import { readChatbotSettings } from "@/app/services/chatbot-settings";
export async function GET() { const settings = await readChatbotSettings(); return NextResponse.json({ enabled: settings.enabled, assistantName: settings.assistantName, welcomeMessage: settings.welcomeMessage, suggestedQuestions: settings.suggestedQuestions, contactButton: settings.contactButton, maximumMessageLength: settings.maximumMessageLength }, { headers: { "Cache-Control": "no-store" } }); }
