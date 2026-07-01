"use client";

import { useState } from "react";

const categories = [
  "All",
  "Developer Tools",
  "Video Generation",
  "Image Generation",
  "Audio",
  "Productivity",
  "Research",
];

export function VideoFilters({
  onChange,
}: {
  onChange?: (state: { category: string; query: string }) => void;
}) {
  const [active, setActive] = useState("All");
  const [query, setQuery] = useState("");

  function update(next: { category?: string; query?: string }) {
    const category = next.category ?? active;
    const q = next.query ?? query;
    if (next.category) setActive(next.category);
    if (next.query !== undefined) setQuery(next.query);
    onChange?.({ category, query: q });
  }

  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex gap-2 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none]">
        {categories.map((c) => (
          <button
            key={c}
            onClick={() => update({ category: c })}
            className={`shrink-0 rounded-full border px-3.5 py-1.5 text-[13px] font-medium transition-colors ${
              active === c
                ? "border-accent bg-accent-soft text-accent-hover"
                : "border-border text-secondary hover:border-border-strong hover:text-primary"
            }`}
          >
            {c}
          </button>
        ))}
      </div>
      <div className="relative w-full sm:w-64">
        <svg
          className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted"
          width="15"
          height="15"
          viewBox="0 0 16 16"
          fill="none"
        >
          <circle cx="7" cy="7" r="5.25" stroke="currentColor" strokeWidth="1.4" />
          <path d="M11 11l3.5 3.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
        </svg>
        <input
          value={query}
          onChange={(e) => update({ query: e.target.value })}
          placeholder="Search videos or tools"
          className="w-full rounded-lg border border-border bg-bg-elevated py-2 pl-9 pr-3 text-[13.5px] text-primary placeholder:text-muted outline-none transition-colors focus:border-border-strong"
        />
      </div>
    </div>
  );
}
