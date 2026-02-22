"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { FaPause, FaPlay } from "react-icons/fa6";
import WaveSurfer from "wavesurfer.js";

type Props = {
  title: string;
  caption?: string;
  audioUrl: string;
};

function fmt(sec: number) {
  const s = Math.max(0, Math.floor(sec));
  const m = Math.floor(s / 60);
  const r = s % 60;
  return `${String(m).padStart(2, "0")}.${String(r).padStart(2, "0")}`;
}

type WSLike = WaveSurfer & {
  setOptions?: (opts: Record<string, unknown>) => void;
  render?: () => void;
};

export default function AudioCardWave({ title, caption, audioUrl }: Props) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const wsRef = useRef<WSLike | null>(null);

  const [isReady, setIsReady] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [current, setCurrent] = useState(0);
  const [duration, setDuration] = useState(0);

  const proxiedUrl = useMemo(() => `/api/media?url=${encodeURIComponent(audioUrl)}`, [audioUrl]);

  // INIT: tylko gdy zmienia się track
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    // destroy poprzedniej instancji
    wsRef.current?.destroy();
    wsRef.current = null;

    setIsReady(false);
    setIsPlaying(false);
    setCurrent(0);
    setDuration(0);

    const ws = WaveSurfer.create({
      container: el,
      url: proxiedUrl,
      height: 42,
      normalize: true,
      cursorWidth: 0,
      barWidth: 2,
      barGap: 2,
      barRadius: 2,
    }) as WSLike;

    wsRef.current = ws;

    ws.on("ready", () => {
      setIsReady(true);
      setDuration(ws.getDuration());
    });

    ws.on("timeupdate", (t) => setCurrent(t));
    ws.on("play", () => setIsPlaying(true));
    ws.on("pause", () => setIsPlaying(false));
    ws.on("finish", () => setIsPlaying(false));
    ws.on("error", (e) => {
      // Intentionally ignored; inspect Network/CSP errors in devtools.
      void e;
    });

    return () => {
      ws.destroy();
      wsRef.current = null;
    };
  }, [proxiedUrl]);

  // RESIZE: relayout bez restartu audio
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    let raf = 0;

    const ro = new ResizeObserver(() => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const ws = wsRef.current;
        if (!ws) return;

        try {
          ws.setOptions?.({});
        } catch (e) {
          // Intentionally ignored - optional API across WaveSurfer versions
          void e;
        }

        try {
          ws.render?.();
        } catch (e) {
          // Intentionally ignored - optional API across WaveSurfer versions
          void e;
        }

        try {
          ws.setTime(ws.getCurrentTime());
        } catch (e) {
          // Intentionally ignored - optional API across WaveSurfer versions
          void e;
        }
      });
    });

    ro.observe(el);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
    };
  }, []); // tylko raz

  function toggle() {
    wsRef.current?.playPause();
  }

  return (
    <div className="w-full rounded-2xl bg-gray-100 p-6">
      <div className="grid grid-cols-[64px_1fr] grid-rows-[64px_auto] gap-x-4">
        <button
          type="button"
          onClick={toggle}
          disabled={!isReady}
          className="row-span-2 grid h-16 w-16 shrink-0 place-items-center rounded-full bg-primary text-white disabled:opacity-50"
          aria-label={isPlaying ? "Pause" : "Play"}
        >
          {isPlaying ? (
            <FaPause className="text-xl" aria-hidden />
          ) : (
            <FaPlay className="text-xl" aria-hidden />
          )}
        </button>

        <div className="flex h-16 min-w-0 flex-col justify-center">
          <div className="truncate font-semibold leading-tight">{title}</div>
          {caption ? (
            <div className="mt-1 line-clamp-2 text-sm leading-snug text-black/70">{caption}</div>
          ) : null}
        </div>

        <div className="min-w-0">
          <div ref={containerRef} className="mt-4.5 h-10.5 w-full min-w-0" />
          <div className="mt-3.25 text-right text-sm font-semibold tabular-nums text-black/80">
            {fmt(current)} / {fmt(duration)}
          </div>
        </div>
      </div>
    </div>
  );
}
