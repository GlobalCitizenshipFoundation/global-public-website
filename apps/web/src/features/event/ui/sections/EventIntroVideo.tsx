"use client";

import { useEffect, useMemo, useState } from "react";
import { cn } from "@/shared/lib/cn";

type Props = {
  url?: string | null;
  title?: string;
  className?: string;

  // WebVTT captions for direct video files only (.mp4/.webm/.ogg)
  captionsUrl?: string | null;
  captionsLang?: string; // e.g. "en"
  captionsLabel?: string; // e.g. "English"
};

const FALLBACK_CAPTIONS_VTT = "/captions/empty.vtt";

function safeUrl(input: string): URL | null {
  try {
    const u = new URL(input);
    if (u.protocol !== "http:" && u.protocol !== "https:") return null;
    return u;
  } catch {
    return null;
  }
}

function hostNoWww(u: URL) {
  return u.hostname.replace(/^www\./, "");
}

function isYouTube(u: URL) {
  const h = hostNoWww(u);
  return h === "youtube.com" || h === "youtu.be" || h === "m.youtube.com";
}

function isVimeo(u: URL) {
  const h = hostNoWww(u);
  return h === "vimeo.com" || h === "player.vimeo.com";
}

function isDirectVideoFile(u: URL) {
  const path = u.pathname.toLowerCase();
  return path.endsWith(".mp4") || path.endsWith(".webm") || path.endsWith(".ogg");
}

function safeCaptionsUrl(input?: string | null) {
  if (!input) return null;
  const u = safeUrl(input);
  if (!u) return null;
  if (!u.pathname.toLowerCase().endsWith(".vtt")) return null;
  return u.toString();
}

function getYouTubeId(u: URL): string | null {
  const h = hostNoWww(u);

  if (h === "youtu.be") {
    const id = u.pathname.split("/").filter(Boolean)[0];
    return id ?? null;
  }

  const v = u.searchParams.get("v");
  if (v) return v;

  // support /embed/<id>
  if (u.pathname.startsWith("/embed/")) {
    const id = u.pathname.split("/").filter(Boolean)[1];
    return id ?? null;
  }

  return null;
}

function toYouTubeEmbed(u: URL): string | null {
  const id = getYouTubeId(u);
  if (!id) return null;

  const embed = new URL(`https://www.youtube.com/embed/${id}`);
  // sane defaults
  embed.searchParams.set("rel", "0");
  embed.searchParams.set("modestbranding", "1");
  embed.searchParams.set("playsinline", "1");
  return embed.toString();
}

function getVimeoId(u: URL): string | null {
  const h = hostNoWww(u);

  if (h === "player.vimeo.com") {
    // /video/<id>
    const parts = u.pathname.split("/").filter(Boolean);
    const idx = parts.indexOf("video");
    const id = idx >= 0 ? parts[idx + 1] : undefined;
    return id ?? null;
  }

  // vimeo.com/<id>
  const id = u.pathname.split("/").filter(Boolean)[0];
  return id ?? null;
}

function toVimeoEmbed(u: URL): string | null {
  const id = getVimeoId(u);
  if (!id) return null;

  const embed = new URL(`https://player.vimeo.com/video/${id}`);
  // sane defaults
  embed.searchParams.set("dnt", "1"); // do-not-track
  embed.searchParams.set("transparent", "0");
  return embed.toString();
}

type Resolved =
  | { kind: "embed"; src: string; original: string }
  | { kind: "file"; src: string; captionsSrc: string }
  | { kind: "link"; href: string };

function resolveVideo(url?: string | null, captionsUrl?: string | null): Resolved | null {
  if (!url) return null;

  const u = safeUrl(url);
  if (!u) return null;

  if (isYouTube(u)) {
    const src = toYouTubeEmbed(u);
    if (src) return { kind: "embed", src, original: u.toString() };
  }

  if (isVimeo(u)) {
    const src = toVimeoEmbed(u);
    if (src) return { kind: "embed", src, original: u.toString() };
  }

  if (isDirectVideoFile(u)) {
    return {
      kind: "file",
      src: u.toString(),
      captionsSrc: safeCaptionsUrl(captionsUrl) ?? FALLBACK_CAPTIONS_VTT,
    };
  }

  return { kind: "link", href: u.toString() };
}

export default function EventIntroVideo({
  url,
  title = "Intro video",
  className,
  captionsUrl,
  captionsLang = "en",
  captionsLabel = "Captions",
}: Props) {
  // Avoid hydration mismatches caused by browser extensions mutating <iframe> attributes.
  // Render media only after client hydration.
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true);
  }, []);

  const resolved = useMemo(() => resolveVideo(url, captionsUrl), [url, captionsUrl]);

  if (!resolved) return null;

  return (
    <div className={cn("w-full", className)}>
      <div className="relative aspect-video w-full overflow-hidden rounded-[10px] bg-black/25">
        {!hydrated ? (
          <div className="absolute inset-0 flex items-center justify-center text-sm text-white/70">
            Loading video...
          </div>
        ) : resolved.kind === "embed" ? (
          <iframe
            src={resolved.src}
            title={title}
            className="absolute inset-0 h-full w-full"
            loading="lazy"
            allow="encrypted-media; picture-in-picture; fullscreen"
            allowFullScreen
            referrerPolicy="strict-origin-when-cross-origin"
          />
        ) : resolved.kind === "file" ? (
          <video className="absolute inset-0 h-full w-full" controls preload="metadata" playsInline>
            <source src={resolved.src} />
            <track
              kind="captions"
              src={resolved.captionsSrc}
              srcLang={captionsLang}
              label={captionsLabel}
              {...(resolved.captionsSrc !== FALLBACK_CAPTIONS_VTT ? { default: true } : {})}
            />
            Your browser does not support the video tag.
          </video>
        ) : (
          <div className="absolute inset-0 flex items-center justify-center px-6 text-center">
            <a
              href={resolved.href}
              target="_blank"
              rel="noreferrer"
              className="text-white underline underline-offset-4"
              aria-label={`${title} - open in a new tab`}
            >
              Open video in a new tab
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
