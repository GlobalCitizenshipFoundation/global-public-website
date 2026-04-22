"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import {
  startTransition,
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { setSearchParams } from "@/shared/lib/url";
import { cn } from "@/shared/lib/cn";

type Props = {
  page: number;
  totalPages: number;
  siblingCount?: number;
  boundaryCount?: number;
  pageParamKey?: string;
};

type PageItem = number | "gap-left" | "gap-right";

export default function Pagination({
  page,
  totalPages = 10,
  siblingCount = 1,
  boundaryCount = 1,
  pageParamKey = "page",
}: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const sp = useSearchParams();

  const navRef = useRef<HTMLElement | null>(null);
  const pendingRef = useRef(false);
  const beforeTopRef = useRef<number | null>(null);

  const canPrev = page > 1;
  const canNext = page < totalPages;

  const items = useMemo(
    () =>
      getPaginationItems({
        page,
        totalPages,
        siblingCount,
        boundaryCount,
      }),
    [page, totalPages, siblingCount, boundaryCount],
  );

  useLayoutEffect(() => {
    if (!pendingRef.current) return;
    if (!navRef.current) return;
    if (beforeTopRef.current == null) return;

    const afterTop = navRef.current.getBoundingClientRect().top;
    const delta = afterTop - beforeTopRef.current;

    if (delta !== 0) window.scrollBy(0, delta);

    pendingRef.current = false;
    beforeTopRef.current = null;
  });

  const go = useCallback(
    (nextPage: number) => {
      const safe = clamp(nextPage, 1, totalPages);
      if (safe === page) return;

      if (navRef.current) {
        beforeTopRef.current = navRef.current.getBoundingClientRect().top;
        pendingRef.current = true;
      }

      const query = setSearchParams(sp, { [pageParamKey]: safe });

      startTransition(() => {
        router.replace(`${pathname}?${query}`, { scroll: false });
      });
    },
    [page, pathname, router, sp, totalPages, pageParamKey],
  );

  if (totalPages <= 1) return null;

  const arrowBtn =
    "grid h-10 w-10 place-items-center rounded-md cursor-pointer text-black transition " +
    "hover:bg-black/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/20 " +
    "disabled:pointer-events-none disabled:opacity-30";

  const pageBtn =
    "inline-flex h-10 min-w-10 items-center justify-center rounded-xl border px-3 cursor-pointer text-base font-semibold leading-none transition " +
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/20 " +
    "disabled:pointer-events-none disabled:opacity-40";

  const inactivePageBtn = "border-black bg-white text-black hover:bg-black/[0.04]";
  const activePageBtn = "border-primary bg-primary text-white";

  return (
    <nav
      ref={(el) => {
        navRef.current = el;
      }}
      className="flex items-center justify-center gap-1.5"
      aria-label="Pagination"
    >
      <button
        type="button"
        onClick={() => go(page - 1)}
        className={arrowBtn}
        disabled={!canPrev}
        aria-label="Previous page"
      >
        <svg
          className="h-6 w-6 stroke-[3]"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path d="M15 19l-7-7 7-7" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      <div className="flex items-center gap-1.5">
        {items.map((it) => {
          if (it === "gap-left" || it === "gap-right") {
            return (
              <EllipsisJump
                key={it}
                currentPage={page}
                totalPages={totalPages}
                onCommit={go}
                side={it}
              />
            );
          }

          return (
            <button
              key={it}
              type="button"
              onClick={() => go(it)}
              className={cn(pageBtn, it === page ? activePageBtn : inactivePageBtn)}
              aria-current={it === page ? "page" : undefined}
              aria-label={`Go to page ${it}`}
            >
              {it}
            </button>
          );
        })}
      </div>

      <button
        type="button"
        onClick={() => go(page + 1)}
        className={arrowBtn}
        disabled={!canNext}
        aria-label="Next page"
      >
        <svg
          className="h-6 w-6 stroke-[3]"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path d="M9 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
    </nav>
  );
}

function EllipsisJump(props: {
  currentPage: number;
  totalPages: number;
  onCommit: (page: number) => void;
  side: "gap-left" | "gap-right";
}) {
  const { currentPage, totalPages, onCommit, side } = props;

  const chunk = Math.max(5, Math.ceil(totalPages / 10));
  const suggested =
    side === "gap-left"
      ? clamp(currentPage - chunk, 1, totalPages)
      : clamp(currentPage + chunk, 1, totalPages);

  const digits = String(totalPages).length;
  const inputWidthClass =
    digits <= 2 ? "w-10" : digits === 3 ? "w-12" : digits === 4 ? "w-14" : "w-16";

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(String(suggested));
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (!open) setValue(String(suggested));
  }, [open, suggested]);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  const commit = useCallback(() => {
    const n = Number.parseInt(value, 10);

    if (!Number.isFinite(n)) {
      setValue(String(suggested));
      setOpen(false);
      return;
    }

    onCommit(n);
    setOpen(false);
  }, [onCommit, suggested, value]);

  if (!open) {
    return (
      <button
        type="button"
        className="inline-flex h-10 min-w-10 items-center justify-center rounded-xl border border-black bg-white px-3 cursor-pointer text-base font-semibold leading-none text-black transition hover:bg-black/[0.04] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/20"
        onClick={() => setOpen(true)}
        aria-label="Jump to page"
        title="Jump to page"
      >
        ...
      </button>
    );
  }

  return (
    <input
      ref={inputRef}
      inputMode="numeric"
      pattern="[0-9]*"
      value={value}
      onChange={(e) => setValue(e.target.value.replace(/[^\d]/g, ""))}
      onBlur={commit}
      onKeyDown={(e) => {
        if (e.key === "Enter") commit();
        if (e.key === "Escape") {
          setValue(String(suggested));
          setOpen(false);
        }
      }}
      className={cn(
        "h-10 rounded-xl border border-black bg-white px-2 text-center text-sm font-semibold text-black cursor-text focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/20",
        inputWidthClass,
      )}
      aria-label="Jump to page input"
    />
  );
}

function getPaginationItems(opts: {
  page: number;
  totalPages: number;
  siblingCount: number;
  boundaryCount: number;
}): PageItem[] {
  const { page, totalPages, siblingCount, boundaryCount } = opts;

  const startPages = range(1, Math.min(boundaryCount, totalPages));

  const endStart = Math.max(totalPages - boundaryCount + 1, boundaryCount + 1);
  const endPages = range(endStart, totalPages);

  const siblingsStart = Math.max(
    Math.min(page - siblingCount, totalPages - boundaryCount - siblingCount * 2 - 1),
    boundaryCount + 2,
  );

  const siblingsEnd = Math.min(
    Math.max(page + siblingCount, boundaryCount + siblingCount * 2 + 2),
    endStart - 2,
  );

  const items: PageItem[] = [];

  items.push(...startPages);

  if (siblingsStart > boundaryCount + 2) items.push("gap-left");
  else if (boundaryCount + 1 < totalPages - boundaryCount) items.push(boundaryCount + 1);

  items.push(...range(siblingsStart, siblingsEnd));

  if (siblingsEnd < totalPages - boundaryCount - 1) items.push("gap-right");
  else if (totalPages - boundaryCount > boundaryCount) items.push(totalPages - boundaryCount);

  items.push(...endPages);

  const out: PageItem[] = [];
  const seen = new Set<string>();

  for (const it of items) {
    const key = String(it);
    if (!seen.has(key)) {
      seen.add(key);
      out.push(it);
    }
  }

  return out;
}

function range(start: number, end: number): number[] {
  if (end < start) return [];
  const out: number[] = [];
  for (let i = start; i <= end; i++) out.push(i);
  return out;
}

function clamp(n: number, min: number, max: number) {
  return Math.min(Math.max(n, min), max);
}
