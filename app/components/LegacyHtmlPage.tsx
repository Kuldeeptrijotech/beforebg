import LatestBlogsCarousel from "./LatestBlogsCarousel";
import ContactCta from "./common/ContactCta";
import ArticleBlocks, { type ContentBlock } from "./common/ArticleBlocks";

type Props = {
  title: string;
  description?: string;
  blocks: ContentBlock[];
  className?: string;
  heroImage?: string;
  showLatestBlogs?: boolean;
  showContactCta?: boolean;
};

export default function LegacyHtmlPage({
  title,
  description = "",
  blocks,
  className = "legacy-content-page",
  heroImage,
  showLatestBlogs = true,
  showContactCta = true,
}: Props) {
  const latestIndex = blocks.findIndex(block => block.type === "heading" && String(block.text ?? "").toLowerCase().includes("latest blogs"));
  const articleBlocks = (latestIndex < 0 ? blocks : blocks.slice(0, latestIndex)).filter(block => !(block.type === "heading" && String(block.text ?? "").trim() === title.trim()));
  return (
    <main className={`${className} min-h-screen w-full bg-[#050817] pt-24 text-white font-sans overflow-hidden`}>
      <article className="w-full">
        {/* Full-width Hero Header */}
        <header
          className="relative isolate w-full overflow-hidden bg-[#050817] py-12 sm:py-16 border-b border-white/10"
          style={heroImage ? { backgroundImage: `linear-gradient(90deg, rgba(5, 8, 23, .92), rgba(5, 8, 23, .45)), url(${heroImage})`, backgroundSize: "cover", backgroundPosition: "center" } : undefined}
        >
          <div aria-hidden className="absolute inset-0 -z-20 tri-mesh opacity-60" />
          <div aria-hidden className="absolute inset-0 -z-30 tri-hex-grid opacity-45" />
          <div aria-hidden className="tri-blob -z-10 h-80 w-80" style={{ right: "10%", top: "10%", background: "radial-gradient(circle, rgba(255, 255, 255,0.18), transparent 70%)" }} />

          <div className="mx-auto w-full max-w-7xl px-5 sm:px-8 lg:px-12">
            <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-cyan-200 bg-[#050817]/90 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-white">
              Trijotech Insights
            </span>
            <h1 className="max-w-4xl text-2xl font-bold leading-[1.2] tracking-tight text-white sm:text-4xl lg:text-5xl">{title}</h1>
            {description && <p className="mt-5 max-w-3xl text-base sm:text-lg leading-[1.7] text-white/80">{description}</p>}
          </div>
        </header>

        {/* Full-width Content Body */}
        <div className="w-full bg-white py-12 sm:py-16 border-b border-slate-200">
          <div className="mx-auto w-full max-w-7xl px-5 sm:px-8 lg:px-12 text-slate-900 [&_a]:text-[#087b71] [&_a]:underline [&_a]:font-medium [&_h1]:text-black [&_h1]:font-bold [&_h1]:text-2xl sm:[&_h1]:text-3xl [&_h1]:mt-8 [&_h1]:mb-4 [&_h2]:my-5 [&_h2]:mt-10 [&_h2]:text-xl sm:[&_h2]:text-2xl [&_h2]:font-bold [&_h2]:leading-snug [&_h2]:text-black [&_h3]:mb-3 [&_h3]:mt-8 [&_h3]:text-lg sm:[&_h3]:text-xl [&_h3]:font-bold [&_h3]:leading-snug [&_h3]:text-black [&_h4]:text-black [&_h4]:font-bold [&_li]:my-2 [&_li]:pl-1.5 [&_li]:leading-relaxed [&_li]:text-slate-800 [&_ol]:mb-6 [&_ol]:mt-2 [&_ol]:pl-6 [&_p]:mb-5 [&_p]:text-left [&_p]:text-sm sm:[&_p]:text-base [&_p]:leading-[1.8] [&_p]:text-slate-800 [&_ul]:mb-6 [&_ul]:mt-2 [&_ul]:pl-6">
            <ArticleBlocks blocks={articleBlocks} />
          </div>
        </div>
      </article>

      {showLatestBlogs && <LatestBlogsCarousel />}

      {showContactCta && <ContactCta />}
    </main>
  );
}
