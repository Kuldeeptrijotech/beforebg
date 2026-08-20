"use client";

import { usePathname } from "next/navigation";
import { useEffect, useMemo, useRef } from "react";
import type { ContentEntry, SiteContent } from "@/app/lib/content-store";

const normalize = (value: string) => value.replace(/\s+/g, " ").trim();

function safeHtml(value: string): string {
  const template = document.createElement("template");
  template.innerHTML = value;
  template.content.querySelectorAll("script,style,iframe,object,embed,form").forEach((node) => node.remove());
  template.content.querySelectorAll<HTMLElement>("*").forEach((node) => {
    for (const attribute of Array.from(node.attributes)) {
      if (/^on/i.test(attribute.name) || /javascript:/i.test(attribute.value)) node.removeAttribute(attribute.name);
    }
  });
  return template.innerHTML;
}

function cssPath(element: Element): string {
  if (element.id) return `#${CSS.escape(element.id)}`;
  const parts: string[] = [];
  let current: Element | null = element;
  while (current && current !== document.body && parts.length < 7) {
    let part = current.tagName.toLowerCase();
    const stableClasses = Array.from(current.classList).filter((name) => !/^(is-|active|slick|current)/.test(name)).slice(0, 2);
    if (stableClasses.length) part += stableClasses.map((name) => `.${CSS.escape(name)}`).join("");
    const parent: Element | null = current.parentElement;
    if (parent) {
      const peers = Array.from(parent.children).filter((child) => child.tagName === current?.tagName);
      if (peers.length > 1) part += `:nth-of-type(${peers.indexOf(current) + 1})`;
    }
    parts.unshift(part);
    current = parent;
  }
  return parts.join(" > ");
}

function applyEntry(entry: ContentEntry) {
  document.querySelectorAll<HTMLElement>(entry.selector).forEach((element) => {
    if (entry.kind === "html") {
      const current = normalize(element.innerHTML);
      if (current === normalize(entry.value)) return;
      if (!entry.match || current === normalize(entry.match)) element.innerHTML = safeHtml(entry.value);
      return;
    }
    if (entry.kind === "backgroundImage") {
      const current = element.style.backgroundImage.replace(/^url\(["']?|["']?\)$/g, "");
      if (current === entry.value) return;
      if (!entry.match || current === entry.match) element.style.backgroundImage = `url("${entry.value}")`;
      return;
    }
    if (entry.attribute) {
      const current = element.getAttribute(entry.attribute) || "";
      if (current === entry.value) return;
      if (!entry.match || current === entry.match) {
        element.setAttribute(entry.attribute, entry.value);
        if (entry.attribute === "src") {
          element.removeAttribute("srcset");
          element.removeAttribute("sizes");
          if (element instanceof HTMLVideoElement) element.load();
        }
      }
    }
  });
}

function editableTarget(origin: Element): HTMLElement {
  return (origin.closest("h1,h2,h3,h4,h5,h6,p,a,button,img,video,li,span,label") || origin) as HTMLElement;
}

export default function ContentRuntime({ content }: { content: SiteContent }) {
  const pathname = usePathname();
  const applying = useRef(false);
  const entries = useMemo(() => {
    const global = Object.values(content.global.sections).flatMap((section) => section.entries);
    const page = Object.values(content.pages[pathname]?.sections ?? {}).flatMap((section) => section.entries);
    return [...global, ...page];
  }, [content, pathname]);

  useEffect(() => {
    if (entries.length === 0) return;

    let frame = 0;
    const applyAll = () => {
      if (applying.current) return;
      applying.current = true;
      entries.forEach(applyEntry);
      queueMicrotask(() => { applying.current = false; });
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
    const attributeFilter = Array.from(
      new Set(entries.flatMap((entry) => entry.attribute ? [entry.attribute] : [])),
    );
    observer.observe(document.body, {
      subtree: true,
      childList: true,
      ...(attributeFilter.length ? { attributes: true, attributeFilter } : {}),
    });
    return () => {
      observer.disconnect();
      window.cancelAnimationFrame(frame);
    };
  }, [entries]);

  useEffect(() => {
    const previewMode = new URLSearchParams(window.location.search).get("adminPreview") === "1";
    const followAdminButtonLink = (event: MouseEvent) => {
      const button = (event.target as Element | null)?.closest<HTMLButtonElement>("button[data-admin-href]");
      if (!button || previewMode) return;
      event.preventDefault();
      event.stopPropagation();
      window.location.assign(button.dataset.adminHref || "/");
    };
    document.addEventListener("click", followAdminButtonLink, true);
    if (!previewMode) return () => document.removeEventListener("click", followAdminButtonLink, true);
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
      selectedElement?.classList.remove("admin-edit-selected");
      element.classList.remove("admin-edit-hover");
      element.classList.add("admin-edit-selected");
      selectedElement = element;
      const section = element.closest("header,footer,section,main") as HTMLElement | null;
      const isMedia = element.tagName === "IMG" || element.tagName === "VIDEO";
      const backgroundElement = (element.closest("section")?.querySelector<HTMLElement>("[style*='background-image']") || null);
      const global = Boolean(element.closest("header,footer"));
      const linkElement = element.closest("a") || (element.tagName === "BUTTON" ? element : null);
      window.parent.postMessage({
        type: "admin-content-selection",
        payload: {
          pathname,
          pageLabel: document.title || pathname,
          scope: global ? "global" : "page",
          section: section?.id || section?.classList[0] || section?.tagName.toLowerCase() || "general",
          sectionLabel: section?.getAttribute("aria-label") || section?.classList[0]?.replace(/[-_]/g, " ") || "General",
          selector: cssPath(element),
          tag: element.tagName.toLowerCase(),
          label: normalize(element.textContent || element.getAttribute("alt") || element.getAttribute("aria-label") || element.tagName),
          html: isMedia ? "" : element.innerHTML,
          href: linkElement?.getAttribute(linkElement.tagName === "BUTTON" ? "data-admin-href" : "href") || "",
          hrefSelector: linkElement ? cssPath(linkElement) : "",
          src: isMedia ? element.getAttribute("src") || element.getAttribute("data-media-src") || "" : "",
          alt: element.tagName === "VIDEO" ? element.getAttribute("aria-label") || "" : element.tagName === "IMG" ? element.getAttribute("alt") || "" : "",
          backgroundImage: backgroundElement?.style.backgroundImage.replace(/^url\(["']?|["']?\)$/g, "") || "",
          backgroundSelector: backgroundElement ? cssPath(backgroundElement) : "",
        },
      }, window.location.origin);
    };

    const preview = (event: MessageEvent) => {
      if (event.origin !== window.location.origin || event.data?.type !== "admin-content-preview") return;
      (event.data.entries as ContentEntry[]).forEach(applyEntry);
    };
    document.addEventListener("mouseover", showHover, true);
    document.addEventListener("mouseleave", clearHover, true);
    document.addEventListener("click", select, true);
    window.addEventListener("message", preview);
    return () => {
      document.documentElement.classList.remove("admin-preview-mode");
      hoveredElement?.classList.remove("admin-edit-hover");
      selectedElement?.classList.remove("admin-edit-selected");
      document.removeEventListener("mouseover", showHover, true);
      document.removeEventListener("mouseleave", clearHover, true);
      document.removeEventListener("click", followAdminButtonLink, true);
      document.removeEventListener("click", select, true);
      window.removeEventListener("message", preview);
    };
  }, [pathname]);

  return null;
}



