import { createHash, randomUUID } from "node:crypto";
import { NextRequest, NextResponse } from "next/server";
import { askDeepSeek, DeepSeekError } from "@/app/services/deepseek";
import { knowledgeFallbackAnswer, readKnowledgeEntries, searchKnowledge } from "@/app/services/knowledge-base";
import { runApprovedPublicAction } from "@/app/services/existing-api-adapter";
import { recordChatEvent } from "@/app/services/chatbot-analytics";
import { detectIntent, outOfScopeReply, restrictedReply, suggestionsForIntent } from "@/app/services/chatbot-intent";
import { readChatbotSettings } from "@/app/services/chatbot-settings";
import { directKnowledgeAnswer } from "@/app/services/chatbot-direct";
import type { ChatHistoryMessage, ChatRequest, ChatResponse } from "@/app/types/chatbot";

export const runtime = "nodejs";
const MAX_MESSAGE = 2000;
const buckets = new Map<string, { count: number; reset: number; lastHash?: string; lastAt?: number }>();
const sameOrigin = (request: NextRequest) => !request.headers.get("origin") || request.headers.get("origin") === request.nextUrl.origin;
const clientKey = (request: NextRequest, conversation: string) => `${request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "local"}:${conversation}`;

function limited(key: string, message: string) {
  const now = Date.now(); const current = buckets.get(key); const hash = createHash("sha256").update(message).digest("hex");
  const bucket = !current || current.reset < now ? { count: 0, reset: now + 60_000 } : current;
  if (bucket.lastHash === hash && now - (bucket.lastAt || 0) < 1500) return true;
  bucket.count += 1; bucket.lastHash = hash; bucket.lastAt = now; buckets.set(key, bucket);
  if (buckets.size > 2000) for (const [id, value] of buckets) if (value.reset < now) buckets.delete(id);
  return bucket.count > 12;
}
function validHistory(value: unknown): value is ChatHistoryMessage[] {
  return Array.isArray(value) && value.length <= 12 && value.every((item) => item && (item.role === "user" || item.role === "assistant") && typeof item.content === "string" && item.content.length <= MAX_MESSAGE);
}

export async function POST(request: NextRequest) {
  if (!sameOrigin(request)) return NextResponse.json({ error: "Request origin is not allowed." }, { status: 403 });
  let body: ChatRequest;
  try { body = await request.json(); } catch { return NextResponse.json({ error: "Invalid request." }, { status: 400 }); }
  const message = typeof body.message === "string" ? body.message.trim() : "";
  const conversationId = typeof body.conversationId === "string" && /^[a-zA-Z0-9-]{8,80}$/.test(body.conversationId) ? body.conversationId : randomUUID();
  const settings = await readChatbotSettings();
  const maximumLength = Math.min(MAX_MESSAGE, Math.max(100, settings.maximumMessageLength));
  if (!settings.enabled) return NextResponse.json({ error: "The Trijotech assistant is currently unavailable." }, { status: 503 });
  if (!message || message.length > maximumLength || !validHistory(body.history || [])) return NextResponse.json({ error: `Enter a message between 1 and ${maximumLength} characters.` }, { status: 400 });
  if (limited(clientKey(request, conversationId), message)) return NextResponse.json({ error: "Too many requests. Please wait a moment and try again." }, { status: 429, headers: { "Retry-After": "60" } });
  recordChatEvent("question");
  const classification = detectIntent(message, body.history || []);
  const suggestions = suggestionsForIntent(classification.intent);
  if (!classification.allowed) {
    recordChatEvent("success");
    const response: ChatResponse = { success: true, message: restrictedReply(classification.security, conversationId), conversationId, intent: "UNRELATED", sources: [], actions: [], suggestions };
    return NextResponse.json(response, { headers: { "Cache-Control": "no-store" } });
  }
  if (classification.intent === "GREETING" || classification.intent === "THANKS" || classification.intent === "GOODBYE") {
    const reply = classification.intent === "GREETING" ? settings.welcomeMessage : classification.intent === "THANKS" ? "You’re welcome! Would you like to explore Trijotech services, careers, or speak with our team?" : "Thanks for visiting Trijotech. If you need anything else, I’ll be here to help.";
    recordChatEvent("success");
    const response: ChatResponse = { success: true, message: reply, conversationId, intent: classification.intent, sources: [], actions: [], suggestions };
    return NextResponse.json(response, { headers: { "Cache-Control": "no-store" } });
  }
  try {
    const direct = directKnowledgeAnswer(message, await readKnowledgeEntries());
    if (direct) {
      recordChatEvent("success");
      const response: ChatResponse = { success: true, message: direct.message, conversationId, intent: direct.intent, sources: direct.sources, actions: [], suggestions: suggestionsForIntent(direct.intent) };
      return NextResponse.json(response, { headers: { "Cache-Control": "no-store" } });
    }
    let actionResult: Awaited<ReturnType<typeof runApprovedPublicAction>> = null;
    try { actionResult = await runApprovedPublicAction(message); } catch (error) { console.warn("Existing API unavailable; using local knowledge base", { reason: error instanceof Error ? error.message : "request-failed" }); }
    const knowledge = actionResult
      ? [{ id: `api-${actionResult.action}`, title: "Live API information", category: "live", content: JSON.stringify(actionResult.data), keywords: [], priority: 10, enabled: true }]
      : await searchKnowledge(`${message} ${classification.intent}`, 8);
    if (actionResult) recordChatEvent("action");
    if (!actionResult && classification.intent === "UNKNOWN" && knowledge.length === 0) {
      recordChatEvent("success");
      const response: ChatResponse = { success: true, message: outOfScopeReply(), conversationId, intent: "UNRELATED", sources: [], actions: [], suggestions };
      return NextResponse.json(response, { headers: { "Cache-Control": "no-store" } });
    }
    let answer: string;
    try {
      answer = await askDeepSeek(message, (body.history || []).slice(-8), knowledge);
    } catch (error) {
      if (!(error instanceof DeepSeekError)) throw error;
      answer = knowledge.length ? knowledgeFallbackAnswer(knowledge, message) : `${settings.fallbackMessage}${settings.contactButton ? " Please use our [contact page](/contact) for help." : ""}`;
      console.warn("Chat used knowledge-base fallback", { code: error.code, conversationId: conversationId.slice(0, 8) });
    }
    recordChatEvent("success");
    const response: ChatResponse = { success: true, message: answer, conversationId, intent: classification.intent, sources: knowledge.filter((item) => item.category !== "live").slice(0, 4).map(({ id, title, category, url }) => ({ id, title, category, url })), actions: actionResult ? [actionResult.action] : [], suggestions };
    return NextResponse.json(response, { headers: { "Cache-Control": "no-store" } });
  } catch (error) {
    recordChatEvent("failure");
    const code = error instanceof DeepSeekError ? error.code : "unavailable";
    console.error("Chat request failed", { code, conversationId: conversationId.slice(0, 8) });
    const status = code === "rate_limit" ? 429 : code === "timeout" ? 504 : code === "configuration" || code === "authentication" ? 503 : 502;
    const text = code === "timeout" ? "The assistant took too long to respond. Please try again." : code === "rate_limit" ? "The AI service is busy. Please wait and try again." : "The assistant is temporarily unavailable. Please try again or use our contact page.";
    return NextResponse.json({ error: text }, { status });
  }
}
