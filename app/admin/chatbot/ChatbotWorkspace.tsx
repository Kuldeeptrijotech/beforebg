"use client";

import styles from "./chatbot.module.css";
import AdminNavbar from "../AdminNavbar";
import KnowledgeManager from "./KnowledgeManager";
import SettingsManager from "./SettingsManager";

export default function ChatbotWorkspace() {
  return (
    <main className={styles.chatbotPage}>
      {/* Shared Admin Navigation */}
      <AdminNavbar activeTab="chatbot" />

      {/* Main Knowledge Base Manager */}
      <KnowledgeManager />

      {/* Chatbot Global Settings Manager */}
      <SettingsManager />
    </main>
  );
}
