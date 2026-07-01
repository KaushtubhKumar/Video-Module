import Link from "next/link";
import Image from "next/image";
import { Video, formatDuration, formatViews, formatRelativeDate } from "@/lib/videos-data";

export function VideoCard({
  video,
  variant = "grid",
  rank,
}: {
  video: Video;
  variant?: "grid" | "rail" | "row";
  rank?: number;
}) {
  if (variant === "row") {
    return (
      <Link
        href={`/videos/${video.slug}`}
        className="group flex items-center gap-4 rounded-lg border border-transparent p-3 -mx-3 transition-colors hover:border-border hover:bg-bg-hover"
      >
        <div className="relative w-40 shrink-0 overflow-hidden rounded-lg aspect-video bg-bg-elevated">
          <Image
            src={video.thumbnail}
            alt=""
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-[1.04]"
            sizes="160px"
          />
          <span className="absolute bottom-1.5 right-1.5 rounded bg-black/70 px-1.5 py-0.5 text-[11px] font-medium text-white font-mono">
            {formatDuration(video.durationSeconds)}
          </span>
        </div>
        <div className="min-w-0">
          <p className="truncate text-[14px] font-medium text-primary group-hover:text-accent-hover">
            {video.title}
          </p>
          <p className="mt-1 text-[12.5px] text-secondary">
            {video.toolName} · {formatViews(video.views)}
          </p>
        </div>
      </Link>
    );
  }

  return (
    <Link
      href={`/videos/${video.slug}`}
      className={`group relative block ${variant === "rail" ? "w-[280px] shrink-0" : ""}`}
    >
      <div className="relative overflow-hidden rounded-card border border-border bg-bg-elevated aspect-video">
        <Image
          src={video.thumbnail}
          alt=""
          fill
          className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.05]"
          sizes="(max-width: 768px) 100vw, 360px"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0 opacity-0 transition-opacity group-hover:opacity-100" />
        <span className="absolute bottom-2 right-2 rounded bg-black/70 px-1.5 py-0.5 text-[11px] font-medium text-white font-mono">
          {formatDuration(video.durationSeconds)}
        </span>
        {typeof rank === "number" && (
          <span className="absolute left-2 top-2 flex h-7 w-7 items-center justify-center rounded-full bg-black/70 text-[13px] font-semibold text-white backdrop-blur-sm">
            {rank}
          </span>
        )}
        <span className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-0 transition-opacity group-hover:opacity-100">
          <span className="flex h-11 w-11 items-center justify-center rounded-full bg-white/90 text-bg shadow-lg">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
              <path d="M3 1.7a.7.7 0 0 1 1.06-.6l10.6 6.3a.7.7 0 0 1 0 1.2L4.06 14.9A.7.7 0 0 1 3 14.3V1.7Z" />
            </svg>
          </span>
        </span>
      </div>
      <div className="mt-3 flex gap-3">
        <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-accent-soft text-[11px] font-semibold text-accent-hover">
          {video.author.avatar}
        </div>
        <div className="min-w-0">
          <p className="line-clamp-2 text-[14.5px] font-medium leading-snug text-primary group-hover:text-accent-hover">
            {video.title}
          </p>
          <p className="mt-1.5 text-[12.5px] text-secondary">
            {video.toolName} <span className="mx-1 text-muted">·</span> {formatViews(video.views)}
            <span className="mx-1 text-muted">·</span> {formatRelativeDate(video.publishedAt)}
          </p>
        </div>
      </div>
    </Link>
  );
}
