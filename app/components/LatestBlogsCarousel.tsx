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
    <section className="bg-[#162032] px-[clamp(18px,5vw,72px)] pb-[76px] pt-16 max-[640px]:px-4 max-[640px]:pb-[60px] max-[640px]:pt-12 border-t border-white/5" aria-labelledby="latest-blogs-title">
      <div className="mb-7 flex items-end justify-between p-0 max-w-7xl mx-auto">
        <div className="p-0">
          <span className="text-[#29ab87] text-xs font-bold uppercase tracking-[0.2em]">Keep exploring</span>
          <h2 id="latest-blogs-title" className="text-2xl sm:text-3xl font-bold text-white mt-1">Latest <em className="text-[#7edcc2] not-italic">Blogs</em></h2>
        </div>
        <div className="flex gap-2">
          <button className="h-9 w-9 rounded-full border border-white/15 bg-white/5 text-white hover:bg-white/10 transition-colors flex items-center justify-center font-bold" type="button" onClick={() => move(index - 1)} aria-label="Previous blogs">‹</button>
          <button className="h-9 w-9 rounded-full border border-white/15 bg-white/5 text-white hover:bg-white/10 transition-colors flex items-center justify-center font-bold" type="button" onClick={() => move(index + 1)} aria-label="Next blogs">›</button>
        </div>
      </div>
      <div className="overflow-x-auto no-scrollbar [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden max-w-7xl mx-auto" ref={viewport}>
        <div className="flex items-stretch gap-5">{blogs.map((blog) => <BlogCard blog={blog} variant="carousel" key={blog.link} />)}</div>
      </div>
    </section>
  );
}
