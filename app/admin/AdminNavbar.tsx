"use client";

import Link from "next/link";

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
    <header className="flex flex-wrap items-center justify-between gap-4 w-full mb-5 px-5 py-3 border border-slate-200 rounded-2xl bg-white shadow-sm font-sans">
      <div className="flex items-center gap-3">
        <span className="grid h-9.5 w-9.5 place-items-center rounded-xl bg-gradient-to-br from-[#17233d] to-[#087b71] text-white font-extrabold text-lg shrink-0">
          T
        </span>
        <div>
          <strong className="block text-slate-900 text-sm font-bold leading-tight">Trijotech Admin</strong>
          <small className="block text-slate-500 text-xs">{subtitle || defaultSubtitles[activeTab]}</small>
        </div>
      </div>

      <nav className="flex items-center gap-1.5 p-1 border border-slate-200 rounded-xl bg-slate-50" aria-label="Admin navigation">
        <Link href="/admin" className="inline-flex">
          <button
            type="button"
            className={`inline-flex items-center h-8.5 px-3.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
              activeTab === "content"
                ? "bg-[#17233d] text-white shadow-sm"
                : "text-slate-600 hover:text-slate-900 hover:bg-slate-200/50"
            }`}
          >
            Page Content
          </button>
        </Link>
        <Link href="/admin/blogs" className="inline-flex">
          <button
            type="button"
            className={`inline-flex items-center h-8.5 px-3.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
              activeTab === "blogs"
                ? "bg-[#17233d] text-white shadow-sm"
                : "text-slate-600 hover:text-slate-900 hover:bg-slate-200/50"
            }`}
          >
            Blog Management
          </button>
        </Link>
        <Link href="/admin/chatbot" className="inline-flex">
          <button
            type="button"
            className={`inline-flex items-center h-8.5 px-3.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
              activeTab === "chatbot"
                ? "bg-[#17233d] text-white shadow-sm"
                : "text-slate-600 hover:text-slate-900 hover:bg-slate-200/50"
            }`}
          >
            Chatbot Studio
          </button>
        </Link>
        <Link href="/admin/createblog" className="inline-flex">
          <button
            type="button"
            className={`inline-flex items-center h-8.5 px-3.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
              activeTab === "createblog"
                ? "bg-[#17233d] text-white shadow-sm"
                : "text-slate-600 hover:text-slate-900 hover:bg-slate-200/50"
            }`}
          >
            + Create Blog
          </button>
        </Link>
      </nav>

      <div className="flex items-center gap-2.5">
        {extraActions}
        <button
          type="button"
          className="inline-flex items-center justify-center h-9 px-4 rounded-xl border border-slate-200 bg-white text-xs font-semibold text-slate-700 hover:bg-slate-50 hover:text-slate-900 shadow-xs transition-all"
          onClick={logout}
        >
          Sign out
        </button>
      </div>
    </header>
  );
}
