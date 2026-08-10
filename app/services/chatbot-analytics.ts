import "server-only";
type EventName = "open" | "question" | "success" | "failure" | "unanswered" | "action";
const counters: Record<EventName, number> = { open: 0, question: 0, success: 0, failure: 0, unanswered: 0, action: 0 };
export function recordChatEvent(event: EventName) { counters[event] += 1; }
export function chatbotAnalytics() { return { ...counters }; }
