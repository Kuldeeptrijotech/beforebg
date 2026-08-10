import "server-only";
import { promises as fs } from "node:fs";
import path from "node:path";
import type { KnowledgeEntry } from "@/app/types/chatbot";

const directory = path.join(process.cwd(), "app", "data", "knowledge-base");
const stopWords = new Set(["a", "an", "and", "are", "can", "could", "do", "does", "for", "how", "i", "in", "is", "it", "me", "my", "of", "on", "please", "tell", "that", "the", "their", "to", "us", "we", "what", "when", "where", "which", "who", "why", "with", "would", "you", "your"]);
const words = (value: string) => value.toLowerCase().normalize("NFKD").replace(/[^a-z0-9\s-]/g, " ").split(/\s+/).filter((word) => word.length > 1 && !stopWords.has(word)).map((word) => word.length > 4 && word.endsWith("ies") ? `${word.slice(0, -3)}y` : word.length > 3 && word.endsWith("s") && !word.endsWith("ss") ? word.slice(0, -1) : word);
let knowledgeCache: Promise<KnowledgeEntry[]> | null = null;

function scoreEntry(entry: KnowledgeEntry, queryWords: Set<string>, queryText: string) {
  const title = new Set(words(entry.title));
  const keywords = new Set(entry.keywords.flatMap(words));
  const content = new Set(words(entry.content));
  let score = 0;
  for (const word of queryWords) score += title.has(word) ? 6 : keywords.has(word) ? 4 : content.has(word) ? 2 : 0;
  if (entry.title.toLowerCase().includes(queryText.toLowerCase())) score += 8;
  if (entry.content.toLowerCase().includes(queryText.toLowerCase())) score += 4;
  if (queryText && entry.keywords.some((keyword) => keyword.toLowerCase().includes(queryText.toLowerCase()))) score += 3;
  return score > 0 ? score + entry.priority / 20 : 0;
}

function isEntry(value: unknown): value is KnowledgeEntry {
  if (!value || typeof value !== "object") return false;
  const entry = value as Partial<KnowledgeEntry>;
  return typeof entry.id === "string" && typeof entry.title === "string" && typeof entry.category === "string" && typeof entry.content === "string" && Array.isArray(entry.keywords) && entry.keywords.every((keyword) => typeof keyword === "string") && typeof entry.priority === "number" && typeof entry.enabled === "boolean";
}

function structuredEntries(value: unknown, filename: string): KnowledgeEntry[] {
  if (Array.isArray(value)) {
    const valid = value.filter(isEntry);
    if (valid.length !== value.length) console.warn("Knowledge file contains invalid entries", { filename, ignored: value.length - valid.length });
    return valid;
  }
  // Also accept simple structured JSON objects such as { "company": { "name": ..., "email": ... } }.
  if (value && typeof value === "object") return Object.entries(value).map(([category, data]) => {
    const content = Object.entries(data && typeof data === "object" ? data as Record<string, unknown> : { value: data }).map(([key, item]) => `${key}: ${String(item)}`).join(". ");
    return { id: `${path.basename(filename, ".json")}-${category}`.replace(/[^a-z0-9-]/gi, "-"), title: category.replace(/[-_]/g, " "), category, content, keywords: [...words(category), ...words(content)], priority: 5, enabled: true };
  }).filter((entry) => entry.content.trim());
  console.warn("Knowledge file must contain an array or object", { filename });
  return [];
}

async function loadFiles(): Promise<KnowledgeEntry[]> {
  let names: string[];
  try { names = (await fs.readdir(directory)).filter((name) => name.endsWith(".json")); }
  catch (error) { console.warn("Knowledge-base directory is unavailable", { code: (error as NodeJS.ErrnoException).code }); return []; }
  const groups = await Promise.all(names.map(async (name) => {
    try { return structuredEntries(JSON.parse(await fs.readFile(path.join(directory, name), "utf8")), name); }
    catch (error) { console.warn("Skipping invalid knowledge file", { filename: name, reason: error instanceof SyntaxError ? "invalid-json" : "read-error" }); return []; }
  }));
  return groups.flat().filter((entry) => entry.enabled && entry.content.trim());
}

/** Loads every JSON file in data/knowledge-base. Adding a new JSON file requires no code change. */
export function loadKnowledgeBase(): Promise<KnowledgeEntry[]> {
  knowledgeCache ??= loadFiles();
  return knowledgeCache;
}

export async function readKnowledgeEntries(): Promise<KnowledgeEntry[]> {
  return loadKnowledgeBase();
}

export async function searchKnowledge(query: string, limit = 8) {
  const queryText = query.trim().toLowerCase();
  const queryWords = new Set(words(query));
  const scored = (await readKnowledgeEntries()).map((entry) => ({ entry, score: scoreEntry(entry, queryWords, queryText) }));
  return scored.filter(({ score }) => score >= 2).sort((a, b) => b.score - a.score).slice(0, limit).map(({ entry }) => entry);
}

export async function getRelevantContext(query: string, limit = 5): Promise<string> {
  return (await searchKnowledge(query, limit)).map((entry) => `${entry.title}: ${entry.content}`).join("\n");
}

export function knowledgeFallbackAnswer(entries: KnowledgeEntry[], query = ""): string {
  if (!entries.length) return "I couldn’t find verified information about that in the Trijotech knowledge base. Please use our [contact page](/contact), and the team will help you.";
  const selected = entries.slice(0, 4);
  const intro = query ? "Here is the most relevant information I could find for your question:" : "Here are the most relevant details from the Trijotech knowledge base:";
  const bullets = selected.map((entry) => {
    const content = entry.content.replace(/\s+/g, " ").trim();
    const trimmed = content.length > 260 ? `${content.slice(0, 260)}…` : content;
    return `- **${entry.title}:** ${trimmed}`;
  }).join("\n");
  const links = selected.filter((entry) => entry.url).map((entry) => `[${entry.title}](${entry.url})`);
  return `${intro}\n\n${bullets}${links.length ? `\n\nLearn more: ${links.join(" · ")}` : ""}\n\nIf you need a more detailed or tailored answer, please use our [contact page](/contact).`;
}

export async function writeKnowledgeFile(category: string, entries: KnowledgeEntry[]) {
  const safe = category.toLowerCase().replace(/[^a-z0-9-]/g, "").slice(0, 40);
  if (!safe) throw new Error("Invalid category.");
  await fs.writeFile(path.join(directory, `${safe}.json`), `${JSON.stringify(entries, null, 2)}\n`, "utf8");
  knowledgeCache = null;
}

async function localKnowledgeFiles() {
  const names = (await fs.readdir(directory)).filter((name) => name.endsWith(".json"));
  return Promise.all(names.map(async (name) => ({ name, entries: JSON.parse(await fs.readFile(path.join(directory, name), "utf8")) as KnowledgeEntry[] })));
}

export async function saveKnowledgeEntry(entry: KnowledgeEntry) {
  const files = await localKnowledgeFiles();
  const source = files.find((file) => file.entries.some((item) => item.id === entry.id));
  const target = source || files.find((file) => file.name === "custom.json") || { name: "custom.json", entries: [] };
  const index = target.entries.findIndex((item) => item.id === entry.id);
  if (index >= 0) target.entries[index] = entry; else target.entries.push(entry);
  await fs.writeFile(path.join(directory, target.name), `${JSON.stringify(target.entries, null, 2)}\n`, "utf8");
  knowledgeCache = null;
}

export async function deleteKnowledgeEntry(id: string) {
  const files = await localKnowledgeFiles();
  const source = files.find((file) => file.entries.some((item) => item.id === id));
  if (!source) return false;
  source.entries = source.entries.filter((item) => item.id !== id);
  await fs.writeFile(path.join(directory, source.name), `${JSON.stringify(source.entries, null, 2)}\n`, "utf8");
  knowledgeCache = null;
  return true;
}
