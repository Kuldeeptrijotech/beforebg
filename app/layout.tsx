import "./globals.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import PublicChrome from "./components/PublicChrome";
import ContentRuntime from "./components/ContentRuntime";
import { readSiteContent } from "./lib/content-store";

export const metadata = {
  title: "Trijotech | SAP Solutions",
  description: "SAP implementation, support, and business technology solutions.",
};

export const dynamic = "force-dynamic";

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const content = await readSiteContent();
  return (
    <html lang="en">
      <head>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Poppins:100,200,300,400,500,600,700,800,900&display=swap" />
      </head>
      <body>
        <ContentRuntime content={content} />
        <PublicChrome>{children}</PublicChrome>
      </body>
    </html>
  );
}
