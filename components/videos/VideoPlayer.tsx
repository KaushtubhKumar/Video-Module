"use client";

import { useState } from "react";
import Image from "next/image";

/**
 * Why a facade instead of dropping an <iframe> straight in:
 * - YouTube's embed script is ~500kb+ of JS the user pays for even if they
 *   never press play. A thumbnail + play button costs ~0 until clicked.
 * - It keeps the details page fast enough to feel like the rest of the app,
 *   which matters more here than saving one click for the minority who
 *   always watch.
 */
export function VideoPlayer({
  youtubeId,
  thumbnail,
  title,
}: {
  youtubeId: string;
  thumbnail: string;
  title: string;
}) {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className="relative aspect-video w-full overflow-hidden rounded-card border border-border bg-black">
      {loaded ? (
        <iframe
          className="absolute inset-0 h-full w-full"
          src={`https://www.youtube.com/embed/${youtubeId}?autoplay=1&rel=0`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      ) : (
        <button
          onClick={() => setLoaded(true)}
          className="group absolute inset-0 h-full w-full cursor-pointer"
          aria-label={`Play video: ${title}`}
        >
          <Image src={thumbnail} alt="" fill className="object-cover" sizes="100vw" priority />
          <div className="absolute inset-0 bg-black/25 transition-colors group-hover:bg-black/35" />
          <span className="absolute inset-0 flex items-center justify-center">
            <span className="flex h-16 w-16 items-center justify-center rounded-full bg-white/95 shadow-lg transition-transform group-hover:scale-110">
              <svg width="22" height="22" viewBox="0 0 16 16" fill="#08090a">
                <path d="M3 1.7a.7.7 0 0 1 1.06-.6l10.6 6.3a.7.7 0 0 1 0 1.2L4.06 14.9A.7.7 0 0 1 3 14.3V1.7Z" />
              </svg>
            </span>
          </span>
        </button>
      )}
    </div>
  );
}
