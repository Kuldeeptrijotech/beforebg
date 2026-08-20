"use client";

import { usePathname } from "next/navigation";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import DeferredChatbot from "./chatbot/DeferredChatbot";
import ViewportPerformance from "@/components/ui/ViewportPerformance";

export default function PublicChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  if (pathname.startsWith("/admin")) return <>{children}</>;
  const isLandingPage = [
    "/services",
    "/solutions",
    "/industry",
    "/insights",
    "/corporate",
  ].includes(pathname.toLowerCase());
  const usesStandaloneTailwind =
    pathname === "/services" ||
    pathname === "/solutions" ||
    pathname.toLowerCase() === "/industry" ||
    pathname === "/insights" ||
    pathname === "/corporate" ||
    pathname.startsWith("/industries/") ||
    pathname === "/blogs" ||
    pathname === "/videos" ||
    pathname === "/case-studies" ||
    pathname === "/careers" ||
    pathname === "/contact" ||
    pathname === "/about-us";
  const usesModernDetailTheme =
    pathname.startsWith("/services/") ||
    pathname.startsWith("/solutions/");
  return (
    <>
      <ViewportPerformance />
      <Header />
      {pathname === "/" ? children : usesStandaloneTailwind || usesModernDetailTheme ? (
        <div className={isLandingPage ? "site-landing-theme" : "site-subpage-theme"}>{children}</div>
      ) : (
        <div className={`zip-inner-theme ${isLandingPage ? "site-landing-theme" : "site-subpage-theme"}`}>{children}</div>
      )}
      <Footer />
      <DeferredChatbot />
    </>
  );
}
