"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { blogs } from "../data/blogs";
import BlogCard from "./common/BlogCard";

export default function LatestBlogsCarousel() {
  const viewport = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);
  const move = useCallback((next: number) => {
    const value = (next + blogs.length) % blogs.length;
    setIndex(value);
    const first = viewport.current?.querySelector<HTMLElement>("article");
    if (viewport.current && first) viewport.current.scrollTo({ left: value * (first.offsetWidth + 20), behavior: "smooth" });
  }, []);
  useEffect(() => {
    const timer = window.setInterval(() => move(index + 1), 4000);
    return () => window.clearInterval(timer);
  }, [index, move]);

  return (
    <section className="bg-[#e8edf3] px-[clamp(18px,5vw,72px)] pb-[76px] pt-16 max-[640px]:px-4 max-[640px]:pb-[60px] max-[640px]:pt-12" aria-labelledby="latest-blogs-title">
      <div className="mb-7 flex items-end justify-between p-0">
        <div className="p-0"><span className="!text-[#0f6b46] opacity-100">Keep exploring</span><h2 id="latest-blogs-title" className="!text-black opacity-100 [-webkit-text-stroke:0] [text-shadow:none]">Latest <em className="!text-black">Blogs</em></h2></div>
        <div className="flex gap-2"><button className="border !border-slate-400 !bg-white !text-[#0f6b46]" type="button" onClick={() => move(index - 1)} aria-label="Previous blogs">‹</button><button className="border !border-slate-400 !bg-white !text-[#0f6b46]" type="button" onClick={() => move(index + 1)} aria-label="Next blogs">›</button></div>
      </div>
      <div className="overflow-x-auto" ref={viewport}><div className="flex items-stretch gap-5">{blogs.map((blog) => <BlogCard blog={blog} variant="carousel" key={blog.link} />)}</div></div>
    </section>
  );
}
