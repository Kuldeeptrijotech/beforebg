import { Poppins } from "next/font/google";
import "./globals.css";
import PublicChrome from "./components/PublicChrome";
import ContentRuntime from "./components/ContentRuntime";
import { readSiteContent } from "./lib/content-store";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

export const metadata = {
  title: "Trijotech | SAP Solutions",
  description: "SAP implementation, support, and business technology solutions.",
};

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const content = await readSiteContent();
  return (
    <html lang="en" className="w-full max-w-full overflow-x-clip">
      <body className={`${poppins.className} w-full max-w-full overflow-x-clip bg-[#0b1d33] [text-rendering:optimizeLegibility] [-webkit-font-smoothing:auto]`}>
        <ContentRuntime content={content} />
        <PublicChrome>{children}</PublicChrome>
      </body>
    </html>
  );
}
