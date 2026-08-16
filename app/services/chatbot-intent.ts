import type { ChatHistoryMessage, ChatIntent } from "@/app/types/chatbot";

const injection = /ignore (all |your |the )?(previous|prior|system)|system prompt|api key|environment variables?|secret key|unrestricted chatgpt|pretend (i('| a)?m|to be) (the )?(developer|admin)|reveal (your|the)|hack|malware|phishing|ransomware|steal (data|credentials)/i;
const greeting = /^(hi|hello|hey|good (morning|afternoon|evening)|namaste|hiya)[!. ]*$/i;
const thanks = /^(thanks|thank you|thx|great|helpful|okay|ok)[!. ]*$/i;
const goodbye = /^(bye|goodbye|see you|talk later)[!. ]*$/i;
const rules: Array<[ChatIntent, RegExp]> = [
  ["CONTACT", /\b(contact|email|phone|call|reach|talk to (your|the) team)\b/i], ["CAREER", /\b(career|job|opening|vacancy|apply|hiring|internship)\b/i],
  ["PRICING", /\b(price|pricing|cost|quote|estimate|budget)\b/i], ["SERVICE", /\b(service|services|solution|solutions|industr(y|ies)|offer|provide|help my business|website|software solution|development service|implementation|consulting)\b/i],
  ["PRODUCT", /\b(product|demo|features?)\b/i], ["BLOG", /\b(blog|article|insight|news)\b/i], ["SUPPORT", /\b(support|maintenance|ams|issue|help desk)\b/i],
  ["PROJECT", /\b(project|case stud|portfolio|client work)\b/i], ["TECHNOLOGY", /\b(technology|sap|s\/4hana|btp|ai|machine learning|data integration|full.?stack)\b/i],
  ["PARTNERSHIP", /\b(partner|partnership|collaborat)\b/i], ["COMPANY", /\b(trijotech|company|about|privacy|policy|who are you|what do you do)\b/i],
];

export function detectIntent(message: string, history: ChatHistoryMessage[] = []): { intent: ChatIntent; allowed: boolean; security: boolean } {
  void history;
  if (injection.test(message)) return { intent: "UNRELATED", allowed: false, security: true };
  if (greeting.test(message)) return { intent: "GREETING", allowed: true, security: false };
  if (thanks.test(message)) return { intent: "THANKS", allowed: true, security: false };
  if (goodbye.test(message)) return { intent: "GOODBYE", allowed: true, security: false };
  const matched = rules.find(([, pattern]) => pattern.test(message));
  if (matched) return { intent: matched[0], allowed: true, security: false };
  return { intent: "UNKNOWN", allowed: true, security: false };
}

export const suggestionsForIntent = (intent: ChatIntent): string[] => ({
  SERVICE: ["SAP Implementation", "SAP Support", "SAP BTP Solutions"], CAREER: ["View career opportunities", "How do I apply?", "Contact the HR team"], CONTACT: ["Open contact page", "Request a consultation", "Explore our services"], PRODUCT: ["Explore products", "Request a demo", "Contact our team"],
} as Partial<Record<ChatIntent, string[]>>)[intent] || ["Our Services", "About Trijotech", "Career Opportunities", "Contact Our Team"];

export const outOfScopeReply = () => "That topic is outside the verified information I can provide. I can help with Trijotech, our SAP and technology services, products, industries, careers, support, and contact information.";

export function restrictedReply(security: boolean, conversationId: string) {
  if (security) return "Thanks for asking. I’m not able to assist with unsafe requests, but I’d be happy to help with general questions about Trijotech, our services, careers, or how to reach our team. What would you like to explore?";
  const replies = [
    "Thanks for your question! I’m here to help with Trijotech and a wide range of business and technology topics. I’d be glad to explore our company, services, technologies, careers, or contact options with you.",
    "I appreciate you asking! I’m happy to help with Trijotech and related business topics. If you’d like, I can tell you about our solutions, career opportunities, or how our team may help your business.",
    "That’s a great question. I’m here to make exploring Trijotech and related topics easy, and I’d be glad to help with our company, services, products, careers, blogs, or support options.",
  ];
  return replies[conversationId.charCodeAt(0) % replies.length];
}
