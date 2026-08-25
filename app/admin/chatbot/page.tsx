import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { SESSION_COOKIE, verifySessionToken } from "@/app/lib/admin-auth";
import ChatbotWorkspace from "./ChatbotWorkspace";

export default async function ChatbotAdminPage() {
  const token = (await cookies()).get(SESSION_COOKIE)?.value;
  if (!verifySessionToken(token)) redirect("/admin/login");
  return <ChatbotWorkspace />;
}
