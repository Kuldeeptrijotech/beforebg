import LatestBlogsCarousel from "./LatestBlogsCarousel";
import ContactCta from "./common/ContactCta";
import type { BlogPost } from "@/app/data/blogs";
import { createElement } from "react";

export default function ManagedBlogPage({ post, preview = false }: { post: BlogPost; preview?: boolean }) {
  const date = post.publishedAt ? new Intl.DateTimeFormat("en", { dateStyle: "long", timeZone: "UTC" }).format(new Date(post.publishedAt)) : "Draft";
  const contentParts = post.content.split(/\{\{image:([^}]+)\}\}/g);
  return <main className="bg-[linear-gradient(#edf6f3_0,#f8faf9_420px,#fff_100%)] px-5 pb-[90px] pt-[118px]">
    <article className="mx-auto w-full max-w-[960px]">
      <header className="rounded-t-[18px] bg-[linear-gradient(135deg,#e5e7eb_0%,#f3f4f6_55%,#d9dde2_100%)] px-[clamp(24px,7vw,72px)] py-[58px] text-[#232555] shadow-[0_18px_48px_rgba(23,35,61,.12)] max-[640px]:px-5 max-[640px]:pb-[45px] max-[640px]:pt-[115px]">
        <span className="mb-[18px] block text-[12px] font-extrabold uppercase tracking-[.14em] text-[#075f59]"><span>Trijotech</span> <span>Insights</span></span>
        {preview && <span className="ml-[10px] inline-block rounded-full bg-[#ee9e1e] px-[9px] py-[5px] text-[11px] font-bold uppercase text-white">Draft preview</span>}
        <h1 className="m-0 max-w-none text-[clamp(32px,5vw,54px)] font-bold leading-[1.13] tracking-[-.02em] text-[#232555]">{post.title}</h1>
        <p className="mt-5 max-w-[760px] text-[17px] leading-[1.7] text-[#4b5563]">{post.shortDescription}</p>
        <div className="mt-[18px] flex flex-wrap justify-center gap-x-[18px] gap-y-2 text-[12px] text-[#4b5563] max-[640px]:gap-x-3 max-[640px]:gap-y-[6px]"><span>{post.author}</span><span>{post.category}</span><span>{date}</span></div>
      </header>
      <div className="rounded-b-[18px] border border-t-0 border-[#e1e8e7] bg-slate-50 px-[clamp(24px,7vw,72px)] py-[58px] !text-[#172033] opacity-100 shadow-[0_24px_60px_#122a3114] [filter:none] [backdrop-filter:none] [&_a]:!text-[#117a4b] [&_a]:font-[650] [&_h1]:!text-[#0f2137] [&_h1]:font-bold [&_h2]:!text-[#0f2137] [&_h2]:font-bold [&_h3]:!text-[#0f2137] [&_h3]:font-bold [&_h4]:!text-[#0f2137] [&_h4]:font-bold [&_h5]:!text-[#0f2137] [&_h5]:font-bold [&_h6]:!text-[#0f2137] [&_h6]:font-bold max-[640px]:!px-[18px] max-[640px]:!py-9">
        {/* Managed posts may use validated remote URLs, so a native image is intentional here. */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <figure className="mx-auto mb-[34px] max-[640px]:mb-6" style={{ width: `${post.featuredImageStyle?.width || "100"}%` }}><img className="block w-full" src={post.featuredImage} alt={post.imageAlt} style={{ maxHeight: post.featuredImageStyle?.maxHeight === "auto" ? "none" : `${post.featuredImageStyle?.maxHeight || "640"}px`, objectFit: post.featuredImageStyle?.objectFit || "contain", borderRadius: `${post.featuredImageStyle?.borderRadius || "16"}px` }} /></figure>
        <div className="mx-auto w-full max-w-[940px] text-[17px] leading-[1.8] !text-[#27364a] [&_a]:text-blue-600 [&_a]:underline [&_div]:!text-[#27364a] [&_h1]:my-[14px] [&_h1]:mt-[34px] [&_h1]:leading-[1.35] [&_h2]:my-[14px] [&_h2]:mt-[34px] [&_h2]:leading-[1.35] [&_h3]:my-[14px] [&_h3]:mt-[34px] [&_h3]:leading-[1.35] [&_li]:!text-[#27364a] [&_ol]:mb-[18px] [&_ol]:pl-6 [&_p]:mb-[18px] [&_p]:!text-[#27364a] [&_span]:!text-[#27364a] [&_ul]:mb-[18px] [&_ul]:pl-6 max-[640px]:text-[15px]">{post.contentBlocks?.length ? post.contentBlocks.map((block) => {
          const spacing = block.style?.spacing === "compact" ? "10px 0" : block.style?.spacing === "spacious" ? "34px 0" : "20px 0";
          const headingLevel = Math.min(6, Math.max(1, block.headingLevel || (block.type === "heading" ? 2 : 3))) as 1 | 2 | 3 | 4 | 5 | 6;
          const textSize = block.style?.fontSize || "medium";
          const fontSize = block.type === "heading" || block.type === "subheading"
            ? `${Math.round(({ 1: 40, 2: 32, 3: 28, 4: 24, 5: 20, 6: 16 }[headingLevel]) * ({ small: .85, medium: 1, large: 1.15, xlarge: 1.3 }[textSize]))}px`
            : ({ small: "14px", medium: "16px", large: "20px", xlarge: "26px" }[textSize]);
          const blockStyle = { textAlign: block.style?.textAlign || "left", color: block.style?.textColor || undefined, backgroundColor: block.style?.backgroundColor || undefined, padding: `${block.style?.padding || (block.style?.backgroundColor ? "20" : "0")}px`, margin: spacing, fontSize, fontWeight: block.style?.fontWeight || "400", fontStyle: block.style?.fontStyle || "normal", textDecoration: block.style?.textDecoration || "none", lineHeight: block.style?.lineHeight === "compact" ? 1.35 : block.style?.lineHeight === "relaxed" ? 2 : 1.8, textTransform: block.style?.textTransform || "none", borderRadius: `${block.style?.blockRadius || "0"}px`, border: block.style?.borderColor ? `1px solid ${block.style.borderColor}` : undefined } as React.CSSProperties;
          if (block.type === "heading" || block.type === "subheading") return createElement(`h${headingLevel}`, { key: block.id, style: blockStyle, dangerouslySetInnerHTML: { __html: block.value } });
          if (block.type === "content") return /<[^>]+>/.test(block.value) ? <div key={block.id} style={blockStyle} dangerouslySetInnerHTML={{ __html: block.value }} /> : <p key={block.id} style={blockStyle}>{block.value}</p>;
          if (block.type === "quote") return /<[^>]+>/.test(block.value) ? <blockquote className="my-[30px] border-l-4 border-[#ee9e1e] bg-[#faf7f1] px-6 py-[18px] text-[18px] italic leading-[1.7] text-[#4b4238]" key={block.id} style={blockStyle} dangerouslySetInnerHTML={{ __html: block.value }} /> : <blockquote className="my-[30px] border-l-4 border-[#ee9e1e] bg-[#faf7f1] px-6 py-[18px] text-[18px] italic leading-[1.7] text-[#4b4238]" key={block.id} style={blockStyle}>{block.value}</blockquote>;
          if (block.type === "bulletList") return <ul key={block.id} style={blockStyle}>{block.value.split(/\r?\n/).filter(Boolean).map((item, index) => <li key={`${block.id}-${index}`}>{item}</li>)}</ul>;
          if (block.type === "numberedList") return <ol key={block.id} style={blockStyle}>{block.value.split(/\r?\n/).filter(Boolean).map((item, index) => <li key={`${block.id}-${index}`}>{item}</li>)}</ol>;
          if (block.type === "callout") return /<[^>]+>/.test(block.value) ? <aside className="my-[26px] rounded-[10px] border border-[#087b7133] bg-[#087b7112] px-5 py-[18px] leading-[1.7] text-[#294743]" key={block.id} style={blockStyle} dangerouslySetInnerHTML={{ __html: block.value }} /> : <aside className="my-[26px] rounded-[10px] border border-[#087b7133] bg-[#087b7112] px-5 py-[18px] leading-[1.7] text-[#294743]" key={block.id} style={blockStyle}>{block.value}</aside>;
          if (block.type === "divider") return <hr className="w-full border-0 border-t border-[#dce2e8]" key={block.id} style={{ margin: spacing }} />;
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
        {post.tags.length > 0 && <div className="mt-[34px] flex flex-wrap gap-2 border-t border-slate-200 pt-[22px]" aria-label="Blog tags">{post.tags.map((tag) => <span className="rounded-full bg-[#f1f4f5] px-[10px] py-[6px] text-[11px] text-[#4b5563]" key={tag}>{tag}</span>)}</div>}
      </div>
    </article>
    <LatestBlogsCarousel />
    <ContactCta />
  </main>;
}
