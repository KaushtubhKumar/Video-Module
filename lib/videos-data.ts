export type Video = {
  id: string;
  slug: string;
  title: string;
  description: string;
  toolName: string;
  toolCategory: string;
  youtubeId: string;
  thumbnail: string;
  durationSeconds: number;
  views: number;
  likes: number;
  publishedAt: string; // ISO date
  author: { name: string; avatar: string };
  tags: string[];
  /** Deterministic fallback gradient shown if the thumbnail URL ever fails to load. */
  accent: string;
  /** Skill level required to get value out of the video — drives the table's Level column/filter. */
  level: "Beginner" | "Intermediate" | "Advanced" | "Expert";
};

/** 8x8 solid-gray base64 placeholder — swapped for the real image once it loads. */
export const BLUR_DATA_URL =
  "data:image/svg+xml;base64," +
  Buffer.from(
    '<svg xmlns="http://www.w3.org/2000/svg" width="8" height="8"><rect width="8" height="8" fill="#151619"/></svg>'
  ).toString("base64");

export const videos: Video[] = [
  {
    id: "1",
    slug: "cursor-ai-pair-programmer-walkthrough",
    title: "Cursor: the AI pair programmer that actually ships code",
    description:
      "A full walkthrough of Cursor's composer mode, multi-file edits, and how it handles a real refactor across a mid-size codebase. We compare it against vanilla VS Code + Copilot to see where the workflow actually saves time.",
    toolName: "Cursor",
    toolCategory: "Developer Tools",
    youtubeId: "dQw4w9WgXcQ",
    thumbnail: "https://picsum.photos/seed/cursor-ai-pair-programmer-walkthrough/800/450",
    durationSeconds: 742,
    views: 284000,
    likes: 12400,
    publishedAt: "2026-06-24",
    author: { name: "Priya Nair", avatar: "PN" },
    tags: ["coding", "productivity", "IDE"],
    accent: "#5e6ad2",
    level: "Intermediate",
  },
  {
    id: "2",
    slug: "runway-gen4-cinematic-shots",
    title: "Runway Gen-4 is scary good at cinematic camera moves",
    description:
      "We push Runway's Gen-4 model with fifteen prompts to test dolly, crane and handheld motion. Includes a breakdown of prompt structure that consistently gets stable, film-grade results.",
    toolName: "Runway",
    toolCategory: "Video Generation",
    youtubeId: "jNQXAC9IVRw",
    thumbnail: "https://picsum.photos/seed/runway-gen4-cinematic-shots/800/450",
    durationSeconds: 613,
    views: 512000,
    likes: 31000,
    publishedAt: "2026-06-27",
    author: { name: "Diego Alves", avatar: "DA" },
    tags: ["video", "generative", "filmmaking"],
    accent: "#d85a30",
    level: "Advanced",
  },
  {
    id: "3",
    slug: "notion-ai-meeting-notes-automation",
    title: "Automate your entire meeting workflow with Notion AI",
    description:
      "From transcript to action items to calendar follow-ups — a repeatable setup using Notion AI's new database automations, no Zapier required.",
    toolName: "Notion AI",
    toolCategory: "Productivity",
    youtubeId: "9bZkp7q19f0",
    thumbnail: "https://picsum.photos/seed/notion-ai-meeting-notes-automation/800/450",
    durationSeconds: 498,
    views: 98000,
    likes: 5400,
    publishedAt: "2026-06-20",
    author: { name: "Sam Okafor", avatar: "SO" },
    tags: ["productivity", "notes", "automation"],
    accent: "#1d9e75",
    level: "Beginner",
  },
  {
    id: "4",
    slug: "elevenlabs-voice-cloning-2026",
    title: "ElevenLabs voice cloning: how close is it to your real voice",
    description:
      "A blind test with ten listeners comparing cloned voices against the original speaker. We also cover the consent and watermarking flow ElevenLabs shipped this quarter.",
    toolName: "ElevenLabs",
    toolCategory: "Audio",
    youtubeId: "kJQP7kiw5Fk",
    thumbnail: "https://picsum.photos/seed/elevenlabs-voice-cloning-2026/800/450",
    durationSeconds: 356,
    views: 176000,
    likes: 9800,
    publishedAt: "2026-06-15",
    author: { name: "Lena Kovacs", avatar: "LK" },
    tags: ["audio", "voice", "cloning"],
    accent: "#d4537e",
    level: "Intermediate",
  },
  {
    id: "5",
    slug: "perplexity-deep-research-mode",
    title: "Perplexity's deep research mode replaced my Sunday reading list",
    description:
      "Testing the deep research agent on five real research questions spanning finance, biology and law, and grading the citations by hand.",
    toolName: "Perplexity",
    toolCategory: "Research",
    youtubeId: "dQw4w9WgXcQ",
    thumbnail: "https://picsum.photos/seed/perplexity-deep-research-mode/800/450",
    durationSeconds: 812,
    views: 143000,
    likes: 7100,
    publishedAt: "2026-06-11",
    author: { name: "Tomas Berg", avatar: "TB" },
    tags: ["research", "search", "agents"],
    accent: "#378add",
    level: "Advanced",
  },
  {
    id: "6",
    slug: "midjourney-v7-product-mockups",
    title: "Making agency-quality product mockups with Midjourney v7",
    description:
      "A designer's step-by-step process for turning a rough product sketch into a photoreal packaging mockup, including the omni-reference workflow.",
    toolName: "Midjourney",
    toolCategory: "Image Generation",
    youtubeId: "jNQXAC9IVRw",
    thumbnail: "https://picsum.photos/seed/midjourney-v7-product-mockups/800/450",
    durationSeconds: 527,
    views: 231000,
    likes: 14200,
    publishedAt: "2026-06-08",
    author: { name: "Ayaan Qureshi", avatar: "AQ" },
    tags: ["design", "image", "mockups"],
    accent: "#ba7517",
    level: "Beginner",
  },
  {
    id: "7",
    slug: "claude-code-refactor-legacy-repo",
    title: "Letting Claude Code loose on a 40k-line legacy repo",
    description:
      "We hand Claude Code a genuinely messy Rails monolith and watch it plan, branch and open PRs for three separate refactors, with commentary on where a human still had to step in.",
    toolName: "Claude Code",
    toolCategory: "Developer Tools",
    youtubeId: "9bZkp7q19f0",
    thumbnail: "https://picsum.photos/seed/claude-code-refactor-legacy-repo/800/450",
    durationSeconds: 934,
    views: 402000,
    likes: 26700,
    publishedAt: "2026-06-29",
    author: { name: "Priya Nair", avatar: "PN" },
    tags: ["coding", "agents", "refactoring"],
    accent: "#639922",
    level: "Expert",
  },
  {
    id: "8",
    slug: "suno-v5-album-in-a-day",
    title: "We made a full 8-track album with Suno v5 in one afternoon",
    description:
      "Genre-hopping from lo-fi to synth-pop, we document every prompt and regeneration it took to get tracks that didn't sound obviously AI-generated.",
    toolName: "Suno",
    toolCategory: "Audio",
    youtubeId: "kJQP7kiw5Fk",
    thumbnail: "https://picsum.photos/seed/suno-v5-album-in-a-day/800/450",
    durationSeconds: 671,
    views: 318000,
    likes: 19500,
    publishedAt: "2026-06-18",
    author: { name: "Diego Alves", avatar: "DA" },
    tags: ["music", "audio", "generative"],
    accent: "#7f77dd",
    level: "Intermediate",
  },
];

export function getVideoBySlug(slug: string) {
  return videos.find((v) => v.slug === slug);
}

export function getTrendingVideos(limit = 4) {
  return [...videos].sort((a, b) => b.views - a.views).slice(0, limit);
}

export function getLatestVideos(limit = 6) {
  return [...videos].sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  ).slice(0, limit);
}

export function getRelatedVideos(video: Video, limit = 4) {
  return videos
    .filter((v) => v.id !== video.id && v.toolCategory === video.toolCategory)
    .slice(0, limit)
    .concat(videos.filter((v) => v.id !== video.id && v.toolCategory !== video.toolCategory))
    .slice(0, limit);
}

export function formatDuration(seconds: number) {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}:${s.toString().padStart(2, "0")}`;
}

export function formatViews(views: number) {
  if (views >= 1_000_000) return `${(views / 1_000_000).toFixed(1)}M views`;
  if (views >= 1_000) return `${(views / 1_000).toFixed(0)}K views`;
  return `${views} views`;
}

/** "Jul 2, 2026" — used by the table listing's Posted column. */
export function formatPostedDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

/** Raw comma-formatted view count, e.g. "1,255" — table listing shows exact counts, not "K/M". */
export function formatViewsCount(views: number) {
  return views.toLocaleString("en-US");
}

/** Derives a "@handle" from the author's display name for the table's Channel column. */
export function channelHandle(name: string) {
  return "@" + name.toLowerCase().replace(/[^a-z]+/g, "");
}

export function formatRelativeDate(iso: string) {
  const days = Math.floor((Date.now() - new Date(iso).getTime()) / 86400000);
  if (days <= 0) return "Today";
  if (days === 1) return "Yesterday";
  if (days < 7) return `${days} days ago`;
  if (days < 30) return `${Math.floor(days / 7)}w ago`;
  return `${Math.floor(days / 30)}mo ago`;
}