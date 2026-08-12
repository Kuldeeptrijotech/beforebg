"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import type { Blog } from "../data/blogs";

export default function BlogsListing({ blogs }: { blogs: Blog[] }) {
  const [query, setQuery] = useState("");
  const [showResults, setShowResults] = useState(false);
  const matches = useMemo(
    () => query.trim().toLowerCase()
      ? blogs.filter((b) => b.title.toLowerCase().includes(query.trim().toLowerCase()))
      : [],
    [query, blogs],
  );

  return (
    <main className="relative bg-slate-950 text-slate-100 font-inter min-h-screen">
      {/* Hero */}
      <section className="relative h-[240px] w-full overflow-hidden">
        <img src="/assets/heroes/blogs-blue.png" alt="Blogs" className="absolute inset-0 h-full w-full object-cover object-center" />
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-950/95 via-cyan-950/80 to-cyan-900/60" />
        <div className="absolute inset-0 bg-gradient-to-t from-cyan-950 via-transparent to-transparent" />
        <div className="relative z-10 mx-auto flex h-full max-w-7xl items-center justify-center px-4 text-center">
          <div>
            <p className="mb-2 text-sm font-bold uppercase tracking-wider text-cyan-400">Blogs</p>
            <h1 className="text-4xl font-bold text-slate-50">Our Blogs</h1>
          </div>
        </div>
      </section>

      {/* Search & Grid */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold">
            Innovation <em className="text-cyan-400">Updates</em>
          </h2>
          <p className="mt-3 text-slate-300">Stay updated with the latest insights, innovations, and SAP technology updates.</p>
        </div>

        {/* Search */}
        <div className="mx-auto mb-12 max-w-xl">
          <div className="relative">
            <input
              type="search"
              value={query}
              onChange={(e) => { setQuery(e.target.value); setShowResults(true); }}
              onFocus={() => query && setShowResults(true)}
              placeholder="Search blogs..."
              aria-label="Search blogs"
              className="w-full rounded-lg border border-slate-700 bg-slate-900/80 px-4 py-3 text-slate-100 placeholder-slate-500 focus:border-cyan-400 focus:outline-none focus:ring-1 focus:ring-cyan-400"
            />
            <i className="fa fa-search absolute right-3 top-1/2 -translate-y-1/2 text-slate-500" aria-hidden="true" />
          </div>
          {showResults && query && (
            <ul className="mt-2 max-h-60 overflow-y-auto rounded-lg border border-slate-700 bg-slate-900 shadow-xl">
              {matches.length ? matches.map((b) => (
                <li key={b.link} className="border-b border-slate-800 last:border-0">
                  <Link href={b.link} className="block px-4 py-2 text-cyan-400 hover:bg-slate-800/50">{b.title}</Link>
                </li>
              )) : <li className="px-4 py-2 text-slate-400">No results found</li>}
            </ul>
          )}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {blogs.map((blog) => (
            <article key={blog.link} className="group block overflow-hidden rounded-xl border border-slate-800 bg-slate-900/50 shadow-lg">
              {blog.image && (
                <div className="aspect-video overflow-hidden">
                  <img src={blog.image} alt={blog.title} className="h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-105" />
                </div>
              )}
              <div className="p-6">
                <h3 className="mb-2 text-xl font-bold text-slate-100 group-hover:text-cyan-400 transition-colors duration-300">{blog.title}</h3>
                {blog.description && <p className="mb-4 line-clamp-3 text-sm text-slate-400">{blog.description}</p>}
                <Link
                  href={blog.link}
                  className="inline-flex items-center rounded-lg bg-cyan-400 px-5 py-2.5 text-sm font-semibold text-slate-950 transition-colors duration-300 hover:bg-cyan-300"
                >
                  Read More
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Contact CTA */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="rounded-2xl bg-cyan-950/30 border border-cyan-800/50 p-8 text-center sm:p-12">
          <h3 className="text-2xl font-bold text-slate-100">Need more information?</h3>
          <p className="mt-3 text-slate-300">Contact us for any questions or to learn how our solutions can help your business.</p>
          <Link
            href="/contact"
            className="mt-6 inline-flex items-center justify-center rounded-lg bg-cyan-400 px-8 py-3 text-base font-semibold text-slate-950 transition-colors duration-300 hover:bg-cyan-300"
          >
            Contact Us
          </Link>
        </div>
      </section>
    </main>
  );
}
