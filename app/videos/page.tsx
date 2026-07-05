import Link from "next/link";
import { VideosExplorer } from "@/components/videos/VideosExplorer";
import { videos } from "@/lib/videos-data";

export default function VideosPage() {
  const totalVideos = videos.length;
  const channelCount = new Set(videos.map((v) => v.author.name)).size;
  const totalViews = videos.reduce((sum, v) => sum + v.views, 0);

  return (
    <main className="noise-bg min-h-screen pb-24">
      {/* Top nav — terminal header bar */}
      <header className="sticky top-0 z-20 border-b border-border bg-bg/90 backdrop-blur-md">
        <div className="container flex h-[60px] items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/" className="flex items-center gap-2.5">
              <span
                className="flex h-8 w-8 items-center justify-center rounded-sm bg-accent font-mono text-[13px] font-bold text-white"
                style={{ boxShadow: "0 0 0 1px rgba(255,255,255,0.08)" }}
              >
                A
              </span>
              <span className="font-mono text-[15px] font-semibold uppercase tracking-[0.02em] text-primary">
                AI Tools
              </span>
            </Link>
            <span className="h-5 w-px bg-border" />
            <span className="font-mono text-[13px] font-medium uppercase tracking-[0.04em] text-secondary">
              Videos
            </span>
          </div>

          <nav className="hidden items-center gap-0.5 sm:flex">
            {[
              { label: "Browse tools", active: false },
              { label: "Videos", active: true },
              { label: "Collections", active: false },
              { label: "Submit a tool", active: false },
            ].map((item) => (
              <Link
                key={item.label}
                href="#"
                className={`rounded-sm px-3.5 py-2 font-mono text-[12.5px] font-medium uppercase tracking-[0.03em] transition-colors ${
                  item.active
                    ? "bg-bg-hover text-primary"
                    : "text-secondary hover:bg-bg-hover/60 hover:text-primary"
                }`}
              >
                {item.active ? `[ ${item.label} ]` : item.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <button
              aria-label="Search"
              className="flex h-9 w-9 items-center justify-center rounded-sm border border-border text-secondary transition-colors hover:border-border-strong hover:text-primary"
            >
              <svg width="15" height="15" viewBox="0 0 16 16" fill="none">
                <circle cx="7" cy="7" r="5.25" stroke="currentColor" strokeWidth="1.4" />
                <path d="M11 11l3.5 3.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
              </svg>
            </button>
            <button className="hidden items-center gap-1.5 rounded-sm bg-accent px-4 py-2 font-mono text-[12px] font-semibold uppercase tracking-[0.03em] text-white transition-colors hover:bg-accent-hover sm:flex">
              Submit a tool
            </button>
          </div>
        </div>
      </header>

      {/* Breadcrumb */}
      <div className="container flex items-center gap-2 pt-6 text-[13px] text-secondary">
        <Link href="/" className="transition-colors hover:text-primary">
          Home
        </Link>
        <span className="text-muted">›</span>
        <span className="font-medium text-primary">
          Videos <span className="ml-1 font-mono text-muted">{totalVideos.toLocaleString()}</span>
        </span>
      </div>

      {/* Title + stat readout */}
      <section className="container pb-8 pt-6">
        <div className="flex items-center gap-3">
          <span className="flex h-9 w-9 items-center justify-center rounded-sm bg-accent-soft text-accent-hover">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <rect x="1" y="3" width="10.5" height="10" rx="1.5" stroke="currentColor" strokeWidth="1.3" />
              <path d="M11.5 6.5l3.5-2v7l-3.5-2z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" />
            </svg>
          </span>
          <h1 className="text-[28px] font-bold tracking-[-0.01em] text-primary">Videos</h1>
        </div>

        <div className="mt-4 flex flex-wrap gap-x-7 gap-y-2 border-t border-border pt-4">
          {[
            { label: "Videos", value: totalVideos.toLocaleString() },
            { label: "Channels", value: channelCount.toLocaleString() },
            { label: "Views", value: totalViews.toLocaleString() },
          ].map((s) => (
            <p key={s.label} className="text-[13.5px] text-secondary">
              {s.label} <span className="font-mono font-semibold text-primary">{s.value}</span>
            </p>
          ))}
        </div>
      </section>

      {/* Filter toolbar + full listing */}
      <section className="container">
        <VideosExplorer videos={videos} />
      </section>
    </main>
  );
}