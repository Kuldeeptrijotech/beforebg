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
      className="tri-glass-card group flex h-full flex-col overflow-hidden rounded-3xl transition hover:-translate-y-1"
    >
      <Link href={blog.href} className="relative aspect-4/3 overflow-hidden bg-slate-900">
        <Image src={blog.image} alt={blog.imageAlt} fill sizes="(min-width: 1280px) 25vw, (min-width: 768px) 50vw, 100vw" className="object-fill transition duration-700 group-hover:scale-105" />
        <div aria-hidden className="absolute inset-0 bg-[linear-gradient(180deg,transparent,rgba(3,7,19,0.75))]" />
        <span className="absolute bottom-4 left-4 inline-flex items-center gap-2 rounded-full border border-white/15 bg-[rgba(3,7,19,0.65)] px-3 py-1.5 text-xs font-semibold text-white backdrop-blur-xl">
          <CalendarDays className="size-3.5 text-[#f5a623]" />
          {blog.date}
        </span>
      </Link>
      <div className="flex flex-1 flex-col p-4 sm:p-5">
        <h3 className="line-clamp-2 text-base font-semibold leading-6 text-white sm:text-lg sm:leading-7">{blog.title}</h3>
        <p className="mt-3 line-clamp-3 flex-1 text-sm leading-6 text-slate-400">{blog.description}</p>
        <Link href={blog.href} className="mt-6 inline-flex w-fit items-center gap-2 text-sm font-semibold text-[#7edcc2] transition hover:text-[#f5a623]">
          Read blog <ExternalLink className="size-4" />
        </Link>
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
      className="tri-glass-card group flex h-full flex-col overflow-hidden rounded-3xl transition hover:-translate-y-1"
    >
      <a href={video.youtubeUrl} target="_blank" rel="noreferrer" className="relative aspect-video overflow-hidden bg-slate-900" aria-label={`Watch ${video.title} on YouTube`}>
        <Image src={getYoutubeThumbnail(video.youtubeId)} alt={`${video.title} video thumbnail`} fill sizes="(min-width: 1280px) 25vw, (min-width: 768px) 50vw, 100vw" className="object-fill opacity-100" />
        <div aria-hidden className="absolute inset-0 bg-[rgba(3,7,19,0.25)] transition group-hover:bg-[rgba(3,7,19,0.1)]" />
        <span className="absolute left-1/2 top-1/2 flex size-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white/85 text-[#0b5a38] shadow-2xl shadow-black/30 transition group-hover:scale-110">
          <Play className="size-8" />
        </span>
      </a>
      <div className="flex flex-1 flex-col p-4 sm:p-5">
        <p className="text-xs font-semibold uppercase tracking-wide text-[#f5a623]">YouTube</p>
        <h3 className="line-clamp-2 text-base font-semibold leading-6 text-white sm:text-lg sm:leading-7">{video.title}</h3>
        <p className="mt-3 line-clamp-3 flex-1 text-sm leading-6 text-slate-400">{video.description}</p>
        <a href={video.youtubeUrl} target="_blank" rel="noreferrer" className="mt-6 inline-flex w-fit items-center gap-2 text-sm font-semibold text-[#f5a623] transition hover:text-white">
          Watch video <ExternalLink className="size-4" />
        </a>
      </div>
    </motion.article>
  );
}

export default function InsightsPreview() {
  const [activeTab, setActiveTab] = useState<InsightTab>("blogs");
  const visibleBlogs = featuredBlogs.filter((blog) => blog.showOnHome);
  const visibleVideos = featuredVideos.filter((video) => video.showOnHome);

  return (
    <section className="relative isolate overflow-hidden bg-[#050817] py-24 text-white sm:py-28">
      <div aria-hidden className="absolute inset-0 -z-20 tri-mesh" />

      <Container className="relative">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <span className="tri-overline">Insights</span>
            <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
              Practical SAP thinking in{" "}
              <span className="tri-gradient-text">blogs and videos.</span>
            </h2>
            <p className="mt-5 text-base leading-7 text-slate-400 sm:text-lg">
              Explore SAP, data, cloud, finance, and transformation ideas from the Trijotech team.
            </p>
          </div>

          <div className="flex w-full flex-col gap-4 md:w-auto md:items-end">
            <div role="tablist" aria-label="Insights tabs" className="grid w-full grid-cols-2 rounded-full border border-white/10 bg-white/[0.06] p-1 backdrop-blur-md md:w-72">
              {insightTabs.map(({ id, label, Icon }) => {
                const isActive = activeTab === id;
                return (
                  <button
                    key={id}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    onClick={() => setActiveTab(id)}
                    className={`inline-flex h-10 min-w-0 items-center justify-center gap-2 rounded-full px-3 text-sm font-semibold transition sm:px-4 ${
                      isActive
                        ? "bg-[linear-gradient(120deg,#29ab87,#117a4b)] text-white shadow-lg shadow-black/20"
                        : "text-slate-400 hover:bg-white/10 hover:text-white"
                    }`}
                  >
                    <Icon className="size-4 shrink-0" />
                    <span className="truncate">{label}</span>
                  </button>
                );
              })}
            </div>
            <GradientButton href={activeTab === "blogs" ? "/blogs" : "/videos"} variant="ghost" size="sm" className="w-full md:w-fit">
              {activeTab === "blogs" ? "View all blogs" : "View all videos"} <ArrowRight className="h-4 w-4" />
            </GradientButton>
          </div>
        </div>

        <AnimatePresence mode="wait">
          {activeTab === "blogs" ? (
            <motion.div key="blogs" initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -18 }} transition={{ duration: 0.24, ease: "easeOut" }} className="mt-10 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
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
