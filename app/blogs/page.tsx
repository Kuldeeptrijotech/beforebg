import type { Metadata } from "next";
import BlogsListing from "./BlogsListing";
import { readBlogPosts, toBlogCard } from "@/app/lib/blog-store";

export const metadata: Metadata = {
  title: "Blogs",
  description:
    "Stay updated with the latest insights, innovations, and SAP technology updates from Trijotech.",
};

export const dynamic = "force-dynamic";

export default async function BlogsPage() {
  const posts = (await readBlogPosts())
    .filter((post) => post.status === "published")
    .sort((left, right) => Date.parse(right.publishedAt || right.updatedAt) - Date.parse(left.publishedAt || left.updatedAt));
  return <BlogsListing blogs={posts.map(toBlogCard)} />;
}
