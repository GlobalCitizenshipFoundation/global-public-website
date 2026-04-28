"use client";

import { useEffect, useId, useMemo, useRef, useState } from "react";
import { useQueryPatch } from "../hooks/useQueryPatch";

type Props = {
  debounceMs?: number;
};

function getFirst(sp: URLSearchParams, key: string) {
  return sp.get(key) ?? "";
}

function patchIfChanged(
  sp: URLSearchParams,
  pushPatch: (p: Record<string, string | number | null | undefined>) => void,
  patch: Record<string, string | number | null | undefined>,
) {
  for (const [k, v] of Object.entries(patch)) {
    const next = v == null ? "" : String(v);
    const prev = getFirst(sp, k);

    if (next !== prev) {
      pushPatch(patch);
      return;
    }
  }
}

export const Input = ({ debounceMs = 250 }: Props) => {
  const { sp, pushPatch } = useQueryPatch();
  const qFromUrl = sp.get("q") ?? "";

  const onDebouncedSearch = useMemo(
    () => (value: string) => {
      const nextQ = value.trim();

      patchIfChanged(sp, pushPatch, {
        q: nextQ || null,
        articlesPage: 1,
        eventsPage: 1,
      });
    },
    [sp, pushPatch],
  );

  const [q, setQ] = useState(qFromUrl);
  const isEditingRef = useRef(false);

  const cbRef = useRef(onDebouncedSearch);
  useEffect(() => {
    cbRef.current = onDebouncedSearch;
  }, [onDebouncedSearch]);

  useEffect(() => {
    if (isEditingRef.current) return;
    setQ(qFromUrl);
  }, [qFromUrl]);

  const didMountRef = useRef(false);

  useEffect(() => {
    if (!didMountRef.current) {
      didMountRef.current = true;
      return;
    }

    if (!isEditingRef.current) return;

    const t = setTimeout(() => {
      isEditingRef.current = false;
      cbRef.current(q);
    }, debounceMs);

    return () => clearTimeout(t);
  }, [q, debounceMs]);

  const inputId = useId();

  return (
    <input
      id={`search-${inputId}`}
      placeholder="Search"
      name="search"
      autoComplete="off"
      value={q}
      onChange={(e) => {
        isEditingRef.current = true;
        setQ(e.target.value);
      }}
      className="border rounded-xl h-15 w-full px-5 max-w-[550px]"
    />
  );
};
