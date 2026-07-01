import Link from "next/link";
import { VideoCard } from "@/components/videos/VideoCard";
import { SectionHeader } from "@/components/videos/SectionHeader";
import { VideoFilters } from "@/components/videos/VideoFilters";
import { videos, getTrendingVideos, getLatestVideos } from "@/lib/videos-data";

export default function VideosPage() {
  const trending = getTrendingVideos(4);
  const latest = getLatestVideos(8);

  return (
    <main className="noise-bg min-h-screen pb-24">
      {/* Top nav */}
      <header className="sticky top-0 z-20 border-b border-border bg-bg/80 backdrop-blur-md">
        <div className="container flex h-14 items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="flex h-6 w-6 items-center justify-center rounded-md bg-accent text-[12px] font-bold text-white">
              A
            </span>
            <span className="text-[14px] font-semibold">AI Tools</span>
            <span className="mx-2 h-4 w-px bg-border" />
            <span className="text-[14px] font-medium text-secondary">Videos</span>
          </div>
          <nav className="hidden items-center gap-6 text-[13.5px] text-secondary sm:flex">
            <Link href="#" className="hover:text-primary">Browse tools</Link>
            <Link href="#" className="text-primary">Videos</Link>
            <Link href="#" className="hover:text-primary">Collections</Link>
            <Link href="#" className="hover:text-primary">Submit a tool</Link>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className="container pt-14 pb-10">
        <p className="mb-3 text-[12px] font-semibold uppercase tracking-[0.08em] text-accent-hover">
          Module 09 · Videos
        </p>
        <h1 className="max-w-xl text-[34px] font-semibold leading-[1.15] tracking-tight text-primary sm:text-[42px]">
          See the tool work before you install it
        </h1>
        <p className="mt-3 max-w-lg text-[15px] leading-relaxed text-secondary">
          Every listing is backed by a real walkthrough — no marketing screenshots, no
          guesswork. Watch it, then decide.
        </p>
      </section>

      {/* Trending */}
      <section className="container pb-14">
        <SectionHeader
          label="Hot this week"
          title="Trending videos"
          description="Ranked by views over the last 7 days across all tool categories."
        />
        <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-2 lg:grid-cols-4">
          {trending.map((v, i) => (
            <VideoCard key={v.id} video={v} rank={i + 1} />
          ))}
        </div>
      </section>

      {/* Latest + filters */}
      <section className="container">
        <SectionHeader
          label="Fresh uploads"
          title="Latest videos"
          description="New walkthroughs, sorted by publish date."
        />
        <div className="mb-8">
          <VideoFilters />
        </div>
        <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
          {latest.map((v) => (
            <VideoCard key={v.id} video={v} />
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
