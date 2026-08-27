import "server-only";
import { promises as fs } from "node:fs";
import path from "node:path";
import type { ChatbotSettings } from "@/app/types/chatbot";
const settingsPath = path.join(process.cwd(), "app", "data", "chatbot-settings.json");
export const defaultChatbotSettings: ChatbotSettings = { enabled: true, assistantName: "Trijotech AI Assistant", welcomeMessage: "Hi! Welcome to Trijotech — it’s lovely to have you here. What would you like to know about our company, services, or careers?", fallbackMessage: "Thanks for asking. I couldn’t find enough verified information to give you a reliable answer, but our Trijotech team would be happy to help.", suggestedQuestions: ["Our Services", "About Trijotech", "Careers", "Contact Our Team"], contactButton: true, maximumMessageLength: 2000 };
export async function readChatbotSettings() { try { return { ...defaultChatbotSettings, ...JSON.parse(await fs.readFile(settingsPath, "utf8")) } as ChatbotSettings; } catch { return defaultChatbotSettings; } }
export async function writeChatbotSettings(value: ChatbotSettings) { await fs.writeFile(settingsPath, `${JSON.stringify(value, null, 2)}\n`, "utf8"); }
