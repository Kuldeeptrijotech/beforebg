"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ExternalLink, Play, Sparkles } from "lucide-react";
import { videos } from "@/app/data/videos";
import { motion } from "framer-motion";
import VideosBroadcastBeams from "@/components/ui/hero-animations/VideosBroadcastBeams";

function getYoutubeId(embedUrl: string) {
  return embedUrl.match(/youtube\.com\/embed\/([^?&/]+)/)?.[1] ?? "";
}

function getYoutubeUrl(embedUrl: string) {
  const id = getYoutubeId(embedUrl);
  return id ? `https://www.youtube.com/watch?v=${id}` : embedUrl;
}

export default function VideosPage() {
  return (
    <main className="overflow-hidden bg-[#121927] text-white">
      {/* ── Hero ─────────────────────────────── */}
      <section className="relative isolate min-h-[calc(100svh-4.5rem)] overflow-hidden bg-cyan-950 pt-24 sm:pt-28 lg:pt-24 pb-12">
        <Image
          src="/assets/heroes/videos-generated-v2.png"
          alt="Technical practitioner videos and architectural walkthroughs"
          fill
          priority
          sizes="100vw"
          className="-z-20 object-cover object-center opacity-95"
        />
        {/* Slow harmonic broadcast waves & luminous projector beams */}
        <VideosBroadcastBeams />

        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-cyan-950/85 via-cyan-950/45 to-cyan-900/10" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-t from-cyan-950/50 via-transparent to-slate-950/10" />

        {/* Floating orbs */}
        <div className="pointer-events-none absolute right-1/4 top-1/4 h-72 w-72 rounded-full bg-cyan-400/10 blur-3xl animate-float-slow" />
        <div className="pointer-events-none absolute bottom-1/3 left-1/3 h-56 w-56 rounded-full bg-indigo-400/8 blur-3xl animate-float-reverse" />

        <div className="mx-auto flex min-h-[calc(100svh-9.5rem)] w-full max-w-7xl items-center px-5 py-10 sm:px-8 sm:py-12 lg:px-12">
          <div className="max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-cyan-50 backdrop-blur-md animate-pulse-glow"
            >
              <Sparkles className="h-4 w-4 text-cyan-200" aria-hidden="true" /> Videos
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.2, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
              className="text-2xl font-semibold leading-[1.18] tracking-tight text-white sm:text-3xl lg:text-4xl"
            >
              Explore videos from{" "}
              <span className="bg-gradient-to-r from-cyan-300 via-sky-300 to-indigo-300 bg-clip-text text-transparent">
                our practitioners
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.35, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
              className="mt-6 text-lg leading-8 text-cyan-50/90 sm:text-xl"
            >
              Watch breakdowns, architectural deep dives, and product walkthroughs explaining modern enterprise IT.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <a
                href="#explore-videos"
                className="mt-9 inline-flex items-center gap-2 rounded-full bg-cyan-400 px-6 py-3.5 font-semibold text-cyan-950 shadow-lg shadow-cyan-950/20 transition-all duration-300 hover:-translate-y-1 hover:bg-cyan-300 hover:shadow-xl"
              >
                Explore videos <ArrowRight className="h-4 w-4" />
              </a>
            </motion.div>
          </div>
        </div>

        {/* Clean bottom separator */}
        <div aria-hidden className="absolute inset-x-0 bottom-0 z-30 h-px bg-white/[0.08]" />
      </section>

      {/* ── Video Library ─────────────────────── */}
      <section id="explore-videos" className="relative isolate overflow-hidden bg-[#0b1d33] py-12 sm:py-14 lg:py-16 border-b border-white/5">
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 tri-hex-grid opacity-45" />
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-20 tri-mesh opacity-50" />
        <div className="relative mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
            className="max-w-3xl"
          >
            <p className="tri-overline">
              Watch and learn
            </p>
            <h2 className="mt-2 text-2xl font-bold tracking-tight text-white sm:text-3xl lg:text-4xl">
              Insights from the{" "}
              <span className="tri-gradient-text">Trijotech team</span>
            </h2>
            <p className="mt-2 text-xs sm:text-sm leading-relaxed text-slate-300">
              Explore concise, practical videos designed to turn complex enterprise technology topics into clear business direction.
            </p>
          </motion.div>

          <div className="mt-7 sm:mt-9 grid gap-5 sm:grid-cols-2 xl:grid-cols-3 items-stretch">
            {videos.map((video, index) => {
              const youtubeId = getYoutubeId(video.embed);
              const youtubeUrl = getYoutubeUrl(video.embed);
              const thumbnail = youtubeId
                ? `https://i.ytimg.com/vi/${youtubeId}/hqdefault.jpg`
                : "";

              return (
                <motion.div
                  key={video.title}
                  initial={{ opacity: 0, y: 32 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.55, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
                  whileHover={{ y: -6, transition: { duration: 0.2 } }}
                  className="h-full"
                >
                  <a
                    href={youtubeUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="group flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] shadow-2xl backdrop-blur-xl transition-all duration-300 hover:border-[#29ab87]/50 hover:bg-white/[0.07]"
                  >
                    <div className="relative aspect-video w-full shrink-0 overflow-hidden bg-slate-900">
                      {thumbnail ? (
                        <Image
                          src={thumbnail}
                          alt={video.title}
                          fill
                          sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                          className="object-cover transition duration-700 group-hover:scale-108"
                        />
                      ) : (
                        <div className="flex h-full items-center justify-center bg-slate-950 text-slate-500">
                          Video preview unavailable
                        </div>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="flex h-12 w-12 items-center justify-center rounded-full bg-[linear-gradient(150deg,#29ab87,#117a4b)] text-white shadow-xl shadow-[rgba(41,171,135,0.45)] transition-transform duration-300 group-hover:scale-115">
                          <Play className="ml-1 h-5 w-5 fill-current" />
                        </span>
                      </div>
                    </div>

                    <div className="flex flex-1 flex-col p-5 sm:p-6">
                      <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#f5a623]">
                        Trijotech Video
                      </p>
                      <h3 className="mt-2 flex-1 text-base sm:text-lg font-bold leading-snug text-white transition-colors group-hover:text-[#7edcc2]">
                        {video.title}
                      </h3>
                      <div className="mt-auto pt-4">
                        <span className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#7edcc2] transition-all duration-200 group-hover:gap-2.5 group-hover:text-[#f5a623]">
                          Watch video <ExternalLink className="h-3.5 w-3.5" />
                        </span>
                      </div>
                    </div>
                  </a>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── CTA Banner ────────────────────────── */}
      <section className="relative isolate overflow-hidden bg-[#18263e] px-5 py-12 sm:px-8 sm:py-16 lg:px-12 border-t border-white/10">
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 tri-mesh opacity-60" />
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-20 tri-grid-bg opacity-25" />
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
          className="tri-border-gradient relative mx-auto max-w-7xl overflow-hidden rounded-[2.5rem] bg-[linear-gradient(145deg,#1e2a3f,#162236_50%,#111827)] px-6 py-8 text-center shadow-[0_40px_120px_-30px_rgba(0,0,0,0.5)] sm:px-12 sm:py-10"
        >
          <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full border-[48px] border-white/5 tri-spin-slow" />
          <div className="tri-blob h-56 w-56 animate-float-slow" style={{ left: "-6%", bottom: "-8%", background: "radial-gradient(circle, rgba(41,171,135,0.28), transparent 68%)" }} />
          <div className="relative mx-auto max-w-3xl">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#f5a623]">
              Let&apos;s work together
            </p>
            <h2 className="mt-3 text-2xl font-extrabold tracking-tight text-white sm:text-3xl">
              Ready to put these ideas into action?
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-slate-300 sm:text-base">
              Talk with our experts about applying SAP, data, cloud, and automation solutions to your priorities.
            </p>
            <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }} className="inline-block mt-6">
              <Link
                href="/contact"
                className="tri-btn tri-btn-primary px-6 py-3 text-sm font-semibold"
              >
                Start a conversation <ArrowRight className="h-4 w-4" />
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </section>
    </main>
  );
}
