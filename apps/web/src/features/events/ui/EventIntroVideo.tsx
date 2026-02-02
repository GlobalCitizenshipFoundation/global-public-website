import React from 'react';

type Props = {
  url?: string | null;
  title?: string;
  className?: string;
};

function safeUrl(input: string) {
  try {
    const u = new URL(input);
    // tylko http/https
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
  // youtu.be/<id>
  if (u.hostname.includes('youtu.be')) {
    const id = u.pathname.split('/').filter(Boolean)[0];
    if (!id) return null;
    return `https://www.youtube.com/embed/${id}`;
  }

  // youtube.com/watch?v=<id>
  const v = u.searchParams.get('v');
  if (v) return `https://www.youtube.com/embed/${v}`;

  // youtube.com/embed/<id>
  if (u.pathname.startsWith('/embed/')) return `https://www.youtube.com${u.pathname}`;

  return null;
}

function toVimeoEmbed(u: URL) {
  // vimeo.com/<id>
  if (u.hostname.includes('vimeo.com') && !u.hostname.includes('player.vimeo.com')) {
    const id = u.pathname.split('/').filter(Boolean)[0];
    if (!id) return null;
    return `https://player.vimeo.com/video/${id}`;
  }

  // player.vimeo.com/video/<id>
  if (u.hostname.includes('player.vimeo.com')) {
    return `https://player.vimeo.com${u.pathname}`;
  }

  return null;
}

function isDirectVideoFile(u: URL) {
  const path = u.pathname.toLowerCase();
  return path.endsWith('.mp4') || path.endsWith('.webm') || path.endsWith('.ogg');
}

export default function EventIntroVideo({ url, title = 'Intro video', className }: Props) {
  if (!url) return null;

  const u = safeUrl(url);
  if (!u) return null;

  const youTube = isYouTube(u) ? toYouTubeEmbed(u) : null;
  const vimeo = isVimeo(u) ? toVimeoEmbed(u) : null;

  const embedSrc = youTube || vimeo;

  return (
    <div className={['w-full', className].filter(Boolean).join(' ')}>
      <div className="relative aspect-video w-full overflow-hidden rounded-[10px] bg-black/25">
        {embedSrc ? (
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
          <div className="flex h-full w-full items-center justify-center px-6 text-center">
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
