import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { SESSION_COOKIE, verifySessionToken } from "@/app/lib/admin-auth";
import AdminLogin from "./AdminLogin";

export default async function LoginPage() {
  const token = (await cookies()).get(SESSION_COOKIE)?.value;
  if (verifySessionToken(token)) redirect("/admin");
  return <AdminLogin />;
}
