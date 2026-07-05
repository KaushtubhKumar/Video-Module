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

type SortKey = "posted" | "views" | "duration";
type SortDir = "asc" | "desc";

const LEVELS: Video["level"][] = ["Beginner", "Intermediate", "Advanced", "Expert"];

const LEVEL_COLOR: Record<Video["level"], string> = {
  Beginner: "#4cb782",
  Intermediate: "#378add",
  Advanced: "#ba7517",
  Expert: "#d4537e",
};

function SortIcon({ dir }: { dir: SortDir | null }) {
  return (
    <span className="ml-1 inline-flex flex-col leading-none">
      <svg width="8" height="6" viewBox="0 0 8 6" fill="none" className="mb-[1px]">
        <path d="M4 0L8 6H0L4 0Z" fill={dir === "asc" ? "var(--text-primary)" : "var(--text-muted)"} />
      </svg>
      <svg width="8" height="6" viewBox="0 0 8 6" fill="none">
        <path d="M4 6L0 0H8L4 6Z" fill={dir === "desc" ? "var(--text-primary)" : "var(--text-muted)"} />
      </svg>
    </span>
  );
}

function SortableHeader({
  label,
  sortKey,
  activeKey,
  dir,
  onSort,
}: {
  label: string;
  sortKey: SortKey;
  activeKey: SortKey | null;
  dir: SortDir;
  onSort: (key: SortKey) => void;
}) {
  return (
    <button
      onClick={() => onSort(sortKey)}
      className="flex items-center font-mono text-[11px] font-semibold uppercase tracking-[0.06em] text-muted transition-colors hover:text-secondary"
    >
      {label}
      <SortIcon dir={activeKey === sortKey ? dir : null} />
    </button>
  );
}

/** Small dropdown with a checkbox list — used for the Level and Channel facets. */
function FilterDropdown({
  label,
  options,
  selected,
  onToggle,
  onClear,
}: {
  label: string;
  options: { value: string; count: number; color?: string }[];
  selected: Set<string>;
  onToggle: (value: string) => void;
  onClear: () => void;
}) {
  const [open, setOpen] = useState(false);
  const activeCount = selected.size;

  return (
    <div className="relative">
      <button
        onClick={() => setOpen((o) => !o)}
        className={`flex items-center gap-1.5 rounded-sm border px-3 py-2 text-[12.5px] font-medium transition-colors ${
          activeCount > 0
            ? "border-accent/50 bg-accent-soft text-accent-hover"
            : "border-border text-secondary hover:border-border-strong hover:text-primary"
        }`}
      >
        {label}
        {activeCount > 0 && (
          <span className="rounded-full bg-accent px-1.5 py-0.5 text-[10.5px] font-semibold text-white">
            {activeCount}
          </span>
        )}
        <svg width="10" height="6" viewBox="0 0 10 6" fill="none" className={`transition-transform ${open ? "rotate-180" : ""}`}>
          <path d="M1 1l4 4 4-4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
        </svg>
      </button>

      {open && (
        <>
          <div className="fixed inset-0 z-30" onClick={() => setOpen(false)} />
          <div className="absolute left-0 top-full z-40 mt-1.5 max-h-72 w-64 overflow-y-auto rounded-md border border-border bg-surface p-1.5 shadow-2xl">
            {options.map((opt) => (
              <label
                key={opt.value}
                className="flex cursor-pointer items-center gap-2.5 rounded-sm px-2.5 py-2 text-[13px] text-secondary transition-colors hover:bg-bg-hover hover:text-primary"
              >
                <input
                  type="checkbox"
                  checked={selected.has(opt.value)}
                  onChange={() => onToggle(opt.value)}
                  className="h-3.5 w-3.5 shrink-0 accent-accent"
                />
                {opt.color && (
                  <span className="h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: opt.color }} />
                )}
                <span className="min-w-0 flex-1 truncate">{opt.value}</span>
                <span className="shrink-0 font-mono text-[11px] text-muted">{opt.count}</span>
              </label>
            ))}
            {activeCount > 0 && (
              <button
                onClick={() => {
                  onClear();
                  setOpen(false);
                }}
                className="mt-1 w-full rounded-sm px-2.5 py-1.5 text-left text-[12px] font-medium text-muted transition-colors hover:bg-bg-hover hover:text-primary"
              >
                Clear
              </button>
            )}
          </div>
        </>
      )}
    </div>
  );
}

export function VideosExplorer({ videos }: { videos: Video[] }) {
  const [query, setQuery] = useState("");
  const [levelFilter, setLevelFilter] = useState<Set<string>>(new Set());
  const [channelFilter, setChannelFilter] = useState<Set<string>>(new Set());
  const [sortKey, setSortKey] = useState<SortKey>("posted");
  const [sortDir, setSortDir] = useState<SortDir>("desc");

  const channelOptions = useMemo(() => {
    const map = new Map<string, number>();
    for (const v of videos) map.set(v.author.name, (map.get(v.author.name) ?? 0) + 1);
    return Array.from(map.entries())
      .map(([value, count]) => ({ value, count }))
      .sort((a, b) => a.value.localeCompare(b.value));
  }, [videos]);

  const levelOptions = useMemo(
    () =>
      LEVELS.map((lvl) => ({
        value: lvl,
        count: videos.filter((v) => v.level === lvl).length,
        color: LEVEL_COLOR[lvl],
      })),
    [videos]
  );

  function toggleSet(setter: typeof setLevelFilter, value: string) {
    setter((prev) => {
      const next = new Set(prev);
      next.has(value) ? next.delete(value) : next.add(value);
      return next;
    });
  }

  function handleSort(key: SortKey) {
    if (key === sortKey) setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    else {
      setSortKey(key);
      setSortDir("desc");
    }
  }

  const filtered = useMemo(() => {
    let list = videos;
    if (query.trim()) {
      const q = query.trim().toLowerCase();
      list = list.filter(
        (v) => v.title.toLowerCase().includes(q) || v.toolName.toLowerCase().includes(q)
      );
    }
    if (levelFilter.size > 0) list = list.filter((v) => levelFilter.has(v.level));
    if (channelFilter.size > 0) list = list.filter((v) => channelFilter.has(v.author.name));

    const sorted = [...list].sort((a, b) => {
      let diff = 0;
      if (sortKey === "posted") diff = new Date(a.publishedAt).getTime() - new Date(b.publishedAt).getTime();
      else if (sortKey === "views") diff = a.views - b.views;
      else diff = a.durationSeconds - b.durationSeconds;
      return sortDir === "asc" ? diff : -diff;
    });
    return sorted;
  }, [videos, query, levelFilter, channelFilter, sortKey, sortDir]);

  return (
    <div>
      {/* Filter toolbar */}
      <div className="mb-6 flex flex-wrap items-center gap-2.5">
        <div className="relative">
          <svg
            className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted"
            width="14"
            height="14"
            viewBox="0 0 16 16"
            fill="none"
          >
            <circle cx="7" cy="7" r="5.25" stroke="currentColor" strokeWidth="1.4" />
            <path d="M11 11l3.5 3.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
          </svg>
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Name"
            className="w-48 rounded-sm border border-border bg-bg-elevated py-2 pl-8 pr-3 text-[13px] text-primary placeholder:text-muted outline-none transition-colors focus:border-border-strong sm:w-56"
          />
        </div>

        <div className="rounded-sm border border-border px-3 py-2">
          <SortableHeader label="Posted" sortKey="posted" activeKey={sortKey} dir={sortDir} onSort={handleSort} />
        </div>
        <div className="rounded-sm border border-border px-3 py-2">
          <SortableHeader label="Views" sortKey="views" activeKey={sortKey} dir={sortDir} onSort={handleSort} />
        </div>
        <div className="rounded-sm border border-border px-3 py-2">
          <SortableHeader label="Duration" sortKey="duration" activeKey={sortKey} dir={sortDir} onSort={handleSort} />
        </div>

        <FilterDropdown
          label="Level"
          options={levelOptions}
          selected={levelFilter}
          onToggle={(v) => toggleSet(setLevelFilter, v)}
          onClear={() => setLevelFilter(new Set())}
        />
        <FilterDropdown
          label="Channel"
          options={channelOptions}
          selected={channelFilter}
          onToggle={(v) => toggleSet(setChannelFilter, v)}
          onClear={() => setChannelFilter(new Set())}
        />

        {(query || levelFilter.size > 0 || channelFilter.size > 0) && (
          <button
            onClick={() => {
              setQuery("");
              setLevelFilter(new Set());
              setChannelFilter(new Set());
            }}
            className="text-[12.5px] font-medium text-muted transition-colors hover:text-primary"
          >
            Reset filters
          </button>
        )}

        <span className="ml-auto font-mono text-[12px] text-muted">
          {filtered.length.toLocaleString()} video{filtered.length === 1 ? "" : "s"}
        </span>
      </div>

      {/* Listing */}
      {filtered.length === 0 ? (
        <div className="rounded-card border border-border py-16 text-center text-[13.5px] text-secondary">
          No videos found.
        </div>
      ) : (
        <div className="overflow-hidden rounded-card border border-border">
          <div className="hidden grid-cols-[minmax(0,1fr)_110px_90px_110px_190px_80px] items-center gap-4 border-b border-border bg-bg-elevated px-4 py-3 sm:grid sm:px-5">
            <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.06em] text-muted">Name</span>
            <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.06em] text-muted">Posted</span>
            <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.06em] text-muted">Views</span>
            <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.06em] text-muted">Level</span>
            <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.06em] text-muted">Channel</span>
            <span className="text-right font-mono text-[11px] font-semibold uppercase tracking-[0.06em] text-muted">
              Duration
            </span>
          </div>

          <div className="divide-y divide-border">
            {filtered.map((v) => (
              <Link
                key={v.id}
                href={`/videos/${v.slug}`}
                className="group grid grid-cols-[minmax(0,1fr)] gap-3 px-4 py-3 transition-colors hover:bg-bg-hover sm:grid-cols-[minmax(0,1fr)_110px_90px_110px_190px_80px] sm:items-center sm:gap-4 sm:px-5"
              >
                <div className="flex min-w-0 items-center gap-3">
                  <div className="relative aspect-video w-24 shrink-0 overflow-hidden rounded-md bg-bg-elevated sm:w-28">
                    <ThumbImage src={v.thumbnail} alt="" toolName={v.toolName} accent={v.accent} sizes="112px" />
                  </div>
                  <p className="line-clamp-2 min-w-0 text-[13.5px] font-medium leading-snug text-primary transition-colors group-hover:text-accent-hover sm:text-[14px]">
                    {v.title}
                  </p>
                </div>

                <span className="font-mono text-[12.5px] font-semibold text-primary">
                  {formatPostedDate(v.publishedAt)}
                </span>
                <span className="font-mono text-[12.5px] font-semibold text-primary">
                  {formatViewsCount(v.views)}
                </span>
                <span>
                  <span
                    className="inline-flex items-center rounded-full px-2.5 py-1 text-[11.5px] font-semibold"
                    style={{ color: LEVEL_COLOR[v.level], background: `${LEVEL_COLOR[v.level]}1f` }}
                  >
                    {v.level}
                  </span>
                </span>
                <div className="flex min-w-0 items-center gap-2">
                  <div
                    className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-[11px] font-semibold"
                    style={{ background: `${v.accent}26`, color: v.accent }}
                  >
                    {v.author.avatar}
                  </div>
                  <div className="min-w-0 leading-tight">
                    <p className="truncate text-[12.5px] font-semibold text-primary">{v.author.name}</p>
                    <p className="truncate font-mono text-[11px] text-muted">{channelHandle(v.author.name)}</p>
                  </div>
                </div>
                <span className="font-mono text-[12.5px] font-semibold text-secondary sm:text-right">
                  {formatDuration(v.durationSeconds)}
                </span>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}