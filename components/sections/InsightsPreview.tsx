"use client";

import Container from "@/components/ui/Container";
import { featuredBlogs, featuredVideos, type FeaturedBlogItem, type FeaturedVideoItem } from "@/lib/site-data";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, CalendarDays, ExternalLink, Newspaper, Play, Video as VideoIcon, type LucideIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

type InsightTab = "blogs" | "videos";
type InsightTabItem = { id: InsightTab; label: string; Icon: LucideIcon; url: string };

function YoutubePlayIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    </svg>
  );
}

const insightTabs = [
  { id: "blogs", label: "Blogs", Icon: Newspaper, url: "/blogs" },
  { id: "videos", label: "Videos", Icon: YoutubePlayIcon as unknown as LucideIcon, url: "/videos" },
] satisfies InsightTabItem[];

function getYoutubeThumbnail(youtubeId: string) {
  return `https://img.youtube.com/vi/${youtubeId}/hqdefault.jpg`;
}

function BlogCard({ blog, index }: { blog: FeaturedBlogItem; index: number }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.4, delay: index * 0.06, ease: "easeOut" }}
      className="group flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white text-slate-900 shadow-sm transition-all duration-300 hover:border-slate-400 hover:shadow-md"
    >
      <Link href={blog.href} className="no-underline relative aspect-[16/10] w-full shrink-0 overflow-hidden bg-slate-900">
        <Image src={blog.image} alt={blog.imageAlt} fill sizes="(min-width: 1280px) 25vw, (min-width: 768px) 50vw, 100vw" className="object-cover scale-[1.04]" />
        <div aria-hidden className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[rgba(14,26,44,0.7)] via-transparent to-transparent" />
        <span className="absolute bottom-3 left-3 inline-flex items-center gap-1.5 rounded-full bg-slate-900 px-2.5 py-1 text-[11px] font-bold text-white shadow-md">
          <CalendarDays className="size-3 text-white" />
          <span>{blog.date}</span>
        </span>
      </Link>
      <div className="flex flex-1 flex-col p-4 sm:p-5">
        <h3 className="line-clamp-2 text-sm sm:text-base font-bold leading-snug text-slate-900 transition-colors">{blog.title}</h3>
        <p className="mt-2 line-clamp-2 flex-1 text-xs leading-relaxed text-slate-600">{blog.description}</p>
        <div className="mt-auto pt-4">
          <Link href={blog.href} className="inline-flex w-fit items-center gap-1.5 text-xs font-semibold text-slate-900 transition-all duration-200 group-hover:gap-2 group-hover:text-slate-700 sm:text-sm">
            Read blog <ArrowRight aria-hidden="true" className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </motion.article>
  );
}

function VideoCard({ video, index }: { video: FeaturedVideoItem; index: number }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.4, delay: index * 0.06, ease: "easeOut" }}
      className="group flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white text-slate-900 shadow-sm transition-all duration-300 hover:border-slate-400 hover:shadow-md"
    >
      <a href={video.youtubeUrl} target="_blank" rel="noreferrer" className="no-underline relative aspect-[16/10] w-full shrink-0 overflow-hidden bg-slate-900" aria-label={`Watch ${video.title} on YouTube`}>
        <Image src={getYoutubeThumbnail(video.youtubeId)} alt={`${video.title} video thumbnail`} fill sizes="(min-width: 1280px) 25vw, (min-width: 768px) 50vw, 100vw" className="object-cover scale-[1.04]" />
        <div aria-hidden className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[rgba(14,26,44,0.7)] via-transparent to-transparent" />
        <div className="absolute left-1/2 top-1/2 flex h-10 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-xl bg-[#FF0000] text-white shadow-2xl transition-all duration-300 group-hover:scale-110 group-hover:bg-[#cc0000]">
          <svg className="h-5 w-5 fill-white text-white ml-0.5" viewBox="0 0 24 24">
            <path d="M8 5v14l11-7z" fill="#ffffff" />
          </svg>
        </div>
      </a>
      <div className="flex flex-1 flex-col p-4 sm:p-5">
        <p className="text-[10px] font-bold uppercase tracking-wider text-slate-500">YouTube</p>
        <h3 className="line-clamp-2 mt-1 text-sm sm:text-base font-bold leading-snug text-slate-900 transition-colors">{video.title}</h3>
        <p className="mt-2 line-clamp-2 flex-1 text-xs leading-relaxed text-slate-600">{video.description}</p>
        <div className="mt-auto pt-4">
          <a href={video.youtubeUrl} target="_blank" rel="noreferrer" className="inline-flex w-fit items-center gap-1.5 text-xs font-semibold text-slate-900 transition-all duration-200 group-hover:gap-2 group-hover:text-slate-700 sm:text-sm">
            Watch video <ExternalLink className="size-3.5" />
          </a>
        </div>
      </div>
    </motion.article>
  );
}

export default function InsightsPreview() {
  const [activeTab, setActiveTab] = useState<InsightTab>("blogs");
  const visibleBlogs = featuredBlogs.filter((blog) => blog.showOnHome);
  const visibleVideos = featuredVideos.filter((video) => video.showOnHome);

  return (
    <section id="insights-preview" className="relative isolate overflow-hidden bg-white py-12 sm:py-14 lg:py-16 text-slate-900 border-t border-slate-200">
      <Container className="relative">
        <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <span className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-slate-900">Insights</span>
            <h2 className="mt-2 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl lg:text-4xl">
              Practical SAP thinking in blogs and videos.
            </h2>
            <p className="mt-2 max-w-xl text-xs leading-relaxed text-slate-600 sm:text-sm sm:leading-6">
              Explore SAP, data, cloud, finance, and transformation ideas from the Trijotech team.
            </p>
          </div>

          <div className="flex w-full flex-col gap-3 md:w-auto md:items-end">
            <div role="tablist" aria-label="Insights tabs" className="grid w-full grid-cols-2 rounded-full border border-slate-200 bg-slate-100 p-1 md:w-64">
              {insightTabs.map(({ id, label, Icon }) => {
                const isActive = activeTab === id;
                return (
                  <button
                    key={id}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    onClick={() => setActiveTab(id)}
                    className={`inline-flex h-9 min-w-0 items-center justify-center gap-1.5 rounded-full px-3 text-xs font-semibold transition sm:px-4 ${
                      isActive
                        ? "bg-slate-900 text-white shadow-sm"
                        : "text-slate-700 hover:bg-slate-200"
                    }`}
                  >
                    <Icon className="size-3.5 shrink-0" />
                    <span className="truncate">{label}</span>
                  </button>
                );
              })}
            </div>
            <Link
              href={activeTab === "blogs" ? "/blogs" : "/videos"}
              className="inline-flex items-center gap-1.5 rounded-full border border-slate-300 bg-white px-4 py-2 text-xs font-semibold text-slate-900 shadow-xs transition-all duration-200 hover:bg-slate-50 sm:text-sm"
            >
              {activeTab === "blogs" ? "View all blogs" : "View all videos"} <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-1" />
            </Link>
          </div>
        </div>

        <AnimatePresence mode="wait">
          {activeTab === "blogs" ? (
            <motion.div key="blogs" initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -18 }} transition={{ duration: 0.24, ease: "easeOut" }} className="mt-7 sm:mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4 items-stretch">
              {visibleBlogs.map((blog, index) => (
                <BlogCard key={blog.href} blog={blog} index={index} />
              ))}
            </motion.div>
          ) : (
            <motion.div key="videos" initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -18 }} transition={{ duration: 0.24, ease: "easeOut" }} className="mt-10 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
              {visibleVideos.map((video, index) => (
                <VideoCard key={video.youtubeId} video={video} index={index} />
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </Container>
    </section>
  );
}
