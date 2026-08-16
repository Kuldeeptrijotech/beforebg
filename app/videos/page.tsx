"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ExternalLink, Play, Sparkles } from "lucide-react";
import { videos } from "@/app/data/videos";
import { motion } from "framer-motion";

function getYoutubeId(embedUrl: string) {
  return embedUrl.match(/youtube\.com\/embed\/([^?&/]+)/)?.[1] ?? "";
}

function getYoutubeUrl(embedUrl: string) {
  const id = getYoutubeId(embedUrl);
  return id ? `https://www.youtube.com/watch?v=${id}` : embedUrl;
}

export default function VideosPage() {
  return (
    <main className="overflow-hidden bg-[#e8f2fb] text-slate-900">
      {/* ── Hero ─────────────────────────────── */}
      <section className="relative isolate min-h-[calc(100svh-4.5rem)] overflow-hidden bg-cyan-950 pt-20">
        <Image
          src="/assets/heroes/videos-generated-v2.png"
          alt=""
          fill
          priority
          sizes="100vw"
          className="-z-20 object-cover object-center"
        />
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-cyan-950/95 via-cyan-950/75 to-cyan-900/20" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-t from-cyan-950/70 via-transparent to-slate-950/20" />

        {/* Floating orbs */}
        <div className="pointer-events-none absolute right-1/4 top-1/3 h-72 w-72 rounded-full bg-amber-400/8 blur-3xl animate-float-slow" />
        <div className="pointer-events-none absolute bottom-1/3 left-1/4 h-56 w-56 rounded-full bg-cyan-400/8 blur-3xl animate-float-reverse" />

        <div className="mx-auto flex min-h-[calc(100svh-9.5rem)] w-full max-w-7xl items-center px-5 py-10 sm:px-8 sm:py-12 lg:px-12">
          <div className="max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-cyan-50 backdrop-blur-md animate-pulse-glow"
            >
              <Sparkles className="h-4 w-4 text-cyan-200" aria-hidden="true" /> Video library
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.2, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
              className="max-w-3xl text-4xl font-bold leading-[1.08] tracking-tight text-white sm:text-5xl lg:text-7xl"
            >
              Expert ideas,{" "}
              <span className="gradient-text-gold">made easy to watch</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.38 }}
              className="mt-6 max-w-2xl text-xl font-medium leading-8 text-cyan-50 sm:text-2xl"
            >
              Watch practical conversations about SAP, analytics, cloud strategy, compliance, and enterprise transformation.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.52 }}
              className="mt-9 flex flex-wrap gap-4"
            >
              <a
                href="#explore-videos"
                className="inline-flex items-center gap-2 rounded-full bg-cyan-400 px-6 py-3.5 font-semibold text-cyan-950 shadow-lg shadow-cyan-950/20 transition-all duration-300 hover:-translate-y-1 hover:bg-cyan-300 hover:shadow-xl"
              >
                Explore videos <ArrowRight className="h-4 w-4" />
              </a>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-6 py-3.5 font-semibold text-white backdrop-blur-md transition-all duration-300 hover:bg-white/20"
              >
                Contact Us
              </Link>
            </motion.div>
          </div>
        </div>

      </section>

      {/* ── Video Grid ───────────────────────── */}
      <section id="explore-videos" className="relative bg-gradient-to-b from-[#d5eafa] to-[#e8f2fb] py-20 sm:py-24">
        <div className="pointer-events-none absolute left-0 top-0 h-64 w-64 -translate-x-1/2 rounded-full bg-cyan-100/70 blur-3xl animate-float" />
        <div className="pointer-events-none absolute right-0 bottom-0 h-48 w-48 translate-x-1/3 rounded-full bg-amber-100/50 blur-3xl animate-float-reverse" />

        <div className="relative mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
            className="max-w-3xl"
          >
            <p className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-[0.2em] text-cyan-700">
              <span className="h-px w-5 bg-cyan-400" />
              Watch and learn
            </p>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 sm:text-5xl">
              Insights from the{" "}
              <span className="gradient-text">Trijotech team</span>
            </h2>
            <p className="mt-5 text-lg leading-8 text-slate-600">
              Explore concise, practical videos designed to turn complex enterprise technology topics into clear business direction.
            </p>
          </motion.div>

          <div className="mt-12 grid gap-7 md:grid-cols-2 xl:grid-cols-3">
            {videos.map((video, index) => {
              const youtubeId = getYoutubeId(video.embed);
              const youtubeUrl = getYoutubeUrl(video.embed);
              const thumbnail = youtubeId
                ? `https://i.ytimg.com/vi/${youtubeId}/hqdefault.jpg`
                : "";

              return (
                <motion.div
                  key={`${video.title}-${index}`}
                  initial={{ opacity: 0, y: 32 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.55, delay: (index % 3) * 0.1, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
                  whileHover={{ y: -8, transition: { duration: 0.25 } }}
                >
                  <a
                    href={youtubeUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="group flex min-w-0 flex-col overflow-hidden rounded-3xl border border-blue-200 bg-[#f5faff] shadow-sm transition-shadow duration-300 hover:border-cyan-300 hover:shadow-xl hover:shadow-cyan-950/10"
                    aria-label={`Watch ${video.title} on YouTube`}
                  >
                    <div
                      className="relative aspect-[16/10] overflow-hidden bg-slate-900"
                    >
                      {thumbnail && (
                        <Image
                          src={thumbnail}
                          alt={`${video.title} thumbnail`}
                          fill
                          sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                          className="object-cover transition duration-700 group-hover:scale-108"
                        />
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-cyan-950/65 via-cyan-950/5 to-transparent" />

                      {/* Play button with ring pulse */}
                      <motion.span
                        whileHover={{ scale: 1.15 }}
                        transition={{ duration: 0.2 }}
                        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
                      >
                        <span className="relative flex h-16 w-16 items-center justify-center rounded-full border border-white/40 bg-white/90 text-cyan-800 shadow-xl transition duration-300 group-hover:bg-cyan-100">
                          {/* Pulse ring */}
                          <span className="absolute inset-0 rounded-full border-2 border-white/40 animate-ping opacity-50" />
                          <Play className="ml-1 h-6 w-6 fill-current" aria-hidden="true" />
                        </span>
                      </motion.span>

                      <span className="absolute bottom-4 left-5 rounded-full border border-white/20 bg-cyan-950/70 px-3 py-1 text-xs font-semibold text-white backdrop-blur-md">
                        YouTube
                      </span>
                    </div>

                    <div className="flex flex-1 flex-col p-6 sm:p-7">
                      <p className="text-xs font-bold uppercase tracking-[0.18em] text-cyan-700">
                        Trijotech video
                      </p>
                      <h3 className="mt-3 flex-1 text-xl font-bold leading-snug text-slate-900 transition-colors group-hover:text-cyan-800 sm:text-2xl">
                        {video.title}
                      </h3>
                      <span className="mt-auto inline-flex items-center gap-2 pt-7 font-semibold text-cyan-700 transition-all duration-200 group-hover:gap-3 group-hover:text-cyan-600">
                        Watch video <ExternalLink className="h-4 w-4" />
                      </span>
                    </div>
                  </a>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── CTA Banner ────────────────────────── */}
      <section className="bg-[#ccdfef] px-5 py-20 sm:px-8 sm:py-24 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
          className="relative mx-auto max-w-7xl overflow-hidden rounded-[2rem] bg-gradient-to-br from-cyan-700 to-cyan-950 px-6 py-14 text-center shadow-2xl shadow-cyan-950/15 sm:px-12 sm:py-20"
        >
          <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full border-[48px] border-white/5 animate-spin-slow" />
          <div className="absolute -bottom-24 -left-24 h-64 w-64 rounded-full bg-cyan-300/10 blur-2xl animate-float-slow" />
          <div className="relative mx-auto max-w-3xl">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-cyan-200">
              Let&apos;s work together
            </p>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-5xl">
              Ready to put these ideas into action?
            </h2>
            <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-cyan-50/80">
              Talk with our experts about applying SAP, data, cloud, and automation solutions to your priorities.
            </p>
            <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }} className="inline-block">
              <Link
                href="/contact"
                className="mt-9 inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 font-semibold text-cyan-950 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:bg-cyan-50 hover:shadow-xl"
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
