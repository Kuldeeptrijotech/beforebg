export type ChatRole = "user" | "assistant" | "system";
export type ChatHistoryMessage = { role: Exclude<ChatRole, "system">; content: string };
export type ChatSource = { id: string; title: string; category: string; url?: string };
export type ChatIntent = "COMPANY" | "SERVICE" | "PRODUCT" | "CAREER" | "BLOG" | "CONTACT" | "SUPPORT" | "PRICING" | "PROJECT" | "TECHNOLOGY" | "PARTNERSHIP" | "GREETING" | "THANKS" | "GOODBYE" | "UNRELATED" | "UNKNOWN";
export type ChatRequest = { message: string; conversationId: string; history?: ChatHistoryMessage[] };
export type ChatResponse = { success: true; message: string; conversationId: string; intent: ChatIntent; sources: ChatSource[]; actions: string[]; suggestions: string[] };
export type KnowledgeEntry = { id: string; title: string; category: string; content: string; keywords: string[]; priority: number; enabled: boolean; url?: string };
export type ChatbotSettings = { enabled: boolean; assistantName: string; welcomeMessage: string; fallbackMessage: string; suggestedQuestions: string[]; contactButton: boolean; maximumMessageLength: number };
