"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CalendarDays, Search, Sparkles } from "lucide-react";
import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import type { Blog } from "../data/blogs";

export default function BlogsListing({ blogs }: { blogs: Blog[] }) {
  const [query, setQuery] = useState("");
  const normalizedQuery = query.trim().toLowerCase();
  const visibleBlogs = useMemo(
    () =>
      normalizedQuery
        ? blogs.filter((blog) =>
            `${blog.title} ${blog.description}`
              .toLowerCase()
              .includes(normalizedQuery),
          )
        : blogs,
    [blogs, normalizedQuery],
  );

  return (
    <main className="overflow-hidden bg-[#e8f2fb] text-slate-900">
      <section className="relative isolate min-h-[calc(100svh-4.5rem)] overflow-hidden bg-cyan-950 pt-20">
        <Image
          src="/assets/heroes/blogs-blue.png"
          alt=""
          fill
          priority
          sizes="100vw"
          className="-z-20 object-cover object-center"
        />
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-cyan-950/95 via-cyan-950/75 to-cyan-900/20" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-t from-cyan-950/70 via-transparent to-slate-950/20" />
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
              <Sparkles className="h-4 w-4 text-cyan-200" aria-hidden="true" />{" "}
              Insights
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.2, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
              className="max-w-3xl text-4xl font-bold leading-[1.08] tracking-tight text-white sm:text-5xl lg:text-7xl"
            >
              Ideas that <span className="gradient-text">move business</span> forward
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.38 }}
              className="mt-6 max-w-2xl text-xl font-medium leading-8 text-cyan-50 sm:text-2xl"
            >
              Explore practical perspectives on SAP, analytics, integration,
              automation, and digital transformation.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.52 }}
              className="mt-9 flex flex-wrap gap-4"
            >
              <a
                href="#explore-blogs"
                className="inline-flex items-center gap-2 rounded-full bg-cyan-400 px-6 py-3.5 font-semibold text-cyan-950 shadow-lg shadow-cyan-950/20 transition-all duration-300 hover:-translate-y-1 hover:bg-cyan-300 hover:shadow-xl"
              >
                Explore blogs <ArrowRight className="h-4 w-4" />
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

      <section
        id="explore-blogs"
        className="relative bg-gradient-to-b from-[#d5eafa] to-[#e8f2fb] py-20 sm:py-24"
      >
        <div className="absolute left-0 top-0 h-64 w-64 -translate-x-1/2 rounded-full bg-cyan-100/70 blur-3xl" />
        <div className="relative mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
          <div className="grid gap-8 lg:grid-cols-[1fr_360px] lg:items-end">
            <div className="max-w-3xl">
              <p className="text-sm font-bold uppercase tracking-[0.2em] text-cyan-700">
                Explore
              </p>
              <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 sm:text-5xl">
                Insights shaped by experience
              </h2>
              <p className="mt-5 text-lg leading-8 text-slate-600">
                Stay current with expert thinking, implementation guidance, and
                technology updates from the Trijotech team.
              </p>
            </div>
            <label className="relative block">
              <span className="sr-only">Search blogs</span>
              <Search
                className="absolute left-5 top-1/2 h-5 w-5 -translate-y-1/2 text-cyan-700"
                aria-hidden="true"
              />
              <input
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search articles..."
                className="h-14 w-full rounded-full border border-blue-200 bg-[#f5faff] pl-13 pr-5 text-slate-900 shadow-sm outline-none transition placeholder:text-slate-500 focus:border-cyan-500 focus:ring-4 focus:ring-cyan-500/10"
              />
            </label>
          </div>

          {visibleBlogs.length ? (
            <div className="mt-12 grid gap-7 md:grid-cols-2 xl:grid-cols-3">
              {visibleBlogs.map((blog, i) => (
                <motion.article
                  key={blog.link}
                  initial={{ opacity: 0, y: 32 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.55, delay: (i % 3) * 0.1, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
                  whileHover={{ y: -8, transition: { duration: 0.2 } }}
                  className="group relative flex h-full min-w-0 flex-col overflow-hidden rounded-[1.75rem] border border-white/80 bg-white/90 shadow-[0_12px_35px_rgba(8,47,73,0.08)] ring-1 ring-blue-200/70 transition-shadow duration-300 hover:border-cyan-200 hover:shadow-[0_22px_50px_rgba(8,47,73,0.16)] hover:ring-cyan-300/70"
                >
                  <div className="absolute inset-x-8 top-0 z-10 h-1 rounded-b-full bg-gradient-to-r from-cyan-500 via-sky-500 to-blue-600 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                  <Link
                    href={blog.link}
                    className="relative m-3 mb-0 block aspect-[16/10] overflow-hidden rounded-[1.25rem] bg-slate-100"
                  >
                    <Image
                      src={blog.image}
                      alt={blog.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                      className="object-cover transition duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-cyan-950/55 via-cyan-950/5 to-transparent" />
                    <span className="absolute bottom-4 left-4 inline-flex items-center gap-2 rounded-full border border-white/25 bg-cyan-950/75 px-3.5 py-1.5 text-xs font-semibold text-white shadow-lg backdrop-blur-md">
                      <CalendarDays className="h-3.5 w-3.5 text-cyan-200" aria-hidden="true" />
                      {blog.date}
                    </span>
                    <span className="absolute right-4 top-4 flex h-10 w-10 translate-y-1 items-center justify-center rounded-full bg-white/90 text-cyan-800 opacity-0 shadow-lg backdrop-blur transition duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                      <ArrowRight className="h-4 w-4 -rotate-45" aria-hidden="true" />
                    </span>
                  </Link>
                  <div className="flex flex-1 flex-col px-6 pb-6 pt-6 sm:px-7 sm:pb-7">
                    <Link href={blog.link} className="group/title">
                      <h3 className="text-xl font-bold leading-snug text-slate-900 transition-colors group-hover/title:text-cyan-700 sm:text-2xl">
                        {blog.title}
                      </h3>
                    </Link>
                    <p className="mt-4 line-clamp-3 flex-1 leading-7 text-slate-600">
                      {blog.description}
                    </p>
                    <div className="mt-6 h-px bg-gradient-to-r from-blue-200 via-blue-100 to-transparent" />
                    <Link
                      href={blog.link}
                      className="mt-5 inline-flex w-fit items-center gap-2 rounded-full bg-cyan-50 px-4 py-2.5 font-semibold text-cyan-800 transition group-hover:bg-cyan-700 group-hover:px-5 group-hover:text-white"
                    >
                      Read article <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                    </Link>
                  </div>
                </motion.article>
              ))}
            </div>
          ) : (
            <div className="mt-12 rounded-3xl border border-blue-200 bg-[#f5faff] px-6 py-16 text-center shadow-sm">
              <h3 className="text-2xl font-bold text-slate-900">
                No articles found
              </h3>
              <p className="mt-3 text-slate-600">
                Try a different keyword to explore our insights.
              </p>
            </div>
          )}
        </div>
      </section>

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
              Ready to turn insight into measurable progress?
            </h2>
            <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-cyan-50/80">
              Connect with our team to explore the right SAP, data, and
              automation path for your business.
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
