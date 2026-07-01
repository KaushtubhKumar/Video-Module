"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { Video, formatDuration, formatViews, formatRelativeDate } from "@/lib/videos-data";
import { ThumbImage } from "./ThumbImage";

const HOVER_DELAY = 280; // ms — long enough to skip accidental mouse-passes, short enough to feel responsive

export function VideoCard({
  video,
  variant = "grid",
  rank,
  index = 0,
}: {
  video: Video;
  variant?: "grid" | "rail" | "row";
  rank?: number;
  index?: number;
}) {
  const [previewOpen, setPreviewOpen] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  function open() {
    timer.current = setTimeout(() => setPreviewOpen(true), HOVER_DELAY);
  }
  function close() {
    if (timer.current) clearTimeout(timer.current);
    setPreviewOpen(false);
  }

  if (variant === "row") {
    return (
      <Link
        href={`/videos/${video.slug}`}
        className="group flex items-center gap-4 rounded-lg border border-transparent p-3 -mx-3 transition-colors duration-200 hover:border-border hover:bg-bg-hover"
      >
        <div className="relative w-40 shrink-0 overflow-hidden rounded-lg aspect-video bg-bg-elevated">
          <ThumbImage
            src={video.thumbnail}
            alt=""
            toolName={video.toolName}
            accent={video.accent}
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
    <div
      className={`relative animate-fadeUp ${variant === "rail" ? "w-[280px] shrink-0" : ""}`}
      style={{ animationDelay: `${Math.min(index, 8) * 60}ms` }}
      onMouseEnter={open}
      onMouseLeave={close}
    >
      <Link href={`/videos/${video.slug}`} className="group relative block">
        <div className="relative overflow-hidden rounded-card border border-border bg-bg-elevated aspect-video">
          <ThumbImage
            src={video.thumbnail}
            alt=""
            toolName={video.toolName}
            accent={video.accent}
            sizes="(max-width: 768px) 100vw, 360px"
            priority={index < 4}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/0 to-black/0 opacity-0 transition-opacity duration-200 group-hover:opacity-100" />
          <span className="absolute bottom-2 right-2 z-10 rounded bg-black/70 px-1.5 py-0.5 text-[11px] font-medium text-white font-mono">
            {formatDuration(video.durationSeconds)}
          </span>
          {typeof rank === "number" && (
            <span className="absolute left-2 top-2 z-10 flex h-7 w-7 items-center justify-center rounded-full bg-black/70 text-[13px] font-semibold text-white backdrop-blur-sm">
              {rank}
            </span>
          )}
          <span className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-200 group-hover:opacity-100">
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

      {/* Hover preview: floats above the card, doesn't shift layout of neighbors */}
      {previewOpen && variant === "grid" && (
        <div
          className="absolute left-0 top-0 z-30 w-full animate-popIn origin-top rounded-card border border-border-strong bg-surface shadow-2xl"
          style={{ boxShadow: "0 24px 48px -12px rgba(0,0,0,0.55)" }}
        >
          <Link href={`/videos/${video.slug}`} className="block">
            <div className="relative overflow-hidden rounded-t-card aspect-video">
              <ThumbImage
                src={video.thumbnail}
                alt=""
                toolName={video.toolName}
                accent={video.accent}
                sizes="360px"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-white/95 text-bg shadow-lg">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                    <path d="M3 1.7a.7.7 0 0 1 1.06-.6l10.6 6.3a.7.7 0 0 1 0 1.2L4.06 14.9A.7.7 0 0 1 3 14.3V1.7Z" />
                  </svg>
                </span>
              </div>
              <span className="absolute bottom-2 right-2 rounded bg-black/70 px-1.5 py-0.5 text-[11px] font-medium text-white font-mono">
                {formatDuration(video.durationSeconds)}
              </span>
            </div>
          </Link>
          <div className="p-4">
            <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.05em] text-accent-hover">
              {video.toolCategory}
            </div>
            <Link href={`/videos/${video.slug}`}>
              <p className="mt-1.5 line-clamp-2 text-[14px] font-medium leading-snug text-primary hover:text-accent-hover">
                {video.title}
              </p>
            </Link>
            <p className="mt-2 line-clamp-2 text-[12.5px] leading-relaxed text-secondary">
              {video.description}
            </p>
            <div className="mt-3 flex flex-wrap gap-1.5">
              {video.tags.slice(0, 3).map((t) => (
                <span
                  key={t}
                  className="rounded-full border border-border px-2 py-0.5 text-[11px] text-secondary"
                >
                  #{t}
                </span>
              ))}
            </div>
            <div className="mt-3 flex items-center justify-between border-t border-border pt-3">
              <span className="text-[12px] text-muted">
                {formatViews(video.views)} · {formatRelativeDate(video.publishedAt)}
              </span>
              <Link
                href={`/videos/${video.slug}`}
                className="rounded-md bg-accent px-2.5 py-1 text-[12px] font-medium text-white transition-colors hover:bg-accent-hover"
              >
                Watch
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}