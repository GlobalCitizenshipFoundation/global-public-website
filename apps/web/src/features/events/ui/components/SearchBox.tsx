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
    <div className="block w-full max-w-100">
      <div className="flex h-15 w-full overflow-hidden rounded-lg border border-secondary-borders bg-white">
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
          className="h-full w-full bg-transparent px-4 text-[18px] outline-none"
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
            "h-full w-15 shrink-0",
            "grid place-items-center",
            "bg-primary text-white",
            "transition-opacity",
            canClear ? "cursor-pointer opacity-100" : "cursor-default opacity-50",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30",
          ].join(" ")}
        >
          <span className="text-2xl leading-none">
            <FaDeleteLeft />
          </span>
        </button>
      </div>
    </div>
  );
}
