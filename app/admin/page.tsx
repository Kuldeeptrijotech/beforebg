import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { SESSION_COOKIE, verifySessionToken } from "@/app/lib/admin-auth";
import { readSiteContent } from "@/app/lib/content-store";
import { readBlogPosts } from "@/app/lib/blog-store";
import AdminEditor from "./AdminEditor";

const coreRoutes = [
  ["Home", "/"], ["Services", "/services"], ["SAP Consulting", "/services/sap-consulting"],
  ["SAP Support", "/services/sap-support"], ["SAP BTP Full Stack", "/services/sap-btp-full-stack"],
  ["SAP Data Integration", "/services/sap-data-integration"], ["SAP AI & ML", "/services/sap-ai-ml"],
  ["About Us", "/about-us"], ["Industry", "/industry"], ["Blogs", "/blogs"],
  ["Case Studies", "/case-studies"], ["Careers", "/careers"], ["Contact", "/contact"],
  ["Privacy Policy", "/privacy-policy"],
] as const;

export default async function AdminPage() {
  const token = (await cookies()).get(SESSION_COOKIE)?.value;
  if (!verifySessionToken(token)) redirect("/admin/login");
  const content = await readSiteContent();
  const blogs = await readBlogPosts();
  const routes = [
    ...coreRoutes.map(([label, path]) => ({ label, path })),
    ...blogs.map((blog) => ({ label: `Blog: ${blog.title}`, path: `/blogs/${blog.slug}` })),
  ];
  return <AdminEditor initialContent={content} initialBlogs={blogs} routes={routes} />;
}
