import { promises as fs } from "node:fs";
import path from "node:path";
import { legacyBlogPosts, type Blog, type BlogPost } from "@/app/data/blogs";

type BlogStore = { version: 1; initialized: boolean; updatedAt: string | null; posts: BlogPost[] };
const storePath = path.join(process.cwd(), "app", "data", "blogs.json");

const initialStore = (): BlogStore => ({ version: 1, initialized: false, updatedAt: null, posts: legacyBlogPosts() });
export const defaultBlogBlockStyle = () => ({
  textAlign: "left" as const,
  fontSize: "medium" as const,
  textColor: "",
  backgroundColor: "",
  spacing: "normal" as const,
  imageWidth: "100" as const,
  imageAlign: "center" as const,
  borderRadius: "16" as const,
  fontWeight: "400" as const,
  fontStyle: "normal" as const,
  textDecoration: "none" as const,
  lineHeight: "normal" as const,
  textTransform: "none" as const,
  padding: "0" as const,
  blockRadius: "0" as const,
  borderColor: "",
  imageMaxHeight: "auto" as const,
  imageObjectFit: "contain" as const,
  imageShadow: "soft" as const,
});
export const defaultFeaturedImageStyle = () => ({ width: "100" as const, align: "center" as const, maxHeight: "640" as const, objectFit: "contain" as const, borderRadius: "16" as const });

export function slugify(value: string) {
  return value.toLowerCase().normalize("NFKD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 100) || "blog";
}

export function uniqueSlug(value: string, posts: BlogPost[], excludeId?: string) {
  const base = slugify(value);
  let candidate = base;
  let suffix = 2;
  while (posts.some((post) => post.id !== excludeId && post.slug === candidate)) candidate = `${base}-${suffix++}`;
  return candidate;
}

export async function readBlogStore(): Promise<BlogStore> {
  try {
    const raw = await fs.readFile(storePath, "utf8");
    const parsed = JSON.parse(raw.replace(/^\uFEFF/, "")) as BlogStore;
    if (!parsed.initialized) return initialStore();
    return { version: 1, initialized: true, updatedAt: parsed.updatedAt || null, posts: Array.isArray(parsed.posts) ? parsed.posts.map((post) => ({ ...post, featuredImageStyle: { ...defaultFeaturedImageStyle(), ...(post.featuredImageStyle || {}) }, contentImages: Array.isArray(post.contentImages) ? post.contentImages : [], contentBlocks: Array.isArray(post.contentBlocks) ? post.contentBlocks.map((block) => ({ ...block, linkUrl: block.linkUrl || "", style: { ...defaultBlogBlockStyle(), ...(block.style || {}) } })) : [] })) : [] };
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code !== "ENOENT") throw error;
    return initialStore();
  }
}

export async function hasPersistentBlogStore() {
  try {
    const parsed = JSON.parse((await fs.readFile(storePath, "utf8")).replace(/^\uFEFF/, "")) as Partial<BlogStore>;
    return parsed.initialized === true;
  } catch { return false; }
}

export async function writeBlogStore(posts: BlogPost[]) {
  const next: BlogStore = { version: 1, initialized: true, updatedAt: new Date().toISOString(), posts };
  const temporaryPath = `${storePath}.tmp`;
  await fs.writeFile(temporaryPath, `${JSON.stringify(next, null, 2)}\n`, "utf8");
  await fs.rename(temporaryPath, storePath);
}

export async function readBlogPosts() {
  return (await readBlogStore()).posts;
}

export function toBlogCard(post: BlogPost): Blog {
  return {
    title: post.title,
    description: post.shortDescription,
    image: post.featuredImage,
    link: `/blogs/${post.slug}`,
    date: post.publishedAt ? new Intl.DateTimeFormat("en", { month: "long", year: "numeric", timeZone: "UTC" }).format(new Date(post.publishedAt)) : "Draft",
  };
}

export function validateBlogPost(post: Partial<BlogPost>) {
  const required: Array<[keyof BlogPost, string]> = [["title", "Title"], ["shortDescription", "Short description"], ["featuredImage", "Featured image"], ["imageAlt", "Image alt text"], ["author", "Author"], ["category", "Category"], ["seoTitle", "SEO title"], ["seoDescription", "SEO description"]];
  for (const [key, label] of required) if (typeof post[key] !== "string" || !(post[key] as string).trim()) return `${label} is required.`;
  if (post.title!.length > 180 || post.seoTitle!.length > 180) return "Title fields must be 180 characters or fewer.";
  if (post.shortDescription!.length > 500 || post.seoDescription!.length > 500) return "Description fields must be 500 characters or fewer.";
  if (post.content!.length > 200000) return "Blog content is too long.";
  if (!post.content?.trim() && (!Array.isArray(post.contentBlocks) || post.contentBlocks.length === 0)) return "Add at least one content block.";
  if (!Array.isArray(post.contentBlocks) || post.contentBlocks.length > 100) return "Add no more than 100 content blocks.";
  for (const block of post.contentBlocks) {
    if (!block.id?.trim() || !["heading", "subheading", "content", "image", "quote", "bulletList", "numberedList", "callout", "divider", "link"].includes(block.type)) return "A content block is invalid.";
    if (block.type === "image") {
      if (!block.imageSrc?.trim() || !block.imageAlt?.trim()) return "Every image block requires an image and alternative text.";
      if (!block.imageSrc.startsWith("/") && !/^https?:\/\//i.test(block.imageSrc)) return "Enter a valid content image path or URL.";
    } else if (block.type === "divider") {
      // Divider blocks intentionally contain no text.
    } else if (!block.value?.trim()) return `Every ${block.type} block requires content.`;
    if (block.type === "link" && !block.linkUrl?.startsWith("/") && !/^https?:\/\//i.test(block.linkUrl || "")) return "Enter a valid link block URL.";
    if (!["left", "center", "right"].includes(block.style?.textAlign) || !["small", "medium", "large", "xlarge"].includes(block.style?.fontSize) || !["compact", "normal", "spacious"].includes(block.style?.spacing)) return "A block contains invalid styling options.";
    if (!/^(?:#[0-9a-fA-F]{6})?$/.test(block.style.textColor) || !/^(?:#[0-9a-fA-F]{6})?$/.test(block.style.backgroundColor)) return "Use valid six-digit colors for block styling.";
    if (!["400", "500", "600", "700"].includes(block.style.fontWeight || "") || !["normal", "italic"].includes(block.style.fontStyle || "") || !["none", "underline"].includes(block.style.textDecoration || "")) return "A block contains invalid text formatting.";
    if (!["compact", "normal", "relaxed"].includes(block.style.lineHeight || "") || !["none", "uppercase", "capitalize"].includes(block.style.textTransform || "") || !["0", "12", "20", "32"].includes(block.style.padding || "") || !["0", "8", "16", "24"].includes(block.style.blockRadius || "")) return "A block contains invalid layout styling.";
    if (!/^(?:#[0-9a-fA-F]{6})?$/.test(block.style.borderColor || "")) return "Use a valid six-digit border color.";
    if (!["320", "480", "640", "auto"].includes(block.style.imageMaxHeight || "") || !["contain", "cover"].includes(block.style.imageObjectFit || "") || !["none", "soft", "strong"].includes(block.style.imageShadow || "")) return "An image block contains invalid display styling.";
    if (!["25", "50", "75", "100"].includes(block.style.imageWidth) || !["left", "center", "right"].includes(block.style.imageAlign) || !["0", "8", "16", "24"].includes(block.style.borderRadius)) return "An image block contains invalid sizing options.";
    if (/<(?:script|style|iframe|object|embed|form)\b|\bon\w+\s*=|javascript:/i.test(block.value || "")) return "A content block contains unsafe HTML.";
  }
  if (!Array.isArray(post.contentImages) || post.contentImages.length > 30) return "Add no more than 30 inline images.";
  for (const image of post.contentImages) {
    if (!image.id?.trim() || !image.src?.trim() || !image.alt?.trim()) return "Every inline image requires an image and alternative text.";
    if (!image.src.startsWith("/") && !/^https?:\/\//i.test(image.src)) return "Enter a valid inline image path or URL.";
    if (image.alt.length > 300 || image.caption.length > 500) return "Inline image text is too long.";
    if (!post.content!.includes(`{{image:${image.id}}}`)) return `Insert inline image "${image.alt}" into the blog content before saving.`;
  }
  const contentImageIds = new Set(post.contentImages.map((image) => image.id));
  const referencedIds = [...post.content!.matchAll(/\{\{image:([^}]+)\}\}/g)].map((match) => match[1]);
  if (referencedIds.some((id) => !contentImageIds.has(id))) return "Blog content contains an image token that no longer has an image.";
  if (!post.featuredImage!.startsWith("/") && !/^https?:\/\//i.test(post.featuredImage!)) return "Enter a valid featured image path or URL.";
  if (!["50", "75", "100"].includes(post.featuredImageStyle?.width || "") || !["left", "center", "right"].includes(post.featuredImageStyle?.align || "") || !["320", "480", "640", "auto"].includes(post.featuredImageStyle?.maxHeight || "") || !["contain", "cover"].includes(post.featuredImageStyle?.objectFit || "") || !["0", "8", "16", "24"].includes(post.featuredImageStyle?.borderRadius || "")) return "Featured image styling is invalid.";
  if (/<(?:script|style|iframe|object|embed|form)\b|\bon\w+\s*=|javascript:/i.test(post.content!)) return "Blog content contains unsafe HTML.";
  if (post.status !== "draft" && post.status !== "published") return "Choose a valid blog status.";
  if (!Array.isArray(post.tags) || post.tags.some((tag) => typeof tag !== "string" || tag.length > 50) || post.tags.length > 20) return "Add no more than 20 valid tags.";
  return null;
}
