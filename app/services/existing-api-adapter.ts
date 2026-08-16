import "server-only";

export type ApprovedAction = { id: string; endpoint: string; public: boolean; keywords: string[] };
const registry: ApprovedAction[] = [];
export const registerChatbotAction = (action: ApprovedAction) => { if (!registry.some((item) => item.id === action.id)) registry.push(action); };

export async function runApprovedPublicAction(message: string): Promise<{ action: string; data: unknown } | null> {
  const base = process.env.EXISTING_API_BASE_URL;
  if (!base) return null;
  const approved = new Set((process.env.EXISTING_API_APPROVED_ENDPOINTS || "").split(",").map((item) => item.trim()).filter(Boolean));
  const contextEndpoint = process.env.EXISTING_API_CHAT_CONTEXT_ENDPOINT?.trim();
  const action = registry.find((item) => item.public && approved.has(item.endpoint) && item.keywords.some((word) => message.toLowerCase().includes(word)));
  const endpoint = action?.endpoint || (contextEndpoint && approved.has(contextEndpoint) ? contextEndpoint : "");
  if (!endpoint) return null;
  const url = new URL(endpoint, base);
  if (!action) url.searchParams.set("q", message);
  const response = await fetch(url, { signal: AbortSignal.timeout(8000), headers: process.env.EXISTING_API_KEY ? { Authorization: `Bearer ${process.env.EXISTING_API_KEY}` } : {} });
  if (!response.ok) throw new Error("Existing API unavailable");
  const data = await response.json();
  return { action: action?.id || "chat-context", data: JSON.parse(JSON.stringify(data).slice(0, 10000)) };
}
