import LatestBlogsCarousel from "./LatestBlogsCarousel";
import ContactCta from "./common/ContactCta";
import type { BlogPost } from "@/app/data/blogs";
import { createElement } from "react";

export default function ManagedBlogPage({ post, preview = false }: { post: BlogPost; preview?: boolean }) {
  const date = post.publishedAt ? new Intl.DateTimeFormat("en", { dateStyle: "long", timeZone: "UTC" }).format(new Date(post.publishedAt)) : "Draft";
  const contentParts = post.content.split(/\{\{image:([^}]+)\}\}/g);
  return <main className="legacy-content-page legacy-blog-page managed-blog-page">
    <article className="legacy-article">
      <header className="legacy-article-hero">
        <span className="legacy-article-kicker"><span className="brand-name">Trijotech</span> <span className="brand-accent">Insights</span></span>
        {preview && <span className="managed-blog-preview-badge">Draft preview</span>}
        <h1>{post.title}</h1>
        <p>{post.shortDescription}</p>
        <div className="managed-blog-meta"><span>{post.author}</span><span>{post.category}</span><span>{date}</span></div>
      </header>
      <div className="legacy-article-body">
        {/* Managed posts may use validated remote URLs, so a native image is intentional here. */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <figure className={`managed-blog-featured align-${post.featuredImageStyle?.align || "center"}`} style={{ width: `${post.featuredImageStyle?.width || "100"}%` }}><img src={post.featuredImage} alt={post.imageAlt} style={{ maxHeight: post.featuredImageStyle?.maxHeight === "auto" ? "none" : `${post.featuredImageStyle?.maxHeight || "640"}px`, objectFit: post.featuredImageStyle?.objectFit || "contain", borderRadius: `${post.featuredImageStyle?.borderRadius || "16"}px` }} /></figure>
        <div className="managed-blog-content">{post.contentBlocks?.length ? post.contentBlocks.map((block) => {
          const spacing = block.style?.spacing === "compact" ? "10px 0" : block.style?.spacing === "spacious" ? "34px 0" : "20px 0";
          const headingLevel = Math.min(6, Math.max(1, block.headingLevel || (block.type === "heading" ? 2 : 3))) as 1 | 2 | 3 | 4 | 5 | 6;
          const textSize = block.style?.fontSize || "medium";
          const fontSize = block.type === "heading" || block.type === "subheading"
            ? `${Math.round(({ 1: 40, 2: 32, 3: 28, 4: 24, 5: 20, 6: 16 }[headingLevel]) * ({ small: .85, medium: 1, large: 1.15, xlarge: 1.3 }[textSize]))}px`
            : ({ small: "14px", medium: "16px", large: "20px", xlarge: "26px" }[textSize]);
          const blockStyle = { textAlign: block.style?.textAlign || "left", color: block.style?.textColor || undefined, backgroundColor: block.style?.backgroundColor || undefined, padding: `${block.style?.padding || (block.style?.backgroundColor ? "20" : "0")}px`, margin: spacing, fontSize, fontWeight: block.style?.fontWeight || "400", fontStyle: block.style?.fontStyle || "normal", textDecoration: block.style?.textDecoration || "none", lineHeight: block.style?.lineHeight === "compact" ? 1.35 : block.style?.lineHeight === "relaxed" ? 2 : 1.8, textTransform: block.style?.textTransform || "none", borderRadius: `${block.style?.blockRadius || "0"}px`, border: block.style?.borderColor ? `1px solid ${block.style.borderColor}` : undefined } as React.CSSProperties;
          if (block.type === "heading" || block.type === "subheading") return createElement(`h${headingLevel}`, { key: block.id, style: blockStyle, dangerouslySetInnerHTML: { __html: block.value } });
          if (block.type === "content") return /<[^>]+>/.test(block.value) ? <div key={block.id} style={blockStyle} dangerouslySetInnerHTML={{ __html: block.value }} /> : <p key={block.id} style={blockStyle}>{block.value}</p>;
          if (block.type === "quote") return /<[^>]+>/.test(block.value) ? <blockquote className="managed-blog-quote" key={block.id} style={blockStyle} dangerouslySetInnerHTML={{ __html: block.value }} /> : <blockquote className="managed-blog-quote" key={block.id} style={blockStyle}>{block.value}</blockquote>;
          if (block.type === "bulletList") return <ul key={block.id} style={blockStyle}>{block.value.split(/\r?\n/).filter(Boolean).map((item, index) => <li key={`${block.id}-${index}`}>{item}</li>)}</ul>;
          if (block.type === "numberedList") return <ol key={block.id} style={blockStyle}>{block.value.split(/\r?\n/).filter(Boolean).map((item, index) => <li key={`${block.id}-${index}`}>{item}</li>)}</ol>;
          if (block.type === "callout") return /<[^>]+>/.test(block.value) ? <aside className="managed-blog-callout" key={block.id} style={blockStyle} dangerouslySetInnerHTML={{ __html: block.value }} /> : <aside className="managed-blog-callout" key={block.id} style={blockStyle}>{block.value}</aside>;
          if (block.type === "divider") return <hr className="managed-blog-divider" key={block.id} style={{ margin: spacing }} />;
          if (block.type === "link") return <p className="managed-blog-link-block" key={block.id} style={blockStyle}><a href={block.linkUrl}>{block.value}</a></p>;
          return <figure className="managed-blog-inline-image" key={block.id} style={{ marginTop: spacing.split(" ")[0], marginBottom: spacing.split(" ")[0], textAlign: block.style?.imageAlign || "center", backgroundColor: block.style?.backgroundColor || undefined }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={block.imageSrc} alt={block.imageAlt} style={{ width: `${block.style?.imageWidth || "100"}%`, maxHeight: block.style?.imageMaxHeight === "auto" ? "none" : `${block.style?.imageMaxHeight || "640"}px`, objectFit: block.style?.imageObjectFit || "contain", boxShadow: block.style?.imageShadow === "none" ? "none" : block.style?.imageShadow === "strong" ? "0 18px 42px rgba(23,35,61,.24)" : "0 12px 32px rgba(23,35,61,.10)", borderRadius: `${block.style?.borderRadius || "16"}px`, marginLeft: block.style?.imageAlign === "right" || block.style?.imageAlign === "center" ? "auto" : 0, marginRight: block.style?.imageAlign === "left" || block.style?.imageAlign === "center" ? "auto" : 0 }} />
            {block.caption && <figcaption>{block.caption}</figcaption>}
          </figure>;
        }) : contentParts.map((part, index) => {
          if (index % 2 === 0) return part ? <div key={`content-${index}`} dangerouslySetInnerHTML={{ __html: part }} /> : null;
          const image = post.contentImages.find((candidate) => candidate.id === part);
          if (!image) return null;
          return <figure className="managed-blog-inline-image" key={`${image.id}-${index}`}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={image.src} alt={image.alt} />
            {image.caption && <figcaption>{image.caption}</figcaption>}
          </figure>;
        })}</div>
        {post.tags.length > 0 && <div className="managed-blog-tags" aria-label="Blog tags">{post.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>}
      </div>
    </article>
    <LatestBlogsCarousel />
    <ContactCta />
  </main>;
}
