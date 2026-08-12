"use client";

import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import { featuredBlogs, featuredVideos, type FeaturedBlogItem, type FeaturedVideoItem } from "@/lib/site-data";
import { AnimatePresence, motion } from "framer-motion";
import { CalendarDays, ExternalLink, Newspaper, Play, Video as VideoIcon, type LucideIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

type InsightTab = "blogs" | "videos";
type InsightTabItem = { id: InsightTab; label: string; Icon: LucideIcon; url: string };

const insightTabs = [
  { id: "blogs", label: "Blogs", Icon: Newspaper, url: "/blogs" },
  { id: "videos", label: "Videos", Icon: VideoIcon, url: "/videos" },
] satisfies InsightTabItem[];

function getYoutubeThumbnail(youtubeId: string) {
  return `https://img.youtube.com/vi/${youtubeId}/hqdefault.jpg`;
}

function BlogCard({ blog, index }: { blog: FeaturedBlogItem; index: number }) {
  return (
    <motion.article initial={{ opacity: 0, y: 22 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.4, delay: index * 0.06, ease: "easeOut" }} className="group flex h-full flex-col overflow-hidden rounded-lg border border-white/10 bg-white/7 shadow-xl shadow-black/20 transition hover:-translate-y-1 hover:border-cyan-300/40 hover:bg-white/10">
      <Link href={blog.href} className="relative aspect-4/3 overflow-hidden bg-slate-900">
        <Image src={blog.image} alt={blog.imageAlt} fill sizes="(min-width: 1280px) 25vw, (min-width: 768px) 50vw, 100vw" className="object-fill" />
        <div className="absolute inset-0 bg-linear-to-t from-slate-950/70 via-transparent to-transparent" />
        <span className="absolute bottom-4 left-4 inline-flex items-center gap-2 rounded-full border border-white/15 bg-slate-950/70 px-3 py-1.5 text-xs font-semibold text-white backdrop-blur-xl"><CalendarDays className="size-3.5" />{blog.date}</span>
      </Link>
      <div className="flex flex-1 flex-col p-4 sm:p-5">
        <h3 className="line-clamp-2 text-base font-semibold leading-6 text-white sm:text-lg sm:leading-7">{blog.title}</h3>
        <p className="mt-3 line-clamp-3 flex-1 text-sm leading-6 text-white/58">{blog.description}</p>
        <Link href={blog.href} className="mt-6 inline-flex w-fit items-center gap-2 text-sm font-semibold text-cyan-200 transition hover:text-white">Read blog <ExternalLink className="size-4" /></Link>
      </div>
    </motion.article>
  );
}

function VideoCard({ video, index }: { video: FeaturedVideoItem; index: number }) {
  return (
    <motion.article initial={{ opacity: 0, y: 22 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.4, delay: index * 0.06, ease: "easeOut" }} className="group flex h-full flex-col overflow-hidden rounded-lg border border-white/10 bg-white/7 shadow-xl shadow-black/20 transition hover:-translate-y-1 hover:border-amber-300/40 hover:bg-white/10">
      <a href={video.youtubeUrl} target="_blank" rel="noreferrer" className="relative aspect-video overflow-hidden bg-slate-900" aria-label={`Watch ${video.title} on YouTube`}>
        <Image src={getYoutubeThumbnail(video.youtubeId)} alt={`${video.title} video thumbnail`} fill sizes="(min-width: 1280px) 25vw, (min-width: 768px) 50vw, 100vw" className="object-fill opacity-100" />
        <div className="absolute inset-0 bg-slate-950/20 transition group-hover:bg-slate-950/10" />
        <span className="absolute left-1/2 top-1/2 flex size-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white/80 text-slate-950/80 shadow-2xl shadow-black/30 transition group-hover:scale-110"><Play className="size-8" /></span>
      </a>
      <div className="flex flex-1 flex-col p-4 sm:p-5">
        <p className="text-xs font-semibold uppercase tracking-wide text-amber-300">YouTube</p>
        <h3 className="line-clamp-2 text-base font-semibold leading-6 text-white sm:text-lg sm:leading-7">{video.title}</h3>
        <p className="mt-3 line-clamp-3 flex-1 text-sm leading-6 text-white/58">{video.description}</p>
        <a href={video.youtubeUrl} target="_blank" rel="noreferrer" className="mt-6 inline-flex w-fit items-center gap-2 text-sm font-semibold text-amber-300 transition hover:text-white">Watch video <ExternalLink className="size-4" /></a>
      </div>
    </motion.article>
  );
}

export default function InsightsPreview() {
  const [activeTab, setActiveTab] = useState<InsightTab>("blogs");
  const visibleBlogs = featuredBlogs.filter((blog) => blog.showOnHome);
  const visibleVideos = featuredVideos.filter((video) => video.showOnHome);

  return (
    <section className="bg-slate-950 py-20 text-white">
      <Container>
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-wide text-cyan-200">Insights</p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight md:text-4xl">Practical SAP thinking in blogs and videos.</h2>
            <p className="mt-4 text-base leading-7 text-white/60">Explore SAP, data, cloud, finance, and transformation ideas from the Trijotech team.</p>
          </div>
          <div className="flex w-full flex-col gap-4 md:w-auto md:items-end">
            <div role="tablist" aria-label="Insights tabs" className="grid w-full grid-cols-2 rounded-full border border-white/10 bg-white/6 p-1 md:w-72">
              {insightTabs.map(({ id, label, Icon }) => {
                const isActive = activeTab === id;
                return <button key={id} type="button" role="tab" aria-selected={isActive} onClick={() => setActiveTab(id)} className={`inline-flex h-10 min-w-0 items-center justify-center gap-2 rounded-full px-3 text-sm font-semibold transition sm:px-4 ${isActive ? "bg-white text-slate-950 shadow-lg shadow-black/20" : "text-white/62 hover:bg-white/10 hover:text-white"}`}><Icon className="size-4 shrink-0" /><span className="truncate">{label}</span></button>;
              })}
            </div>
            <Button href={activeTab === "blogs" ? "/blogs" : "/videos"} tone="light" className="w-full md:w-fit">{activeTab === "blogs" ? "View all blogs" : "View all videos"}</Button>
          </div>
        </div>
        <AnimatePresence mode="wait">
          {activeTab === "blogs" ? (
            <motion.div key="blogs" initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -18 }} transition={{ duration: 0.24, ease: "easeOut" }} className="mt-8 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
              {visibleBlogs.map((blog, index) => <BlogCard key={blog.href} blog={blog} index={index} />)}
            </motion.div>
          ) : (
            <motion.div key="videos" initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -18 }} transition={{ duration: 0.24, ease: "easeOut" }} className="mt-8 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
              {visibleVideos.map((video, index) => <VideoCard key={video.youtubeId} video={video} index={index} />)}
            </motion.div>
          )}
        </AnimatePresence>
      </Container>
    </section>
  );
}
