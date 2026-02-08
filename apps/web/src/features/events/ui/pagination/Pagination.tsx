'use client';

import { useMemo, useState, useEffect, startTransition, useCallback } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { setSearchParams } from '@/shared/lib/url';

type Props = { page: number; totalPages: number };

export default function Pagination({ page, totalPages }: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const sp = useSearchParams();

  const [jump, setJump] = useState<string>(String(page));
  useEffect(() => setJump(String(page)), [page]);

  // ✅ hooki ZAWSZE przed ewentualnym return null
  const go = useCallback(
    (nextPage: number) => {
      const safe = clamp(nextPage, 1, totalPages);
      const query = setSearchParams(sp, { page: safe });

      startTransition(() => {
        router.replace(`${pathname}?${query}`, { scroll: false });
      });
    },
    [pathname, router, sp, totalPages]
  );

  const pagesToShow = useMemo(() => getPages(page, totalPages), [page, totalPages]);
  const canPrev = page > 1;
  const canNext = page < totalPages;

  const onJumpCommit = useCallback(() => {
    const n = Number.parseInt(jump, 10);
    if (!Number.isFinite(n)) {
      setJump(String(page));
      return;
    }
    go(n);
  }, [go, jump, page]);

  // ✅ dopiero tutaj warunkowy return
  if (totalPages <= 1) return null;

  return (
    <nav className="mt-10 flex flex-wrap items-center justify-center gap-3" aria-label="Pagination">
      <button
        type="button"
        onClick={() => go(page - 1)}
        disabled={!canPrev}
        className="h-9 rounded-md border px-3 text-sm disabled:opacity-50"
      >
        Prev
      </button>

      <div className="flex items-center gap-2">
        {pagesToShow.map((p, idx) =>
          p === '...' ? (
            <span key={`dots-${idx}`} className="px-2 text-sm text-neutral-500">
              ...
            </span>
          ) : (
            <button
              key={p}
              type="button"
              onClick={() => go(p)}
              className={[
                'h-9 w-9 rounded-md border text-sm',
                p === page ? 'border-black bg-black text-white' : '',
              ].join(' ')}
              aria-current={p === page ? 'page' : undefined}
            >
              {p}
            </button>
          )
        )}
      </div>

      <button
        type="button"
        onClick={() => go(page + 1)}
        disabled={!canNext}
        className="h-9 rounded-md border px-3 text-sm disabled:opacity-50"
      >
        Next
      </button>

      {totalPages >= 10 ? (
        <div className="ml-2 flex items-center gap-2">
          <span className="text-sm text-neutral-600">Go to</span>
          <input
            inputMode="numeric"
            pattern="[0-9]*"
            value={jump}
            onChange={(e) => setJump(e.target.value.replace(/[^\d]/g, ''))}
            onBlur={onJumpCommit}
            onKeyDown={(e) => {
              if (e.key === 'Enter') onJumpCommit();
              if (e.key === 'Escape') setJump(String(page));
            }}
            className="h-9 w-16 rounded-md border px-2 text-center text-sm"
            aria-label="Go to page"
          />
          <span className="text-sm text-neutral-600">of {totalPages}</span>
        </div>
      ) : null}
    </nav>
  );
}

function clamp(n: number, min: number, max: number) {
  return Math.min(Math.max(n, min), max);
}

function getPages(current: number, total: number): Array<number | '...'> {
  const set = new Set<number>([1, total, current, current - 1, current + 1]);

  const arr: number[] = Array.from(set)
    .filter((n) => n >= 1 && n <= total)
    .sort((a, b) => a - b);

  const out: Array<number | '...'> = [];
  let prev: number | null = null;

  for (const n of arr) {
    if (prev !== null && n - prev > 1) out.push('...');
    out.push(n);
    prev = n;
  }

  return out;
}
