import LatestBlogsCarousel from "./LatestBlogsCarousel";
import ContactCta from "./common/ContactCta";
import type { BlogPost } from "@/app/data/blogs";
import { createElement } from "react";
import { resolveBlockStyle } from "@/app/lib/blog-style-resolver";

export default function ManagedBlogPage({ post, preview = false }: { post: BlogPost; preview?: boolean }) {
  const date = post.publishedAt ? new Intl.DateTimeFormat("en", { dateStyle: "long", timeZone: "UTC" }).format(new Date(post.publishedAt)) : "Draft";
  const contentParts = post.content.split(/\{\{image:([^}]+)\}\}/g);
  return (
    <main className="bg-[#121927] px-5 pb-[90px] pt-[118px] text-white">
      <article className="mx-auto w-full max-w-[960px]">
        <header className="rounded-t-[24px] border border-white/12 border-b-0 bg-[linear-gradient(135deg,#1e2a3f_0%,#162236_55%,#121927_100%)] px-[clamp(24px,7vw,72px)] py-[58px] text-white shadow-2xl max-[640px]:px-5 max-[640px]:pb-[45px] max-[640px]:pt-[115px]">
          <span className="mb-[18px] block text-[12px] font-extrabold uppercase tracking-[.14em] text-[#29ab87]">
            <span>Trijotech</span> <span>Insights</span>
          </span>
          {preview && <span className="ml-[10px] inline-block rounded-full bg-[#f5a623] px-[9px] py-[5px] text-[11px] font-bold uppercase text-slate-950">Draft preview</span>}
          <h1 className="m-0 max-w-none text-[clamp(24px,3.8vw,38px)] font-semibold leading-[1.2] tracking-[-.02em] text-white">{post.title}</h1>
          <p className="mt-5 max-w-[760px] text-[17px] leading-[1.7] text-slate-300">{post.shortDescription}</p>
          <div className="mt-[18px] flex flex-wrap justify-start gap-x-[18px] gap-y-2 text-[12px] text-slate-400 max-[640px]:gap-x-3 max-[640px]:gap-y-[6px]">
            <span>{post.author}</span>
            <span>•</span>
            <span>{post.category}</span>
            <span>•</span>
            <span>{date}</span>
          </div>
        </header>
        <div className="rounded-b-[24px] border border-white/12 bg-[#162032] px-[clamp(24px,7vw,72px)] py-[58px] text-slate-200 shadow-2xl [&_a]:text-[#7edcc2] [&_a]:underline [&_h1]:text-white [&_h1]:font-bold [&_h2]:text-white [&_h2]:font-bold [&_h3]:text-white [&_h3]:font-bold [&_h4]:text-white [&_h4]:font-bold [&_h5]:text-white [&_h5]:font-bold [&_h6]:text-white [&_h6]:font-bold max-[640px]:!px-[18px] max-[640px]:!py-9">
          <figure className="mx-auto mb-[34px] max-[640px]:mb-6" style={{ width: `${post.featuredImageStyle?.width || "100"}%` }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img className="block w-full rounded-2xl" src={post.featuredImage} alt={post.imageAlt} style={{ maxHeight: post.featuredImageStyle?.maxHeight === "auto" ? "none" : `${post.featuredImageStyle?.maxHeight || "640"}px`, objectFit: post.featuredImageStyle?.objectFit || "contain", borderRadius: `${post.featuredImageStyle?.borderRadius || "16"}px` }} />
          </figure>
          <div className="mx-auto w-full max-w-[940px] text-[17px] leading-[1.8] text-slate-200 [&_a]:text-[#7edcc2] [&_a]:underline [&_h1]:my-[14px] [&_h1]:mt-[34px] [&_h1]:leading-[1.35] [&_h2]:my-[14px] [&_h2]:mt-[34px] [&_h2]:leading-[1.35] [&_h3]:my-[14px] [&_h3]:mt-[34px] [&_h3]:leading-[1.35] [&_ol]:mb-[18px] [&_ol]:pl-6 [&_p]:mb-[18px] [&_ul]:mb-[18px] [&_ul]:pl-6 max-[640px]:text-[15px]">
            {post.contentBlocks?.length ? post.contentBlocks.map((block) => {
              const headingLevel = Math.min(6, Math.max(1, block.headingLevel || (block.type === "heading" ? 2 : 3))) as 1 | 2 | 3 | 4 | 5 | 6;
              const blockStyle = resolveBlockStyle(block.style, block.type, headingLevel);
              if (block.type === "heading" || block.type === "subheading") return createElement(`h${headingLevel}`, { key: block.id, style: blockStyle, dangerouslySetInnerHTML: { __html: block.value } });
              if (block.type === "content") return /<[^>]+>/.test(block.value) ? <div key={block.id} style={blockStyle} dangerouslySetInnerHTML={{ __html: block.value }} /> : <p key={block.id} style={blockStyle}>{block.value}</p>;
              if (block.type === "quote") return /<[^>]+>/.test(block.value) ? <blockquote className="my-[30px] border-l-4 border-[#f5a623] bg-white/[0.03] px-6 py-[18px] text-[18px] italic leading-[1.7] text-slate-300" key={block.id} style={blockStyle} dangerouslySetInnerHTML={{ __html: block.value }} /> : <blockquote className="my-[30px] border-l-4 border-[#f5a623] bg-white/[0.03] px-6 py-[18px] text-[18px] italic leading-[1.7] text-slate-300" key={block.id} style={blockStyle}>{block.value}</blockquote>;
              if (block.type === "bulletList") return <ul key={block.id} style={blockStyle}>{block.value.split(/\r?\n/).filter(Boolean).map((item, index) => <li key={`${block.id}-${index}`}>{item}</li>)}</ul>;
              if (block.type === "numberedList") return <ol key={block.id} style={blockStyle}>{block.value.split(/\r?\n/).filter(Boolean).map((item, index) => <li key={`${block.id}-${index}`}>{item}</li>)}</ol>;
              if (block.type === "callout") return /<[^>]+>/.test(block.value) ? <aside className="my-[26px] rounded-2xl border border-[#29ab87]/30 bg-[#29ab87]/10 px-5 py-[18px] leading-[1.7] text-slate-200" key={block.id} style={blockStyle} dangerouslySetInnerHTML={{ __html: block.value }} /> : <aside className="my-[26px] rounded-2xl border border-[#29ab87]/30 bg-[#29ab87]/10 px-5 py-[18px] leading-[1.7] text-slate-200" key={block.id} style={blockStyle}>{block.value}</aside>;
              if (block.type === "divider") return <hr className="w-full border-0 border-t border-white/10" key={block.id} style={{ marginTop: blockStyle.marginTop, marginBottom: blockStyle.marginBottom }} />;
              if (block.type === "link") return <p className="managed-blog-link-block" key={block.id} style={blockStyle}><a href={block.linkUrl}>{block.value}</a></p>;
              
              const imgShadow = block.style?.imageShadow === "none" ? "none" : block.style?.imageShadow === "strong" ? "0 16px 36px rgba(0,0,0,0.35)" : block.style?.imageShadow === "glow-green" ? "0 0 30px rgba(41,171,135,0.4)" : block.style?.imageShadow === "glow-amber" ? "0 0 30px rgba(245,166,35,0.4)" : "0 10px 24px rgba(0,0,0,0.18)";
              const imgRadius = block.style?.borderRadius === "full" ? "9999px" : `${block.style?.borderRadius || "16"}px`;
              return (
                <figure className="managed-blog-inline-image" key={block.id} style={{ marginTop: blockStyle.marginTop, marginBottom: blockStyle.marginBottom, textAlign: block.style?.imageAlign || "center", backgroundColor: block.style?.backgroundColor || undefined }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={block.imageSrc} alt={block.imageAlt} style={{ width: `${block.style?.imageWidth || "100"}%`, maxHeight: block.style?.imageMaxHeight === "auto" ? "none" : `${block.style?.imageMaxHeight || "640"}px`, objectFit: block.style?.imageObjectFit || "contain", borderRadius: imgRadius, boxShadow: imgShadow, marginLeft: block.style?.imageAlign === "right" || block.style?.imageAlign === "center" ? "auto" : 0, marginRight: block.style?.imageAlign === "left" || block.style?.imageAlign === "center" ? "auto" : 0 }} />
                  {block.caption && <figcaption className="mt-2 text-center text-xs text-slate-400">{block.caption}</figcaption>}
                </figure>
              );
            }) : contentParts.map((part, index) => {
              if (index % 2 === 0) return part ? <div key={`content-${index}`} dangerouslySetInnerHTML={{ __html: part }} /> : null;
              const image = post.contentImages.find((candidate) => candidate.id === part);
              if (!image) return null;
              return (
                <figure className="managed-blog-inline-image" key={`${image.id}-${index}`}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={image.src} alt={image.alt} className="rounded-2xl" />
                  {image.caption && <figcaption className="mt-2 text-center text-xs text-slate-400">{image.caption}</figcaption>}
                </figure>
              );
            })}
          </div>
          {post.tags.length > 0 && (
            <div className="mt-[34px] flex flex-wrap gap-2 border-t border-white/10 pt-[22px]" aria-label="Blog tags">
              {post.tags.map((tag) => (
                <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-slate-300" key={tag}>{tag}</span>
              ))}
            </div>
          )}
        </div>
      </article>
      <LatestBlogsCarousel />
      <ContactCta />
    </main>
  );
}
