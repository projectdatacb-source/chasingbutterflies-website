"use client";

import { useEffect, useRef, useState } from "react";
import { youtubeBackgroundEmbedUrl, youtubeThumbnail } from "@/lib/video";

const HERO_VIDEO_ID = "KOJl7d9jB3g";

function disableYoutubeCaptions(iframe: HTMLIFrameElement) {
  const command = (func: string, args: unknown[]) =>
    JSON.stringify({ event: "command", func, args });
  const target = iframe.contentWindow;
  if (!target) return;
  target.postMessage(command("setOption", ["captions", "track", {}]), "*");
}

export function HeroBackgroundVideo() {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [motionOk, setMotionOk] = useState<boolean | null>(null);
  const [embedFailed, setEmbedFailed] = useState(false);

  const poster = youtubeThumbnail(HERO_VIDEO_ID);
  const showEmbed = motionOk === true && !embedFailed;

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setMotionOk(!query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  return (
    <div className="hero-video" aria-hidden="true">
      <div
        className="hero-video__poster"
        style={{ backgroundImage: `url(${poster})` }}
      />
      {showEmbed ? (
        <div className="hero-video__frame">
          <iframe
            ref={iframeRef}
            title=""
            src={youtubeBackgroundEmbedUrl(HERO_VIDEO_ID)}
            className="hero-video__iframe"
            allow="autoplay; encrypted-media; picture-in-picture"
            referrerPolicy="strict-origin-when-cross-origin"
            tabIndex={-1}
            onLoad={(event) => disableYoutubeCaptions(event.currentTarget)}
            onError={() => setEmbedFailed(true)}
          />
        </div>
      ) : null}
      <div className="hero-video__overlay" />
    </div>
  );
}
