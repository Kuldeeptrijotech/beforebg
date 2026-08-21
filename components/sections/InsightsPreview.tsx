"use client";

import Container from "@/components/ui/Container";
import GradientButton from "@/components/ui/GradientButton";
import { featuredBlogs, featuredVideos, type FeaturedBlogItem, type FeaturedVideoItem } from "@/lib/site-data";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, CalendarDays, ExternalLink, Newspaper, Play, Video as VideoIcon, type LucideIcon } from "lucide-react";
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
    <motion.article
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.4, delay: index * 0.06, ease: "easeOut" }}
      className="tri-glass-card group flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] transition-all duration-300 hover:border-[#29ab87]/60 hover:bg-white/[0.06] hover:shadow-[0_12px_36px_rgba(41,171,135,0.18)]"
    >
      <Link href={blog.href} className="no-underline relative aspect-[16/10] w-full shrink-0 overflow-hidden bg-slate-900">
        <Image src={blog.image} alt={blog.imageAlt} fill sizes="(min-width: 1280px) 25vw, (min-width: 768px) 50vw, 100vw" className="object-cover scale-[1.04]" />
        <div aria-hidden className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[rgba(14,26,44,0.95)] via-transparent to-transparent" />
        <div aria-hidden className="pointer-events-none absolute inset-0 bg-[linear-gradient(160deg,rgba(41,171,135,0.28),transparent_60%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
        <span className="absolute bottom-3 left-3 inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-[rgba(3,7,19,0.65)] px-2.5 py-1 text-[11px] font-semibold text-white backdrop-blur-xl">
          <CalendarDays className="size-3 text-[#f5a623]" />
          {blog.date}
        </span>
      </Link>
      <div className="flex flex-1 flex-col p-4 sm:p-5">
        <h3 className="line-clamp-2 text-sm sm:text-base font-bold leading-snug text-white group-hover:text-[#7edcc2] transition-colors">{blog.title}</h3>
        <p className="mt-2 line-clamp-2 flex-1 text-xs leading-relaxed text-slate-300">{blog.description}</p>
        <div className="mt-auto pt-4">
          <Link href={blog.href} className="inline-flex w-fit items-center gap-1.5 text-xs sm:text-sm font-semibold text-[#7edcc2] transition hover:text-[#f5a623]">
            Read blog <ExternalLink className="size-3.5" />
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
      className="tri-glass-card group flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] transition-all duration-300 hover:border-[#29ab87]/60 hover:bg-white/[0.06] hover:shadow-[0_12px_36px_rgba(41,171,135,0.18)]"
    >
      <a href={video.youtubeUrl} target="_blank" rel="noreferrer" className="no-underline relative aspect-[16/10] w-full shrink-0 overflow-hidden bg-slate-900" aria-label={`Watch ${video.title} on YouTube`}>
        <Image src={getYoutubeThumbnail(video.youtubeId)} alt={`${video.title} video thumbnail`} fill sizes="(min-width: 1280px) 25vw, (min-width: 768px) 50vw, 100vw" className="object-cover scale-[1.04]" />
        <div aria-hidden className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[rgba(14,26,44,0.95)] via-transparent to-transparent" />
        <div aria-hidden className="pointer-events-none absolute inset-0 bg-[linear-gradient(160deg,rgba(41,171,135,0.28),transparent_60%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
        <span className="absolute left-1/2 top-1/2 flex size-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white/85 text-[#0b5a38] shadow-2xl shadow-black/30 transition">
          <Play className="size-5" />
        </span>
      </a>
      <div className="flex flex-1 flex-col p-4 sm:p-5">
        <p className="text-[10px] font-bold uppercase tracking-wider text-[#f5a623]">YouTube</p>
        <h3 className="line-clamp-2 mt-1 text-sm sm:text-base font-bold leading-snug text-white group-hover:text-[#7edcc2] transition-colors">{video.title}</h3>
        <p className="mt-2 line-clamp-2 flex-1 text-xs leading-relaxed text-slate-300">{video.description}</p>
        <div className="mt-auto pt-4">
          <a href={video.youtubeUrl} target="_blank" rel="noreferrer" className="inline-flex w-fit items-center gap-1.5 text-xs sm:text-sm font-semibold text-[#f5a623] transition hover:text-white">
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
    <section className="relative isolate overflow-hidden bg-[#18263e] py-12 sm:py-14 lg:py-16 text-white border-t border-white/10">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 tri-mesh opacity-60" />
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-20 tri-grid-bg opacity-25" />
      <div aria-hidden className="pointer-events-none absolute -left-28 top-1/2 h-80 w-80 -translate-y-1/2 rounded-full bg-[rgba(41,171,135,0.16)] blur-3xl" />
      <div aria-hidden className="pointer-events-none absolute -right-28 top-1/3 h-64 w-64 rounded-full bg-[rgba(245,166,35,0.12)] blur-3xl" />

      <Container className="relative">
        <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <span className="tri-overline">Insights</span>
            <h2 className="mt-2 text-2xl font-bold tracking-tight text-white sm:text-3xl lg:text-4xl">
              Practical SAP thinking in{" "}
              <span className="tri-gradient-text">blogs and videos.</span>
            </h2>
            <p className="mt-2 max-w-xl text-xs leading-relaxed text-slate-300 sm:text-sm sm:leading-6">
              Explore SAP, data, cloud, finance, and transformation ideas from the Trijotech team.
            </p>
          </div>

          <div className="flex w-full flex-col gap-3 md:w-auto md:items-end">
            <div role="tablist" aria-label="Insights tabs" className="grid w-full grid-cols-2 rounded-full border border-white/10 bg-white/[0.06] p-1 backdrop-blur-md md:w-64">
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
                        ? "bg-[linear-gradient(120deg,#29ab87,#117a4b)] text-white shadow-lg shadow-black/20"
                        : "text-slate-400 hover:bg-white/10 hover:text-white"
                    }`}
                  >
                    <Icon className="size-3.5 shrink-0" />
                    <span className="truncate">{label}</span>
                  </button>
                );
              })}
            </div>
            <GradientButton href={activeTab === "blogs" ? "/blogs" : "/videos"} variant="ghost" size="sm" className="w-full md:w-fit">
              {activeTab === "blogs" ? "View all blogs" : "View all videos"} <ArrowRight className="h-3.5 w-3.5" />
            </GradientButton>
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
