"use client";

import { useEffect, useState } from "react";
import type { ChatbotSettings } from "@/app/types/chatbot";
import styles from "./chatbot.module.css";

export default function SettingsManager() {
  const [settings, setSettings] = useState<ChatbotSettings | null>(null);
  const [notice, setNotice] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    let active = true;
    void fetch("/api/admin/chatbot/settings")
      .then((response) => response.json())
      .then((data) => {
        if (active) setSettings(data);
      });
    return () => {
      active = false;
    };
  }, []);

  async function save() {
    if (!settings) return;
    setBusy(true);
    setNotice(null);
    try {
      const response = await fetch("/api/admin/chatbot/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(settings),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Settings could not be saved.");
      setNotice({ type: "success", text: "Chatbot settings updated successfully." });
      if (data.settings) setSettings(data.settings);
    } catch (error) {
      setNotice({ type: "error", text: (error as Error).message || "Save failed." });
    } finally {
      setBusy(false);
    }
  }

  if (!settings) {
    return (
      <section className={styles.settingsSection}>
        <p style={{ color: "#667085", fontSize: "13px" }}>Loading chatbot settings…</p>
      </section>
    );
  }

  return (
    <section className={styles.settingsSection}>
      <div className={styles.settingsHeading}>
        <h2>Chatbot Behavior & Global Settings</h2>
        <p>Configure public presentation, response behavior, and AI assistant capabilities.</p>
      </div>

      {notice && (
        <div className={`${styles.notice} ${styles[notice.type]}`} role="status">
          <span>{notice.text}</span>
          <button
            type="button"
            onClick={() => setNotice(null)}
            style={{ background: "none", border: "none", cursor: "pointer", fontSize: "16px", color: "inherit" }}
          >
            ×
          </button>
        </div>
      )}

      <div className={styles.settingsGrid}>
        <div className={styles.formField}>
          <label className={styles.checkboxLabel}>
            <input
              type="checkbox"
              checked={settings.enabled}
              onChange={(event) => setSettings({ ...settings, enabled: event.target.checked })}
            />
            AI Chatbot Enabled on Website
          </label>
        </div>

        <div className={styles.formField}>
          <label className={styles.checkboxLabel}>
            <input
              type="checkbox"
              checked={settings.contactButton}
              onChange={(event) => setSettings({ ...settings, contactButton: event.target.checked })}
            />
            Show &ldquo;Contact Team&rdquo; Direct Button in Chat
          </label>
        </div>

        <div className={styles.formField}>
          <label>Assistant Display Name</label>
          <input
            value={settings.assistantName}
            onChange={(event) => setSettings({ ...settings, assistantName: event.target.value })}
            placeholder="Trijotech Assistant"
          />
        </div>

        <div className={styles.formField}>
          <label>Max Message Length (Characters)</label>
          <input
            type="number"
            min="100"
            max="2000"
            value={settings.maximumMessageLength}
            onChange={(event) =>
              setSettings({ ...settings, maximumMessageLength: Number(event.target.value) })
            }
          />
        </div>

        <div className={`${styles.formField} ${styles.fullWidth}`}>
          <label>Welcome Greeting Message</label>
          <textarea
            rows={3}
            value={settings.welcomeMessage}
            onChange={(event) => setSettings({ ...settings, welcomeMessage: event.target.value })}
            placeholder="Hello! How can I help you with Trijotech SAP solutions today?"
          />
        </div>

        <div className={`${styles.formField} ${styles.fullWidth}`}>
          <label>Fallback / Unsure Message</label>
          <textarea
            rows={3}
            value={settings.fallbackMessage}
            onChange={(event) => setSettings({ ...settings, fallbackMessage: event.target.value })}
            placeholder="I don't have that specific information right now. Please reach out to our team..."
          />
        </div>

        <div className={`${styles.formField} ${styles.fullWidth}`}>
          <label>Suggested Quick Questions (Separate with | )</label>
          <input
            value={settings.suggestedQuestions.join(" | ")}
            onChange={(event) =>
              setSettings({
                ...settings,
                suggestedQuestions: event.target.value
                  .split("|")
                  .map((item) => item.trim())
                  .filter(Boolean),
              })
            }
            placeholder="What SAP services do you offer? | How can I contact support? | Tell me about SAP BTP"
          />
          <small>Questions that appear as clickable prompt pills in the chatbot window.</small>
        </div>
      </div>

      <div className={styles.formActions} style={{ marginTop: "20px" }}>
        <button type="button" className={styles.btnPrimary} onClick={save} disabled={busy}>
          {busy ? "Saving Settings…" : "Save Global Settings"}
        </button>
      </div>
    </section>
  );
}
