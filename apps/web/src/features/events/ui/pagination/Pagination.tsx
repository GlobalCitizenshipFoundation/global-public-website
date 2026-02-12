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

type Props = {
  page: number;
  totalPages: number;
  siblingCount?: number;
  boundaryCount?: number;
};

type PageItem = number | "gap-left" | "gap-right";

export default function Pagination({
  page,
  totalPages = 10,
  siblingCount = 1,
  boundaryCount = 1,
}: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const sp = useSearchParams();

  const navRef = useRef<HTMLElement | null>(null);

  // Anchor-preserving scroll state
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

  // Run after EVERY render, but do work only when pendingRef says so.
  // This keeps the UX stable and avoids fake deps that linters whine about.
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

      const query = setSearchParams(sp, { page: safe });

      startTransition(() => {
        router.replace(`${pathname}?${query}`, { scroll: false });
      });
    },
    [page, pathname, router, sp, totalPages],
  );

  if (totalPages <= 1) return null;

  const baseBtn =
    "h-[55px] rounded-md border px-[20px] text-[16px] font-medium cursor-pointer transition-colors border-navy text-navy " +
    "hover:bg-navy hover:border-navy hover:text-white " +
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy/30";

  const pageBtn =
    "h-[55px] w-[55px] rounded-md border text-[16px] font-medium cursor-pointer transition-colors border-navy text-navy " +
    "hover:bg-navy hover:border-navy hover:text-white " +
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy/30";

  const activeBtn = "border-navy bg-navy text-white hover:bg-navy";

  const slotWidth = "w-[110px] shrink-0";
  const hidden = "invisible pointer-events-none";

  return (
    <nav
      ref={(el) => {
        navRef.current = el;
      }}
      className="flex items-center justify-center gap-[11px]"
      aria-label="Pagination"
    >
      <div className={slotWidth}>
        <button
          type="button"
          onClick={() => go(page - 1)}
          className={[baseBtn, !canPrev ? hidden : ""].join(" ")}
          disabled={!canPrev}
          aria-disabled={!canPrev}
        >
          Prev
        </button>
      </div>

      <div className="flex items-center gap-[11px]">
        {items.map((it) => {
          if (it === "gap-left" || it === "gap-right") {
            return (
              <EllipsisJump
                key={it}
                currentPage={page}
                totalPages={totalPages}
                onCommit={go}
                className={baseBtn}
                side={it}
              />
            );
          }

          return (
            <button
              key={it}
              type="button"
              onClick={() => go(it)}
              className={[pageBtn, it === page ? activeBtn : ""].join(" ")}
              aria-current={it === page ? "page" : undefined}
              aria-label={`Go to page ${it}`}
            >
              {it}
            </button>
          );
        })}
      </div>

      <div className={[slotWidth, "flex justify-end"].join(" ")}>
        <button
          type="button"
          onClick={() => go(page + 1)}
          className={[baseBtn, !canNext ? hidden : ""].join(" ")}
          disabled={!canNext}
          aria-disabled={!canNext}
        >
          Next
        </button>
      </div>
    </nav>
  );
}

function EllipsisJump(props: {
  currentPage: number;
  totalPages: number;
  onCommit: (page: number) => void;
  className: string;
  side: "gap-left" | "gap-right";
}) {
  const { currentPage, totalPages, onCommit, className, side } = props;

  const chunk = Math.max(5, Math.ceil(totalPages / 10));
  const suggested =
    side === "gap-left"
      ? clamp(currentPage - chunk, 1, totalPages)
      : clamp(currentPage + chunk, 1, totalPages);

  const digits = String(totalPages).length;
  const inputWidthClass =
    digits <= 2 ? "w-12" : digits === 3 ? "w-14" : digits === 4 ? "w-16" : "w-20";

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
        className={className}
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
      className={[
        "h-9 rounded-md border border-navy bg-white px-2 text-center text-[16px] font-medium text-navy",
        inputWidthClass,
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy/30",
      ].join(" ")}
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
