"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import type { Blog } from "../data/blogs";
import BlogCard from "../components/common/BlogCard";
import PageHero from "../components/common/PageHero";
import ContactCta from "../components/common/ContactCta";

export default function BlogsListing({ blogs }: { blogs: Blog[] }) {
  const [query, setQuery] = useState("");
  const [showResults, setShowResults] = useState(false);
  const matches = useMemo(() => {
    const value = query.trim().toLowerCase();
    return value ? blogs.filter((blog) => blog.title.toLowerCase().includes(value)) : [];
  }, [query, blogs]);

  return (
    <main className="blogs-page blogs-source-page">
      
      <PageHero title="Our Blogs" backgroundImage="/assets/heroes/blogs-blue.png" className="blogs-page-heading" />

      <section className="services blogs-listing-section">
        <div className="container">
          <div className="section-heading text-center">
            <h2>Innovation <em>Updates</em></h2>
            <p>Stay updated with the latest insights, innovations, and SAP technology updates.</p>
          </div>

          <div className="blog-search" onBlur={(event) => {
            if (!event.currentTarget.contains(event.relatedTarget)) setShowResults(false);
          }}>
            <div className="blog-search-group">
              <input
                type="search"
                value={query}
                onChange={(event) => { setQuery(event.target.value); setShowResults(true); }}
                onFocus={() => query && setShowResults(true)}
                placeholder="Search blogs..."
                aria-label="Search blogs"
              />
              <button type="button" onClick={() => setShowResults(Boolean(query))}>
                <i className="fa fa-search" aria-hidden="true" /> Search
              </button>
            </div>
            {showResults && query && (
              <ul className="blog-search-results">
                {matches.length ? matches.map((blog) => (
                  <li key={blog.link}><Link href={blog.link}>{blog.title}</Link></li>
                )) : <li className="no-results">No results found</li>}
              </ul>
            )}
          </div>

          <div className="row blogs-grid" id="blogContainer">
            {blogs.map((blog) => (
              <div className="col-md-4" key={blog.link}>
                
                <BlogCard blog={blog}/>

              </div>
            ))}
          </div>
        </div>
      </section>
      
      <ContactCta className="blogs-contact-source industry-source-page" />
    </main>
  );
}
