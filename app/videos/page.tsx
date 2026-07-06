import Link from "next/link";
import { VideosExplorer } from "@/components/videos/VideosExplorer";
import { ThumbImage } from "@/components/videos/ThumbImage";
import {
  videos,
  formatDuration,
  formatViews,
  formatRelativeDate,
  channelHandle,
} from "@/lib/videos-data";

const NAV_ITEMS = [
  { label: "Browse tools", href: "#", active: false },
  { label: "Videos", href: "#", active: true },
  { label: "Collections", href: "#", active: false },
  { label: "Submit a tool", href: "#", active: false },
];

export default function VideosPage() {
  const totalVideos = videos.length;
  const channelCount = new Set(videos.map((v) => v.author.name)).size;
  const totalViews = videos.reduce((sum, v) => sum + v.views, 0);

  const featured = [...videos].sort((a, b) => b.views - a.views)[0];

  return (
    <main className="relative min-h-screen overflow-hidden pb-24">
      <div className="video-mesh-bg" />

      {/* Top nav */}
      <header className="glass-panel sticky top-0 z-20 border-b border-border">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-3.5">
            <Link href="/" className="group flex items-center gap-2.5">
              <span className="relative flex h-8 w-8 items-center justify-center rounded-[7px] bg-gradient-to-br from-accent to-[#8a5fd6] font-mono text-[13px] font-bold text-white shadow-[0_0_0_1px_rgba(255,255,255,0.1),0_4px_14px_-2px_rgba(94,106,210,0.55)] transition-transform duration-200 group-hover:scale-105">
                A
              </span>
              <span className="font-mono text-[14.5px] font-semibold uppercase tracking-[0.03em] text-primary">
                AI Tools
              </span>
            </Link>
            <span className="h-4 w-px bg-border" />
            <span className="font-mono text-[12px] font-medium uppercase tracking-[0.06em] text-muted">
              Videos
            </span>
          </div>

          <nav className="hidden items-center gap-1 rounded-full border border-border bg-bg-elevated/60 p-1 sm:flex">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className={`relative rounded-full px-4 py-1.5 font-mono text-[12px] font-medium uppercase tracking-[0.03em] transition-colors duration-200 ${
                  item.active
                    ? "bg-accent text-white shadow-[0_2px_10px_-2px_rgba(94,106,210,0.7)]"
                    : "text-secondary hover:text-primary"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2.5">
            <button
              aria-label="Search"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-border text-secondary transition-colors hover:border-border-strong hover:text-primary"
            >
              <svg width="15" height="15" viewBox="0 0 16 16" fill="none">
                <circle cx="7" cy="7" r="5.25" stroke="currentColor" strokeWidth="1.4" />
                <path d="M11 11l3.5 3.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
              </svg>
            </button>
            <button className="hidden items-center gap-1.5 rounded-full bg-accent px-4 py-2 font-mono text-[12px] font-semibold uppercase tracking-[0.03em] text-white shadow-[0_2px_14px_-4px_rgba(94,106,210,0.8)] transition-colors hover:bg-accent-hover sm:flex">
              Submit a tool
            </button>
          </div>
        </div>
      </header>

      {/* Breadcrumb */}
      <div className="container relative z-10 flex items-center gap-2 pt-8 text-[13.5px] text-secondary">
        <Link href="/" className="transition-colors hover:text-primary">
          Home
        </Link>
        <span className="text-muted">›</span>
        <span className="font-medium text-primary">Videos</span>
        <span className="rounded-full border border-border px-1.5 py-0.5 font-mono text-[11px] text-muted">
          {totalVideos.toLocaleString()}
        </span>
      </div>

      {/* Hero: copy + stats on the left, a featured video showcase on the right */}
      <section className="container relative z-10 pb-12 pt-8">
        <div className="grid-overlay absolute inset-x-0 -top-4 h-52" />

        <div className="relative grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
          {/* Left: title, copy, stats */}
          <div>
            <span className="mb-5 inline-flex items-center gap-1.5 rounded-full border border-accent/30 bg-accent-soft px-3 py-1 font-mono text-[11px] font-semibold uppercase tracking-[0.08em] text-accent-hover">
              <span className="h-1.5 w-1.5 rounded-full bg-accent" />
              Video library
            </span>

            <h1 className="text-gradient text-[44px] font-bold leading-[1.05] tracking-[-0.02em] sm:text-[56px]">
              Watch the tools
              <br />
              before you install them.
            </h1>

            <p className="mt-5 max-w-md text-[16px] leading-relaxed text-secondary">
              Real walkthroughs of the AI tools people actually ship with — sorted, filterable, no
              fluff, no sponsored takes.
            </p>

            <div className="mt-8 grid grid-cols-3 gap-3">
              {[
                {
                  label: "Videos",
                  value: totalVideos.toLocaleString(),
                  icon: (
                    <path d="M1 3.5h10.5v9H1v-9Zm10.5 2.5 3.5-2v7l-3.5-2" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" />
                  ),
                },
                {
                  label: "Channels",
                  value: channelCount.toLocaleString(),
                  icon: <circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="1.2" />,
                },
                {
                  label: "Views",
                  value: totalViews.toLocaleString(),
                  icon: (
                    <path
                      d="M1 8s2.6-4.5 7-4.5S15 8 15 8s-2.6 4.5-7 4.5S1 8 1 8Z"
                      stroke="currentColor"
                      strokeWidth="1.2"
                      strokeLinejoin="round"
                    />
                  ),
                },
              ].map((s, i) => (
                <div
                  key={s.label}
                  className="glass-panel animate-countUp flex flex-col gap-2.5 rounded-xl px-4 py-3.5"
                  style={{ animationDelay: `${i * 80}ms` }}
                >
                  <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-accent-soft text-accent-hover">
                    <svg width="13" height="13" viewBox="0 0 16 16" fill="none">
                      {s.icon}
                    </svg>
                  </span>
                  <div className="leading-tight">
                    <p className="font-mono text-[10px] uppercase tracking-[0.07em] text-muted">{s.label}</p>
                    <p className="mt-1 font-mono text-[19px] font-semibold text-primary">{s.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: featured video showcase — fills the space with real content, not empty air */}
          <Link
            href={`/videos/${featured.slug}`}
            className="glow-border group relative block overflow-hidden rounded-2xl border border-border bg-bg-elevated"
            style={{ ["--tool-accent" as string]: featured.accent }}
          >
            <span className="absolute left-4 top-4 z-10 inline-flex items-center gap-1.5 rounded-full bg-black/60 px-2.5 py-1 font-mono text-[10.5px] font-semibold uppercase tracking-[0.05em] text-white backdrop-blur-sm">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#4cb782]" />
              Most watched
            </span>
            <div className="relative aspect-video w-full overflow-hidden">
              <ThumbImage
                src={featured.thumbnail}
                alt=""
                toolName={featured.toolName}
                accent={featured.accent}
                sizes="(max-width: 1024px) 100vw, 480px"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-transparent" />
              <span className="absolute bottom-3 right-3 rounded bg-black/70 px-1.5 py-0.5 font-mono text-[11px] font-medium text-white">
                {formatDuration(featured.durationSeconds)}
              </span>
              <span className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                <span className="flex h-14 w-14 items-center justify-center rounded-full bg-white/95 text-bg shadow-lg">
                  <svg width="18" height="18" viewBox="0 0 16 16" fill="currentColor">
                    <path d="M3 1.7a.7.7 0 0 1 1.06-.6l10.6 6.3a.7.7 0 0 1 0 1.2L4.06 14.9A.7.7 0 0 1 3 14.3V1.7Z" />
                  </svg>
                </span>
              </span>
            </div>
            <div className="p-5">
              <div className="flex items-center gap-2 font-mono text-[11px] font-semibold uppercase tracking-[0.05em]" style={{ color: featured.accent }}>
                {featured.toolCategory}
              </div>
              <p className="mt-2 line-clamp-2 text-[16.5px] font-semibold leading-snug text-primary transition-colors group-hover:text-accent-hover">
                {featured.title}
              </p>
              <div className="mt-4 flex items-center justify-between border-t border-border pt-3.5">
                <div className="flex min-w-0 items-center gap-2">
                  <div
                    className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-[11px] font-semibold"
                    style={{ background: `${featured.accent}26`, color: featured.accent }}
                  >
                    {featured.author.avatar}
                  </div>
                  <div className="min-w-0 leading-tight">
                    <p className="truncate text-[12.5px] font-semibold text-primary">{featured.author.name}</p>
                    <p className="truncate font-mono text-[10.5px] text-muted">{channelHandle(featured.author.name)}</p>
                  </div>
                </div>
                <span className="shrink-0 font-mono text-[12px] text-muted">
                  {formatViews(featured.views)} · {formatRelativeDate(featured.publishedAt)}
                </span>
              </div>
            </div>
          </Link>
        </div>
      </section>

      {/* Filter toolbar + full listing */}
      <section className="container relative z-10">
        <VideosExplorer videos={videos} />
      </section>
    </main>
  );
}