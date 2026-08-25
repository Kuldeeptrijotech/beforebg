"use client";

import styles from "./admin-navbar.module.css";

export type AdminTab = "content" | "blogs" | "chatbot" | "createblog";

export default function AdminNavbar({
  activeTab,
  subtitle,
  extraActions,
}: {
  activeTab: AdminTab;
  subtitle?: string;
  extraActions?: React.ReactNode;
}) {
  async function logout() {
    await fetch("/api/admin/logout", { method: "POST" });
    window.location.assign("/admin/login");
  }

  const defaultSubtitles: Record<AdminTab, string> = {
    content: "Website Content Manager",
    blogs: "Blog Management Studio",
    chatbot: "AI Chatbot & Intelligence Studio",
    createblog: "Create Blog Studio",
  };

  return (
    <header className={styles.topbar}>
      <div className={styles.brand}>
        <span className={styles.logo}>T</span>
        <div className={styles.brandText}>
          <strong>Trijotech Admin</strong>
          <small>{subtitle || defaultSubtitles[activeTab]}</small>
        </div>
      </div>

      <nav className={styles.toolTabs} aria-label="Admin navigation">
        <a href="/admin" className={styles.tabLink}>
          <button
            type="button"
            className={`${styles.tabButton} ${activeTab === "content" ? styles.active : ""}`}
          >
            Page Content
          </button>
        </a>
        <a href="/admin/blogs" className={styles.tabLink}>
          <button
            type="button"
            className={`${styles.tabButton} ${activeTab === "blogs" ? styles.active : ""}`}
          >
            Blog Management
          </button>
        </a>
        <a href="/admin/chatbot" className={styles.tabLink}>
          <button
            type="button"
            className={`${styles.tabButton} ${activeTab === "chatbot" ? styles.active : ""}`}
          >
            Chatbot Studio
          </button>
        </a>
        <a href="/admin/createblog" className={styles.tabLink}>
          <button
            type="button"
            className={`${styles.tabButton} ${activeTab === "createblog" ? styles.active : ""}`}
          >
            + Create Blog
          </button>
        </a>
      </nav>

      <div className={styles.topActions}>
        {extraActions}
        <button type="button" className={styles.btnSecondary} onClick={logout}>
          Sign out
        </button>
      </div>
    </header>
  );
}
