import type { Metadata } from "next";
import { ExternalLink, Play, Video } from "lucide-react";
import Container from "@/components/ui/Container";
import { videos } from "@/app/data/videos";
import PageHero from "@/app/components/common/PageHero";

export const metadata: Metadata = {
  title: "Videos | Trijotech",
  description: "Watch Trijotech videos about SAP, analytics, cloud strategy, profitability, compliance, and enterprise transformation.",
};

function getYoutubeId(embedUrl: string) {
  return embedUrl.match(/youtube\.com\/embed\/([^?&/]+)/)?.[1] ?? "";
}

function getYoutubeUrl(embedUrl: string) {
  const id = getYoutubeId(embedUrl);
  return id ? `https://www.youtube.com/watch?v=${id}` : embedUrl;
}

export default function VideosPage() {
  return (
    <main className="videos-page bg-[#030713] text-white">
      <PageHero
        title={<><Video className="video-hero-title-icon" aria-hidden="true" /> Videos</>}
        backgroundImage="/assets/heroes/videos-generated-v2.png"
        className="videos-page-hero case-studies-hero"
      />

      <section className="bg-[#07101d] py-18 md:py-24">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.14em] text-cyan-300">Video library</p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-white md:text-4xl">Watch all Trijotech videos</h2>
            <p className="mt-4 text-sm leading-6 text-white/60 md:text-base">
              Select any video to watch it directly on the official YouTube page.
            </p>
          </div>

          <div className="mx-auto mt-10 grid max-w-5xl gap-5 md:grid-cols-2 lg:grid-cols-3">
            {videos.map((video, index) => {
              const youtubeId = getYoutubeId(video.embed);
              const youtubeUrl = getYoutubeUrl(video.embed);
              const thumbnail = youtubeId ? `https://i.ytimg.com/vi/${youtubeId}/hqdefault.jpg` : "";

              return (
                <a
                  key={`${video.title}-${index}`}
                  href={youtubeUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="video-library-card group flex min-h-full flex-col overflow-hidden rounded-xl border border-white/10 bg-white/[0.045] no-underline shadow-[0_12px_30px_rgba(0,0,0,0.18)] transition duration-300 hover:-translate-y-1 hover:border-cyan-300/35 hover:bg-white/[0.07] hover:shadow-[0_18px_38px_rgba(0,0,0,0.26)]"
                  aria-label={`Watch ${video.title} on YouTube`}
                >
                  <div
                    className="relative aspect-[16/8.5] overflow-hidden bg-[#111827] bg-cover bg-center transition duration-500 group-hover:scale-[1.015]"
                    style={thumbnail ? { backgroundImage: `url('${thumbnail}')` } : undefined}
                  >
                    <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(3,7,19,0.06),rgba(3,7,19,0.6))] transition group-hover:bg-[linear-gradient(180deg,rgba(3,7,19,0),rgba(3,7,19,0.42))]" />
                    <span className="absolute left-1/2 top-1/2 grid size-12 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-white/30 bg-white/90 text-[#07101d] shadow-lg transition duration-300 group-hover:scale-110 group-hover:bg-cyan-100">
                      <Play className="ml-0.5 size-5 fill-current" />
                    </span>
                    <span className="absolute bottom-3 left-3 rounded-full border border-white/15 bg-[#030713]/75 px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-white/80 backdrop-blur-md">
                      YouTube
                    </span>
                  </div>

                  <div className="video-library-card-content flex flex-1 flex-col p-4">
                    <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-cyan-300">Trijotech video</p>
                    <h2 className="mt-2 text-base font-semibold leading-6 text-white">{video.title}</h2>
                    <span className="mt-4 inline-flex items-center gap-2 text-xs font-semibold text-white/65 transition group-hover:text-cyan-200">
                      Watch on YouTube <ExternalLink className="size-3.5" />
                    </span>
                  </div>
                </a>
              );
            })}
          </div>
        </Container>
      </section>
    </main>
  );
}
