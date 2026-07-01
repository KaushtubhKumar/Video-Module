import Link from "next/link";
import { VideoCard } from "@/components/videos/VideoCard";
import { SectionHeader } from "@/components/videos/SectionHeader";
import { VideoFilters } from "@/components/videos/VideoFilters";
import { ThumbImage } from "@/components/videos/ThumbImage";
import {
  videos,
  getTrendingVideos,
  getLatestVideos,
  formatDuration,
  formatViews,
} from "@/lib/videos-data";

function formatCompact(n: number) {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(0)}K`;
  return `${n}`;
}

export default function VideosPage() {
  const trending = getTrendingVideos(4);
  const latest = getLatestVideos(8);
  const featured = trending[0];

  const totalVideos = videos.length;
  const toolsCovered = new Set(videos.map((v) => v.toolName)).size;
  const totalWatchHours = Math.round(
    videos.reduce((sum, v) => sum + v.durationSeconds, 0) / 3600
  );
  const totalViews = videos.reduce((sum, v) => sum + v.views, 0);

  const stats = [
    { value: `${totalVideos}+`, label: "Walkthroughs" },
    { value: `${toolsCovered}`, label: "Tools covered" },
    { value: `${totalWatchHours}h`, label: "Total runtime" },
    { value: formatCompact(totalViews), label: "Combined views" },
  ];

  return (
    <main className="noise-bg min-h-screen pb-24">
      {/* Top nav */}
      <header className="sticky top-0 z-20 border-b border-border bg-bg/80 backdrop-blur-md">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-3">
            <span
              className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-accent to-[#8b7ff0] text-[13px] font-bold text-white"
              style={{ boxShadow: "0 0 0 1px rgba(255,255,255,0.08), 0 6px 16px -4px rgba(94,106,210,0.55)" }}
            >
              A
            </span>
            <div className="flex items-center gap-2">
              <span className="text-[14.5px] font-semibold tracking-tight">AI Tools</span>
              <span className="h-3.5 w-px bg-border" />
              <span className="text-[14.5px] font-medium text-secondary">Videos</span>
            </div>
          </div>

          <nav className="hidden items-center gap-1 sm:flex">
            <Link
              href="#"
              className="rounded-full px-3.5 py-1.5 text-[13.5px] font-medium text-secondary transition-colors hover:bg-bg-hover hover:text-primary"
            >
              Browse tools
            </Link>
            <Link
              href="#"
              className="rounded-full bg-bg-hover px-3.5 py-1.5 text-[13.5px] font-medium text-primary"
            >
              Videos
            </Link>
            <Link
              href="#"
              className="rounded-full px-3.5 py-1.5 text-[13.5px] font-medium text-secondary transition-colors hover:bg-bg-hover hover:text-primary"
            >
              Collections
            </Link>
            <Link
              href="#"
              className="rounded-full px-3.5 py-1.5 text-[13.5px] font-medium text-secondary transition-colors hover:bg-bg-hover hover:text-primary"
            >
              Submit a tool
            </Link>
          </nav>

          <div className="flex items-center gap-2">
            <button
              aria-label="Search"
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-border text-secondary transition-colors hover:border-border-strong hover:text-primary"
            >
              <svg width="15" height="15" viewBox="0 0 16 16" fill="none">
                <circle cx="7" cy="7" r="5.25" stroke="currentColor" strokeWidth="1.4" />
                <path d="M11 11l3.5 3.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
              </svg>
            </button>
            <button className="hidden items-center gap-1.5 rounded-lg bg-accent px-3.5 py-2 text-[13px] font-medium text-white transition-colors hover:bg-accent-hover sm:flex">
              Submit a tool
            </button>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="container relative overflow-hidden pt-16 pb-16 sm:pt-20 sm:pb-20">
        <div
          className="pointer-events-none absolute -top-32 right-[-8%] h-96 w-96 rounded-full opacity-40 blur-[100px]"
          style={{ background: "radial-gradient(circle, rgba(94,106,210,0.55), transparent 70%)" }}
        />
        <div
          className="pointer-events-none absolute top-24 left-[-12%] h-72 w-72 rounded-full opacity-20 blur-[100px]"
          style={{ background: "radial-gradient(circle, rgba(216,90,48,0.45), transparent 70%)" }}
        />
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage:
              "linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)",
            backgroundSize: "56px 56px",
            maskImage: "linear-gradient(to bottom, black, transparent 85%)",
          }}
        />

        <div className="relative grid grid-cols-1 items-center gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:gap-10">
          <div>
            <div
              className="mb-5 inline-flex animate-fadeUp items-center gap-2 rounded-full border border-border bg-bg-elevated py-1 pl-1.5 pr-3.5"
            >
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-accent-soft">
                <span className="h-1.5 w-1.5 rounded-full bg-accent-hover" />
              </span>
              <span className="text-[12px] font-semibold uppercase tracking-[0.06em] text-accent-hover">
                Module 09 · Videos
              </span>
            </div>

            <h1
              className="max-w-xl animate-fadeUp text-[36px] font-semibold leading-[1.12] tracking-tight text-primary sm:text-[48px]"
              style={{ animationDelay: "60ms" }}
            >
              See the tool work{" "}
              <span className="bg-gradient-to-r from-accent-hover to-[#a78bfa] bg-clip-text text-transparent">
                before you install it
              </span>
            </h1>

            <p
              className="mt-4 max-w-lg animate-fadeUp text-[15.5px] leading-relaxed text-secondary"
              style={{ animationDelay: "120ms" }}
            >
              Every listing is backed by a real walkthrough — no marketing screenshots, no
              guesswork. Watch it, then decide.
            </p>

            <div
              className="mt-7 flex animate-fadeUp flex-wrap items-center gap-3"
              style={{ animationDelay: "160ms" }}
            >
              <a
                href="#trending"
                className="rounded-lg bg-accent px-5 py-2.5 text-[13.5px] font-medium text-white transition-colors hover:bg-accent-hover"
              >
                Watch trending now
              </a>
              <a
                href="#latest-videos"
                className="rounded-lg border border-border px-5 py-2.5 text-[13.5px] font-medium text-secondary transition-colors hover:border-border-strong hover:text-primary"
              >
                Browse all videos
              </a>
            </div>

            <div
              className="mt-10 flex animate-fadeUp flex-wrap gap-x-9 gap-y-5 border-t border-border pt-6"
              style={{ animationDelay: "200ms" }}
            >
              {stats.map((s) => (
                <div key={s.label}>
                  <p className="font-mono text-[21px] font-semibold tracking-tight text-primary">
                    {s.value}
                  </p>
                  <p className="mt-0.5 text-[12px] text-secondary">{s.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Featured video showcase */}
          {featured && (
            <div className="relative animate-fadeUp" style={{ animationDelay: "140ms" }}>
              <div className="pointer-events-none absolute -inset-3 -z-10 hidden rounded-[28px] border border-border bg-bg-elevated/50 sm:block" />
              <Link
                href={`/videos/${featured.slug}`}
                className="group relative block overflow-hidden rounded-card border border-border-strong bg-surface"
                style={{ boxShadow: "0 32px 64px -24px rgba(0,0,0,0.65)" }}
              >
                <div className="relative aspect-video overflow-hidden">
                  <ThumbImage
                    src={featured.thumbnail}
                    alt=""
                    toolName={featured.toolName}
                    accent={featured.accent}
                    sizes="(max-width: 1024px) 100vw, 560px"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                  <span className="absolute left-3 top-3 z-10 flex items-center gap-1.5 rounded-full bg-black/60 px-2.5 py-1 text-[11px] font-semibold text-white backdrop-blur-sm">
                    <svg width="11" height="11" viewBox="0 0 16 16" fill="currentColor">
                      <path d="M8 1.2c.3 2.1 1.3 3.4 2.8 4.9 1.6 1.6 2.4 3 2.4 4.7a5.2 5.2 0 0 1-10.4 0c0-1.2.4-2.2 1.2-3.4.1.9.6 1.6 1.3 1.9-.2-2.3.6-4.6 2.7-6.1Z" />
                    </svg>
                    #1 trending
                  </span>
                  <span className="absolute bottom-3 right-3 z-10 rounded bg-black/70 px-1.5 py-0.5 text-[11px] font-medium text-white font-mono">
                    {formatDuration(featured.durationSeconds)}
                  </span>
                  <span className="pointer-events-none absolute inset-0 flex items-center justify-center">
                    <span className="flex h-14 w-14 items-center justify-center rounded-full bg-white/95 text-bg shadow-lg transition-transform duration-200 group-hover:scale-110">
                      <svg width="18" height="18" viewBox="0 0 16 16" fill="currentColor">
                        <path d="M3 1.7a.7.7 0 0 1 1.06-.6l10.6 6.3a.7.7 0 0 1 0 1.2L4.06 14.9A.7.7 0 0 1 3 14.3V1.7Z" />
                      </svg>
                    </span>
                  </span>
                </div>
                <div className="p-4">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.05em] text-accent-hover">
                    {featured.toolCategory}
                  </p>
                  <p className="mt-1.5 line-clamp-2 text-[15px] font-medium leading-snug text-primary">
                    {featured.title}
                  </p>
                  <p className="mt-2 text-[12.5px] text-secondary">
                    {featured.toolName} <span className="mx-1 text-muted">·</span>{" "}
                    {formatViews(featured.views)}
                  </p>
                </div>
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* Trending */}
      <section id="trending" className="container pb-14 scroll-mt-20">
        <SectionHeader
          label="Hot this week"
          title="Trending videos"
          description="Ranked by views over the last 7 days across all tool categories."
        />
        <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
          {trending.map((v, i) => (
            <VideoCard key={v.id} video={v} rank={i + 1} index={i} />
          ))}
        </div>
      </section>

      {/* Latest + filters */}
      <section id="latest-videos" className="container scroll-mt-20">
        <SectionHeader
          label="Fresh uploads"
          title="Latest videos"
          description="New walkthroughs, sorted by publish date."
        />
        <div className="mb-8">
          <VideoFilters />
        </div>
        <div className="grid grid-cols-1 gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {latest.map((v, i) => (
            <VideoCard key={v.id} video={v} index={i} />
          ))}
        </div>

        {latest.length < videos.length && (
          <div className="mt-10 flex justify-center">
            <button className="rounded-lg border border-border px-5 py-2.5 text-[13.5px] font-medium text-secondary transition-colors hover:border-border-strong hover:text-primary">
              Load more videos
            </button>
          </div>
        )}
      </section>
    </main>
  );
}