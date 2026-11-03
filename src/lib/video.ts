import type { Category, VideoPlatform } from "@/lib/projects/types";
import { isCategory } from "@/lib/projects/types";

const YOUTUBE_ID = /^[\w-]{6,}$/;
const VIMEO_ID = /^\d{6,}$/;

export type ParsedVideo = {
  platform: VideoPlatform;
  videoId: string;
  videoUrl: string;
};

export function parseVideoUrl(input: string): ParsedVideo | null {
  let url: URL;
  try {
    url = new URL(input.trim());
  } catch {
    return null;
  }

  const host = url.hostname.toLowerCase().replace(/^www\./, "");

  if (host === "youtu.be") {
    const videoId = url.pathname.split("/").filter(Boolean)[0] ?? "";
    return YOUTUBE_ID.test(videoId) ? youtube(videoId) : null;
  }

  if (host === "youtube.com" || host === "youtube-nocookie.com" || host === "m.youtube.com") {
    const fromQuery = url.searchParams.get("v");
    const parts = url.pathname.split("/").filter(Boolean);
    const marker = parts.findIndex((part) => part === "embed" || part === "shorts" || part === "live");
    const videoId = fromQuery || (marker >= 0 ? parts[marker + 1] : "") || "";
    return YOUTUBE_ID.test(videoId) ? youtube(videoId) : null;
  }

  if (host === "vimeo.com" || host === "player.vimeo.com") {
    const videoId = [...url.pathname.split("/").filter(Boolean)].reverse().find((part) => VIMEO_ID.test(part));
    return videoId ? vimeo(videoId) : null;
  }

  return null;
}

function youtube(videoId: string): ParsedVideo {
  return {
    platform: "youtube",
    videoId,
    videoUrl: `https://www.youtube.com/watch?v=${videoId}`,
  };
}

function vimeo(videoId: string): ParsedVideo {
  return {
    platform: "vimeo",
    videoId,
    videoUrl: `https://vimeo.com/${videoId}`,
  };
}

/** Background hero embed: muted autoplay loop with minimal YouTube chrome. */
export function youtubeBackgroundEmbedUrl(videoId: string) {
  const params = new URLSearchParams({
    autoplay: "1",
    mute: "1",
    loop: "1",
    playlist: videoId,
    controls: "0",
    playsinline: "1",
    rel: "0",
    modestbranding: "1",
    iv_load_policy: "3",
    disablekb: "1",
    fs: "0",
    // Captions off by default; no cc_lang_pref (do not force a track language).
    cc_load_policy: "0",
    enablejsapi: "1",
  });
  return `https://www.youtube-nocookie.com/embed/${encodeURIComponent(videoId)}?${params}`;
}

export function embedUrl(platform: VideoPlatform, videoId: string) {
  if (platform === "youtube") {
    const params = new URLSearchParams({
      rel: "0",
      autoplay: "1",
      playsinline: "1",
    });
    return `https://www.youtube-nocookie.com/embed/${encodeURIComponent(videoId)}?${params}`;
  }

  const params = new URLSearchParams({
    dnt: "1",
    autoplay: "1",
  });
  return `https://player.vimeo.com/video/${encodeURIComponent(videoId)}?${params}`;
}

export function youtubeThumbnail(videoId: string) {
  return `https://i.ytimg.com/vi/${encodeURIComponent(videoId)}/hqdefault.jpg`;
}

export async function vimeoThumbnail(videoId: string) {
  try {
    const endpoint = `https://vimeo.com/api/oembed.json?url=${encodeURIComponent(`https://vimeo.com/${videoId}`)}`;
    const response = await fetch(endpoint, { signal: AbortSignal.timeout(8000) });
    if (!response.ok) return null;
    const payload = (await response.json()) as { thumbnail_url?: unknown };
    return typeof payload.thumbnail_url === "string" ? payload.thumbnail_url : null;
  } catch {
    return null;
  }
}

export async function resolveThumbnail(input: {
  platform: VideoPlatform;
  videoId: string;
  thumbnailUrl?: string | null;
}) {
  const manual = input.thumbnailUrl?.trim();
  if (manual) return manual;
  if (input.platform === "youtube") return youtubeThumbnail(input.videoId);
  return vimeoThumbnail(input.videoId);
}

const CATEGORY_ALIASES: Record<string, Category> = {
  automobile: "automobiles",
  automobiles: "automobiles",
  cgi: "cgi",
  gadget: "gadgets",
  gadgets: "gadgets",
  fmcg: "fmcg",
  lifestyle: "lifestyle",
};

export function parseCategories(value: string) {
  const categories: Category[] = [];
  for (const part of value.split(/[,/|]/)) {
    const key = part.trim().toLowerCase();
    if (!key) continue;
    const category = CATEGORY_ALIASES[key];
    if (!category || !isCategory(category)) return null;
    if (!categories.includes(category)) categories.push(category);
  }
  return categories.length > 0 ? categories : null;
}
