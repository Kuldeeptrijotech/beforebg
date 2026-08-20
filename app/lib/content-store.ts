import { promises as fs } from "node:fs";
import path from "node:path";

export type ContentKind = "html" | "attribute" | "backgroundImage";

export type ContentEntry = {
  id: string;
  selector: string;
  kind: ContentKind;
  value: string;
  match?: string;
  attribute?: "href" | "src" | "alt" | "aria-label" | "title" | "data-admin-href";
  label: string;
};

export type ContentSection = {
  label: string;
  entries: ContentEntry[];
};

export type PageContent = {
  label: string;
  sections: Record<string, ContentSection>;
};

export type SiteContent = {
  version: 1;
  updatedAt: string | null;
  global: { sections: Record<string, ContentSection> };
  pages: Record<string, PageContent>;
};

const contentPath = path.join(process.cwd(), "app", "data", "siteContent.json");

const emptyContent = (): SiteContent => ({
  version: 1,
  updatedAt: null,
  global: { sections: {} },
  pages: {},
});

export async function readSiteContent(): Promise<SiteContent> {
  try {
    const raw = await fs.readFile(contentPath, "utf8");
    return JSON.parse(raw.replace(/^\uFEFF/, "")) as SiteContent;
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "ENOENT") return emptyContent();
    throw error;
  }
}

export async function writeSiteContent(content: SiteContent): Promise<void> {
  const next = { ...content, version: 1 as const, updatedAt: new Date().toISOString() };
  const temporaryPath = `${contentPath}.tmp`;
  await fs.writeFile(temporaryPath, `${JSON.stringify(next, null, 2)}\n`, "utf8");
  await fs.rename(temporaryPath, contentPath);
}

export function entriesForPath(content: SiteContent, pathname: string): ContentEntry[] {
  const globalEntries = Object.values(content.global.sections).flatMap((section) => section.entries);
  const pageEntries = Object.values(content.pages[pathname]?.sections ?? {}).flatMap((section) => section.entries);
  return [...globalEntries, ...pageEntries];
}

export function isSafeUrl(value: string, image = false): boolean {
  if (!value || value.length > 2048) return false;
  if (value.startsWith("/") || (!image && (value.startsWith("#") || value.startsWith("mailto:") || value.startsWith("tel:")))) return true;
  try {
    const url = new URL(value);
    return url.protocol === "https:" || url.protocol === "http:";
  } catch {
    return false;
  }
}

export function validateEntry(entry: ContentEntry): string | null {
  if (!entry.id?.trim() || !entry.selector?.trim() || !entry.label?.trim()) return "Entry metadata is incomplete.";
  if (!entry.value?.trim()) return "Content cannot be empty.";
  if (entry.value.length > 50000) return "Content is too long.";
  if (entry.kind === "attribute" && (entry.attribute === "href" || entry.attribute === "data-admin-href") && !isSafeUrl(entry.value)) return "Enter a valid link URL.";
  if (entry.kind === "attribute" && entry.attribute === "src" && !isSafeUrl(entry.value, true)) return "Enter a valid image URL.";
  if (entry.kind === "backgroundImage" && !isSafeUrl(entry.value, true)) return "Enter a valid background image URL.";
  if (/<script\b|on\w+\s*=|javascript:/i.test(entry.value)) return "Unsafe content is not allowed.";
  return null;
}

