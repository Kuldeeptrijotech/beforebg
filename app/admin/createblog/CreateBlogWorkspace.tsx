"use client";

import type { BlogPost } from "@/app/data/blogs";
import BlogManager from "../BlogManager";

export default function CreateBlogWorkspace({ initialPosts }: { initialPosts: BlogPost[] }) {
  return <main className="min-h-screen bg-[#f2f5f7] px-[clamp(16px,2.5vw,42px)] pb-[130px] pt-[22px] font-[Poppins,sans-serif] text-[#23304a] max-[680px]:px-[10px] max-[680px]:pb-[160px] max-[680px]:pt-[10px]">
    <header className="relative mx-auto mb-5 flex max-w-[1880px] flex-wrap items-center justify-between gap-4 rounded-[18px] border border-[#dfe5ea] bg-[linear-gradient(120deg,#17233d_0%,#223253_72%,#087b71_100%)] px-6 py-5 text-white shadow-[0_14px_36px_rgba(23,35,61,.14)] [&_h1]:my-[5px] [&_h1]:text-[clamp(24px,2.4vw,36px)] [&_h1]:leading-[1.2] [&_h1]:text-white [&_p]:m-0 [&_p]:text-xs [&_p]:text-white/70 [&_span]:text-xs [&_span]:font-extrabold [&_span]:tracking-[.15em] [&_span]:text-[#f2ae32] max-[680px]:rounded-[14px] max-[680px]:px-4 max-[680px]:py-4">
      <a href="/admin" className="inline-flex min-h-10 shrink-0 items-center justify-center rounded-[10px] border border-white/25 px-[14px] text-xs font-bold text-white">← Blog Management</a>
      <div className="min-w-0 flex-1 text-center max-[820px]:order-first max-[820px]:w-full max-[820px]:text-left"><span>TRIJOTECH CONTENT STUDIO</span><h1>Create a new blog</h1><p>Write, design, preview, and publish from one focused workspace.</p></div>
      <a href="/blogs" target="_blank" rel="noreferrer" className="inline-flex min-h-10 shrink-0 items-center justify-center rounded-[10px] border border-white/25 px-[14px] text-xs font-bold text-white">View Blogs ↗</a>
    </header>
    <div className="mx-auto max-w-[1880px]">
      <BlogManager initialPosts={initialPosts} onPostsChange={() => undefined} createOnly />
    </div>
  </main>;
}