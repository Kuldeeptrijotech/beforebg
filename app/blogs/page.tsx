import type { Metadata } from "next";
import BlogsListing from "./BlogsListing";

export const metadata: Metadata = {
  title: "Blogs",
  description:
    "Stay updated with the latest insights, innovations, and SAP technology updates from Trijotech.",
};

export default function BlogsPage() {
  return <BlogsListing />;
}
