"use client";

import { usePathname } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import type { ContentEntry, SiteContent } from "@/app/lib/content-store";

const normalize = (value: string) => value.replace(/\s+/g, " ").trim();

function safeHtml(value: string): string {
  const template = document.createElement("template");
  template.innerHTML = value;
  template.content
    .querySelectorAll("script,style,iframe,object,embed,form")
    .forEach((node) => node.remove());
  template.content.querySelectorAll<HTMLElement>("*").forEach((node) => {
    for (const attribute of Array.from(node.attributes)) {
      if (/^on/i.test(attribute.name) || /javascript:/i.test(attribute.value))
        node.removeAttribute(attribute.name);
    }
  });
  return template.innerHTML;
}

function cleanClass(name: string): boolean {
  if (!name || typeof name !== "string") return false;
  // Ignore state and ephemeral admin classes
  if (/^(is-|active|slick|swiper|current|admin-|open|show|focus)/i.test(name)) return false;
  // Ignore classes with special punctuation (like Tailwind arbitrary values / responsive prefixes)
  if (/[[\]\\/:%$(.)#]/.test(name)) return false;
  // Ignore common generic layout utilities that might be unstable across builds
  if (
    /^(flex|grid|block|inline|hidden|relative|absolute|static|fixed|isolate|mx-|my-|mt-|mb-|ml-|mr-|pt-|pb-|pl-|pr-|p-|m-|w-|h-|max-|min-|gap-|text-|bg-|border-|rounded-|leading-|tracking-|opacity-|z-|top-|bottom-|left-|right-)/.test(
      name
    )
  )
    return false;
  return true;
}

function cssPath(element: Element): string {
  if (element.id && !/^(admin-|__)/.test(element.id)) return `#${CSS.escape(element.id)}`;

  const parts: string[] = [];
  let current: Element | null = element;

  while (
    current &&
    current !== document.body &&
    current !== document.documentElement &&
    parts.length < 8
  ) {
    if (current.id && !/^(admin-|__)/.test(current.id)) {
      parts.unshift(`#${CSS.escape(current.id)}`);
      break;
    }

    let part = current.tagName.toLowerCase();

    // Select stable semantic classes
    const validClasses = Array.from(current.classList).filter(cleanClass).slice(0, 2);
    if (validClasses.length) {
      part += validClasses.map((cls) => `.${CSS.escape(cls)}`).join("");
    }

    const parent: Element | null = current.parentElement;
    if (parent) {
      const siblings = Array.from(parent.children).filter(
        (child) => child.tagName === current?.tagName
      );
      if (siblings.length > 1) {
        const index = siblings.indexOf(current) + 1;
        part += `:nth-of-type(${index})`;
      }
    }

    parts.unshift(part);
    current = parent;
  }

  return parts.join(" > ");
}

function applyEntry(entry: ContentEntry) {
  // Strip any accidental admin state classes from selector
  const cleanSelector = entry.selector.replace(/\.admin-edit-(selected|hover)/g, "").trim();
  if (!cleanSelector) return;

  let elements: NodeListOf<HTMLElement>;
  try {
    elements = document.querySelectorAll<HTMLElement>(cleanSelector);
  } catch {
    return;
  }

  elements.forEach((element) => {
    if (entry.kind === "html") {
      const current = normalize(element.innerHTML);
      const target = normalize(entry.value);
      if (current === target) return;
      element.innerHTML = safeHtml(entry.value);
      return;
    }
    if (entry.kind === "backgroundImage") {
      const current = element.style.backgroundImage.replace(/^url\(["']?|["']?\)$/g, "");
      if (current === entry.value) return;
      element.style.backgroundImage = `url("${entry.value}")`;
      return;
    }
    if (entry.attribute) {
      const current = element.getAttribute(entry.attribute) || "";
      if (current === entry.value) return;
      element.setAttribute(entry.attribute, entry.value);
      if (entry.attribute === "src") {
        element.removeAttribute("srcset");
        element.removeAttribute("sizes");
        if (element instanceof HTMLVideoElement) element.load();
      }
    }
  });
}

function editableTarget(origin: Element): HTMLElement {
  return (origin.closest("h1,h2,h3,h4,h5,h6,p,a,button,img,video,li,span,label") ||
    origin) as HTMLElement;
}

export default function ContentRuntime({ content }: { content: SiteContent }) {
  const pathname = usePathname();
  const [siteContent, setSiteContent] = useState<SiteContent>(content);
  const [previewEntries, setPreviewEntries] = useState<ContentEntry[]>([]);
  const applying = useRef(false);

  // Sync latest content on client mount to bypass static page cache
  useEffect(() => {
    let active = true;
    fetch("/api/content", { cache: "no-store" })
      .then((res) => (res.ok ? res.json() : null))
      .then((fresh) => {
        if (active && fresh?.version) {
          setSiteContent(fresh);
        }
      })
      .catch(() => undefined);
    return () => {
      active = false;
    };
  }, [pathname]);

  const entries = useMemo(() => {
    const global = Object.values(siteContent.global.sections).flatMap((section) => section.entries);
    const page = Object.values(siteContent.pages[pathname]?.sections ?? {}).flatMap(
      (section) => section.entries
    );
    const all = [...global, ...page];
    if (previewEntries.length) {
      const previewIds = new Set(previewEntries.map((p) => p.id));
      const filtered = all.filter((e) => !previewIds.has(e.id));
      return [...filtered, ...previewEntries];
    }
    return all;
  }, [siteContent, pathname, previewEntries]);

  // Apply content overrides to DOM
  useEffect(() => {
    if (entries.length === 0) return;

    let frame = 0;
    const applyAll = () => {
      if (applying.current) return;
      applying.current = true;
      entries.forEach(applyEntry);
      queueMicrotask(() => {
        applying.current = false;
      });
    };

    const scheduleApply = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(() => {
        frame = 0;
        applyAll();
      });
    };

    applyAll();
    const observer = new MutationObserver(scheduleApply);
    observer.observe(document.body, {
      subtree: true,
      childList: true,
      attributes: true,
    });

    return () => {
      observer.disconnect();
      window.cancelAnimationFrame(frame);
    };
  }, [entries]);

  // Admin Preview Mode Interaction
  useEffect(() => {
    const previewMode = new URLSearchParams(window.location.search).get("adminPreview") === "1";

    const followAdminButtonLink = (event: MouseEvent) => {
      const button = (event.target as Element | null)?.closest<HTMLButtonElement>(
        "button[data-admin-href]"
      );
      if (!button || previewMode) return;
      event.preventDefault();
      event.stopPropagation();
      window.location.assign(button.dataset.adminHref || "/");
    };

    document.addEventListener("click", followAdminButtonLink, true);
    if (!previewMode)
      return () => document.removeEventListener("click", followAdminButtonLink, true);

    document.documentElement.classList.add("admin-preview-mode");

    let hoveredElement: HTMLElement | null = null;
    let selectedElement: HTMLElement | null = null;

    const showHover = (event: MouseEvent) => {
      const origin = event.target;
      if (!(origin instanceof Element)) return;
      const element = editableTarget(origin);
      if (hoveredElement === element) return;
      hoveredElement?.classList.remove("admin-edit-hover");
      hoveredElement = element;
      if (element !== selectedElement) element.classList.add("admin-edit-hover");
    };

    const clearHover = () => {
      hoveredElement?.classList.remove("admin-edit-hover");
      hoveredElement = null;
    };

    const select = (event: MouseEvent) => {
      const origin = event.target;
      if (!(origin instanceof Element)) return;
      event.preventDefault();
      event.stopPropagation();
      const element = editableTarget(origin);

      // Compute selector BEFORE adding the transient class .admin-edit-selected
      const selector = cssPath(element);

      selectedElement?.classList.remove("admin-edit-selected");
      element.classList.remove("admin-edit-hover");
      element.classList.add("admin-edit-selected");
      selectedElement = element;

      const section = element.closest("header,footer,section,main") as HTMLElement | null;
      const isMedia = element.tagName === "IMG" || element.tagName === "VIDEO";
      const backgroundElement =
        element.closest("section")?.querySelector<HTMLElement>("[style*='background-image']") ||
        null;
      const global = Boolean(element.closest("header,footer"));
      const linkElement = element.closest("a") || (element.tagName === "BUTTON" ? element : null);

      window.parent.postMessage(
        {
          type: "admin-content-selection",
          payload: {
            pathname,
            pageLabel: document.title || pathname,
            scope: global ? "global" : "page",
            section:
              section?.id || section?.classList[0] || section?.tagName.toLowerCase() || "general",
            sectionLabel:
              section?.getAttribute("aria-label") ||
              section?.classList[0]?.replace(/[-_]/g, " ") ||
              "General",
            selector,
            tag: element.tagName.toLowerCase(),
            label: normalize(
              element.textContent ||
                element.getAttribute("alt") ||
                element.getAttribute("aria-label") ||
                element.tagName
            ),
            html: isMedia ? "" : element.innerHTML,
            href:
              linkElement?.getAttribute(
                linkElement.tagName === "BUTTON" ? "data-admin-href" : "href"
              ) || "",
            hrefSelector: linkElement ? cssPath(linkElement) : "",
            src: isMedia
              ? element.getAttribute("src") || element.getAttribute("data-media-src") || ""
              : "",
            alt:
              element.tagName === "VIDEO"
                ? element.getAttribute("aria-label") || ""
                : element.tagName === "IMG"
                  ? element.getAttribute("alt") || ""
                  : "",
            backgroundImage:
              backgroundElement?.style.backgroundImage.replace(/^url\(["']?|["']?\)$/g, "") || "",
            backgroundSelector: backgroundElement ? cssPath(backgroundElement) : "",
          },
        },
        window.location.origin
      );
    };

    const handlePreview = (event: MessageEvent) => {
      if (event.origin !== window.location.origin || event.data?.type !== "admin-content-preview")
        return;
      const newEntries = event.data.entries as ContentEntry[];
      setPreviewEntries(newEntries);
      newEntries.forEach(applyEntry);
    };

    document.addEventListener("mouseover", showHover, true);
    document.addEventListener("mouseleave", clearHover, true);
    document.addEventListener("click", select, true);
    window.addEventListener("message", handlePreview);

    return () => {
      document.documentElement.classList.remove("admin-preview-mode");
      hoveredElement?.classList.remove("admin-edit-hover");
      selectedElement?.classList.remove("admin-edit-selected");
      document.removeEventListener("mouseover", showHover, true);
      document.removeEventListener("mouseleave", clearHover, true);
      document.removeEventListener("click", followAdminButtonLink, true);
      document.removeEventListener("click", select, true);
      window.removeEventListener("message", handlePreview);
    };
  }, [pathname]);

  return null;
}
