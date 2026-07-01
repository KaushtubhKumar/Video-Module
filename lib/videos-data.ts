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
};

export const videos: Video[] = [
  {
    id: "1",
    slug: "cursor-ai-pair-programmer-walkthrough",
    title: "Cursor: the AI pair programmer that actually ships code",
    description:
      "A full walkthrough of Cursor's composer mode, multi-file edits, and how it handles a real refactor across a mid-size codebase. We compare it against vanilla VS Code + Copilot to see where the workflow actually saves time.",
    toolName: "Cursor",
    toolCategory: "Developer Tools",
    youtubeId: "ocmz8YKq_x8",
    thumbnail: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1200&auto=format&fit=crop",
    durationSeconds: 742,
    views: 284000,
    likes: 12400,
    publishedAt: "2026-06-24",
    author: { name: "Priya Nair", avatar: "PN" },
    tags: ["coding", "productivity", "IDE"],
  },
  {
    id: "2",
    slug: "runway-gen4-cinematic-shots",
    title: "Runway Gen-4 is scary good at cinematic camera moves",
    description:
      "We push Runway's Gen-4 model with fifteen prompts to test dolly, crane and handheld motion. Includes a breakdown of prompt structure that consistently gets stable, film-grade results.",
    toolName: "Runway",
    toolCategory: "Video Generation",
    youtubeId: "dQw4w9WgXcQ",
    thumbnail: "https://images.unsplash.com/photo-1536240478700-b869070f9279?q=80&w=1200&auto=format&fit=crop",
    durationSeconds: 613,
    views: 512000,
    likes: 31000,
    publishedAt: "2026-06-27",
    author: { name: "Diego Alves", avatar: "DA" },
    tags: ["video", "generative", "filmmaking"],
  },
  {
    id: "3",
    slug: "notion-ai-meeting-notes-automation",
    title: "Automate your entire meeting workflow with Notion AI",
    description:
      "From transcript to action items to calendar follow-ups — a repeatable setup using Notion AI's new database automations, no Zapier required.",
    toolName: "Notion AI",
    toolCategory: "Productivity",
    youtubeId: "jNQXAC9IVRw",
    thumbnail: "https://images.unsplash.com/photo-1517842645767-c639042777db?q=80&w=1200&auto=format&fit=crop",
    durationSeconds: 498,
    views: 98000,
    likes: 5400,
    publishedAt: "2026-06-20",
    author: { name: "Sam Okafor", avatar: "SO" },
    tags: ["productivity", "notes", "automation"],
  },
  {
    id: "4",
    slug: "elevenlabs-voice-cloning-2026",
    title: "ElevenLabs voice cloning: how close is it to your real voice",
    description:
      "A blind test with ten listeners comparing cloned voices against the original speaker. We also cover the consent and watermarking flow ElevenLabs shipped this quarter.",
    toolName: "ElevenLabs",
    toolCategory: "Audio",
    youtubeId: "3JZ_D3ELwOQ",
    thumbnail: "https://images.unsplash.com/photo-1478737270239-2f02b77fc618?q=80&w=1200&auto=format&fit=crop",
    durationSeconds: 356,
    views: 176000,
    likes: 9800,
    publishedAt: "2026-06-15",
    author: { name: "Lena Kovacs", avatar: "LK" },
    tags: ["audio", "voice", "cloning"],
  },
  {
    id: "5",
    slug: "perplexity-deep-research-mode",
    title: "Perplexity's deep research mode replaced my Sunday reading list",
    description:
      "Testing the deep research agent on five real research questions spanning finance, biology and law, and grading the citations by hand.",
    toolName: "Perplexity",
    toolCategory: "Research",
    youtubeId: "kXYiU_JCYtU",
    thumbnail: "https://images.unsplash.com/photo-1516321497487-e288fb19713f?q=80&w=1200&auto=format&fit=crop",
    durationSeconds: 812,
    views: 143000,
    likes: 7100,
    publishedAt: "2026-06-11",
    author: { name: "Tomas Berg", avatar: "TB" },
    tags: ["research", "search", "agents"],
  },
  {
    id: "6",
    slug: "midjourney-v7-product-mockups",
    title: "Making agency-quality product mockups with Midjourney v7",
    description:
      "A designer's step-by-step process for turning a rough product sketch into a photoreal packaging mockup, including the omni-reference workflow.",
    toolName: "Midjourney",
    toolCategory: "Image Generation",
    youtubeId: "L_jWHffIx5E",
    thumbnail: "https://images.unsplash.com/photo-1561736778-92e52a7769ef?q=80&w=1200&auto=format&fit=crop",
    durationSeconds: 527,
    views: 231000,
    likes: 14200,
    publishedAt: "2026-06-08",
    author: { name: "Ayaan Qureshi", avatar: "AQ" },
    tags: ["design", "image", "mockups"],
  },
  {
    id: "7",
    slug: "claude-code-refactor-legacy-repo",
    title: "Letting Claude Code loose on a 40k-line legacy repo",
    description:
      "We hand Claude Code a genuinely messy Rails monolith and watch it plan, branch and open PRs for three separate refactors, with commentary on where a human still had to step in.",
    toolName: "Claude Code",
    toolCategory: "Developer Tools",
    youtubeId: "6_b7RDuLwcI",
    thumbnail: "https://images.unsplash.com/photo-152637995098-d400fd0bf935?q=80&w=1200&auto=format&fit=crop",
    durationSeconds: 934,
    views: 402000,
    likes: 26700,
    publishedAt: "2026-06-29",
    author: { name: "Priya Nair", avatar: "PN" },
    tags: ["coding", "agents", "refactoring"],
  },
  {
    id: "8",
    slug: "suno-v5-album-in-a-day",
    title: "We made a full 8-track album with Suno v5 in one afternoon",
    description:
      "Genre-hopping from lo-fi to synth-pop, we document every prompt and regeneration it took to get tracks that didn't sound obviously AI-generated.",
    toolName: "Suno",
    toolCategory: "Audio",
    youtubeId: "eY52Zsg-KVI",
    thumbnail: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?q=80&w=1200&auto=format&fit=crop",
    durationSeconds: 671,
    views: 318000,
    likes: 19500,
    publishedAt: "2026-06-18",
    author: { name: "Diego Alves", avatar: "DA" },
    tags: ["music", "audio", "generative"],
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

export function formatRelativeDate(iso: string) {
  const days = Math.floor((Date.now() - new Date(iso).getTime()) / 86400000);
  if (days <= 0) return "Today";
  if (days === 1) return "Yesterday";
  if (days < 7) return `${days} days ago`;
  if (days < 30) return `${Math.floor(days / 7)}w ago`;
  return `${Math.floor(days / 30)}mo ago`;
}
