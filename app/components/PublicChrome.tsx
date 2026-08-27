"use client";

import { usePathname } from "next/navigation";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import DeferredChatbot from "./chatbot/DeferredChatbot";

export default function PublicChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  if (pathname.startsWith("/admin")) return <>{children}</>;
  const isLandingPage = [
    "/services",
    "/solutions",
    "/insights",
    "/corporate",
  ].includes(pathname.toLowerCase());
  const usesStandaloneTailwind =
    pathname === "/services" ||
    pathname === "/solutions" ||
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
      <Header />
      {pathname === "/" ? children : usesStandaloneTailwind || usesModernDetailTheme ? (
        <div className={`font-sans ${isLandingPage ? "site-landing-theme" : "site-subpage-theme"}`}>{children}</div>
      ) : (
        <div className={`zip-inner-theme font-sans ${isLandingPage ? "site-landing-theme" : "site-subpage-theme"}`}>{children}</div>
      )}
      <Footer />
      <DeferredChatbot />
    </>
  );
}
