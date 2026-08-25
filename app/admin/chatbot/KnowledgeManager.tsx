"use client";

import { useEffect, useMemo, useState } from "react";
import type { KnowledgeEntry } from "@/app/types/chatbot";
import styles from "./chatbot.module.css";

const blank = (): KnowledgeEntry => ({
  id: "",
  title: "",
  category: "faq",
  content: "",
  keywords: [],
  priority: 5,
  enabled: true,
  url: "",
});

export default function KnowledgeManager() {
  const [entries, setEntries] = useState<KnowledgeEntry[]>([]);
  const [editing, setEditing] = useState<KnowledgeEntry>(blank());
  const [filter, setFilter] = useState("");
  const [notice, setNotice] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const [busy, setBusy] = useState(false);
  const [analytics, setAnalytics] = useState<Record<string, number>>({});

  const load = async () => {
    try {
      const response = await fetch("/api/admin/chatbot", { cache: "no-store" });
      const data = await response.json();
      if (response.ok) {
        setEntries(data.entries || []);
        setAnalytics(data.analytics || {});
      }
    } catch {
      // ignore initial fetch error
    }
  };

  useEffect(() => {
    void load();
  }, []);

  const shown = useMemo(() => {
    const q = filter.toLowerCase().trim();
    if (!q) return entries;
    return entries.filter((item) =>
      `${item.title} ${item.category} ${item.keywords.join(" ")}`.toLowerCase().includes(q)
    );
  }, [entries, filter]);

  async function save() {
    if (!editing.title.trim()) {
      setNotice({ type: "error", text: "Please enter a title for the knowledge entry." });
      return;
    }
    if (!editing.content.trim()) {
      setNotice({ type: "error", text: "Please enter content for the knowledge entry." });
      return;
    }

    setBusy(true);
    setNotice(null);
    try {
      const response = await fetch("/api/admin/chatbot", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editing),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Save failed.");
      setEditing(blank());
      setNotice({ type: "success", text: "Knowledge entry saved successfully." });
      await load();
    } catch (error) {
      setNotice({ type: "error", text: (error as Error).message || "Save failed." });
    } finally {
      setBusy(false);
    }
  }

  async function remove(entry: KnowledgeEntry) {
    if (!confirm(`Delete “${entry.title}”? This cannot be undone.`)) return;
    setBusy(true);
    setNotice(null);
    try {
      const response = await fetch("/api/admin/chatbot", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: entry.id, category: entry.category }),
      });
      if (!response.ok) throw new Error("Delete failed.");
      setNotice({ type: "success", text: "Entry deleted successfully." });
      setEditing(blank());
      await load();
    } catch (error) {
      setNotice({ type: "error", text: (error as Error).message || "Delete failed." });
    } finally {
      setBusy(false);
    }
  }

  return (
    <>
      {/* Banner */}
      <section className={styles.banner}>
        <div className={styles.bannerInfo}>
          <span>TRIJOTECH AI STUDIO</span>
          <h1>Chatbot Knowledge Base</h1>
          <p>Train and manage verified domain intelligence supplied to the Trijotech website AI assistant.</p>
        </div>
        <button
          type="button"
          className={styles.btnPrimary}
          onClick={() => {
            setEditing(blank());
            setNotice(null);
          }}
        >
          + Add New Entry
        </button>
      </section>

      {/* Analytics Stats */}
      {Object.keys(analytics).length > 0 && (
        <section className={styles.statsGrid}>
          {Object.entries(analytics).map(([name, value]) => (
            <div key={name} className={styles.statCard}>
              <strong>{value}</strong>
              <span>{name.replace(/([A-Z])/g, " $1").trim()}</span>
            </div>
          ))}
        </section>
      )}

      {/* Notice */}
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

      {/* Main 2-Column Workspace */}
      <div className={styles.workspace}>
        {/* Left List */}
        <aside className={styles.sidebar}>
          <div className={styles.sidebarHeader}>
            <h3>Knowledge Entries</h3>
            <p>{shown.length} {shown.length === 1 ? "entry" : "entries"} available</p>
          </div>

          <input
            className={styles.searchInput}
            value={filter}
            onChange={(event) => setFilter(event.target.value)}
            placeholder="Search by title, category, keyword…"
            aria-label="Search knowledge base"
          />

          <div className={styles.entryList}>
            {shown.length === 0 ? (
              <p style={{ margin: "14px 0", color: "#98a2b3", fontSize: "12px", textAlign: "center" }}>
                No entries match your search.
              </p>
            ) : (
              shown.map((entry) => (
                <button
                  type="button"
                  key={entry.id}
                  className={`${styles.entryItem} ${editing.id === entry.id ? styles.active : ""}`}
                  onClick={() => {
                    setEditing({ ...entry, keywords: [...entry.keywords] });
                    setNotice(null);
                  }}
                >
                  <strong className={styles.entryTitle}>{entry.title || "Untitled Entry"}</strong>
                  <div className={styles.entryMeta}>
                    <span className={styles.categoryBadge}>{entry.category || "General"}</span>
                    <span className={styles.priorityBadge}>Priority {entry.priority}</span>
                  </div>
                </button>
              ))
            )}
          </div>
        </aside>

        {/* Right Editor Form */}
        <section className={styles.formCard}>
          <div className={styles.formHeading}>
            <h2>{editing.id ? `Edit: ${editing.title}` : "Create New Knowledge Entry"}</h2>
            {editing.id && (
              <button
                type="button"
                className={styles.btnSecondary}
                onClick={() => {
                  setEditing(blank());
                  setNotice(null);
                }}
              >
                Cancel / New
              </button>
            )}
          </div>

          <div className={styles.formGrid}>
            <div className={styles.formField}>
              <label>Entry Title</label>
              <input
                value={editing.title}
                onChange={(event) => setEditing({ ...editing, title: event.target.value })}
                placeholder="e.g. SAP S/4HANA Migration Services"
              />
            </div>

            <div className={styles.formRow}>
              <div className={styles.formField}>
                <label>Category</label>
                <input
                  value={editing.category}
                  onChange={(event) => setEditing({ ...editing, category: event.target.value })}
                  placeholder="e.g. services, faq, pricing, company"
                />
              </div>

              <div className={styles.formField}>
                <label>Priority (0-10)</label>
                <input
                  type="number"
                  min="0"
                  max="10"
                  value={editing.priority}
                  onChange={(event) => setEditing({ ...editing, priority: Number(event.target.value) })}
                />
              </div>
            </div>

            <div className={styles.formField}>
              <label>Search Keywords</label>
              <input
                value={editing.keywords.join(", ")}
                onChange={(event) =>
                  setEditing({
                    ...editing,
                    keywords: event.target.value
                      .split(",")
                      .map((item) => item.trim())
                      .filter(Boolean),
                  })
                }
                placeholder="e.g. sap migration, s4hana, cloud erp, ecc upgrade"
              />
              <small>Comma-separated terms that trigger this response.</small>
            </div>

            <div className={styles.formField}>
              <label>Related Website Path (Optional)</label>
              <input
                value={editing.url || ""}
                onChange={(event) => setEditing({ ...editing, url: event.target.value })}
                placeholder="/services/sap-consulting"
              />
            </div>

            <div className={styles.formField}>
              <label>Chatbot-Ready Knowledge Content</label>
              <textarea
                rows={8}
                value={editing.content}
                onChange={(event) => setEditing({ ...editing, content: event.target.value })}
                placeholder="Write clear, factual answers that the AI should provide when asked about this topic..."
              />
            </div>

            <label className={styles.checkboxLabel}>
              <input
                type="checkbox"
                checked={editing.enabled}
                onChange={(event) => setEditing({ ...editing, enabled: event.target.checked })}
              />
              Enable this knowledge entry for live AI queries
            </label>

            <div className={styles.formActions}>
              <button type="button" className={styles.btnPrimary} onClick={save} disabled={busy}>
                {busy ? "Saving…" : editing.id ? "Update Entry" : "Save New Entry"}
              </button>
              {editing.id && (
                <button
                  type="button"
                  className={styles.btnDanger}
                  onClick={() => remove(editing)}
                  disabled={busy}
                >
                  Delete Entry
                </button>
              )}
            </div>

            {/* Live Chatbot Preview */}
            <div className={styles.previewSection}>
              <div className={styles.previewHeader}>
                <span className={styles.previewBadge}>AI Response Preview</span>
              </div>
              <div className={styles.previewCard}>
                <h4>{editing.title || "Entry Title Preview"}</h4>
                <p>{editing.content || "The AI response knowledge content will be previewed here in real time."}</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
