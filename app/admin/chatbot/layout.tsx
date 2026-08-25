import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Chatbot Studio | Trijotech Admin",
  description: "Manage AI Chatbot knowledge base and settings",
};

export default function ChatbotLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
