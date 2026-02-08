'use client';

import React, { useEffect, useMemo, useState } from 'react';

type Props = {
  url?: string | null;
  title?: string;
  className?: string;
};

function safeUrl(input: string) {
  try {
    const u = new URL(input);
    if (u.protocol !== 'http:' && u.protocol !== 'https:') return null;
    return u;
  } catch {
    return null;
  }
}

function isYouTube(u: URL) {
  const h = u.hostname.replace('www.', '');
  return h === 'youtube.com' || h === 'youtu.be' || h === 'm.youtube.com';
}

function isVimeo(u: URL) {
  const h = u.hostname.replace('www.', '');
  return h === 'vimeo.com' || h === 'player.vimeo.com';
}

function toYouTubeEmbed(u: URL) {
  if (u.hostname.includes('youtu.be')) {
    const id = u.pathname.split('/').filter(Boolean)[0];
    return id ? `https://www.youtube.com/embed/${id}` : null;
  }
  const v = u.searchParams.get('v');
  if (v) return `https://www.youtube.com/embed/${v}`;
  if (u.pathname.startsWith('/embed/')) return `https://www.youtube.com${u.pathname}`;
  return null;
}

function toVimeoEmbed(u: URL) {
  if (u.hostname.includes('vimeo.com') && !u.hostname.includes('player.vimeo.com')) {
    const id = u.pathname.split('/').filter(Boolean)[0];
    return id ? `https://player.vimeo.com/video/${id}` : null;
  }
  if (u.hostname.includes('player.vimeo.com')) return `https://player.vimeo.com${u.pathname}`;
  return null;
}

function isDirectVideoFile(u: URL) {
  const path = u.pathname.toLowerCase();
  return path.endsWith('.mp4') || path.endsWith('.webm') || path.endsWith('.ogg');
}

export default function EventIntroVideo({ url, title = 'Intro video', className }: Props) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const { u, embedSrc } = useMemo(() => {
    if (!url) return { u: null as URL | null, embedSrc: null as string | null };
    const parsed = safeUrl(url);
    if (!parsed) return { u: null as URL | null, embedSrc: null as string | null };

    const youTube = isYouTube(parsed) ? toYouTubeEmbed(parsed) : null;
    const vimeo = isVimeo(parsed) ? toVimeoEmbed(parsed) : null;

    return { u: parsed, embedSrc: youTube || vimeo };
  }, [url]);

  if (!url || !u) return null;

  return (
    <div className={['w-full', className].filter(Boolean).join(' ')}>
      <div className="relative aspect-video w-full overflow-hidden rounded-[10px] bg-black/25">
        {/* SSR: placeholder tylko, iframe dopiero po mount */}
        {!mounted ? (
          <div className="absolute inset-0 flex items-center justify-center text-sm text-white/70">
            Loading video...
          </div>
        ) : embedSrc ? (
          <iframe
            src={embedSrc}
            title={title}
            className="absolute inset-0 h-full w-full"
            loading="lazy"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        ) : isDirectVideoFile(u) ? (
          <video className="absolute inset-0 h-full w-full" controls preload="metadata" playsInline>
            <source src={u.toString()} />
            Your browser does not support the video tag.
          </video>
        ) : (
          <div className="absolute inset-0 flex items-center justify-center px-6 text-center">
            <a
              href={u.toString()}
              target="_blank"
              rel="noreferrer"
              className="text-white underline underline-offset-4"
            >
              Open video
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
