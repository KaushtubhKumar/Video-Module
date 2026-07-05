"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  Video,
  channelHandle,
  formatDuration,
  formatPostedDate,
  formatViewsCount,
} from "@/lib/videos-data";

import { ThumbImage } from "./ThumbImage";

type SortKey = "posted" | "views" | "level";
type SortDir = "asc" | "desc";

const LEVEL_RANK: Record<Video["level"], number> = {
  Beginner: 0,
  Intermediate: 1,
  Advanced: 2,
  Expert: 3,
};

const LEVEL_COLOR: Record<Video["level"], string> = {
  Beginner: "#4cb782",
  Intermediate: "#378add",
  Advanced: "#ba7517",
  Expert: "#d4537e",
};

function SortIcon({ dir }: { dir: SortDir | null }) {
  return (
    <span className="ml-1 inline-flex flex-col leading-none align-middle">
      <svg width="8" height="6" viewBox="0 0 8 6" fill="none" className="mb-[1px]">
        <path
          d="M4 0L8 6H0L4 0Z"
          fill={dir === "asc" ? "var(--text-primary)" : "var(--text-muted)"}
        />
      </svg>
      <svg width="8" height="6" viewBox="0 0 8 6" fill="none">
        <path
          d="M4 6L0 0H8L4 6Z"
          fill={dir === "desc" ? "var(--text-primary)" : "var(--text-muted)"}
        />
      </svg>
    </span>
  );
}

function ColumnHeader({
  label,
  sortKey,
  activeKey,
  dir,
  onSort,
  align = "left",
}: {
  label: string;
  sortKey: SortKey;
  activeKey: SortKey | null;
  dir: SortDir;
  onSort: (key: SortKey) => void;
  align?: "left" | "right";
}) {
  return (
    <button
      onClick={() => onSort(sortKey)}
      className={`flex items-center gap-0.5 font-mono text-[11px] font-semibold uppercase tracking-[0.06em] text-muted transition-colors hover:text-secondary ${
        align === "right" ? "ml-auto" : ""
      }`}
    >
      {label}
      <SortIcon dir={activeKey === sortKey ? dir : null} />
    </button>
  );
}

/**
 * Dense, data-grid style listing for the video library — an alternative to the
 * card/row treatment for people who want to scan many videos at once and sort
 * by the fields that matter (recency, popularity, difficulty).
 */
export function VideoTable({ videos }: { videos: Video[] }) {
  const [sortKey, setSortKey] = useState<SortKey>("posted");
  const [sortDir, setSortDir] = useState<SortDir>("desc");

  function handleSort(key: SortKey) {
    if (key === sortKey) {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(key);
      setSortDir("desc");
    }
  }

  const sorted = useMemo(() => {
    const copy = [...videos];
    copy.sort((a, b) => {
      let diff = 0;
      if (sortKey === "posted") {
        diff = new Date(a.publishedAt).getTime() - new Date(b.publishedAt).getTime();
      } else if (sortKey === "views") {
        diff = a.views - b.views;
      } else if (sortKey === "level") {
        diff = LEVEL_RANK[a.level] - LEVEL_RANK[b.level];
      }
      return sortDir === "asc" ? diff : -diff;
    });
    return copy;
  }, [videos, sortKey, sortDir]);

  return (
    <div className="overflow-hidden rounded-card border border-border">
      {/* Header row */}
      <div className="grid grid-cols-[minmax(0,1fr)_120px_100px_120px_170px] items-center gap-4 border-b border-border bg-bg-elevated px-4 py-3 sm:px-5">
        <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.06em] text-muted">
          Name
        </span>
        <ColumnHeader label="Posted" sortKey="posted" activeKey={sortKey} dir={sortDir} onSort={handleSort} />
        <ColumnHeader label="Views" sortKey="views" activeKey={sortKey} dir={sortDir} onSort={handleSort} />
        <ColumnHeader label="Level" sortKey="level" activeKey={sortKey} dir={sortDir} onSort={handleSort} />
        <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.06em] text-muted">
          Channel
        </span>
      </div>

      {/* Rows */}
      <div className="divide-y divide-border">
        {sorted.map((v) => (
          <Link
            key={v.id}
            href={`/videos/${v.slug}`}
            className="group grid grid-cols-[minmax(0,1fr)_120px_100px_120px_170px] items-center gap-4 px-4 py-3 transition-colors hover:bg-bg-hover sm:px-5"
          >
            {/* Name: thumbnail + title */}
            <div className="flex min-w-0 items-center gap-3">
              <div className="relative aspect-video w-20 shrink-0 overflow-hidden rounded-md bg-bg-elevated sm:w-24">
                <ThumbImage
                  src={v.thumbnail}
                  alt=""
                  toolName={v.toolName}
                  accent={v.accent}
                  sizes="96px"
                />
                <span className="absolute bottom-1 right-1 rounded bg-black/70 px-1 py-0.5 font-mono text-[10px] font-medium text-white">
                  {formatDuration(v.durationSeconds)}
                </span>
              </div>
              <p className="line-clamp-2 min-w-0 text-[13.5px] font-medium leading-snug text-primary transition-colors group-hover:text-accent-hover sm:text-[14px]">
                {v.title}
              </p>
            </div>

            {/* Posted */}
            <span className="font-mono text-[12.5px] font-semibold text-primary">
              {formatPostedDate(v.publishedAt)}
            </span>

            {/* Views */}
            <span className="font-mono text-[12.5px] font-semibold text-primary">
              {formatViewsCount(v.views)}
            </span>

            {/* Level */}
            <span>
              <span
                className="inline-flex items-center rounded-full px-2.5 py-1 text-[11.5px] font-semibold"
                style={{
                  color: LEVEL_COLOR[v.level],
                  background: `${LEVEL_COLOR[v.level]}1f`,
                }}
              >
                {v.level}
              </span>
            </span>

            {/* Channel */}
            <div className="flex min-w-0 items-center gap-2">
              <div
                className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-[11px] font-semibold"
                style={{ background: `${v.accent}26`, color: v.accent }}
              >
                {v.author.avatar}
              </div>
              <div className="min-w-0 leading-tight">
                <p className="truncate text-[12.5px] font-semibold text-primary">
                  {v.author.name}
                </p>
                <p className="truncate font-mono text-[11px] text-muted">
                  {channelHandle(v.author.name)}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}