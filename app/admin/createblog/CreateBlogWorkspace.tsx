"use client";

import type { BlogPost } from "@/app/data/blogs";
import BlogManager from "../BlogManager";
import styles from "./createblog.module.css";

export default function CreateBlogWorkspace({ initialPosts }: { initialPosts: BlogPost[] }) {
  return <main className={styles.createBlogPage}>
    <header className={styles.routeHeader}>
      <a href="/admin" className={styles.backLink}>← Blog Management</a>
      <div><span>TRIJOTECH CONTENT STUDIO</span><h1>Create a new blog</h1><p>Write, design, preview, and publish from one focused workspace.</p></div>
      <a href="/blogs" target="_blank" rel="noreferrer" className={styles.viewBlogs}>View Blogs ↗</a>
    </header>
    <BlogManager initialPosts={initialPosts} onPostsChange={() => undefined} createOnly />
  </main>;
}
