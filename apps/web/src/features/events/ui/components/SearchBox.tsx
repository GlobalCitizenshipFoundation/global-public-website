"use client";

import { useEffect, useId, useRef, useState } from "react";
import { FaDeleteLeft } from "react-icons/fa6";

type Props = {
  initialValue: string;
  onDebouncedChange: (value: string) => void;
  onClear: () => void;
  debounceMs?: number;
};

export default function SearchBox({
  initialValue,
  onDebouncedChange,
  onClear,
  debounceMs = 250,
}: Props) {
  const [q, setQ] = useState(initialValue);
  const isEditingRef = useRef(false);

  const cbRef = useRef(onDebouncedChange);
  useEffect(() => {
    cbRef.current = onDebouncedChange;
  }, [onDebouncedChange]);

  useEffect(() => {
    if (isEditingRef.current) return;
    setQ(initialValue);
  }, [initialValue]);

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

  const canClear = q.length > 0;
  const inputId = useId();

  return (
    <div className="w-full">
      <div className="flex h-14 w-full overflow-hidden rounded-xl border border-secondary-borders bg-white shadow-sm transition focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/15">
        <input
          id={`search-${inputId}`}
          name="search"
          autoComplete="off"
          value={q}
          onChange={(e) => {
            isEditingRef.current = true;
            setQ(e.target.value);
          }}
          placeholder="Search"
          className="h-full w-full bg-transparent px-4 text-base text-text-primary outline-none placeholder:text-text-secondary"
        />

        <button
          type="button"
          onClick={() => {
            isEditingRef.current = false;
            setQ("");
            onClear();
          }}
          disabled={!canClear}
          aria-label="Clear search"
          className={[
            "grid h-full w-14 shrink-0 place-items-center",
            "bg-primary text-white transition",
            canClear
              ? "cursor-pointer opacity-100 hover:brightness-95 active:brightness-90"
              : "cursor-default opacity-45",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30",
          ].join(" ")}
        >
          <span className="text-xl leading-none">
            <FaDeleteLeft />
          </span>
        </button>
      </div>
    </div>
  );
}
