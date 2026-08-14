import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { SESSION_COOKIE, verifySessionToken } from "@/app/lib/admin-auth";
import { readBlogPosts } from "@/app/lib/blog-store";
import CreateBlogWorkspace from "./CreateBlogWorkspace";

export default async function CreateBlogPage() {
  const token = (await cookies()).get(SESSION_COOKIE)?.value;
  if (!verifySessionToken(token)) redirect("/admin/login");
  return <CreateBlogWorkspace initialPosts={await readBlogPosts()} />;
}
