"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import type { ContentEntry, SiteContent } from "@/app/lib/content-store";
import type { BlogPost } from "@/app/data/blogs";
import ImageUploadField from "./ImageUploadField";
import BlogManager from "./BlogManager";
import AdminNavbar from "./AdminNavbar";

function stripHtmlTags(str: string): string {
  try {
    const doc = new DOMParser().parseFromString(str, "text/html");
    return (doc.body.textContent || "").replace(/\s+/g, " ").trim();
  } catch {
    return str.replace(/<[^>]*>/g, "").replace(/\s+/g, " ").trim();
  }
}

type RouteOption = { label: string; path: string };
type Selection = {
  pathname: string; pageLabel: string; scope: "global" | "page"; section: string; sectionLabel: string;
  selector: string; tag: string; label: string; html: string; href: string; hrefSelector: string;
  src: string; alt: string; backgroundImage: string; backgroundSelector: string;
};
type Notice = { type: "success" | "error"; text: string } | null;

const urlValid = (value: string, image = false) => {
  if (!value.trim()) return false;
  if (value.startsWith("/") || (!image && (value.startsWith("#") || value.startsWith("mailto:") || value.startsWith("tel:")))) return true;
  try { const url = new URL(value); return url.protocol === "https:" || url.protocol === "http:"; } catch { return false; }
};
const hash = (value: string) => {
  let result = 2166136261;
  for (let index = 0; index < value.length; index += 1) result = Math.imul(result ^ value.charCodeAt(index), 16777619);
  return (result >>> 0).toString(36);
};
const entryId = (selection: Selection, kind: string, attribute = "") => `content-${hash(`${selection.scope}|${selection.pathname}|${selection.selector}|${kind}|${attribute}`)}`;
const contextualEntries = (content: SiteContent, selection: Selection) => selection.scope === "global"
  ? Object.values(content.global.sections).flatMap((section) => section.entries)
  : Object.values(content.pages[selection.pathname]?.sections ?? {}).flatMap((section) => section.entries);

export default function AdminEditor({ initialContent, initialBlogs, routes }: { initialContent: SiteContent; initialBlogs: BlogPost[]; routes: RouteOption[] }) {
  const [content, setContent] = useState(initialContent);
  const [mode, setMode] = useState<"content" | "blogs">("content");
  const [routeOptions, setRouteOptions] = useState(routes);
  const [blogPosts, setBlogPosts] = useState(initialBlogs);
  const [route, setRoute] = useState("/");
  const [customRoute, setCustomRoute] = useState("");
  const [selection, setSelection] = useState<Selection | null>(null);
  const [html, setHtml] = useState("");
  const [href, setHref] = useState("");
  const [src, setSrc] = useState("");
  const [alt, setAlt] = useState("");
  const [backgroundImage, setBackgroundImage] = useState("");
  const [notice, setNotice] = useState<Notice>(null);
  const [saving, setSaving] = useState(false);
  const [frameVersion, setFrameVersion] = useState(0);
  const frame = useRef<HTMLIFrameElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [stagedUploads, setStagedUploads] = useState<string[]>([]);
  const hasHtmlTags = useMemo(() => /<[a-z][\s\S]*>/i.test(html), [html]);

  const allEntries = useMemo(() => [
    ...Object.values(content.global.sections).flatMap((section) => section.entries),
    ...Object.values(content.pages).flatMap((page) => Object.values(page.sections).flatMap((section) => section.entries)),
  ], [content]);

  const selectedSaved = useMemo(() => selection ? contextualEntries(content, selection).filter((entry) =>
    entry.selector === selection.selector || entry.selector === selection.hrefSelector || entry.selector === selection.backgroundSelector
  ) : [], [content, selection]);

  async function discardUpload(path: string) {
    if (!stagedUploads.includes(path)) return;
    setStagedUploads((current) => current.filter((candidate) => candidate !== path));
    await fetch("/api/admin/images", { method: "DELETE", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ path }) }).catch(() => undefined);
  }

  async function discardStagedUploads() {
    const paths = [...stagedUploads];
    await Promise.all(paths.map(discardUpload));
  }

  function imageUploaded(path: string, kind: "src" | "background") {
    if (!selection) return;
    const previous = kind === "src" ? src : backgroundImage;
    if (stagedUploads.includes(previous)) void discardUpload(previous);
    setStagedUploads((current) => current.includes(path) ? current : [...current, path]);
    if (kind === "src") setSrc(path);
    else setBackgroundImage(path);

    const selector = kind === "src" ? selection.selector : selection.backgroundSelector;
    const saved = existing(kind === "src" ? "attribute" : "backgroundImage", kind === "src" ? "src" : undefined, selector);
    const entry: ContentEntry = kind === "src"
      ? { id: saved?.id ?? entryId(selection, "attribute", "src"), selector, kind: "attribute", attribute: "src", value: path, match: saved?.match ?? selection.src, label: `${selection.label || "Image"} URL` }
      : { id: saved?.id ?? entryId({ ...selection, selector }, "backgroundImage"), selector, kind: "backgroundImage", value: path, match: saved?.match ?? selection.backgroundImage, label: `${selection.sectionLabel} background image` };
    frame.current?.contentWindow?.postMessage({ type: "admin-content-preview", entries: [entry] }, window.location.origin);
    setNotice({ type: "success", text: "Image uploaded and previewed. Save Changes to publish it." });
  }

  useEffect(() => {
    const receive = (event: MessageEvent) => {
      if (event.origin !== window.location.origin || event.data?.type !== "admin-content-selection") return;
      const next = event.data.payload as Selection;
      const existing = contextualEntries(content, next).filter((entry) => entry.selector === next.selector || entry.selector === next.hrefSelector || entry.selector === next.backgroundSelector);
      const htmlEntry = existing.find((entry) => entry.kind === "html");
      const hrefEntry = existing.find((entry) => entry.kind === "attribute" && entry.attribute === "href");
      const srcEntry = existing.find((entry) => entry.kind === "attribute" && entry.attribute === "src");
      const altAttribute = next.tag === "video" ? "aria-label" : "alt";
      const altEntry = existing.find((entry) => entry.kind === "attribute" && entry.attribute === altAttribute);
      const backgroundEntry = existing.find((entry) => entry.kind === "backgroundImage");
      setSelection(next);
      const rawContent = htmlEntry?.value ?? next.html;
      setHtml(stripHtmlTags(rawContent));
      setHref(hrefEntry?.value ?? next.href);
      setSrc(srcEntry?.value ?? next.src);
      setAlt(altEntry?.value ?? next.alt);
      setBackgroundImage(backgroundEntry?.value ?? next.backgroundImage);
      setNotice(null);
    };
    window.addEventListener("message", receive);
    return () => window.removeEventListener("message", receive);
  }, [content]);

  const existing = (kind: ContentEntry["kind"], attribute?: ContentEntry["attribute"], selector?: string) =>
    selectedSaved.find((entry) => entry.kind === kind && entry.attribute === attribute && (!selector || entry.selector === selector));

  function handleRemoveHtml() {
    const cleaned = stripHtmlTags(html);
    setHtml(cleaned);
    setNotice({ type: "success", text: "HTML tags removed from text." });
  }

  function handleWrapTag(tag: "bold" | "italic" | "gradient") {
    const textarea = textareaRef.current;
    if (!textarea) return;
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = html.slice(start, end);
    if (!selectedText) {
      setNotice({ type: "error", text: "Highlight text inside the editor first to format it." });
      return;
    }

    let replacement = "";
    if (tag === "bold") replacement = `<strong>${selectedText}</strong>`;
    else if (tag === "italic") replacement = `<em>${selectedText}</em>`;
    else if (tag === "gradient") replacement = `<span class="tri-gradient-text">${selectedText}</span>`;

    const nextHtml = html.slice(0, start) + replacement + html.slice(end);
    setHtml(nextHtml);
    setNotice({ type: "success", text: `Formatted with ${tag}.` });
  }

  function buildEntries(): ContentEntry[] {
    if (!selection) return [];
    const entries: ContentEntry[] = [];
    if (selection.tag !== "img" && selection.html !== "") {
      const saved = existing("html", undefined, selection.selector);
      entries.push({ id: saved?.id ?? entryId(selection, "html"), selector: selection.selector, kind: "html", value: html.trim(), match: saved?.match ?? selection.html, label: selection.label || "Text content" });
    }
    if (selection.hrefSelector && href.trim()) {
      const saved = existing("attribute", selection.tag === "button" ? "data-admin-href" : "href", selection.hrefSelector);
      entries.push({ id: saved?.id ?? entryId(selection, "attribute", selection.tag === "button" ? "data-admin-href" : "href"), selector: selection.hrefSelector, kind: "attribute", attribute: selection.tag === "button" ? "data-admin-href" : "href", value: href.trim(), match: saved?.match ?? selection.href, label: `${selection.label || "Link"} URL` });
    }
    if (selection.src) {
      const altAttribute = selection.tag === "video" ? "aria-label" : "alt";
      const savedSrc = existing("attribute", "src", selection.selector);
      const savedAlt = existing("attribute", altAttribute, selection.selector);
      entries.push({ id: savedSrc?.id ?? entryId(selection, "attribute", "src"), selector: selection.selector, kind: "attribute", attribute: "src", value: src.trim(), match: savedSrc?.match ?? selection.src, label: `${selection.label || "Image"} URL` });
      entries.push({ id: savedAlt?.id ?? entryId(selection, "attribute", altAttribute), selector: selection.selector, kind: "attribute", attribute: altAttribute, value: alt.trim(), match: savedAlt?.match ?? selection.alt, label: `${selection.label || "Media"} alternative text` });
    }
    if (selection.backgroundSelector && backgroundImage) {
      const saved = existing("backgroundImage", undefined, selection.backgroundSelector);
      entries.push({ id: saved?.id ?? entryId({ ...selection, selector: selection.backgroundSelector }, "backgroundImage"), selector: selection.backgroundSelector, kind: "backgroundImage", value: backgroundImage.trim(), match: saved?.match ?? selection.backgroundImage, label: `${selection.sectionLabel} background image` });
    }
    return entries;
  }

  function validate(entries: ContentEntry[]): string | null {
    if (!selection) return "Select an element in the preview first.";
    if (!entries.length) return "This element has no editable fields.";
    if (entries.some((entry) => !entry.value.trim())) return "Empty content cannot be saved.";
    if (href && !urlValid(href)) return "Enter a valid link URL or site-relative path.";
    if (src && !urlValid(src, true)) return "Enter a valid image URL or site-relative path.";
    if (backgroundImage && !urlValid(backgroundImage, true)) return "Enter a valid background image URL or site-relative path.";
    if (/<script\b|on\w+\s*=|javascript:/i.test(html)) return "Scripts and unsafe attributes are not allowed.";
    return null;
  }

  function preview() {
    const entries = buildEntries();
    const error = validate(entries);
    if (error) return setNotice({ type: "error", text: error });
    frame.current?.contentWindow?.postMessage({ type: "admin-content-preview", entries }, window.location.origin);
    setNotice({ type: "success", text: "Preview applied. Save to publish this change." });
  }

  async function save() {
    const entries = buildEntries();
    const error = validate(entries);
    if (error || !selection) return setNotice({ type: "error", text: error || "Select an element first." });
    setSaving(true);
    try {
      const response = await fetch("/api/admin/content", {
        method: "PUT", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ scope: selection.scope, pathname: selection.pathname, pageLabel: selection.pageLabel, section: selection.section, sectionLabel: selection.sectionLabel, entries }),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "Save failed.");
      setContent(result.content);
      setStagedUploads([]);
      setNotice({ type: "success", text: "Content saved and published successfully." });
      setFrameVersion((value) => value + 1);
    } catch (reason) {
      setNotice({ type: "error", text: reason instanceof Error ? reason.message : "Content could not be saved." });
    } finally { setSaving(false); }
  }

  async function reset(ids = selectedSaved.map((entry) => entry.id)) {
    if (!ids.length) return setNotice({ type: "error", text: "This element has no saved changes to reset." });
    await discardStagedUploads();
    setSaving(true);
    try {
      const response = await fetch("/api/admin/content", { method: "DELETE", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ids }) });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "Reset failed.");
      setContent(result.content);
      setSelection(null);
      setFrameVersion((value) => value + 1);
      setNotice({ type: "success", text: "Saved change reset to the original website content." });
    } catch (reason) {
      setNotice({ type: "error", text: reason instanceof Error ? reason.message : "Reset failed." });
    } finally { setSaving(false); }
  }

  async function cancel() {
    await discardStagedUploads();
    setSelection(null);
    setFrameVersion((value) => value + 1);
    setNotice({ type: "success", text: "Editing cancelled. No changes were saved." });
  }

  async function logout() {
    await discardStagedUploads();
    await fetch("/api/admin/logout", { method: "POST" });
    window.location.assign("/admin/login");
  }

  const navigate = (next: string) => {
    if (!next.startsWith("/")) return setNotice({ type: "error", text: "Enter a valid site route beginning with /." });
    void discardStagedUploads();
    setRoute(next);
    setSelection(null);
    setFrameVersion((value) => value + 1);
    setNotice({ type: "success", text: `Preview opened for ${next}. Click an element to edit it.` });
  };

  const blogsChanged = (posts: BlogPost[]) => {
    setBlogPosts(posts);
    setRouteOptions((current) => [
      ...current.filter((item) => item.path === "/blogs" || !item.path.startsWith("/blogs/")),
      ...posts.map((post) => ({ label: `Blog: ${post.title}`, path: `/blogs/${post.slug}` })),
    ]);
  };

  return (
    <main className="admin-shell">
      {/* Shared Admin Navigation Bar */}
      <AdminNavbar
        activeTab="content"
        extraActions={
          selection ? (
            <button
              type="button"
              className="admin-primary-button"
              onClick={save}
              disabled={saving}
              style={{
                height: "38px",
                padding: "0 18px",
                borderRadius: "9px",
                background: "#ee9e1e",
                color: "#fff",
                border: "1px solid #ee9e1e",
                fontFamily: "inherit",
                fontSize: "13px",
                fontWeight: 700,
                cursor: "pointer",
              }}
            >
              {saving ? "Saving..." : "Save Changes"}
            </button>
          ) : undefined
        }
      />

      {notice && <div className={`admin-notice ${notice.type}`} role="status"><span>{notice.text}</span><button type="button" onClick={() => setNotice(null)} aria-label="Dismiss notification">×</button></div>}

      {mode === "blogs" ? <div className="admin-workspace admin-blog-workspace"><BlogManager initialPosts={blogPosts} onPostsChange={blogsChanged} /></div> : <div className="admin-workspace">
        <aside className="admin-sidebar">
          <section className="admin-panel-section">
            <p className="admin-eyebrow">Page</p>
            <label htmlFor="admin-route">Choose a website page</label>
            <select id="admin-route" value={route} onChange={(event) => navigate(event.target.value)}>{routeOptions.map((item) => <option key={item.path} value={item.path}>{item.label}</option>)}</select>
            <div className="admin-custom-route"><input value={customRoute} onChange={(event) => setCustomRoute(event.target.value)} placeholder="/other-page" aria-label="Custom route"/><button type="button" onClick={() => navigate(customRoute)}>Open</button></div>
          </section>

          <section className="admin-panel-section admin-instructions">
            <p className="admin-eyebrow">How to edit</p>
            <ol><li>Choose a page.</li><li>Click content in the preview.</li><li>Edit its fields.</li><li>Preview, then save.</li></ol>
          </section>

          <section className="admin-panel-section admin-saved-list">
            <div className="admin-section-title"><p className="admin-eyebrow">Saved changes</p><span>{allEntries.length}</span></div>
            {allEntries.length === 0 ? <p className="admin-muted">No content overrides yet.</p> : allEntries.map((entry) => <div className="admin-saved-row" key={entry.id}><span title={entry.label}>{entry.label}</span><button type="button" onClick={() => reset([entry.id])} aria-label={`Reset ${entry.label}`}>Reset</button></div>)}
          </section>
        </aside>

        <section className="admin-preview-panel">
          <div className="admin-preview-bar"><span>Live page preview</span><a href={route} target="_blank" rel="noreferrer">Open full page ↗</a></div>
          <iframe key={`${route}-${frameVersion}`} ref={frame} src={`${route}${route.includes("?") ? "&" : "?"}adminPreview=1`} title={`Editing preview for ${route}`} />
        </section>

        <aside className="admin-editor-panel">
          {!selection ? <div className="admin-empty-state"><span>✦</span><h2>Select content to edit</h2><p>Click a heading, paragraph, button, link, image, card, navigation item, or footer element in the preview.</p></div> : <>
            <div className="admin-editor-heading"><div><p className="admin-eyebrow">Editing</p><h2>{selection.label || selection.tag}</h2></div><span>{selection.scope === "global" ? "Global" : selection.sectionLabel}</span></div>

            {selection.tag !== "img" && selection.html !== "" && (
              <div className="admin-field">
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginBottom: "6px",
                  }}
                >
                  <label htmlFor="content-html" style={{ margin: 0, fontWeight: 700 }}>
                    Content Text
                  </label>
                  {hasHtmlTags && (
                    <button
                      type="button"
                      onClick={handleRemoveHtml}
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "5px",
                        padding: "3px 9px",
                        border: "1px solid #087b71",
                        borderRadius: "6px",
                        background: "#edf7f5",
                        color: "#087b71",
                        fontSize: "11px",
                        fontWeight: 700,
                        cursor: "pointer",
                        transition: "all 0.15s ease",
                      }}
                      title="Strip HTML tags (like <span>, <strong>) and convert to clean plain text"
                    >
                      🧹 Remove HTML Tags
                    </button>
                  )}
                </div>

                <textarea
                  ref={textareaRef}
                  id="content-html"
                  rows={6}
                  value={html}
                  onChange={(event) => setHtml(event.target.value)}
                  placeholder="Enter content text..."
                  style={{
                    fontFamily: "inherit",
                    fontSize: "13px",
                    lineHeight: 1.6,
                    width: "100%",
                  }}
                />

                {/* Quick Formatting & HTML cleaning tools */}
                <div
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: "8px",
                    marginTop: "6px",
                    padding: "8px 10px",
                    background: "#f4f7f9",
                    borderRadius: "8px",
                    border: "1px solid #e2e8ee",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                    <span style={{ fontSize: "11px", color: "#667085", fontWeight: 600 }}>
                      Format:
                    </span>
                    <button
                      type="button"
                      onClick={() => handleWrapTag("bold")}
                      style={{
                        padding: "2px 7px",
                        fontSize: "11px",
                        fontWeight: 700,
                        border: "1px solid #cfd8e1",
                        borderRadius: "4px",
                        background: "#fff",
                        color: "#344054",
                        cursor: "pointer",
                      }}
                      title="Wrap highlighted text in <strong>"
                    >
                      Bold
                    </button>
                    <button
                      type="button"
                      onClick={() => handleWrapTag("italic")}
                      style={{
                        padding: "2px 7px",
                        fontSize: "11px",
                        fontStyle: "italic",
                        border: "1px solid #cfd8e1",
                        borderRadius: "4px",
                        background: "#fff",
                        color: "#344054",
                        cursor: "pointer",
                      }}
                      title="Wrap highlighted text in <em>"
                    >
                      Italic
                    </button>
                    <button
                      type="button"
                      onClick={() => handleWrapTag("gradient")}
                      style={{
                        padding: "2px 7px",
                        fontSize: "11px",
                        fontWeight: 600,
                        border: "1px solid #cfd8e1",
                        borderRadius: "4px",
                        background: "#fff",
                        color: "#087b71",
                        cursor: "pointer",
                      }}
                      title="Wrap highlighted text in gradient span"
                    >
                      Gradient
                    </button>
                  </div>

                  <button
                    type="button"
                    onClick={handleRemoveHtml}
                    style={{
                      background: "none",
                      border: "none",
                      color: "#b42318",
                      fontSize: "11px",
                      fontWeight: 600,
                      cursor: "pointer",
                      textDecoration: "underline",
                      padding: 0,
                    }}
                  >
                    Strip all HTML tags
                  </button>
                </div>

                <small style={{ display: "block", marginTop: "4px", color: "#98a2b3" }}>
                  Supports plain text as well as inline tags (&lt;span&gt;, &lt;strong&gt;, &lt;em&gt;).
                </small>
              </div>
            )}
            {selection.hrefSelector && <div className="admin-field"><label htmlFor="content-link">Button or link URL</label><input id="content-link" value={href} onChange={(event) => setHref(event.target.value)} placeholder="/contact or https://..." className={href && !urlValid(href) ? "invalid" : ""}/>{href && !urlValid(href) && <small className="error">Enter a valid URL or /site-path.</small>}</div>}
            {selection.src && <>{selection.tag === "img" && <ImageUploadField id="content-image-upload" label={selection.label || "Current image"} value={src} alt={alt} onUploaded={(path) => imageUploaded(path, "src")} onError={(text) => setNotice({ type: "error", text })}/>}<div className="admin-field"><label htmlFor="content-image">{selection.tag === "video" ? "Video URL" : "Image URL"}</label><input id="content-image" value={src} onChange={(event) => setSrc(event.target.value)} className={src && !urlValid(src, true) ? "invalid" : ""}/></div><div className="admin-field"><label htmlFor="content-alt">Media alternative text</label><input id="content-alt" value={alt} onChange={(event) => setAlt(event.target.value)} /></div></>}
            {selection.backgroundSelector && <><ImageUploadField id="content-background-upload" label={`${selection.sectionLabel} background`} value={backgroundImage} alt={`${selection.sectionLabel} background preview`} onUploaded={(path) => imageUploaded(path, "background")} onError={(text) => setNotice({ type: "error", text })}/><div className="admin-field"><label htmlFor="content-background">Section background image URL</label><input id="content-background" value={backgroundImage} onChange={(event) => setBackgroundImage(event.target.value)} /></div></>}

            <div className="admin-actions"><button type="button" className="admin-primary-button" onClick={save} disabled={saving}>{saving ? "Saving..." : "Save Changes"}</button><button type="button" className="admin-secondary-button" onClick={preview} disabled={saving}>Preview</button><button type="button" className="admin-secondary-button" onClick={() => reset()} disabled={saving || selectedSaved.length === 0}>Reset</button><button type="button" className="admin-text-button" onClick={() => void cancel()} disabled={saving}>Cancel</button></div>
          </>}
        </aside>
      </div>}
    </main>
  );
}
